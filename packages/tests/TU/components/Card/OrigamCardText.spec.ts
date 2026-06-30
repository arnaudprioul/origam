// Unit tests for <OrigamCardText> — typography props (the shared ITypographyProps
// surface wired by useTypography with the 'card-text' varPrefix).
//
// CardText binds `:style="cardTextStyles"` directly on its root element, so
// assertions read the inline `style=""` attribute — same pattern as OrigamLabel.spec.ts.
//
// CardText SCSS reads `--origam-card-text---font-size / font-weight / letter-spacing`,
// so fontSize / fontWeight / letterSpacing each have a real visual effect.
// lineHeight and fontFamily emit their vars but card-text SCSS has no matching
// rules — no visual effect; they are intentionally not exercised here.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamCardText from '@origam/components/Card/OrigamCardText.vue'
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

function mountCardText (props: Record<string, unknown> = {}) {
    return mount(OrigamCardText, {
        props: { text: 'Card text content', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

function styleOf (props: Record<string, unknown> = {}): string {
    return mountCardText(props).find('.origam-card-text').attributes('style') || ''
}

describe('OrigamCardText — fontSize prop', () => {
    it('emits no font-size override when fontSize is unset', () => {
        expect(styleOf()).not.toContain('--origam-card-text---font-size')
    })

    it('fontSize="xl" sets the font-size var to the xl token', () => {
        expect(styleOf({ fontSize: 'xl' })).toContain('--origam-card-text---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="sm" sets the font-size var to the sm token', () => {
        expect(styleOf({ fontSize: 'sm' })).toContain('--origam-card-text---font-size: var(--origam-font__size---sm)')
    })
})

describe('OrigamCardText — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-card-text---font-weight')
    })

    it('fontWeight="bold" sets the font-weight var to the bold token', () => {
        expect(styleOf({ fontWeight: 'bold' })).toContain('--origam-card-text---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontWeight="medium" sets the font-weight var to the medium token', () => {
        expect(styleOf({ fontWeight: 'medium' })).toContain('--origam-card-text---font-weight: var(--origam-font__weight---medium)')
    })
})

describe('OrigamCardText — letterSpacing prop', () => {
    it('emits no letter-spacing override when letterSpacing is unset', () => {
        expect(styleOf()).not.toContain('--origam-card-text---letter-spacing')
    })

    it('letterSpacing="widest" sets the letter-spacing var to the widest token', () => {
        expect(styleOf({ letterSpacing: 'widest' })).toContain('--origam-card-text---letter-spacing: var(--origam-font__letterSpacing---widest)')
    })

    it('letterSpacing="tight" sets the letter-spacing var to the tight token', () => {
        expect(styleOf({ letterSpacing: 'tight' })).toContain('--origam-card-text---letter-spacing: var(--origam-font__letterSpacing---tight)')
    })
})
