// Unit tests for <OrigamMessages> — typography props (ITypographyProps).
//
// The component has two surfaces that read font vars:
//   - Root (.origam-messages)         reads --origam-messages---font-size
//   - Child (.origam-messages__message) reads --origam-messages__message---line-height
//
// Strategy: two separate useTypography calls in the component target each
// surface with its own varPrefix. Tests assert the inline custom property
// is present on the correct DOM element.
//
// Props with real visual effect:
//   fontSize   → --origam-messages---font-size          (root)
//   lineHeight → --origam-messages__message---line-height (child)

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamMessages from '@origam/components/Messages/OrigamMessages.vue'
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

function mountMessages (props: Record<string, unknown> = {}) {
    return mount(OrigamMessages, {
        props: { messages: ['Test message'], ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

// ---------------------------------------------------------------------------
// fontSize — targets root .origam-messages
// ---------------------------------------------------------------------------
describe('OrigamMessages — fontSize prop', () => {
    it('emits no font-size override on root when fontSize is unset', () => {
        const wrapper = mountMessages()
        const style = wrapper.find('.origam-messages').attributes('style') || ''
        expect(style).not.toContain('--origam-messages---font-size')
        wrapper.unmount()
    })

    it('fontSize="xl" sets --origam-messages---font-size to the xl token on root', () => {
        const wrapper = mountMessages({ fontSize: 'xl' })
        const style = wrapper.find('.origam-messages').attributes('style') || ''
        expect(style).toContain('--origam-messages---font-size: var(--origam-font__size---xl)')
        wrapper.unmount()
    })

    it('fontSize="sm" sets --origam-messages---font-size to the sm token on root', () => {
        const wrapper = mountMessages({ fontSize: 'sm' })
        const style = wrapper.find('.origam-messages').attributes('style') || ''
        expect(style).toContain('--origam-messages---font-size: var(--origam-font__size---sm)')
        wrapper.unmount()
    })
})

// ---------------------------------------------------------------------------
// lineHeight — targets child .origam-messages__message
// ---------------------------------------------------------------------------
describe('OrigamMessages — lineHeight prop', () => {
    it('emits no line-height override on message child when lineHeight is unset', () => {
        const wrapper = mountMessages()
        const style = wrapper.find('.origam-messages__message').attributes('style') || ''
        expect(style).not.toContain('--origam-messages__message---line-height')
        wrapper.unmount()
    })

    it('lineHeight="loose" sets --origam-messages__message---line-height to the loose token on message child', () => {
        const wrapper = mountMessages({ lineHeight: 'loose' })
        const style = wrapper.find('.origam-messages__message').attributes('style') || ''
        expect(style).toContain('--origam-messages__message---line-height: var(--origam-font__lineHeight---loose)')
        wrapper.unmount()
    })

    it('lineHeight="tight" sets --origam-messages__message---line-height to the tight token on message child', () => {
        const wrapper = mountMessages({ lineHeight: 'tight' })
        const style = wrapper.find('.origam-messages__message').attributes('style') || ''
        expect(style).toContain('--origam-messages__message---line-height: var(--origam-font__lineHeight---tight)')
        wrapper.unmount()
    })
})
