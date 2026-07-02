// Unit tests for `useEventListener`.
// Covers: window-default target, explicit element target, single/multiple
// events, single/multiple listeners, cleanup (returned stop fn), reactive
// element ref (element swap), reactive options ref.

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useEventListener } from '@origam/composables/Commons/eventListener.composable'

// ─── helpers ────────────────────────────────────────────────────────────────

/** Mount a host component so Vue setup/scope lifecycle is active. */
function mountHost (setup: () => void) {
    const Host = defineComponent({
        setup () {
            setup()
            return () => h('div')
        }
    })
    return mount(Host)
}

// ─── suite ──────────────────────────────────────────────────────────────────

describe('useEventListener — window shorthand (event first)', () => {
    let spy: ReturnType<typeof vi.fn>

    beforeEach(() => {
        spy = vi.fn()
    })

    it('registers on window when called with (event, listener)', () => {
        const addSpy = vi.spyOn(window, 'addEventListener')
        mountHost(() => { useEventListener('click', spy) })
        expect(addSpy).toHaveBeenCalledWith('click', spy, undefined)
    })

    it('calls the listener when the event fires on window', () => {
        mountHost(() => { useEventListener('click', spy) })
        window.dispatchEvent(new Event('click'))
        expect(spy).toHaveBeenCalledTimes(1)
    })

    it('stop() removes the listener', () => {
        let stop!: () => void
        mountHost(() => { stop = useEventListener('click', spy) as () => void })
        stop()
        window.dispatchEvent(new Event('click'))
        expect(spy).not.toHaveBeenCalled()
    })
})

describe('useEventListener — explicit element target', () => {
    it('adds listener on the provided element', () => {
        const el = document.createElement('div')
        const listener = vi.fn()
        const addSpy = vi.spyOn(el, 'addEventListener')
        mountHost(() => { useEventListener(el, 'focus', listener) })
        expect(addSpy).toHaveBeenCalledWith('focus', listener, undefined)
    })

    it('forwards the event to the listener', () => {
        const el = document.createElement('div')
        const listener = vi.fn()
        mountHost(() => { useEventListener(el, 'focus', listener) })
        el.dispatchEvent(new Event('focus'))
        expect(listener).toHaveBeenCalledTimes(1)
    })

    it('removeEventListener is called after stop()', () => {
        const el = document.createElement('div')
        const listener = vi.fn()
        const removeSpy = vi.spyOn(el, 'removeEventListener')
        let stop!: () => void
        mountHost(() => { stop = useEventListener(el, 'focus', listener) as () => void })
        stop()
        expect(removeSpy).toHaveBeenCalledWith('focus', listener, undefined)
    })
})

describe('useEventListener — multiple events', () => {
    it('registers for each event in the array', () => {
        const el = document.createElement('div')
        const listener = vi.fn()
        const addSpy = vi.spyOn(el, 'addEventListener')
        mountHost(() => { useEventListener(el, ['mouseenter', 'mouseleave'], listener) })
        expect(addSpy).toHaveBeenCalledWith('mouseenter', listener, undefined)
        expect(addSpy).toHaveBeenCalledWith('mouseleave', listener, undefined)
    })
})

describe('useEventListener — multiple listeners', () => {
    it('calls every listener when the event fires', () => {
        const el = document.createElement('button')
        const l1 = vi.fn()
        const l2 = vi.fn()
        mountHost(() => { useEventListener(el, 'click', [l1, l2]) })
        el.dispatchEvent(new Event('click'))
        expect(l1).toHaveBeenCalledTimes(1)
        expect(l2).toHaveBeenCalledTimes(1)
    })
})

describe('useEventListener — reactive ref target', () => {
    it('attaches listener when ref is populated after setup', async () => {
        const elRef = ref<HTMLElement | null>(null)
        const listener = vi.fn()
        mountHost(() => { useEventListener(elRef as any, 'click', listener) })

        const el = document.createElement('div')
        elRef.value = el
        await nextTick()
        await nextTick() // flush: 'post' watcher may need two ticks in test env

        el.dispatchEvent(new Event('click'))
        expect(listener).toHaveBeenCalledTimes(1)
    })

    it('removes old listener and attaches to new element on ref swap', async () => {
        const el1 = document.createElement('div')
        const el2 = document.createElement('div')
        const elRef = ref<HTMLElement>(el1)
        const listener = vi.fn()
        mountHost(() => { useEventListener(elRef as any, 'click', listener) })

        await nextTick()

        const remove1 = vi.spyOn(el1, 'removeEventListener')
        const add2 = vi.spyOn(el2, 'addEventListener')

        elRef.value = el2
        await nextTick()
        await nextTick()

        expect(remove1).toHaveBeenCalledWith('click', listener, undefined)
        expect(add2).toHaveBeenCalledWith('click', listener, undefined)
    })
})

describe('useEventListener — returns noop when no target', () => {
    it('returns noop when target is undefined', () => {
        let result!: unknown
        mountHost(() => { result = useEventListener(undefined as any, 'click', vi.fn()) })
        // noop should be callable without throwing
        expect(() => (result as () => void)()).not.toThrow()
    })
})
