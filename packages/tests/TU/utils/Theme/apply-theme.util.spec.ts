// Tests for the runtime theme resolver / injector consumed by
// `createOrigam({ theme })` and the Theme Builder CSS export.

import { afterEach, describe, expect, it } from 'vitest'

import {
    applyTheme,
    resolveThemeVars,
    themeSelector,
    themeToCss,
    tokenTreeToVars
} from '@origam/utils/Theme/apply-theme.util'

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

describe('resolveThemeVars — merge vars over tokens', () => {
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
})
