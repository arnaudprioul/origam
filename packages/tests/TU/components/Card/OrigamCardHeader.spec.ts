// Unit tests for <OrigamCardHeader> — typography props (the shared ITypographyProps
// surface wired by useTypography).
//
// CardHeader has TWO text surfaces (title + subtitle). A single set of
// typography props drives BOTH: useTypography is called twice, with the
// 'card-header__title' and 'card-header__subtitle' varPrefixes, and each
// result is bound inline on the matching child element. So a single
// `fontSize="xl"` emits the var on both `.origam-card-header__title` and
// `.origam-card-header__subtitle`.
//
// Effective props on both surfaces (SCSS reads all four vars):
//   fontSize, fontWeight, lineHeight, letterSpacing
// fontFamily is part of ITypographyProps but neither SCSS surface has a
// font-family rule — not exercised here.
//
// Mount requires both `title` and `subtitle` so both surfaces render
// (they are guarded by v-if="hasTitle" / v-if="hasSubtitle").

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamCardHeader from '@origam/components/Card/OrigamCardHeader.vue'
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

function mountCardHeader (props: Record<string, unknown> = {}) {
    return mount(OrigamCardHeader, {
        props: { title: 'T', subtitle: 'S', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

function titleStyle (props: Record<string, unknown> = {}): string {
    return mountCardHeader(props).find('.origam-card-header__title').attributes('style') || ''
}

function subtitleStyle (props: Record<string, unknown> = {}): string {
    return mountCardHeader(props).find('.origam-card-header__subtitle').attributes('style') || ''
}

describe('OrigamCardHeader — typography drives both surfaces', () => {
    it('renders a title and a subtitle surface', () => {
        const wrapper = mountCardHeader()
        expect(wrapper.find('.origam-card-header__title').exists()).toBe(true)
        expect(wrapper.find('.origam-card-header__subtitle').exists()).toBe(true)
    })

    it('emits no typography override when no typo prop is set', () => {
        expect(titleStyle()).not.toContain('--origam-card-header__title---')
        expect(subtitleStyle()).not.toContain('--origam-card-header__subtitle---')
    })
})

describe('OrigamCardHeader — fontSize prop', () => {
    it('fontSize="5xl" sets the font-size var on BOTH surfaces', () => {
        expect(titleStyle({ fontSize: '5xl' })).toContain('--origam-card-header__title---font-size: var(--origam-font__size---5xl)')
        expect(subtitleStyle({ fontSize: '5xl' })).toContain('--origam-card-header__subtitle---font-size: var(--origam-font__size---5xl)')
    })

    it('emits no font-size override when fontSize is unset', () => {
        expect(titleStyle()).not.toContain('---font-size:')
        expect(subtitleStyle()).not.toContain('---font-size:')
    })
})

describe('OrigamCardHeader — fontWeight prop', () => {
    it('fontWeight="bold" sets the font-weight var on both surfaces', () => {
        expect(titleStyle({ fontWeight: 'bold' })).toContain('--origam-card-header__title---font-weight: var(--origam-font__weight---bold)')
        expect(subtitleStyle({ fontWeight: 'bold' })).toContain('--origam-card-header__subtitle---font-weight: var(--origam-font__weight---bold)')
    })

    it('emits no font-weight override when fontWeight is unset', () => {
        expect(titleStyle()).not.toContain('---font-weight:')
        expect(subtitleStyle()).not.toContain('---font-weight:')
    })
})

describe('OrigamCardHeader — lineHeight prop', () => {
    it('lineHeight="loose" sets the line-height var on both surfaces', () => {
        expect(titleStyle({ lineHeight: 'loose' })).toContain('--origam-card-header__title---line-height: var(--origam-font__lineHeight---loose)')
        expect(subtitleStyle({ lineHeight: 'loose' })).toContain('--origam-card-header__subtitle---line-height: var(--origam-font__lineHeight---loose)')
    })

    it('emits no line-height override when lineHeight is unset', () => {
        expect(titleStyle()).not.toContain('---line-height:')
        expect(subtitleStyle()).not.toContain('---line-height:')
    })
})

describe('OrigamCardHeader — letterSpacing prop', () => {
    it('letterSpacing="widest" sets the letter-spacing var on both surfaces', () => {
        expect(titleStyle({ letterSpacing: 'widest' })).toContain('--origam-card-header__title---letter-spacing: var(--origam-font__letterSpacing---widest)')
        expect(subtitleStyle({ letterSpacing: 'widest' })).toContain('--origam-card-header__subtitle---letter-spacing: var(--origam-font__letterSpacing---widest)')
    })

    it('emits no letter-spacing override when letterSpacing is unset', () => {
        expect(titleStyle()).not.toContain('---letter-spacing:')
        expect(subtitleStyle()).not.toContain('---letter-spacing:')
    })
})
