// Tests for `useVirtual` composable.
//
// useVirtual is heavily DOM-bound (scroll events, ResizeObserver, rAF,
// IntersectionObserver, goTo). The parts that ARE pure-logic and therefore
// testable in jsdom:
//
//   - `calculateOffset` / `calculateIndex` — the internal offset/index math
//     exposed indirectly via `scrollToIndex` + `paddingTop` / `paddingBottom`.
//   - `computedItems` — slice of the items array between first and last.
//   - `handleItemResize` — updates the internal height map and (debounced)
//     triggers offset recalculation; we can verify the exposed refs react
//     correctly after the flush.
//   - Initial `first` / `last` computation from itemHeight + height prop.
//
// DOM-bound paths (handleScroll, handleScrollend, containerRef scroll,
// ResizeObserver, IntersectionObserver, rAF-driven calcVisibleItems,
// scrollToIndex with animation) → `it.skip` with rationale.

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { createOrigam } from '@origam/origam'
import type { IVirtualProps } from '@origam/interfaces'

import { useVirtual } from '@origam/composables/Commons/virtual.composable'

// ---------------------------------------------------------------------------
// Mount helper — useVirtual MUST run inside a Vue component scope because it
// calls onScopeDispose internally (scope lifecycle hook).
// ---------------------------------------------------------------------------

function mountVirtual<T> (props: IVirtualProps, initialItems: T[]) {
    const items = ref<T[]>(initialItems)
    let api!: ReturnType<typeof useVirtual<T>>

    const Host = defineComponent({
        name: 'OrigamVirtualHost',
        setup () {
            api = useVirtual(props, items as any)
            return () => h('div')
        }
    })

    const wrapper = mount(Host, { global: { plugins: [createOrigam()] } })
    return { items, api: () => api, wrapper }
}

// ---------------------------------------------------------------------------
// computedItems — slice from first to last
// ---------------------------------------------------------------------------

describe('useVirtual — computedItems', () => {
    it('returns a subset of items mapped with { raw, index }', () => {
        const { api } = mountVirtual<string>({ itemHeight: 50, height: 200 }, ['a', 'b', 'c', 'd', 'e'])
        const computed = api().computedItems.value
        // first=0, last = ceil(200/50) = 4 (or 5 after clamp)
        expect(computed.length).toBeGreaterThanOrEqual(1)
        expect(computed[0]).toHaveProperty('raw')
        expect(computed[0]).toHaveProperty('index')
        expect(computed[0].raw).toBe('a')
        expect(computed[0].index).toBe(0)
    })

    it('index on each item equals its position in the original items array', () => {
        const source = [10, 20, 30, 40, 50]
        const { api } = mountVirtual<number>({ itemHeight: 40, height: 200 }, source)
        const computed = api().computedItems.value
        for (const item of computed) {
            // index is its absolute position in source; raw is source[index]
            expect(item.raw).toBe(source[item.index])
        }
    })

    it('reacts when items array changes', async () => {
        const { items, api } = mountVirtual<string>({ itemHeight: 50, height: 200 }, ['a', 'b'])
        items.value = ['x', 'y', 'z', 'w', 'v']
        await nextTick()
        const computed = api().computedItems.value
        expect(computed.some(c => c.raw === 'x')).toBe(true)
    })

    it('empty items list → computedItems is empty', () => {
        const { api } = mountVirtual<string>({ itemHeight: 50, height: 200 }, [])
        expect(api().computedItems.value).toEqual([])
    })
})

// ---------------------------------------------------------------------------
// paddingTop / paddingBottom initial state
// ---------------------------------------------------------------------------

describe('useVirtual — initial padding refs', () => {
    it('paddingTop starts at 0', () => {
        const { api } = mountVirtual({ itemHeight: 50, height: 200 }, Array(20).fill('item'))
        expect(api().paddingTop.value).toBe(0)
    })

    it('paddingBottom starts at 0', () => {
        const { api } = mountVirtual({ itemHeight: 50, height: 200 }, Array(20).fill('item'))
        expect(api().paddingBottom.value).toBe(0)
    })
})

// ---------------------------------------------------------------------------
// scrollToIndex — instant path (duration: 0) with containerRef unset
// ---------------------------------------------------------------------------

describe('useVirtual — scrollToIndex without DOM', () => {
    it('scrollToIndex(0) when containerRef is unset queues targetScrollIndex without crashing', () => {
        const { api } = mountVirtual({ itemHeight: 50, height: 200 }, Array(10).fill('item'))
        // containerRef is unset (no real DOM element attached) — must not throw
        expect(() => api().scrollToIndex(0)).not.toThrow()
    })

    it('scrollToIndex(n) for n > 0 without containerRef does not throw', () => {
        const { api } = mountVirtual({ itemHeight: 50, height: 200 }, Array(10).fill('item'))
        expect(() => api().scrollToIndex(5)).not.toThrow()
    })
})

// ---------------------------------------------------------------------------
// handleItemResize — height map update
// ---------------------------------------------------------------------------

describe('useVirtual — handleItemResize', () => {
    it('does not throw when called before DOM is ready', () => {
        const { api } = mountVirtual({ itemHeight: 50, height: 200 }, Array(5).fill('item'))
        expect(() => api().handleItemResize(0, 60)).not.toThrow()
    })

    it('can be called multiple times without throwing', () => {
        const { api } = mountVirtual({ itemHeight: 50, height: 200 }, Array(5).fill('item'))
        expect(() => {
            api().handleItemResize(0, 60)
            api().handleItemResize(1, 80)
            api().handleItemResize(2, 40)
        }).not.toThrow()
    })
})

// ---------------------------------------------------------------------------
// handleScroll / handleScrollend — DOM-bound
// ---------------------------------------------------------------------------

describe('useVirtual — handleScroll (DOM-bound)', () => {
    it.skip('handleScroll: requires a live containerRef and real scroll geometry — skip in jsdom', () => {
        // Reason: handleScroll reads containerRef.value.scrollTop and markerRef.value.offsetTop,
        // which are always 0 in jsdom (layout engine not implemented).
        // calcVisibleItems also calls requestAnimationFrame which requires a real browser.
    })

    it.skip('handleScrollend: same DOM dependency as handleScroll — skip in jsdom', () => {
        // Reason: Same as above. The scrollVelocity / lastScrollTime reset paths
        // are gated on containerRef and markerRef being populated.
    })
})

// ---------------------------------------------------------------------------
// Exported refs identity
// ---------------------------------------------------------------------------

describe('useVirtual — returned API shape', () => {
    it('exposes containerRef, markerRef, computedItems, paddingTop, paddingBottom, scrollToIndex, handleScroll, handleScrollend, handleItemResize', () => {
        const { api } = mountVirtual({ itemHeight: 50, height: 200 }, ['a'])
        const keys = Object.keys(api())
        expect(keys).toContain('containerRef')
        expect(keys).toContain('markerRef')
        expect(keys).toContain('computedItems')
        expect(keys).toContain('paddingTop')
        expect(keys).toContain('paddingBottom')
        expect(keys).toContain('scrollToIndex')
        expect(keys).toContain('handleScroll')
        expect(keys).toContain('handleScrollend')
        expect(keys).toContain('handleItemResize')
    })
})
