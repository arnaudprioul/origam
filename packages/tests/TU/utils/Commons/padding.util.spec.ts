// TU — padding.util.ts

import { describe, expect, it } from 'vitest'
import { formatPaddingStylesVar } from '@origam/utils/Commons/padding.util'

describe('formatPaddingStylesVar', () => {
    // ── 1 value: shorthand ───────────────────────────────────────────────────
    it('emits a single shorthand padding for 1 value', () => {
        expect(formatPaddingStylesVar(['16px'])).toEqual(['padding: 16px'])
    })

    it('preserves CSS var value verbatim', () => {
        expect(formatPaddingStylesVar(['var(--spacing-4)'])[0]).toBe('padding: var(--spacing-4)')
    })

    it('preserves 0 as a value', () => {
        expect(formatPaddingStylesVar(['0'])).toEqual(['padding: 0'])
    })

    // ── 2 values: block + inline ─────────────────────────────────────────────
    it('emits block + inline declarations for 2 values', () => {
        const result = formatPaddingStylesVar(['8px', '16px'])
        expect(result).toHaveLength(2)
        expect(result).toContain('padding-block: 8px')
        expect(result).toContain('padding-inline: 16px')
    })

    it('2-value: first is block, second is inline', () => {
        const [first, second] = formatPaddingStylesVar(['vertical', 'horizontal'])
        expect(first).toContain('block')
        expect(first).toContain('vertical')
        expect(second).toContain('inline')
        expect(second).toContain('horizontal')
    })

    // ── 4 values: logical sides ──────────────────────────────────────────────
    it('emits 4 logical-side declarations for 4 values', () => {
        const result = formatPaddingStylesVar(['8px', '16px', '24px', '32px'])
        expect(result).toHaveLength(4)
        expect(result).toContain('padding-block-start: 8px')
        expect(result).toContain('padding-inline-start: 16px')
        expect(result).toContain('padding-block-end: 24px')
        expect(result).toContain('padding-inline-end: 32px')
    })

    it('4-value: values[0]=block-start, values[1]=inline-start, values[2]=block-end, values[3]=inline-end', () => {
        const result = formatPaddingStylesVar(['a', 'b', 'c', 'd'])
        const blockStart = result.find(r => r.includes('block-start'))
        const inlineStart = result.find(r => r.includes('inline-start'))
        const blockEnd = result.find(r => r.includes('block-end'))
        const inlineEnd = result.find(r => r.includes('inline-end'))
        expect(blockStart).toContain('a')
        expect(inlineStart).toContain('b')
        expect(blockEnd).toContain('c')
        expect(inlineEnd).toContain('d')
    })

    // ── edge cases ────────────────────────────────────────────────────────────
    it('returns empty array for 0 values', () => {
        expect(formatPaddingStylesVar([])).toEqual([])
    })

    it('returns empty array for 3 values (unsupported)', () => {
        expect(formatPaddingStylesVar(['1px', '2px', '3px'])).toEqual([])
    })

    it('returns empty array for 5 values (unsupported)', () => {
        expect(formatPaddingStylesVar(['1px', '2px', '3px', '4px', '5px'])).toEqual([])
    })
})
