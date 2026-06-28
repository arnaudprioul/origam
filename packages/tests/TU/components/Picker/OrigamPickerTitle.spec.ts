// Unit tests for <OrigamPickerTitle> — typography props (the shared ITypographyProps
// surface wired by useTypography with the 'picker-title' varPrefix).
//
// PickerTitle binds its computed styles via :style="pickerTitleStyles" on the root
// element — the typography vars therefore land in the inline style="" attribute,
// readable via .attributes('style'). (The component also calls useStyle() for
// scoped-style injection but the vars are visible in both paths.)
//
// Props with a real visual effect (SCSS reads the generated var):
//   fontSize       → --origam-picker-title---font-size   (default .75rem)
//   fontWeight     → --origam-picker-title---font-weight  (default 400)
//   letterSpacing  → --origam-picker-title---letter-spacing (default .1666666667em)
//
// fontFamily and lineHeight are NOT exposed — the SCSS has no matching rules.

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamPickerTitle from '@origam/components/Picker/OrigamPickerTitle.vue'
import { createOrigam } from '@origam/origam'

function mountPT (props: Record<string, unknown> = {}) {
    return mount(OrigamPickerTitle, {
        props: { title: 'Pick a date', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

function styleOf (props: Record<string, unknown> = {}): string {
    return mountPT(props).find('.origam-picker-title').attributes('style') ?? ''
}

describe('OrigamPickerTitle — fontSize prop', () => {
    it('emits no font-size override when fontSize is unset', () => {
        expect(styleOf()).not.toContain('--origam-picker-title---font-size:')
    })

    it('fontSize="xl" sets the font-size var to the xl token', () => {
        expect(styleOf({ fontSize: 'xl' })).toContain('--origam-picker-title---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="xs" sets the font-size var to the xs token', () => {
        expect(styleOf({ fontSize: 'xs' })).toContain('--origam-picker-title---font-size: var(--origam-font__size---xs)')
    })
})

describe('OrigamPickerTitle — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-picker-title---font-weight:')
    })

    it('fontWeight="bold" sets the font-weight var to the bold token', () => {
        expect(styleOf({ fontWeight: 'bold' })).toContain('--origam-picker-title---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontWeight="semibold" sets the font-weight var to the semibold token', () => {
        expect(styleOf({ fontWeight: 'semibold' })).toContain('--origam-picker-title---font-weight: var(--origam-font__weight---semibold)')
    })
})

describe('OrigamPickerTitle — letterSpacing prop', () => {
    it('emits no letter-spacing override when letterSpacing is unset', () => {
        expect(styleOf()).not.toContain('--origam-picker-title---letter-spacing:')
    })

    it('letterSpacing="widest" sets the letter-spacing var to the widest token', () => {
        expect(styleOf({ letterSpacing: 'widest' })).toContain('--origam-picker-title---letter-spacing: var(--origam-font__letterSpacing---widest)')
    })

    it('letterSpacing="wide" sets the letter-spacing var to the wide token', () => {
        expect(styleOf({ letterSpacing: 'wide' })).toContain('--origam-picker-title---letter-spacing: var(--origam-font__letterSpacing---wide)')
    })
})
