// Unit tests for `useResizeObserver`.
// Covers: return shape, observer.observe when ref assigned, observer.unobserve
// on ref swap, contentRect updated from callback (content box + border box),
// observer.disconnect on unmount, graceful handling when ResizeObserver
// is mocked (the setup file installs the global stub).

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useResizeObserver } from '@origam/composables/Commons/resizeObserver.composable'

// ─── custom ResizeObserver stub ──────────────────────────────────────────────
// The vitest.setup.ts installs a base global stub. We override it per test
// with a richer one that lets us trigger the callback manually.

type ROCallback = (entries: ResizeObserverEntry[]) => void

let lastROCallback: ROCallback
let roObserveSpy: ReturnType<typeof vi.fn>
let roUnobserveSpy: ReturnType<typeof vi.fn>
let roDisconnectSpy: ReturnType<typeof vi.fn>

function installROStub () {
    roObserveSpy = vi.fn()
    roUnobserveSpy = vi.fn()
    roDisconnectSpy = vi.fn()

    class StubRO {
        constructor (cb: ROCallback) {
            lastROCallback = cb
        }
        observe = roObserveSpy
        unobserve = roUnobserveSpy
        disconnect = roDisconnectSpy
    }

    vi.stubGlobal('ResizeObserver', StubRO)
}

// ─── helpers ────────────────────────────────────────────────────────────────

function makeDomRect (width: number, height: number): DOMRectReadOnly {
    return {
        width,
        height,
        top: 0,
        left: 0,
        bottom: height,
        right: width,
        x: 0,
        y: 0,
        toJSON: () => ({})
    } as DOMRectReadOnly
}

function makeEntry (target: HTMLElement, contentRect: DOMRectReadOnly): ResizeObserverEntry {
    return {
        target,
        contentRect,
        borderBoxSize: [],
        contentBoxSize: [],
        devicePixelContentBoxSize: []
    } as unknown as ResizeObserverEntry
}

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

describe('useResizeObserver — return shape', () => {
    beforeEach(installROStub)
    afterEach(() => vi.unstubAllGlobals())

    it('returns resizeRef and contentRect', () => {
        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver() })
        expect(api.resizeRef).toBeDefined()
        expect(api.contentRect).toBeDefined()
        expect(api.contentRect.value).toBeUndefined()
    })
})

describe('useResizeObserver — observe / unobserve', () => {
    beforeEach(installROStub)
    afterEach(() => vi.unstubAllGlobals())

    it('calls observe when resizeRef is set', async () => {
        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver() })
        await nextTick()

        const el = document.createElement('div')
        api.resizeRef.value = el
        await nextTick()
        await nextTick()

        expect(roObserveSpy).toHaveBeenCalledWith(el)
    })

    it('calls unobserve on old element and observe on new element when ref swaps', async () => {
        const el1 = document.createElement('div')
        const el2 = document.createElement('div')
        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver() })
        await nextTick()

        api.resizeRef.value = el1
        await nextTick()
        await nextTick()

        api.resizeRef.value = el2
        await nextTick()
        await nextTick()

        expect(roUnobserveSpy).toHaveBeenCalledWith(el1)
        expect(roObserveSpy).toHaveBeenCalledWith(el2)
    })

    it('resets contentRect to undefined when ref is cleared', async () => {
        const el = document.createElement('div')
        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver() })
        await nextTick()

        api.resizeRef.value = el
        await nextTick()
        await nextTick()

        lastROCallback([makeEntry(el, makeDomRect(100, 50))])
        expect(api.contentRect.value?.width).toBe(100)

        api.resizeRef.value = null
        await nextTick()
        await nextTick()

        expect(api.contentRect.value).toBeUndefined()
    })
})

describe('useResizeObserver — contentRect update (content box)', () => {
    beforeEach(installROStub)
    afterEach(() => vi.unstubAllGlobals())

    it('updates contentRect from the first entry contentRect (default box=content)', async () => {
        const el = document.createElement('div')
        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver() })
        await nextTick()

        api.resizeRef.value = el
        await nextTick()
        await nextTick()

        lastROCallback([makeEntry(el, makeDomRect(300, 200))])
        expect(api.contentRect.value?.width).toBe(300)
        expect(api.contentRect.value?.height).toBe(200)
    })

    it('calls the user callback with the full entries array', async () => {
        const userCb = vi.fn()
        const el = document.createElement('div')
        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver(userCb) })
        await nextTick()

        api.resizeRef.value = el
        await nextTick()
        await nextTick()

        const entries = [makeEntry(el, makeDomRect(50, 50))]
        lastROCallback(entries)
        expect(userCb).toHaveBeenCalledWith(entries, expect.anything())
    })

    it('does not update contentRect when entries array is empty', async () => {
        const el = document.createElement('div')
        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver() })
        await nextTick()

        api.resizeRef.value = el
        await nextTick()
        await nextTick()

        lastROCallback([])
        expect(api.contentRect.value).toBeUndefined()
    })
})

describe('useResizeObserver — border box', () => {
    beforeEach(installROStub)
    afterEach(() => vi.unstubAllGlobals())

    it('uses getBoundingClientRect() for the contentRect when box=border', async () => {
        const el = document.createElement('div')
        const mockBCR = makeDomRect(120, 80)
        el.getBoundingClientRect = vi.fn().mockReturnValue(mockBCR)

        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver(undefined, 'border') })
        await nextTick()

        api.resizeRef.value = el
        await nextTick()
        await nextTick()

        lastROCallback([makeEntry(el, makeDomRect(99, 99))])
        // border box uses getBoundingClientRect, not entry.contentRect
        expect(el.getBoundingClientRect).toHaveBeenCalled()
        expect(api.contentRect.value?.width).toBe(120)
    })
})

describe('useResizeObserver — lifecycle disconnect', () => {
    beforeEach(installROStub)
    afterEach(() => vi.unstubAllGlobals())

    it('calls disconnect on unmount', async () => {
        const Host = defineComponent({
            setup () {
                useResizeObserver()
                return () => h('div')
            }
        })
        const wrapper = mount(Host)
        await nextTick()
        wrapper.unmount()
        expect(roDisconnectSpy).toHaveBeenCalledTimes(1)
    })
})

describe('useResizeObserver — contentRect is readonly', () => {
    beforeEach(installROStub)
    afterEach(() => vi.unstubAllGlobals())

    it('contentRect only updates through the observer callback, never by direct assignment', async () => {
        // Vue's readonly() wrapper silently ignores direct assignments in production
        // (no throw). The contract is that contentRect stays at its last observer-
        // driven value after an assignment attempt — i.e. the assignment is a no-op.
        const el = document.createElement('div')
        let api!: ReturnType<typeof useResizeObserver>
        mountHost(() => { api = useResizeObserver() })
        await nextTick()

        api.resizeRef.value = el
        await nextTick()
        await nextTick()

        lastROCallback([makeEntry(el, makeDomRect(100, 50))])
        expect(api.contentRect.value?.width).toBe(100) // observer-driven value

        // Direct assignment is a no-op (readonly)
        ;(api.contentRect as any).value = makeDomRect(999, 999)
        // Value must NOT have changed to 999
        expect(api.contentRect.value?.width).toBe(100)
    })
})
