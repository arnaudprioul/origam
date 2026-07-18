// Unit tests for <OrigamSwitchTrack>
//
// Lot 4 theming fix — `border`/`rounded`/`elevation` were declared on
// `ISwitchProps` (inherited from the Commons interfaces) but never consumed
// by `OrigamSwitch.vue`, and `OrigamSwitchTrack.vue` (the element that
// actually owns the visible rail) didn't even have them in its own
// interface. A theme could set `'origam-switch': { border: true, rounded:
// 'lg', elevation: 2 }` and nothing would render — the props were silently
// dropped. This spec locks in the fix at its source (the track itself,
// no stubs needed — it has zero sub-component dependencies) so a future
// regression is caught immediately instead of resurfacing as a vague
// "switch looks off-theme" report.

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamSwitchTrack from '@origam/components/Switch/OrigamSwitchTrack.vue'
import { createOrigam } from '@origam/origam'

function mountTrack (props: Record<string, unknown> = {}) {
    return mount(OrigamSwitchTrack, {
        attachTo: document.body,
        global: { plugins: [createOrigam()] },
        props
    })
}

describe('OrigamSwitchTrack — BEM root class', () => {
    it('renders the origam-switch-track class', () => {
        const wrapper = mountTrack()
        expect(wrapper.find('.origam-switch-track').exists()).toBe(true)
    })
})

describe('OrigamSwitchTrack — border prop is consumed (lot 4 fix)', () => {
    it('border=true emits the component-local --border modifier class', () => {
        const wrapper = mountTrack({ border: true })
        expect(wrapper.find('.origam-switch-track--border').exists()).toBe(true)
    })

    it('border=true emits the origam--border-thin utility class', () => {
        const wrapper = mountTrack({ border: true })
        expect(wrapper.classes()).toContain('origam--border-thin')
    })

    it('no border class when border is unset', () => {
        const wrapper = mountTrack()
        expect(wrapper.find('.origam-switch-track--border').exists()).toBe(false)
        expect(wrapper.classes()).not.toContain('origam--border-thin')
    })

    it('borderColor is forwarded to the inline style', () => {
        const wrapper = mountTrack({ border: true, borderColor: 'red' })
        expect(wrapper.attributes('style')).toContain('border-color: red')
    })
})

describe('OrigamSwitchTrack — rounded prop is consumed (lot 4 fix)', () => {
    it('rounded="lg" (utility rung) emits the origam--rounded-lg utility class', () => {
        const wrapper = mountTrack({ rounded: 'lg' })
        expect(wrapper.classes()).toContain('origam--rounded-lg')
    })

    it('rounded="lg" emits an inline border-radius declaration (wins the cascade over the scoped default)', () => {
        const wrapper = mountTrack({ rounded: 'lg' })
        expect(wrapper.attributes('style')).toContain('border-radius')
    })

    it('no rounded utility class when rounded is unset (component keeps its own pill default)', () => {
        const wrapper = mountTrack()
        expect(wrapper.classes().some(c => c.startsWith('origam--rounded-'))).toBe(false)
    })
})

describe('OrigamSwitchTrack — elevation prop is consumed (lot 4 fix)', () => {
    it('elevation=2 emits the component-local --elevated modifier class', () => {
        const wrapper = mountTrack({ elevation: 2 })
        expect(wrapper.find('.origam-switch-track--elevated').exists()).toBe(true)
    })

    it('elevation=2 emits an inline box-shadow declaration', () => {
        const wrapper = mountTrack({ elevation: 2 })
        expect(wrapper.attributes('style')).toContain('box-shadow')
    })

    it('no elevation class/style when elevation is unset', () => {
        const wrapper = mountTrack()
        expect(wrapper.find('.origam-switch-track--elevated').exists()).toBe(false)
        expect(wrapper.attributes('style') ?? '').not.toContain('box-shadow')
    })
})

describe('OrigamSwitchTrack — combined theme-like surface (border + rounded + elevation together)', () => {
    it('applies all three simultaneously without one clobbering another', () => {
        const wrapper = mountTrack({ border: true, rounded: 'lg', elevation: 2 })
        const style = wrapper.attributes('style') ?? ''
        expect(wrapper.find('.origam-switch-track--border').exists()).toBe(true)
        expect(wrapper.find('.origam-switch-track--elevated').exists()).toBe(true)
        expect(wrapper.classes()).toContain('origam--rounded-lg')
        expect(style).toContain('border-radius')
        expect(style).toContain('box-shadow')
    })

    it('reacts when the props change at runtime', async () => {
        const wrapper = mountTrack()
        expect(wrapper.find('.origam-switch-track--elevated').exists()).toBe(false)
        await wrapper.setProps({ elevation: 1 })
        expect(wrapper.find('.origam-switch-track--elevated').exists()).toBe(true)
    })
})
