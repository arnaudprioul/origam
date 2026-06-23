// Tests for `useSsrBoot` composable.
//
// useSsrBoot exposes:
//   - isBooted (readonly shallowRef<boolean>) — false before mount, true after
//     the first rAF following onMounted.
//   - ssrBootStyles (computed) — returns { transition: 'none !important' }
//     while isBooted is false, and [] after boot.
//
// rAF is not reliably driven in jsdom without vi.useFakeTimers() + a manual
// advance. We use fake timers + vi.spyOn(window, 'requestAnimationFrame')
// to flush the pending rAF callback.
//
// useSsrBoot must run inside a Vue component setup (calls onMounted).

import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import { useSsrBoot } from '@origam/composables/Commons/ssrBoot.composable'

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function mountSsrBoot () {
    let api!: ReturnType<typeof useSsrBoot>

    const Host = defineComponent({
        name: 'OrigamSsrBootHost',
        setup () {
            api = useSsrBoot()
            return () => h('div')
        }
    })

    const wrapper = mount(Host)
    return { api: () => api, wrapper }
}

// ---------------------------------------------------------------------------
// Initial state (before rAF fires)
// ---------------------------------------------------------------------------

describe('useSsrBoot — initial state', () => {
    it('isBooted starts as false before rAF fires', () => {
        const { api } = mountSsrBoot()
        // rAF callback has not been flushed yet — isBooted must still be false
        expect(api().isBooted.value).toBe(false)
    })

    it('ssrBootStyles contains { transition: "none !important" } before boot', () => {
        const { api } = mountSsrBoot()
        expect(api().ssrBootStyles.value).toEqual({ transition: 'none !important' })
    })

    it('isBooted is wrapped in Vue readonly — writing to .value does not change the value', () => {
        // Vue readonly() in jsdom does not throw; it emits a console.warn and
        // silently ignores the write. We verify the value remains unchanged
        // after an attempted assignment (readonly semantics).
        const { api } = mountSsrBoot()
        const originalValue = api().isBooted.value
        try {
            ;(api().isBooted as any).value = !originalValue
        } catch {
            // Some environments may throw — that's also acceptable
        }
        // The ref was wrapped with readonly() so the write is a no-op
        expect(api().isBooted.value).toBe(originalValue)
    })
})

// ---------------------------------------------------------------------------
// After rAF — useFakeTimers + manual flush
// ---------------------------------------------------------------------------

describe('useSsrBoot — after rAF flush', () => {
    beforeEach(() => { vi.useFakeTimers() })
    afterEach(() => { vi.useRealTimers() })

    it('isBooted becomes true after requestAnimationFrame fires', async () => {
        const { api } = mountSsrBoot()
        expect(api().isBooted.value).toBe(false)

        // Flush the rAF registered in onMounted
        vi.runAllTimers()
        await nextTick()

        expect(api().isBooted.value).toBe(true)
    })

    it('ssrBootStyles becomes [] after rAF fires', async () => {
        const { api } = mountSsrBoot()
        vi.runAllTimers()
        await nextTick()

        // Booted → no more style override
        expect(api().ssrBootStyles.value).toEqual([])
    })
})

// ---------------------------------------------------------------------------
// Return shape
// ---------------------------------------------------------------------------

describe('useSsrBoot — returned API shape', () => {
    it('returns ssrBootStyles and isBooted', () => {
        const { api } = mountSsrBoot()
        expect(api()).toHaveProperty('ssrBootStyles')
        expect(api()).toHaveProperty('isBooted')
    })
})
