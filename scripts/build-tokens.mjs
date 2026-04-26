#!/usr/bin/env node
/**
 * Build entry point — wires Style Dictionary v4 against the Tokens Studio
 * source files and emits per-theme CSS, SCSS partials, and TS types.
 *
 * Usage:
 *   node scripts/build-tokens.mjs           # one-shot build
 *   node scripts/build-tokens.mjs --watch   # rebuild on tokens/** changes
 *   node scripts/build-tokens.mjs --dry-run # parse + validate, no write
 */

import StyleDictionary from 'style-dictionary'
import { permutateThemes, register } from '@tokens-studio/sd-transforms'
import { readFileSync, watch, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const tokensDir = resolve(projectRoot, 'tokens')

const isWatch = process.argv.includes('--watch')
const isDryRun = process.argv.includes('--dry-run')
const isStrict = process.argv.includes('--strict')

// ────────────────────────────────────────────────────────────────────────────
// Register Tokens Studio transforms (DTCG `$value`/`$type`, alias resolution).
// ────────────────────────────────────────────────────────────────────────────
register(StyleDictionary)

// ────────────────────────────────────────────────────────────────────────────
// Custom transform: token path → origam CSS variable name.
// ────────────────────────────────────────────────────────────────────────────
const INTENT_STATES = new Set([
    'primary', 'secondary', 'ghost',
    'success', 'warning', 'danger', 'info',
    'selected'
])

StyleDictionary.registerTransform({
    name: 'origam/name/css',
    type: 'name',
    transform: (token) => {
        const path = token.path

        // The first path segment is the top-level group inside a token file
        // (e.g. "color", "space", "btn", "alert"). Component files use the
        // component name as their top key, so we detect them by checking
        // whether the file path contains "component/".
        const filePath = token.filePath || ''
        const isComponent = filePath.includes('/component/') || filePath.includes('\\component\\')

        if (isComponent) {
            const [blockName, ...rest] = path

            // component.{name}.{state}.{prop...}
            if (rest.length > 1 && INTENT_STATES.has(rest[0])) {
                const [state, ...propParts] = rest
                return `origam-${blockName}--${state}---${propParts.join('-')}`
            }

            // component.{name}.{prop...}
            if (rest.length === 0) {
                return `origam-${blockName}`
            }
            return `origam-${blockName}---${rest.join('-')}`
        }

        // primitive.* / semantic.* — flat kebab-case under origam-
        return `origam-${path.join('-')}`
    }
})

// ────────────────────────────────────────────────────────────────────────────
// CSS format: emits a theme-scoped block of CSS variables.
// ────────────────────────────────────────────────────────────────────────────
StyleDictionary.registerFormat({
    name: 'origam/css/themed',
    format: ({ dictionary, options, file }) => {
        const themeName = options.themeName || 'light'
        const decls = dictionary.allTokens
            .map(token => `  --${token.name}: ${token.$css?.value ?? token.$value ?? token.value};`)
            .join('\n')

        const header = file?.header ? `${file.header}\n` : ''

        if (themeName === 'primitive') {
            return `${header}:root {\n${decls}\n}\n`
        }
        if (themeName === 'light') {
            return `${header}:root,\n[data-theme="light"] {\n${decls}\n}\n`
        }
        if (themeName === 'dark') {
            return [
                header.trimEnd(),
                '[data-theme="dark"] {',
                decls,
                '}',
                '',
                '@media (prefers-color-scheme: dark) {',
                '  :root:not([data-theme]) {',
                decls.split('\n').map(l => `  ${l}`).join('\n'),
                '  }',
                '}',
                ''
            ].filter(Boolean).join('\n')
        }
        // brand-X / any other theme → scoped attribute selector only
        return `${header}[data-theme="${themeName}"] {\n${decls}\n}\n`
    }
})

// ────────────────────────────────────────────────────────────────────────────
// SCSS format: emits a SCSS partial mirroring the CSS output.
// ────────────────────────────────────────────────────────────────────────────
StyleDictionary.registerFormat({
    name: 'origam/scss/themed',
    format: ({ dictionary, options, file }) => {
        const themeName = options.themeName || 'light'
        const decls = dictionary.allTokens
            .map(token => `  --${token.name}: ${token.$css?.value ?? token.$value ?? token.value};`)
            .join('\n')

        const header = file?.header ? `${file.header}\n` : ''

        if (themeName === 'primitive') {
            return `${header}:root {\n${decls}\n}\n`
        }
        if (themeName === 'light') {
            return `${header}:root,\n[data-theme="light"] {\n${decls}\n}\n`
        }
        if (themeName === 'dark') {
            return `${header}[data-theme="dark"] {\n${decls}\n}\n`
        }
        return `${header}[data-theme="${themeName}"] {\n${decls}\n}\n`
    }
})

// ────────────────────────────────────────────────────────────────────────────
// TS types format: TToken + TIntent + TTheme.
// ────────────────────────────────────────────────────────────────────────────
StyleDictionary.registerFormat({
    name: 'origam/ts/types',
    format: ({ dictionary }) => {
        const names = [...new Set(dictionary.allTokens.map(t => `--${t.name}`))]
            .sort()
            .map(n => `  | '${n}'`)
            .join('\n')

        return [
            '// AUTO-GENERATED — do not edit. Run `npm run tokens:build`.',
            '',
            'export type TTokenName =',
            names,
            '',
            "export type TIntent =",
            "  | 'neutral'",
            "  | 'primary'",
            "  | 'secondary'",
            "  | 'ghost'",
            "  | 'success'",
            "  | 'warning'",
            "  | 'danger'",
            "  | 'info'",
            '',
            "export type TTheme = 'auto' | 'light' | 'dark' | string",
            ''
        ].join('\n')
    }
})

// ────────────────────────────────────────────────────────────────────────────
// Build orchestration
// ────────────────────────────────────────────────────────────────────────────

function ensureDirs () {
    for (const dir of [
        'src/assets/css/tokens',
        'src/assets/scss/tokens',
        'src/types'
    ]) {
        const abs = resolve(projectRoot, dir)
        if (!existsSync(abs)) mkdirSync(abs, { recursive: true })
    }
}

function buildOneTheme (themeName, sourceSets, allSources) {
    // sourceSets is the list of token-set names (without .json) that the
    // current theme enables. We translate them to file paths.
    const sourceFiles = sourceSets.map(s => `tokens/${s}.json`)

    // Filter rule: emit ONLY tokens whose source file path matches one of the
    // theme-specific sets we care about. For the primitive theme we emit
    // primitives; for light/dark we emit semantic + component (with primitive
    // included as REFERENCE source, but excluded from the output).
    const wantPrimitive = themeName === 'primitive'
    const filterFn = (token) => {
        const fp = token.filePath || ''
        if (wantPrimitive) {
            return fp.endsWith('/primitive.json') || fp.endsWith('\\primitive.json')
        }
        return !(fp.endsWith('/primitive.json') || fp.endsWith('\\primitive.json'))
    }

    return new StyleDictionary({
        log: { warnings: 'warn', verbosity: 'default' },
        source: sourceFiles,
        platforms: {
            css: {
                transformGroup: 'tokens-studio',
                transforms: ['name/kebab', 'origam/name/css'],
                buildPath: 'src/assets/css/tokens/',
                files: [{
                    destination: `${themeName}.css`,
                    format: 'origam/css/themed',
                    filter: filterFn,
                    options: {
                        themeName,
                        outputReferences: false,
                        header: `/* origam tokens — ${themeName} (auto-generated, do not edit) */`
                    }
                }]
            },
            scss: {
                transformGroup: 'tokens-studio',
                transforms: ['name/kebab', 'origam/name/css'],
                buildPath: 'src/assets/scss/tokens/',
                files: [{
                    destination: `_${themeName}.scss`,
                    format: 'origam/scss/themed',
                    filter: filterFn,
                    options: {
                        themeName,
                        outputReferences: false,
                        header: `/* origam tokens — ${themeName} (auto-generated, do not edit) */`
                    }
                }]
            }
        }
    })
}

function buildTypes (allSources) {
    return new StyleDictionary({
        log: { warnings: 'warn', verbosity: 'default' },
        source: allSources,
        platforms: {
            ts: {
                transformGroup: 'tokens-studio',
                transforms: ['name/kebab', 'origam/name/css'],
                buildPath: 'src/types/',
                files: [{
                    destination: 'tokens.type.ts',
                    format: 'origam/ts/types'
                }]
            }
        }
    })
}

async function build () {
    ensureDirs()

    const themesPath = resolve(tokensDir, '$themes.json')
    const themesRaw = JSON.parse(readFileSync(themesPath, 'utf-8'))
    const themesMap = permutateThemes(themesRaw, { separator: '/' })

    if (Object.keys(themesMap).length === 0) {
        console.error('[tokens] No themes resolved from tokens/$themes.json — aborting.')
        process.exit(1)
    }

    // Build primitive layer (theme-independent).
    {
        const sd = buildOneTheme('primitive', ['primitive'], ['tokens/primitive.json'])
        if (isDryRun) {
            await sd.hasInitialized
            console.log('[tokens] [dry-run] primitive: OK')
        } else {
            await sd.buildAllPlatforms()
            console.log('[tokens] built primitive')
        }
    }

    // Build each theme.
    for (const [name, sets] of Object.entries(themesMap)) {
        const themeName = name.toLowerCase()
        const allSources = sets.map(s => `tokens/${s}.json`)

        const sd = buildOneTheme(themeName, sets, allSources)
        if (isDryRun) {
            await sd.hasInitialized
            console.log(`[tokens] [dry-run] ${themeName}: OK`)
        } else {
            await sd.buildAllPlatforms()
            console.log(`[tokens] built ${themeName}`)
        }
    }

    // TS types: union of all token names from all themes.
    const allUniqueSources = [
        ...new Set(Object.values(themesMap).flat().map(s => `tokens/${s}.json`))
    ]
    const tsSd = buildTypes(allUniqueSources)
    if (isDryRun) {
        await tsSd.hasInitialized
        console.log('[tokens] [dry-run] types: OK')
    } else {
        await tsSd.buildAllPlatforms()
        console.log('[tokens] built TS types')
    }

    if (!isDryRun) {
        console.log('[tokens] all themes built successfully')
    }
}

async function main () {
    try {
        await build()
    } catch (err) {
        console.error('[tokens] build failed:', err)
        if (isStrict || !isWatch) process.exit(1)
    }

    if (isWatch) {
        console.log('[tokens] watching tokens/** for changes...')
        let timeout = null
        watch(tokensDir, { recursive: true }, (event, filename) => {
            if (!filename || !filename.endsWith('.json')) return
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(async () => {
                console.log(`[tokens] change detected (${filename}) — rebuilding`)
                try { await build() } catch (e) { console.error(e) }
            }, 100)
        })
    }
}

main()
