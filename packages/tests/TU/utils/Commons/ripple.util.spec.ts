// TU — ripple.util.ts
// Exports tested here: isRippleEnabled, isTouchEvent, isKeyboardEvent,
//   calculate, rippleStop, rippleHide, rippleCancelShow, rippleRemoveListeners,
//   rippleTransform
//
// Notes on jsdom limitations:
// - Touch / TouchEvent constructors are not available in jsdom (no polyfill in
//   vitest.setup.ts) → isTouchEvent with a real TouchEvent is skipped.
// - MouseEvent.clientX/clientY are read-only in jsdom → we pass clientX/clientY
//   through the MouseEventInit constructor dict instead of Object.assign.

import { describe, expect, it, vi } from 'vitest'
import {
    isRippleEnabled,
    isTouchEvent,
    isKeyboardEvent,
    calculate,
    rippleStop,
    rippleHide,
    rippleCancelShow,
    rippleRemoveListeners,
    rippleTransform
} from '@origam/utils/Commons/ripple.util'
import { ORIGAM_RIPPLE_STOP_KEY } from '@origam/consts/Commons/ripple.const'
import type { IRippleHtmlElement } from '@origam/interfaces'

// Helper: MouseEvent with clientX/clientY set via constructor init (read-only in jsdom)
function makeMouseEvent (clientX = 0, clientY = 0): MouseEvent {
    return new MouseEvent('mousedown', { bubbles: true, clientX, clientY })
}

function makeRippleEl (options: Partial<NonNullable<IRippleHtmlElement['_ripple']>> = {}): IRippleHtmlElement {
    const el = document.createElement('div') as IRippleHtmlElement
    el._ripple = { enabled: true, ...options }
    return el
}

// ------------------------------------------------------------------ //

describe('isRippleEnabled', () => {
    it.each([
        [undefined, true],
        [true,      true],
        [{},        true],
        [false,     false],
        [null,      false],
        [0,         false]
    ])('isRippleEnabled(%p) === %p', (value, expected) => {
        expect(isRippleEnabled(value)).toBe(expected)
    })
})

describe('isTouchEvent', () => {
    it.skip('returns true for a real TouchEvent — Touch not available in jsdom', () => {
        // Touch constructor is not polyfilled in jsdom / vitest.setup.ts.
        // isTouchEvent checks e.constructor.name === "TouchEvent" — verifiable
        // only in a real browser or with a full Touch polyfill.
    })

    it('returns false for a MouseEvent', () => {
        expect(isTouchEvent(new MouseEvent('mousedown') as any)).toBe(false)
    })

    it('returns false for a KeyboardEvent', () => {
        expect(isTouchEvent(new KeyboardEvent('keydown') as any)).toBe(false)
    })
})

describe('isKeyboardEvent', () => {
    it('returns true for a KeyboardEvent', () => {
        expect(isKeyboardEvent(new KeyboardEvent('keydown') as any)).toBe(true)
    })

    it('returns false for a MouseEvent', () => {
        expect(isKeyboardEvent(new MouseEvent('mousedown') as any)).toBe(false)
    })
})

describe('calculate', () => {
    it('returns expected shape keys', () => {
        const el = makeRippleEl()
        Object.defineProperty(el, 'clientWidth',  { value: 100, configurable: true })
        Object.defineProperty(el, 'clientHeight', { value: 50,  configurable: true })
        el.getBoundingClientRect = () => ({ left: 0, top: 0, right: 100, bottom: 50, width: 100, height: 50, x: 0, y: 0, toJSON: () => ({}) })

        const e = makeMouseEvent(50, 25)
        const result = calculate(e as any, el)

        expect(result).toHaveProperty('radius')
        expect(result).toHaveProperty('scale')
        expect(result).toHaveProperty('x')
        expect(result).toHaveProperty('y')
        expect(result).toHaveProperty('centerX')
        expect(result).toHaveProperty('centerY')
    })

    it('returns centered coordinates when value.center is true', () => {
        const el = makeRippleEl()
        Object.defineProperty(el, 'clientWidth',  { value: 100, configurable: true })
        Object.defineProperty(el, 'clientHeight', { value: 100, configurable: true })
        el.getBoundingClientRect = () => ({ left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => ({}) })

        const e = makeMouseEvent(10, 10)
        const result = calculate(e as any, el, { center: true })

        expect(result.x).toBe(result.centerX)
        expect(result.y).toBe(result.centerY)
    })

    it('uses a smaller scale for circle mode', () => {
        const el = makeRippleEl({ circle: true })
        Object.defineProperty(el, 'clientWidth',  { value: 100, configurable: true })
        Object.defineProperty(el, 'clientHeight', { value: 100, configurable: true })
        el.getBoundingClientRect = () => ({ left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => ({}) })

        const circleResult = calculate(makeMouseEvent(50, 50) as any, el)

        const el2 = makeRippleEl()
        Object.defineProperty(el2, 'clientWidth',  { value: 100, configurable: true })
        Object.defineProperty(el2, 'clientHeight', { value: 100, configurable: true })
        el2.getBoundingClientRect = () => ({ left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => ({}) })
        const normalResult = calculate(makeMouseEvent(50, 50) as any, el2)

        expect(circleResult.scale).toBeLessThan(normalResult.scale)
    })

    it('uses center coords for a keyboard event (localX=0, localY=0)', () => {
        const el = makeRippleEl()
        Object.defineProperty(el, 'clientWidth',  { value: 100, configurable: true })
        Object.defineProperty(el, 'clientHeight', { value: 100, configurable: true })
        el.getBoundingClientRect = () => ({ left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => ({}) })

        const e = new KeyboardEvent('keydown') as any
        const result = calculate(e, el)

        // For a keyboard event: localX=0, localY=0
        // radius = sqrt(100² + 100²) / 2 ≈ 70.711
        // x = `${localX - radius}px` = `${-70.711}px`   (no center override when value={})
        const radius = result.radius
        expect(result.x).toBe(`${0 - radius}px`)
        expect(result.y).toBe(`${0 - radius}px`)
    })
})

describe('rippleStop', () => {
    it('sets the ORIGAM_RIPPLE_STOP_KEY flag on the event', () => {
        const e = new MouseEvent('mousedown') as any
        expect(e[ORIGAM_RIPPLE_STOP_KEY]).toBeUndefined()
        rippleStop(e)
        expect(e[ORIGAM_RIPPLE_STOP_KEY]).toBe(true)
    })
})

describe('rippleCancelShow', () => {
    it('clears showTimerCommit when present', () => {
        const el = makeRippleEl()
        const clearSpy = vi.spyOn(window, 'clearTimeout')
        el._ripple!.showTimerCommit = vi.fn()
        el._ripple!.showTimer = 99

        const e = { currentTarget: el } as any
        rippleCancelShow(e)

        expect(el._ripple!.showTimerCommit).toBeNull()
        expect(clearSpy).toHaveBeenCalledWith(99)
        clearSpy.mockRestore()
    })

    it('does nothing when el has no _ripple', () => {
        const el = document.createElement('div') as IRippleHtmlElement
        const e = { currentTarget: el } as any
        expect(() => rippleCancelShow(e)).not.toThrow()
    })
})

describe('rippleHide', () => {
    it('does nothing when currentTarget has no _ripple', () => {
        const el = document.createElement('div') as IRippleHtmlElement
        const e = { currentTarget: el, type: 'mouseup' } as unknown as Event
        expect(() => rippleHide(e)).not.toThrow()
    })

    it('sets touched=false on the element after a timeout for non-touchend events', () => {
        vi.useFakeTimers()
        const el = makeRippleEl({ touched: true })
        const e = { currentTarget: el, type: 'mouseup' } as unknown as Event

        rippleHide(e)
        vi.runAllTimers()

        expect(el._ripple!.touched).toBe(false)
        vi.useRealTimers()
    })
})

describe('rippleRemoveListeners', () => {
    it('does not throw on a plain element', () => {
        const el = makeRippleEl()
        expect(() => rippleRemoveListeners(el)).not.toThrow()
    })

    it('removes all expected event listeners', () => {
        const el = makeRippleEl()
        const spy = vi.spyOn(el, 'removeEventListener')

        rippleRemoveListeners(el)

        const removedEvents = spy.mock.calls.map(c => c[0])
        expect(removedEvents).toContain('mousedown')
        expect(removedEvents).toContain('touchstart')
        expect(removedEvents).toContain('touchend')
        expect(removedEvents).toContain('touchmove')
        expect(removedEvents).toContain('touchcancel')
        expect(removedEvents).toContain('mouseup')
        expect(removedEvents).toContain('mouseleave')
        expect(removedEvents).toContain('keydown')
        expect(removedEvents).toContain('keyup')
        expect(removedEvents).toContain('dragstart')
        expect(removedEvents).toContain('blur')
    })
})

describe('rippleTransform', () => {
    it('sets transform on the element', () => {
        const el = makeRippleEl()
        rippleTransform(el, 'translate(10px, 20px) scale3d(0.3, 0.3, 0.3)')
        expect(el.style.transform).toBe('translate(10px, 20px) scale3d(0.3, 0.3, 0.3)')
    })
})
