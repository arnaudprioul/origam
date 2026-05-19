import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OrigamMediaPlayBtn from './OrigamMediaPlayBtn.vue'

const mountBtn = (props: { playing?: boolean } = {}) => mount(OrigamMediaPlayBtn, {
    props: {
        playing: props.playing ?? false,
        playLabel: 'Play',
        pauseLabel: 'Pause'
    },
    global: {
        stubs: {
            OrigamIcon: { template: '<i aria-hidden="true" />' }
        }
    }
})

describe('OrigamMediaPlayBtn', () => {
    it('renders a <button> with the play aria-label when paused', () => {
        const wrapper = mountBtn({ playing: false })
        expect(wrapper.element.tagName).toBe('BUTTON')
        expect(wrapper.attributes('aria-label')).toBe('Play')
    })

    it('flips the aria-label to pause when playing', () => {
        const wrapper = mountBtn({ playing: true })
        expect(wrapper.attributes('aria-label')).toBe('Pause')
    })

    it('exposes a default data-cy hook for QA selectors', () => {
        const wrapper = mountBtn()
        expect(wrapper.attributes('data-cy')).toBe('origam-media-play-btn')
    })

    it('emits a single click event when the button is clicked', async () => {
        const wrapper = mountBtn()
        await wrapper.trigger('click')
        const emitted = wrapper.emitted('click')
        expect(emitted).toBeTruthy()
        expect(emitted?.length).toBe(1)
    })

    it('reacts to the playing prop changing at runtime', async () => {
        const wrapper = mountBtn({ playing: false })
        expect(wrapper.attributes('aria-label')).toBe('Play')
        await wrapper.setProps({ playing: true })
        expect(wrapper.attributes('aria-label')).toBe('Pause')
    })
})
