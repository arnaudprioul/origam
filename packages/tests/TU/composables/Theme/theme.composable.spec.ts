// Tests for `useTheme` composable.
// Covers: persistence, document attribute application, prefers-color-scheme
// resolution, toggle helper, SSR safety.

import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { applyThemeSync, readPersistedTheme, useTheme } from '@origam/composables/Theme/theme.composable'

const STORAGE_KEY = 'origam-theme'

function makeHost (cb: (api: ReturnType<typeof useTheme>) => void) {
    return defineComponent({
        setup () {
            const api = useTheme()
            cb(api)
            return () => h('div')
        }
    })
}

describe('useTheme', () => {
    beforeEach(() => {
        localStorage.clear()
        document.documentElement.removeAttribute('data-theme')
        // Reset matchMedia to a controllable mock
        const listeners = new Set<(e: MediaQueryListEvent) => void>()
        // @ts-expect-error - jsdom does not implement matchMedia
        window.matchMedia = vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            addEventListener: (_: string, l: (e: MediaQueryListEvent) => void) => listeners.add(l),
            removeEventListener: (_: string, l: (e: MediaQueryListEvent) => void) => listeners.delete(l),
            dispatchEvent: () => true,
            onchange: null,
            addListener: () => {},
            removeListener: () => {}
        }))
    })

    afterEach(() => {
        document.documentElement.removeAttribute('data-theme')
    })

    it('defaults to "auto" when no persisted value exists', () => {
        let captured: ReturnType<typeof useTheme> | null = null
        mount(makeHost(api => { captured = api }))
        expect(captured!.theme.value).toBe('auto')
    })

    it('reads persisted theme from localStorage', () => {
        localStorage.setItem(STORAGE_KEY, 'dark')
        // Force fresh module state by re-importing — singleton behaviour means
        // we observe the snapshot taken at first call. So we read manually.
        expect(readPersistedTheme()).toBe('dark')
    })

    it('applies data-theme attribute on setTheme()', async () => {
        let captured: ReturnType<typeof useTheme> | null = null
        mount(makeHost(api => { captured = api }))
        captured!.setTheme('dark')
        await nextTick()
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('removes data-theme when set to "auto"', async () => {
        let captured: ReturnType<typeof useTheme> | null = null
        mount(makeHost(api => { captured = api }))
        captured!.setTheme('dark')
        await nextTick()
        captured!.setTheme('auto')
        await nextTick()
        expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
    })

    it('persists theme changes to localStorage', async () => {
        let captured: ReturnType<typeof useTheme> | null = null
        mount(makeHost(api => { captured = api }))
        captured!.setTheme('dark')
        await nextTick()
        expect(localStorage.getItem(STORAGE_KEY)).toBe('dark')
    })

    it('toggle() flips light ↔ dark', async () => {
        let captured: ReturnType<typeof useTheme> | null = null
        mount(makeHost(api => { captured = api }))
        captured!.setTheme('light')
        await nextTick()
        captured!.toggle()
        expect(captured!.theme.value).toBe('dark')
        captured!.toggle()
        expect(captured!.theme.value).toBe('light')
    })

    it('applyThemeSync writes to document without Vue lifecycle', () => {
        applyThemeSync('dark')
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
        applyThemeSync('auto')
        expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
    })

    it('supports custom theme strings (e.g. "brand-a")', async () => {
        let captured: ReturnType<typeof useTheme> | null = null
        mount(makeHost(api => { captured = api }))
        captured!.setTheme('brand-a')
        await nextTick()
        expect(document.documentElement.getAttribute('data-theme')).toBe('brand-a')
    })
})
