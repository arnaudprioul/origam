// Unit tests for <OrigamTitle> — focus on the `weight` prop.
//
// The weight prop maps a font-weight token key to an inline
// `--origam-title---font-weight: var(--origam-font__weight---{weight})`
// custom property, so a single title can override its theme weight without CSS.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamTitle from '@origam/components/Title/OrigamTitle.vue'
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

function mountTitle (props: Record<string, unknown> = {}) {
    return mount(OrigamTitle, {
        props: { text: 'Title', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

describe('OrigamTitle — weight prop', () => {
    it('emits no font-weight override when weight is unset', () => {
        const style = mountTitle().find('.origam-title').attributes('style') || ''
        expect(style).not.toContain('--origam-title---font-weight')
    })

    it('weight="black" sets the font-weight var to the black token (900)', () => {
        const style = mountTitle({ weight: 'black' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---font-weight: var(--origam-font__weight---black)')
    })

    it('weight="bold" sets the font-weight var to the bold token (700)', () => {
        const style = mountTitle({ weight: 'bold' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---font-weight: var(--origam-font__weight---bold)')
    })
})
