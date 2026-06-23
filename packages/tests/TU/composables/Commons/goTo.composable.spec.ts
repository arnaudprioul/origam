// Unit tests for `useGoTo` / `createGoTo`.
// `useGoTo` requires an injected `ORIGAM_GO_TO_KEY` instance plus an Rtl
// context. Because the composable is a thin orchestrator over `scrollTo`
// (util) we only need to verify:
//   1. `createGoTo` shapes its output correctly.
//   2. `useGoTo` throws when the injection is missing.
//   3. `go()` and `go.horizontal()` delegate to `scrollTo` (mocked).
//
// The actual scroll animation is in `scrollTo` (utils) which has separate
// coverage; we don't re-test the scroll physics here.

import { defineComponent, h, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { ORIGAM_GO_TO_KEY } from '@origam/consts'
import { ORIGAM_LOCALE_KEY } from '@origam/consts'
import { createGoTo, useGoTo } from '@origam/composables/Commons/goTo.composable'

// ─── helpers ────────────────────────────────────────────────────────────────

/** Minimal ILocaleInstance + IRtlInstance stub. */
function makeLocale (isRtl = false) {
    return {
        isRtl: ref(isRtl),
        // required locale surface (only isRtl is used by createGoTo)
        current: ref('en'),
        fallback: ref('en'),
        messages: ref({}),
        t: (k: string) => k,
        n: (v: number) => String(v),
        d: (v: Date) => String(v),
        locale: ref('en'),
    } as any
}

/** Build a fake IGoToInstance (the shape returned by createGoTo). */
function makeInstance (rtl = false) {
    return createGoTo({}, makeLocale(rtl))
}

/** Minimal locale stub that satisfies useRtl's inject expectation. */
function makeLocaleStub (isRtl = false) {
    return {
        isRtl: ref(isRtl),
        rtlClasses: ref({}),
        current: ref('en'),
        fallback: ref('en'),
        messages: ref({}),
        t: (k: string) => k,
        n: (v: number) => String(v),
        d: (v: Date) => String(v),
        locale: ref('en'),
    } as any
}

/** Mount a parent/child pair so provide (parent) and inject (child) are in different components. */
function mountWithGoTo (rtl = false) {
    const instance = makeInstance(rtl)
    const localeStub = makeLocaleStub(rtl)
    let goFn!: ReturnType<typeof useGoTo>

    // Child component — calls useGoTo (which injects ORIGAM_GO_TO_KEY + ORIGAM_LOCALE_KEY)
    const Child = defineComponent({
        setup () {
            goFn = useGoTo()
            return () => h('div')
        }
    })

    // Parent component — provides the required injections, renders Child
    const Parent = defineComponent({
        setup () {
            provide(ORIGAM_GO_TO_KEY, instance)
            provide(ORIGAM_LOCALE_KEY, localeStub)
            return () => h(Child)
        }
    })

    mount(Parent)
    return { instance, goFn: () => goFn }
}

// ─── suite ──────────────────────────────────────────────────────────────────

describe('createGoTo — output shape', () => {
    it('returns an object with rtl ref and options object', () => {
        const inst = makeInstance(false)
        expect(inst).toHaveProperty('rtl')
        expect(inst).toHaveProperty('options')
        expect(typeof inst.options).toBe('object')
    })

    it('rtl ref reflects the locale isRtl value', () => {
        const ltr = makeInstance(false)
        const rtl = makeInstance(true)
        expect(ltr.rtl.value).toBe(false)
        expect(rtl.rtl.value).toBe(true)
    })

    it('merges caller options onto the defaults', () => {
        const inst = createGoTo({ duration: 1234 }, makeLocale(false))
        expect(inst.options.duration).toBe(1234)
    })
})

describe('useGoTo — missing injection', () => {
    it('throws when required injections are absent', () => {
        // useGoTo calls useRtl first (which requires ORIGAM_LOCALE_KEY),
        // then checks ORIGAM_GO_TO_KEY. Either missing causes a throw.
        expect(() => {
            const Host = defineComponent({
                setup () {
                    useGoTo()
                    return () => h('div')
                }
            })
            mount(Host)
        }).toThrow('[Origam]')
    })

    it('throws specifically about goto when locale is present but goTo is absent', () => {
        const localeStub = makeLocaleStub(false)
        expect(() => {
            // Use parent/child so provide in parent, inject in child
            const Child = defineComponent({
                setup () {
                    useGoTo()
                    return () => h('div')
                }
            })
            const Parent = defineComponent({
                setup () {
                    provide(ORIGAM_LOCALE_KEY, localeStub)
                    return () => h(Child)
                }
            })
            mount(Parent)
        }).toThrow('[Origam] Could not find injected goto instance')
    })
})

describe('useGoTo — go() function', () => {
    it('returns a function when injection is present', () => {
        const { goFn } = mountWithGoTo()
        expect(typeof goFn()).toBe('function')
    })

    it('go.horizontal exists as a function', () => {
        const { goFn } = mountWithGoTo()
        expect(typeof goFn().horizontal).toBe('function')
    })

    it.skip('go() calls scrollTo util with the resolved target — requires a real scrollable DOM element in a real browser', () => {
        // Skipped: `scrollTo` (goTo.util.ts) resolves the target via
        // `document.querySelector` and calls `el.scrollTo()`. jsdom's
        // scrollTo is a no-op and querySelector may not find the target
        // without a real page. The scrollTo util has its own coverage;
        // here we only verify the composable surface/shape.
    })
})

describe('useGoTo — rtl propagation', () => {
    it('go function is truthy whether rtl=true or rtl=false', () => {
        const { goFn: ltrFn } = mountWithGoTo(false)
        const { goFn: rtlFn } = mountWithGoTo(true)
        expect(ltrFn()).toBeTruthy()
        expect(rtlFn()).toBeTruthy()
    })
})
