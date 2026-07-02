// Tests for the DataTable items composable.
//
// useDataTableItems is a thin computed wrapper around transformDataTableItems.
// We test the reactive computed result directly by varying props and columns.
//
// Covers:
//   - Empty items list → empty computed result
//   - Items are transformed: index, key, columns extracted by column definition
//   - columns array drives which column values are extracted
//   - returnObject=true → value is the raw item object
//   - itemValue key path → value is extracted from that path
//   - itemSelectable=false field → selectable=false on result item
//   - Reactive: changing props.items triggers recomputation

import { defineComponent, h, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useDataTableItems } from '@origam/composables/DataTable/items.composable'
import type { IDataTableItem, IDataTableItemsProps, IInternalDataTableHeader } from '@origam/interfaces'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeColumn (key: string): IInternalDataTableHeader {
    return {
        key,
        value: key,
        title: key,
        sortable: false,
        colspan: 1,
        rowspan: 1
    } as unknown as IInternalDataTableHeader
}

/** Cast a plain object to IDataTableItem to satisfy strict typings in the composable. */
function makeRawItem (obj: Record<string, unknown>): IDataTableItem {
    return obj as unknown as IDataTableItem
}

function mountItems (
    props: IDataTableItemsProps,
    columnKeys: string[]
) {
    const columns = ref<IInternalDataTableHeader[]>(columnKeys.map(makeColumn))
    const reactiveProps = reactive(props)

    let api!: ReturnType<typeof useDataTableItems>

    const Host = defineComponent({
        name: 'ItemsHost',
        setup () {
            api = useDataTableItems(reactiveProps, columns)
            return () => h('div')
        }
    })

    mount(Host)
    return { reactiveProps, columns, api: () => api }
}

// ---------------------------------------------------------------------------
// useDataTableItems
// ---------------------------------------------------------------------------

describe('useDataTableItems', () => {
    it('empty items → empty computed result', () => {
        const { api } = mountItems({ items: [] }, ['name'])
        expect(api().items.value).toEqual([])
    })

    it('items without columns → each item has index and key', () => {
        const items = [
            makeRawItem({ name: 'Alice', age: 25 }),
            makeRawItem({ name: 'Bob', age: 30 })
        ]
        const { api } = mountItems({ items, itemValue: 'name' }, [])
        const result = api().items.value
        expect(result).toHaveLength(2)
        expect(result[0].index).toBe(0)
        expect(result[1].index).toBe(1)
    })

    it('columns drive extraction of column values', () => {
        const items = [makeRawItem({ name: 'Alice', age: 25 })]
        const { api } = mountItems({ items, itemValue: 'name' }, ['name', 'age'])
        const row = api().items.value[0]
        expect(row.columns['name']).toBe('Alice')
        expect(row.columns['age']).toBe(25)
    })

    it('itemValue sets the value field from item key path', () => {
        const items = [makeRawItem({ id: 42, name: 'Alice' })]
        const { api } = mountItems({ items, itemValue: 'id' }, [])
        expect(api().items.value[0].value).toBe(42)
    })

    it('returnObject=true → value deep-equals the raw item', () => {
        const rawItem = makeRawItem({ id: 1, name: 'Bob' })
        const { api } = mountItems({ items: [rawItem], returnObject: true }, [])
        expect(api().items.value[0].value).toStrictEqual(rawItem)
    })

    it('itemSelectable field controls selectable flag', () => {
        const items = [
            makeRawItem({ name: 'Alice', locked: false }),
            makeRawItem({ name: 'Bob', locked: true })
        ]
        // itemSelectable: 'locked' means selectable comes from the 'locked' field
        const { api } = mountItems({ items, itemValue: 'name', itemSelectable: 'locked' }, [])
        expect(api().items.value[0].selectable).toBe(false)
        expect(api().items.value[1].selectable).toBe(true)
    })

    it('items undefined → returns empty array', () => {
        const { api } = mountItems({ items: undefined }, ['name'])
        expect(api().items.value).toEqual([])
    })

    it('reactive: adding items to the list updates the computed', async () => {
        const items: IDataTableItem[] = [makeRawItem({ name: 'Alice' })]
        const { reactiveProps, api } = mountItems({ items, itemValue: 'name' }, ['name'])

        expect(api().items.value).toHaveLength(1)

        reactiveProps.items = [
            makeRawItem({ name: 'Alice' }),
            makeRawItem({ name: 'Bob' })
        ]

        // Vue reactivity — nextTick not needed for computed, but let's be safe
        await Promise.resolve()
        expect(api().items.value).toHaveLength(2)
    })
})
