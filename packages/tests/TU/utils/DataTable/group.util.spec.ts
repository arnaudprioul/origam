import { describe, expect, it } from 'vitest'

import { flattenItems, groupItems, groupItemsByProperty } from '@origam/utils/DataTable/group.util'

// Minimal IDataTableGroupableItem
function makeGroupable (raw: Record<string, unknown>) {
    return { type: 'item' as const, raw }
}

describe('groupItemsByProperty', () => {
    it('groups items into a Map by a single property', () => {
        const items = [
            makeGroupable({ dept: 'eng' }),
            makeGroupable({ dept: 'hr' }),
            makeGroupable({ dept: 'eng' })
        ]
        const map = groupItemsByProperty(items, 'dept')
        expect(map).toBeInstanceOf(Map)
        expect(map.get('eng')).toHaveLength(2)
        expect(map.get('hr')).toHaveLength(1)
    })

    it('returns an empty array for an empty items input', () => {
        const result = groupItemsByProperty([], 'dept')
        // The source returns [] early when items.length === 0
        expect(result).toEqual([])
    })

    it('handles items where the property is undefined', () => {
        const items = [makeGroupable({ other: 1 }), makeGroupable({ other: 2 })]
        const map = groupItemsByProperty(items, 'dept')
        expect(map.get(undefined)).toHaveLength(2)
    })

    it('preserves insertion order of first-seen group values', () => {
        const items = [
            makeGroupable({ g: 'c' }),
            makeGroupable({ g: 'a' }),
            makeGroupable({ g: 'b' }),
            makeGroupable({ g: 'a' })
        ]
        const map = groupItemsByProperty(items, 'g')
        expect([...map.keys()]).toEqual(['c', 'a', 'b'])
    })
})

describe('groupItems', () => {
    it('returns an empty array when groupBy is empty', () => {
        const items = [makeGroupable({ dept: 'eng' })]
        expect(groupItems(items, [])).toEqual([])
    })

    it('groups by a single key and returns IDataTableGroup objects', () => {
        const items = [
            makeGroupable({ dept: 'eng', name: 'Alice' }),
            makeGroupable({ dept: 'hr', name: 'Bob' }),
            makeGroupable({ dept: 'eng', name: 'Carol' })
        ]
        const groups = groupItems(items, ['dept'])
        expect(groups).toHaveLength(2)
        const eng = groups.find(g => g.value === 'eng')!
        expect(eng.type).toBe('group')
        expect(eng.key).toBe('dept')
        expect(eng.depth).toBe(0)
        expect(eng.items).toHaveLength(2)
    })

    it('generates unique ids prefixed with the default root prefix', () => {
        const items = [makeGroupable({ dept: 'eng' }), makeGroupable({ dept: 'hr' })]
        const groups = groupItems(items, ['dept'])
        expect(groups[0].id).toMatch(/^root_dept_/)
    })

    it('uses a custom prefix when provided', () => {
        const items = [makeGroupable({ dept: 'eng' })]
        const groups = groupItems(items, ['dept'], 0, 'parent')
        expect(groups[0].id).toMatch(/^parent_dept_/)
    })

    it('nests groups for multi-key groupBy', () => {
        const items = [
            makeGroupable({ dept: 'eng', level: 'senior' }),
            makeGroupable({ dept: 'eng', level: 'junior' }),
            makeGroupable({ dept: 'hr', level: 'senior' })
        ]
        const groups = groupItems(items, ['dept', 'level'])
        const engGroup = groups.find(g => g.value === 'eng')!
        // Nested level groups
        expect(Array.isArray(engGroup.items)).toBe(true)
        const nestedItems = engGroup.items as any[]
        expect(nestedItems.every(i => i.type === 'group')).toBe(true)
        expect(nestedItems).toHaveLength(2)
    })

    it('increments depth for nested groups', () => {
        const items = [makeGroupable({ a: 1, b: 2 })]
        const groups = groupItems(items, ['a', 'b'])
        const nested = (groups[0].items as any[])[0]
        expect(nested.depth).toBe(1)
    })

    it('returns empty groups for empty items even with non-empty groupBy', () => {
        const groups = groupItems([], ['dept'])
        expect(groups).toEqual([])
    })
})

describe('flattenItems', () => {
    it('returns flat items that are not groups as-is', () => {
        const items = [makeGroupable({ v: 1 }), makeGroupable({ v: 2 })]
        const result = flattenItems(items, new Set())
        expect(result).toHaveLength(2)
    })

    it('includes a group header and its children when the group is opened', () => {
        const child1 = makeGroupable({ v: 'child1' })
        const child2 = makeGroupable({ v: 'child2' })
        const group = {
            type: 'group' as const,
            id: 'g1',
            key: 'dept',
            value: 'eng',
            depth: 0,
            items: [child1, child2]
        }
        const opened = new Set(['g1'])
        const result = flattenItems([group], opened)
        // group header + 2 children
        expect(result).toHaveLength(3)
        expect(result[0]).toBe(group)
        expect(result[1]).toBe(child1)
        expect(result[2]).toBe(child2)
    })

    it('includes only the group header when the group is closed', () => {
        const child = makeGroupable({ v: 'child' })
        const group = {
            type: 'group' as const,
            id: 'g1',
            key: 'dept',
            value: 'eng',
            depth: 0,
            items: [child]
        }
        const opened = new Set<string>()
        const result = flattenItems([group], opened)
        expect(result).toHaveLength(1)
        expect(result[0]).toBe(group)
    })

    it('skips group header but always includes children when value is null', () => {
        // Groups with value == null are "virtual" roots — children always included
        const child = makeGroupable({ v: 'child' })
        const group = {
            type: 'group' as const,
            id: 'root_null',
            key: 'dept',
            value: null,
            depth: 0,
            items: [child]
        }
        const opened = new Set<string>()
        const result = flattenItems([group], opened)
        // group itself NOT pushed (value == null), but child IS
        expect(result).toHaveLength(1)
        expect(result[0]).toBe(child)
    })

    it('recursively flattens nested open groups', () => {
        const leaf = makeGroupable({ v: 'leaf' })
        const inner = {
            type: 'group' as const,
            id: 'inner',
            key: 'level',
            value: 'senior',
            depth: 1,
            items: [leaf]
        }
        const outer = {
            type: 'group' as const,
            id: 'outer',
            key: 'dept',
            value: 'eng',
            depth: 0,
            items: [inner]
        }
        const opened = new Set(['outer', 'inner'])
        const result = flattenItems([outer], opened)
        // outer header + inner header + leaf
        expect(result).toHaveLength(3)
        expect(result[2]).toBe(leaf)
    })

    it('returns empty array for empty input', () => {
        expect(flattenItems([], new Set())).toEqual([])
    })
})
