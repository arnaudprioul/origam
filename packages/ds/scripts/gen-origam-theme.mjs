// =============================================================================
// gen-origam-theme.mjs — GENERATOR for packages/ds/src/themes/origam.theme.ts
// -----------------------------------------------------------------------------
// Why: a bare `createOrigam()` left ~2700 component-tier CSS vars undefined
// (`--origam-toolbar__wrapper---align-items`, `--origam-btn---height`, …)
// because the origam theme object only carried the colour (semantic) tier.
// This script ports the FULL set of resolved `--origam-*` declarations from the
// canonical, already-complete token sheets into the theme object's `cssVars`
// escape hatch, so the DS injects the complete var set at install time.
//
// Source of truth (canonical, complete sheets — same ones the stories package
// renders against):
//   - light → packages/ds/dist/src/assets/css/tokens/light.css
//             block selector `:root, [data-theme="light"] { … }` (whole file).
//   - dark  → packages/ds/dist/src/assets/css/tokens/dark.css
//             ONLY the first block `[data-theme="dark"] { … }`. The file ALSO
//             contains a `@media (prefers-color-scheme: dark){ :root:not([data-theme]) }`
//             duplicate AFTER that block — it is deliberately ignored.
//
// Emit target → packages/ds/src/themes/origam.theme.ts
//   - origamLightTheme : no `name`, no `mode`  → applied at `:root`
//   - origamDarkTheme  : `mode:'dark'`          → applied at `[data-mode="dark"]`
//   - origamTheme      : [origamLightTheme, origamDarkTheme] (must stay iterable)
//
// Regenerate with:
//   node packages/ds/scripts/gen-origam-theme.mjs
//
// ⛔ Do NOT hand-edit packages/ds/src/themes/origam.theme.ts — rerun this script.
// =============================================================================
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DS_ROOT = resolve(HERE, '..')

const LIGHT_CSS = resolve(DS_ROOT, 'dist/src/assets/css/tokens/light.css')
const DARK_CSS = resolve(DS_ROOT, 'dist/src/assets/css/tokens/dark.css')
const OUT = resolve(DS_ROOT, 'src/themes/origam.theme.ts')

const META_LABEL = 'Origam'
const META_DESCRIPTION = 'The neutral origam base — calm surfaces, a single violet accent.'

/**
 * Extract every `--origam-*: value;` declaration that lives inside the FIRST
 * top-level `{ … }` block of a CSS sheet. We only walk until the first
 * top-level closing brace, which is exactly the canonical block we want
 * (`:root,[data-theme="light"]` for light, `[data-theme="dark"]` for dark) and
 * naturally excludes the trailing `@media` duplicate in dark.css.
 */
function parseFirstBlock(cssPath) {
    const src = readFileSync(cssPath, 'utf8')
    const map = {}
    let depth = 0
    let started = false
    const declRe = /^(--origam-[A-Za-z0-9_-]+)\s*:\s*(.+?)\s*;$/

    for (const rawLine of src.split('\n')) {
        const line = rawLine.trim()

        if (!started) {
            if (line.endsWith('{')) {
                started = true
                depth = 1
            }
            continue
        }

        // Inside the first block. Track nesting so a nested `{}` (none expected
        // at this tier, but be safe) doesn't end the block prematurely.
        if (line.endsWith('{')) {
            depth += 1
            continue
        }
        if (line === '}') {
            depth -= 1
            if (depth === 0) break
            continue
        }

        if (depth === 1) {
            const m = line.match(declRe)
            if (m) map[m[1]] = m[2]
        }
    }

    return map
}

function quote(value) {
    return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

/** Render a flat `--origam-*` map as a TS object literal body (deterministic order). */
function renderCssVars(map, indent) {
    const pad = '    '.repeat(indent)
    const keys = Object.keys(map).sort()
    const lines = keys.map((k) => `${pad}${quote(k)}: ${quote(map[k])}`)
    return lines.join(',\n')
}

const lightVars = parseFirstBlock(LIGHT_CSS)
const darkVars = parseFirstBlock(DARK_CSS)

const lightCount = Object.keys(lightVars).length
const darkCount = Object.keys(darkVars).length

if (lightCount === 0 || darkCount === 0) {
    console.error(`Refusing to emit: light=${lightCount} dark=${darkCount} declarations parsed.`)
    process.exit(1)
}

const header = `import type { IOrigamTheme } from '../interfaces'

// ⛔ GÉNÉRÉ — ne pas éditer à la main.
// Source : packages/ds/dist/src/assets/css/tokens/{light,dark}.css (sheets
// canoniques complets). \`cssVars\` porte le jeu COMPLET de variables --origam-*
// résolues (couche primitive + sémantique + composant) afin qu'un
// \`createOrigam()\` nu n'oublie aucune var.
//   - origamLightTheme : ni name ni mode  → injecté à \`:root\`
//   - origamDarkTheme  : mode:'dark'       → injecté à \`[data-mode="dark"]\`
// Régénérer : node packages/ds/scripts/gen-origam-theme.mjs
`

const light = `export const origamLightTheme: IOrigamTheme = {
    label: '${META_LABEL}',
    description: '${META_DESCRIPTION}',
    cssVars: {
${renderCssVars(lightVars, 2)}
    },
    component: {
        global: {
            density: 'comfortable'
        }
    }
}`

const dark = `export const origamDarkTheme: IOrigamTheme = {
    mode: 'dark',
    label: '${META_LABEL}',
    description: '${META_DESCRIPTION}',
    cssVars: {
${renderCssVars(darkVars, 2)}
    },
    component: {
        global: {
            density: 'comfortable'
        }
    }
}`

const footer = `/**
 * The DS default identity (ROOT-scoped, no \`name\`): light at \`:root\`, dark at
 * \`[data-mode="dark"]\`. \`createOrigam\` always injects it as the baseline, so any
 * app inherits it with zero config; consumer brands override via \`data-theme\`.
 */
export const origamTheme: IOrigamTheme[] = [origamLightTheme, origamDarkTheme]`

const out = `${header}\n${light}\n\n${dark}\n\n${footer}\n`

writeFileSync(OUT, out)

console.log(`OK — origam.theme.ts généré : ${lightCount} vars light, ${darkCount} vars dark.`)
