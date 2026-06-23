// Tests for `useItems` composable.
// Covers: items computed from plain strings/objects/props mapping,
// hasNullItem, transformIn/transformOut (returnObject, value comparator),
// null filtering when no null item.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IItemProps } from '@origam/interfaces'

import { useItems } from '@origam/composables/Commons/items.composable'

type ItemsTestProps = IItemProps & { itemType?: string }

function mountWith (initial: ItemsTestProps) {
    const props = reactive<ItemsTestProps>({ ...initial })
    let api!: ReturnType<typeof useItems>

    const Host = defineComponent({
        name: 'OrigamItemsHost',
        setup () {
            api = useItems(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useItems — items computed', () => {
    it('no items prop → empty array', () => {
        const { api } = mountWith({})
        expect(api().items.value).toEqual([])
    })

    it('string items → transformed with title/value from string', () => {
        const { api } = mountWith({ items: ['foo', 'bar'] })
        const items = api().items.value
        expect(items).toHaveLength(2)
        expect(items[0].value).toBe('foo')
        expect(items[1].value).toBe('bar')
    })

    it('object items with explicit itemTitle/itemValue → picks correct fields', () => {
        const { api } = mountWith({
            items: [
                { title: 'Alpha', value: 1 },
                { title: 'Beta', value: 2 }
            ],
            itemTitle: 'title',
            itemValue: 'value'
        })
        const items = api().items.value
        expect(items[0].value).toBe(1)
        expect(items[1].value).toBe(2)
    })

    it('custom itemValue → uses the specified field as value', () => {
        const { api } = mountWith({
            items: [{ id: 42, label: 'Forty-two' }],
            itemValue: 'id',
            itemTitle: 'label'
        })
        const items = api().items.value
        // itemValue='id' → getPropertyFromItem({id:42, label:'Forty-two'}, 'id', …) = 42
        expect(items[0].value).toBe(42)
    })

    it('no itemValue → value defaults to the raw item object (fallback=title=item)', () => {
        // With itemValue=undefined, getPropertyFromItem returns fallback=title=item (the raw object).
        const rawItem = { myKey: 'hello' }
        const { api } = mountWith({ items: [rawItem] })
        // value === title === the raw item itself (default fallback chain)
        expect(api().items.value[0].value).toEqual(rawItem)
    })
})

describe('useItems — hasNullItem (internal computed, not exported)', () => {
    // NOTE: useItems does NOT export hasNullItem — only { items, transformIn, transformOut }.
    // hasNullItem is an internal computed; its effect is observable via transformIn behaviour.

    it('null value passes through transformIn when a null item exists (itemValue="value")', () => {
        const { api } = mountWith({
            items: [{ title: 'None', value: null }, { title: 'Alpha', value: 1 }],
            itemTitle: 'title',
            itemValue: 'value'
        })
        // hasNullItem should be true because one item has value=null
        const result = api().transformIn([null])
        expect(result.some(i => i.value === null)).toBe(true)
    })

    it('null filtered when no null item present', () => {
        const { api } = mountWith({
            items: ['foo', 'bar']
        })
        const result = api().transformIn([null, 'foo'])
        // null filtered out; only 'foo' remains
        expect(result.every(i => i.value !== null)).toBe(true)
    })
})

describe('useItems — transformIn', () => {
    it('null value filtered out when hasNullItem=false', () => {
        const { api } = mountWith({ items: ['foo', 'bar'] })
        const result = api().transformIn([null, 'foo'])
        expect(result.every(i => i.value !== null)).toBe(true)
    })

    it('value matches an existing item → returns the internal item', () => {
        const { api } = mountWith({
            items: [{ title: 'Alpha', value: 1 }],
            itemTitle: 'title',
            itemValue: 'value'
        })
        const result = api().transformIn([1])
        expect(result[0].value).toBe(1)
        expect(result[0].props?.title).toBe('Alpha')
    })

    it('value not in items → falls back to transformListItem (raw passthrough)', () => {
        const { api } = mountWith({ items: ['foo'] })
        const result = api().transformIn(['unknown'])
        expect(result[0].value).toBe('unknown')
    })

    it('returnObject=true + string value → transforms via transformListItem', () => {
        const { api } = mountWith({
            items: [{ title: 'Alpha', value: 'alpha' }],
            returnObject: true
        })
        const result = api().transformIn(['custom-string'])
        // String model value in returnObject mode → transformListItem
        expect(result[0].value).toBe('custom-string')
    })
})

describe('useItems — transformOut', () => {
    it('returnObject=false → returns .value of each item', () => {
        const { api } = mountWith({
            items: [{ title: 'Alpha', value: 1 }],
            itemTitle: 'title',
            itemValue: 'value'
        })
        const internalItems = api().transformIn([1])
        const result = api().transformOut(internalItems)
        expect(result).toEqual([1])
    })

    it('returnObject=true → returns .raw of each item', () => {
        const raw = { title: 'Alpha', value: 1 }
        const { api } = mountWith({
            items: [raw],
            itemTitle: 'title',
            itemValue: 'value',
            returnObject: true
        })
        const internalItems = api().transformIn([raw])
        const result = api().transformOut(internalItems)
        expect(result[0]).toEqual(raw)
    })
})

describe('useItems — valueComparator (internal computed, not exported)', () => {
    // NOTE: useItems does NOT export valueComparator — only { items, transformIn, transformOut }.
    // The effect of the comparator is observable via transformIn item lookup.

    it('default deepEqual comparator — transformIn finds item matching by deep equality', () => {
        const { api } = mountWith({
            items: [{ title: 'Alpha', value: 1 }],
            itemTitle: 'title',
            itemValue: 'value'
        })
        // value=1 deepEquals 1 → item is found
        const result = api().transformIn([1])
        expect(result[0].value).toBe(1)
    })

    it('custom valueComparator — transformIn uses it for matching', () => {
        const customComp = (a: any, b: any) => a?.id === b?.id
        const { api } = mountWith({
            items: [{ title: 'A', value: { id: 1 } }],
            itemTitle: 'title',
            itemValue: 'value',
            valueComparator: customComp as any
        })
        // Custom comparator: {id:1} matches {id:1}
        const result = api().transformIn([{ id: 1 }])
        expect(result[0].value).toEqual({ id: 1 })
        expect(result[0].props?.title).toBe('A')
    })
})

describe('useItems — reactivity', () => {
    it('changing items prop updates computed items', () => {
        const { props, api } = mountWith({ items: ['foo'] })
        expect(api().items.value).toHaveLength(1)
        props.items = ['foo', 'bar', 'baz']
        expect(api().items.value).toHaveLength(3)
    })
})
