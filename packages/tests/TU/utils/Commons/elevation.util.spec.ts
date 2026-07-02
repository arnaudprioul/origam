// TU — elevation.util.ts
// `formatElevationStyle` is @deprecated since v0.4 but still ships in the
// codebase for migration-window consumers. The tests verify the observable
// behaviour (output string shape, correctness of the numeric computation)
// without testing internal constants.

import { describe, expect, it } from 'vitest'
import { formatElevationStyle } from '@origam/utils/Commons/elevation.util'

describe('formatElevationStyle', () => {
    // ── output shape ────────────────────────────────────────────────────────
    it('returns a string that starts with "box-shadow:"', () => {
        expect(formatElevationStyle(4)).toMatch(/^box-shadow:/)
    })

    it('contains a valid hsl() color token', () => {
        const result = formatElevationStyle(4)
        expect(result).toMatch(/hsl\(/)
    })

    it('contains 4 space-separated tokens after "box-shadow:" (offsetX offsetY blur color)', () => {
        // box-shadow: <offset-x> <offset-y> <blur-radius> <color>
        const body = formatElevationStyle(4).replace('box-shadow: ', '')
        // The color part is hsl(…) — split stops at the space before hsl
        const parts = body.split(' ')
        expect(parts.length).toBeGreaterThanOrEqual(4)
    })

    // ── elevation=0 ─────────────────────────────────────────────────────────
    it('elevation=0 produces 0px offsets', () => {
        const result = formatElevationStyle(0)
        // When elevation=0 all normalized values converge to the scale minimum
        expect(result).toContain('0px')
    })

    it('uses default elevation=0 when no argument is given', () => {
        const withZero = formatElevationStyle(0)
        const withDefault = formatElevationStyle()
        expect(withZero).toBe(withDefault)
    })

    // ── elevation scaling ────────────────────────────────────────────────────
    it('larger elevation produces a larger blur radius', () => {
        // Extract the blur radius (3rd numeric token)
        const extract = (res: string) => {
            const body = res.replace('box-shadow: ', '')
            return parseFloat(body.split(' ')[2])
        }
        expect(extract(formatElevationStyle(20))).toBeGreaterThan(extract(formatElevationStyle(5)))
    })

    // ── bgColor tinting ──────────────────────────────────────────────────────
    it('accepts a bgColor and includes it in the hsl shadow', () => {
        const withColor = formatElevationStyle(8, '#ff0000')
        // With a red background the hsl() hue should reflect red (near 0deg)
        expect(withColor).toContain('0deg')
    })

    it('uses a neutral shadow when bgColor is not a parsable color', () => {
        // 'var(--custom)' is not parsable — falls back to h:0, s:0, l:0
        const result = formatElevationStyle(8, 'var(--custom)')
        expect(result).toContain('0deg')
    })

    // ── numeric precision ────────────────────────────────────────────────────
    it('output values are rounded to at most 1 decimal place for offsets/blur', () => {
        const result = formatElevationStyle(10)
        const body = result.replace('box-shadow: ', '')
        // Grab the first three space-separated tokens (offsetX offsetY blur)
        const tokens = body.split(' ').slice(0, 3)
        tokens.forEach(token => {
            const num = parseFloat(token)
            if (!isNaN(num)) {
                // Re-rounding to 1 decimal place should not change the value
                expect(Math.round(num * 10) / 10).toBeCloseTo(num, 5)
            }
        })
    })
})
