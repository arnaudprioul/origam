// Unit tests for <OrigamEmptyState> — typography props (the shared
// ITypographyProps surface wired by useTypography).
//
// EmptyState has TWO text surfaces (title + description). A single set of
// typography props drives BOTH: useTypography is called twice, with the
// 'empty-state__title' and 'empty-state__description' varPrefixes, and each
// result is bound inline on the matching child element. So a single
// `fontSize="5xl"` emits the var on both `.origam-empty-state__title` and
// `.origam-empty-state__description`.
//
// Effective props: fontFamily, fontSize, fontWeight, lineHeight (the SCSS of
// both surfaces reads those vars). `letterSpacing` is part of the surface but
// inert (no letter-spacing rule) — not exercised here.
//
// fontSize additionally overrides the size-driven font-size: the child's
// `font-size` reads `var(--origam-empty-state__{x}---font-size, <size value>)`
// (generic-first). jsdom does not resolve the var cascade, so these unit tests
// assert the emitted inline var; the rendered-px override is proven in the e2e
// layer.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamEmptyState from '@origam/components/EmptyState/OrigamEmptyState.vue'
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

function mountEmptyState (props: Record<string, unknown> = {}) {
    return mount(OrigamEmptyState, {
        props: { title: 'Nothing here', description: 'Add an item to get started.', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

function titleStyle (props: Record<string, unknown> = {}): string {
    return mountEmptyState(props).find('.origam-empty-state__title').attributes('style') || ''
}

function descriptionStyle (props: Record<string, unknown> = {}): string {
    return mountEmptyState(props).find('.origam-empty-state__description').attributes('style') || ''
}

describe('OrigamEmptyState — typography drives both surfaces', () => {
    it('renders a title and a description surface', () => {
        const wrapper = mountEmptyState()
        expect(wrapper.find('.origam-empty-state__title').exists()).toBe(true)
        expect(wrapper.find('.origam-empty-state__description').exists()).toBe(true)
    })

    it('emits no typography override when no typo prop is set', () => {
        expect(titleStyle()).not.toContain('--origam-empty-state__title---')
        expect(descriptionStyle()).not.toContain('--origam-empty-state__description---')
    })
})

describe('OrigamEmptyState — fontSize prop', () => {
    it('fontSize="5xl" sets the font-size var on BOTH surfaces', () => {
        expect(titleStyle({ fontSize: '5xl' })).toContain('--origam-empty-state__title---font-size: var(--origam-font__size---5xl)')
        expect(descriptionStyle({ fontSize: '5xl' })).toContain('--origam-empty-state__description---font-size: var(--origam-font__size---5xl)')
    })

    it('emits no font-size override when fontSize is unset', () => {
        expect(titleStyle()).not.toContain('---font-size:')
        expect(descriptionStyle()).not.toContain('---font-size:')
    })
})

describe('OrigamEmptyState — fontFamily prop', () => {
    it('fontFamily="mono" sets the font-family var on both surfaces', () => {
        expect(titleStyle({ fontFamily: 'mono' })).toContain('--origam-empty-state__title---font-family: var(--origam-font__family---mono)')
        expect(descriptionStyle({ fontFamily: 'mono' })).toContain('--origam-empty-state__description---font-family: var(--origam-font__family---mono)')
    })
})

describe('OrigamEmptyState — fontWeight prop', () => {
    it('fontWeight="bold" sets the font-weight var on both surfaces', () => {
        expect(titleStyle({ fontWeight: 'bold' })).toContain('--origam-empty-state__title---font-weight: var(--origam-font__weight---bold)')
        expect(descriptionStyle({ fontWeight: 'bold' })).toContain('--origam-empty-state__description---font-weight: var(--origam-font__weight---bold)')
    })
})

describe('OrigamEmptyState — lineHeight prop', () => {
    it('lineHeight="loose" sets the line-height var on both surfaces', () => {
        expect(titleStyle({ lineHeight: 'loose' })).toContain('--origam-empty-state__title---line-height: var(--origam-font__lineHeight---loose)')
        expect(descriptionStyle({ lineHeight: 'loose' })).toContain('--origam-empty-state__description---line-height: var(--origam-font__lineHeight---loose)')
    })
})
