// Unit tests for <OrigamTitle> — focus on the `weight`, `family`, `size`,
// `lineHeight`, and `letterSpacing` typography props.
//
// Each prop maps a font token key to an inline custom property so that a single
// title can override its theme typography without touching CSS.
// The `size` prop additionally overrides the density-driven font-size when set,
// and leaves density in control when absent.

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

describe('OrigamTitle — family prop', () => {
    it('emits no font-family override when family is unset', () => {
        const style = mountTitle().find('.origam-title').attributes('style') || ''
        expect(style).not.toContain('--origam-title---font-family')
    })

    it('family="mono" sets the font-family var to the mono token', () => {
        const style = mountTitle({ family: 'mono' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---font-family: var(--origam-font__family---mono)')
    })

    it('family="serif" sets the font-family var to the serif token', () => {
        const style = mountTitle({ family: 'serif' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---font-family: var(--origam-font__family---serif)')
    })
})

describe('OrigamTitle — size prop', () => {
    it('emits no font-size override when size is unset', () => {
        const style = mountTitle().find('.origam-title').attributes('style') || ''
        expect(style).not.toContain('--origam-title---font-size:')
    })

    it('size="5xl" sets the font-size var to the 5xl token', () => {
        const style = mountTitle({ size: '5xl' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---font-size: var(--origam-font__size---5xl)')
    })

    it('size="xs" sets the font-size var to the xs token', () => {
        const style = mountTitle({ size: 'xs' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---font-size: var(--origam-font__size---xs)')
    })

    it('size="5xl" overrides density — the inline var is present regardless of density', () => {
        const style = mountTitle({ size: '5xl', density: 'compact' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---font-size: var(--origam-font__size---5xl)')
    })

    it('without size, the density class is still emitted and no font-size inline override is set', () => {
        const wrapper = mountTitle({ density: 'compact' })
        const el = wrapper.find('.origam-title')
        const style = el.attributes('style') || ''
        expect(style).not.toContain('--origam-title---font-size:')
        expect(el.classes()).toContain('origam-title--density-compact')
    })
})

describe('OrigamTitle — lineHeight prop', () => {
    it('emits no line-height override when lineHeight is unset', () => {
        const style = mountTitle().find('.origam-title').attributes('style') || ''
        expect(style).not.toContain('--origam-title---line-height')
    })

    it('lineHeight="loose" sets the line-height var to the loose token', () => {
        const style = mountTitle({ lineHeight: 'loose' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---line-height: var(--origam-font__lineHeight---loose)')
    })

    it('lineHeight="tight" sets the line-height var to the tight token', () => {
        const style = mountTitle({ lineHeight: 'tight' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---line-height: var(--origam-font__lineHeight---tight)')
    })
})

describe('OrigamTitle — letterSpacing prop', () => {
    it('emits no letter-spacing override when letterSpacing is unset', () => {
        const style = mountTitle().find('.origam-title').attributes('style') || ''
        expect(style).not.toContain('--origam-title---letter-spacing')
    })

    it('letterSpacing="widest" sets the letter-spacing var to the widest token', () => {
        const style = mountTitle({ letterSpacing: 'widest' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---letter-spacing: var(--origam-font__letterSpacing---widest)')
    })

    it('letterSpacing="tight" sets the letter-spacing var to the tight token', () => {
        const style = mountTitle({ letterSpacing: 'tight' }).find('.origam-title').attributes('style') || ''
        expect(style).toContain('--origam-title---letter-spacing: var(--origam-font__letterSpacing---tight)')
    })
})
