// Tests for `box-plot.util.ts`.
// Covers:
//   - computeQuartiles: five-number summary, IQR, outlier detection
//   - interpolate: edge cases (single value, exact positions)
//   - isRawDatum: type guard
//   - Edge cases: empty array, all-same values, single element, non-finite values

import { describe, expect, it } from 'vitest'

import { computeQuartiles, isRawDatum } from '@origam/utils/Chart/box-plot.util'

// ---------------------------------------------------------------------------
// computeQuartiles — empty / degenerate inputs
// ---------------------------------------------------------------------------

describe('computeQuartiles — empty / degenerate', () => {
    it('empty array → all zeroes, no outliers', () => {
        const result = computeQuartiles([])
        expect(result).toEqual({
            min: 0,
            q1: 0,
            median: 0,
            q3: 0,
            max: 0,
            iqr: 0,
            outliers: []
        })
    })

    it('single value → min=q1=median=q3=max=value, iqr=0, no outliers', () => {
        const result = computeQuartiles([42])
        expect(result.min).toBe(42)
        expect(result.q1).toBe(42)
        expect(result.median).toBe(42)
        expect(result.q3).toBe(42)
        expect(result.max).toBe(42)
        expect(result.iqr).toBe(0)
        expect(result.outliers).toEqual([])
    })

    it('two equal values → all equal, iqr=0, no outliers', () => {
        const result = computeQuartiles([5, 5])
        expect(result.q1).toBe(5)
        expect(result.median).toBe(5)
        expect(result.q3).toBe(5)
        expect(result.iqr).toBe(0)
        expect(result.outliers).toEqual([])
    })

    it('filters out Infinity and NaN, computes from finite values only', () => {
        const result = computeQuartiles([1, 2, Infinity, 3, NaN, 4])
        expect(result.min).toBe(1)
        expect(result.max).toBe(4)
    })

    it('all-NaN or all-Infinity → same as empty', () => {
        const result = computeQuartiles([NaN, Infinity, -Infinity])
        expect(result).toEqual({
            min: 0, q1: 0, median: 0, q3: 0, max: 0, iqr: 0, outliers: []
        })
    })
})

// ---------------------------------------------------------------------------
// computeQuartiles — nominal Tukey five-number summary
// ---------------------------------------------------------------------------

describe('computeQuartiles — nominal cases', () => {
    // Classic dataset: [1,2,3,4,5,6,7]
    // Q1 = 2.5 (PERCENTILE.INC), median = 4, Q3 = 5.5, IQR = 3
    // lowerFence = 2.5 - 4.5 = -2, upperFence = 5.5 + 4.5 = 10
    // All values in range → whiskerMin=1, whiskerMax=7, no outliers
    it('[1..7] → correct five-number summary, no outliers', () => {
        const result = computeQuartiles([7, 1, 3, 5, 2, 6, 4])
        expect(result.median).toBeCloseTo(4)
        expect(result.q1).toBeCloseTo(2.5)
        expect(result.q3).toBeCloseTo(5.5)
        expect(result.iqr).toBeCloseTo(3)
        expect(result.min).toBe(1)
        expect(result.max).toBe(7)
        expect(result.outliers).toEqual([])
    })

    // Dataset with outlier: [1,2,3,4,100]
    // sorted: [1,2,3,4,100]
    // Q1 = 1 + 0.25*(5-1)=2 → pos=1 → Q1=2
    // PERCENTILE.INC: pos = 0.25*(5-1) = 1 → sorted[1] = 2
    // Q3: pos = 0.75*(5-1) = 3 → sorted[3] = 4
    // IQR = 2, lowerFence = 2-3 = -1, upperFence = 4+3 = 7
    // 100 > 7 → outlier
    it('dataset with high outlier → 100 classified as outlier', () => {
        const result = computeQuartiles([1, 2, 3, 4, 100])
        expect(result.outliers).toContain(100)
        expect(result.max).toBeLessThan(100)
    })

    it('dataset with low outlier → low value classified as outlier', () => {
        // [−50, 1, 2, 3, 4, 5]
        const result = computeQuartiles([-50, 1, 2, 3, 4, 5])
        expect(result.outliers).toContain(-50)
        expect(result.min).toBeGreaterThan(-50)
    })

    it('whiskerMin is the smallest non-outlier value', () => {
        const result = computeQuartiles([-50, 1, 2, 3, 4, 5])
        // -50 is outlier, so whiskerMin = 1
        expect(result.min).toBe(1)
    })

    it('whiskerMax is the largest non-outlier value', () => {
        const result = computeQuartiles([1, 2, 3, 4, 100])
        expect(result.max).toBe(4)
    })

    // Even count: [10,20,30,40]
    // Q1: pos=0.75 → 10 + 0.75*(20-10)=17.5
    // Q3: pos=2.25 → 30 + 0.25*(40-30)=32.5
    // median: pos=1.5 → 20 + 0.5*(30-20)=25
    it('[10,20,30,40] → median=25, Q1≈17.5, Q3≈32.5', () => {
        const result = computeQuartiles([10, 20, 30, 40])
        expect(result.median).toBeCloseTo(25)
        expect(result.q1).toBeCloseTo(17.5)
        expect(result.q3).toBeCloseTo(32.5)
    })

    it('result is sorted: min <= q1 <= median <= q3 <= max', () => {
        const result = computeQuartiles([8, 3, 1, 6, 9, 4, 2, 7, 5])
        expect(result.min).toBeLessThanOrEqual(result.q1)
        expect(result.q1).toBeLessThanOrEqual(result.median)
        expect(result.median).toBeLessThanOrEqual(result.q3)
        expect(result.q3).toBeLessThanOrEqual(result.max)
    })

    it('iqr = q3 - q1', () => {
        const result = computeQuartiles([1, 2, 3, 4, 5, 6, 7])
        expect(result.iqr).toBeCloseTo(result.q3 - result.q1)
    })

    it('unsorted input gives same result as sorted', () => {
        const a = computeQuartiles([5, 1, 9, 3, 7])
        const b = computeQuartiles([1, 3, 5, 7, 9])
        expect(a).toEqual(b)
    })
})

// ---------------------------------------------------------------------------
// computeQuartiles — multiple outliers
// ---------------------------------------------------------------------------

describe('computeQuartiles — multiple outliers', () => {
    it('both low and high outliers are detected', () => {
        const result = computeQuartiles([-100, 1, 2, 3, 4, 5, 100])
        expect(result.outliers).toContain(-100)
        expect(result.outliers).toContain(100)
        expect(result.outliers).toHaveLength(2)
    })

    it('outliers array is sorted ascending', () => {
        const result = computeQuartiles([-100, 1, 2, 3, 4, 5, 200, 100])
        const sorted = [...result.outliers].sort((a, b) => a - b)
        expect(result.outliers).toEqual(sorted)
    })
})

// ---------------------------------------------------------------------------
// isRawDatum
// ---------------------------------------------------------------------------

describe('isRawDatum', () => {
    it('object with samples array → true', () => {
        expect(isRawDatum({ category: 'A', samples: [1, 2, 3] })).toBe(true)
    })

    it('object with empty samples array → true (type guard is array-presence only)', () => {
        expect(isRawDatum({ category: 'A', samples: [] })).toBe(true)
    })

    it('pre-aggregated datum without samples → false', () => {
        expect(isRawDatum({ category: 'A', min: 1, q1: 2, median: 3, q3: 4, max: 5 })).toBe(false)
    })

    it('null → false', () => {
        expect(isRawDatum(null)).toBe(false)
    })

    it('undefined → false', () => {
        expect(isRawDatum(undefined)).toBe(false)
    })

    it('primitive string → false', () => {
        expect(isRawDatum('samples')).toBe(false)
    })

    it('object with samples as non-array → false', () => {
        expect(isRawDatum({ samples: 'not-an-array' })).toBe(false)
    })
})
