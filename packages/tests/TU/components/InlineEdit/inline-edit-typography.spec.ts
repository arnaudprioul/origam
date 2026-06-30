// Unit tests for <OrigamInlineEdit> — typography props (ITypographyProps).
//
// Two BEM surfaces read font CSS vars:
//   - .origam-inline-edit__error     → font-size, font-weight
//   - .origam-inline-edit__action-btn → font-size
//
// Both useTypography calls (one per surface prefix) are merged into the root
// element's inline style so the CSS vars cascade to their descendants.
// Assertions therefore target the root .origam-inline-edit element.
//
// Props with real visual effect:
//   fontSize   → --origam-inline-edit__error---font-size         (error)
//              + --origam-inline-edit__action-btn---font-size     (action-btn)
//   fontWeight → --origam-inline-edit__error---font-weight        (error only)

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamInlineEdit from '@origam/components/InlineEdit/OrigamInlineEdit.vue'
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

function mountInlineEdit (props: Record<string, unknown> = {}) {
    return mount(OrigamInlineEdit, {
        props: { modelValue: 'Test value', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

// ---------------------------------------------------------------------------
// fontSize — cascades to both __error and __action-btn
// ---------------------------------------------------------------------------
describe('OrigamInlineEdit — fontSize prop', () => {
    it('emits no font-size overrides when fontSize is unset', () => {
        const wrapper = mountInlineEdit()
        const style = wrapper.find('.origam-inline-edit').attributes('style') || ''
        expect(style).not.toContain('--origam-inline-edit__error---font-size')
        expect(style).not.toContain('--origam-inline-edit__action-btn---font-size')
        wrapper.unmount()
    })

    it('fontSize="xl" sets --origam-inline-edit__error---font-size to xl token on root', () => {
        const wrapper = mountInlineEdit({ fontSize: 'xl' })
        const style = wrapper.find('.origam-inline-edit').attributes('style') || ''
        expect(style).toContain('--origam-inline-edit__error---font-size: var(--origam-font__size---xl)')
        wrapper.unmount()
    })

    it('fontSize="xl" also sets --origam-inline-edit__action-btn---font-size to xl token on root', () => {
        const wrapper = mountInlineEdit({ fontSize: 'xl' })
        const style = wrapper.find('.origam-inline-edit').attributes('style') || ''
        expect(style).toContain('--origam-inline-edit__action-btn---font-size: var(--origam-font__size---xl)')
        wrapper.unmount()
    })

    it('fontSize="sm" sets both surface vars to the sm token', () => {
        const wrapper = mountInlineEdit({ fontSize: 'sm' })
        const style = wrapper.find('.origam-inline-edit').attributes('style') || ''
        expect(style).toContain('--origam-inline-edit__error---font-size: var(--origam-font__size---sm)')
        expect(style).toContain('--origam-inline-edit__action-btn---font-size: var(--origam-font__size---sm)')
        wrapper.unmount()
    })
})

// ---------------------------------------------------------------------------
// fontWeight — cascades to __error only (action-btn weight is hardcoded 600)
// ---------------------------------------------------------------------------
describe('OrigamInlineEdit — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        const wrapper = mountInlineEdit()
        const style = wrapper.find('.origam-inline-edit').attributes('style') || ''
        expect(style).not.toContain('--origam-inline-edit__error---font-weight')
        wrapper.unmount()
    })

    it('fontWeight="bold" sets --origam-inline-edit__error---font-weight to bold token on root', () => {
        const wrapper = mountInlineEdit({ fontWeight: 'bold' })
        const style = wrapper.find('.origam-inline-edit').attributes('style') || ''
        expect(style).toContain('--origam-inline-edit__error---font-weight: var(--origam-font__weight---bold)')
        wrapper.unmount()
    })

    it('fontWeight="semibold" sets --origam-inline-edit__error---font-weight to semibold token on root', () => {
        const wrapper = mountInlineEdit({ fontWeight: 'semibold' })
        const style = wrapper.find('.origam-inline-edit').attributes('style') || ''
        expect(style).toContain('--origam-inline-edit__error---font-weight: var(--origam-font__weight---semibold)')
        wrapper.unmount()
    })
})
