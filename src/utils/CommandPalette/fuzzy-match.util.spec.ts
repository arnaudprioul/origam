// Unit tests for the subsequence fuzzy matcher used by
// `OrigamCommandPalette`. The matcher must:
//
//   - match exact label hits,
//   - match in-order subsequences,
//   - reject when characters are missing,
//   - rank prefix / label hits higher than mid-keyword hits,
//   - search across keywords AND description, not just label,
//   - return everything in input order when the query is empty.

import { describe, expect, it } from 'vitest'

import { fuzzyMatch } from './fuzzy-match.util'

interface IFixture {
    id: string
    label: string
    description?: string
    keywords?: ReadonlyArray<string>
}

const adapter = (item: IFixture) => ({
    label: item.label,
    haystack: [
        item.label,
        ...(item.keywords ?? []),
        item.description ?? ''
    ].join(' ')
})

describe('fuzzyMatch', () => {
    const items: ReadonlyArray<IFixture> = [
        { id: 'set', label: 'Settings', keywords: ['preferences', 'config'] },
        { id: 'set-theme', label: 'Set theme', description: 'Toggle dark / light mode' },
        { id: 'reset', label: 'Reset password' },
        { id: 'profile', label: 'Profile', keywords: ['account', 'me'] },
        { id: 'logout', label: 'Log out', keywords: ['signout', 'exit'] }
    ]

    it('returns all items in input order when query is empty', () => {
        const result = fuzzyMatch(items, '', adapter)

        expect(result.map(r => r.item.id)).toEqual(['set', 'set-theme', 'reset', 'profile', 'logout'])
        expect(result.every(r => r.score === 0)).toBe(true)
    })

    it('matches by exact prefix and ranks it on top', () => {
        const result = fuzzyMatch(items, 'set', adapter)

        // `Settings` starts with "set" — should beat `Set theme` (also a
        // prefix but the label is longer) and `Reset password`
        // (subseq-only — no prefix bonus).
        expect(result[0].item.id).toBe('set')
        expect(result.map(r => r.item.id)).toContain('set-theme')
        expect(result.map(r => r.item.id)).toContain('reset')
    })

    it('matches via keywords', () => {
        // Only "Profile" has the `account` keyword.
        const result = fuzzyMatch(items, 'account', adapter)

        expect(result.map(r => r.item.id)).toEqual(['profile'])
        expect(result[0].score).toBeGreaterThan(0)
    })

    it('matches via description', () => {
        // Only "Set theme" mentions `dark` in its description.
        const result = fuzzyMatch(items, 'dark', adapter)

        expect(result.map(r => r.item.id)).toEqual(['set-theme'])
    })

    it('returns an empty array when no item matches', () => {
        const result = fuzzyMatch(items, 'zzzz', adapter)

        expect(result).toEqual([])
    })

    it('matches non-contiguous subsequences', () => {
        // "Reset password" contains 'r', 's', 't' in order.
        const result = fuzzyMatch(items, 'rst', adapter)

        expect(result.map(r => r.item.id)).toContain('reset')
    })

    it('preserves stable order for equal scores', () => {
        // Both "Settings" and "Set theme" match 's' — equal first-pos
        // bonus, equal consecutive run. Should fall back to input order.
        const result = fuzzyMatch(items, 's', adapter)
        const setIdx = result.findIndex(r => r.item.id === 'set')
        const setThemeIdx = result.findIndex(r => r.item.id === 'set-theme')

        expect(setIdx).toBeLessThan(setThemeIdx)
    })
})
