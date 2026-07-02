// Unit tests for `useParallaxTransform`.
//
// The composable computes CSS transform strings from mouse/gyroscope offsets.
// It is pure (no DOM, no Vue reactivity needed beyond props access):
//   - `strength` = Math.abs(str) for DEPTH/DEPTH_INV, raw for others
//   - `transformStyles(x, y)` returns a CSS transform string per type
//
// Types covered: TRANSLATE, ROTATE (no axis / X / Y), DEPTH, DEPTH_INV,
// SCALE, SCALE_X, SCALE_Y.
//
// Edge cases: strength=0, negative inputs, very large x/y.

import { reactive } from 'vue'
import { describe, expect, it } from 'vitest'

import { AXIS, PARALLAX_ELEMENT_TYPE } from '@origam/enums'
import { useParallaxTransform } from '@origam/composables/Parallax/transform.composable'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeTransform (overrides: {
    type?: typeof PARALLAX_ELEMENT_TYPE[keyof typeof PARALLAX_ELEMENT_TYPE]
    strength?: number
    axis?: typeof AXIS[keyof typeof AXIS]
} = {}) {
    const props = reactive({
        type: overrides.type ?? PARALLAX_ELEMENT_TYPE.TRANSLATE,
        strength: overrides.strength,
        axis: overrides.axis
    })
    return useParallaxTransform(props as any)
}

// ---------------------------------------------------------------------------
// strength
// ---------------------------------------------------------------------------

describe('useParallaxTransform — strength', () => {
    it('defaults to 10 when strength is not provided', () => {
        const { strength } = makeTransform()
        expect(strength.value).toBe(10)
    })

    it('TRANSLATE: uses raw strength (can be negative)', () => {
        const { strength } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.TRANSLATE, strength: -5 })
        expect(strength.value).toBe(-5)
    })

    it('DEPTH: strength is always positive (Math.abs)', () => {
        const { strength } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.DEPTH, strength: -8 })
        expect(strength.value).toBe(8)
    })

    it('DEPTH_INV: strength is always positive (Math.abs)', () => {
        const { strength } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.DEPTH_INV, strength: -8 })
        expect(strength.value).toBe(8)
    })

    it('ROTATE: uses raw strength (can be negative)', () => {
        const { strength } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.ROTATE, strength: -3 })
        expect(strength.value).toBe(-3)
    })
})

// ---------------------------------------------------------------------------
// TRANSLATE
// ---------------------------------------------------------------------------

describe('useParallaxTransform — TRANSLATE', () => {
    it('returns a translate3d string', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.TRANSLATE })
        const result = transformStyles(5, 5)
        expect(result).toMatch(/^translate3d\(/)
    })

    it('x=0, y=0 → translate3d(-1px, -1px, 0)', () => {
        // formula: movementX = (strength * x) / 10 + 1 = (10 * 0) / 10 + 1 = 1
        // translate3d(-1px, -1px, 0)
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.TRANSLATE, strength: 10 })
        expect(transformStyles(0, 0)).toBe('translate3d(-1px, -1px, 0)')
    })

    it('larger x gives larger horizontal offset', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.TRANSLATE, strength: 10 })
        const small = transformStyles(2, 0)
        const large = transformStyles(8, 0)
        const parseX = (s: string) => parseFloat(s.replace('translate3d(', ''))
        expect(Math.abs(parseX(large))).toBeGreaterThan(Math.abs(parseX(small)))
    })

    it('strength=0, x=5 → minimal offset (only the +1 bias)', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.TRANSLATE, strength: 0 })
        const result = transformStyles(5, 0)
        expect(result).toBe('translate3d(-1px, -1px, 0)')
    })
})

// ---------------------------------------------------------------------------
// ROTATE
// ---------------------------------------------------------------------------

describe('useParallaxTransform — ROTATE', () => {
    it('returns a rotate3d string', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.ROTATE })
        const result = transformStyles(2, 3)
        expect(result).toMatch(/^rotate3d\(/)
    })

    it('no axis: combines x+y in the rotation', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.ROTATE, strength: 10 })
        // movement = (10 * (x+y)) / 10 + 1 = x + y + 1
        const result = transformStyles(2, 3)  // = 2+3+1 = 6
        expect(result).toBe('rotate3d(0,0,1,6deg)')
    })

    it('AXIS.X: uses only x for rotation', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.ROTATE, axis: AXIS.X, strength: 10 })
        // movement = (10 * x) / 10 + 1 = x + 1 = 3 + 1 = 4
        expect(transformStyles(3, 99)).toBe('rotate3d(0,0,1,4deg)')
    })

    it('AXIS.Y: uses only y for rotation', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.ROTATE, axis: AXIS.Y, strength: 10 })
        // movement = (10 * y) / 10 + 1 = y + 1 = 7 + 1 = 8
        expect(transformStyles(99, 7)).toBe('rotate3d(0,0,1,8deg)')
    })
})

// ---------------------------------------------------------------------------
// DEPTH
// ---------------------------------------------------------------------------

describe('useParallaxTransform — DEPTH', () => {
    it('returns rotateX + rotateY + translate3d', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.DEPTH })
        const result = transformStyles(2, 3)
        expect(result).toMatch(/rotateX\(/)
        expect(result).toMatch(/rotateY\(/)
        expect(result).toMatch(/translate3d\(/)
    })

    it('rotateX uses -y, rotateY uses x', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.DEPTH, strength: 5 })
        // rotateX(-y deg) rotateY(x deg) translate3d(0,0,strength*2 px)
        expect(transformStyles(4, 6)).toBe(`rotateX(-6deg) rotateY(4deg) translate3d(0,0,10px)`)
    })

    it('DEPTH uses positive strength regardless of sign', () => {
        const { strength, transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.DEPTH, strength: -5 })
        expect(strength.value).toBe(5)
        expect(transformStyles(0, 0)).toContain('translate3d(0,0,10px)')
    })
})

// ---------------------------------------------------------------------------
// DEPTH_INV
// ---------------------------------------------------------------------------

describe('useParallaxTransform — DEPTH_INV', () => {
    it('negates x and y compared to DEPTH', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.DEPTH_INV, strength: 5 })
        // depthMovement(-x, -y) → rotateX(y deg) rotateY(-x deg)
        expect(transformStyles(4, 6)).toBe(`rotateX(6deg) rotateY(-4deg) translate3d(0,0,10px)`)
    })
})

// ---------------------------------------------------------------------------
// SCALE
// ---------------------------------------------------------------------------

describe('useParallaxTransform — SCALE', () => {
    it('returns a scale3d string', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.SCALE })
        const result = transformStyles(2, 3)
        expect(result).toMatch(/scale3d\(/)
    })

    it('SCALE scales both X and Y', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.SCALE, strength: 10 })
        // movement = (10 * (|x| + |y|)) / 10 + 1 = |x| + |y| + 1
        // x=2, y=3 → movement = 2+3+1 = 6
        const result = transformStyles(2, 3)
        expect(result).toContain('6')  // both X and Y scale = 6
    })

    it('SCALE_X scales only X axis (Y=1)', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.SCALE_X, strength: 10 })
        // scale3d(movement, 1, 1)
        const result = transformStyles(2, 3)
        // movement = |2|+|3|+1 = 6 → scale3d(6, 1, 1) — but check Y=1 in string
        expect(result).toMatch(/scale3d\(.+,\s*1,\s*1\)/)
    })

    it('SCALE_Y scales only Y axis (X=1)', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.SCALE_Y, strength: 10 })
        // scale3d(1, movement, 1)
        const result = transformStyles(2, 3)
        expect(result).toMatch(/scale3d\(1,/)
    })

    it('negative inputs use abs value for scale movement', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.SCALE, strength: 10 })
        // abs(-5) + abs(-3) = 8; movement = 8+1 = 9
        const pos = transformStyles(5, 3)
        const neg = transformStyles(-5, -3)
        expect(pos).toBe(neg)  // symmetric
    })
})

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('useParallaxTransform — edge cases', () => {
    it('x=0, y=0 for SCALE → movement = 1 (only the bias)', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.SCALE, strength: 10 })
        const result = transformStyles(0, 0)
        expect(result).toContain('1')  // movement = 0+0+1 = 1
    })

    it('very large x/y still returns a valid transform string', () => {
        const { transformStyles } = makeTransform({ type: PARALLAX_ELEMENT_TYPE.TRANSLATE })
        const result = transformStyles(1e6, 1e6)
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
    })

    it('unknown/undefined type returns undefined from transformStyles', () => {
        const { transformStyles } = makeTransform({ type: 'custom' as any })
        // CUSTOM is in the enum but has no case in the switch → returns undefined
        const result = transformStyles(5, 5)
        expect(result).toBeUndefined()
    })
})
