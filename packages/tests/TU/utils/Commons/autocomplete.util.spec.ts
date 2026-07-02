import { describe, expect, it } from 'vitest'

import { isComposingIgnoreKey } from '@origam/utils/Commons/autocomplete.util'

// Keys that are listed in COMPOSITION_IGNORE_KEYS
// (ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Enter, Escape, Tab, ' ')
const ignoredKeys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter', 'Escape', 'Tab', ' ']
const nonIgnoredKeys = ['a', 'A', 'Backspace', 'Delete', 'Home', 'End', 'PageUp', 'PageDown']

describe('isComposingIgnoreKey', () => {
    describe('returns true when composing AND key is in the ignore list', () => {
        it.each(ignoredKeys)('key=%p while composing → true', (key) => {
            const event = { isComposing: true, key } as KeyboardEvent
            expect(isComposingIgnoreKey(event)).toBe(true)
        })
    })

    describe('returns false when NOT composing, even for ignore-list keys', () => {
        it.each(ignoredKeys)('key=%p while NOT composing → false', (key) => {
            const event = { isComposing: false, key } as KeyboardEvent
            expect(isComposingIgnoreKey(event)).toBe(false)
        })
    })

    describe('returns false when composing but key is NOT in the ignore list', () => {
        it.each(nonIgnoredKeys)('key=%p while composing → false', (key) => {
            const event = { isComposing: true, key } as KeyboardEvent
            expect(isComposingIgnoreKey(event)).toBe(false)
        })
    })

    describe('returns false when neither composing nor in the ignore list', () => {
        it('key="a" while not composing → false', () => {
            const event = { isComposing: false, key: 'a' } as KeyboardEvent
            expect(isComposingIgnoreKey(event)).toBe(false)
        })
    })
})
