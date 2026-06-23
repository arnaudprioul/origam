import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamApp } from '@origam/components'
import { createOrigam } from '@origam/origam'

// The global `afterEach(vi.restoreAllMocks())` wipes the setup's
// `vi.fn()` ResizeObserver implementation after the first test, leaving an
// observer with no `observe`/`disconnect` for the layout composable. Reassign
// a plain class each test (not a spy → survives restoreAllMocks).
beforeEach(() => {
    class ResizeObserverStub {
        observe (): void {}
        unobserve (): void {}
        disconnect (): void {}
    }
    ;(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverStub
})

const mountApp = (props: Record<string, unknown> = {}) =>
    mount(OrigamApp, { props: props as never, global: { plugins: [createOrigam()] } })

describe('OrigamApp — only color/bgColor exposed, forwarded to the layout surface', () => {
    it('bgColor paints the surface + fullHeight (default true) emits --full-height', () => {
        const wrapper = mountApp({ bgColor: 'primary' })
        const root = wrapper.find('.origam-app')
        const cls = root.attributes('class') ?? ''
        const style = root.attributes('style') ?? ''

        expect(root.exists()).toBe(true)
        expect(cls.includes('origam--bg-primary') || /background-color/.test(style)).toBe(true)
        expect(cls).toContain('origam-layout--full-height')

        wrapper.unmount()
    })

    it('color is forwarded to the layout root + fullHeight=false drops --full-height', () => {
        const wrapper = mountApp({ color: 'primary', fullHeight: false })
        const root = wrapper.find('.origam-app')
        const cls = root.attributes('class') ?? ''
        const style = root.attributes('style') ?? ''

        expect(cls.includes('origam--color-primary') || /(^|[^-])color:/.test(style)).toBe(true)
        expect(cls).not.toContain('origam-layout--full-height')

        wrapper.unmount()
    })
})
