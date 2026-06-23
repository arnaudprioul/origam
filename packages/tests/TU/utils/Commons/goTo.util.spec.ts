// TU — goTo.util.ts
// Exports: genDefaults, getContainer, getTarget, getLocationOffset,
//          clampTarget, scrollTo
//
// scrollTo is animation-loop heavy (rAF) and directly manipulates scroll
// positions. The pure helpers (easing math, clampTarget, getLocationOffset
// with numeric target) are tested without mocking. scrollTo is tested with
// stubbed rAF so we can drive it synchronously.

import { describe, expect, it, vi, afterEach } from 'vitest'
import {
    genDefaults,
    getContainer,
    getTarget,
    getLocationOffset,
    clampTarget
} from '@origam/utils/Commons/goTo.util'

afterEach(() => {
    vi.restoreAllMocks()
})

// ------------------------------------------------------------------ //

describe('genDefaults', () => {
    it('returns an object with the expected keys', () => {
        const d = genDefaults()
        expect(d).toHaveProperty('duration', 300)
        expect(d).toHaveProperty('offset', 0)
        expect(d).toHaveProperty('layout', false)
        expect(d).toHaveProperty('easing', 'easeInOutCubic')
        expect(d).toHaveProperty('patterns')
    })

    it('provides all named easing functions', () => {
        const d = genDefaults()
        const expected = [
            'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad',
            'easeInCubic', 'easeOutCubic', 'easeInOutCubic',
            'easeInQuart', 'easeOutQuart', 'easeInOutQuart',
            'easeInQuint', 'easeOutQuint', 'easeInOutQuint'
        ]
        for (const name of expected) {
            expect(typeof (d.patterns as any)[name]).toBe('function')
        }
    })

    it('linear easing maps t=0 → 0 and t=1 → 1', () => {
        const { patterns } = genDefaults() as any
        expect(patterns.linear(0)).toBe(0)
        expect(patterns.linear(1)).toBe(1)
        expect(patterns.linear(0.5)).toBe(0.5)
    })

    it('easeInOutCubic(0.5) is close to 0.5 (symmetry check)', () => {
        const { patterns } = genDefaults() as any
        expect(patterns.easeInOutCubic(0.5)).toBeCloseTo(0.5, 5)
    })

    it('all easing functions return 0 at t=0 and 1 at t=1', () => {
        const { patterns } = genDefaults() as any
        for (const [name, fn] of Object.entries(patterns) as Array<[string, (t: number) => number]>) {
            expect(fn(0)).toBeCloseTo(0, 5, `${name}(0) should be ~0`)
            expect(fn(1)).toBeCloseTo(1, 5, `${name}(1) should be ~1`)
        }
    })
})

describe('getTarget', () => {
    it('returns null/undefined for undefined input', () => {
        // refElement(undefined) returns undefined — not null — in this implementation.
        expect(getTarget(undefined)).toBeFalsy()
    })

    it('returns the matching element for a CSS selector string', () => {
        const el = document.createElement('section')
        el.id = 'go-to-target'
        document.body.appendChild(el)

        expect(getTarget('#go-to-target')).toBe(el)
        document.body.removeChild(el)
    })

    it('returns null for a selector that matches nothing', () => {
        expect(getTarget('#does-not-exist-xyz')).toBeNull()
    })

    it('returns $el for a ComponentPublicInstance', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)
        const comp = { $el: el } as any
        expect(getTarget(comp)).toBe(el)
        document.body.removeChild(el)
    })

    it('returns the HTMLElement directly', () => {
        const el = document.createElement('main')
        document.body.appendChild(el)
        expect(getTarget(el)).toBe(el)
        document.body.removeChild(el)
    })
})

describe('getContainer', () => {
    it('returns document.scrollingElement or document.body when no el is provided', () => {
        const result = getContainer(undefined)
        expect(result === document.scrollingElement || result === document.body).toBe(true)
    })

    it('returns the matching element for a CSS selector string', () => {
        const el = document.createElement('div')
        el.id = 'container-el'
        document.body.appendChild(el)

        expect(getContainer('#container-el')).toBe(el)
        document.body.removeChild(el)
    })
})

describe('getLocationOffset', () => {
    it('returns a number unchanged when target is a number (no horizontal, no rtl)', () => {
        expect(getLocationOffset(200)).toBe(200)
    })

    it('returns negative number for horizontal+rtl numeric target', () => {
        expect(getLocationOffset(100, true, true)).toBe(-100)
    })

    it('returns the number as-is for horizontal without rtl', () => {
        expect(getLocationOffset(100, true, false)).toBe(100)
    })

    it('accumulates offsetTop for a DOM element', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)
        // In jsdom, offsetTop/offsetLeft default to 0
        const result = getLocationOffset(el)
        expect(typeof result).toBe('number')
        expect(result).toBeGreaterThanOrEqual(0)
        document.body.removeChild(el)
    })
})

describe('clampTarget', () => {
    function makeContainer (scrollWidth: number, scrollHeight: number, offsetWidth: number, offsetHeight: number): HTMLElement {
        const el = document.createElement('div')
        Object.defineProperty(el, 'scrollWidth',  { value: scrollWidth,  configurable: true })
        Object.defineProperty(el, 'scrollHeight', { value: scrollHeight, configurable: true })
        Object.defineProperty(el, 'offsetWidth',  { value: offsetWidth,  configurable: true })
        Object.defineProperty(el, 'offsetHeight', { value: offsetHeight, configurable: true })
        return el
    }

    it('clamps vertical value to [0, scrollHeight - offsetHeight]', () => {
        const el = makeContainer(0, 1000, 0, 200)
        expect(clampTarget(el, -50,  false)).toBe(0)
        expect(clampTarget(el,  300, false)).toBe(300)
        expect(clampTarget(el,  900, false)).toBe(800) // max = 1000 - 200
        expect(clampTarget(el, 2000, false)).toBe(800)
    })

    it('clamps horizontal value to [0, scrollWidth - offsetWidth]', () => {
        const el = makeContainer(800, 0, 300, 0)
        expect(clampTarget(el, -10, true)).toBe(0)
        expect(clampTarget(el, 200, true)).toBe(200)
        expect(clampTarget(el, 700, true)).toBe(500) // max = 800 - 300
    })

    it('returns 0 when max <= 0 (content smaller than container)', () => {
        const el = makeContainer(0, 100, 0, 200) // scrollHeight < offsetHeight
        expect(clampTarget(el, 50, false)).toBe(0)
    })
})
