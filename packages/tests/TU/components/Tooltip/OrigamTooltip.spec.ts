// Unit tests for <OrigamTooltip> — typography props surface (ITypographyProps).
//
// Strategy: OrigamTooltip renders its __content surface inside OrigamOverlay
// which uses a Teleport. To keep the spec hermetic and avoid the real
// Teleport + position-engine, OrigamOverlay is stubbed with a passthrough
// that renders both slots in a plain div. The __content div (which carries
// the typographyStyles) is then directly queryable via wrapper.find().
//
// Only the three props with a real visual effect on Tooltip are tested:
//   fontSize   → --origam-tooltip---font-size
//   fontWeight → --origam-tooltip---font-weight
//   lineHeight → --origam-tooltip---line-height
// (fontFamily / letterSpacing are not wired in the Tooltip SCSS.)

import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'

import OrigamTooltip from '@origam/components/Tooltip/OrigamTooltip.vue'
import { createOrigam } from '@origam/origam'

// jsdom does not implement window.matchMedia — stub globally
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

// OrigamOverlay stub — renders activator + default slots without any Teleport
// or positioning engine. filterProps is exposed so Tooltip's overlayProps
// computed does not throw.
const OrigamOverlayStub = defineComponent({
    name: 'OrigamOverlay',
    props: {
        modelValue: { type: Boolean, default: false },
        class: [String, Array, Object],
        style: [String, Array, Object]
    },
    emits: ['update:modelValue'],
    setup (_props, { slots, expose }) {
        const contentEl = ref<HTMLElement | null>(null)
        const activatorEl = ref<HTMLElement | null>(null)
        expose({
            filterProps: (_p: unknown, _e?: string[]) => ({}),
            contentEl,
            activatorEl
        })
        return () => h('div', { 'data-stub': 'overlay' }, [
            slots.activator?.({ props: {} }),
            slots.default?.()
        ])
    }
})

function mountTooltip (props: Record<string, unknown> = {}) {
    return mount(OrigamTooltip, {
        props: { text: 'Test tooltip', ...props } as never,
        attachTo: document.body,
        global: {
            plugins: [createOrigam()],
            stubs: { OrigamOverlay: OrigamOverlayStub }
        }
    })
}

// ---------------------------------------------------------------------------
// fontSize
// ---------------------------------------------------------------------------
describe('OrigamTooltip — fontSize prop', () => {
    it('emits no font-size override when fontSize is unset', () => {
        const wrapper = mountTooltip()
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).not.toContain('--origam-tooltip---font-size')
        wrapper.unmount()
    })

    it('fontSize="xl" sets --origam-tooltip---font-size to the xl token', () => {
        const wrapper = mountTooltip({ fontSize: 'xl' })
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).toContain('--origam-tooltip---font-size: var(--origam-font__size---xl)')
        wrapper.unmount()
    })

    it('fontSize="sm" sets --origam-tooltip---font-size to the sm token', () => {
        const wrapper = mountTooltip({ fontSize: 'sm' })
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).toContain('--origam-tooltip---font-size: var(--origam-font__size---sm)')
        wrapper.unmount()
    })
})

// ---------------------------------------------------------------------------
// fontWeight
// ---------------------------------------------------------------------------
describe('OrigamTooltip — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        const wrapper = mountTooltip()
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).not.toContain('--origam-tooltip---font-weight')
        wrapper.unmount()
    })

    it('fontWeight="bold" sets --origam-tooltip---font-weight to the bold token', () => {
        const wrapper = mountTooltip({ fontWeight: 'bold' })
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).toContain('--origam-tooltip---font-weight: var(--origam-font__weight---bold)')
        wrapper.unmount()
    })

    it('fontWeight="semibold" sets --origam-tooltip---font-weight to the semibold token', () => {
        const wrapper = mountTooltip({ fontWeight: 'semibold' })
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).toContain('--origam-tooltip---font-weight: var(--origam-font__weight---semibold)')
        wrapper.unmount()
    })
})

// ---------------------------------------------------------------------------
// lineHeight
// ---------------------------------------------------------------------------
describe('OrigamTooltip — lineHeight prop', () => {
    it('emits no line-height override when lineHeight is unset', () => {
        const wrapper = mountTooltip()
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).not.toContain('--origam-tooltip---line-height')
        wrapper.unmount()
    })

    it('lineHeight="loose" sets --origam-tooltip---line-height to the loose token', () => {
        const wrapper = mountTooltip({ lineHeight: 'loose' })
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).toContain('--origam-tooltip---line-height: var(--origam-font__lineHeight---loose)')
        wrapper.unmount()
    })

    it('lineHeight="tight" sets --origam-tooltip---line-height to the tight token', () => {
        const wrapper = mountTooltip({ lineHeight: 'tight' })
        const style = wrapper.find('.origam-tooltip__content').attributes('style') || ''
        expect(style).toContain('--origam-tooltip---line-height: var(--origam-font__lineHeight---tight)')
        wrapper.unmount()
    })
})
