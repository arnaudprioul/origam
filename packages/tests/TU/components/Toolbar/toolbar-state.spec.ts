import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamToolbar } from '@origam/components'
import { createOrigam } from '@origam/origam'

beforeEach(() => {
    class ResizeObserverStub { observe (): void {} unobserve (): void {} disconnect (): void {} }
    ;(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverStub
})

const mountToolbar = (props: Record<string, unknown> = {}) =>
    mount(OrigamToolbar, { props: props as never, attachTo: document.body, global: { plugins: [createOrigam()] } })

// useStyle injects a `#<id> { … }` rule rather than an inline style attribute,
// so the surface paint lives in the component's generated stylesheet.
const generatedCss = (w: ReturnType<typeof mountToolbar>): string => {
    const css = (w.vm as unknown as { css: string | { value: string } }).css

    return typeof css === 'string' ? css : css.value
}

describe('OrigamToolbar — hover/active drive the surface colour (state-aware)', () => {
    it('transparent by default → active override paints a background (the sticky-AppBar use case)', () => {
        const wrapper = mountToolbar({ active: { enabled: true, bgColor: 'primary' } })
        const css = generatedCss(wrapper)

        expect(css).toMatch(/background-color/)
        expect(css).toContain('action--primary')
        wrapper.unmount()
    })

    it('active bgColor OVERRIDES the resting bgColor (state wins, not just the resting value)', () => {
        const wrapper = mountToolbar({ bgColor: 'info', active: { enabled: true, bgColor: 'danger' } })
        const css = generatedCss(wrapper)

        expect(css).toContain('danger')
        expect(css).not.toContain('info')
        wrapper.unmount()
    })

    it('hover override paints a background once hovered (forced on)', () => {
        const wrapper = mountToolbar({ hover: { enabled: true, bgColor: 'success' } })
        const css = generatedCss(wrapper)

        expect(css).toContain('success')
        wrapper.unmount()
    })

    it('no bgColor + no state → no background-color painted (resting transparent)', () => {
        const wrapper = mountToolbar({})
        const css = generatedCss(wrapper)

        expect(css).not.toMatch(/background-color/)
        wrapper.unmount()
    })
})
