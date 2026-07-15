// Contrôle 1 (Couleur) — classifies a raw DS prop value into
// inherit/intent/custom, shared by `color`, `accentColor` and (embedded)
// `borderColor` (`color-field.html`).
import { describe, expect, it } from 'vitest'

import {
    isThemeBuilderHexColor,
    isThemeBuilderIntentValue,
    resolveThemeBuilderColorState
} from '~/utils/theme-builder-color.util'

describe('theme-builder-color.util', () => {
    describe('isThemeBuilderIntentValue', () => {
        it('accepts the 8 real TIntent values', () => {
            for (const intent of ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral', 'ghost']) {
                expect(isThemeBuilderIntentValue(intent)).toBe(true)
            }
        })

        it('rejects a hex colour', () => {
            expect(isThemeBuilderIntentValue('#7c3aed')).toBe(false)
        })

        it('rejects an unrelated string', () => {
            expect(isThemeBuilderIntentValue('primary-ish')).toBe(false)
        })
    })

    describe('isThemeBuilderHexColor', () => {
        it('accepts a 6-digit hex', () => {
            expect(isThemeBuilderHexColor('#7c3aed')).toBe(true)
        })

        it('accepts a 3-digit hex', () => {
            expect(isThemeBuilderHexColor('#abc')).toBe(true)
        })

        it('is case-insensitive', () => {
            expect(isThemeBuilderHexColor('#ABCDEF')).toBe(true)
        })

        it('rejects an rgb() string', () => {
            expect(isThemeBuilderHexColor('rgb(0, 0, 0)')).toBe(false)
        })

        it('rejects a bare intent name', () => {
            expect(isThemeBuilderHexColor('primary')).toBe(false)
        })
    })

    describe('resolveThemeBuilderColorState', () => {
        it('classifies undefined/null/empty as inherit', () => {
            expect(resolveThemeBuilderColorState(undefined)).toEqual({ mode: 'inherit' })
            expect(resolveThemeBuilderColorState(null)).toEqual({ mode: 'inherit' })
            expect(resolveThemeBuilderColorState('')).toEqual({ mode: 'inherit' })
        })

        it('classifies a real TIntent value as intent', () => {
            expect(resolveThemeBuilderColorState('secondary')).toEqual({ mode: 'intent', intent: 'secondary' })
        })

        it('classifies any other non-empty string (hex, rgb, hsl, var()) as custom', () => {
            expect(resolveThemeBuilderColorState('#7c3aed')).toEqual({ mode: 'custom', custom: '#7c3aed' })
            expect(resolveThemeBuilderColorState('rgb(124, 58, 237)')).toEqual({ mode: 'custom', custom: 'rgb(124, 58, 237)' })
            expect(resolveThemeBuilderColorState('var(--brand-color)')).toEqual({ mode: 'custom', custom: 'var(--brand-color)' })
        })

        it('falls back to inherit for a non-string, non-nullish value', () => {
            expect(resolveThemeBuilderColorState(42)).toEqual({ mode: 'inherit' })
        })
    })
})
