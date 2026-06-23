// TU — layout.util.ts
// Exports: generateLayers
//
// Pure function that accumulates layout positions; all inputs are Refs.

import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { generateLayers } from '@origam/utils/Commons/layout.util'

describe('generateLayers', () => {
    it('returns a single base layer when the layout array is empty', () => {
        const result = generateLayers([], new Map(), new Map(), new Map())
        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ id: '', layer: { top: 0, left: 0, right: 0, bottom: 0 } })
    })

    it('skips an item when position, amount, or active is missing from the maps', () => {
        const layout = ['a', 'b']
        const positions   = new Map([['a', ref('top' as const)]])
        const layoutSizes = new Map([['a', ref(64)]])
        const activeItems = new Map([['a', ref(true)]])
        // 'b' is absent from all maps

        const result = generateLayers(layout, positions, layoutSizes, activeItems)
        // Only the base layer + 'a'; 'b' is skipped
        expect(result).toHaveLength(2)
        expect(result[1].id).toBe('a')
    })

    it('accumulates the amount on the correct side when active', () => {
        const layout      = ['header']
        const positions   = new Map([['header', ref('top' as const)]])
        const layoutSizes = new Map([['header', ref(64)]])
        const activeItems = new Map([['header', ref(true)]])

        const result = generateLayers(layout, positions, layoutSizes, activeItems)
        expect(result).toHaveLength(2)
        expect(result[1].layer.top).toBe(64)
        expect(result[1].layer.bottom).toBe(0)
    })

    it('does NOT accumulate when active=false', () => {
        const layout      = ['sidebar']
        const positions   = new Map([['sidebar', ref('left' as const)]])
        const layoutSizes = new Map([['sidebar', ref(256)]])
        const activeItems = new Map([['sidebar', ref(false)]])

        const result = generateLayers(layout, positions, layoutSizes, activeItems)
        expect(result[1].layer.left).toBe(0)
    })

    it('stacks multiple items cumulatively', () => {
        const layout = ['top-nav', 'sub-nav']

        const positions = new Map([
            ['top-nav', ref('top' as const)],
            ['sub-nav', ref('top' as const)]
        ])
        const layoutSizes = new Map([
            ['top-nav', ref(48)],
            ['sub-nav', ref(40)]
        ])
        const activeItems = new Map([
            ['top-nav', ref(true)],
            ['sub-nav', ref(true)]
        ])

        const result = generateLayers(layout, positions, layoutSizes, activeItems)

        // Base (0) → top-nav adds 48 → sub-nav adds 40 on top of 48
        expect(result[1].layer.top).toBe(48)
        expect(result[2].layer.top).toBe(88)
    })

    it('handles string amount values by converting them to integers', () => {
        const layout      = ['footer']
        const positions   = new Map([['footer', ref('bottom' as const)]])
        const layoutSizes = new Map([['footer', ref('72px')]])
        const activeItems = new Map([['footer', ref(true)]])

        const result = generateLayers(layout, positions, layoutSizes, activeItems)
        // int('72px') === 72
        expect(result[1].layer.bottom).toBe(72)
    })

    it('does not affect unrelated sides', () => {
        const layout      = ['nav']
        const positions   = new Map([['nav', ref('left' as const)]])
        const layoutSizes = new Map([['nav', ref(200)]])
        const activeItems = new Map([['nav', ref(true)]])

        const result = generateLayers(layout, positions, layoutSizes, activeItems)
        expect(result[1].layer.top).toBe(0)
        expect(result[1].layer.right).toBe(0)
        expect(result[1].layer.bottom).toBe(0)
        expect(result[1].layer.left).toBe(200)
    })
})
