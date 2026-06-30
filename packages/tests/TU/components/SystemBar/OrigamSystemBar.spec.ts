// Unit tests for <OrigamSystemBar> — typography props (ITypographyProps surface
// wired by useTypography with the 'system-bar' varPrefix).
//
// SystemBar binds its computed styles via the inline `:style="systemBarStyles"`
// attribute (no `:id` binding to trigger the useStyle scoped-CSS path), so
// assertions read the element's `style` attribute directly — the same pattern
// used by OrigamTitle.spec.ts and OrigamKbd.spec.ts.
//
// SystemBar's SCSS reads `--origam-system-bar---font-size`,
// `--origam-system-bar---font-weight`, `--origam-system-bar---letter-spacing`,
// and `--origam-system-bar---line-height`, so all four props have a real visual
// effect. `fontFamily` is part of ITypographyProps but SystemBar has no matching
// SCSS rule — it is not exposed as a story control and not exercised here (see
// rollout recipe in `typography.composable.ts`).

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamSystemBar from '@origam/components/SystemBar/OrigamSystemBar.vue'
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

function mountSystemBar (props: Record<string, unknown> = {}) {
    return mount(OrigamSystemBar, {
        props: { name: 'test-bar', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

function styleOf (props: Record<string, unknown> = {}): string {
    return mountSystemBar(props).find('.origam-system-bar').attributes('style') || ''
}

describe('OrigamSystemBar — fontSize prop', () => {
    it('emits no font-size override when fontSize is unset', () => {
        expect(styleOf()).not.toContain('--origam-system-bar---font-size:')
    })

    it('fontSize="xl" sets the font-size var to the xl token', () => {
        expect(styleOf({ fontSize: 'xl' })).toContain('--origam-system-bar---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="xs" sets the font-size var to the xs token', () => {
        expect(styleOf({ fontSize: 'xs' })).toContain('--origam-system-bar---font-size: var(--origam-font__size---xs)')
    })
})

describe('OrigamSystemBar — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-system-bar---font-weight:')
    })

    it('fontWeight="bold" sets the font-weight var to the bold token (700)', () => {
        expect(styleOf({ fontWeight: 'bold' })).toContain('--origam-system-bar---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontWeight="semibold" sets the font-weight var to the semibold token (600)', () => {
        expect(styleOf({ fontWeight: 'semibold' })).toContain('--origam-system-bar---font-weight: var(--origam-font__weight---semibold)')
    })
})

describe('OrigamSystemBar — letterSpacing prop', () => {
    it('emits no letter-spacing override when letterSpacing is unset', () => {
        expect(styleOf()).not.toContain('--origam-system-bar---letter-spacing:')
    })

    it('letterSpacing="widest" sets the letter-spacing var to the widest token', () => {
        expect(styleOf({ letterSpacing: 'widest' })).toContain('--origam-system-bar---letter-spacing: var(--origam-font__letterSpacing---widest)')
    })

    it('letterSpacing="tight" sets the letter-spacing var to the tight token', () => {
        expect(styleOf({ letterSpacing: 'tight' })).toContain('--origam-system-bar---letter-spacing: var(--origam-font__letterSpacing---tight)')
    })
})

describe('OrigamSystemBar — lineHeight prop', () => {
    it('emits no line-height override when lineHeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-system-bar---line-height:')
    })

    it('lineHeight="loose" sets the line-height var to the loose token', () => {
        expect(styleOf({ lineHeight: 'loose' })).toContain('--origam-system-bar---line-height: var(--origam-font__lineHeight---loose)')
    })

    it('lineHeight="tight" sets the line-height var to the tight token', () => {
        expect(styleOf({ lineHeight: 'tight' })).toContain('--origam-system-bar---line-height: var(--origam-font__lineHeight---tight)')
    })
})
