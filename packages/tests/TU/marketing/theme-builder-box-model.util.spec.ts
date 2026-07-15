// Contrôle 6 (Padding / Margin) — the box-model editor writes a single CSS
// string prop (`padding` / `margin`), never the discrete per-side props
// (verified dead in the DS composables — see the util's own module doc).
// The order is [top, left, bottom, right], NOT the CSS clockwise convention
// — a silent left/right swap here is exactly the trap this suite guards
// against (module doc, `theme-builder-box-model.util.ts`).
import { describe, expect, it } from 'vitest'

import {
    isThemeBuilderSpacingScale,
    parseBoxModelString,
    resolveBoxModelState,
    serializeBoxModelAxis,
    serializeBoxModelState,
    serializeBoxModelUnlinked,
    serializeBoxModelUniform
} from '~/utils/theme-builder-box-model.util'

describe('theme-builder-box-model.util', () => {
    describe('serializeBoxModelUnlinked', () => {
        it('serialises edges in the [top, left, bottom, right] order — NOT clockwise', () => {
            expect(serializeBoxModelUnlinked({ top: 1, left: 2, bottom: 3, right: 4 })).toBe('1px 2px 3px 4px')
        })
    })

    describe('serializeBoxModelAxis', () => {
        it('serialises [vertical, horizontal]', () => {
            expect(serializeBoxModelAxis(12, 24)).toBe('12px 24px')
        })
    })

    describe('serializeBoxModelUniform', () => {
        it('serialises a single value', () => {
            expect(serializeBoxModelUniform(16)).toBe('16px')
        })
    })

    describe('parseBoxModelString', () => {
        it('parses a 1-value string as linked', () => {
            expect(parseBoxModelString('16px')).toEqual({
                mode: 'linked',
                edges: { top: 16, left: 16, bottom: 16, right: 16 }
            })
        })

        it('parses a 2-value string as axis — [vertical, horizontal]', () => {
            expect(parseBoxModelString('12px 24px')).toEqual({
                mode: 'axis',
                edges: { top: 12, bottom: 12, left: 24, right: 24 }
            })
        })

        it('parses a 4-value string as unlinked in [top, left, bottom, right] order', () => {
            expect(parseBoxModelString('1px 2px 3px 4px')).toEqual({
                mode: 'unlinked',
                edges: { top: 1, left: 2, bottom: 3, right: 4 }
            })
        })

        it('never swaps left/right when top !== bottom and left !== right', () => {
            const parsed = parseBoxModelString('0px 0px 24px 0px')
            expect(parsed?.edges).toEqual({ top: 0, left: 0, bottom: 24, right: 0 })
        })

        it('returns null for an empty string', () => {
            expect(parseBoxModelString('')).toBeNull()
        })

        it('returns null for a malformed length (not px)', () => {
            expect(parseBoxModelString('1em 2em')).toBeNull()
        })

        it('returns null for 3-value strings (not a supported CSS shorthand arity here)', () => {
            expect(parseBoxModelString('1px 2px 3px')).toBeNull()
        })
    })

    describe('resolveBoxModelState', () => {
        it('resolves a scale digit to its px seed, linked mode', () => {
            expect(resolveBoxModelState('4')).toEqual({
                mode: 'linked',
                edges: { top: 16, left: 16, bottom: 16, right: 16 }
            })
        })

        it('resolves a raw px string via parseBoxModelString', () => {
            expect(resolveBoxModelState('1px 2px 3px 4px')).toEqual({
                mode: 'unlinked',
                edges: { top: 1, left: 2, bottom: 3, right: 4 }
            })
        })

        it('falls back to an all-zero linked state for undefined/garbage input', () => {
            expect(resolveBoxModelState(undefined)).toEqual({
                mode: 'linked',
                edges: { top: 0, left: 0, bottom: 0, right: 0 }
            })
            expect(resolveBoxModelState('not-a-length')).toEqual({
                mode: 'linked',
                edges: { top: 0, left: 0, bottom: 0, right: 0 }
            })
        })
    })

    describe('serializeBoxModelState', () => {
        it('round-trips linked → uniform string', () => {
            const state = { mode: 'linked' as const, edges: { top: 8, left: 8, bottom: 8, right: 8 } }
            expect(serializeBoxModelState(state)).toBe('8px')
        })

        it('round-trips axis → 2-value string using top/left as the pair', () => {
            const state = { mode: 'axis' as const, edges: { top: 12, left: 24, bottom: 12, right: 24 } }
            expect(serializeBoxModelState(state)).toBe('12px 24px')
        })

        it('round-trips unlinked → 4-value string in [top, left, bottom, right] order', () => {
            const state = { mode: 'unlinked' as const, edges: { top: 1, left: 2, bottom: 3, right: 4 } }
            expect(serializeBoxModelState(state)).toBe('1px 2px 3px 4px')
        })
    })

    describe('isThemeBuilderSpacingScale', () => {
        it('accepts the real UTILITY_PADDING_SCALE / UTILITY_MARGIN_SCALE digits', () => {
            for (const step of ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12']) {
                expect(isThemeBuilderSpacingScale(step)).toBe(true)
            }
        })

        it('rejects a raw px string', () => {
            expect(isThemeBuilderSpacingScale('16px')).toBe(false)
        })

        it('rejects a non-string value', () => {
            expect(isThemeBuilderSpacingScale(16)).toBe(false)
            expect(isThemeBuilderSpacingScale(undefined)).toBe(false)
        })
    })
})
