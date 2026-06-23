import { describe, expect, it } from 'vitest'

import {
    convertToInternalHeaders,
    extractKeys,
    extractLeaves,
    getDataTableHeadersDefaultItem,
    getHeaderDepth,
    parseFixedColumns,
    priorityQueue
} from '@origam/utils/DataTable/headers.util'

// ----- extractKeys --------------------------------------------------------

describe('extractKeys', () => {
    it('collects keys from a flat list', () => {
        const headers = [
            { key: 'name' },
            { key: 'age' },
            { key: 'email' }
        ] as any[]
        const keys = extractKeys(headers)
        expect([...keys]).toEqual(['name', 'age', 'email'])
    })

    it('collects keys from nested children recursively', () => {
        const headers = [
            {
                key: 'group',
                children: [
                    { key: 'child1' },
                    { key: 'child2' }
                ]
            }
        ] as any[]
        const keys = extractKeys(headers)
        expect([...keys]).toContain('group')
        expect([...keys]).toContain('child1')
        expect([...keys]).toContain('child2')
    })

    it('ignores items without a key', () => {
        const headers = [{ title: 'No Key Column' }] as any[]
        const keys = extractKeys(headers)
        expect(keys.size).toBe(0)
    })

    it('returns an empty Set for an empty array', () => {
        expect(extractKeys([])).toEqual(new Set())
    })

    it('accumulates into a pre-existing Set when passed as second arg', () => {
        const existing = new Set(['existing'])
        const headers = [{ key: 'new' }] as any[]
        const keys = extractKeys(headers, existing)
        expect([...keys]).toContain('existing')
        expect([...keys]).toContain('new')
    })
})

// ----- getDataTableHeadersDefaultItem -------------------------------------

describe('getDataTableHeadersDefaultItem', () => {
    it('returns undefined when key is missing', () => {
        expect(getDataTableHeadersDefaultItem({} as any)).toBeUndefined()
    })

    it('returns DEFAULT_HEADER for key "data-table-group"', () => {
        const result = getDataTableHeadersDefaultItem({ key: 'data-table-group' } as any)
        expect(result).toEqual({ title: '', sortable: false })
    })

    it('returns DEFAULT_ACTION_HEADER for key "data-table-expand"', () => {
        const result = getDataTableHeadersDefaultItem({ key: 'data-table-expand' } as any)
        expect(result).toMatchObject({ title: '', sortable: false, width: 48 })
    })

    it('returns DEFAULT_ACTION_HEADER for key "data-table-select"', () => {
        const result = getDataTableHeadersDefaultItem({ key: 'data-table-select' } as any)
        expect(result).toMatchObject({ title: '', sortable: false, width: 48 })
    })

    it('returns undefined for any other key', () => {
        expect(getDataTableHeadersDefaultItem({ key: 'name' } as any)).toBeUndefined()
    })
})

// ----- convertToInternalHeaders -------------------------------------------

describe('convertToInternalHeaders', () => {
    it('converts a simple header list to internal format', () => {
        const headers = [{ key: 'name', title: 'Name' }] as any[]
        const result = convertToInternalHeaders(headers)
        expect(result).toHaveLength(1)
        expect(result[0].key).toBe('name')
        expect(result[0].value).toBe('name') // value falls back to key
        expect(result[0].sortable).toBe(true) // key != null → sortable defaults to true
    })

    it('sets sortable false when the original key property is absent and no sort fn', () => {
        // The source computes `key` from `value` when `item.key` is absent, but the
        // `sortable` default checks `defaultItem.key != null` (original key, not the
        // computed one) and `!!defaultItem.sort`. Both are falsy → sortable = false.
        const headers = [{ title: 'No key', value: 'someValue' }] as any[]
        const result = convertToInternalHeaders(headers)
        expect(result[0].sortable).toBe(false)
    })

    it('marks sortable true when a sort function is provided (even without key)', () => {
        const headers = [{ title: 'Custom Sort', sort: () => 0 }] as any[]
        const result = convertToInternalHeaders(headers)
        expect(result[0].sortable).toBe(true)
    })

    it('converts nested children recursively', () => {
        const headers = [
            {
                key: 'group',
                title: 'Group',
                children: [{ key: 'child', title: 'Child' }]
            }
        ] as any[]
        const result = convertToInternalHeaders(headers)
        expect(result[0].children).toHaveLength(1)
        expect(result[0].children![0].key).toBe('child')
    })

    it('returns an empty array for empty input', () => {
        expect(convertToInternalHeaders([])).toEqual([])
    })

    it('uses the string value as key when key is missing but value is a string', () => {
        const headers = [{ value: 'email', title: 'Email' }] as any[]
        const result = convertToInternalHeaders(headers)
        expect(result[0].key).toBe('email')
        expect(result[0].value).toBe('email')
    })

    it('applies DEFAULT_HEADER preset for "data-table-group" key', () => {
        const headers = [{ key: 'data-table-group' }] as any[]
        const result = convertToInternalHeaders(headers)
        expect(result[0].title).toBe('')
        expect(result[0].sortable).toBe(false)
    })

    it('applies DEFAULT_ACTION_HEADER width for "data-table-select"', () => {
        const headers = [{ key: 'data-table-select' }] as any[]
        const result = convertToInternalHeaders(headers)
        expect(result[0].width).toBe(48)
    })
})

// ----- getHeaderDepth -----------------------------------------------------

describe('getHeaderDepth', () => {
    it('returns 0 for a leaf header (no children)', () => {
        expect(getHeaderDepth({ key: 'name', sortable: false } as any)).toBe(0)
    })

    it('returns 1 for one level of children', () => {
        const item = {
            key: 'group',
            sortable: false,
            children: [{ key: 'child', sortable: false }]
        } as any
        expect(getHeaderDepth(item)).toBe(1)
    })

    it('returns the maximum depth across branches', () => {
        const item = {
            key: 'root',
            sortable: false,
            children: [
                { key: 'shallow', sortable: false },
                {
                    key: 'deep',
                    sortable: false,
                    children: [{ key: 'leaf', sortable: false }]
                }
            ]
        } as any
        expect(getHeaderDepth(item)).toBe(2)
    })
})

// ----- extractLeaves -------------------------------------------------------

describe('extractLeaves', () => {
    it('returns the item itself for a leaf', () => {
        const leaf = { key: 'name', sortable: false } as any
        expect(extractLeaves(leaf)).toEqual([leaf])
    })

    it('returns all leaves from a nested structure', () => {
        const header = {
            key: 'root',
            sortable: false,
            children: [
                { key: 'leaf1', sortable: false },
                {
                    key: 'mid',
                    sortable: false,
                    children: [{ key: 'leaf2', sortable: false }]
                }
            ]
        } as any
        const leaves = extractLeaves(header)
        expect(leaves.map((l: any) => l.key)).toEqual(['leaf1', 'leaf2'])
    })
})

// ----- priorityQueue -------------------------------------------------------

describe('priorityQueue', () => {
    it('initialises with elements at priority 0', () => {
        const q = priorityQueue(['a', 'b', 'c'])
        expect(q.size()).toBe(3)
    })

    it('dequeues in FIFO order for equal-priority elements', () => {
        const q = priorityQueue<string>()
        q.enqueue('first', 0)
        q.enqueue('second', 0)
        q.enqueue('third', 0)
        expect(q.dequeue()!.element).toBe('first')
        expect(q.dequeue()!.element).toBe('second')
    })

    it('dequeues lower-priority items before higher-priority ones', () => {
        const q = priorityQueue<string>()
        q.enqueue('low', 10)
        q.enqueue('high', 1)
        expect(q.dequeue()!.element).toBe('high')
    })

    it('size() decrements after each dequeue', () => {
        const q = priorityQueue(['x'])
        expect(q.size()).toBe(1)
        q.dequeue()
        expect(q.size()).toBe(0)
    })

    it('count() returns the number of items at the current lowest priority', () => {
        const q = priorityQueue<string>()
        q.enqueue('a', 0)
        q.enqueue('b', 0)
        q.enqueue('c', 1)
        expect(q.count()).toBe(2)
    })

    it('count() returns 0 for an empty queue', () => {
        const q = priorityQueue<string>()
        expect(q.count()).toBe(0)
    })

    it('dequeue() returns undefined on empty queue', () => {
        const q = priorityQueue<string>()
        expect(q.dequeue()).toBeUndefined()
    })
})

// ----- parseFixedColumns ---------------------------------------------------

describe('parseFixedColumns', () => {
    it('marks lastFixed on the rightmost fixed leaf (first encountered in reverse pass)', () => {
        const headers = [
            { key: 'a', sortable: false, fixed: true, width: '100' },
            { key: 'b', sortable: false, fixed: true, width: '80' },
            { key: 'c', sortable: false }
        ] as any[]
        parseFixedColumns(headers)
        // The rightmost fixed leaf gets lastFixed (first in reverse pass that has no seenFixed yet)
        // Items iterated right-to-left: 'c' (not fixed), then 'b' (fixed, seenFixed=false → lastFixed=true), then 'a'
        expect(headers[1].lastFixed).toBe(true)
        expect(headers[0].lastFixed).toBeUndefined()
    })

    it('accumulates fixedOffset for fixed columns with numeric width', () => {
        const headers = [
            { key: 'a', sortable: false, fixed: true, width: '100' },
            { key: 'b', sortable: false, fixed: true, width: '80' }
        ] as any[]
        parseFixedColumns(headers)
        expect(headers[0].fixedOffset).toBe(0)
        expect(headers[1].fixedOffset).toBe(100)
    })

    it('does not set fixedOffset on non-fixed columns', () => {
        const headers = [
            { key: 'a', sortable: false, fixed: true, width: '100' },
            { key: 'b', sortable: false }
        ] as any[]
        parseFixedColumns(headers)
        expect(headers[1].fixedOffset).toBeUndefined()
    })
})
