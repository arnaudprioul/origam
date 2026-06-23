// Tests for the DataTable select composable.
//
// Covers:
//   - provideSelection with PAGE strategy (default): select, selectAll,
//     toggleSelect, isSelected, isSomeSelected, someSelected, allSelected,
//     showSelectAll
//   - SINGLE strategy: selectAll is no-op, select takes first item only
//   - ALL strategy: selectAll selects all items across pages
//   - Non-selectable items are filtered out
//   - useSelection: throws when missing context

import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { provideSelection } from '@origam/composables/DataTable/select.composable'
import { DATATABLE_SELECT_STRATEGY } from '@origam/enums'
import type { IDataTableSelectableItem } from '@origam/interfaces'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeItem (value: string, selectable = true): IDataTableSelectableItem {
    return { value, selectable }
}

function mountSelection (opts: {
    strategy?: string
    modelValue?: any[]
    items?: IDataTableSelectableItem[]
    pageItems?: IDataTableSelectableItem[]
}) {
    const allItems = ref<IDataTableSelectableItem[]>(opts.items ?? [
        makeItem('a'),
        makeItem('b'),
        makeItem('c')
    ])
    const currentPage = ref<IDataTableSelectableItem[]>(opts.pageItems ?? allItems.value)

    const props = {
        selectStrategy: opts.strategy ?? DATATABLE_SELECT_STRATEGY.PAGE,
        modelValue: opts.modelValue ?? [],
        showSelect: true
    }

    let api!: ReturnType<typeof provideSelection>

    const Host = defineComponent({
        name: 'SelectionHost',
        emits: ['update:modelValue'],
        setup () {
            api = provideSelection(props, { allItems, currentPage })
            return () => h('div')
        }
    })

    mount(Host)
    return { allItems, currentPage, api: () => api }
}

// ---------------------------------------------------------------------------
// PAGE strategy (default)
// ---------------------------------------------------------------------------

describe('provideSelection — PAGE strategy', () => {
    it('showSelectAll is true', () => {
        const { api } = mountSelection({})
        expect(api().showSelectAll.value).toBe(true)
    })

    it('initial state: nothing selected', () => {
        const { api } = mountSelection({})
        expect(api().someSelected.value).toBe(false)
        expect(api().allSelected.value).toBe(false)
    })

    it('select([a], true) → isSelected returns true for a', () => {
        const { api } = mountSelection({})
        api().select([makeItem('a')], true)
        expect(api().isSelected([makeItem('a')])).toBe(true)
    })

    it('select([a], false) after selecting → removes from selection', () => {
        const { api } = mountSelection({ modelValue: ['a'] })
        api().select([makeItem('a')], false)
        expect(api().isSelected([makeItem('a')])).toBe(false)
    })

    it('toggleSelect selects unselected item', () => {
        const { api } = mountSelection({})
        api().toggleSelect(makeItem('b'))
        expect(api().isSelected([makeItem('b')])).toBe(true)
    })

    it('toggleSelect deselects already-selected item', () => {
        const { api } = mountSelection({ modelValue: ['b'] })
        api().toggleSelect(makeItem('b'))
        expect(api().isSelected([makeItem('b')])).toBe(false)
    })

    it('selectAll(true) selects all items on current page', () => {
        const { api } = mountSelection({})
        api().selectAll(true)
        expect(api().isSelected([makeItem('a'), makeItem('b'), makeItem('c')])).toBe(true)
        expect(api().allSelected.value).toBe(true)
    })

    it('selectAll(false) deselects all items on current page', () => {
        const { api } = mountSelection({ modelValue: ['a', 'b', 'c'] })
        api().selectAll(false)
        expect(api().someSelected.value).toBe(false)
    })

    it('someSelected is true when at least one item is selected', () => {
        const { api } = mountSelection({})
        api().toggleSelect(makeItem('a'))
        expect(api().someSelected.value).toBe(true)
    })

    it('isSomeSelected returns true when subset is selected', () => {
        const { api } = mountSelection({})
        api().toggleSelect(makeItem('a'))
        expect(api().isSomeSelected([makeItem('a'), makeItem('b')])).toBe(true)
    })

    it('isSomeSelected returns false when no item in the set is selected', () => {
        const { api } = mountSelection({})
        expect(api().isSomeSelected([makeItem('a'), makeItem('b')])).toBe(false)
    })

    it('non-selectable items are excluded from selectAll', () => {
        const items = [makeItem('a'), makeItem('b'), { value: 'c', selectable: false }]
        const { api } = mountSelection({ items, pageItems: items })
        api().selectAll(true)
        expect(api().isSelected([makeItem('a')])).toBe(true)
        expect(api().isSelected([makeItem('b')])).toBe(true)
        // 'c' is not selectable, so allSelected should still reflect only selectable items
        expect(api().isSelected([{ value: 'c', selectable: false }])).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// SINGLE strategy
// ---------------------------------------------------------------------------

describe('provideSelection — SINGLE strategy', () => {
    it('showSelectAll is false', () => {
        const { api } = mountSelection({ strategy: DATATABLE_SELECT_STRATEGY.SINGLE })
        expect(api().showSelectAll.value).toBe(false)
    })

    it('select([a,b], true) → only first item (a) is selected', () => {
        const { api } = mountSelection({ strategy: DATATABLE_SELECT_STRATEGY.SINGLE })
        api().select([makeItem('a'), makeItem('b')], true)
        expect(api().isSelected([makeItem('a')])).toBe(true)
        expect(api().isSelected([makeItem('b')])).toBe(false)
    })

    it('select([], true) with empty items → nothing selected (guard against undefined in Set)', () => {
        // Bug fix: singleSelectStrategy.select previously returned new Set([undefined])
        // when items was empty (items[0]?.value === undefined → Set size 1, someSelected true).
        // The fix uses `value && items.length > 0 ? [items[0]!.value] : []`.
        const { api } = mountSelection({ strategy: DATATABLE_SELECT_STRATEGY.SINGLE })
        api().select([], true)
        expect(api().someSelected.value).toBe(false)
    })

    it('selectAll(true) → no-op (single strategy preserves current selection)', () => {
        const { api } = mountSelection({ strategy: DATATABLE_SELECT_STRATEGY.SINGLE })
        api().toggleSelect(makeItem('a'))
        api().selectAll(true)
        // Single strategy selectAll returns the existing selected set unchanged
        expect(api().isSelected([makeItem('a')])).toBe(true)
        expect(api().isSelected([makeItem('b')])).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// ALL strategy
// ---------------------------------------------------------------------------

describe('provideSelection — ALL strategy', () => {
    it('showSelectAll is true', () => {
        const { api } = mountSelection({ strategy: DATATABLE_SELECT_STRATEGY.ALL })
        expect(api().showSelectAll.value).toBe(true)
    })

    it('selectAll(true) selects ALL items (not just current page)', () => {
        const allItems = [makeItem('a'), makeItem('b'), makeItem('c'), makeItem('d')]
        const pageItems = [makeItem('a'), makeItem('b')] // only first 2 on page

        const { api } = mountSelection({
            strategy: DATATABLE_SELECT_STRATEGY.ALL,
            items: allItems,
            pageItems
        })

        api().selectAll(true)
        // All 4 items should be selected, not just page items
        expect(api().isSelected([makeItem('a'), makeItem('b'), makeItem('c'), makeItem('d')])).toBe(true)
    })

    it('selectAll(false) deselects all items', () => {
        const allItems = [makeItem('a'), makeItem('b'), makeItem('c')]
        const { api } = mountSelection({
            strategy: DATATABLE_SELECT_STRATEGY.ALL,
            modelValue: ['a', 'b', 'c'],
            items: allItems,
            pageItems: allItems
        })

        api().selectAll(false)
        expect(api().someSelected.value).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// useSelection — missing context
// ---------------------------------------------------------------------------

describe('useSelection — missing provide', () => {
    it('throws "Missing selection!" when no ancestor provided selection context', async () => {
        const { useSelection } = await import('@origam/composables/DataTable/select.composable')

        const Orphan = defineComponent({
            name: 'SelectionOrphan',
            setup () {
                expect(() => useSelection()).toThrow('Missing selection!')
                return () => h('div')
            }
        })
        mount(Orphan)
    })
})
