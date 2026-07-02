// TU — anchor.util.ts
// Exports: parseAnchor, flipSide, flipAlign, flipCorner, getAxis

import { describe, expect, it } from 'vitest'
import { parseAnchor, flipSide, flipAlign, flipCorner, getAxis } from '@origam/utils/Commons/anchor.util'
import { AXIS } from '@origam/enums'

// ─── parseAnchor ─────────────────────────────────────────────────────────────

describe('parseAnchor', () => {
    it('parses "top" with default align=left (block side)', () => {
        const result = parseAnchor('top')
        expect(result.side).toBe('top')
        expect(result.align).toBe('left')
    })

    it('parses "bottom" with default align=left (block side)', () => {
        const result = parseAnchor('bottom')
        expect(result.side).toBe('bottom')
        expect(result.align).toBe('left')
    })

    it('parses "left" with default align=top (inline side)', () => {
        const result = parseAnchor('left')
        expect(result.side).toBe('left')
        expect(result.align).toBe('top')
    })

    it('parses "right" with default align=top (inline side)', () => {
        const result = parseAnchor('right')
        expect(result.side).toBe('right')
        expect(result.align).toBe('top')
    })

    it('parses "center" with default align=center', () => {
        const result = parseAnchor('center')
        expect(result.side).toBe('center')
        expect(result.align).toBe('center')
    })

    it('parses "top center" with explicit align=center', () => {
        const result = parseAnchor('top center')
        expect(result.side).toBe('top')
        expect(result.align).toBe('center')
    })

    it('parses "bottom right" with explicit align=right', () => {
        const result = parseAnchor('bottom right')
        expect(result.side).toBe('bottom')
        expect(result.align).toBe('right')
    })

    it('parses "left bottom" with explicit align=bottom', () => {
        const result = parseAnchor('left bottom')
        expect(result.side).toBe('left')
        expect(result.align).toBe('bottom')
    })
})

// ─── flipSide ────────────────────────────────────────────────────────────────

describe('flipSide', () => {
    it.each([
        ['top',    'bottom'],
        ['bottom', 'top'],
        ['left',   'right'],
        ['right',  'left'],
        ['center', 'center'],
    ] as [string, string][])('flipSide side=%p → %p', (side, expectedSide) => {
        const result = flipSide({ side: side as any, align: 'center' })
        expect(result.side).toBe(expectedSide)
    })

    it('preserves the align value', () => {
        const result = flipSide({ side: 'top', align: 'right' })
        expect(result.align).toBe('right')
    })
})

// ─── flipAlign ────────────────────────────────────────────────────────────────

describe('flipAlign', () => {
    it.each([
        ['top',    'bottom'],
        ['bottom', 'top'],
        ['left',   'right'],
        ['right',  'left'],
        ['center', 'center'],
    ] as [string, string][])('flipAlign align=%p → %p', (align, expectedAlign) => {
        const result = flipAlign({ side: 'top', align: align as any })
        expect(result.align).toBe(expectedAlign)
    })

    it('preserves the side value', () => {
        const result = flipAlign({ side: 'bottom', align: 'left' })
        expect(result.side).toBe('bottom')
    })
})

// ─── flipCorner ───────────────────────────────────────────────────────────────

describe('flipCorner', () => {
    it('swaps side and align', () => {
        const result = flipCorner({ side: 'top', align: 'right' })
        expect(result.side).toBe('right')
        expect(result.align).toBe('top')
    })

    it('swaps back when applied twice (idempotent)', () => {
        const original = { side: 'bottom' as const, align: 'left' as const }
        const twice = flipCorner(flipCorner(original))
        expect(twice.side).toBe(original.side)
        expect(twice.align).toBe(original.align)
    })
})

// ─── getAxis ─────────────────────────────────────────────────────────────────

describe('getAxis', () => {
    it('returns AXIS.Y for top anchor (block side)', () => {
        expect(getAxis({ side: 'top', align: 'left' })).toBe(AXIS.Y)
    })

    it('returns AXIS.Y for bottom anchor (block side)', () => {
        expect(getAxis({ side: 'bottom', align: 'right' })).toBe(AXIS.Y)
    })

    it('returns AXIS.X for left anchor (inline side)', () => {
        expect(getAxis({ side: 'left', align: 'top' })).toBe(AXIS.X)
    })

    it('returns AXIS.X for right anchor (inline side)', () => {
        expect(getAxis({ side: 'right', align: 'top' })).toBe(AXIS.X)
    })

    it('returns AXIS.X for center anchor (not in BLOCK_ARRAY)', () => {
        expect(getAxis({ side: 'center', align: 'center' })).toBe(AXIS.X)
    })
})
