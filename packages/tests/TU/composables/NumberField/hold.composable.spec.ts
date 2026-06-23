// Unit tests for `useHold` (NumberField hold-to-repeat composable).
//
// `useHold` wires up hold-to-repeat behaviour:
//   1. `holdStart('up')` fires an immediate tick, then waits `holdDelay` ms,
//      then fires `toggleUpDown(true)` at every `holdRepeat` ms interval.
//   2. `holdStop()` cancels both the timeout and the interval.
//   3. A second `holdStart` cancels any in-flight timers first.
//
// We use vi.useFakeTimers() to drive time deterministically.
// `onScopeDispose` requires a Vue scope — we use effectScope().

import { effectScope } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useHold } from '@origam/composables/NumberField/hold.composable'

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
    vi.useFakeTimers()
})

afterEach(() => {
    vi.useRealTimers()
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeHold (holdRepeat = 50, holdDelay = 500) {
    const calls: boolean[] = []
    const toggleUpDown = vi.fn((inc: boolean) => { calls.push(inc) })

    let api!: ReturnType<typeof useHold>
    const scope = effectScope()
    scope.run(() => {
        api = useHold({ toggleUpDown }, holdRepeat, holdDelay)
    })

    return { api, toggleUpDown, calls, scope }
}

// ---------------------------------------------------------------------------
// Immediate tick on holdStart
// ---------------------------------------------------------------------------

describe('useHold — immediate tick', () => {
    it('calls toggleUpDown immediately on holdStart("up")', () => {
        const { api, toggleUpDown } = makeHold()
        api.holdStart('up')
        expect(toggleUpDown).toHaveBeenCalledTimes(1)
        expect(toggleUpDown).toHaveBeenCalledWith(true)
        api.holdStop()
    })

    it('calls toggleUpDown(false) immediately on holdStart("down")', () => {
        const { api, toggleUpDown } = makeHold()
        api.holdStart('down')
        expect(toggleUpDown).toHaveBeenCalledTimes(1)
        expect(toggleUpDown).toHaveBeenCalledWith(false)
        api.holdStop()
    })
})

// ---------------------------------------------------------------------------
// Delay before repeat starts
// ---------------------------------------------------------------------------

describe('useHold — delay before repeat', () => {
    it('does not fire a second time before holdDelay elapses', () => {
        const { api, toggleUpDown } = makeHold(50, 500)
        api.holdStart('up')
        vi.advanceTimersByTime(499)
        expect(toggleUpDown).toHaveBeenCalledTimes(1)
        api.holdStop()
    })

    it('fires a second time after holdDelay + holdRepeat elapses', () => {
        const { api, toggleUpDown } = makeHold(50, 500)
        api.holdStart('up')
        vi.advanceTimersByTime(500 + 50)  // delay + one repeat interval
        expect(toggleUpDown).toHaveBeenCalledTimes(2)
        api.holdStop()
    })

    it('fires multiple times during sustained hold', () => {
        const { api, toggleUpDown } = makeHold(50, 500)
        api.holdStart('up')
        vi.advanceTimersByTime(500 + 50 * 5)  // 5 repeat ticks
        expect(toggleUpDown.mock.calls.length).toBeGreaterThanOrEqual(5)
        api.holdStop()
    })
})

// ---------------------------------------------------------------------------
// holdStop cancels timers
// ---------------------------------------------------------------------------

describe('useHold — holdStop', () => {
    it('holdStop prevents the repeat interval from firing', () => {
        const { api, toggleUpDown } = makeHold(50, 500)
        api.holdStart('up')
        vi.advanceTimersByTime(400)
        api.holdStop()
        vi.advanceTimersByTime(2000)  // long after — nothing more should fire
        expect(toggleUpDown).toHaveBeenCalledTimes(1)  // only the immediate tick
    })

    it('holdStop is safe to call when no hold is active', () => {
        const { api } = makeHold()
        expect(() => api.holdStop()).not.toThrow()
    })
})

// ---------------------------------------------------------------------------
// Second holdStart cancels the previous one
// ---------------------------------------------------------------------------

describe('useHold — second holdStart cancels in-flight timers', () => {
    it('fires one immediate tick per holdStart, not cumulative', () => {
        const { api, toggleUpDown } = makeHold(50, 500)
        api.holdStart('up')
        api.holdStart('down')  // cancels first, triggers new immediate tick
        expect(toggleUpDown).toHaveBeenCalledTimes(2)
        // The second call should be down.
        expect(toggleUpDown.mock.calls[1][0]).toBe(false)
        api.holdStop()
    })

    it('after switching direction, interval fires in the new direction', () => {
        const { api, calls } = makeHold(50, 200)
        api.holdStart('up')
        api.holdStart('down')
        vi.advanceTimersByTime(200 + 50 * 2)
        // All repeat ticks from the interval should be 'down' (false).
        const repeatTicks = calls.slice(2)  // skip the two immediate ticks
        expect(repeatTicks.every(v => v === false)).toBe(true)
        api.holdStop()
    })
})

// ---------------------------------------------------------------------------
// Custom holdRepeat / holdDelay defaults
// ---------------------------------------------------------------------------

describe('useHold — default params', () => {
    it('uses holdRepeat=50 and holdDelay=500 when not specified', () => {
        const calls: boolean[] = []
        let api!: ReturnType<typeof useHold>
        const scope = effectScope()
        scope.run(() => {
            api = useHold({ toggleUpDown: (v) => calls.push(v) })
        })

        api.holdStart('up')
        vi.advanceTimersByTime(499)
        expect(calls).toHaveLength(1)  // only immediate
        vi.advanceTimersByTime(1 + 50)  // now 550ms → one repeat
        expect(calls.length).toBeGreaterThanOrEqual(2)
        api.holdStop()
        scope.stop()
    })
})
