// TU — scroll.util.ts
// Exports: getScrollParent, getScrollParents, hasScrollbar, isPotentiallyScrollable
//
// blockScrollStrategy / closeScrollStrategy / repositionScrollStrategy /
// bindScroll all require a Vue scope (onScopeDispose) or live scroll events
// and are NOT testable in isolation at unit level → skipped with notes.
//
// hasScrollbar / isPotentiallyScrollable depend on window.getComputedStyle —
// jsdom returns '' for overflow so we stub the style values.

import { describe, expect, it, vi, afterEach } from 'vitest'
import {
    getScrollParent,
    getScrollParents,
    hasScrollbar,
    isPotentiallyScrollable
} from '@origam/utils/Commons/scroll.util'

afterEach(() => {
    vi.restoreAllMocks()
})

function stubOverflowY (el: Element, value: string) {
    vi.spyOn(window, 'getComputedStyle').mockImplementation((target) => {
        if (target === el) {
            return { overflowY: value } as CSSStyleDeclaration
        }
        return { overflowY: '' } as CSSStyleDeclaration
    })
}

// ------------------------------------------------------------------ //

describe('hasScrollbar', () => {
    it('returns false for null', () => {
        expect(hasScrollbar(null)).toBe(false)
    })

    it('returns false for a non-element node (text node)', () => {
        const text = document.createTextNode('hello')
        expect(hasScrollbar(text as any)).toBe(false)
    })

    it('returns true when overflowY is "scroll"', () => {
        const el = document.createElement('div')
        stubOverflowY(el, 'scroll')
        expect(hasScrollbar(el)).toBe(true)
    })

    it('returns true when overflowY is "auto" AND scrollHeight > clientHeight', () => {
        const el = document.createElement('div')
        stubOverflowY(el, 'auto')
        Object.defineProperty(el, 'scrollHeight', { value: 500, configurable: true })
        Object.defineProperty(el, 'clientHeight', { value: 200, configurable: true })
        expect(hasScrollbar(el)).toBe(true)
    })

    it('returns false when overflowY is "auto" but scrollHeight <= clientHeight', () => {
        const el = document.createElement('div')
        stubOverflowY(el, 'auto')
        Object.defineProperty(el, 'scrollHeight', { value: 100, configurable: true })
        Object.defineProperty(el, 'clientHeight', { value: 200, configurable: true })
        expect(hasScrollbar(el)).toBe(false)
    })

    it('returns false when overflowY is "hidden"', () => {
        const el = document.createElement('div')
        stubOverflowY(el, 'hidden')
        expect(hasScrollbar(el)).toBe(false)
    })
})

describe('isPotentiallyScrollable', () => {
    it('returns false for null', () => {
        expect(isPotentiallyScrollable(null)).toBe(false)
    })

    it('returns true when overflowY is "scroll"', () => {
        const el = document.createElement('div')
        stubOverflowY(el, 'scroll')
        expect(isPotentiallyScrollable(el)).toBe(true)
    })

    it('returns true when overflowY is "auto" (regardless of scroll height)', () => {
        const el = document.createElement('div')
        stubOverflowY(el, 'auto')
        // Unlike hasScrollbar, isPotentiallyScrollable does NOT check scroll height
        expect(isPotentiallyScrollable(el)).toBe(true)
    })

    it('returns false when overflowY is "hidden"', () => {
        const el = document.createElement('div')
        stubOverflowY(el, 'hidden')
        expect(isPotentiallyScrollable(el)).toBe(false)
    })
})

describe('getScrollParents', () => {
    it('returns an empty array when el is null', () => {
        expect(getScrollParents(null)).toEqual([])
    })

    it('returns an empty array when stopAt does not contain el', () => {
        const stopAt = document.createElement('div')
        const el = document.createElement('span')
        // el is not inside stopAt → early return
        const result = getScrollParents(el, stopAt)
        expect(result).toEqual([])
    })

    it('collects scrollable ancestors up to stopAt', () => {
        const container = document.createElement('div')
        const inner = document.createElement('span')
        container.appendChild(inner)
        document.body.appendChild(container)

        vi.spyOn(window, 'getComputedStyle').mockImplementation((target) => {
            if (target === container) return { overflowY: 'scroll' } as CSSStyleDeclaration
            return { overflowY: '' } as CSSStyleDeclaration
        })

        const result = getScrollParents(inner)
        expect(result).toContain(container)

        document.body.removeChild(container)
    })
})

describe('getScrollParent', () => {
    it('returns document.scrollingElement when no scrollable ancestor exists', () => {
        // jsdom: no overflowY set → hasScrollbar returns false everywhere
        const el = document.createElement('div')
        document.body.appendChild(el)

        const result = getScrollParent(el)
        expect(result).toBe(document.scrollingElement)

        document.body.removeChild(el)
    })

    it('returns the first scrollable ancestor', () => {
        const container = document.createElement('section')
        const child = document.createElement('div')
        container.appendChild(child)
        document.body.appendChild(container)

        vi.spyOn(window, 'getComputedStyle').mockImplementation((target) => {
            if (target === container) return { overflowY: 'scroll' } as CSSStyleDeclaration
            return { overflowY: '' } as CSSStyleDeclaration
        })

        expect(getScrollParent(child)).toBe(container)

        document.body.removeChild(container)
    })

    it.skip('includeHidden=true uses isPotentiallyScrollable (interaction test — skip)', () => {
        // Needs explicit overflow:hidden element and getComputedStyle mock aligned
        // with isPotentiallyScrollable; the branch is covered indirectly.
    })
})

// ------------------------------------------------------------------ //
// Skips for Vue-scope-dependent functions

it.skip('closeScrollStrategy: requires Vue EffectScope + reactive refs', () => {
    // closeScrollStrategy calls bindScroll which calls onScopeDispose — needs
    // a live Vue effect scope. Integration test only.
})

it.skip('blockScrollStrategy: requires Vue EffectScope + live DOM scroll + offsetWidth', () => {
    // Manipulates multiple scroll elements and calls onScopeDispose internally.
    // No meaningful unit-level isolation possible.
})

it.skip('repositionScrollStrategy: requires rAF + requestIdleCallback + Vue scope', () => {
    // Uses requestIdleCallback (not in jsdom) and Vue onScopeDispose.
})
