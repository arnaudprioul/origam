// TU — location.util.ts
//
// Exported functions:
//   pixelRound           — pure math (devicePixelRatio-aware)
//   pixelCeil            — pure math (devicePixelRatio-aware)
//   staticLocationStrategy — stub (TODO, no body to test)
//   getIntrinsicSize     — requires a live HTMLElement with style mutations
//   isFixedPosition      — requires window.getComputedStyle (DOM)
//   connectedLocationStrategy — Vue scope + ResizeObserver + DOM
//
// Only pixelRound and pixelCeil are suitable for headless unit testing.
// The DOM-bound functions are skipped with explanatory comments.

import { describe, expect, it } from 'vitest'
import { pixelRound, pixelCeil } from '@origam/utils/Commons/location.util'

// jsdom sets devicePixelRatio to 1 by default.
// Both helpers are tested against that baseline.

describe('pixelRound', () => {
    it('rounds a whole number to itself (dpr=1)', () => {
        expect(pixelRound(10)).toBe(10)
    })

    it('rounds 0.5 to 1 (dpr=1 → round(0.5) === 1)', () => {
        expect(pixelRound(0.5)).toBe(1)
    })

    it('rounds 0.4 down to 0 (dpr=1)', () => {
        expect(pixelRound(0.4)).toBe(0)
    })

    it('rounds negative values symmetrically', () => {
        expect(pixelRound(-1.6)).toBe(-2)
    })

    it('returns 0 for 0', () => {
        expect(pixelRound(0)).toBe(0)
    })

    it('works with large floats', () => {
        expect(pixelRound(123.7)).toBe(124)
    })
})

describe('pixelCeil', () => {
    it('ceils a whole number to itself (dpr=1)', () => {
        expect(pixelCeil(10)).toBe(10)
    })

    it('ceils 0.1 up to 1 (dpr=1)', () => {
        expect(pixelCeil(0.1)).toBe(1)
    })

    it('ceils 0.9 up to 1 (dpr=1)', () => {
        expect(pixelCeil(0.9)).toBe(1)
    })

    it('returns 0 for 0', () => {
        expect(pixelCeil(0)).toBe(0)
    })

    it('handles negative values (Math.ceil rounds toward zero)', () => {
        expect(pixelCeil(-1.5)).toBe(-1)
    })
})

// ── Skipped: DOM-bound exports ────────────────────────────────────────────────
// isFixedPosition: requires window.getComputedStyle and DOM tree traversal.
//   Cannot be meaningfully tested in jsdom without mounting a real page.
// getIntrinsicSize: requires el.style mutation and nullifyTransforms (DOM).
// staticLocationStrategy: function body is a TODO stub — nothing to assert.
// connectedLocationStrategy: requires Vue reactive scope, ResizeObserver and
//   a live DOM for getBoundingClientRect. This belongs in an e2e/integration spec.
