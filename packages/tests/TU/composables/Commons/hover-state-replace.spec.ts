import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamBtn } from '@origam/components'
import { createOrigam } from '@origam/origam'

const mountBtn = (hover: object) =>
    mount(OrigamBtn, { props: { hover, text: 'x' } as never, global: { plugins: [createOrigam()] } })

// The resolved style sheet the component injects (hover styles land here).
const css = (w: ReturnType<typeof mountBtn>) => String((w.vm as { css?: string }).css ?? '')

describe('hover state replaces (does not accumulate) when the prop changes', () => {
    it('dropping bgColor from the hover state removes it from the resolved styles', async () => {
        const wrapper = mountBtn({ enabled: true, bgColor: 'warning' })
        await wrapper.vm.$nextTick()
        expect(css(wrapper), `warning bg should be present initially — got: ${css(wrapper)}`).toMatch(/warning/)

        await wrapper.setProps({ hover: { enabled: true, rounded: 'lg' } } as never)
        await wrapper.vm.$nextTick()

        expect(css(wrapper), `warning bg should be GONE after swap — got: ${css(wrapper)}`).not.toMatch(/warning/)
    })
})
