// Tests for `useHydration` composable.
//
// useHydration returns a shallowRef<boolean> that reflects whether the
// component has been mounted in the browser.
//
// Behaviour matrix:
//   - IN_BROWSER === false (Node / jsdom without window) → returns shallowRef(false)
//     immediately, value never changes.
//   - IN_BROWSER === true + ssr===false (no SSR context) → returns shallowRef(true)
//     immediately.
//   - IN_BROWSER === true + ssr===true (hydrating from SSR) → returns shallowRef(false),
//     becomes true in onMounted.
//
// jsdom sets `window`, so IN_BROWSER will be true in this test environment.
// `useDisplay` is the internal dependency that provides `ssr` — we cannot
// replace it without monkey-patching the injection chain. The `ssr` branch
// requires a full createOrigam() context.
//
// Testable path in jsdom: IN_BROWSER=true + ssr=false (useDisplay default).
// SSR path: it.skip with rationale.

import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { createOrigam } from '@origam/origam'
import { useHydration } from '@origam/composables/Commons/hydration.composable'

// ---------------------------------------------------------------------------
// Mount helper
// ---------------------------------------------------------------------------

function mountHydration () {
    let isMounted!: ReturnType<typeof useHydration>

    const Host = defineComponent({
        name: 'OrigamHydrationHost',
        setup () {
            isMounted = useHydration()
            return () => h('div')
        }
    })

    const wrapper = mount(Host, { global: { plugins: [createOrigam()] } })
    return { isMounted: () => isMounted, wrapper }
}

// ---------------------------------------------------------------------------
// IN_BROWSER = true, ssr = false (default jsdom environment)
// ---------------------------------------------------------------------------

describe('useHydration — non-SSR path (jsdom: IN_BROWSER=true, ssr=false)', () => {
    it('returns a ref', () => {
        const { isMounted } = mountHydration()
        expect(isMounted()).toHaveProperty('value')
    })

    it('value is true immediately in the non-SSR path', () => {
        // useDisplay() in jsdom returns ssr=false, so useHydration returns shallowRef(true)
        const { isMounted } = mountHydration()
        expect(isMounted().value).toBe(true)
    })

    it('value is still true after nextTick', async () => {
        const { isMounted } = mountHydration()
        await nextTick()
        expect(isMounted().value).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// SSR path — requires createOrigam() context injection
// ---------------------------------------------------------------------------

describe('useHydration — SSR path', () => {
    it.skip('IN_BROWSER=true + ssr=true: starts false and becomes true in onMounted — requires full createOrigam() SSR context', () => {
        // Reason: `useDisplay()` internally calls inject(ORIGAM_DISPLAY_KEY).
        // The `ssr` flag is only true when createOrigam provides the display
        // instance with ssr:true. Setting it up headlessly would require
        // monkey-patching the injection symbol — that tests inject, not us.
        // This path is validated by the e2e smoke suite (server rendering target).
    })

    it.skip('IN_BROWSER=false: returns shallowRef(false) immediately — only testable in a Node env without window', () => {
        // Reason: jsdom always exposes window. Simulating IN_BROWSER=false
        // requires either deleting window (breaks other tests) or a
        // separate worker environment. Not worth the complexity here.
    })
})
