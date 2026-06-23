import { describe, expect, it } from 'vitest'

import { transformDataTableItem, transformDataTableItems } from '@origam/utils/DataTable/items.util'

// Minimal props that match Omit<IDataTableItemsProps, 'items'>
const baseProps = {
    itemValue: 'id' as any,
    itemSelectable: 'selectable' as any,
    returnObject: false
}

const columns = [
    { key: 'name', value: 'name', sortable: false },
    { key: 'age', value: 'age', sortable: false }
] as any[]

describe('transformDataTableItem', () => {
    it('extracts the key, value, selectable and columns from a plain object', () => {
        const raw = { id: 42, name: 'Alice', age: 30, selectable: true }
        const result = transformDataTableItem(baseProps, raw as any, 0, columns)

        expect(result.type).toBe('item')
        expect(result.key).toBe(42)
        expect(result.value).toBe(42)
        expect(result.selectable).toBe(true)
        expect(result.index).toBe(0)
        expect(result.raw).toBe(raw)
        expect(result.columns.name).toBe('Alice')
        expect(result.columns.age).toBe(30)
    })

    it('uses the index passed in', () => {
        const raw = { id: 1, name: 'Bob', age: 25 }
        const result = transformDataTableItem(baseProps, raw as any, 7, columns)
        expect(result.index).toBe(7)
    })

    it('returns the whole object as value when returnObject is true', () => {
        const raw = { id: 99, name: 'Carol', age: 22, selectable: true }
        const propsWithReturnObject = { ...baseProps, returnObject: true }
        const result = transformDataTableItem(propsWithReturnObject, raw as any, 0, columns)

        expect(result.value).toBe(raw)
        // key is still the itemValue-extracted field
        expect(result.key).toBe(99)
    })

    it('defaults selectable to true when the property is absent', () => {
        const raw = { id: 1, name: 'Dave', age: 40 }
        // raw has no "selectable" field — getPropertyFromItem falls back to `true`
        const result = transformDataTableItem(baseProps, raw as any, 0, columns)
        expect(result.selectable).toBe(true)
    })

    it('omits column entry when column.key is null', () => {
        const colsWithNull = [
            { key: null, value: 'name', sortable: false },
            { key: 'age', value: 'age', sortable: false }
        ] as any[]
        const raw = { id: 1, name: 'Eve', age: 28 }
        const result = transformDataTableItem(baseProps, raw as any, 0, colsWithNull)
        // key === null → should not appear in columns
        expect('null' in result.columns).toBe(false)
        expect(result.columns.age).toBe(28)
    })

    it('produces empty columns object for empty columns array', () => {
        const raw = { id: 1, name: 'Frank' }
        const result = transformDataTableItem(baseProps, raw as any, 0, [])
        expect(result.columns).toEqual({})
    })
})

describe('transformDataTableItems', () => {
    it('maps each item with the correct index', () => {
        const raws = [
            { id: 1, name: 'A', age: 10, selectable: true },
            { id: 2, name: 'B', age: 20, selectable: false }
        ]
        const results = transformDataTableItems(baseProps, raws as any, columns)
        expect(results).toHaveLength(2)
        expect(results[0].index).toBe(0)
        expect(results[1].index).toBe(1)
        expect(results[0].key).toBe(1)
        expect(results[1].key).toBe(2)
    })

    it('returns an empty array for undefined items', () => {
        expect(transformDataTableItems(baseProps, undefined, columns)).toEqual([])
    })

    it('returns an empty array for an empty items array', () => {
        expect(transformDataTableItems(baseProps, [], columns)).toEqual([])
    })

    it('maps columns correctly for each item', () => {
        const raws = [{ id: 1, name: 'Greta', age: 35 }]
        const results = transformDataTableItems(baseProps, raws as any, columns)
        expect(results[0].columns.name).toBe('Greta')
        expect(results[0].columns.age).toBe(35)
    })
})
