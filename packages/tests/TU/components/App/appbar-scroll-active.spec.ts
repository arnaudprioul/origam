import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamAppBar } from '@origam/components'
import { createOrigam } from '@origam/origam'

beforeEach(() => {
    class ResizeObserverStub { observe (): void {} unobserve (): void {} disconnect (): void {} }
    ;(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverStub
})

const mountBar = (props: Record<string, unknown> = {}) =>
    mount(OrigamAppBar, { props: { order: 0, ...props } as never, attachTo: document.body, global: { plugins: [createOrigam()] } })

describe('OrigamAppBar — scroll-behavior="active"', () => {
    // NOTE: the actual scroll engagement (currentScroll > 0 → --active + paint)
    // cannot be exercised in jsdom (no scroll/layout). Verified here: at rest
    // (scrollY = 0) the bar is NOT --active when the behaviour is on, and the
    // behaviour is a no-op without the token. Browser verification required for
    // the scrolled state.
    it('at the top (no scroll) with the active behaviour → NOT --active', () => {
        const wrapper = mountBar({ scrollBehavior: 'active', active: { bgColor: 'surface' } })

        expect(wrapper.find('.origam-app-bar').classes()).not.toContain('origam-app-bar--active')
        wrapper.unmount()
    })

    it('mounts cleanly with the active behaviour token', () => {
        const wrapper = mountBar({ scrollBehavior: 'active' })

        expect(wrapper.find('.origam-app-bar').exists()).toBe(true)
        wrapper.unmount()
    })

    it('WITHOUT the active behaviour, a visible bar is NOT --active (modelValue must not force it)', () => {
        // Regression: `--active` used to be emitted from modelValue/visibility,
        // so a default bar (modelValue=true) was permanently `--active` and any
        // `.origam-app-bar--active` CSS painted it always — even with no scroll
        // behaviour configured.
        const wrapper = mountBar({ modelValue: true })

        expect(wrapper.find('.origam-app-bar').classes()).not.toContain('origam-app-bar--active')
        wrapper.unmount()
    })
})
