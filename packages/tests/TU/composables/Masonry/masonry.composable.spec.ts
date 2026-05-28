/**
 * Unit tests for the pure helpers of `useMasonry` — `pickColumnsForWidth`
 * and `bucketFill`. The DOM-bound side of the composable
 * (ResizeObserver, refs) is exercised via the Playwright spec in
 * `tests/e2e/masonry.spec.ts`, where the layout actually paints.
 *
 * Both helpers are deterministic and side-effect-free: no fixtures, no
 * mocks, just inputs → outputs.
 */

import { describe, expect, it } from 'vitest'

import { bucketFill, pickColumnsForWidth } from '@origam/composables/Masonry/masonry.composable'

describe('pickColumnsForWidth', () => {
    it('returns the default when no breakpoints are provided', () => {
        expect(pickColumnsForWidth(800, undefined, 3)).toBe(3)
    })

    it('returns the default when the container is narrower than every breakpoint', () => {
        expect(pickColumnsForWidth(500, { 600: 2, 900: 3, 1200: 4 }, 1)).toBe(1)
    })

    it('picks the largest matching breakpoint when the container is wider than several', () => {
        expect(pickColumnsForWidth(1500, { 600: 2, 900: 3, 1200: 4 }, 1)).toBe(4)
        expect(pickColumnsForWidth(1000, { 600: 2, 900: 3, 1200: 4 }, 1)).toBe(3)
        expect(pickColumnsForWidth(750, { 600: 2, 900: 3, 1200: 4 }, 1)).toBe(2)
    })

    it('ignores out-of-range / negative breakpoint entries', () => {
        expect(pickColumnsForWidth(800, { 600: 2, '-100': 99, 900: 0 } as any, 1)).toBe(2)
    })

    it('floors the default to an integer ≥ 1', () => {
        expect(pickColumnsForWidth(800, undefined, 3.7)).toBe(3)
        expect(pickColumnsForWidth(800, undefined, 0)).toBe(1)
        expect(pickColumnsForWidth(800, undefined, -2)).toBe(1)
    })
})

describe('bucketFill', () => {
    it('lays out a single item in a single column', () => {
        const result = bucketFill([200], 600, 16, 1)
        expect(result.columns).toBe(1)
        expect(result.items).toHaveLength(1)
        expect(result.items[0].left).toBe(0)
        expect(result.items[0].top).toBe(0)
        expect(result.items[0].width).toBe(600)
        expect(result.items[0].column).toBe(0)
        expect(result.containerHeight).toBe(200)
    })

    it('distributes items across columns by shortest-column-first', () => {
        // 3 cols, gap 10, container 320 → itemWidth = (320 - 20) / 3 = 100
        // heights: 100, 200, 50, 80
        // step 1: col 0,1,2 all = 0 → place item 0 in col 0. col heights = [110, 0, 0]
        // step 2: shortest col = 1 → place item 1 in col 1. col heights = [110, 210, 0]
        // step 3: shortest col = 2 → place item 2 in col 2. col heights = [110, 210, 60]
        // step 4: shortest col = 2 → place item 3 in col 2. col heights = [110, 210, 150]
        const result = bucketFill([100, 200, 50, 80], 320, 10, 3)
        expect(result.columns).toBe(3)
        expect(result.items[0].column).toBe(0)
        expect(result.items[1].column).toBe(1)
        expect(result.items[2].column).toBe(2)
        expect(result.items[3].column).toBe(2)
        expect(result.items[0].left).toBe(0)
        expect(result.items[1].left).toBe(110)
        expect(result.items[2].left).toBe(220)
        // Container height = max(110-10, 210-10, 150-10) = 200
        expect(result.containerHeight).toBe(200)
    })

    it('places items with the correct top offset inside their column', () => {
        // 2 cols, gap 0, container 200 → itemWidth = 100
        // heights: 100, 200, 150
        // step 1: cols = [0, 0] → col 0. cols = [100, 0]
        // step 2: cols[1] < cols[0] → col 1. cols = [100, 200]
        // step 3: cols[0] < cols[1] → col 0. cols = [250, 200]
        const result = bucketFill([100, 200, 150], 200, 0, 2)
        expect(result.items[0].top).toBe(0)
        expect(result.items[1].top).toBe(0)
        // Item 2 stacks on top of item 0 (height 100, gap 0) → top = 100
        expect(result.items[2].top).toBe(100)
    })

    it('floors the column count to ≥ 1', () => {
        const r0 = bucketFill([100, 100], 300, 0, 0)
        expect(r0.columns).toBe(1)
        const rNeg = bucketFill([100, 100], 300, 0, -3)
        expect(rNeg.columns).toBe(1)
    })

    it('returns containerHeight = 0 for an empty item list', () => {
        const result = bucketFill([], 300, 16, 3)
        expect(result.containerHeight).toBe(0)
        expect(result.items).toEqual([])
    })

    it('honours `align: center` by shifting each column down by half the unused space', () => {
        // 2 cols, gap 0, container 200, items: [100, 200] → col 0=100, col 1=200
        // maxHeight = 200. Col 0 shift = (200 - 100) / 2 = 50.
        const result = bucketFill([100, 200], 200, 0, 2, 'center')
        expect(result.items[0].top).toBe(50)
        expect(result.items[1].top).toBe(0)
    })

    it('treats `align: top` as the default (no vertical shift)', () => {
        const result = bucketFill([100, 200], 200, 0, 2, 'top')
        expect(result.items[0].top).toBe(0)
        expect(result.items[1].top).toBe(0)
    })

    it('ties go to the leftmost column', () => {
        // 3 cols, gap 0, items all = 100. After step 0 col heights = [100,0,0].
        // After step 1 = [100,100,0]. After step 2 = [100,100,100]. After step 3 → leftmost = 0.
        const result = bucketFill([100, 100, 100, 100], 300, 0, 3)
        expect(result.items[3].column).toBe(0)
    })
})
