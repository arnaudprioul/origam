// Unit tests for <OrigamKbd> — typography props (the shared ITypographyProps
// surface wired by useTypography with the 'kbd' varPrefix).
//
// Kbd binds its computed styles via the inline `:style="kbdStyles"` attribute,
// so assertions read the element's `style` attribute directly — unlike Btn
// which routes through `useStyle` and exposes `wrapper.vm.css`.
//
// Kbd's SCSS reads `--origam-kbd---font-family`, `--origam-kbd---font-size`,
// and `--origam-kbd---font-weight`, so all three props have a real visual
// effect. `lineHeight` and `letterSpacing` are part of `ITypographyProps` but
// Kbd's SCSS has no matching rule — they are not exposed as story controls and
// not exercised here (see rollout recipe in `typography.composable.ts`).

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamKbd from '@origam/components/Kbd/OrigamKbd.vue'
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

function mountKbd (props: Record<string, unknown> = {}) {
    return mount(OrigamKbd, {
        props: { text: '⌘', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

function styleOf (props: Record<string, unknown> = {}): string {
    return mountKbd(props).find('.origam-kbd').attributes('style') || ''
}

describe('OrigamKbd — fontFamily prop', () => {
    it('emits no font-family override when fontFamily is unset', () => {
        expect(styleOf()).not.toContain('--origam-kbd---font-family')
    })

    it('fontFamily="mono" sets the font-family var to the mono token', () => {
        expect(styleOf({ fontFamily: 'mono' })).toContain('--origam-kbd---font-family: var(--origam-font__family---mono)')
    })

    it('fontFamily="sans" sets the font-family var to the sans token', () => {
        expect(styleOf({ fontFamily: 'sans' })).toContain('--origam-kbd---font-family: var(--origam-font__family---sans)')
    })
})

describe('OrigamKbd — fontSize prop', () => {
    it('emits no font-size override when fontSize is unset', () => {
        expect(styleOf()).not.toContain('--origam-kbd---font-size:')
    })

    it('fontSize="xl" sets the font-size var to the xl token', () => {
        expect(styleOf({ fontSize: 'xl' })).toContain('--origam-kbd---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="xs" sets the font-size var to the xs token', () => {
        expect(styleOf({ fontSize: 'xs' })).toContain('--origam-kbd---font-size: var(--origam-font__size---xs)')
    })
})

describe('OrigamKbd — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-kbd---font-weight:')
    })

    it('fontWeight="bold" sets the font-weight var to the bold token (700)', () => {
        expect(styleOf({ fontWeight: 'bold' })).toContain('--origam-kbd---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontWeight="black" sets the font-weight var to the black token (900)', () => {
        expect(styleOf({ fontWeight: 'black' })).toContain('--origam-kbd---font-weight: var(--origam-font__weight---black)')
    })
})
