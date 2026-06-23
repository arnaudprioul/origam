// Unit tests for `useDragResizer`.
// Covers: mousedown starts resizing, mousemove updates value (clamped),
// mouseup ends resizing, onTouchStart/onTouchMove/onTouchEnd paths,
// value clamped to [min, max], horizontal vs vertical axis.

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AXIS } from '@origam/enums'
import { useDragResizer } from '@origam/composables/Commons/dragResizer.composable'

// ─── helpers ────────────────────────────────────────────────────────────────

function makeMouseEvent (type: string, clientX: number, clientY = 0): MouseEvent {
    return new MouseEvent(type, { clientX, clientY, bubbles: true })
}

function makeTouchEvent (type: string, clientX: number, clientY = 0): TouchEvent {
    const touch = { clientX, clientY, identifier: 0 } as Touch
    const evt = new Event(type, { bubbles: true }) as unknown as TouchEvent
    Object.defineProperty(evt, 'changedTouches', { value: [touch] })
    return evt
}

/**
 * Mount a host that calls useDragResizer with the given params.
 * Returns a reference to the drag handle element and the value ref.
 */
function mountDragResizer ({
    initialValue = 200,
    min = 50,
    max = 500,
    axis = AXIS.X as string
} = {}) {
    const value = ref(initialValue)
    let elRef!: HTMLElement

    const Host = defineComponent({
        setup () {
            const el = document.createElement('div')
            elRef = el
            useDragResizer(el, value, min, max, axis as any)
            return () => h('div', { ref: (_el: Element) => { /* noop */ } })
        }
    })
    mount(Host)
    return { value, el: () => elRef }
}

// ─── suite ──────────────────────────────────────────────────────────────────

describe('useDragResizer — mousedown/mousemove/mouseup (horizontal)', () => {
    afterEach(() => vi.restoreAllMocks())

    it('dispatching mousedown on the element does not throw', () => {
        const { el } = mountDragResizer({ initialValue: 200 })
        expect(() => {
            el().dispatchEvent(makeMouseEvent('mousedown', 200))
        }).not.toThrow()
    })

    it('mousemove after mousedown updates value by delta', () => {
        const { value, el } = mountDragResizer({ initialValue: 200, min: 50, max: 500 })

        el().dispatchEvent(makeMouseEvent('mousedown', 200))
        // Move 50px to the right → new value = 200 + 50 = 250
        window.dispatchEvent(makeMouseEvent('mousemove', 250))
        expect(value.value).toBe(250)
    })

    it('mousemove clamps value to min', () => {
        const { value, el } = mountDragResizer({ initialValue: 200, min: 100, max: 500 })

        el().dispatchEvent(makeMouseEvent('mousedown', 200))
        // Move far left → delta = 10 - 200 = -190 → 200 - 190 = 10, clamped to 100
        window.dispatchEvent(makeMouseEvent('mousemove', 10))
        expect(value.value).toBe(100)
    })

    it('mousemove clamps value to max', () => {
        const { value, el } = mountDragResizer({ initialValue: 200, min: 50, max: 400 })

        el().dispatchEvent(makeMouseEvent('mousedown', 200))
        // Move far right → clamped to 400
        window.dispatchEvent(makeMouseEvent('mousemove', 900))
        expect(value.value).toBe(400)
    })

    it('mouseup stops value updates', () => {
        const { value, el } = mountDragResizer({ initialValue: 200, min: 50, max: 500 })

        el().dispatchEvent(makeMouseEvent('mousedown', 200))
        window.dispatchEvent(makeMouseEvent('mousemove', 250))
        expect(value.value).toBe(250)

        window.dispatchEvent(new MouseEvent('mouseup'))
        window.dispatchEvent(makeMouseEvent('mousemove', 350))
        // After mouseup, further moves should NOT change value
        expect(value.value).toBe(250)
    })
})

describe('useDragResizer — vertical axis (AXIS.Y)', () => {
    afterEach(() => vi.restoreAllMocks())

    it('mousemove uses clientY for vertical axis', () => {
        const { value, el } = mountDragResizer({ initialValue: 200, min: 50, max: 500, axis: AXIS.Y })

        el().dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 200 }))
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 300 }))
        // delta = 300 - 200 = 100, value = 200 + 100 = 300
        expect(value.value).toBe(300)
    })
})

describe('useDragResizer — touch events', () => {
    afterEach(() => vi.restoreAllMocks())

    it('touchstart + touchmove updates value', () => {
        const { value, el } = mountDragResizer({ initialValue: 200, min: 50, max: 500 })

        el().dispatchEvent(makeTouchEvent('touchstart', 200))
        window.dispatchEvent(makeTouchEvent('touchmove', 260))
        expect(value.value).toBe(260)
    })

    it('touchend stops further touchmove updates', () => {
        // Fixed: addWindowListener('touchend touchcancel', …) was a single call
        // with a space-separated string — addEventListener does NOT support
        // multi-event strings, so the listener was silently dropped and
        // touchmove kept firing after touchend. The fix uses two separate calls:
        //   addWindowListener('touchend', onTouchEnd, …)
        //   addWindowListener('touchcancel', onTouchEnd, …)
        const { value, el } = mountDragResizer({ initialValue: 200, min: 50, max: 500 })

        el().dispatchEvent(makeTouchEvent('touchstart', 200))
        window.dispatchEvent(makeTouchEvent('touchmove', 260))
        expect(value.value).toBe(260)

        // Fire touchend — must stop the drag session
        window.dispatchEvent(makeTouchEvent('touchend', 260))

        // Further touchmove events must NOT change the value
        window.dispatchEvent(makeTouchEvent('touchmove', 350))
        expect(value.value).toBe(260)
    })

    it('touchcancel also stops further touchmove updates', () => {
        // Regression test for the second half of the fix:
        // addWindowListener('touchcancel', onTouchEnd, …) must also be registered.
        const { value, el } = mountDragResizer({ initialValue: 200, min: 50, max: 500 })

        el().dispatchEvent(makeTouchEvent('touchstart', 200))
        window.dispatchEvent(makeTouchEvent('touchmove', 270))
        expect(value.value).toBe(270)

        window.dispatchEvent(makeTouchEvent('touchcancel', 270))

        window.dispatchEvent(makeTouchEvent('touchmove', 400))
        expect(value.value).toBe(270)
    })

    it('touchmove clamps to max', () => {
        const { value, el } = mountDragResizer({ initialValue: 200, min: 50, max: 350 })

        el().dispatchEvent(makeTouchEvent('touchstart', 200))
        window.dispatchEvent(makeTouchEvent('touchmove', 1000))
        expect(value.value).toBe(350)
    })
})

describe('useDragResizer — no element provided', () => {
    it('does not throw when el is undefined', () => {
        const value = ref(100)
        const Host = defineComponent({
            setup () {
                useDragResizer(undefined, value, 0, 500, AXIS.X)
                return () => h('div')
            }
        })
        expect(() => mount(Host)).not.toThrow()
    })
})
