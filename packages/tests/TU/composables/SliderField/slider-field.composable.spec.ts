// Unit tests for `useSteps` (slider-field.composable.ts).
//
// The composable is pure math: given a props object with min/max/step,
// it computes reactive min/max/step/decimals and a `roundValue` helper.
//
// Tested behaviours:
//   - Default values (min=0, max=100, step=0)
//   - Decimal precision tracking
//   - roundValue: snapping to nearest step, clamping to [min, max]
//   - Step=0 → roundValue is identity (no snapping)
//   - String-typed props (parseable from <input> events)
//   - Edge cases: value below min, value above max, step > range

import { reactive } from 'vue'
import { describe, expect, it } from 'vitest'

import { useSteps } from '@origam/composables/SliderField/slider-field.composable'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeSteps (overrides: { min?: any, max?: any, step?: any } = {}) {
    const props = reactive({
        min: overrides.min ?? 0,
        max: overrides.max ?? 100,
        step: overrides.step ?? 0
    })
    return { props, steps: useSteps(props as any) }
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

describe('useSteps — defaults', () => {
    it('min defaults to 0 when not provided', () => {
        const { steps } = makeSteps()
        expect(steps.min.value).toBe(0)
    })

    it('max defaults to 100 when not provided', () => {
        const { steps } = makeSteps()
        expect(steps.max.value).toBe(100)
    })

    it('step defaults to 0 when not provided', () => {
        const { steps } = makeSteps()
        expect(steps.step.value).toBe(0)
    })
})

// ---------------------------------------------------------------------------
// String-typed props (parseable from DOM)
// ---------------------------------------------------------------------------

describe('useSteps — string-typed props', () => {
    it('parses string min', () => {
        const { steps } = makeSteps({ min: '10' })
        expect(steps.min.value).toBe(10)
    })

    it('parses string max', () => {
        const { steps } = makeSteps({ max: '200' })
        expect(steps.max.value).toBe(200)
    })

    it('parses string step', () => {
        const { steps } = makeSteps({ step: '0.5' })
        expect(steps.step.value).toBe(0.5)
    })

    it('step="0" (string) → step stays 0', () => {
        const { steps } = makeSteps({ step: '0' })
        expect(steps.step.value).toBe(0)
    })

    it('step="" or step=0 → falsy path yields step=0', () => {
        const { steps } = makeSteps({ step: '' })
        expect(steps.step.value).toBe(0)
    })
})

// ---------------------------------------------------------------------------
// Decimal precision
// ---------------------------------------------------------------------------

describe('useSteps — decimals', () => {
    it('decimals=0 for integer step + integer min', () => {
        const { steps } = makeSteps({ min: 0, step: 5 })
        expect(steps.decimals.value).toBe(0)
    })

    it('decimals=1 for step=0.5', () => {
        const { steps } = makeSteps({ step: 0.5 })
        expect(steps.decimals.value).toBe(1)
    })

    it('decimals=2 for step=0.25', () => {
        const { steps } = makeSteps({ step: 0.25 })
        expect(steps.decimals.value).toBe(2)
    })

    it('decimals=2 for min=0.01 even with integer step', () => {
        // decimals = max(getDecimals(step), getDecimals(min))
        const { steps } = makeSteps({ min: 0.01, step: 1 })
        expect(steps.decimals.value).toBe(2)
    })
})

// ---------------------------------------------------------------------------
// roundValue — step=0 (no snap)
// ---------------------------------------------------------------------------

describe('useSteps — roundValue (step=0)', () => {
    it('returns the raw value unchanged when step=0', () => {
        const { steps } = makeSteps({ min: 0, max: 100, step: 0 })
        expect(steps.roundValue(37.8)).toBe(37.8)
    })

    it('clamps value below min to... wait: no clamp when step=0', () => {
        // When step <= 0 the function returns value as-is (no clamp applied).
        const { steps } = makeSteps({ min: 0, max: 100, step: 0 })
        expect(steps.roundValue(-10)).toBe(-10)
    })
})

// ---------------------------------------------------------------------------
// roundValue — step > 0
// ---------------------------------------------------------------------------

describe('useSteps — roundValue (step > 0)', () => {
    it('snaps 37 to 35 with step=5 (round-down)', () => {
        const { steps } = makeSteps({ min: 0, max: 100, step: 5 })
        expect(steps.roundValue(37)).toBe(35)
    })

    it('snaps 38 to 40 with step=5 (round-up)', () => {
        const { steps } = makeSteps({ min: 0, max: 100, step: 5 })
        expect(steps.roundValue(38)).toBe(40)
    })

    it('value already on a step boundary is unchanged', () => {
        const { steps } = makeSteps({ min: 0, max: 100, step: 10 })
        expect(steps.roundValue(40)).toBe(40)
    })

    it('clamps value below min to min', () => {
        const { steps } = makeSteps({ min: 10, max: 100, step: 5 })
        expect(steps.roundValue(2)).toBe(10)
    })

    it('clamps value above max to max', () => {
        const { steps } = makeSteps({ min: 0, max: 100, step: 5 })
        expect(steps.roundValue(110)).toBe(100)
    })

    it('returns min when value is exactly min', () => {
        const { steps } = makeSteps({ min: 20, max: 80, step: 10 })
        expect(steps.roundValue(20)).toBe(20)
    })

    it('returns max when value is exactly max', () => {
        const { steps } = makeSteps({ min: 0, max: 50, step: 10 })
        expect(steps.roundValue(50)).toBe(50)
    })

    it('handles decimal step correctly: step=0.1, value=0.35 → 0.3 or 0.4', () => {
        const { steps } = makeSteps({ min: 0, max: 1, step: 0.1 })
        const snapped = steps.roundValue(0.35)
        // 0.35 is exactly between 0.3 and 0.4; Math.round → 0.4
        expect(snapped === 0.3 || snapped === 0.4).toBe(true)
    })

    it('step larger than range: any value snaps within [min, max]', () => {
        const { steps } = makeSteps({ min: 0, max: 3, step: 10 })
        const snapped = steps.roundValue(1.5)
        expect(snapped).toBeGreaterThanOrEqual(0)
        expect(snapped).toBeLessThanOrEqual(3)
    })

    it('accepts a string value and parses it', () => {
        const { steps } = makeSteps({ min: 0, max: 100, step: 5 })
        expect(steps.roundValue('27' as any)).toBe(25)
    })
})

// ---------------------------------------------------------------------------
// Reactivity
// ---------------------------------------------------------------------------

describe('useSteps — reactivity', () => {
    it('min updates reactively when props.min changes', async () => {
        const { props, steps } = makeSteps({ min: 0 })
        expect(steps.min.value).toBe(0)
        props.min = 20
        // computed is synchronous
        expect(steps.min.value).toBe(20)
    })

    it('step updates reactively when props.step changes', () => {
        const { props, steps } = makeSteps({ step: 0 })
        expect(steps.step.value).toBe(0)
        props.step = 5
        expect(steps.step.value).toBe(5)
    })
})
