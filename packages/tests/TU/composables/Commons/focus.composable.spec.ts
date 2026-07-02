// Unit tests for `useFocus`.
// Covers: initial state, onFocus/onBlur handlers, focusClasses, reactive
// prop sync (useVModel bridge), component name kebab-casing.

import { defineComponent, h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IFocusProps } from '@origam/interfaces'
import { useFocus } from '@origam/composables/Commons/focus.composable'

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * `useFocus` uses `name` verbatim in the class key `${name}--focused`.
 * Pass an already-kebab-cased name to get predictable class keys.
 */
function mountWithFocus (focused: boolean | undefined, kebabName = 'origam-focus-host') {
    const props = reactive<IFocusProps>({ focused })
    let api!: ReturnType<typeof useFocus>

    const Host = defineComponent({
        setup () {
            api = useFocus(props, kebabName)
            return () => h('div')
        }
    })
    mount(Host)
    return { props, api: () => api }
}

// ─── suite ──────────────────────────────────────────────────────────────────

describe('useFocus — initial state', () => {
    it('isFocused is false (boolean) when prop is undefined', () => {
        // Fixed: useVModel is now called with `false` as the defaultValue.
        // Previously, useVModel without a defaultValue returned `undefined` when
        // props.focused was undefined — causing isFocused.value to be `undefined`
        // (falsy but not strictly false). After the fix, it is guaranteed to be
        // the boolean `false`, which is required for correct ARIA binding and
        // strict equality checks in consumers.
        const { api } = mountWithFocus(undefined)
        expect(api().isFocused.value).toBe(false)
    })

    it('isFocused reflects the initial prop value when true', () => {
        const { api } = mountWithFocus(true)
        expect(api().isFocused.value).toBe(true)
    })

    it('isFocused reflects the initial prop value when false', () => {
        const { api } = mountWithFocus(false)
        expect(api().isFocused.value).toBe(false)
    })
})

describe('useFocus — onFocus / onBlur handlers', () => {
    it('onFocus sets isFocused to true', () => {
        const { api } = mountWithFocus(false)
        api().onFocus()
        expect(api().isFocused.value).toBe(true)
    })

    it('onBlur sets isFocused to false', () => {
        const { api } = mountWithFocus(false)
        api().onFocus()
        api().onBlur()
        expect(api().isFocused.value).toBe(false)
    })

    it('multiple onFocus calls keep isFocused true', () => {
        const { api } = mountWithFocus(false)
        api().onFocus()
        api().onFocus()
        expect(api().isFocused.value).toBe(true)
    })

    it('onBlur when never focused keeps isFocused false', () => {
        const { api } = mountWithFocus(false)
        api().onBlur()
        expect(api().isFocused.value).toBe(false)
    })
})

describe('useFocus — focusClasses', () => {
    it('no class when isFocused=false', () => {
        const { api } = mountWithFocus(false, 'origam-input')
        expect(api().focusClasses.value).toEqual(expect.objectContaining({ 'origam-input--focused': false }))
    })

    it('adds <component>--focused class when isFocused=true', () => {
        const { api } = mountWithFocus(false, 'origam-input')
        api().onFocus()
        expect(api().focusClasses.value).toEqual(expect.objectContaining({ 'origam-input--focused': true }))
    })

    it('class mirrors the name arg verbatim (kebab-case name expected)', () => {
        const { api } = mountWithFocus(false, 'origam-text-field')
        api().onFocus()
        expect(api().focusClasses.value).toEqual(expect.objectContaining({ 'origam-text-field--focused': true }))
    })

    it('class removed after onBlur', () => {
        const { api } = mountWithFocus(false, 'origam-select')
        api().onFocus()
        api().onBlur()
        expect(api().focusClasses.value).toEqual(expect.objectContaining({ 'origam-select--focused': false }))
    })

    it('focusClasses is reactive — updates when isFocused changes', () => {
        const { api } = mountWithFocus(false, 'origam-btn')
        const before = api().focusClasses.value['origam-btn--focused']
        api().onFocus()
        const after = api().focusClasses.value['origam-btn--focused']
        expect(before).toBe(false)
        expect(after).toBe(true)
    })
})

describe('useFocus — reactive prop sync (useVModel)', () => {
    it('isFocused updates when prop changes from false to true (via nextTick — useVModel internal watch)', async () => {
        const { props, api } = mountWithFocus(false)
        props.focused = true
        // useVModel's internal watch is async (default flush); wait a tick
        await nextTick()
        expect(api().isFocused.value).toBe(true)
    })

    it('isFocused updates when prop changes from true to false (via nextTick)', async () => {
        const { props, api } = mountWithFocus(true)
        props.focused = false
        await nextTick()
        expect(api().isFocused.value).toBe(false)
    })
})
