import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OrigamMediaCastBtn from './OrigamMediaCastBtn.vue'

const mountBtn = (props: { available?: boolean, casting?: boolean } = {}) => mount(OrigamMediaCastBtn, {
    props: {
        available: props.available ?? true,
        casting: props.casting ?? false,
        castLabel: 'Cast to device',
        stopCastLabel: 'Stop casting'
    },
    global: {
        stubs: {
            OrigamIcon: { template: '<i aria-hidden="true" />' }
        }
    }
})

describe('OrigamMediaCastBtn', () => {
    it('renders nothing when available=false', () => {
        const wrapper = mountBtn({ available: false })
        expect(wrapper.find('button').exists()).toBe(false)
    })

    it('renders a button when available=true', () => {
        const wrapper = mountBtn({ available: true })
        expect(wrapper.find('button').exists()).toBe(true)
    })

    it('shows the cast label when not casting', () => {
        const wrapper = mountBtn({ available: true, casting: false })
        expect(wrapper.attributes('aria-label')).toBe('Cast to device')
    })

    it('swaps to the stop-casting label when casting=true', () => {
        const wrapper = mountBtn({ available: true, casting: true })
        expect(wrapper.attributes('aria-label')).toBe('Stop casting')
        expect(wrapper.classes()).toContain('origam-media-cast-btn--active')
    })

    it('emits click', async () => {
        const wrapper = mountBtn({ available: true })
        await wrapper.trigger('click')
        const emitted = wrapper.emitted('click')
        expect(emitted).toBeTruthy()
        expect(emitted?.length).toBe(1)
    })
})
