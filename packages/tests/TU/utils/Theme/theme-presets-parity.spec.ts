/**
 * Parité : presets origam/themes ↔ themes-all.css
 *
 * Garantit que chaque `IOrigamTheme` exporté par `origam/themes` contient
 * exactement les mêmes valeurs --origam-* que le bloc
 * `[data-theme="X"][data-mode="Y"]` correspondant dans le fichier CSS
 * pré-généré (themes-all.css).
 *
 * Si ce test échoue c'est que `tokens:build` n'a pas été relancé après une
 * modification des tokens, ou que la logique du parseur CSS a divergé de
 * celle de Style Dictionary.
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'

// Import the generated preset objects from the DS src (pre-build path for
// the test runner, which resolves @origam/* via tsconfig paths).
import * as presets from '@origam/themes'
import type { IOrigamTheme } from '@origam/interfaces/Theme/origam-theme.interface'

// ── helpers ──────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..', '..', '..', '..', '..')
const CSS_PATH = resolve(
    REPO_ROOT,
    'packages/ds/src/assets/css/tokens/themes-all.css'
)

/**
 * Parse `themes-all.css` and return a map:
 *   `"cartoon/light" → { '--origam-…': 'value', … }`
 *
 * The file contains blocks shaped like:
 *   [data-theme="cartoon"][data-mode="light"] { --origam-…: value; … }
 */
function parseCssBlocks (css: string): Map<string, Record<string, string>> {
    const out = new Map<string, Record<string, string>>()

    // Match a full [data-theme="X"][data-mode="Y"] block including its braces.
    // Use a non-greedy body so nested braces don't swallow multiple blocks.
    const blockRe = /\[data-theme="([^"]+)"\]\[data-mode="([^"]+)"\]\s*\{([^}]+)\}/g
    let m: RegExpExecArray | null

    while ((m = blockRe.exec(css)) !== null) {
        const brand = m[1]
        const mode  = m[2]
        const body  = m[3]
        const key   = `${brand}/${mode}`

        const vars: Record<string, string> = out.get(key) ?? {}

        // Extract every --origam-… declaration from the block body.
        const declRe = /^\s*(--origam-[^:]+):\s*(.+?)\s*;/gm
        let d: RegExpExecArray | null
        while ((d = declRe.exec(body)) !== null) {
            vars[d[1].trim()] = d[2].trim()
        }

        out.set(key, vars)
    }

    return out
}

// ── fixtures ─────────────────────────────────────────────────────────────────

const cssText   = readFileSync(CSS_PATH, 'utf-8')
const cssBlocks = parseCssBlocks(cssText)

// Collect only the per-brand×mode preset objects (IOrigamTheme with name + mode).
const modePresets: IOrigamTheme[] = (presets.allThemes as IOrigamTheme[]).filter(
    (t) => typeof t.name === 'string' && (t.mode === 'light' || t.mode === 'dark')
)

// ── tests ─────────────────────────────────────────────────────────────────────

describe('origam/themes parité — preset vars === themes-all.css block', () => {
    it('themes-all.css contains at least 16 brand×mode blocks', () => {
        expect(cssBlocks.size).toBeGreaterThanOrEqual(16)
    })

    it('allThemes exports exactly 16 preset objects', () => {
        expect(presets.allThemes).toHaveLength(16)
    })

    for (const preset of modePresets) {
        const key = `${preset.name}/${preset.mode}`

        describe(`${key}`, () => {
            it('has a matching block in themes-all.css', () => {
                expect(
                    cssBlocks.has(key),
                    `No CSS block found for [data-theme="${preset.name}"][data-mode="${preset.mode}"]`
                ).toBe(true)
            })

            it('every preset var matches the CSS block value', () => {
                const cssVars = cssBlocks.get(key)
                if (!cssVars) return // guarded by test above

                const presetVars = preset.vars ?? {}
                const mismatches: string[] = []

                for (const [name, presetVal] of Object.entries(presetVars)) {
                    const cssVal = cssVars[name]
                    if (cssVal === undefined) {
                        mismatches.push(`  MISSING in CSS: ${name}`)
                        continue
                    }
                    // Normalise whitespace (CSS serialisers may differ on spaces
                    // inside rgba() / multi-shadow values).
                    const normalise = (v: string) =>
                        v.replace(/\s*,\s*/g, ', ').replace(/\s+/g, ' ').trim().toLowerCase()

                    if (normalise(String(presetVal)) !== normalise(cssVal)) {
                        mismatches.push(
                            `  ${name}:\n    preset: "${presetVal}"\n    css:    "${cssVal}"`
                        )
                    }
                }

                expect(mismatches, mismatches.join('\n')).toHaveLength(0)
            })

            it('preset has no extra vars absent from the CSS block', () => {
                const cssVars = cssBlocks.get(key)
                if (!cssVars) return

                const presetVars = preset.vars ?? {}
                const extra = Object.keys(presetVars).filter(k => !(k in cssVars))
                expect(extra, `vars in preset but not in CSS: ${extra.join(', ')}`).toHaveLength(0)
            })
        })
    }
})

// ── spot-check canonical values ──────────────────────────────────────────────

describe('origam/themes spot-checks — canonical token values', () => {
    it('cartoon/light shadow-sm is the T2 hard-offset value', () => {
        expect(presets.cartoonLightTheme.vars?.['--origam-shadow---sm']).toBe(
            '4px 4px 0px 0px #171717'
        )
    })

    it('cartoon/dark shadow-sm uses the white-cream hard-offset', () => {
        expect(presets.cartoonDarkTheme.vars?.['--origam-shadow---sm']).toBe(
            '4px 4px 0px 0px #FFFEFB'
        )
    })

    it('geek/dark shadow-sm is the T2 neon glow', () => {
        expect(presets.geekDarkTheme.vars?.['--origam-shadow---sm']).toBe(
            '0px 0px 8px 1px rgba(74,222,128,0.55)'
        )
    })

    it('editorial/light has radius 0 (flat design)', () => {
        expect(presets.editorialLightTheme.vars?.['--origam-radius---md']).toBe('0px')
    })

    it('sobreTheme is an array of 2 IOrigamTheme objects', () => {
        expect(presets.sobreTheme).toHaveLength(2)
        expect(presets.sobreTheme[0].mode).toBe('light')
        expect(presets.sobreTheme[1].mode).toBe('dark')
    })

    it('allThemes flat length is 16 (demo brands only, not origam base)', () => {
        expect(presets.allThemes).toHaveLength(16)
    })
})

// ── origam base brand parité ─────────────────────────────────────────────────
// The origam base is sourced from light.css / dark.css (semantic/light.json +
// semantic/dark.json), not from themes-all.css.  We parse those files directly
// and assert the preset vars match them var-for-var.

function parseFlatCssVars (css: string): Record<string, string> {
    const vars: Record<string, string> = {}
    const re = /^\s*(--origam-[^:]+):\s*(.+?)\s*;$/gm
    let m: RegExpExecArray | null
    while ((m = re.exec(css)) !== null) {
        vars[m[1].trim()] = m[2].trim()
    }
    return vars
}

describe('origam base brand — parité avec light.css / dark.css', () => {
    const lightCssPath = resolve(REPO_ROOT, 'packages/ds/src/assets/css/tokens/light.css')
    const darkCssPath  = resolve(REPO_ROOT, 'packages/ds/src/assets/css/tokens/dark.css')

    const lightCssVars = parseFlatCssVars(readFileSync(lightCssPath, 'utf-8'))
    const darkCssVars  = parseFlatCssVars(readFileSync(darkCssPath,  'utf-8'))

    it('origamLightTheme.name === "origam"', () => {
        expect(presets.origamLightTheme.name).toBe('origam')
    })

    it('origamLightTheme.mode === "light"', () => {
        expect(presets.origamLightTheme.mode).toBe('light')
    })

    it('origamDarkTheme.name === "origam"', () => {
        expect(presets.origamDarkTheme.name).toBe('origam')
    })

    it('origamDarkTheme.mode === "dark"', () => {
        expect(presets.origamDarkTheme.mode).toBe('dark')
    })

    it('origamTheme is an array of 2 objects [light, dark]', () => {
        expect(presets.origamTheme).toHaveLength(2)
        expect(presets.origamTheme[0].mode).toBe('light')
        expect(presets.origamTheme[1].mode).toBe('dark')
    })

    it('origamTheme is NOT in allThemes (separate from demo brands)', () => {
        const allNames = presets.allThemes.map((t: IOrigamTheme) => t.name)
        expect(allNames).not.toContain('origam')
    })

    for (const [label, preset, cssVars] of [
        ['light', presets.origamLightTheme, lightCssVars],
        ['dark',  presets.origamDarkTheme,  darkCssVars],
    ] as const) {
        it(`origam/${label} — every preset var matches light.css/dark.css`, () => {
            const presetVars = (preset as IOrigamTheme).vars ?? {}
            const mismatches: string[] = []
            const normalise = (v: string) =>
                v.replace(/\s*,\s*/g, ', ').replace(/\s+/g, ' ').trim().toLowerCase()

            for (const [name, presetVal] of Object.entries(presetVars)) {
                const cssVal = (cssVars as Record<string, string>)[name]
                if (cssVal === undefined) {
                    mismatches.push(`  MISSING in ${label}.css: ${name}`)
                    continue
                }
                if (normalise(String(presetVal)) !== normalise(cssVal)) {
                    mismatches.push(
                        `  ${name}:\n    preset: "${presetVal}"\n    css:    "${cssVal}"`
                    )
                }
            }
            expect(mismatches, mismatches.join('\n')).toHaveLength(0)
        })

        it(`origam/${label} — no extra vars absent from ${label}.css`, () => {
            const presetVars = (preset as IOrigamTheme).vars ?? {}
            const extra = Object.keys(presetVars).filter(
                k => !((cssVars as Record<string, string>)[k])
            )
            expect(extra, `vars in preset but not in ${label}.css: ${extra.join(', ')}`).toHaveLength(0)
        })
    }

    it('origamLightTheme includes surface/text/action tokens from light.css', () => {
        expect(presets.origamLightTheme.vars?.['--origam-color__surface---default'])
            .toBe(lightCssVars['--origam-color__surface---default'])
        expect(presets.origamLightTheme.vars?.['--origam-color__text---primary'])
            .toBe(lightCssVars['--origam-color__text---primary'])
        expect(presets.origamLightTheme.vars?.['--origam-color__action--primary---bg'])
            .toBe(lightCssVars['--origam-color__action--primary---bg'])
    })

    it('origamDarkTheme surface is the dark-mode background', () => {
        // dark.css surface.default = {color.neutral.950} = #0a0a0a
        expect(presets.origamDarkTheme.vars?.['--origam-color__surface---default'])
            .toBe(darkCssVars['--origam-color__surface---default'])
    })
})
