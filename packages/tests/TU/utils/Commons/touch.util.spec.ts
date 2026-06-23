// TU — touch.util.ts
// Exports: handleGesture, touchstart, touchend, touchmove, createHandlers
//
// All pure logic — handleGesture is tested without DOM (pure wrapper mutation).
// touchstart/touchend/touchmove need a TouchEvent with changedTouches.
// jsdom does not ship Touch/TouchEvent constructors → we polyfill them locally
// so we can exercise the real code paths.

import { describe, expect, it, vi, beforeAll } from 'vitest'
import {
    handleGesture,
    touchstart,
    touchend,
    touchmove,
    createHandlers
} from '@origam/utils/Commons/touch.util'
import type { ITouchHandlers } from '@origam/interfaces'

// ------------------------------------------------------------------ //
// Local Touch / TouchEvent polyfill (jsdom does not expose them)

beforeAll(() => {
    if (typeof globalThis.Touch === 'undefined') {
        class TouchPolyfill {
            identifier: number
            target: EventTarget
            clientX: number
            clientY: number
            screenX: number
            screenY: number
            pageX: number
            pageY: number
            radiusX: number
            radiusY: number
            rotationAngle: number
            force: number
            constructor (init: { identifier: number; target: EventTarget; clientX?: number; clientY?: number }) {
                this.identifier   = init.identifier
                this.target       = init.target
                this.clientX      = init.clientX ?? 0
                this.clientY      = init.clientY ?? 0
                this.screenX      = 0
                this.screenY      = 0
                this.pageX        = 0
                this.pageY        = 0
                this.radiusX      = 0
                this.radiusY      = 0
                this.rotationAngle = 0
                this.force        = 0
            }
        }
        ;(globalThis as any).Touch = TouchPolyfill
    }

    if (typeof globalThis.TouchEvent === 'undefined') {
        class TouchEventPolyfill extends Event {
            changedTouches: TouchList
            touches: TouchList
            targetTouches: TouchList
            constructor (type: string, init: any = {}) {
                super(type, init)
                const toList = (arr: any[] = []): TouchList => {
                    const list = Object.create(null) as any
                    arr.forEach((t, i) => { list[i] = t })
                    list.length = arr.length
                    list.item = (i: number) => list[i] ?? null
                    list[Symbol.iterator] = function* () { for (let i = 0; i < list.length; i++) yield list[i] }
                    return list as TouchList
                }
                this.changedTouches = toList(init.changedTouches)
                this.touches        = toList(init.touches)
                this.targetTouches  = toList(init.targetTouches)
            }
        }
        ;(globalThis as any).TouchEvent = TouchEventPolyfill
    }
})

// ------------------------------------------------------------------ //

// Helper: build a minimal TTouchWrapper
function makeWrapper (overrides: Record<string, any> = {}): any {
    return {
        touchstartX: 0,
        touchstartY: 0,
        touchendX: 0,
        touchendY: 0,
        touchmoveX: 0,
        touchmoveY: 0,
        offsetX: 0,
        offsetY: 0,
        ...overrides
    }
}

// Helper: build a minimal TouchEvent with a single changedTouch
function makeTouchEvent (clientX: number, clientY: number): TouchEvent {
    const touch = new (globalThis as any).Touch({ identifier: 1, target: document.body, clientX, clientY })
    return new (globalThis as any).TouchEvent('touchstart', { changedTouches: [touch], bubbles: true })
}

// ------------------------------------------------------------------ //

describe('handleGesture', () => {
    it('sets offsetX and offsetY from the touch coordinates', () => {
        const w = makeWrapper({ touchstartX: 10, touchstartY: 20, touchendX: 50, touchendY: 60 })
        handleGesture(w)
        expect(w.offsetX).toBe(40)
        expect(w.offsetY).toBe(40)
    })

    it('calls left when swiping left beyond minDistance', () => {
        const left = vi.fn()
        const w = makeWrapper({
            touchstartX: 100, touchendX: 60,  // dx = -40 (left)
            touchstartY: 50,  touchendY: 50,  // dy = 0
            left
        })
        handleGesture(w)
        expect(left).toHaveBeenCalledWith(w)
    })

    it('calls right when swiping right beyond minDistance', () => {
        const right = vi.fn()
        const w = makeWrapper({
            touchstartX: 50,  touchendX: 100, // dx = +50 (right)
            touchstartY: 50,  touchendY: 50,
            right
        })
        handleGesture(w)
        expect(right).toHaveBeenCalledWith(w)
    })

    it('calls up when swiping up beyond minDistance', () => {
        const up = vi.fn()
        const w = makeWrapper({
            touchstartX: 50, touchendX: 50,
            touchstartY: 100, touchendY: 60,  // dy = -40 (up)
            up
        })
        handleGesture(w)
        expect(up).toHaveBeenCalledWith(w)
    })

    it('calls down when swiping down beyond minDistance', () => {
        const down = vi.fn()
        const w = makeWrapper({
            touchstartX: 50, touchendX: 50,
            touchstartY: 50,  touchendY: 100, // dy = +50 (down)
            down
        })
        handleGesture(w)
        expect(down).toHaveBeenCalledWith(w)
    })

    it('does NOT call left when gesture is too short (< 16px)', () => {
        const left = vi.fn()
        const w = makeWrapper({
            touchstartX: 100, touchendX: 90, // dx = -10 < 16
            touchstartY: 50,  touchendY: 50,
            left
        })
        handleGesture(w)
        expect(left).not.toHaveBeenCalled()
    })

    it('does not call horizontal callbacks when vertical displacement dominates', () => {
        const left = vi.fn()
        const w = makeWrapper({
            touchstartX: 100, touchendX: 60,   // dx = -40
            touchstartY: 50,  touchendY: 200,  // dy = 150 > 0.5 * 40 → vertical wins
            left
        })
        handleGesture(w)
        expect(left).not.toHaveBeenCalled()
    })
})

describe('touchstart', () => {
    it('records clientX/Y on the wrapper', () => {
        const w = makeWrapper()
        const e = makeTouchEvent(123, 456)
        touchstart(e, w)
        expect(w.touchstartX).toBe(123)
        expect(w.touchstartY).toBe(456)
    })

    it('calls start handler when provided', () => {
        const start = vi.fn()
        const w = makeWrapper({ start })
        const e = makeTouchEvent(10, 20)
        touchstart(e, w)
        expect(start).toHaveBeenCalledOnce()
        const [arg] = start.mock.calls[0]
        expect(arg.originalEvent).toBe(e)
        expect(arg.touchstartX).toBe(10)
    })
})

describe('touchend', () => {
    it('records touchendX/Y on the wrapper', () => {
        const w = makeWrapper()
        const e = makeTouchEvent(300, 400)
        touchend(e, w)
        expect(w.touchendX).toBe(300)
        expect(w.touchendY).toBe(400)
    })

    it('calls end handler when provided', () => {
        const end = vi.fn()
        const w = makeWrapper({ end })
        const e = makeTouchEvent(50, 60)
        touchend(e, w)
        expect(end).toHaveBeenCalledOnce()
    })

    it('calls handleGesture (triggers direction callbacks) after recording end coords', () => {
        const right = vi.fn()
        const w = makeWrapper({
            touchstartX: 50, touchstartY: 50,
            right
        })
        // touchend at x=120 → dx=70 → right swipe
        const e = makeTouchEvent(120, 50)
        touchend(e, w)
        expect(right).toHaveBeenCalledOnce()
    })
})

describe('touchmove', () => {
    it('records touchmoveX/Y on the wrapper', () => {
        const w = makeWrapper()
        const e = makeTouchEvent(77, 88)
        touchmove(e, w)
        expect(w.touchmoveX).toBe(77)
        expect(w.touchmoveY).toBe(88)
    })

    it('calls move handler when provided', () => {
        const move = vi.fn()
        const w = makeWrapper({ move })
        const e = makeTouchEvent(100, 200)
        touchmove(e, w)
        expect(move).toHaveBeenCalledOnce()
        const [arg] = move.mock.calls[0]
        expect(arg.originalEvent).toBe(e)
    })
})

describe('createHandlers', () => {
    it('returns touchstart, touchend, touchmove handler functions', () => {
        const handlers = createHandlers()
        expect(typeof handlers.touchstart).toBe('function')
        expect(typeof handlers.touchend).toBe('function')
        expect(typeof handlers.touchmove).toBe('function')
    })

    it('dispatches direction callbacks from provided value', () => {
        const right = vi.fn()
        const handlers = createHandlers({ right } as ITouchHandlers)

        const startE = makeTouchEvent(50, 50)
        handlers.touchstart(startE)

        const endE = makeTouchEvent(120, 50)
        handlers.touchend(endE)

        expect(right).toHaveBeenCalledOnce()
    })

    it('does not throw when called with no handlers', () => {
        const handlers = createHandlers()
        const e = makeTouchEvent(0, 0)
        expect(() => {
            handlers.touchstart(e)
            handlers.touchmove(e)
            handlers.touchend(e)
        }).not.toThrow()
    })
})
