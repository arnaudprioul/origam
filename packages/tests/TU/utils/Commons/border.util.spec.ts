// TU — border.util.ts

import { describe, expect, it } from 'vitest'
import {
    formatBorderPositionStylesVar,
    formatBorderStylesVar,
    parseBorderPositionValue,
    resolveBorderSideColor
} from '@origam/utils/Commons/border.util'

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

// ── parseBorderPositionValue (issue #215) ─────────────────────────────────
describe('parseBorderPositionValue', () => {
    it('parses a full "width style color" string into its three facets', () => {
        expect(parseBorderPositionValue('2px dashed red')).toEqual({
            width: '2px',
            style: 'dashed',
            color: 'red',
        })
    })

    it('defaults style to "solid" when omitted', () => {
        expect(parseBorderPositionValue('2px')).toEqual({
            width: '2px',
            style: 'solid',
            color: 'currentColor',
        })
    })

    it('defaults color to "currentColor" when omitted', () => {
        expect(parseBorderPositionValue('2px dashed')).toEqual({
            width: '2px',
            style: 'dashed',
            color: 'currentColor',
        })
    })

    it('accepts a var(--...) custom-property color untouched', () => {
        const result = parseBorderPositionValue('2px solid var(--origam-color__action--primary---bg)')
        expect(result?.color).toBe('var(--origam-color__action--primary---bg)')
    })

    it('returns null for an unparsable / empty string', () => {
        expect(parseBorderPositionValue('')).toBeNull()
        expect(parseBorderPositionValue('not-a-border-value-!!!')).toBeNull()
    })
})

// ── formatBorderPositionStylesVar (issue #215) ────────────────────────────
describe('formatBorderPositionStylesVar', () => {
    it('emits physical border-{position}-{type} declarations for width/style/color', () => {
        const result = formatBorderPositionStylesVar('top', { width: '2px', style: 'dashed', color: 'red' })
        expect(result).toEqual([
            'border-top-width: 2px',
            'border-top-style: dashed',
            'border-top-color: red',
        ])
    })

    it('honours the requested physical position (not a logical property)', () => {
        const result = formatBorderPositionStylesVar('left', { width: '1px', style: 'solid', color: 'blue' })
        expect(result).toContain('border-left-width: 1px')
        expect(result.some(d => d.includes('inline'))).toBe(false)
    })

    it('omits a facet when absent', () => {
        const result = formatBorderPositionStylesVar('right', { width: '2px' })
        expect(result).toEqual(['border-right-width: 2px'])
    })

    it('returns an empty array when no facet is provided', () => {
        expect(formatBorderPositionStylesVar('bottom', {})).toEqual([])
    })
})

// ── resolveBorderSideColor (issue #215) ───────────────────────────────────
describe('resolveBorderSideColor', () => {
    it('resolves a semantic intent to its foreground token', () => {
        const result = resolveBorderSideColor('primary')
        expect(result).toContain('var(--origam-color')
    })

    it('passes through a raw CSS color untouched', () => {
        expect(resolveBorderSideColor('#ff0000')).toBe('#ff0000')
        expect(resolveBorderSideColor('rgb(1, 2, 3)')).toBe('rgb(1, 2, 3)')
    })

    it('returns null for a gradient value (unsupported on border-color)', () => {
        expect(resolveBorderSideColor('linear-gradient(red, blue)')).toBeNull()
    })

    it('returns null for a falsy / empty value', () => {
        expect(resolveBorderSideColor(undefined)).toBeNull()
        expect(resolveBorderSideColor('')).toBeNull()
        expect(resolveBorderSideColor(false as unknown as string)).toBeNull()
    })
})
