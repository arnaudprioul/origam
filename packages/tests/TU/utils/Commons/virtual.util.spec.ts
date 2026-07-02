// TU — virtual.util.ts
// Exports: binaryClosest
//
// Pure binary-search helper — no DOM, no Vue.

import { describe, expect, it } from 'vitest'
import { binaryClosest } from '@origam/utils/Commons/virtual.util'

describe('binaryClosest', () => {
    // Exact matches
    it('returns the index of an exact match', () => {
        expect(binaryClosest([0, 10, 20, 30, 40], 20)).toBe(2)
    })

    it('returns 0 for exact match at start', () => {
        expect(binaryClosest([5, 15, 25], 5)).toBe(0)
    })

    it('returns last index for exact match at end', () => {
        expect(binaryClosest([5, 15, 25], 25)).toBe(2)
    })

    // Value larger than all elements
    it('returns last index when val > all elements', () => {
        expect(binaryClosest([0, 10, 20, 30], 99)).toBe(3)
    })

    // Value smaller than all elements → target stays -1, returns -1
    it('returns -1 when val is smaller than all elements', () => {
        // low=0, high=3, mid iterations never satisfy item < val → target stays -1
        expect(binaryClosest([10, 20, 30, 40], 5)).toBe(-1)
    })

    // Closest lower bound (val is between two elements)
    it('returns the closest lower index when val is between elements', () => {
        // arr=[0,10,20,30], val=15 → closest lower bound is index 1 (value 10)
        expect(binaryClosest([0, 10, 20, 30], 15)).toBe(1)
    })

    it('returns lower-bound index for val just below an element', () => {
        expect(binaryClosest([0, 10, 20, 30], 19)).toBe(1)
    })

    it('returns the index immediately before the exact value', () => {
        // val=10, arr=[0,10,20] — exact match → returns 1
        expect(binaryClosest([0, 10, 20], 10)).toBe(1)
    })

    // Single element
    it('returns 0 when array has one element and exact match', () => {
        expect(binaryClosest([7], 7)).toBe(0)
    })

    it('returns -1 when array has one element and val < element', () => {
        expect(binaryClosest([7], 3)).toBe(-1)
    })

    it('returns 0 (last) when array has one element and val > element', () => {
        expect(binaryClosest([7], 100)).toBe(0)
    })

    // Empty array
    it('returns -1 for empty array (high = -1 < val)', () => {
        // arr.length - 1 = -1; arr[-1] is undefined which is not < val
        // The guard `if (arr[high]! < val)` is false for undefined < number
        // then while loop: low=0, high=-1, exits immediately → target=-1
        expect(binaryClosest([] as unknown as number[], 5)).toBe(-1)
    })

    // Large array
    it('handles a large sorted array correctly', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i * 2)  // [0,2,4,...1998]
        expect(binaryClosest(arr, 1000)).toBe(500)  // exact match at index 500
        expect(binaryClosest(arr, 999)).toBe(499)   // closest lower: 998 at index 499
        expect(binaryClosest(arr, 1999)).toBe(999)  // last element = 1998 < 1999
    })
})
