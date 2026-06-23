// Tests for `useVelocity` composable.
//
// useVelocity wraps a CircularBuffer-based gesture tracker. It is tested by
// exercising addMovement / endTouch / getVelocity directly — no Vue context
// needed (no reactive state in the composable itself).
//
// DOM TouchEvent is not present in jsdom. We build minimal synthetic objects
// that satisfy the shapes consumed by the composable.

import { describe, expect, it } from 'vitest'

import { useVelocity } from '@origam/composables/Commons/velocity.composable'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal Touch-like object. */
function makeTouch (id: number, clientX: number, clientY: number): Touch {
    return { identifier: id, clientX, clientY } as unknown as Touch
}

/** Build a minimal TouchEvent-like object. */
function makeTouchEvent (touches: Touch[], timeStamp: number): TouchEvent {
    return {
        changedTouches: touches,
        timeStamp
    } as unknown as TouchEvent
}

/**
 * Push a sequence of (x, y, t) samples into useVelocity for a given touch id.
 * Returns the composable API so callers can call getVelocity.
 */
function pushSamples (
    samples: Array<{ x: number; y: number; t: number }>,
    id = 0
) {
    const api = useVelocity()
    for (const s of samples) {
        const touch = makeTouch(id, s.x, s.y)
        api.addMovement(makeTouchEvent([touch], s.t))
    }
    return api
}

// ---------------------------------------------------------------------------
// addMovement / getVelocity — basic contract
// ---------------------------------------------------------------------------

describe('useVelocity — addMovement / getVelocity', () => {
    it('returns { x, y, direction } from getVelocity', () => {
        const api = pushSamples([
            { x: 0, y: 0, t: 0 },
            { x: 10, y: 0, t: 100 }
        ])
        const v = api.getVelocity(0)
        expect(v).toHaveProperty('x')
        expect(v).toHaveProperty('y')
        expect(v).toHaveProperty('direction')
    })

    it('throws when no samples exist for the requested id', () => {
        const { getVelocity } = useVelocity()
        expect(() => getVelocity(99)).toThrow('No samples for touch id 99')
    })

    it('rightward motion → direction "right"', () => {
        const api = pushSamples([
            { x: 0, y: 0, t: 0 },
            { x: 50, y: 0, t: 100 },
            { x: 100, y: 0, t: 200 }
        ])
        const v = api.getVelocity(0)
        expect(v.x).toBeGreaterThan(0)
        expect(v.direction).toBe('right')
    })

    it('leftward motion → direction "left"', () => {
        const api = pushSamples([
            { x: 100, y: 0, t: 0 },
            { x: 50, y: 0, t: 100 },
            { x: 0, y: 0, t: 200 }
        ])
        const v = api.getVelocity(0)
        expect(v.x).toBeLessThan(0)
        expect(v.direction).toBe('left')
    })

    it('downward motion → direction "down"', () => {
        const api = pushSamples([
            { x: 0, y: 0, t: 0 },
            { x: 0, y: 50, t: 100 },
            { x: 0, y: 100, t: 200 }
        ])
        const v = api.getVelocity(0)
        expect(v.y).toBeGreaterThan(0)
        expect(v.direction).toBe('down')
    })

    it('upward motion → direction "up"', () => {
        const api = pushSamples([
            { x: 0, y: 100, t: 0 },
            { x: 0, y: 50, t: 100 },
            { x: 0, y: 0, t: 200 }
        ])
        const v = api.getVelocity(0)
        expect(v.y).toBeLessThan(0)
        expect(v.direction).toBe('up')
    })
})

// ---------------------------------------------------------------------------
// endTouch — clears samples
// ---------------------------------------------------------------------------

describe('useVelocity — endTouch', () => {
    it('endTouch removes samples for the given id — getVelocity throws afterwards', () => {
        const api = pushSamples([
            { x: 0, y: 0, t: 0 },
            { x: 10, y: 0, t: 100 }
        ])
        const touch = makeTouch(0, 10, 0)
        api.endTouch(makeTouchEvent([touch], 200))
        expect(() => api.getVelocity(0)).toThrow()
    })

    it('endTouch for id=1 does not affect id=0', () => {
        const api = useVelocity()
        // id 0
        api.addMovement(makeTouchEvent([makeTouch(0, 0, 0)], 0))
        api.addMovement(makeTouchEvent([makeTouch(0, 10, 0)], 100))
        // id 1
        api.addMovement(makeTouchEvent([makeTouch(1, 5, 0)], 0))
        api.addMovement(makeTouchEvent([makeTouch(1, 15, 0)], 100))

        // Remove id=1 only
        api.endTouch(makeTouchEvent([makeTouch(1, 15, 0)], 200))

        expect(() => api.getVelocity(1)).toThrow()
        expect(() => api.getVelocity(0)).not.toThrow()
    })
})

// ---------------------------------------------------------------------------
// Multiple simultaneous touches
// ---------------------------------------------------------------------------

describe('useVelocity — multi-touch', () => {
    it('tracks multiple touch identifiers independently', () => {
        const api = useVelocity()

        // Two fingers moving in opposite directions at the same time
        api.addMovement(makeTouchEvent([makeTouch(0, 0, 0), makeTouch(1, 100, 0)], 0))
        api.addMovement(makeTouchEvent([makeTouch(0, 50, 0), makeTouch(1, 50, 0)], 100))
        api.addMovement(makeTouchEvent([makeTouch(0, 100, 0), makeTouch(1, 0, 0)], 200))

        const v0 = api.getVelocity(0)
        const v1 = api.getVelocity(1)

        expect(v0.direction).toBe('right')
        expect(v1.direction).toBe('left')
    })
})

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('useVelocity — edge cases', () => {
    it('single sample → velocity is zero', () => {
        const api = pushSamples([{ x: 10, y: 5, t: 0 }])
        const v = api.getVelocity(0)
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
    })

    it('two samples with identical timestamps → velocity is zero', () => {
        const api = pushSamples([
            { x: 0, y: 0, t: 100 },
            { x: 50, y: 0, t: 100 }  // same timestamp
        ])
        const v = api.getVelocity(0)
        expect(v.x).toBe(0)
    })

    it('repeated addMovement calls maintain only HISTORY (20) samples (no crash)', () => {
        // Push 30 samples — the circular buffer silently wraps
        const samples = Array.from({ length: 30 }, (_, i) => ({
            x: i * 2, y: 0, t: i * 16
        }))
        const api = pushSamples(samples)
        // Must not throw — velocity is still computable
        expect(() => api.getVelocity(0)).not.toThrow()
    })
})
