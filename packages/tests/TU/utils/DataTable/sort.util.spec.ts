import { describe, expect, it } from 'vitest'

import { sortItems } from '@origam/utils/DataTable/sort.util'

// Minimal IInternalItem shape required by sortItems
type RawItem = Record<string, unknown>
function makeItem (raw: RawItem) {
    return { raw, value: raw }
}

describe('sortItems', () => {
    describe('single-key sort — asc (default)', () => {
        it('sorts numbers ascending', () => {
            const items = [makeItem({ age: 30 }), makeItem({ age: 10 }), makeItem({ age: 20 })]
            const result = sortItems(items, [{ key: 'age' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            expect(result.map(i => i.raw.age)).toEqual([10, 20, 30])
        })

        it('sorts strings ascending (locale-aware, case-insensitive)', () => {
            const items = [makeItem({ name: 'Zara' }), makeItem({ name: 'alice' }), makeItem({ name: 'Bob' })]
            const result = sortItems(items, [{ key: 'name', order: 'asc' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            const names = result.map(i => i.raw.name)
            expect(names[0]).toBe('alice')
            expect(names[1]).toBe('Bob')
            expect(names[2]).toBe('Zara')
        })

        it('returns the same items reference-stable when already sorted', () => {
            const items = [makeItem({ v: 1 }), makeItem({ v: 2 }), makeItem({ v: 3 })]
            const result = sortItems(items, [{ key: 'v' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            expect(result.map(i => i.raw.v)).toEqual([1, 2, 3])
        })
    })

    describe('single-key sort — desc', () => {
        it('sorts numbers descending', () => {
            const items = [makeItem({ age: 10 }), makeItem({ age: 30 }), makeItem({ age: 20 })]
            const result = sortItems(items, [{ key: 'age', order: 'desc' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            expect(result.map(i => i.raw.age)).toEqual([30, 20, 10])
        })

        it('sorts strings descending', () => {
            const items = [makeItem({ name: 'alice' }), makeItem({ name: 'Zara' }), makeItem({ name: 'Bob' })]
            const result = sortItems(items, [{ key: 'name', order: 'desc' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            const names = result.map(i => (i.raw.name as string).toLowerCase())
            expect(names[0]).toBe('zara')
            expect(names[2]).toBe('alice')
        })
    })

    describe('null / undefined / empty values', () => {
        it('places null values before non-null (isEmpty == true → -1)', () => {
            const items = [makeItem({ v: 'b' }), makeItem({ v: null }), makeItem({ v: 'a' })]
            const result = sortItems(items, [{ key: 'v', order: 'asc' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            expect(result[0].raw.v).toBeNull()
        })

        it('places undefined values before non-null', () => {
            const items = [makeItem({ v: 'b' }), makeItem({ v: undefined }), makeItem({ v: 'a' })]
            const result = sortItems(items, [{ key: 'v', order: 'asc' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            expect(result[0].raw.v).toBeUndefined()
        })

        it('treats two null values as equal (stable, both before non-null)', () => {
            const items = [makeItem({ v: 'z' }), makeItem({ v: null }), makeItem({ v: null })]
            const result = sortItems(items, [{ key: 'v', order: 'asc' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            expect(result[0].raw.v).toBeNull()
            expect(result[1].raw.v).toBeNull()
        })
    })

    describe('order: false — skip criterion', () => {
        it('does not sort when order is false (preserves original order)', () => {
            const items = [makeItem({ v: 3 }), makeItem({ v: 1 }), makeItem({ v: 2 })]
            const result = sortItems(items, [{ key: 'v', order: false }], {
                transform: (item) => item.raw as Record<string, any>
            })
            expect(result.map(i => i.raw.v)).toEqual([3, 1, 2])
        })
    })

    describe('multi-key sort', () => {
        it('breaks ties with the secondary key', () => {
            const items = [
                makeItem({ dept: 'eng', level: 3 }),
                makeItem({ dept: 'eng', level: 1 }),
                makeItem({ dept: 'hr', level: 2 }),
                makeItem({ dept: 'eng', level: 2 })
            ]
            const result = sortItems(
                items,
                [{ key: 'dept', order: 'asc' }, { key: 'level', order: 'asc' }],
                { transform: (item) => item.raw as Record<string, any> }
            )
            const eng = result.filter(i => i.raw.dept === 'eng').map(i => i.raw.level)
            expect(eng).toEqual([1, 2, 3])
        })
    })

    describe('Date values', () => {
        it('sorts Date objects numerically', () => {
            const d1 = new Date('2023-01-01')
            const d2 = new Date('2021-06-15')
            const d3 = new Date('2022-03-10')
            const items = [makeItem({ date: d1 }), makeItem({ date: d2 }), makeItem({ date: d3 })]
            const result = sortItems(items, [{ key: 'date', order: 'asc' }], {
                transform: (item) => item.raw as Record<string, any>
            })
            expect(result.map(i => i.raw.date)).toEqual([d2, d3, d1])
        })
    })

    describe('custom sort functions', () => {
        it('uses sortFunctions when provided', () => {
            const items = [makeItem({ v: 'banana' }), makeItem({ v: 'apple' }), makeItem({ v: 'cherry' })]
            // Reverse-length sort
            const result = sortItems(items, [{ key: 'v', order: 'asc' }], {
                transform: (item) => item.raw as Record<string, any>,
                sortFunctions: {
                    v: (a: any, b: any) => (a as string).length - (b as string).length
                }
            })
            expect(result.map(i => i.raw.v)).toEqual(['apple', 'banana', 'cherry'])
        })

        it('uses sortRawFunctions when provided', () => {
            const items = [
                makeItem({ score: 10 }),
                makeItem({ score: 5 }),
                makeItem({ score: 20 })
            ]
            const result = sortItems(items, [{ key: 'score', order: 'asc' }], {
                transform: (item) => item.raw as Record<string, any>,
                sortRawFunctions: {
                    score: (a: any, b: any) => (b as any).score - (a as any).score
                }
            })
            // Raw function sorts descending by score
            expect(result.map(i => i.raw.score)).toEqual([20, 10, 5])
        })

        it('skips criterion when sortFunctions[key] returns null', () => {
            const items = [makeItem({ v: 3 }), makeItem({ v: 1 }), makeItem({ v: 2 })]
            const result = sortItems(items, [{ key: 'v', order: 'asc' }], {
                transform: (item) => item.raw as Record<string, any>,
                sortFunctions: { v: () => null as any }
            })
            // null return means "continue" — original order preserved
            expect(result.map(i => i.raw.v)).toEqual([3, 1, 2])
        })
    })

    describe('empty input', () => {
        it('returns empty array for empty items', () => {
            expect(sortItems([], [{ key: 'v' }])).toEqual([])
        })

        it('returns items unchanged for empty sortByItems', () => {
            const items = [makeItem({ v: 3 }), makeItem({ v: 1 })]
            const result = sortItems(items, [])
            expect(result.map(i => i.raw.v)).toEqual([3, 1])
        })
    })

    describe('no transform provided', () => {
        it('falls back to the item itself as the transform', () => {
            const items = [
                { raw: { v: 3 }, value: { v: 3 }, v: 3 },
                { raw: { v: 1 }, value: { v: 1 }, v: 1 }
            ]
            const result = sortItems(items as any, [{ key: 'v', order: 'asc' }])
            expect(result.map((i: any) => i.raw.v)).toEqual([1, 3])
        })
    })
})
