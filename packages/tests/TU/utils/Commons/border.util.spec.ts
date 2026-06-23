// TU — border.util.ts

import { describe, expect, it } from 'vitest'
import { formatBorderStylesVar } from '@origam/utils/Commons/border.util'

describe('formatBorderStylesVar', () => {
    // ── 1 value: shorthand ────────────────────────────────────────────────────
    it('emits a single shorthand border-{type} for 1 value', () => {
        const result = formatBorderStylesVar(['2px'], 'width')
        expect(result).toEqual(['border-width: 2px'])
    })

    it('works with type=color', () => {
        const result = formatBorderStylesVar(['red'], 'color')
        expect(result).toEqual(['border-color: red'])
    })

    it('works with type=style', () => {
        const result = formatBorderStylesVar(['dashed'], 'style')
        expect(result).toEqual(['border-style: dashed'])
    })

    // ── 2 values: block + inline ──────────────────────────────────────────────
    it('emits block + inline declarations for 2 values', () => {
        const result = formatBorderStylesVar(['1px', '3px'], 'width')
        expect(result).toEqual([
            'border-block-width: 1px',
            'border-inline-width: 3px',
        ])
    })

    it('2-value: first value maps to block, second to inline', () => {
        const [block, inline] = formatBorderStylesVar(['solid', 'dashed'], 'style')
        expect(block).toContain('block')
        expect(inline).toContain('inline')
        expect(block).toContain('solid')
        expect(inline).toContain('dashed')
    })

    // ── 4 values: per-side logical properties ─────────────────────────────────
    it('emits 4 logical-property declarations for 4 values', () => {
        const result = formatBorderStylesVar(['1px', '2px', '3px', '4px'], 'width')
        expect(result).toHaveLength(4)
        expect(result).toContain('border-block-start-width: 1px')
        expect(result).toContain('border-inline-start-width: 2px')
        expect(result).toContain('border-block-end-width: 3px')
        expect(result).toContain('border-inline-end-width: 4px')
    })

    it('4-value: order is block-start, inline-start, block-end, inline-end', () => {
        const result = formatBorderStylesVar(['top', 'right', 'bottom', 'left'], 'color')
        expect(result[0]).toContain('block-start')
        expect(result[0]).toContain('top')
        expect(result[1]).toContain('block-end')
        expect(result[1]).toContain('bottom')
        expect(result[2]).toContain('inline-start')
        expect(result[2]).toContain('right')
        expect(result[3]).toContain('inline-end')
        expect(result[3]).toContain('left')
    })

    // ── edge cases ────────────────────────────────────────────────────────────
    it('returns empty array for 0 values', () => {
        expect(formatBorderStylesVar([], 'width')).toEqual([])
    })

    it('returns empty array for unsupported length (3 values)', () => {
        expect(formatBorderStylesVar(['1px', '2px', '3px'], 'width')).toEqual([])
    })

    it('returns empty array for unsupported length (5 values)', () => {
        expect(formatBorderStylesVar(['1px', '2px', '3px', '4px', '5px'], 'width')).toEqual([])
    })

    it('handles CSS custom-property values without modification', () => {
        const result = formatBorderStylesVar(['var(--my-border-width)'], 'width')
        expect(result[0]).toContain('var(--my-border-width)')
    })
})
