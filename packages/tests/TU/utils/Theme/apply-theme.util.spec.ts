// Tests for the runtime theme resolver / injector consumed by
// `createOrigam({ theme })` and the Theme Builder CSS export.

import { afterEach, describe, expect, it } from 'vitest'

import {
    applyTheme,
    applyThemes,
    installedThemesFromList,
    resolveThemeVars,
    semanticFieldsToVars,
    semanticTreeToVars,
    themeSelector,
    themeToCss,
    tokenTreeToVars
} from '@origam/utils/Theme/apply-theme.util'

import { sobreLightTheme } from '@origam/themes/sobre.theme'

afterEach(() => {
    document.querySelectorAll('style[data-origam-theme]').forEach(el => el.remove())
})

describe('tokenTreeToVars — DTCG tree → flat var map', () => {
    it('walks nested groups and converts each leaf path', () => {
        const vars = tokenTreeToVars({
            color: {
                neutral: { 500: '#737373' },
                action: { primary: { bg: '#7c3aed' } }
            },
            radius: { md: '0.5rem' }
        })
        expect(vars['--origam-color__neutral---500']).toBe('#737373')
        expect(vars['--origam-color__action--primary---bg']).toBe('#7c3aed')
        expect(vars['--origam-radius---md']).toBe('0.5rem')
    })

    it('unwraps DTCG $value leaves', () => {
        const vars = tokenTreeToVars({
            color: { surface: { default: { $value: '#0a0a0a', $type: 'color' } } }
        })
        expect(vars['--origam-color__surface---default']).toBe('#0a0a0a')
    })

    it('uses the component grammar when component=true', () => {
        const vars = tokenTreeToVars({ btn: { primary: { 'background-color': '#7c3aed' } } }, true)
        expect(vars['--origam-btn--primary---background-color']).toBe('#7c3aed')
    })
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

    it('the motion root nests duration/easing children (animation case)', () => {
        const vars = semanticTreeToVars({ duration: { fast: '100ms' }, easing: { standard: 'cubic-bezier(.4,0,.2,1)' } }, ['motion'])
        expect(vars['--origam-motion__duration---fast']).toBe('100ms')
        expect(vars['--origam-motion__easing---standard']).toBe('cubic-bezier(.4,0,.2,1)')
    })
})

describe('semanticFieldsToVars — friendly fields → token roots', () => {
    it('maps each authoring field to its token-path root', () => {
        const vars = semanticFieldsToVars({
            colors: { surface: { default: '#fff' } },
            radius: { md: '0.5rem' },
            spacing: { 4: '1rem' },
            typography: { size: { md: '1rem' }, weight: { bold: 700 } },
            shadow: { md: '0 2px 8px rgba(0,0,0,.12)' },
            animation: { duration: { fast: '100ms' }, easing: { standard: 'cubic-bezier(.4,0,.2,1)' } }
        })
        expect(vars['--origam-color__surface---default']).toBe('#fff')
        expect(vars['--origam-radius---md']).toBe('0.5rem')
        expect(vars['--origam-space---4']).toBe('1rem')
        expect(vars['--origam-font__size---md']).toBe('1rem')
        expect(vars['--origam-font__weight---bold']).toBe(700)
        expect(vars['--origam-shadow---md']).toBe('0 2px 8px rgba(0,0,0,.12)')
        expect(vars['--origam-motion__duration---fast']).toBe('100ms')
        expect(vars['--origam-motion__easing---standard']).toBe('cubic-bezier(.4,0,.2,1)')
    })
})

describe('resolveThemeVars — precedence: semantic < tokens < vars', () => {
    it('normalises var keys (with / without leading --)', () => {
        const vars = resolveThemeVars({ vars: { 'origam-radius---md': '0.5rem', '--origam-radius---lg': '0.75rem' } })
        expect(vars['--origam-radius---md']).toBe('0.5rem')
        expect(vars['--origam-radius---lg']).toBe('0.75rem')
    })

    it('vars win over tokens on collision', () => {
        const vars = resolveThemeVars({
            tokens: { radius: { md: '0.5rem' } },
            vars: { '--origam-radius---md': '1rem' }
        })
        expect(vars['--origam-radius---md']).toBe('1rem')
    })

    it('tokens win over semantic fields on collision; vars win over both', () => {
        const vars = resolveThemeVars({
            radius: { md: '0.5rem' },
            tokens: { radius: { md: '0.6rem' } },
            vars: { '--origam-radius---md': '0.7rem' }
        })
        expect(vars['--origam-radius---md']).toBe('0.7rem')
    })

    it('resolves the colors field with no vars/tokens escape hatch', () => {
        const vars = resolveThemeVars({ colors: { action: { primary: { bg: '#7c3aed' } } } })
        expect(vars['--origam-color__action--primary---bg']).toBe('#7c3aed')
    })
})

describe('sobre theme — semantic authoring resolves to the canonical --origam-* names', () => {
    it('light mode resolves the exact published var names (parity)', () => {
        const vars = resolveThemeVars(sobreLightTheme)
        // Surface / text / border
        expect(vars['--origam-color__surface---default']).toBe('#ffffff')
        expect(vars['--origam-color__surface---sunken']).toBe('#fafafa')
        expect(vars['--origam-color__text---primary']).toBe('#171717')
        // ADR-004 contrast fix preserved.
        expect(vars['--origam-color__text---secondary']).toBe('#737373')
        expect(vars['--origam-color__text---onColor']).toBe('#ffffff')
        expect(vars['--origam-color__border---focus']).toBe('#7c3aed')
        // Action (4-segment, camelCase property preserved)
        expect(vars['--origam-color__action--primary---bg']).toBe('#7c3aed')
        expect(vars['--origam-color__action--primary---bgHover']).toBe('#6d28d9')
        expect(vars['--origam-color__action--ghost---bg']).toBe('rgba(0, 0, 0, 0)')
        // Feedback
        expect(vars['--origam-color__feedback--success---bg']).toBe('#4caf50')
        expect(vars['--origam-color__feedback--danger---border']).toBe('#cf6679')
        // Overlay
        expect(vars['--origam-color__overlay---scrim']).toBe('#ffffff')
    })

    it('carries NO gradient vars (gradient is not a theme-authoring group)', () => {
        const vars = resolveThemeVars(sobreLightTheme)
        const gradientKeys = Object.keys(vars).filter(k => k.startsWith('--origam-gradient'))
        expect(gradientKeys).toEqual([])
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
        const css = themeToCss({ name: 'brand-a', vars: { '--origam-radius---md': '0.5rem' } })
        expect(css).toContain('[data-theme="brand-a"] {')
        expect(css).toContain('  --origam-radius---md: 0.5rem;')
        expect(css.trimEnd().endsWith('}')).toBe(true)
    })
})

describe('applyTheme — runtime injection', () => {
    it('injects a <style> element with the resolved vars', () => {
        const id = applyTheme({ name: 'brand-a', vars: { '--origam-radius---md': '0.5rem' } })
        expect(id).toBe('origam-theme-brand-a')
        const style = document.getElementById('origam-theme-brand-a')
        expect(style).not.toBeNull()
        expect(style!.textContent).toContain('[data-theme="brand-a"]')
        expect(style!.textContent).toContain('--origam-radius---md: 0.5rem;')
    })

    it('replaces the block in place on re-apply (no duplicate elements)', () => {
        applyTheme({ name: 'brand-a', vars: { '--origam-radius---md': '0.5rem' } })
        applyTheme({ name: 'brand-a', vars: { '--origam-radius---md': '1rem' } })
        const all = document.querySelectorAll('#origam-theme-brand-a')
        expect(all.length).toBe(1)
        expect(all[0].textContent).toContain('--origam-radius---md: 1rem;')
    })

    it('uses :root selector and the base id when no name', () => {
        const id = applyTheme({ vars: { '--origam-radius---md': '0.5rem' } })
        expect(id).toBe('origam-theme')
        expect(document.getElementById('origam-theme')!.textContent).toContain(':root {')
    })

    it('returns null for an empty theme', () => {
        expect(applyTheme({})).toBeNull()
    })

    it('keys the <style> id by name AND mode (same brand, two modes coexist)', () => {
        const idLight = applyTheme({ name: 'brand-a', mode: 'light', vars: { '--origam-color__surface---default': '#fff' } })
        const idDark = applyTheme({ name: 'brand-a', mode: 'dark', vars: { '--origam-color__surface---default': '#000' } })
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
            { name: 'brand-a', mode: 'light', vars: { '--origam-color__surface---default': '#fff' } },
            { name: 'brand-a', mode: 'dark', vars: { '--origam-color__surface---default': '#000' } },
            { name: 'brand-b', mode: 'light', vars: { '--origam-color__surface---default': '#eee' } }
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
            { name: 'brand-a', mode: 'light', vars: { '--origam-radius---md': '0.5rem' } },
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
            { vars: { '--origam-radius---md': '0.5rem' } },
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
