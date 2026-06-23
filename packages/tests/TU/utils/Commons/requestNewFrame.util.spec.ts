// TU — requestNewFrame.util.ts
// Exports: requestNewFrame
//
// The module-level `clean` and `frames` state is shared across imports because
// Node/vitest caches the module. We use fake timers + stubbed rAF to drive the
// queue deterministically.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

describe('requestNewFrame', () => {
    // Re-import the module fresh for each test so the internal `clean`/`frames`
    // state is reset. vitest supports dynamic import inside tests.

    beforeEach(() => {
        vi.useFakeTimers()

        // Stub rAF/cAF on the global object before the module is imported.
        let rafId = 0
        const pendingFrames = new Map<number, FrameRequestCallback>()

        vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
            const id = ++rafId
            pendingFrames.set(id, cb)
            return id
        })

        vi.stubGlobal('cancelAnimationFrame', (id: number) => {
            pendingFrames.delete(id)
        })

        // Expose a helper to flush all pending rAF callbacks.
        ;(globalThis as any).__flushRAF = () => {
            const entries = [...pendingFrames.entries()]
            pendingFrames.clear()
            entries.forEach(([, cb]) => cb(performance.now()))
        }
    })

    afterEach(() => {
        vi.useRealTimers()
        vi.unstubAllGlobals()
        delete (globalThis as any).__flushRAF
        // Bust the module cache so the next test starts with a clean state.
        vi.resetModules()
    })

    it('executes the callback immediately when the queue is clean', async () => {
        const { requestNewFrame } = await import('@origam/utils/Commons/requestNewFrame.util')
        const cb = vi.fn()

        requestNewFrame(cb)

        // The first cb is called synchronously (clean=true path).
        expect(cb).toHaveBeenCalledOnce()
    })

    it('defers a second callback to the next animation frame', async () => {
        const { requestNewFrame } = await import('@origam/utils/Commons/requestNewFrame.util')
        const cb1 = vi.fn()
        const cb2 = vi.fn()

        requestNewFrame(cb1) // consumed immediately, queue is now dirty
        requestNewFrame(cb2) // pushed onto frames[]

        // cb2 not yet called — waits for rAF
        expect(cb2).not.toHaveBeenCalled()

        ;(globalThis as any).__flushRAF()
        expect(cb2).toHaveBeenCalledOnce()
    })

    it('drains all queued callbacks in FIFO order across multiple frames', async () => {
        const { requestNewFrame } = await import('@origam/utils/Commons/requestNewFrame.util')
        const order: Array<number> = []

        requestNewFrame(() => order.push(1)) // immediate
        requestNewFrame(() => order.push(2)) // frame 1
        requestNewFrame(() => order.push(3)) // frame 2

        ;(globalThis as any).__flushRAF() // processes cb2
        ;(globalThis as any).__flushRAF() // processes cb3

        expect(order).toEqual([1, 2, 3])
    })

    it('marks the queue as clean when all frames are drained', async () => {
        const { requestNewFrame } = await import('@origam/utils/Commons/requestNewFrame.util')
        const cb = vi.fn()

        requestNewFrame(vi.fn())   // first — immediate
        ;(globalThis as any).__flushRAF() // drain → clean=true again

        // Now a new callback should run immediately again
        requestNewFrame(cb)
        expect(cb).toHaveBeenCalledOnce()
    })
})
