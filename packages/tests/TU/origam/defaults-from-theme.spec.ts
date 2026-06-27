// ADR-004 — `createOrigam` wires the per-component DEFAULT PROPS layer.
//
// A theme's `component` map (`{ 'origam-btn': { color: 'primary' } }`) is
// collapsed into the `ORIGAM_DEFAULTS_KEY` provider so a component rendered
// WITHOUT the prop resolves it from the theme. Reassigning `_defaultsRef.value`
// (a NEW object — never mutate in place) re-runs the `useDefaults` computeds,
// so a `setTheme()`-driven switch flips the resolved default reactively.

import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { createOrigam, activeDefaultsFor } from '@origam/origam'
import { useDefaults } from '@origam/composables/Commons/defaults.composable'
import type { IOrigamTheme } from '@origam/interfaces'

afterEach(() => {
    document.querySelectorAll('style[data-origam-theme]').forEach(el => el.remove())
})

// Minimal stand-in for a component declaring a `color` prop with no value
// passed by the parent — exactly the OrigamBtn case. Its instance name is set
// so `useDefaults` reads `defaults['origam-btn']`.
const FakeBtn = defineComponent({
    name: 'OrigamBtn',
    props: { color: { type: String, default: 'neutral' } },
    setup (props) {
        const resolved = useDefaults(props, 'origam-btn')
        return () => h('span', { class: `color-${resolved.color}` }, resolved.color)
    }
})

describe('createOrigam — component defaults from theme.components', () => {
    it('a theme with components.{origam-btn}.color resolves an un-passed prop', () => {
        const theme: IOrigamTheme = {
            name: 'brandx',
            mode: 'light',
            components: { 'origam-btn': { color: 'primary' } },
            vars: {}
        }
        const origam = createOrigam({ themes: [theme] })
        // Seed the active brand×mode defaults (the plugins do this; in a bare
        // mount we drive it explicitly).
        origam._defaultsRef.value = origam._activeDefaultsFor('brandx', 'light')

        const wrapper = mount(FakeBtn, { global: { plugins: [origam] } })
        expect(wrapper.find('span').text()).toBe('primary')
    })

    it('reassigning _defaultsRef.value (theme switch) flips the resolved default reactively', async () => {
        const themeA: IOrigamTheme = {
            name: 'a', mode: 'light', components: { 'origam-btn': { color: 'primary' } }, vars: {}
        }
        const themeB: IOrigamTheme = {
            name: 'b', mode: 'light', components: { 'origam-btn': { color: 'danger' } }, vars: {}
        }
        const origam = createOrigam({ themes: [themeA, themeB] })
        origam._defaultsRef.value = origam._activeDefaultsFor('a', 'light')

        const wrapper = mount(FakeBtn, { global: { plugins: [origam] } })
        expect(wrapper.find('span').text()).toBe('primary')

        // Switch active brand → NEW object, computeds re-run.
        origam._defaultsRef.value = origam._activeDefaultsFor('b', 'light')
        await nextTick()
        expect(wrapper.find('span').text()).toBe('danger')
    })

    it('a prop explicitly passed by the parent always wins over the theme default', () => {
        const theme: IOrigamTheme = {
            name: 'a', mode: 'light', components: { 'origam-btn': { color: 'primary' } }, vars: {}
        }
        const origam = createOrigam({ themes: [theme] })
        origam._defaultsRef.value = origam._activeDefaultsFor('a', 'light')

        const wrapper = mount(FakeBtn, {
            props: { color: 'success' },
            global: { plugins: [origam] }
        })
        expect(wrapper.find('span').text()).toBe('success')
    })

    it('a bare install ships NO global density override (component defaults win)', () => {
        const origam = createOrigam({})
        // The base `origam` theme intentionally ships NO `component.global.density`.
        // A global density default shadows every component's own
        // `withDefaults(density: 'default')` AND, combined with the
        // `childRef?.filterProps(...)` first-render race in SelectionControl-based
        // components (Checkbox / Radio / Switch), permanently overrides the
        // explicit `density` prop — making the control appear non-functional.
        // Bare components therefore resolve their own 'default' density.
        expect(origam._defaultsRef.value.global?.density).toBeUndefined()
    })
})

describe('activeDefaultsFor — collapse rules', () => {
    const themes: IOrigamTheme[] = [
        { name: 'a', mode: 'light', components: { global: { density: 'compact' }, 'origam-btn': { color: 'primary' } }, vars: {} },
        { name: 'a', mode: 'dark', components: { 'origam-btn': { color: 'secondary' } }, vars: {} },
        { name: 'b', mode: 'light', components: { 'origam-btn': { color: 'danger' } }, vars: {} }
    ]

    it('matches name + mode and ignores other brands/modes', () => {
        expect(activeDefaultsFor(themes, 'a', 'light')).toEqual({
            global: { density: 'compact' },
            'origam-btn': { color: 'primary' }
        })
        expect(activeDefaultsFor(themes, 'a', 'dark')).toEqual({
            'origam-btn': { color: 'secondary' }
        })
        expect(activeDefaultsFor(themes, 'b', 'light')).toEqual({
            'origam-btn': { color: 'danger' }
        })
    })

    it('a mode-agnostic theme (no mode) matches any active mode', () => {
        const agnostic: IOrigamTheme[] = [
            { name: 'c', components: { 'origam-btn': { rounded: 0 } }, vars: {} }
        ]
        expect(activeDefaultsFor(agnostic, 'c', 'dark')).toEqual({ 'origam-btn': { rounded: 0 } })
        expect(activeDefaultsFor(agnostic, 'c', 'light')).toEqual({ 'origam-btn': { rounded: 0 } })
    })

    it('returns an empty object when no theme matches', () => {
        expect(activeDefaultsFor(themes, 'zzz', 'light')).toEqual({})
    })
})
