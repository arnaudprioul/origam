// Unit tests for <OrigamToolbar> — typography props on the __title BEM child.
//
// The SCSS reads --origam-toolbar__title---font-{size,weight,letter-spacing,line-height}
// inside &__title .origam-title. useTypography(props, 'toolbar__title') emits
// those vars as inline custom properties on div.origam-toolbar__title so they
// cascade to the nested OrigamTitle.
//
// Props with real visual effect (confirmed in SCSS):
//   fontSize       → --origam-toolbar__title---font-size
//   fontWeight     → --origam-toolbar__title---font-weight
//   letterSpacing  → --origam-toolbar__title---letter-spacing
//   lineHeight     → --origam-toolbar__title---line-height
// (fontFamily has no rule in __title — not exposed)
//
// The `title` prop must be set so that hasTitle is truthy and __title is rendered.

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamToolbar from '@origam/components/Toolbar/OrigamToolbar.vue'
import { createOrigam } from '@origam/origam'

// jsdom does not implement ResizeObserver
beforeEach(() => {
    class ResizeObserverStub { observe (): void {} unobserve (): void {} disconnect (): void {} }
    ;(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverStub
})

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

function mountToolbar (props: Record<string, unknown> = {}) {
    return mount(OrigamToolbar, {
        props: { title: 'Test toolbar', ...props } as never,
        attachTo: document.body,
        global: { plugins: [createOrigam()] }
    })
}

// ---------------------------------------------------------------------------
// fontSize
// ---------------------------------------------------------------------------
describe('OrigamToolbar — fontSize prop (on __title)', () => {
    it('emits no font-size override when fontSize is unset', () => {
        const wrapper = mountToolbar()
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).not.toContain('--origam-toolbar__title---font-size')
        wrapper.unmount()
    })

    it('fontSize="xl" sets --origam-toolbar__title---font-size to the xl token', () => {
        const wrapper = mountToolbar({ fontSize: 'xl' })
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).toContain('--origam-toolbar__title---font-size: var(--origam-font__size---xl)')
        wrapper.unmount()
    })

    it('fontSize="sm" sets --origam-toolbar__title---font-size to the sm token', () => {
        const wrapper = mountToolbar({ fontSize: 'sm' })
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).toContain('--origam-toolbar__title---font-size: var(--origam-font__size---sm)')
        wrapper.unmount()
    })
})

// ---------------------------------------------------------------------------
// fontWeight
// ---------------------------------------------------------------------------
describe('OrigamToolbar — fontWeight prop (on __title)', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        const wrapper = mountToolbar()
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).not.toContain('--origam-toolbar__title---font-weight')
        wrapper.unmount()
    })

    it('fontWeight="bold" sets --origam-toolbar__title---font-weight to the bold token', () => {
        const wrapper = mountToolbar({ fontWeight: 'bold' })
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).toContain('--origam-toolbar__title---font-weight: var(--origam-font__weight---bold)')
        wrapper.unmount()
    })

    it('fontWeight="semibold" sets --origam-toolbar__title---font-weight to the semibold token', () => {
        const wrapper = mountToolbar({ fontWeight: 'semibold' })
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).toContain('--origam-toolbar__title---font-weight: var(--origam-font__weight---semibold)')
        wrapper.unmount()
    })
})

// ---------------------------------------------------------------------------
// letterSpacing
// ---------------------------------------------------------------------------
describe('OrigamToolbar — letterSpacing prop (on __title)', () => {
    it('emits no letter-spacing override when letterSpacing is unset', () => {
        const wrapper = mountToolbar()
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).not.toContain('--origam-toolbar__title---letter-spacing')
        wrapper.unmount()
    })

    it('letterSpacing="wide" sets --origam-toolbar__title---letter-spacing to the wide token', () => {
        const wrapper = mountToolbar({ letterSpacing: 'wide' })
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).toContain('--origam-toolbar__title---letter-spacing: var(--origam-font__letterSpacing---wide)')
        wrapper.unmount()
    })

    it('letterSpacing="tight" sets --origam-toolbar__title---letter-spacing to the tight token', () => {
        const wrapper = mountToolbar({ letterSpacing: 'tight' })
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).toContain('--origam-toolbar__title---letter-spacing: var(--origam-font__letterSpacing---tight)')
        wrapper.unmount()
    })
})

// ---------------------------------------------------------------------------
// lineHeight
// ---------------------------------------------------------------------------
describe('OrigamToolbar — lineHeight prop (on __title)', () => {
    it('emits no line-height override when lineHeight is unset', () => {
        const wrapper = mountToolbar()
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).not.toContain('--origam-toolbar__title---line-height')
        wrapper.unmount()
    })

    it('lineHeight="loose" sets --origam-toolbar__title---line-height to the loose token', () => {
        const wrapper = mountToolbar({ lineHeight: 'loose' })
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).toContain('--origam-toolbar__title---line-height: var(--origam-font__lineHeight---loose)')
        wrapper.unmount()
    })

    it('lineHeight="tight" sets --origam-toolbar__title---line-height to the tight token', () => {
        const wrapper = mountToolbar({ lineHeight: 'tight' })
        const style = wrapper.find('.origam-toolbar__title').attributes('style') || ''
        expect(style).toContain('--origam-toolbar__title---line-height: var(--origam-font__lineHeight---tight)')
        wrapper.unmount()
    })
})
