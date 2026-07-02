// Tests for `qr-code-adapters.util.ts`.
// Covers:
//   - resolveQrColor: intent → CSS var, raw CSS → passthrough, null/empty → fallback
//   - resolveQrCornerRadius: named rungs, boolean true/false, number clamping, CSS dims

import { describe, expect, it } from 'vitest'

import {
    resolveQrColor,
    resolveQrCornerRadius
} from '@origam/utils/QrCode/qr-code-adapters.util'

// ---------------------------------------------------------------------------
// resolveQrColor
// ---------------------------------------------------------------------------

describe('resolveQrColor', () => {
    // ── null / undefined / empty → fallback ──────────────────────────────
    it('null → fallback', () => {
        expect(resolveQrColor(null, 'foreground', '#000000')).toBe('#000000')
    })

    it('undefined → fallback', () => {
        expect(resolveQrColor(undefined, 'foreground', '#ffffff')).toBe('#ffffff')
    })

    it('empty string → fallback', () => {
        expect(resolveQrColor('' as any, 'foreground', 'black')).toBe('black')
    })

    // ── raw CSS → pass-through ────────────────────────────────────────────
    it('raw hex "#abc123" passes through verbatim', () => {
        expect(resolveQrColor('#abc123', 'foreground', 'black')).toBe('#abc123')
    })

    it('rgb(...) string passes through verbatim', () => {
        expect(resolveQrColor('rgb(0,0,0)' as any, 'background', 'white')).toBe('rgb(0,0,0)')
    })

    it('currentColor passes through verbatim', () => {
        expect(resolveQrColor('currentColor' as any, 'foreground', 'black')).toBe('currentColor')
    })

    it('transparent passes through verbatim', () => {
        expect(resolveQrColor('transparent' as any, 'background', 'white')).toBe('transparent')
    })

    // ── intent → CSS var ──────────────────────────────────────────────────
    it('role=foreground + intent "primary" → fgSubtle token var', () => {
        const result = resolveQrColor('primary', 'foreground', 'black')
        expect(result).toMatch(/^var\(--origam-/)
        // fgSubtle path for primary
        expect(result).toContain('action--primary')
        expect(result).toContain('fgSubtle')
    })

    it('role=background + intent "primary" → bg token var', () => {
        const result = resolveQrColor('primary', 'background', 'black')
        expect(result).toMatch(/^var\(--origam-/)
        expect(result).toContain('action--primary')
        expect(result).toContain('bg')
    })

    it('role=foreground + intent "success" → feedback fgSubtle token var', () => {
        const result = resolveQrColor('success', 'foreground', 'black')
        expect(result).toMatch(/^var\(--origam-/)
        expect(result).toContain('feedback--success')
        expect(result).toContain('fgSubtle')
    })

    it('role=background + intent "danger" → feedback bg token var', () => {
        const result = resolveQrColor('danger', 'background', 'black')
        expect(result).toMatch(/^var\(--origam-/)
        expect(result).toContain('feedback--danger')
        expect(result).toContain('bg')
    })

    it('role=foreground + intent "neutral" → secondary fg token var', () => {
        const result = resolveQrColor('neutral', 'foreground', 'black')
        expect(result).toContain('action--secondary')
    })
})

// ---------------------------------------------------------------------------
// resolveQrCornerRadius
// ---------------------------------------------------------------------------

describe('resolveQrCornerRadius', () => {
    // ── false-y → 0 ───────────────────────────────────────────────────────
    it('undefined → 0', () => {
        expect(resolveQrCornerRadius(undefined)).toBe(0)
    })

    it('null → 0', () => {
        expect(resolveQrCornerRadius(null)).toBe(0)
    })

    it('false → 0', () => {
        expect(resolveQrCornerRadius(false)).toBe(0)
    })

    it('empty string → 0', () => {
        expect(resolveQrCornerRadius('')).toBe(0)
    })

    // ── true → 0.5 ───────────────────────────────────────────────────────
    it('true → 0.5 (fully rounded alias)', () => {
        expect(resolveQrCornerRadius(true)).toBe(0.5)
    })

    // ── named rungs ───────────────────────────────────────────────────────
    it.each([
        ['x-small', 0.10],
        ['small', 0.18],
        ['default', 0.25],
        ['medium', 0.30],
        ['large', 0.40],
        ['x-large', 0.50],
        ['shaped', 0.25],
        ['shaped-invert', 0.25]
    ] as Array<[string, number]>)('named rung "%s" → %f', (rung, expected) => {
        expect(resolveQrCornerRadius(rung)).toBe(expected)
    })

    // ── numeric clamping ──────────────────────────────────────────────────
    it('number 0 → 0', () => {
        expect(resolveQrCornerRadius(0)).toBe(0)
    })

    it('number 0.25 → 0.25 (within range)', () => {
        expect(resolveQrCornerRadius(0.25)).toBe(0.25)
    })

    it('number 0.5 → 0.5 (maximum)', () => {
        expect(resolveQrCornerRadius(0.5)).toBe(0.5)
    })

    it('number 1 → 0.5 (clamped to max)', () => {
        expect(resolveQrCornerRadius(1)).toBe(0.5)
    })

    it('negative number -0.1 → 0 (clamped to min)', () => {
        expect(resolveQrCornerRadius(-0.1)).toBe(0)
    })

    it('number 0.3 → 0.3 (in-range passthrough)', () => {
        expect(resolveQrCornerRadius(0.3)).toBe(0.3)
    })

    // ── CSS dimension strings (unknown → 0) ───────────────────────────────
    it('"4px" CSS string → 0 (pixels not a named rung)', () => {
        expect(resolveQrCornerRadius('4px')).toBe(0)
    })

    it('"0.25rem" CSS string → 0', () => {
        expect(resolveQrCornerRadius('0.25rem')).toBe(0)
    })

    it('unknown string "huge" → 0', () => {
        expect(resolveQrCornerRadius('huge')).toBe(0)
    })
})
