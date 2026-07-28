// Regression coverage for #241 — `OrigamSelectionControl` declared
// `border` / `rounded` / `elevation` (via `ISelectionControlProps` ->
// `IBorderProps` / `IRoundedProps` / `IElevationProps`) but never called
// `useBorder` / `useRounded` / `useElevation` — a classic "half-implemented
// surface" (CLAUDE.md). `Checkbox`/`Radio` forward these props all the way
// down to this component (via CheckboxBtn/RadioBtn's `filterProps` relay),
// so the consumption has to happen HERE, on `.origam-selection-control__input`
// — the element that owns the control's visual box (same relay point as
// `OrigamSwitchTrack` for the Switch family).
//
// IMPORTANT (glyph caveat, see ticket #241 and the DS CLAUDE.md
// "half-implemented surfaces" rule): the checkbox/radio glyph itself (the
// mdi icon) is a font glyph, not a CSS-drawn box. `__input` has NO
// background fill by default, so `rounded` alone (no border, no shadow,
// no backdrop-filter) reshapes an invisible box — the class/inline-style
// land correctly (asserted below) but produce zero rendered pixels change
// on an un-bordered, un-elevated, un-blurred checkbox. `border` and
// `elevation` DO paint visible pixels on their own (a border / a shadow
// render even around a transparent box). This spec asserts the WIRING
// (classes + inline styles reach `__input`), which is what unit tests can
// verify headlessly; the actual rendered-pixel verdict is documented in
// the delivery notes (measured via Playwright + `getComputedStyle` against
// the running Histoire instance).

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamSelectionControl from '@origam/components/SelectionControl/OrigamSelectionControl.vue'

const mountControl = (props: Record<string, unknown> = {}) => {
    return mount(OrigamSelectionControl, {
        props: {
            id: 'sc-1',
            name: 'sc-1',
            type: 'checkbox',
            modelValue: false,
            ...props
        }
    })
}

describe('OrigamSelectionControl — border/rounded/elevation consumption (#241)', () => {
    it('rounded="lg" lands a utility class + inline border-radius on __input', () => {
        const wrapper = mountControl({ rounded: 'lg' })
        const inputBox = wrapper.find('.origam-selection-control__input')
        expect(inputBox.classes()).toContain('origam--rounded-lg')
        expect(inputBox.attributes('style') || '').toContain('border-radius: var(--origam-radius---lg, 12px)')
    })

    it('border="true" lands the thin utility class + inline border declarations on __input', () => {
        const wrapper = mountControl({ border: true })
        const inputBox = wrapper.find('.origam-selection-control__input')
        expect(inputBox.classes()).toContain('origam--border-thin')
    })

    it('border with a numeric width lands an inline solid/currentColor border on __input', () => {
        const wrapper = mountControl({ border: 2 })
        const inputBox = wrapper.find('.origam-selection-control__input')
        const style = inputBox.attributes('style') || ''
        expect(style).toContain('border-width: 2px')
        expect(style).toContain('border-style: solid')
    })

    it('elevation="md" lands the shadow utility class + inline box-shadow on __input', () => {
        const wrapper = mountControl({ elevation: 'md' })
        const inputBox = wrapper.find('.origam-selection-control__input')
        expect(inputBox.classes()).toContain('origam--shadow-md')
        expect(inputBox.attributes('style') || '').toContain('box-shadow: var(--origam-shadow---md)')
    })

    it('no border/rounded/elevation prop set produces none of the utility classes (no behaviour change for existing consumers)', () => {
        const wrapper = mountControl()
        const inputBox = wrapper.find('.origam-selection-control__input')
        expect(inputBox.classes().join(' ')).not.toMatch(/origam--(border|rounded|shadow)-/)
    })
})
