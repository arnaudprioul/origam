// Reference Vitest spec for the Commons utility module — pattern for the
// rest of the Lot 11 utility-test backfill.
//
// Conventions:
//   - One `describe` block per exported function.
//   - `it.each(...)` table-driven cases for pure functions (no surprises).
//   - Import only from the module under test (avoid the barrel) so the
//     spec doesn't drag the entire utils tree into the test bundle.

import { describe, expect, it } from 'vitest'
import { convertToUnit, padEnd, padStart, toKebabCase } from './commons.util'

describe('convertToUnit', () => {
    it.each([
        // [input, expected, customUnit]
        [16,           '16px',  undefined],
        [0,            '0px',   undefined],
        [-8,           '-8px',  undefined],
        [16.5,         '16.5px', undefined],
        ['16',         '16px',  undefined],
        ['16.5',       '16.5px', undefined],
        [16,           '16rem', 'rem'],
        [50,           '50%',   '%']
    ] as Array<[number | string, string, string | undefined]>)(
        'returns %p as %p (unit=%p)',
        (input, expected, unit) => {
            expect(convertToUnit(input as number, unit)).toBe(expected)
        }
    )

    it.each([
        // Non-numeric strings pass through unchanged (CSS like "auto").
        ['auto',       'auto'],
        ['100%',       '100%'],
        ['inherit',    'inherit'],
        ['calc(100% - 16px)', 'calc(100% - 16px)']
    ])('returns the literal string for non-numeric input %p', (input, expected) => {
        expect(convertToUnit(input)).toBe(expected)
    })

    it.each([
        // Sentinels return undefined.
        [null],
        [undefined],
        [''],
        [Infinity],
        [-Infinity]
    ])('returns undefined for sentinel %p', (input) => {
        expect(convertToUnit(input as never)).toBeUndefined()
    })
})

describe('toKebabCase', () => {
    it.each([
        // Documents the *actual* implementation: `\B([A-Z])` separates every
        // uppercase letter from the previous one, and `[^a-z]/gi` replaces
        // non-letter characters (digits, spaces, punctuation) with `-`.
        ['', ''],
        ['hello', 'hello'],
        ['HelloWorld', 'hello-world'],
        ['camelCase', 'camel-case'],
        ['ALLCAPS', 'a-l-l-c-a-p-s'],
        ['someXMLValue', 'some-x-m-l-value'],
        ['with spaces', 'with-spaces'],
        ['with-existing-dashes', 'with-existing-dashes'],
        ['number123InString', 'number---in-string']
    ])('converts %p to %p', (input, expected) => {
        expect(toKebabCase(input)).toBe(expected)
    })

    it('caches repeated calls (same input → same reference)', () => {
        const a = toKebabCase('cachedInput')
        const b = toKebabCase('cachedInput')
        expect(a).toBe(b)
        // The cache field exists on the function itself; verify hit.
        expect((toKebabCase as any).cache.has('cachedInput')).toBe(true)
    })
})

describe('padStart', () => {
    it.each([
        ['1',   3, '0', '001'],
        ['12',  4, '0', '0012'],
        ['abc', 5, '*', '**abc'],
        ['1',   1, '0', '1'],   // already long enough
        ['',    3, 'x', 'xxx']
    ])('padStart(%p, %p, %p) === %p', (str, length, char, expected) => {
        expect(padStart(str, length, char)).toBe(expected)
    })

    it('uses "0" as the default fill character', () => {
        expect(padStart('5', 3)).toBe('005')
    })
})

describe('padEnd', () => {
    it.each([
        ['1',   3, '0', '100'],
        ['12',  4, '0', '1200'],
        ['abc', 5, '*', 'abc**']
    ])('padEnd(%p, %p, %p) === %p', (str, length, char, expected) => {
        expect(padEnd(str, length, char)).toBe(expected)
    })
})
