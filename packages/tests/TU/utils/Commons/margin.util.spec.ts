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

    // ── 2 values: block + inline (parity with padding, issue #216) ───────────
    it('emits block + inline declarations for 2 values', () => {
        const result = formatMarginStylesVar(['8px', '16px'])
        expect(result).toHaveLength(2)
        expect(result).toContain('margin-block: 8px')
        expect(result).toContain('margin-inline: 16px')
    })

    it('2-value: first is block, second is inline', () => {
        const [first, second] = formatMarginStylesVar(['vertical', 'horizontal'])
        expect(first).toContain('block')
        expect(first).toContain('vertical')
        expect(second).toContain('inline')
        expect(second).toContain('horizontal')
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

    // ── order lock: Haut/Gauche/Bas/Droite, NOT CSS clockwise (issue #216) ───
    it('4-value: LOCKS the H/G/B/D convention — values[1] maps to LEFT (inline-start), not RIGHT', () => {
        // '8px 16px 24px 32px' → top=8px, LEFT=16px, bottom=24px, RIGHT=32px
        // Native CSS `margin: 8px 16px 24px 32px` would mean top=8/RIGHT=16/bottom=24/LEFT=32 — different!
        const result = formatMarginStylesVar(['8px', '16px', '24px', '32px'])
        expect(result).toContain('margin-block-start: 8px')   // top
        expect(result).toContain('margin-inline-start: 16px') // left (NOT right)
        expect(result).toContain('margin-block-end: 24px')    // bottom
        expect(result).toContain('margin-inline-end: 32px')   // right (NOT left)
    })

    // ── edge cases ────────────────────────────────────────────────────────────
    it('returns empty array for 0 values', () => {
        expect(formatMarginStylesVar([])).toEqual([])
    })

    it('returns empty array for 3 values (unsupported)', () => {
        expect(formatMarginStylesVar(['8px', '16px', '24px'])).toEqual([])
    })

    it('returns empty array for 5 values (unsupported)', () => {
        expect(formatMarginStylesVar(['1px', '2px', '3px', '4px', '5px'])).toEqual([])
    })
})
