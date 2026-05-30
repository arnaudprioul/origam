// Tests for the Nuxt-module theme resolver (preset names ⇄ IOrigamTheme[]).
// Pure functions — no Nuxt/DOM, so they run directly under vitest.

import { describe, expect, it, vi } from 'vitest'

import {
    partitionThemeEntries,
    presetThemeNames,
    resolvePresetThemes
} from '@origam/nuxt/resolve-themes'

describe('resolvePresetThemes', () => {
    it('resolves a preset name to every mode that brand ships', () => {
        const out = resolvePresetThemes(['sobre'])
        expect(out.length).toBeGreaterThanOrEqual(2)
        expect(out.every(t => t.name === 'sobre')).toBe(true)
        expect(out.map(t => t.mode).sort()).toEqual(['dark', 'light'])
    })

    it('resolves the default brand "origam" (module DEFAULTS) — a bare install renders', () => {
        // DEFAULTS.themes is ['origam']; this must resolve to concrete blocks so
        // `createOrigam()` with no themes still paints (no white).
        const out = resolvePresetThemes(['origam'])
        expect(out.length).toBeGreaterThanOrEqual(2)
        expect(out.every(t => t.name === 'origam')).toBe(true)
        expect(out.map(t => t.mode).sort()).toEqual(['dark', 'light'])
        // The base surface vars are present (proves it's a usable block).
        const light = out.find(t => t.mode === 'light')
        expect(light?.vars?.['--origam-color__surface---default']).toBe('#ffffff')
    })

    it('passes a single inline object through untouched', () => {
        const custom = { name: 'mybrand', mode: 'light' as const, vars: { '--origam-radius---md': '0.5rem' } }
        expect(resolvePresetThemes([custom])).toEqual([custom])
    })

    it('flattens an array entry (per-brand preset export shape)', () => {
        const a = { name: 'b', mode: 'light' as const, vars: {} }
        const b = { name: 'b', mode: 'dark' as const, vars: {} }
        expect(resolvePresetThemes([[a, b]])).toEqual([a, b])
    })

    it('mixes names + objects in order', () => {
        const custom = { name: 'mybrand', mode: 'dark' as const, vars: {} }
        const out = resolvePresetThemes(['sobre', custom])
        expect(out.some(t => t.name === 'sobre')).toBe(true)
        expect(out[out.length - 1]).toBe(custom)
    })

    it('warns and skips an unknown preset name (does not throw)', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const out = resolvePresetThemes(['does-not-exist'])
        expect(out).toEqual([])
        expect(warn).toHaveBeenCalledOnce()
        warn.mockRestore()
    })
})

describe('partitionThemeEntries', () => {
    it('splits string names from inline objects/arrays', () => {
        const obj = { name: 'mybrand', mode: 'light' as const, vars: {} }
        const arr = [{ name: 'pair', mode: 'light' as const, vars: {} }, { name: 'pair', mode: 'dark' as const, vars: {} }]
        const { presetNames, customThemes } = partitionThemeEntries(['sobre', obj, arr])
        expect(presetNames).toEqual(['sobre'])
        expect(customThemes).toEqual([obj, ...arr])
    })
})

describe('presetThemeNames', () => {
    it('lists the distinct built-in brands', () => {
        const names = presetThemeNames()
        expect(names).toContain('sobre')
        expect(names).toContain('geek')
        // distinct (no duplicates from the per-mode objects)
        expect(new Set(names).size).toBe(names.length)
    })
})
