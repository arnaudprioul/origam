// Tests for `useFilter` composable.
// Covers: no query → all items pass, query matches subset, noFilter flag,
// filterKeys restriction, filterMode (some/every), customFilter, getMatches,
// Ref query + reactivity.
//
// filterItems operates on IInternalItem objects. When no `transform` option
// is provided, it uses the item itself as the "transformed" object and looks
// up filterKeys on it. The IInternalItem shape is { value, raw } — so to
// make a key like 'title' visible to filterItems, items must either be
// passed as [item, transformed] tuples (using the `transform` option) or the
// field must live at the top level of the item object.
//
// Strategy: supply a `transform` option that projects item.raw into the
// transformed shape, so filterKeys can find 'title' directly.

import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IFiltersProps, IInternalItem } from '@origam/interfaces'

import { useFilter } from '@origam/composables/Commons/filters.composable'

// Minimal IInternalItem — raw carries the searchable fields
function item (title: string, value: unknown = title): IInternalItem & { raw: { title: string } } {
    return { value, raw: { title } }
}

// Transform option: project raw fields onto the transformed surface
const titleTransform = (i: IInternalItem) => i.raw as Record<string, unknown>

function mountFilter<T extends IInternalItem> (
    props: IFiltersProps,
    rawItems: T[],
    query: string | undefined,
    opts?: Parameters<typeof useFilter<T>>[3]
) {
    const queryRef = ref(query)
    let api!: ReturnType<typeof useFilter<T>>

    const Host = defineComponent({
        name: 'OrigamFilterHost',
        setup () {
            api = useFilter<T>(props, rawItems, queryRef, opts)
            return () => h('div')
        }
    })

    mount(Host)
    return { queryRef, api: () => api }
}

const BASE_PROPS: IFiltersProps = {
    filterKeys: 'title',
    filterMode: 'some',
    noFilter: false
}

describe('useFilter — no query (empty string)', () => {
    it('empty query → all items pass through', () => {
        const items = [item('Alpha'), item('Beta'), item('Gamma')]
        const { api } = mountFilter(BASE_PROPS, items, undefined, { transform: titleTransform })
        expect(api().filteredItems.value).toHaveLength(3)
    })

    it('empty string query → all items pass through', () => {
        const items = [item('Alpha'), item('Beta')]
        const { api } = mountFilter(BASE_PROPS, items, '', { transform: titleTransform })
        expect(api().filteredItems.value).toHaveLength(2)
    })
})

describe('useFilter — query matches subset', () => {
    it('query "al" → only "Alpha" matches (case-insensitive)', () => {
        const items = [item('Alpha'), item('Beta'), item('Gamma')]
        const { api } = mountFilter(BASE_PROPS, items, 'al', { transform: titleTransform })
        const results = api().filteredItems.value
        expect(results).toHaveLength(1)
        expect(results[0].value).toBe('Alpha')
    })

    it('query "a" → only items containing "a" (case-insensitive) match', () => {
        const items = [item('Alpha'), item('Banana'), item('Cherry')]
        const { api } = mountFilter(BASE_PROPS, items, 'a', { transform: titleTransform })
        const results = api().filteredItems.value
        // Alpha → 'a', Banana → 'a'; Cherry → no 'a'
        expect(results.every(r => (r.raw as any).title.toLowerCase().includes('a'))).toBe(true)
        expect(results.find(r => (r.raw as any).title === 'Cherry')).toBeUndefined()
    })

    it('query with no match → empty filtered items', () => {
        const items = [item('Alpha'), item('Beta')]
        const { api } = mountFilter(BASE_PROPS, items, 'zzz', { transform: titleTransform })
        expect(api().filteredItems.value).toHaveLength(0)
    })
})

describe('useFilter — noFilter flag', () => {
    it('noFilter=true → all items pass regardless of query', () => {
        const props: IFiltersProps = { ...BASE_PROPS, noFilter: true }
        const items = [item('Alpha'), item('Beta')]
        const { api } = mountFilter(props, items, 'zzz', { transform: titleTransform })
        expect(api().filteredItems.value).toHaveLength(2)
    })
})

describe('useFilter — filterKeys restriction', () => {
    it('filterKeys="title" → matches on title field only', () => {
        const items: Array<IInternalItem & { raw: { title: string; code: string } }> = [
            { value: 1, raw: { title: 'Apple', code: 'XYZ' } },
            { value: 2, raw: { title: 'Banana', code: 'ABC' } }
        ]
        const props: IFiltersProps = { ...BASE_PROPS, filterKeys: 'title' }
        const { api } = mountFilter(props, items, 'Apple', {
            transform: (i) => i.raw as Record<string, unknown>
        })
        expect(api().filteredItems.value).toHaveLength(1)
        expect(api().filteredItems.value[0].value).toBe(1)
    })
})

describe('useFilter — customFilter', () => {
    it('customFilter returning true for every item → all pass', () => {
        const props: IFiltersProps = {
            ...BASE_PROPS,
            customFilter: () => true
        }
        const items = [item('Alpha'), item('Beta'), item('Gamma')]
        const { api } = mountFilter(props, items, 'anything', { transform: titleTransform })
        expect(api().filteredItems.value).toHaveLength(3)
    })

    it('customFilter returning false for every item → none pass', () => {
        const props: IFiltersProps = {
            ...BASE_PROPS,
            customFilter: () => false
        }
        const items = [item('Alpha'), item('Beta')]
        const { api } = mountFilter(props, items, 'anything', { transform: titleTransform })
        expect(api().filteredItems.value).toHaveLength(0)
    })
})

describe('useFilter — getMatches', () => {
    it('getMatches returns match info for a matching item', () => {
        const items = [item('Alpha'), item('Beta')]
        const { api } = mountFilter(BASE_PROPS, items, 'Alpha', { transform: titleTransform })
        const matches = api().getMatches(items[0])
        expect(matches).toBeDefined()
    })

    it('getMatches returns undefined for a non-matching item', () => {
        const items = [item('Alpha'), item('Beta')]
        const { api } = mountFilter(BASE_PROPS, items, 'Alpha', { transform: titleTransform })
        // Beta was filtered out, no match entry
        const matches = api().getMatches(items[1])
        expect(matches).toBeUndefined()
    })
})

describe('useFilter — reactivity', () => {
    it('changing query ref updates filteredItems', async () => {
        const items = [item('Alpha'), item('Beta'), item('Gamma')]
        const { queryRef, api } = mountFilter(BASE_PROPS, items, '', { transform: titleTransform })
        expect(api().filteredItems.value).toHaveLength(3)
        queryRef.value = 'bet'
        await nextTick()
        expect(api().filteredItems.value).toHaveLength(1)
        expect(api().filteredItems.value[0].value).toBe('Beta')
    })

    it('clearing query after a filter → all items restored', async () => {
        const items = [item('Alpha'), item('Beta')]
        const { queryRef, api } = mountFilter(BASE_PROPS, items, 'Alpha', { transform: titleTransform })
        expect(api().filteredItems.value).toHaveLength(1)
        queryRef.value = ''
        await nextTick()
        expect(api().filteredItems.value).toHaveLength(2)
    })
})

describe('useFilter — filterMode=every', () => {
    it('filterMode="every" — item excluded when one key does not match', () => {
        const rawItems: Array<IInternalItem & { raw: { title: string; code: string } }> = [
            { value: 1, raw: { title: 'Apple', code: 'MATCH' } },
            { value: 2, raw: { title: 'MATCH', code: 'MATCH' } }
        ]
        // Both 'title' and 'code' must match for 'every' mode
        const props: IFiltersProps = {
            filterKeys: ['title', 'code'],
            filterMode: 'every',
            noFilter: false
        }
        const { api } = mountFilter(props, rawItems, 'MATCH', {
            transform: (i) => i.raw as Record<string, unknown>
        })
        // item 1: title='Apple' fails → excluded in every mode
        // item 2: both match
        expect(api().filteredItems.value.map(i => i.value)).toEqual([2])
    })
})
