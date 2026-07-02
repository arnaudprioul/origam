// Unit tests for <OrigamField> — typography prop on the BEM child surface
// (ITypographyProps wired by useTypography with the 'field__label' varPrefix).
//
// ⚠️ BEM-CHILD: typographyStyles is NOT spread into the field root styles.
// It is merged into `labelProps.style` and `floatingLabelProps.style` so
// `--origam-field__label---font-size` lands on the `.origam-field__label`
// element (both static and floating labels carry it).
//
// The SCSS reads `--origam-field__label---font-size` on the
// `&__label--floating` modifier (font-size of the animated floating label)
// AND the JS animation scale reads it via `getPropertyValue(...)`.
// Only fontSize has a real visual effect — no other __label vars exist.
//
// OrigamLabel uses `:style="labelStyles"` inline binding on its root element,
// so in jsdom the var appears in the `style=""` attribute — assertion via
// wrapper.find('.origam-field__label').attributes('style').

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamField from '@origam/components/Field/OrigamField.vue'
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

function mountField (props: Record<string, unknown> = {}) {
    return mount(OrigamField, {
        props: { label: 'Test label', ...props } as never,
        slots: {
            default: '<input class="origam-field__input"/>'
        },
        global: { plugins: [createOrigam()] }
    })
}

function labelStyleOf (props: Record<string, unknown> = {}): string {
    return mountField(props).find('.origam-field__label').attributes('style') || ''
}

// ---------------------------------------------------------------------------
// fontSize — BEM child __label
// ---------------------------------------------------------------------------

describe('OrigamField — fontSize prop (BEM child __label)', () => {
    it('emits no font-size override on the label when fontSize is unset', () => {
        expect(labelStyleOf()).not.toContain('--origam-field__label---font-size')
    })

    it('fontSize="xl" sets the font-size var to the xl token on the label', () => {
        expect(labelStyleOf({ fontSize: 'xl' })).toContain('--origam-field__label---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="xs" sets the font-size var to the xs token on the label', () => {
        expect(labelStyleOf({ fontSize: 'xs' })).toContain('--origam-field__label---font-size: var(--origam-font__size---xs)')
    })
})
