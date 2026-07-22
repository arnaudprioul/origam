// Unit tests for <OrigamCard> — useDefaults wiring (issue #242)
//
// Strategy: mount with createOrigam() plugin. OrigamCard did not call
// useDefaults() so any theme config targeting `origam-card` (rounded,
// border, flat, …) was a silent no-op — this locks the mechanism the
// same way OrigamBtn / OrigamAlert do: mount the REAL component under a
// custom theme and assert the un-passed prop resolves to a measurable
// class, and that an explicitly passed prop still wins.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamCard from '@origam/components/Card/OrigamCard.vue'
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

function mountCardThemed(componentDefaults: Record<string, unknown>, props: Record<string, unknown> = {}) {
    const theme = { name: 'brandx', mode: 'light' as const, components: { 'origam-card': componentDefaults }, vars: {} }
    const origam = createOrigam({ themes: [theme] })
    origam._defaultsRef.value = origam._activeDefaultsFor('brandx', 'light')
    return mount(OrigamCard, { props: props as never, global: { plugins: [origam] } })
}

describe('OrigamCard — useDefaults (theme components wiring)', () => {
    it('renders with class origam-card', () => {
        const wrapper = mountCardThemed({})
        expect(wrapper.classes()).toContain('origam-card')
    })

    it('resolves rounded="lg" from theme.components[\'origam-card\'] when not passed', () => {
        const wrapper = mountCardThemed({ rounded: 'lg' })
        expect(wrapper.classes()).toContain('origam--rounded-lg')
    })

    it('an explicitly passed rounded prop overrides the theme default', () => {
        const wrapper = mountCardThemed({ rounded: 'lg' }, { rounded: 'sm' })
        expect(wrapper.classes()).toContain('origam--rounded-sm')
        expect(wrapper.classes()).not.toContain('origam--rounded-lg')
    })

    it('resolves flat=true from theme.components[\'origam-card\'] when not passed', () => {
        const wrapper = mountCardThemed({ flat: true })
        expect(wrapper.classes()).toContain('origam-card--flat')
    })

    it('resolves border=true from theme.components[\'origam-card\'] when not passed', () => {
        const wrapper = mountCardThemed({ border: true })
        expect(wrapper.classes()).toContain('origam-card--border')
    })
})
