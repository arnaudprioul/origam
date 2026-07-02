// Unit tests for <OrigamTextMask> — typography props (the shared ITypographyProps
// surface wired by useTypography with the 'text-mask' varPrefix).
//
// TextMask binds `:style="textMaskStyles"` directly on its root element, so
// assertions read the inline `style=""` attribute — same pattern as OrigamLabel.spec.ts.
//
// TextMask SCSS reads all five font vars:
//   --origam-text-mask---font-family / font-size / font-weight / line-height / letter-spacing
// All five props therefore have a real visual effect and are exercised here.
//
// The `background` prop is required — every mount helper passes it.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamTextMask from '@origam/components/TextMask/OrigamTextMask.vue'
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

function mountTextMask (props: Record<string, unknown> = {}) {
    return mount(OrigamTextMask, {
        props: { background: 'primary', text: 'ORIGAM', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

function styleOf (props: Record<string, unknown> = {}): string {
    return mountTextMask(props).find('.origam-text-mask').attributes('style') || ''
}

describe('OrigamTextMask — fontFamily prop', () => {
    it('emits no font-family override when fontFamily is unset', () => {
        expect(styleOf()).not.toContain('--origam-text-mask---font-family')
    })

    it('fontFamily="mono" sets the font-family var to the mono token', () => {
        expect(styleOf({ fontFamily: 'mono' })).toContain('--origam-text-mask---font-family: var(--origam-font__family---mono)')
    })

    it('fontFamily="serif" sets the font-family var to the serif token', () => {
        expect(styleOf({ fontFamily: 'serif' })).toContain('--origam-text-mask---font-family: var(--origam-font__family---serif)')
    })
})

describe('OrigamTextMask — fontSize prop', () => {
    it('emits no font-size override when fontSize is unset', () => {
        expect(styleOf()).not.toContain('--origam-text-mask---font-size')
    })

    it('fontSize="xl" sets the font-size var to the xl token', () => {
        expect(styleOf({ fontSize: 'xl' })).toContain('--origam-text-mask---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="5xl" sets the font-size var to the 5xl token', () => {
        expect(styleOf({ fontSize: '5xl' })).toContain('--origam-text-mask---font-size: var(--origam-font__size---5xl)')
    })
})

describe('OrigamTextMask — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-text-mask---font-weight')
    })

    it('fontWeight="bold" sets the font-weight var to the bold token', () => {
        expect(styleOf({ fontWeight: 'bold' })).toContain('--origam-text-mask---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontWeight="black" sets the font-weight var to the black token', () => {
        expect(styleOf({ fontWeight: 'black' })).toContain('--origam-text-mask---font-weight: var(--origam-font__weight---black)')
    })
})

describe('OrigamTextMask — lineHeight prop', () => {
    it('emits no line-height override when lineHeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-text-mask---line-height')
    })

    it('lineHeight="tight" sets the line-height var to the tight token', () => {
        expect(styleOf({ lineHeight: 'tight' })).toContain('--origam-text-mask---line-height: var(--origam-font__lineHeight---tight)')
    })

    it('lineHeight="loose" sets the line-height var to the loose token', () => {
        expect(styleOf({ lineHeight: 'loose' })).toContain('--origam-text-mask---line-height: var(--origam-font__lineHeight---loose)')
    })
})

describe('OrigamTextMask — letterSpacing prop', () => {
    it('emits no letter-spacing override when letterSpacing is unset', () => {
        expect(styleOf()).not.toContain('--origam-text-mask---letter-spacing')
    })

    it('letterSpacing="widest" sets the letter-spacing var to the widest token', () => {
        expect(styleOf({ letterSpacing: 'widest' })).toContain('--origam-text-mask---letter-spacing: var(--origam-font__letterSpacing---widest)')
    })

    it('letterSpacing="tight" sets the letter-spacing var to the tight token', () => {
        expect(styleOf({ letterSpacing: 'tight' })).toContain('--origam-text-mask---letter-spacing: var(--origam-font__letterSpacing---tight)')
    })
})
