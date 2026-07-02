// Unit tests for <OrigamInput> — typography props surface.
//
// The SCSS of .origam-input reads:
//   font-size:   var(--origam-input---font-size, 1rem)
//   font-weight: var(--origam-input---font-weight, 400)
//   line-height: var(--origam-input---line-height, 1.5)
//
// useTypography(props, 'input') maps each prop to the matching inline CSS
// custom property so a consumer can override theme typography per instance.
// fontFamily is NOT effective on OrigamInput (SCSS has no font-family rule).

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamInput from '@origam/components/Input/OrigamInput.vue'
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

function mountInput (props: Record<string, unknown> = {}) {
    return mount(OrigamInput, {
        props: props as never,
        global: { plugins: [createOrigam()] }
    })
}

describe('OrigamInput — fontSize prop', () => {
    it('emits no font-size override when fontSize is unset', () => {
        const style = mountInput().find('.origam-input').attributes('style') || ''
        expect(style).not.toContain('--origam-input---font-size')
    })

    it('fontSize="xl" → --origam-input---font-size: var(--origam-font__size---xl)', () => {
        const style = mountInput({ fontSize: 'xl' }).find('.origam-input').attributes('style') || ''
        expect(style).toContain('--origam-input---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="sm" → --origam-input---font-size: var(--origam-font__size---sm)', () => {
        const style = mountInput({ fontSize: 'sm' }).find('.origam-input').attributes('style') || ''
        expect(style).toContain('--origam-input---font-size: var(--origam-font__size---sm)')
    })
})

describe('OrigamInput — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        const style = mountInput().find('.origam-input').attributes('style') || ''
        expect(style).not.toContain('--origam-input---font-weight')
    })

    it('fontWeight="bold" → --origam-input---font-weight: var(--origam-font__weight---bold)', () => {
        const style = mountInput({ fontWeight: 'bold' }).find('.origam-input').attributes('style') || ''
        expect(style).toContain('--origam-input---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontWeight="semibold" → --origam-input---font-weight: var(--origam-font__weight---semibold)', () => {
        const style = mountInput({ fontWeight: 'semibold' }).find('.origam-input').attributes('style') || ''
        expect(style).toContain('--origam-input---font-weight: var(--origam-font__weight---semibold)')
    })
})

describe('OrigamInput — lineHeight prop', () => {
    it('emits no line-height override when lineHeight is unset', () => {
        const style = mountInput().find('.origam-input').attributes('style') || ''
        expect(style).not.toContain('--origam-input---line-height')
    })

    it('lineHeight="relaxed" → --origam-input---line-height: var(--origam-font__lineHeight---relaxed)', () => {
        const style = mountInput({ lineHeight: 'relaxed' }).find('.origam-input').attributes('style') || ''
        expect(style).toContain('--origam-input---line-height: var(--origam-font__lineHeight---relaxed)')
    })

    it('lineHeight="tight" → --origam-input---line-height: var(--origam-font__lineHeight---tight)', () => {
        const style = mountInput({ lineHeight: 'tight' }).find('.origam-input').attributes('style') || ''
        expect(style).toContain('--origam-input---line-height: var(--origam-font__lineHeight---tight)')
    })
})
