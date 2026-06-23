// TU — parallax-element.util.ts
// Exports: elementMovement, cyclicMovement
//
// Pure math helpers — no DOM, no Vue.
// cyclicMovement accesses window.innerWidth/innerHeight when event='scroll'
// and when shape dimensions are absent — we stub them.

import { describe, expect, it, vi, afterEach } from 'vitest'
import { elementMovement, cyclicMovement } from '@origam/utils/Parallax/parallax-element.util'

afterEach(() => {
    vi.restoreAllMocks()
})

// ------------------------------------------------------------------ //

describe('elementMovement', () => {
    const base = { x: 0.5, y: 0.5, strength: 10, event: null as null }

    it('returns an object with x, y, target keys', () => {
        const result = elementMovement({ ...base })
        expect(result).toHaveProperty('x')
        expect(result).toHaveProperty('y')
        expect(result).toHaveProperty('target')
    })

    it('returns target from the input action', () => {
        const target = { top: 0, left: 0, width: 100, height: 100, right: 100, bottom: 100 } as DOMRect
        const result = elementMovement({ ...base, target })
        expect(result.target).toBe(target)
    })

    it('returns zero movement when x=originX/50 and y=originY/50', () => {
        // originX defaults to 50 → originX/50 = 1, y must be 1 too
        const result = elementMovement({ x: 1, y: 1, strength: 10, event: null })
        expect(result.x).toBeCloseTo(0, 5)
        expect(result.y).toBeCloseTo(0, 5)
    })

    it('scales movement by strength', () => {
        const r1 = elementMovement({ x: 0, y: 0, strength: 10, event: null })
        const r2 = elementMovement({ x: 0, y: 0, strength: 20, event: null })
        // Both displace from origin; strength doubles the magnitude
        expect(Math.abs(r2.x)).toBeCloseTo(Math.abs(r1.x) * 2, 5)
    })

    it('clamps movementX to maxX when the value exceeds it', () => {
        // movementX = (x - originX/50) * strength = (2 - 1) * 100 = 100 → clamped to 5
        const result = elementMovement({ x: 2, y: 1, strength: 100, event: null, maxX: 5 })
        expect(result.x).toBe(5)
    })

    it('clamps movementX to minX when the value is below it', () => {
        // movementX = (0 - 1) * 100 = -100 → clamped to -5
        const result = elementMovement({ x: 0, y: 1, strength: 100, event: null, minX: -5 })
        expect(result.x).toBe(-5)
    })

    it('clamps movementY to maxY when the value exceeds it', () => {
        // movementY = (y - originY/50) * strength = (2 - 1) * 100 = 100 → clamped to 3
        const result = elementMovement({ x: 1, y: 2, strength: 100, event: null, maxY: 3 })
        expect(result.y).toBe(3)
    })

    it('clamps movementY to minY when the value is below it', () => {
        // movementY = (0 - 1) * 100 = -100 → clamped to -3
        const result = elementMovement({ x: 1, y: 0, strength: 100, event: null, minY: -3 })
        expect(result.y).toBe(-3)
    })

    it('adjusts originY when event="scroll"', () => {
        // When event='scroll', originY = -originY/2 (defaults: originY=50 → -25)
        const withScroll    = elementMovement({ x: 0, y: 0, strength: 10, event: 'scroll', originY: 50 })
        const withoutScroll = elementMovement({ x: 0, y: 0, strength: 10, event: null,     originY: 50 })
        // Different origin → different movement
        expect(withScroll.y).not.toBeCloseTo(withoutScroll.y, 5)
    })

    it('does not apply clamping when min/max are not set', () => {
        const result = elementMovement({ x: 0, y: 0, strength: 10, event: null })
        // No clamping: result is purely (0 - 50/50)*10 = (0 - 1)*10 = -10
        expect(result.x).toBeCloseTo(-10, 5)
    })
})

describe('cyclicMovement', () => {
    const shape = { left: 0, top: 0, width: 400, height: 300, right: 400, bottom: 300 }

    it('returns an object with x and y', () => {
        const result = cyclicMovement({
            referencePosition: { x: 200, y: 150 },
            shape,
            event: 'mousemove',
            cycles: 1,
            strength: 10
        })
        expect(result).toHaveProperty('x')
        expect(result).toHaveProperty('y')
    })

    it('returns finite numbers', () => {
        const result = cyclicMovement({
            referencePosition: { x: 100, y: 100 },
            shape,
            event: 'mousemove',
            cycles: 2,
            strength: 5
        })
        expect(Number.isFinite(result.x)).toBe(true)
        expect(Number.isFinite(result.y)).toBe(true)
    })

    it('uses window.innerWidth/Height for scroll event spanning range', () => {
        vi.stubGlobal('innerWidth',  800)
        vi.stubGlobal('innerHeight', 600)

        const result = cyclicMovement({
            referencePosition: { x: 400, y: 300 },
            shape,
            event: 'scroll',
            cycles: 1,
            strength: 10
        })
        // Just verify it runs without error and returns numbers
        expect(Number.isFinite(result.x)).toBe(true)
        expect(Number.isFinite(result.y)).toBe(true)
    })

    it('returns 0 when referencePosition is at shape origin (sin(0)=0)', () => {
        // radialPositionX = ((0 - 0) * 2π) / width = 0 → sin(0 * cycles) = 0
        const result = cyclicMovement({
            referencePosition: { x: 0, y: 0 },
            shape,
            event: 'mousemove',
            cycles: 1,
            strength: 10
        })
        expect(result.x).toBeCloseTo(0, 5)
        expect(result.y).toBeCloseTo(0, 5)
    })

    it('scales by strength', () => {
        const low  = cyclicMovement({ referencePosition: { x: 100, y: 75 }, shape, event: 'mousemove', cycles: 1, strength: 5 })
        const high = cyclicMovement({ referencePosition: { x: 100, y: 75 }, shape, event: 'mousemove', cycles: 1, strength: 10 })

        // strength doubles → result doubles
        expect(high.x).toBeCloseTo(low.x * 2, 5)
        expect(high.y).toBeCloseTo(low.y * 2, 5)
    })
})
