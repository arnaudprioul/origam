// TU — rounded.util.ts

import { describe, expect, it } from 'vitest'
import { isCustomBorderRadius, formatRoundedStylesVar } from '@origam/utils/Commons/rounded.util'

// ─── isCustomBorderRadius ─────────────────────────────────────────────────────

describe('isCustomBorderRadius', () => {
    // CSS length units that count as custom
    it.each([
        '4px',
        '0.5rem',
        '10%',
        '2em',
        '1vh',
        '-4px',
    ])('returns true for CSS length %p', (v) => {
        expect(isCustomBorderRadius(v)).toBe(true)
    })

    // CSS function references
    it.each([
        'var(--origam-rounded-md)',
        'calc(100% - 4px)',
        'clamp(0px, 2vw, 8px)',
        'min(4px, 1vw)',
        'max(4px, 1vw)',
        'env(--safe-area-inset-top)',
    ])('returns true for CSS function %p', (v) => {
        expect(isCustomBorderRadius(v)).toBe(true)
    })

    // Design-system token names (not CSS lengths) — must return false
    // NOTE: bare '0' (without unit) also returns false — the regex requires
    // a unit suffix or a CSS function. 'border-radius: 0' is valid CSS but
    // the DS routes the `none` preset through a token, not through `'0'` raw.
    it.each([
        'sm',
        'md',
        'lg',
        'xl',
        'pill',
        'circle',
        'none',
        '',
        'rounded-md',
        '0',
    ])('returns false for DS token name / non-CSS value %p', (v) => {
        expect(isCustomBorderRadius(v)).toBe(false)
    })

    // Whitespace tolerance (trim is applied)
    it('handles surrounding whitespace', () => {
        expect(isCustomBorderRadius('  4px  ')).toBe(true)
    })
})

// ─── formatRoundedStylesVar ───────────────────────────────────────────────────

describe('formatRoundedStylesVar', () => {
    // ── 1 value: shorthand ───────────────────────────────────────────────────
    it('emits border-radius shorthand for 1 value', () => {
        const result = formatRoundedStylesVar(['8px'])
        expect(result).toEqual(['border-radius: 8px'])
    })

    it('preserves CSS var values verbatim', () => {
        const result = formatRoundedStylesVar(['var(--origam-rounded-md)'])
        expect(result[0]).toBe('border-radius: var(--origam-rounded-md)')
    })

    // ── 4 values: logical corners ────────────────────────────────────────────
    it('emits 4 logical corner declarations for 4 values', () => {
        const result = formatRoundedStylesVar(['4px', '8px', '12px', '16px'])
        expect(result).toHaveLength(4)
        expect(result).toContain('border-start-start-radius: 4px')
        expect(result).toContain('border-start-end-radius: 8px')
        expect(result).toContain('border-end-start-radius: 12px')
        expect(result).toContain('border-end-end-radius: 16px')
    })

    it('4-value: corner order is start-start, start-end, end-start, end-end', () => {
        const result = formatRoundedStylesVar(['1px', '2px', '3px', '4px'])
        expect(result[0]).toContain('start-start')
        expect(result[1]).toContain('start-end')
        expect(result[2]).toContain('end-start')
        expect(result[3]).toContain('end-end')
    })

    // ── edge cases ────────────────────────────────────────────────────────────
    it('returns empty array for 0 values', () => {
        expect(formatRoundedStylesVar([])).toEqual([])
    })

    it('returns empty array for 2 values (unsupported)', () => {
        expect(formatRoundedStylesVar(['4px', '8px'])).toEqual([])
    })

    it('returns empty array for 3 values (unsupported)', () => {
        expect(formatRoundedStylesVar(['1px', '2px', '3px'])).toEqual([])
    })
})
