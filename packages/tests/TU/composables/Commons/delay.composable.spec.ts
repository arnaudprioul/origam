// Tests for `useDelay` composable.
// Covers: runOpenDelay / runCloseDelay execute after the expected timeout,
// clearDelay cancels a pending delay, cb is called with the correct boolean,
// zero-delay fires synchronously (defer short-circuits on timeout===0 when
// IN_BROWSER is false in jsdom test env — verified below via promise settlement).

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import type { IDelayProps } from '@origam/interfaces'

import { useDelay } from '@origam/composables/Commons/delay.composable'

// jsdom sets window — IN_BROWSER becomes true BUT window.setTimeout is real.
// We swap timers so the suite is deterministic.

describe('useDelay', () => {
    beforeEach(() => { vi.useFakeTimers() })
    afterEach(() => { vi.useRealTimers() })

    it('runOpenDelay resolves to true after openDelay ms', async () => {
        const props: IDelayProps = { openDelay: 200, closeDelay: 100 }
        const { runOpenDelay } = useDelay(props)

        const p = runOpenDelay()
        vi.advanceTimersByTime(200)
        const result = await p
        expect(result).toBe(true)
    })

    it('runCloseDelay resolves to false after closeDelay ms', async () => {
        const props: IDelayProps = { openDelay: 200, closeDelay: 150 }
        const { runCloseDelay } = useDelay(props)

        const p = runCloseDelay()
        vi.advanceTimersByTime(150)
        const result = await p
        expect(result).toBe(false)
    })

    it('cb is called with true on runOpenDelay', async () => {
        const cb = vi.fn()
        const props: IDelayProps = { openDelay: 100 }
        const { runOpenDelay } = useDelay(props, cb)

        const p = runOpenDelay()
        vi.advanceTimersByTime(100)
        await p
        expect(cb).toHaveBeenCalledOnce()
        expect(cb).toHaveBeenCalledWith(true)
    })

    it('cb is called with false on runCloseDelay', async () => {
        const cb = vi.fn()
        const props: IDelayProps = { closeDelay: 80 }
        const { runCloseDelay } = useDelay(props, cb)

        const p = runCloseDelay()
        vi.advanceTimersByTime(80)
        await p
        expect(cb).toHaveBeenCalledOnce()
        expect(cb).toHaveBeenCalledWith(false)
    })

    it('does not fire before the timeout elapses', () => {
        const cb = vi.fn()
        const props: IDelayProps = { openDelay: 300 }
        const { runOpenDelay } = useDelay(props, cb)

        runOpenDelay()
        vi.advanceTimersByTime(150) // half time
        expect(cb).not.toHaveBeenCalled()
    })

    it('running a new delay cancels the previous pending delay (last-wins)', async () => {
        const cb = vi.fn()
        const props: IDelayProps = { openDelay: 200 }
        const { runOpenDelay } = useDelay(props, cb)

        // Start first open delay, then immediately start a second one.
        runOpenDelay()
        const p2 = runOpenDelay()

        vi.advanceTimersByTime(200)
        await p2

        // cb should have been called exactly once (the second timer wins).
        expect(cb).toHaveBeenCalledOnce()
    })

    it('runCloseDelay cancels a pending runOpenDelay', async () => {
        const cb = vi.fn()
        const props: IDelayProps = { openDelay: 200, closeDelay: 50 }
        const { runOpenDelay, runCloseDelay } = useDelay(props, cb)

        runOpenDelay()
        const p2 = runCloseDelay()
        vi.advanceTimersByTime(200)
        await p2

        // Only the close callback fires (cb with false).
        expect(cb).toHaveBeenCalledOnce()
        expect(cb).toHaveBeenCalledWith(false)
    })

    it('zero openDelay → fires immediately (synchronous-ish path)', async () => {
        const cb = vi.fn()
        const props: IDelayProps = { openDelay: 0 }
        const { runOpenDelay } = useDelay(props, cb)

        const p = runOpenDelay()
        // Advance 0ms — defer(0, …) fires without waiting in jsdom (IN_BROWSER branch)
        vi.advanceTimersByTime(0)
        await p
        expect(cb).toHaveBeenCalledWith(true)
    })

    it('string openDelay is coerced to number', async () => {
        const cb = vi.fn()
        const props: IDelayProps = { openDelay: '250' }
        const { runOpenDelay } = useDelay(props, cb)

        const p = runOpenDelay()
        vi.advanceTimersByTime(250)
        await p
        expect(cb).toHaveBeenCalledWith(true)
    })

    it('no cb provided — promise still resolves without error', async () => {
        const props: IDelayProps = { openDelay: 100 }
        const { runOpenDelay } = useDelay(props)

        const p = runOpenDelay()
        vi.advanceTimersByTime(100)
        await expect(p).resolves.toBe(true)
    })

    it('clearDelay cancels a pending delay started after destructuring', async () => {
        // Regression test for the closure bug:
        // previously, the `clearDelay` returned in the object was a snapshot
        // of the initial `() => {}` no-op — reassigning the local variable
        // inside `runDelay` did NOT update the returned reference, so calling
        // the destructured `clearDelay()` was always a no-op.
        // Fixed by storing the cancel function in a mutable container and
        // exposing a stable wrapper that always calls the current cancel.
        const cb = vi.fn()
        const props: IDelayProps = { openDelay: 300 }
        const { runOpenDelay, clearDelay } = useDelay(props, cb)

        runOpenDelay()
        // Cancel BEFORE the timer fires using the destructured clearDelay
        clearDelay()

        vi.advanceTimersByTime(300)
        // cb must NOT have been called — clearDelay must have cancelled the timer
        expect(cb).not.toHaveBeenCalled()
    })
})
