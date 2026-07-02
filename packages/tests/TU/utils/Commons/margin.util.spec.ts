// TU — margin.util.ts

import { describe, expect, it } from 'vitest'
import { formatMarginStylesVar } from '@origam/utils/Commons/margin.util'

describe('formatMarginStylesVar', () => {
    // ── 1 value: shorthand ───────────────────────────────────────────────────
    it('emits a single shorthand margin for 1 value', () => {
        expect(formatMarginStylesVar(['16px'])).toEqual(['margin: 16px'])
    })

    it('preserves CSS var value verbatim', () => {
        const result = formatMarginStylesVar(['var(--spacing-4)'])
        expect(result[0]).toBe('margin: var(--spacing-4)')
    })

    it('preserves 0 as a value', () => {
        expect(formatMarginStylesVar(['0'])).toEqual(['margin: 0'])
    })

    // ── 4 values: logical sides ──────────────────────────────────────────────
    it('emits 4 logical-side declarations for 4 values', () => {
        const result = formatMarginStylesVar(['8px', '16px', '24px', '32px'])
        expect(result).toHaveLength(4)
        expect(result).toContain('margin-block-start: 8px')
        expect(result).toContain('margin-inline-start: 16px')
        expect(result).toContain('margin-block-end: 24px')
        expect(result).toContain('margin-inline-end: 32px')
    })

    it('4-value: values[0]=block-start, values[1]=inline-start, values[2]=block-end, values[3]=inline-end', () => {
        const result = formatMarginStylesVar(['a', 'b', 'c', 'd'])
        const blockStart = result.find(r => r.includes('block-start'))
        const inlineStart = result.find(r => r.includes('inline-start'))
        const blockEnd = result.find(r => r.includes('block-end'))
        const inlineEnd = result.find(r => r.includes('inline-end'))
        expect(blockStart).toContain('a')
        expect(inlineStart).toContain('b')
        expect(blockEnd).toContain('c')
        expect(inlineEnd).toContain('d')
    })

    it('4-value: handles auto values', () => {
        const result = formatMarginStylesVar(['0', 'auto', '0', 'auto'])
        expect(result).toContain('margin-inline-start: auto')
        expect(result).toContain('margin-inline-end: auto')
    })

    // ── edge cases ────────────────────────────────────────────────────────────
    it('returns empty array for 0 values', () => {
        expect(formatMarginStylesVar([])).toEqual([])
    })

    it('returns empty array for 2 values (unsupported)', () => {
        expect(formatMarginStylesVar(['8px', '16px'])).toEqual([])
    })

    it('returns empty array for 3 values (unsupported)', () => {
        expect(formatMarginStylesVar(['8px', '16px', '24px'])).toEqual([])
    })
})
