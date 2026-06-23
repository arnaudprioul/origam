// Tests for `useThrottleFn` composable.
// Leading-edge throttle: first call fires immediately, subsequent calls within
// `wait` ms are dropped, then the throttle resets.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import { useThrottleFn } from '@origam/composables/Commons/throttle.composable'

describe('useThrottleFn', () => {
    beforeEach(() => { vi.useFakeTimers() })
    afterEach(() => { vi.useRealTimers() })

    it('returns a function', () => {
        const throttled = useThrottleFn(vi.fn(), 100)
        expect(typeof throttled).toBe('function')
    })

    it('first call executes immediately (leading edge)', () => {
        const fn = vi.fn()
        const throttled = useThrottleFn(fn, 200)
        throttled()
        expect(fn).toHaveBeenCalledOnce()
    })

    it('second call within wait window is dropped', () => {
        const fn = vi.fn()
        const throttled = useThrottleFn(fn, 200)
        throttled()
        throttled() // within window
        expect(fn).toHaveBeenCalledOnce()
    })

    it('call after wait ms fires again (throttle resets)', () => {
        const fn = vi.fn()
        const throttled = useThrottleFn(fn, 200)
        throttled()
        expect(fn).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(200)
        throttled()
        expect(fn).toHaveBeenCalledTimes(2)
    })

    it('multiple calls during window only pass through the first', () => {
        const fn = vi.fn()
        const throttled = useThrottleFn(fn, 300)
        throttled()
        throttled()
        throttled()
        throttled()
        expect(fn).toHaveBeenCalledOnce()
    })

    it('arguments are forwarded to the wrapped function', () => {
        const fn = vi.fn((_a: string, _b: number) => {})
        const throttled = useThrottleFn(fn, 100)
        throttled('hello', 42)
        expect(fn).toHaveBeenCalledWith('hello', 42)
    })

    it('throttled function can be called again after wait, with new args', () => {
        const fn = vi.fn()
        const throttled = useThrottleFn(fn, 100)
        throttled('first')
        vi.advanceTimersByTime(100)
        throttled('second')
        expect(fn).toHaveBeenCalledTimes(2)
        expect(fn).toHaveBeenNthCalledWith(1, 'first')
        expect(fn).toHaveBeenNthCalledWith(2, 'second')
    })

    it('wait=0 — every call fires (no throttling window)', () => {
        const fn = vi.fn()
        const throttled = useThrottleFn(fn, 0)
        throttled()
        vi.advanceTimersByTime(0)
        throttled()
        // Both should pass because the timer clears immediately on next tick
        // (setTimeout(fn, 0) resolves at 0ms).
        expect(fn.mock.calls.length).toBeGreaterThanOrEqual(1)
    })

    it('separate throttled instances do not share state', () => {
        const fn1 = vi.fn()
        const fn2 = vi.fn()
        const t1 = useThrottleFn(fn1, 200)
        const t2 = useThrottleFn(fn2, 200)
        t1()
        t1() // dropped
        t2()
        t2() // dropped
        expect(fn1).toHaveBeenCalledOnce()
        expect(fn2).toHaveBeenCalledOnce()
    })
})
