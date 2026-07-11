#!/usr/bin/env node
/**
 * generate-brand-presets.mjs — Generate brand-theme preset entries for the
 * /theming Theme Builder from the brand CSS files in
 * packages/marketing/src/assets/css/themes/{name}.css.
 *
 * WHAT IT DOES
 *   1. Reads each brand CSS file (cartoon, apple, geek, glass, editorial,
 *      material, ecom, sobre).
 *   2. Parses the :root[data-theme="<name>"] (light) and
 *      :root[data-theme="<name>"][data-mode="dark"] blocks, extracting every
 *      --origam-* custom property declaration.
 *   3. FILTERS the extracted map so only the keys present in
 *      THEME_BUILDER_PRESET_LIGHT_VARS are kept — these are the tokens the
 *      builder actually exposes.
 *   4. Writes (or --check diffs) packages/marketing/src/consts/theme-builder-brand-presets.const.ts
 *      with one Record<string, string> per (theme × mode) and the
 *      THEME_BUILDER_BRAND_PRESETS array in IThemeBuilderPreset format.
 *   5. Reports, per theme, how many builder-exposed keys were found vs missing.
 *
 * USAGE
 *   node scripts/generate-brand-presets.mjs [--check] [--verbose]
 *   pnpm -F @origam/marketing presets:generate
 *   pnpm -F @origam/marketing presets:generate:check
 *
 * FLAGS
 *   --check    dry-run; report what WOULD change, write nothing. Exit 1 if
 *              any change detected (CI-friendly drift gate).
 *   --verbose  list per-theme coverage details.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..')
const THEMES_DIR = path.join(REPO_ROOT, 'packages', 'marketing', 'src', 'assets', 'css', 'themes')
const OUT_FILE = path.join(REPO_ROOT, 'packages', 'marketing', 'src', 'consts', 'theme-builder-brand-presets.const.ts')
const PRESETS_CONST_FILE = path.join(REPO_ROOT, 'packages', 'marketing', 'src', 'consts', 'theme-builder-presets.const.ts')

const ARGS = process.argv.slice(2)
const CHECK = ARGS.includes('--check')
const VERBOSE = ARGS.includes('--verbose')

/** Brand themes to process (matches the CSS filenames). */
const BRAND_THEMES = [
    { name: 'cartoon',   labelFallback: 'Cartoon' },
    { name: 'apple',     labelFallback: 'Apple' },
    { name: 'geek',      labelFallback: 'Geek' },
    { name: 'glass',     labelFallback: 'Glass' },
    { name: 'editorial', labelFallback: 'Editorial' },
    { name: 'material',  labelFallback: 'Material' },
    { name: 'ecom',      labelFallback: 'E-commerce' },
    { name: 'sobre',     labelFallback: 'Sobre' },
]

/**
 * Extract all CSS custom property declarations from a string block.
 * Returns a Record<string, string> of { "--var-name": "value" }.
 */
function extractVarsFromBlock(blockContent) {
    const result = {}
    // Match --property-name: value; (value may span to the semicolon)
    const re = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g
    let m
    while ((m = re.exec(blockContent)) !== null) {
        const key = `--${m[1]}`
        const value = m[2].trim()
        result[key] = value
    }
    return result
}

/**
 * Parse a brand CSS file and return { light: Record<string,string>, dark: Record<string,string> }.
 *
 * Light selector:
 *   :root:root[data-theme="<name>"] { … }
 *   :root:root[data-theme="<name>"][data-mode="light"] { … }
 *
 * Dark selector:
 *   :root:root[data-theme="<name>"][data-mode="dark"] { … }
 */
function parseBrandCss(cssContent, themeName) {
    const lightVars = {}
    const darkVars = {}

    // We extract all rule blocks with their selectors.
    // Strategy: scan for { … } blocks, identify selector just before {.
    // We handle nested braces (e.g. calc values, gradient), so we do a
    // brace-depth scan rather than a naive regex.

    let pos = 0
    const len = cssContent.length

    while (pos < len) {
        // Find the next {
        const openIdx = cssContent.indexOf('{', pos)
        if (openIdx === -1) break

        // The selector is the text between the previous } (or start) and this {
        const selector = cssContent.slice(pos, openIdx).trim()

        // Find the matching closing } (accounting for nested braces)
        let depth = 1
        let i = openIdx + 1
        while (i < len && depth > 0) {
            if (cssContent[i] === '{') depth++
            else if (cssContent[i] === '}') depth--
            i++
        }
        const blockContent = cssContent.slice(openIdx + 1, i - 1)

        // Classify the selector
        const isLight = (
            selector.includes(`data-theme="${themeName}"`) &&
            !selector.includes('data-mode="dark"')
        )
        const isDark = (
            selector.includes(`data-theme="${themeName}"`) &&
            selector.includes('data-mode="dark"')
        )

        if (isLight || isDark) {
            const vars = extractVarsFromBlock(blockContent)
            if (isLight) Object.assign(lightVars, vars)
            if (isDark) Object.assign(darkVars, vars)
        }

        pos = i
    }

    return { light: lightVars, dark: darkVars }
}

/**
 * Load the allowed keys from THEME_BUILDER_PRESET_LIGHT_VARS by dynamically
 * reading the const file. We parse the TS source with a simple regex — no
 * TS compiler needed since we just need the keys.
 */
function loadAllowedKeys() {
    const source = fs.readFileSync(PRESETS_CONST_FILE, 'utf-8')
    // Extract the THEME_BUILDER_PRESET_LIGHT_VARS block
    const startMarker = 'export const THEME_BUILDER_PRESET_LIGHT_VARS'
    const start = source.indexOf(startMarker)
    if (start === -1) throw new Error('Could not find THEME_BUILDER_PRESET_LIGHT_VARS in presets const file')

    const openBrace = source.indexOf('{', start)
    // Find matching closing brace
    let depth = 1
    let i = openBrace + 1
    while (i < source.length && depth > 0) {
        if (source[i] === '{') depth++
        else if (source[i] === '}') depth--
        i++
    }
    const block = source.slice(openBrace + 1, i - 1)

    // Extract keys (quoted strings before ':')
    const keys = new Set()
    const keyRe = /"(--[a-zA-Z0-9_-]+)"\s*:/g
    let m
    while ((m = keyRe.exec(block)) !== null) {
        keys.add(m[1])
    }
    return keys
}

/**
 * Filter a vars map to only keep keys present in the allowed set.
 * Returns { filtered: Record<string,string>, missing: string[] }.
 */
function filterVars(vars, allowedKeys) {
    // Keep EVERY token the theme defines so a preset faithfully reproduces the
    // FULL brand theme (borders, gradients, list/menu/code/font/page tokens…),
    // not just the builder-surfaced component subset. Previously this filtered
    // down to `allowedKeys` (the ~246 surfaced tokens), which silently dropped
    // most of each theme's identity (e.g. cartoon lost gradient/list/menu/code).
    // `allowedKeys` is now used only to report which surfaced tokens a theme
    // leaves at their default (informational).
    const filtered = { ...vars }
    const missing = [...allowedKeys].filter(key => !(key in vars))
    return { filtered, missing }
}

/** Serialize a Record<string, string> as a TS object literal. */
function serializeRecord(record, indent = '    ') {
    const entries = Object.entries(record)
    if (entries.length === 0) return '{}'
    const lines = entries.map(([k, v]) => {
        // Multi-line CSS values (e.g. layered `radial-gradient(...)` on
        // background-image) span several source lines — collapse whitespace runs
        // to single spaces so the value fits a single-line TS string literal
        // (CSS treats any whitespace run as one, so this is lossless).
        // Then escape backslashes and double-quotes only (single quotes need no
        // escaping — escaping them triggers eslint no-useless-escape).
        const escapedVal = v
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
        return `${indent}    "${k}": "${escapedVal}"`
    })
    return `{\n${lines.join(',\n')}\n${indent}}`
}

/** Main */
async function run() {
    console.log('[generate-brand-presets] Loading allowed keys from THEME_BUILDER_PRESET_LIGHT_VARS…')
    const allowedKeys = loadAllowedKeys()
    console.log(`[generate-brand-presets] ${allowedKeys.size} builder-exposed keys loaded.`)

    const results = []

    for (const { name, labelFallback } of BRAND_THEMES) {
        const cssPath = path.join(THEMES_DIR, `${name}.css`)
        if (!fs.existsSync(cssPath)) {
            console.warn(`  [WARN] ${name}.css not found — skipping.`)
            continue
        }

        const cssContent = fs.readFileSync(cssPath, 'utf-8')
        const { light, dark } = parseBrandCss(cssContent, name)

        const { filtered: lightFiltered, missing: lightMissing } = filterVars(light, allowedKeys)
        const { filtered: darkFiltered, missing: darkMissing } = filterVars(dark, allowedKeys)

        if (VERBOSE) {
            console.log(`\n  [${name}]`)
            console.log(`    Light: ${Object.keys(light).length} raw vars → ${Object.keys(lightFiltered).length} builder-exposed (${lightMissing.length} missing)`)
            console.log(`    Dark:  ${Object.keys(dark).length} raw vars → ${Object.keys(darkFiltered).length} builder-exposed (${darkMissing.length} missing)`)
            if (lightMissing.length > 0) console.log(`    Missing (light): ${lightMissing.join(', ')}`)
            if (darkMissing.length > 0) console.log(`    Missing (dark): ${darkMissing.join(', ')}`)
        } else {
            console.log(`  [${name}] light: ${Object.keys(lightFiltered).length}/${allowedKeys.size} keys | dark: ${Object.keys(darkFiltered).length}/${allowedKeys.size} keys`)
        }

        results.push({ name, labelFallback, lightFiltered, darkFiltered })
    }

    // Generate output TS file
    const presetEntries = []
    const varExports = []

    for (const { name, labelFallback, lightFiltered, darkFiltered } of results) {
        const lightConstName = `THEME_BUILDER_PRESET_${name.toUpperCase().replace(/-/g, '_')}_LIGHT_VARS`
        const darkConstName  = `THEME_BUILDER_PRESET_${name.toUpperCase().replace(/-/g, '_')}_DARK_VARS`

        varExports.push(
            `export const ${lightConstName}: Record<string, string> = ${serializeRecord(lightFiltered)}`,
            `export const ${darkConstName}: Record<string, string> = ${serializeRecord(darkFiltered)}`
        )

        presetEntries.push(
            `    {
        key: '${name}',
        labelKey: 'theming.preset.${name}',
        labelFallback: '${labelFallback}',
        light: ${lightConstName},
        dark: ${darkConstName}
    }`
        )
    }

    const output = `/**
 * THEME_BUILDER_BRAND_PRESETS — seed values for the /theming builder, one entry
 * per brand theme (light + dark bundled). Each map is the SUBSET of the brand
 * theme cssVars that the builder actually exposes (the keys in
 * THEME_BUILDER_PRESET_LIGHT_VARS from theme-builder-presets.const.ts).
 *
 * GÉNÉRÉ depuis packages/marketing/src/assets/css/themes/*.css
 * par scripts/generate-brand-presets.mjs. Valeurs RÉELLES extraites des CSS
 * de marque — ne PAS éditer à la main. Régénérer via:
 *   node scripts/generate-brand-presets.mjs
 */
import type { IThemeBuilderPreset } from '~/interfaces/theme-builder.interface'

${varExports.join('\n\n')}

export const THEME_BUILDER_BRAND_PRESETS: IThemeBuilderPreset[] = [
${presetEntries.join(',\n')}
]
`

    const norm = (s) => s.replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim()

    if (CHECK) {
        if (fs.existsSync(OUT_FILE)) {
            const existing = fs.readFileSync(OUT_FILE, 'utf-8')
            if (norm(existing) === norm(output)) {
                console.log('\n[generate-brand-presets] --check: file is UP TO DATE.')
            } else {
                console.log('\n[generate-brand-presets] --check: file WOULD CHANGE.')
                process.exit(1)
            }
        } else {
            console.log('\n[generate-brand-presets] --check: file DOES NOT EXIST (would be created).')
            process.exit(1)
        }
    } else {
        fs.writeFileSync(OUT_FILE, output, 'utf-8')
        console.log(`\n[generate-brand-presets] Written → ${OUT_FILE}`)
        console.log(`[generate-brand-presets] ${results.length} presets generated (${results.length} themes, each with light + dark).`)
    }
}

run().catch(e => { console.error(e); process.exit(2) })
