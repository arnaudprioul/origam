// Tests for the runtime theme resolver / injector consumed by
// `createOrigam({ themes })` and the Theme Builder CSS export.

import { afterEach, describe, expect, it } from 'vitest'

import {
    applyTheme,
    applyThemes,
    installedThemesFromList,
    resolveThemeVars,
    semanticTreeToVars,
    themeSelector,
    themeToCss,
    themeVarsToVars
} from '@origam/utils/Theme/apply-theme.util'

import { origamLightTheme } from '@origam/themes/origam.theme'

afterEach(() => {
    document.querySelectorAll('style[data-origam-theme]').forEach(el => el.remove())
})

describe('semanticTreeToVars — authoring tree → flat var map (with root prefix)', () => {
    it('prefixes the leaf path with the field root', () => {
        const vars = semanticTreeToVars({ surface: { default: '#fff' }, text: { secondary: '#737373' } }, ['color'])
        expect(vars['--origam-color__surface---default']).toBe('#fff')
        expect(vars['--origam-color__text---secondary']).toBe('#737373')
    })

    it('resolves a top-level intent leaf (length-2 path)', () => {
        const vars = semanticTreeToVars({ primary: '#7c3aed' }, ['color'])
        expect(vars['--origam-color---primary']).toBe('#7c3aed')
    })

    it('resolves a 4-segment action path, preserving the camelCase property', () => {
        const vars = semanticTreeToVars({ action: { primary: { bgHover: '#6d28d9' } } }, ['color'])
        expect(vars['--origam-color__action--primary---bgHover']).toBe('#6d28d9')
    })

    it('passes a gradient value through verbatim (a gradient is an ordinary color)', () => {
        const vars = semanticTreeToVars({ surface: { default: 'linear-gradient(135deg, #a, #b)' } }, ['color'])
        expect(vars['--origam-color__surface---default']).toBe('linear-gradient(135deg, #a, #b)')
    })

    it('the motion root nests duration/easing children', () => {
        const vars = semanticTreeToVars({ duration: { fast: '100ms' }, easing: { standard: 'cubic-bezier(.4,0,.2,1)' } }, ['motion'])
        expect(vars['--origam-motion__duration---fast']).toBe('100ms')
        expect(vars['--origam-motion__easing---standard']).toBe('cubic-bezier(.4,0,.2,1)')
    })
})

describe('themeVarsToVars — the `vars` token bucket → flat var map', () => {
    it('maps each token GROUP to its --origam-* root', () => {
        const vars = themeVarsToVars({
            color: { surface: { default: '#fff' }, action: { primary: { bg: '#7c3aed' } } },
            rounded: { md: '10px' },
            border: { width: { thin: '1px' } },
            typo: { family: { sans: 'Inter, sans-serif' }, weight: { bold: 700 } },
            shadow: { md: '0 2px 8px rgba(0,0,0,.12)' },
            spacing: { 4: '1rem' },
            motion: { duration: { fast: '100ms' } }
        })
        expect(vars['--origam-color__surface---default']).toBe('#fff')
        expect(vars['--origam-color__action--primary---bg']).toBe('#7c3aed')
        // `rounded` → radius root, `typo` → font root
        expect(vars['--origam-radius---md']).toBe('10px')
        expect(vars['--origam-border__width---thin']).toBe('1px')
        expect(vars['--origam-font__family---sans']).toBe('Inter, sans-serif')
        expect(vars['--origam-font__weight---bold']).toBe(700)
        expect(vars['--origam-shadow---md']).toBe('0 2px 8px rgba(0,0,0,.12)')
        expect(vars['--origam-space---4']).toBe('1rem')
        expect(vars['--origam-motion__duration---fast']).toBe('100ms')
    })
})

describe('resolveThemeVars — precedence: vars < cssVars', () => {
    it('normalises cssVars keys (with / without leading --)', () => {
        const vars = resolveThemeVars({ cssVars: { 'origam-radius---md': '0.5rem', '--origam-radius---lg': '0.75rem' } })
        expect(vars['--origam-radius---md']).toBe('0.5rem')
        expect(vars['--origam-radius---lg']).toBe('0.75rem')
    })

    it('cssVars win over vars on collision', () => {
        const vars = resolveThemeVars({
            vars: { rounded: { md: '0.5rem' } },
            cssVars: { '--origam-radius---md': '1rem' }
        })
        expect(vars['--origam-radius---md']).toBe('1rem')
    })

    it('resolves the vars.color group with no escape hatch', () => {
        const vars = resolveThemeVars({ vars: { color: { action: { primary: { bg: '#7c3aed' } } } } })
        expect(vars['--origam-color__action--primary---bg']).toBe('#7c3aed')
    })
})

describe('origam theme — cssVars carries the full canonical --origam-* set', () => {
    it('light mode resolves the exact published var names + values (parity with the token sheets)', () => {
        const vars = resolveThemeVars(origamLightTheme)
        // Surface / text / border — values are the raw declarations from
        // packages/ds/dist/src/assets/css/tokens/light.css (verbatim, lowercase).
        expect(vars['--origam-color__surface---default']).toBe('#ffffff')
        expect(vars['--origam-color__surface---raised']).toBe('#ffffff')
        expect(vars['--origam-color__text---primary']).toBe('#171717')
        expect(vars['--origam-color__text---secondary']).toBe('#525252')
        expect(vars['--origam-color__text---onColor']).toBe('#ffffff')
        expect(vars['--origam-color__border---focus']).toBe('#7c3aed')
        // Action (4-segment, camelCase property preserved)
        expect(vars['--origam-color__action--primary---bg']).toBe('#7c3aed')
        expect(vars['--origam-color__action--primary---bgHover']).toBe('#6d28d9')
        expect(vars['--origam-color__action--ghost---bg']).toBe('rgba(0, 0, 0, 0)')
        // Feedback
        expect(vars['--origam-color__feedback--success---bg']).toBe('#4caf50')
    })

    it('carries the component tier — a bare createOrigam no longer leaves component vars undefined', () => {
        const vars = resolveThemeVars(origamLightTheme)
        // Regression guard for SPEC-021: the component tier (~2700 vars) must be
        // present, not just the semantic colour tier.
        expect(vars['--origam-btn---height']).toBe('36px')
        expect(vars['--origam-toolbar__wrapper---align-items']).toBe('flex-start')
    })

    it('carries the published gradient primitives (part of the canonical sheet)', () => {
        const vars = resolveThemeVars(origamLightTheme)
        const gradientKeys = Object.keys(vars).filter(k => k.startsWith('--origam-gradient'))
        expect(gradientKeys).toContain('--origam-gradient---sunset')
        expect(vars['--origam-gradient---sunset']).toBe('linear-gradient(135deg, #ff7e5f, #feb47b)')
    })
})

describe('themeSelector — name / mode scoping', () => {
    it(':root when neither name nor mode', () => {
        expect(themeSelector({})).toBe(':root')
    })
    it('[data-theme] when name only', () => {
        expect(themeSelector({ name: 'brand-a' })).toBe('[data-theme="brand-a"]')
    })
    it('[data-mode] when mode only', () => {
        expect(themeSelector({ mode: 'dark' })).toBe('[data-mode="dark"]')
    })
    it('compound when name + mode', () => {
        expect(themeSelector({ name: 'brand-a', mode: 'dark' })).toBe('[data-theme="brand-a"][data-mode="dark"]')
    })
    it('mode "auto" is not scoped', () => {
        expect(themeSelector({ name: 'brand-a', mode: 'auto' })).toBe('[data-theme="brand-a"]')
    })
})

describe('themeToCss — serialise to a CSS rule', () => {
    it('emits a selector block with declarations', () => {
        const css = themeToCss({ name: 'brand-a', cssVars: { '--origam-radius---md': '0.5rem' } })
        expect(css).toContain('[data-theme="brand-a"] {')
        expect(css).toContain('  --origam-radius---md: 0.5rem;')
        expect(css.trimEnd().endsWith('}')).toBe(true)
    })
})

describe('applyTheme — runtime injection', () => {
    it('injects a <style> element with the resolved vars', () => {
        const id = applyTheme({ name: 'brand-a', cssVars: { '--origam-radius---md': '0.5rem' } })
        expect(id).toBe('origam-theme-brand-a')
        const style = document.getElementById('origam-theme-brand-a')
        expect(style).not.toBeNull()
        expect(style!.textContent).toContain('[data-theme="brand-a"]')
        expect(style!.textContent).toContain('--origam-radius---md: 0.5rem;')
    })

    it('replaces the block in place on re-apply (no duplicate elements)', () => {
        applyTheme({ name: 'brand-a', cssVars: { '--origam-radius---md': '0.5rem' } })
        applyTheme({ name: 'brand-a', cssVars: { '--origam-radius---md': '1rem' } })
        const all = document.querySelectorAll('#origam-theme-brand-a')
        expect(all.length).toBe(1)
        expect(all[0].textContent).toContain('--origam-radius---md: 1rem;')
    })

    it('uses :root selector and the base id when no name', () => {
        const id = applyTheme({ cssVars: { '--origam-radius---md': '0.5rem' } })
        expect(id).toBe('origam-theme')
        expect(document.getElementById('origam-theme')!.textContent).toContain(':root {')
    })

    it('returns null for an empty theme', () => {
        expect(applyTheme({})).toBeNull()
    })

    it('keys the <style> id by name AND mode (same brand, two modes coexist)', () => {
        const idLight = applyTheme({ name: 'brand-a', mode: 'light', vars: { color: { surface: { default: '#fff' } } } })
        const idDark = applyTheme({ name: 'brand-a', mode: 'dark', vars: { color: { surface: { default: '#000' } } } })
        expect(idLight).toBe('origam-theme-brand-a-light')
        expect(idDark).toBe('origam-theme-brand-a-dark')
        // Both blocks coexist — the dark one did not overwrite the light one.
        expect(document.getElementById('origam-theme-brand-a-light')!.textContent).toContain('[data-theme="brand-a"][data-mode="light"]')
        expect(document.getElementById('origam-theme-brand-a-dark')!.textContent).toContain('[data-theme="brand-a"][data-mode="dark"]')
    })
})

describe('applyThemes — plural install', () => {
    it('injects one scoped block per theme and returns the written ids', () => {
        const ids = applyThemes([
            { name: 'brand-a', mode: 'light', vars: { color: { surface: { default: '#fff' } } } },
            { name: 'brand-a', mode: 'dark', vars: { color: { surface: { default: '#000' } } } },
            { name: 'brand-b', mode: 'light', vars: { color: { surface: { default: '#eee' } } } }
        ])
        expect(ids).toEqual([
            'origam-theme-brand-a-light',
            'origam-theme-brand-a-dark',
            'origam-theme-brand-b-light'
        ])
        expect(document.querySelectorAll('style[data-origam-theme]').length).toBe(3)
    })

    it('skips empty themes (returns a shorter id list)', () => {
        const ids = applyThemes([
            { name: 'brand-a', mode: 'light', cssVars: { '--origam-radius---md': '0.5rem' } },
            { name: 'brand-empty' }
        ])
        expect(ids).toEqual(['origam-theme-brand-a-light'])
    })
})

describe('installedThemesFromList — distinct brands + modes', () => {
    it('collapses same-name themes into one entry listing all modes', () => {
        const list = installedThemesFromList([
            { name: 'sobre', mode: 'light', vars: {} },
            { name: 'sobre', mode: 'dark', vars: {} },
            { name: 'geek', mode: 'dark', vars: {} }
        ])
        expect(list).toEqual([
            { name: 'sobre', modes: ['light', 'dark'], label: 'sobre' },
            { name: 'geek', modes: ['dark'], label: 'geek' }
        ])
    })

    it('ignores root-scoped (name-less) themes', () => {
        const list = installedThemesFromList([
            { cssVars: { '--origam-radius---md': '0.5rem' } },
            { name: 'sobre', mode: 'light', vars: {} }
        ])
        expect(list).toEqual([{ name: 'sobre', modes: ['light'], label: 'sobre' }])
    })

    it('surfaces label / description / swatch metadata (first non-empty per brand, label falls back to name)', () => {
        const list = installedThemesFromList([
            { name: 'sobre', mode: 'light', label: 'Sobre', description: 'Linear-style', swatch: 'linear-gradient(#000,#fff)', vars: {} },
            { name: 'sobre', mode: 'dark', vars: {} },
            { name: 'geek', mode: 'dark', vars: {} }
        ])
        expect(list).toEqual([
            { name: 'sobre', modes: ['light', 'dark'], label: 'Sobre', description: 'Linear-style', swatch: 'linear-gradient(#000,#fff)' },
            { name: 'geek', modes: ['dark'], label: 'geek' }
        ])
    })

    it('is pure — no DOM access (works without document)', () => {
        const list = installedThemesFromList([{ name: 'sobre', mode: 'light', vars: {} }])
        expect(list).toHaveLength(1)
        // No <style> element should have been created.
        expect(document.querySelectorAll('style[data-origam-theme]').length).toBe(0)
    })
})
