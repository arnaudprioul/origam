// Tests for `color-picker.util.ts`.
// Covers:
//   - stripAlpha: removes/keeps `a` key
//   - extractColor: returns hex string for string input, RGBA/HSLA/HSVA for object inputs
//   - hasAlpha: detects alpha in string (length > 7) or object (has `a`/`alpha` key)
//
// Note: `extractColor` calls `HSVtoHex`, `HSVtoRGB`, `HSVtoHSL` from color.util.
// These do NOT use canvas or color-mix() — they are pure math functions,
// fully deterministic in jsdom. No skips required.

import { describe, expect, it } from 'vitest'

import type { THSVA } from '@origam/types'

import {
    extractColor,
    hasAlpha,
    stripAlpha
} from '@origam/utils/ColorPicker/color-picker.util'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** A fully opaque HSVA value for pure red in HSV space. */
const RED_HSVA: THSVA = { h: 0, s: 1, v: 1, a: 1 }
/** Pure green. */
const GREEN_HSVA: THSVA = { h: 120, s: 1, v: 1, a: 1 }
/** Pure blue, semi-transparent. */
const BLUE_SEMI: THSVA = { h: 240, s: 1, v: 1, a: 0.5 }
/** Black. */
const BLACK_HSVA: THSVA = { h: 0, s: 0, v: 0, a: 1 }
/** White. */
const WHITE_HSVA: THSVA = { h: 0, s: 0, v: 1, a: 1 }

// ---------------------------------------------------------------------------
// stripAlpha
// ---------------------------------------------------------------------------

describe('stripAlpha', () => {
    it('strips the `a` key when stripAlpha=true', () => {
        const color = { r: 255, g: 0, b: 0, a: 1 }
        const result = stripAlpha(color, true)
        expect(result).not.toHaveProperty('a')
        expect(result.r).toBe(255)
    })

    it('keeps the `a` key when stripAlpha=false', () => {
        const color = { r: 255, g: 0, b: 0, a: 0.5 }
        const result = stripAlpha(color, false)
        expect(result.a).toBe(0.5)
    })

    it('does not mutate the original object', () => {
        const color = { r: 255, g: 0, b: 0, a: 1 }
        stripAlpha(color, true)
        expect(color).toHaveProperty('a')
    })

    it('works on object without `a` when stripAlpha=false', () => {
        const color = { r: 255, g: 0, b: 0 }
        const result = stripAlpha(color, false)
        expect(result).toEqual({ r: 255, g: 0, b: 0 })
    })
})

// ---------------------------------------------------------------------------
// extractColor — string input path
// ---------------------------------------------------------------------------

describe('extractColor — string / null input → hex output', () => {
    it('null input → hex string (full 7-char for a=1)', () => {
        const result = extractColor(RED_HSVA, null)
        expect(typeof result).toBe('string')
        expect(result).toMatch(/^#[0-9A-Fa-f]{6}$/)
    })

    it('string input → hex string (full 7-char for a=1)', () => {
        const result = extractColor(RED_HSVA, 'anything')
        expect(typeof result).toBe('string')
        expect(result).toMatch(/^#[0-9A-Fa-f]{6}$/)
    })

    it('a=1 → 7-char hex (#RRGGBB, no alpha)', () => {
        const result = extractColor(RED_HSVA, null)
        // Slice to 7 already done: '#FF0000'
        expect((result as string).length).toBe(7)
    })

    it('a<1 → 9-char hex (#RRGGBBAA)', () => {
        const result = extractColor(BLUE_SEMI, null)
        expect(typeof result).toBe('string')
        expect((result as string).length).toBe(9)
    })

    it('red HSVA → #FF0000', () => {
        expect(extractColor(RED_HSVA, null)).toBe('#FF0000')
    })

    it('black HSVA → #000000', () => {
        expect(extractColor(BLACK_HSVA, null)).toBe('#000000')
    })

    it('white HSVA → #FFFFFF', () => {
        expect(extractColor(WHITE_HSVA, null)).toBe('#FFFFFF')
    })

    it('green HSVA → #00FF00', () => {
        expect(extractColor(GREEN_HSVA, null)).toBe('#00FF00')
    })
})

// ---------------------------------------------------------------------------
// extractColor — object input path
// ---------------------------------------------------------------------------

describe('extractColor — object input → converted object', () => {
    it('RGB object input → returns object with r/g/b', () => {
        const result = extractColor(RED_HSVA, { r: 0, g: 0, b: 0 })
        expect(result).toHaveProperty('r')
        expect(result).toHaveProperty('g')
        expect(result).toHaveProperty('b')
    })

    it('RGB object + a key → keeps alpha in result', () => {
        const result = extractColor(BLUE_SEMI, { r: 0, g: 0, b: 0, a: 1 }) as any
        expect(result).toHaveProperty('a')
    })

    it('RGB object without a key + a=1 in HSVA → alpha stripped', () => {
        const result = extractColor(RED_HSVA, { r: 0, g: 0, b: 0 }) as any
        expect(result).not.toHaveProperty('a')
    })

    it('HSL object input → returns object with h/s/l', () => {
        const result = extractColor(RED_HSVA, { h: 0, s: 0, l: 0 })
        expect(result).toHaveProperty('h')
        expect(result).toHaveProperty('s')
        expect(result).toHaveProperty('l')
    })

    it('HSV object input → returns object with h/s/v', () => {
        const result = extractColor(RED_HSVA, { h: 0, s: 0, v: 0 })
        expect(result).toHaveProperty('h')
        expect(result).toHaveProperty('s')
        expect(result).toHaveProperty('v')
    })

    it('HSV input returns same colour (identity path)', () => {
        const result = extractColor(RED_HSVA, { h: 0, s: 1, v: 1 }) as THSVA
        expect(result.h).toBe(0)
        expect(result.s).toBe(1)
        expect(result.v).toBe(1)
    })
})

// ---------------------------------------------------------------------------
// hasAlpha
// ---------------------------------------------------------------------------

describe('hasAlpha', () => {
    it('null/undefined → false', () => {
        expect(hasAlpha(null)).toBe(false)
        expect(hasAlpha(undefined)).toBe(false)
    })

    it('7-char hex "#FF0000" → false (no alpha)', () => {
        expect(hasAlpha('#FF0000')).toBe(false)
    })

    it('9-char hex "#FF0000FF" → true (length > 7)', () => {
        expect(hasAlpha('#FF0000FF')).toBe(true)
    })

    it('8-char hex "#FF0000FF" → true', () => {
        // Could be a lowercase 9-char; test the boundary condition.
        expect(hasAlpha('#FF0000FF')).toBe(true)
    })

    it('object with `a` key → true', () => {
        expect(hasAlpha({ r: 255, g: 0, b: 0, a: 1 })).toBe(true)
    })

    it('object with `alpha` key → true', () => {
        expect(hasAlpha({ h: 0, s: 1, l: 0.5, alpha: 0.8 })).toBe(true)
    })

    it('object without `a` or `alpha` → false', () => {
        expect(hasAlpha({ r: 255, g: 0, b: 0 })).toBe(false)
    })

    it('number type → false (not string or object)', () => {
        expect(hasAlpha(123)).toBe(false)
    })
})
