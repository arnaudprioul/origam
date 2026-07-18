// Unit tests for <OrigamColorPickerField> — useDefaults wiring (issue #242)
//
// Strategy: mount the real component tree (same approach as
// OrigamSelect.spec.ts / OrigamNumberField.spec.ts) with createOrigam()
// under a custom theme. OrigamColorPickerField only called withDefaults(),
// never useDefaults() — its own legacy `rounded: true` / `border: true`
// booleans always won, so theme.components['origam-color-picker-field']
// was a silent no-op. The component forwards its resolved props to the
// internal <origam-text-field> via a template-ref-gated `textFieldProps`
// computed (populates one tick after first mount) — same timing already
// relied on by OrigamSelect / OrigamNumberField.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import OrigamColorPickerField from '@origam/components/ColorPickerField/OrigamColorPickerField.vue'
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

class IntersectionObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(() => [])
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

async function mountColorPickerFieldThemed(componentDefaults: Record<string, unknown>, props: Record<string, unknown> = {}) {
    const theme = { name: 'brandx', mode: 'light' as const, components: { 'origam-color-picker-field': componentDefaults }, vars: {} }
    const origam = createOrigam({ themes: [theme] })
    origam._defaultsRef.value = origam._activeDefaultsFor('brandx', 'light')
    const wrapper = mount(OrigamColorPickerField, {
        props: props as never,
        attachTo: document.body,
        global: { plugins: [origam] }
    })
    await nextTick()
    await nextTick()
    return wrapper
}

describe('OrigamColorPickerField — useDefaults (theme components wiring)', () => {
    it('renders with class origam-color-picker-field', async () => {
        const wrapper = await mountColorPickerFieldThemed({})
        expect(wrapper.classes()).toContain('origam-color-picker-field')
    })

    it('resolves rounded="lg" from theme.components[\'origam-color-picker-field\'] on the forwarded field surface', async () => {
        const wrapper = await mountColorPickerFieldThemed({ rounded: 'lg' })
        const field = wrapper.find('.origam-field')
        expect(field.classes()).toContain('origam--rounded-lg')
    })

    it('without a theme override, the field falls back to the component\'s own legacy rounded=true (rounded-md chrome)', async () => {
        const wrapper = await mountColorPickerFieldThemed({})
        const field = wrapper.find('.origam-field')
        expect(field.classes()).toContain('origam--rounded-md')
    })

    it('an explicitly passed rounded prop overrides the theme default', async () => {
        const wrapper = await mountColorPickerFieldThemed({ rounded: 'lg' }, { rounded: 'sm' })
        const field = wrapper.find('.origam-field')
        expect(field.classes()).toContain('origam--rounded-sm')
        expect(field.classes()).not.toContain('origam--rounded-lg')
    })
})
