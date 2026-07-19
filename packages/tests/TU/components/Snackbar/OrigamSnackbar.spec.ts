// Unit tests for <OrigamSnackbar> — useDefaults wiring (issue #242)
//
// Strategy: OrigamSnackbar composes OrigamOverlay (teleported, Floating-UI
// positioning). jsdom has no real layout engine so the real
// `locationStrategy` resolution throws — stub OrigamOverlay the same way
// OrigamDialog.spec.ts / OrigamMenu.spec.ts do: a transparent pass-through
// honouring modelValue and rendering the default slot.
//
// OrigamSnackbar did not call useDefaults() so any theme config targeting
// `origam-snackbar` (location, rounded, border, elevation, …) was a silent
// no-op — this locks the mechanism by asserting the un-passed prop resolves
// to a measurable class on `.origam-snackbar-item` (the BEM-child surface
// the component applies rounded/border/elevation to — never the teleport
// root, per the DS's classes-first convention).

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'

import OrigamSnackbar from '@origam/components/Snackbar/OrigamSnackbar.vue'
import { createOrigam } from '@origam/origam'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))
})

// Mirrors OrigamDialog.spec.ts / OrigamMenu.spec.ts's OrigamOverlayStub.
const OrigamOverlayStub = defineComponent({
    name: 'OrigamOverlay',
    props: {
        modelValue: { type: Boolean, default: false },
        class: [String, Array, Object],
        style: [String, Array, Object]
    },
    emits: ['update:modelValue'],
    setup(props, { slots, expose }) {
        const contentEl = ref<HTMLElement | null>(null)
        const activatorEl = ref<HTMLElement | null>(null)
        const globalTop = ref(true)
        expose({
            filterProps: (_props: unknown, _excludes?: string[]) => ({}),
            contentEl,
            activatorEl,
            globalTop
        })
        return () => h('div', { 'data-stub': 'overlay', class: props.class }, [
            props.modelValue ? slots.default?.() : null
        ])
    }
})

const makeGlobal = (plugins: unknown[]) => ({
    plugins,
    stubs: {
        OrigamOverlay: OrigamOverlayStub
    }
})

async function mountSnackbarThemed(componentDefaults: Record<string, unknown>, props: Record<string, unknown> = {}) {
    const theme = { name: 'brandx', mode: 'light' as const, components: { 'origam-snackbar': componentDefaults }, vars: {} }
    const origam = createOrigam({ themes: [theme] })
    origam._defaultsRef.value = origam._activeDefaultsFor('brandx', 'light')
    const wrapper = mount(OrigamSnackbar, {
        props: { modelValue: true, text: 'Notification', ...props } as never,
        attachTo: document.body,
        global: makeGlobal([origam])
    })
    await nextTick()
    return wrapper
}

describe('OrigamSnackbar — useDefaults (theme components wiring)', () => {
    it('resolves rounded="lg" from theme.components[\'origam-snackbar\'] on the .origam-snackbar-item BEM-child (not the teleport root)', async () => {
        const wrapper = await mountSnackbarThemed({ rounded: 'lg' })
        const item = wrapper.find('.origam-snackbar-item')
        expect(item.exists()).toBe(true)
        expect(item.classes()).toContain('origam--rounded-lg')
    })

    it('resolves border=true from theme.components[\'origam-snackbar\'] when not passed', async () => {
        const wrapper = await mountSnackbarThemed({ border: true })
        const item = wrapper.find('.origam-snackbar-item')
        expect(item.classes()).toContain('origam-snackbar--border')
    })

    it('an explicitly passed rounded prop overrides the theme default', async () => {
        const wrapper = await mountSnackbarThemed({ rounded: 'lg' }, { rounded: 'sm' })
        const item = wrapper.find('.origam-snackbar-item')
        expect(item.classes()).toContain('origam--rounded-sm')
        expect(item.classes()).not.toContain('origam--rounded-lg')
    })
})
