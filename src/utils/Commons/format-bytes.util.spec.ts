import { describe, expect, it } from 'vitest'

import { formatBytes } from './format-bytes.util'

describe('formatBytes', () => {
    it.each([
        // [input, expected]
        [0,             '0 B'],
        [-1,            '0 B'],
        [Number.NaN,    '0 B'],
        [Infinity,      '0 B'],
        [1,             '1 B'],
        [1023,          '1023 B'],
        [1024,          '1.0 KB'],
        [1500,          '1.5 KB'],
        [1_500_000,     '1.4 MB'],
        [1_000_000_000, '953.7 MB'],
        [1_073_741_824, '1.0 GB']
    ] as Array<[number, string]>)(
        'returns %p as %p',
        (input, expected) => {
            expect(formatBytes(input)).toBe(expected)
        }
    )

    it('respects the decimals parameter', () => {
        expect(formatBytes(1024, 0)).toBe('1 KB')
        expect(formatBytes(1500, 2)).toBe('1.46 KB')
        expect(formatBytes(1500, 3)).toBe('1.465 KB')
    })

    it('clamps negative decimals to 0', () => {
        expect(formatBytes(1024, -2)).toBe('1 KB')
    })

    it('caps at PB for very large values', () => {
        // 1 PB = 1024^5
        const onePB = Math.pow(1024, 5)
        expect(formatBytes(onePB)).toBe('1.0 PB')
    })
})
