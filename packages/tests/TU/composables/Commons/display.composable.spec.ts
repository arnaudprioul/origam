// Tests for `createDisplay` and `useDisplay` composables.
// createDisplay is the factory that produces the IDisplayInstance injection
// consumed by useDisplay. All breakpoint logic lives inside createDisplay's
// watchEffect — we control window.innerWidth via vi.stubGlobal and then call
// update() to trigger the reactive recalculation.

import { defineComponent, h, nextTick, provide } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ORIGAM_DISPLAY_KEY } from '@origam/consts/Commons/display.const'

import { createDisplay, useDisplay } from '@origam/composables/Commons/display.composable'

// ─── helpers ────────────────────────────────────────────────────────────────

function mountWithDisplay (width: number) {
    // Build a display instance with a controlled width
    const display = createDisplay()
    // Force the width so the reactive state settles on the expected breakpoint
    vi.stubGlobal('innerWidth', width)
    display.update()

    let api!: ReturnType<typeof useDisplay>
    const Inner = defineComponent({
        name: 'OrigamDisplayInner',
        setup () {
            api = useDisplay()
            return () => h('div')
        }
    })
    const Outer = defineComponent({
        name: 'OrigamDisplayOuter',
        setup () {
            provide(ORIGAM_DISPLAY_KEY, display)
            return () => h(Inner)
        }
    })
    mount(Outer)
    return { display, api: () => api }
}

// ─── createDisplay — missing injection ───────────────────────────────────────

describe('useDisplay — missing injection', () => {
    it('throws inside setup when ORIGAM_DISPLAY_KEY is not provided', () => {
        // Vue traps component errors and emits them as warnings in test mode;
        // mount() does not re-throw them at the callsite. We assert the throw
        // directly inside the setup() call via an inner expect.
        let threwInSetup = false
        const Host = defineComponent({
            name: 'OrigamDisplayNoProvider',
            setup () {
                try {
                    useDisplay()
                } catch (e) {
                    threwInSetup = e instanceof Error
                }
                return () => h('div')
            }
        })
        mount(Host)
        expect(threwInSetup).toBe(true)
    })
})

// ─── createDisplay — breakpoint flags ────────────────────────────────────────

describe('createDisplay — xs breakpoint (width < 600)', () => {
    beforeEach(() => vi.stubGlobal('innerWidth', 400))
    afterEach(() => vi.unstubAllGlobals())

    it('xs is true at 400px', () => {
        const { display } = mountWithDisplay(400)
        expect(display.xs.value).toBe(true)
    })

    it('sm/md/lg/xl/xxl are false at 400px', () => {
        const { display } = mountWithDisplay(400)
        expect(display.sm.value).toBe(false)
        expect(display.md.value).toBe(false)
        expect(display.lg.value).toBe(false)
        expect(display.xl.value).toBe(false)
        expect(display.xxl.value).toBe(false)
    })

    it('smAndDown is true at 400px (xs is smaller)', () => {
        const { display } = mountWithDisplay(400)
        expect(display.smAndDown.value).toBe(true)
    })

    it('smAndUp is false at 400px', () => {
        const { display } = mountWithDisplay(400)
        expect(display.smAndUp.value).toBe(false)
    })

    it('name is "xs" at 400px', () => {
        const { display } = mountWithDisplay(400)
        expect(display.name.value).toBe('xs')
    })
})

describe('createDisplay — sm breakpoint (600–959)', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('sm is true at 800px', () => {
        const { display } = mountWithDisplay(800)
        expect(display.sm.value).toBe(true)
        expect(display.xs.value).toBe(false)
        expect(display.md.value).toBe(false)
    })

    it('name is "sm" at 800px', () => {
        const { display } = mountWithDisplay(800)
        expect(display.name.value).toBe('sm')
    })
})

describe('createDisplay — md breakpoint (960–1279)', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('md is true at 1100px', () => {
        const { display } = mountWithDisplay(1100)
        expect(display.md.value).toBe(true)
        expect(display.sm.value).toBe(false)
        expect(display.lg.value).toBe(false)
    })

    it('mdAndUp is true at 1100px', () => {
        const { display } = mountWithDisplay(1100)
        expect(display.mdAndUp.value).toBe(true)
    })

    it('mdAndDown is true at 1100px', () => {
        const { display } = mountWithDisplay(1100)
        expect(display.mdAndDown.value).toBe(true)
    })
})

describe('createDisplay — lg breakpoint (1280–1919)', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('lg is true at 1400px', () => {
        const { display } = mountWithDisplay(1400)
        expect(display.lg.value).toBe(true)
    })

    it('lgAndUp is true at 1400px', () => {
        const { display } = mountWithDisplay(1400)
        expect(display.lgAndUp.value).toBe(true)
    })

    it('lgAndDown is true at 1400px', () => {
        const { display } = mountWithDisplay(1400)
        expect(display.lgAndDown.value).toBe(true)
    })
})

describe('createDisplay — xl breakpoint (1920–2559)', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('xl is true at 2000px', () => {
        const { display } = mountWithDisplay(2000)
        expect(display.xl.value).toBe(true)
    })

    it('xlAndDown is true at 2000px', () => {
        const { display } = mountWithDisplay(2000)
        expect(display.xlAndDown.value).toBe(true)
    })

    it('xlAndUp is true at 2000px', () => {
        const { display } = mountWithDisplay(2000)
        expect(display.xlAndUp.value).toBe(true)
    })
})

describe('createDisplay — xxl breakpoint (>= 2560)', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('xxl is true at 3000px', () => {
        const { display } = mountWithDisplay(3000)
        expect(display.xxl.value).toBe(true)
        expect(display.xl.value).toBe(false)
    })

    it('name is "xxl" at 3000px', () => {
        const { display } = mountWithDisplay(3000)
        expect(display.name.value).toBe('xxl')
    })
})

// ─── createDisplay — mobile flag ─────────────────────────────────────────────

describe('createDisplay — mobile flag (default breakpoint: lg = 1280)', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('mobile is true when width < lg threshold (1279px)', () => {
        const { display } = mountWithDisplay(1279)
        expect(display.mobile.value).toBe(true)
    })

    it('mobile is false when width >= lg threshold (1280px)', () => {
        const { display } = mountWithDisplay(1280)
        expect(display.mobile.value).toBe(false)
    })
})

// ─── createDisplay — SSR mode ─────────────────────────────────────────────────

describe('createDisplay — SSR option', () => {
    it('width returns clientWidth from ssr option', () => {
        const display = createDisplay(undefined, { clientWidth: 500 })
        expect(display.width.value).toBe(500)
    })

    it('ssr flag is true when ssr option is provided', () => {
        const display = createDisplay(undefined, { clientWidth: 500 })
        expect(display.ssr).toBe(true)
    })

    it('ssr flag is false when no ssr option', () => {
        const display = createDisplay()
        expect(display.ssr).toBe(false)
    })
})

// ─── createDisplay — custom thresholds ───────────────────────────────────────

describe('createDisplay — custom thresholds', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('custom sm threshold overrides default 600', async () => {
        // createDisplay's watchEffect runs synchronously on the first call
        // but update() sets width.value which triggers a reactive flush.
        // We must wait for nextTick so the watchEffect re-runs with the new width.
        vi.stubGlobal('innerWidth', 350)
        const display = createDisplay({ thresholds: { sm: 400 } })
        display.update()
        await nextTick()
        // At 350px with sm threshold=400: 350 < 400 → xs=true
        expect(display.xs.value).toBe(true)
    })
})

// ─── useDisplay — displayClasses ─────────────────────────────────────────────

describe('useDisplay — displayClasses', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('adds "{name}--mobile" class when mobile is true', () => {
        const { api } = mountWithDisplay(400)
        // mobile breakpoint default is lg=1280; at 400 → mobile=true
        expect(api().displayClasses.value).toMatchObject(
            expect.objectContaining({ 'origam-display-inner--mobile': true })
        )
    })

    it('does not add mobile class when mobile is false', () => {
        const { api } = mountWithDisplay(1500)
        const cls = api().displayClasses.value
        // Check that the mobile class is false or absent
        const mobileClass = Object.entries(cls).find(([k]) => k.endsWith('--mobile'))
        if (mobileClass) {
            expect(mobileClass[1]).toBe(false)
        }
    })
})

// ─── useDisplay — mobileBreakpoint prop override ──────────────────────────────

describe('useDisplay — mobileBreakpoint prop', () => {
    afterEach(() => vi.unstubAllGlobals())

    it('custom numeric mobileBreakpoint overrides default', () => {
        const display = createDisplay()
        vi.stubGlobal('innerWidth', 800)
        display.update()

        let api!: ReturnType<typeof useDisplay>
        const Inner = defineComponent({
            name: 'OrigamDisplayMobileOverride',
            setup () {
                // Pass mobileBreakpoint=1000 → at width 800 → mobile=true
                api = useDisplay({ mobileBreakpoint: 1000 }, 'origam-display-mobile-override')
                return () => h('div')
            }
        })
        const Outer = defineComponent({
            name: 'OrigamDisplayMobileOuter',
            setup () {
                provide(ORIGAM_DISPLAY_KEY, display)
                return () => h(Inner)
            }
        })
        mount(Outer)
        expect(api.mobile.value).toBe(true)
    })
})
