import { describe, expect, it } from 'vitest'

import { parseHighlightLines } from '@origam/utils/Code/parse-highlight-lines.util'

describe('parseHighlightLines', () => {
    it.each([
        ['1',         [1]],
        ['1,3',       [1, 3]],
        ['1-3',       [1, 2, 3]],
        ['1,3-5,7',   [1, 3, 4, 5, 7]],
        ['  2 , 5 - 7 ', [2, 5, 6, 7]],
        ['5-3',       [3, 4, 5]],
        ['',          []],
        ['foo',       []],
        ['0,1',       [1]],
        ['-1,2',      [2]]
    ] as Array<[string, number[]]>)('parses %p → %p', (input, expected) => {
        expect(parseHighlightLines(input)).toEqual(expected)
    })

    it('accepts an already-resolved array and returns a sorted, deduped copy', () => {
        expect(parseHighlightLines([3, 1, 2, 2])).toEqual([1, 2, 3])
    })

    it('drops non-finite / sub-1 / non-number entries from arrays', () => {
        const input = [1, 0, -3, Number.NaN, Infinity, 4.7] as number[]
        // 4.7 → floored to 4; 0 / -3 / NaN / Infinity dropped.
        expect(parseHighlightLines(input)).toEqual([1, 4])
    })

    it('returns an empty array for null / undefined / non-string non-array input', () => {
        expect(parseHighlightLines(null)).toEqual([])
        expect(parseHighlightLines(undefined)).toEqual([])
        // @ts-expect-error — runtime robustness probe.
        expect(parseHighlightLines(42)).toEqual([])
    })
})
