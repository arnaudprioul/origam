// Tests for the DataTable expand composable.
//
// Covers:
//   - provideExpanded: initial state from props.expanded
//   - expand(item, true) adds to set; expand(item, false) removes
//   - isExpanded predicate
//   - toggleExpand: expand when closed, collapse when open
//   - expandOnClick ref reflects props
//   - multiple items can be expanded simultaneously
//   - useExpanded: throws when missing context

import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { provideExpanded } from '@origam/composables/DataTable/expand.composable'
import type { IDataTableExpandProps, IDataTableItem } from '@origam/interfaces'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeItem (value: string): IDataTableItem {
    return {
        type: 'item',
        key: value,
        index: 0,
        value,
        selectable: true,
        columns: {},
        raw: {}
    } as unknown as IDataTableItem
}

function mountExpand (props: IDataTableExpandProps) {
    let api!: ReturnType<typeof provideExpanded>

    const Host = defineComponent({
        name: 'ExpandHost',
        emits: ['update:expanded'],
        setup () {
            api = provideExpanded(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { api: () => api }
}

// ---------------------------------------------------------------------------
// provideExpanded — expand / isExpanded
// ---------------------------------------------------------------------------

describe('provideExpanded — expand / isExpanded', () => {
    it('initial state is empty when no expanded prop provided', () => {
        const { api } = mountExpand({})
        expect(api().expanded.value.size).toBe(0)
    })

    it('initial state reflects expanded prop', () => {
        const { api } = mountExpand({ expanded: ['row-1', 'row-2'] })
        expect(api().isExpanded(makeItem('row-1'))).toBe(true)
        expect(api().isExpanded(makeItem('row-2'))).toBe(true)
    })

    it('expand(item, true) adds item to expanded set', () => {
        const { api } = mountExpand({})
        api().expand(makeItem('row-1'), true)
        expect(api().isExpanded(makeItem('row-1'))).toBe(true)
    })

    it('expand(item, false) removes item from expanded set', () => {
        const { api } = mountExpand({ expanded: ['row-1'] })
        api().expand(makeItem('row-1'), false)
        expect(api().isExpanded(makeItem('row-1'))).toBe(false)
    })

    it('expand(item, false) on non-expanded item is a no-op', () => {
        const { api } = mountExpand({ expanded: ['row-1'] })
        api().expand(makeItem('row-99'), false)
        expect(api().expanded.value.size).toBe(1)
    })

    it('isExpanded returns false for items not in set', () => {
        const { api } = mountExpand({ expanded: ['row-1'] })
        expect(api().isExpanded(makeItem('row-2'))).toBe(false)
    })

    it('multiple items can be expanded simultaneously', () => {
        const { api } = mountExpand({})
        api().expand(makeItem('row-1'), true)
        api().expand(makeItem('row-2'), true)
        api().expand(makeItem('row-3'), true)
        expect(api().expanded.value.size).toBe(3)
        expect(api().isExpanded(makeItem('row-1'))).toBe(true)
        expect(api().isExpanded(makeItem('row-2'))).toBe(true)
        expect(api().isExpanded(makeItem('row-3'))).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// provideExpanded — toggleExpand
// ---------------------------------------------------------------------------

describe('provideExpanded — toggleExpand', () => {
    it('toggleExpand expands a collapsed item', () => {
        const { api } = mountExpand({})
        api().toggleExpand(makeItem('row-1'))
        expect(api().isExpanded(makeItem('row-1'))).toBe(true)
    })

    it('toggleExpand collapses an already expanded item', () => {
        const { api } = mountExpand({ expanded: ['row-1'] })
        api().toggleExpand(makeItem('row-1'))
        expect(api().isExpanded(makeItem('row-1'))).toBe(false)
    })

    it('toggle twice returns to original state', () => {
        const { api } = mountExpand({})
        api().toggleExpand(makeItem('row-1'))
        api().toggleExpand(makeItem('row-1'))
        expect(api().isExpanded(makeItem('row-1'))).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// provideExpanded — expandOnClick
// ---------------------------------------------------------------------------

describe('provideExpanded — expandOnClick', () => {
    it('expandOnClick reflects props value (true)', () => {
        const { api } = mountExpand({ expandOnClick: true })
        expect(api().expandOnClick.value).toBe(true)
    })

    it('expandOnClick reflects props value (false)', () => {
        const { api } = mountExpand({ expandOnClick: false })
        expect(api().expandOnClick.value).toBe(false)
    })

    it('expandOnClick is undefined when not provided', () => {
        const { api } = mountExpand({})
        expect(api().expandOnClick.value).toBeUndefined()
    })
})

// ---------------------------------------------------------------------------
// useExpanded — missing context
// ---------------------------------------------------------------------------

describe('useExpanded — missing provide', () => {
    it('throws "Missing expand!" when no ancestor provided expand context', async () => {
        const { useExpanded } = await import('@origam/composables/DataTable/expand.composable')

        const Orphan = defineComponent({
            name: 'ExpandOrphan',
            setup () {
                expect(() => useExpanded()).toThrow('Missing expand!')
                return () => h('div')
            }
        })
        mount(Orphan)
    })
})
