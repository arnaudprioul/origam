// TU — hover.util.ts
// Exports: isHoverEnabled, hoverStop, hoverHide, hoverRemoveListeners
//
// hoverShow / updateHover call HOVER.show/hide which manipulate CSS classes on
// the element. We spy on HOVER to isolate the tested functions from the service.
// hoverHide is tested with the HOVER.hide spy to verify the callback is called.

import { describe, expect, it, vi, beforeEach } from 'vitest'
import {
    isHoverEnabled,
    hoverStop,
    hoverHide,
    hoverRemoveListeners
} from '@origam/utils/Commons/hover.util'
import { HOVER, ORIGAM_HOVER_STOP_KEY } from '@origam/consts/Commons/hover.const'
import type { IHoverHtmlElement } from '@origam/interfaces'

function makeHoverEl (options: Partial<NonNullable<IHoverHtmlElement['_hover']>> = {}): IHoverHtmlElement {
    const el = document.createElement('div') as IHoverHtmlElement
    el._hover = { enabled: true, ...options }
    return el
}

beforeEach(() => {
    vi.spyOn(HOVER, 'hide').mockImplementation(() => {})
    vi.spyOn(HOVER, 'show').mockImplementation(() => {})
})

// ------------------------------------------------------------------ //

describe('isHoverEnabled', () => {
    it.each([
        [undefined, true],
        [true,      true],
        [{},        true],
        [false,     false],
        [null,      false],
        [0,         false]
    ])('isHoverEnabled(%p) === %p', (value, expected) => {
        expect(isHoverEnabled(value)).toBe(expected)
    })
})

describe('hoverStop', () => {
    it('sets the ORIGAM_HOVER_STOP_KEY flag on the event', () => {
        const e = new MouseEvent('mouseenter') as any
        expect(e[ORIGAM_HOVER_STOP_KEY]).toBeUndefined()
        hoverStop(e)
        expect(e[ORIGAM_HOVER_STOP_KEY]).toBe(true)
    })
})

describe('hoverHide', () => {
    it('does nothing when currentTarget has no _hover', () => {
        const el = document.createElement('div') as IHoverHtmlElement
        const e = { currentTarget: el } as any
        expect(() => hoverHide(e)).not.toThrow()
    })

    it('calls HOVER.hide with the element', () => {
        const el = makeHoverEl({ class: 'btn--hover' })
        const e = { currentTarget: el } as any

        hoverHide(e)
        expect(HOVER.hide).toHaveBeenCalledWith(el, { class: 'btn--hover' })
    })

    it('calls mouseleave callback when provided', () => {
        const mouseleave = vi.fn()
        const el = makeHoverEl({ class: 'btn--hover', mouseleave })
        const e = { currentTarget: el } as any

        hoverHide(e)
        expect(mouseleave).toHaveBeenCalledWith(el, e)
    })

    it('uses empty string class when _hover has no class set', () => {
        const el = makeHoverEl()  // no class in options
        const e = { currentTarget: el } as any

        hoverHide(e)
        expect(HOVER.hide).toHaveBeenCalledWith(el, { class: '' })
    })
})

describe('hoverRemoveListeners', () => {
    it('does not throw on a plain element', () => {
        const el = makeHoverEl()
        expect(() => hoverRemoveListeners(el)).not.toThrow()
    })

    it('removes all expected event listeners', () => {
        const el = makeHoverEl()
        const spy = vi.spyOn(el, 'removeEventListener')

        hoverRemoveListeners(el)

        const removedEvents = spy.mock.calls.map(c => c[0])
        expect(removedEvents).toContain('mouseenter')
        expect(removedEvents).toContain('mouseleave')
        expect(removedEvents).toContain('touchstart')
        expect(removedEvents).toContain('touchend')
        expect(removedEvents).toContain('touchcancel')
    })
})
