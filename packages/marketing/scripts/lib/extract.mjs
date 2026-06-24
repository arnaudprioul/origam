/**
 * extract.mjs — DS source → structural doc facts.
 *
 * Uses the TypeScript compiler API (no ts-morph dependency) to parse the
 * origam design-system sources under packages/ds/src/{enums,interfaces,
 * consts,utils} and pull out ONLY the factual / structural fields that can
 * be derived from the source with certainty:
 *
 *   enum      → name, definition (printed), values[] (MEMBER refs)
 *   interface → name, definition (printed), extends[], props[] (name/type/optional + JSDoc)
 *   const     → name, definition (printed or summarised), value | values[], jsdoc
 *   util      → name, signature, params[] (name/type/required/default), returns.type, jsdoc, overloads
 *
 * It NEVER fabricates prose. JSDoc text is returned verbatim when present
 * (so the caller can decide whether to use it), and the placeholder-only
 * JSDoc found across the DS (`@param x …`) is detected and flagged so the
 * caller can ignore it and keep curated descriptions instead.
 */

import { createRequire } from 'node:module'
import path from 'node:path'
import url from 'node:url'

const require = createRequire(import.meta.url)
/** @type {import('typescript')} */
const ts = require('typescript')

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
export const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..')
export const DS_SRC = path.join(REPO_ROOT, 'packages', 'ds', 'src')

export const DOMAINS = {
    enums: { dir: 'enums', glob: '.enum.ts', kind: 'enum' },
    interfaces: { dir: 'interfaces', glob: '.interface.ts', kind: 'interface' },
    consts: { dir: 'consts', glob: '.const.ts', kind: 'const' },
    utils: { dir: 'utils', glob: '.util.ts', kind: 'util' },
}

/**
 * kebab-case a symbol name, reproducing the EXISTING marketing convention so
 * the generator never creates a duplicate of an already-curated slug.
 *
 * Two historical algorithms were used in the committed data and they differ
 * ONLY on acronyms — so the generator must match each per domain:
 *
 *   • 'percap' (interfaces): a dash before EVERY uppercase letter.
 *     IHTMLExpandElement → i-h-t-m-l-expand-element, IDataListKVItem → i-data-list-k-v-item
 *
 *   • 'standard' (enums, consts, utils): acronyms kept grouped.
 *     HexToRGB → hex-to-rgb, RGBtoCSS → rg-bto-css, addDays → add-days
 *
 * SCREAMING_SNAKE (ALIGN, AUDIO_DEFAULTS) is identical under both → lowercase + dashes.
 */
export function toSlug (name, style = 'standard') {
    if (/^[A-Z0-9_]+$/.test(name)) return name.toLowerCase().replace(/_/g, '-')
    if (style === 'percap') {
        return name.replace(/([A-Z])/g, '-$1').replace(/^-/, '').replace(/_/g, '-').toLowerCase()
    }
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase()
}

/** Slug style historically used per domain. */
export const SLUG_STYLE = {
    enums: 'standard',
    interfaces: 'percap',
    consts: 'standard',
    utils: 'standard',
}

/** SCREAMING_SNAKE a slug for the export const name: add-days→ADD_DAYS, i-color-props→I_COLOR_PROPS */
export function slugToScreaming (slug) {
    return slug.replace(/-/g, '_').toUpperCase()
}

/** True when JSDoc is the DS placeholder noise (just a title + `…` params), not real prose. */
function isPlaceholderJsDoc (text) {
    if (!text) return true
    const t = text.trim()
    if (!t) return true
    // A single short sentence that merely restates the name, or only ellipses.
    if (/^[…\s]*$/.test(t)) return true
    return false
}

function walk (dir, ext, out = []) {
    let entries
    try { entries = ts.sys.readDirectory(dir, [ext.replace(/^\./, '')]) } catch { entries = [] }
    // readDirectory with extension filter returns full paths already
    for (const f of entries) if (f.endsWith(ext)) out.push(f)
    return out
}

export function listSourceFiles (domainKey) {
    const d = DOMAINS[domainKey]
    const root = path.join(DS_SRC, d.dir)
    return walk(root, d.glob).sort()
}

/** category = first path segment under the domain dir, e.g. .../enums/Commons/align.enum.ts → "Commons" */
export function folderCategory (domainKey, file) {
    const d = DOMAINS[domainKey]
    const rel = path.relative(path.join(DS_SRC, d.dir), file)
    const seg = rel.split(path.sep)[0]
    return seg && seg !== path.basename(file) ? seg : 'Commons'
}

export function relSourcePath (file) {
    return path.relative(REPO_ROOT, file).split(path.sep).join('/')
}

function getJsDoc (node) {
    const jsdoc = ts.getJSDocCommentsAndTags(node)
    for (const j of jsdoc) {
        if (ts.isJSDoc(j)) {
            const comment = typeof j.comment === 'string'
                ? j.comment
                : ts.getTextOfJSDocComment(j.comment) || ''
            return comment.trim()
        }
    }
    return ''
}

function printNode (printer, sourceFile, node) {
    return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)
}

/**
 * Build a Program over all DS files so the type checker can resolve inferred
 * return types and aliased types. Returns { checker, program }.
 */
export function createProgram () {
    const files = []
    for (const k of Object.keys(DOMAINS)) files.push(...listSourceFiles(k))
    // Include the whole ds/src for type resolution of imports.
    const program = ts.createProgram(files, {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        allowJs: false,
        noEmit: true,
        skipLibCheck: true,
        strict: false,
        types: [],
    })
    return { program, checker: program.getTypeChecker() }
}

const printer = ts.createPrinter({ removeComments: true })

/**
 * VERBATIM declaration text — a byte-exact mirror of the DS source, INCLUDING
 * member-level JSDoc (`@deprecated`, …), original alignment and semicolons.
 *
 * `node.getText(sf)` starts after the node's own leading trivia, so the
 * declaration's *own* preceding JSDoc (which already feeds `descriptionFallback`)
 * is excluded, while internal member comments and the original formatting are
 * preserved. DS declarations are top-level (flush-left), so no dedent is needed.
 */
function verbatimDefinition (sf, node) {
    return node.getText(sf)
}

/** Extract all exported symbols of interest from one source file. */
export function extractFile (domainKey, file, program, checker) {
    const sf = program.getSourceFile(file)
    if (!sf) return []
    const kind = DOMAINS[domainKey].kind
    const slugStyle = SLUG_STYLE[domainKey]
    const results = []
    const category = folderCategory(domainKey, file)
    const sourceFile = relSourcePath(file)

    const isExported = (node) =>
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)

    // Util functions may be declared multiple times (overloads + implementation).
    // Group FunctionDeclarations by name so we emit one entry carrying ALL
    // overload signatures and the implementation's (broadest) param/return types.
    const fnGroups = new Map()

    ts.forEachChild(sf, (node) => {
        // ENUM
        if (kind === 'enum' && ts.isEnumDeclaration(node) && isExported(node)) {
            const name = node.name.text
            const def = verbatimDefinition(sf, node)
            const values = node.members.map(m => ({
                value: `${name}.${m.name.getText(sf)}`,
            }))
            results.push({ kind, name, slug: toSlug(name, slugStyle), category, sourceFile, definition: def, values, jsdoc: getJsDoc(node) })
        }

        // INTERFACE
        if (kind === 'interface' && ts.isInterfaceDeclaration(node) && isExported(node)) {
            const name = node.name.text
            const def = verbatimDefinition(sf, node)
            const ext = []
            if (node.heritageClauses) {
                for (const hc of node.heritageClauses) {
                    if (hc.token === ts.SyntaxKind.ExtendsKeyword) {
                        for (const t of hc.types) ext.push(t.expression.getText(sf))
                    }
                }
            }
            const props = node.members.filter(ts.isPropertySignature).map(m => ({
                name: m.name.getText(sf),
                type: m.type ? m.type.getText(sf) : 'unknown',
                optional: !!m.questionToken,
                jsdoc: getJsDoc(m),
            }))
            results.push({ kind, name, slug: toSlug(name, slugStyle), category, sourceFile, definition: def, extends: ext, props, jsdoc: getJsDoc(node) })
        }

        // CONST
        if (kind === 'const' && ts.isVariableStatement(node) && isExported(node)) {
            for (const decl of node.declarationList.declarations) {
                if (!ts.isIdentifier(decl.name)) continue
                const name = decl.name.text
                // Only document SCREAMING_SNAKE constants (the catalog convention).
                if (!/^[A-Z0-9_]+$/.test(name)) continue
                // Verbatim: prefer the single-declaration text, but keep the
                // `export const` keywords from the statement so the snippet is
                // self-contained. DS consts are one declaration per statement.
                const def = node.declarationList.declarations.length === 1
                    ? verbatimDefinition(sf, node)
                    : `export const ${verbatimDefinition(sf, decl)}`
                const init = decl.initializer
                const entry = { kind, name, slug: toSlug(name, slugStyle), category, sourceFile, definition: def, jsdoc: getJsDoc(node) }
                const unwrapped = init && ts.isAsExpression(init) ? init.expression : init
                if (unwrapped && ts.isObjectLiteralExpression(unwrapped)) {
                    // Object literal → one copiable `key: value` member per property.
                    entry.values = unwrapped.properties.filter(ts.isPropertyAssignment).map(p => ({
                        value: `${p.name.getText(sf)}: ${p.initializer.getText(sf).replace(/\s+/g, ' ')}`,
                    }))
                } else if (unwrapped && ts.isArrayLiteralExpression(unwrapped)) {
                    // Array literal → one copiable member per element (matches the
                    // curated convention, e.g. BREAKPOINTS_ARRAY → BREAKPOINTS.SM, …).
                    entry.values = unwrapped.elements.map(el => ({
                        value: el.getText(sf).replace(/\s+/g, ' '),
                    }))
                } else if (unwrapped) {
                    // Scalar / Set / Map / call expression → single scalar value.
                    entry.value = unwrapped.getText(sf).replace(/\s+/g, ' ')
                }
                results.push(entry)
            }
        }

        // UTIL — function declarations (overloads + implementation): `export function foo (...) {}`
        if (kind === 'util' && ts.isFunctionDeclaration(node) && isExported(node) && node.name) {
            const n = node.name.text
            if (!fnGroups.has(n)) fnGroups.set(n, [])
            fnGroups.get(n).push(node)
        }

        // UTIL — arrow / function-expression consts: `export const foo = (...) => ...`
        if (kind === 'util' && ts.isVariableStatement(node) && isExported(node)) {
            for (const decl of node.declarationList.declarations) {
                if (!ts.isIdentifier(decl.name)) continue
                const init = decl.initializer
                if (init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
                    results.push(buildUtilEntry(sf, checker, decl.name.text, init, category, sourceFile, getJsDoc(node), 'const', slugStyle))
                }
            }
        }
    })

    // Emit one util entry per grouped function name (handling overloads).
    for (const [name, decls] of fnGroups) {
        const impl = decls.find(d => !!d.body) ?? decls[decls.length - 1]
        const overloads = decls.filter(d => !d.body)
        // JSDoc lives on the first declaration (overload) in TS.
        const jsdoc = getJsDoc(decls[0])
        const entry = buildUtilEntry(sf, checker, name, impl, category, sourceFile, jsdoc, 'function', slugStyle)
        if (overloads.length > 0) {
            // Signature = the PUBLIC overload declarations only (the implementation
            // signature is internal and often widened by default values, so it is
            // excluded — matching the curated convention).
            entry.signature = overloads
                .map(d => buildSignatureFromDecl(sf, checker, name, d, 'function'))
                .join('\n')
            // Params/returns from the LAST overload (the most permissive public one),
            // matching the existing curated docs (e.g. convertToUnit).
            const last = overloads[overloads.length - 1]
            const merged = buildUtilEntry(sf, checker, name, last, category, sourceFile, jsdoc, 'function', slugStyle)
            entry.params = merged.params
            entry.returnType = merged.returnType
        }
        results.push(entry)
    }

    return results
}

/** Build just the signature string from one function declaration. */
function buildSignatureFromDecl (sf, checker, name, decl, form) {
    const params = decl.parameters.map(p => ({
        name: p.name.getText(sf),
        type: p.type ? p.type.getText(sf) : inferParamType(checker, p),
        required: !p.questionToken && !p.initializer,
        defaultValue: p.initializer ? p.initializer.getText(sf) : undefined,
    }))
    const returnType = decl.type ? decl.type.getText(sf) : inferReturnType(checker, decl)
    return buildSignature(name, params, returnType, form)
}

/**
 * Build a util doc entry from either a FunctionDeclaration or an arrow /
 * function-expression. `form` controls the signature style to match the
 * existing convention: `function name(...)` vs `const name: (...) => ...`.
 */
function buildUtilEntry (sf, checker, name, fnNode, category, sourceFile, jsdoc, form, slugStyle) {
    const params = fnNode.parameters.map(p => ({
        name: p.name.getText(sf),
        type: p.type ? p.type.getText(sf) : inferParamType(checker, p),
        required: !p.questionToken && !p.initializer,
        defaultValue: p.initializer ? p.initializer.getText(sf) : undefined,
    }))
    const returnType = fnNode.type ? fnNode.type.getText(sf) : inferReturnType(checker, fnNode)
    const sig = buildSignature(name, params, returnType, form)
    return { kind: 'util', name, slug: toSlug(name, slugStyle), category, sourceFile, signature: sig, params, returnType, jsdoc }
}

function inferParamType (checker, param) {
    try {
        const t = checker.getTypeAtLocation(param)
        return checker.typeToString(t)
    } catch { return 'any' }
}

function inferReturnType (checker, fn) {
    try {
        const sig = checker.getSignatureFromDeclaration(fn)
        if (sig) return checker.typeToString(checker.getReturnTypeOfSignature(sig))
    } catch { /* noop */ }
    return 'void'
}

function buildSignature (name, params, returnType, form = 'function') {
    const ps = params.map(p => {
        const opt = p.required ? '' : '?'
        const def = p.defaultValue ? ` = ${p.defaultValue.replace(/\s+/g, ' ')}` : ''
        return `${p.name}${opt}: ${p.type.replace(/\s+/g, ' ')}${def}`
    }).join(', ')
    const rt = returnType.replace(/\s+/g, ' ')
    return form === 'const'
        ? `const ${name}: (${ps}) => ${rt}`
        : `function ${name}(${ps}): ${rt}`
}

export { isPlaceholderJsDoc }
