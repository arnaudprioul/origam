// Regression coverage for #279 — `<OrigamRadio>` never called `useDefaults()`
// on its own props, so `theme.components['origam-radio']` (e.g.
// `activeBgColor`) was completely inert: a theme could declare it, but the
// component's resolved `props.activeBgColor` always stayed `undefined`
// (falling straight through to `withDefaults()`, which never sets it).
//
// This spec mounts the REAL component chain (Radio → Input → RadioBtn →
// SelectionControl → Icon) — no stubs — because the bug lives in the
// forwarding chain between Radio's own resolved props and its descendants,
// which a stubbed `filterProps` would mask (see OrigamRadio.spec.ts's own
// documented skips for the same reason).

import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createOrigam } from '@origam/origam'
import type { IOrigamTheme } from '@origam/interfaces'

import OrigamRadio from '@origam/components/Radio/OrigamRadio.vue'

afterEach(() => {
    document.querySelectorAll('style[data-origam-theme]').forEach(el => el.remove())
})

const THEME: IOrigamTheme = {
    name: 'radio-defaults-theme',
    mode: 'light',
    components: {
        'origam-radio': { activeBgColor: 'rgb(255, 0, 128)' }
    },
    vars: {}
}

const mountThemedRadio = (props: Record<string, unknown> = {}) => {
    const origam = createOrigam({ themes: [THEME] })
    origam._defaultsRef.value = origam._activeDefaultsFor('radio-defaults-theme', 'light')

    return mount(OrigamRadio, {
        attachTo: document.body,
        global: { plugins: [origam] },
        props: { modelValue: true, ...props }
    })
}

describe('OrigamRadio — theme.components["origam-radio"] resolution (#279)', () => {
    it('applies the theme activeBgColor to the checked glyph icon', async () => {
        const wrapper = mountThemedRadio()
        await nextTick()
        await nextTick()
        const icon = wrapper.find('.origam-icon')
        expect(icon.exists()).toBe(true)
        expect(icon.attributes('style') ?? '').toContain('rgb(255, 0, 128)')
        wrapper.unmount()
    })

    it('an explicit prop on the consumer still wins over the theme default', async () => {
        const wrapper = mountThemedRadio({ activeBgColor: 'rgb(10, 20, 30)' })
        await nextTick()
        await nextTick()
        const icon = wrapper.find('.origam-icon')
        expect(icon.attributes('style') ?? '').toContain('rgb(10, 20, 30)')
        expect(icon.attributes('style') ?? '').not.toContain('rgb(255, 0, 128)')
        wrapper.unmount()
    })
})
