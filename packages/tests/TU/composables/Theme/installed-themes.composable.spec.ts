// Tests for useInstalledThemes() + the createOrigam({ themes }) plural install:
// the distinct installed brands must be provided to the app context, injected
// CSS-var blocks must be scoped per name×mode, and a consumer reads the list
// back through the composable.

import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

import { createOrigam } from '@origam/origam'
import { useInstalledThemes } from '@origam/composables/Theme/installed-themes.composable'
import { sobreTheme } from '@origam/themes/sobre.theme'

afterEach(() => {
    document.querySelectorAll('style[data-origam-theme]').forEach(el => el.remove())
})

function mountWithOrigam (origamOptions: Parameters<typeof createOrigam>[0], cb: (themes: ReturnType<typeof useInstalledThemes>) => void) {
    const Host = defineComponent({
        setup () {
            cb(useInstalledThemes())
            return () => h('div')
        }
    })
    return mount(Host, { global: { plugins: [createOrigam(origamOptions)] } })
}

describe('createOrigam({ themes }) — plural install', () => {
    it('injects one scoped <style> block per theme object', () => {
        mountWithOrigam({
            themes: [
                { name: 'sobre', mode: 'light', vars: { '--origam-color__surface---default': '#fff' } },
                { name: 'sobre', mode: 'dark', vars: { '--origam-color__surface---default': '#000' } },
                { name: 'geek', mode: 'dark', vars: { '--origam-color__surface---default': '#050a05' } }
            ]
        }, () => {})

        expect(document.getElementById('origam-theme-sobre-light')).not.toBeNull()
        expect(document.getElementById('origam-theme-sobre-dark')).not.toBeNull()
        expect(document.getElementById('origam-theme-geek-dark')).not.toBeNull()
        expect(document.getElementById('origam-theme-sobre-dark')!.textContent)
            .toContain('[data-theme="sobre"][data-mode="dark"]')
    })

    it('provides the distinct installed brands, read via useInstalledThemes()', () => {
        let captured: ReturnType<typeof useInstalledThemes> | null = null
        mountWithOrigam({
            themes: [
                { name: 'sobre', mode: 'light', vars: { '--origam-radius---md': '0.5rem' } },
                { name: 'sobre', mode: 'dark', vars: { '--origam-radius---md': '0.5rem' } },
                { name: 'geek', mode: 'dark', vars: { '--origam-radius---md': '0.25rem' } }
            ]
        }, (themes) => { captured = themes })

        expect(captured).toEqual([
            { name: 'sobre', modes: ['light', 'dark'], label: 'sobre' },
            { name: 'geek', modes: ['dark'], label: 'geek' }
        ])
    })

    it('surfaces label / swatch metadata for the switcher', () => {
        let captured: ReturnType<typeof useInstalledThemes> | null = null
        mountWithOrigam({
            themes: [
                { name: 'sobre', mode: 'light', label: 'Sobre', swatch: 'linear-gradient(#000,#8b5cf6)', vars: { '--origam-radius---md': '0.5rem' } },
                { name: 'sobre', mode: 'dark', vars: { '--origam-radius---md': '0.5rem' } }
            ]
        }, (themes) => { captured = themes })

        expect(captured).toEqual([
            { name: 'sobre', modes: ['light', 'dark'], label: 'Sobre', swatch: 'linear-gradient(#000,#8b5cf6)' }
        ])
    })

    it('merges singular `theme` and plural `themes`', () => {
        let captured: ReturnType<typeof useInstalledThemes> | null = null
        mountWithOrigam({
            theme: { name: 'sobre', mode: 'light', vars: { '--origam-radius---md': '0.5rem' } },
            themes: [{ name: 'geek', mode: 'dark', vars: { '--origam-radius---md': '0.25rem' } }]
        }, (themes) => { captured = themes })

        expect(captured).toEqual([
            { name: 'sobre', modes: ['light'], label: 'sobre' },
            { name: 'geek', modes: ['dark'], label: 'geek' }
        ])
    })

    it('exposes the installed list on the returned instance', () => {
        const origam = createOrigam({
            themes: [{ name: 'sobre', mode: 'light', vars: { '--origam-radius---md': '0.5rem' } }]
        })
        expect(origam.themes).toEqual([{ name: 'sobre', modes: ['light'], label: 'sobre' }])
    })
})

describe('install path via the built-in sobre theme (no themes-all.css)', () => {
    it('renders [data-theme=sobre][data-mode=dark] vars from the theme object alone', () => {
        // The themed output comes entirely from the injected block — no CSS
        // matrix is loaded in jsdom.
        mountWithOrigam({ themes: sobreTheme }, () => {})

        const sobreDark = document.getElementById('origam-theme-sobre-dark')
        expect(sobreDark).not.toBeNull()
        expect(sobreDark!.textContent).toContain('[data-theme="sobre"][data-mode="dark"]')
        expect(sobreDark!.textContent).toContain('--origam-color__surface---default')
    })

    it('bare install (no themes) falls back to the built-in sobre theme (still paints)', () => {
        // ADR-004: createOrigam installs `sobre` implicitly when no theme is
        // supplied, so a no-theme install still paints (no white).
        let captured: ReturnType<typeof useInstalledThemes> | null = null
        mountWithOrigam({}, (themes) => { captured = themes })

        expect(captured).toEqual([{ name: 'sobre', modes: ['light', 'dark'], label: 'Sobre', description: expect.any(String) }])
        const light = document.getElementById('origam-theme-sobre-light')
        expect(light).not.toBeNull()
        expect(light!.textContent).toContain('[data-theme="sobre"][data-mode="light"]')
        // The base surface var is present → the block is renderable (no white).
        expect(light!.textContent).toContain('--origam-color__surface---default: #ffffff;')
    })
})

describe('useInstalledThemes() — graceful default', () => {

    it('returns an empty array outside any createOrigam app', () => {
        let captured: ReturnType<typeof useInstalledThemes> | null = null
        const Host = defineComponent({
            setup () {
                captured = useInstalledThemes()
                return () => h('div')
            }
        })
        mount(Host)
        expect(captured).toEqual([])
    })
})
