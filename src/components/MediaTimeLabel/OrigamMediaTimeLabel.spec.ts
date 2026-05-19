import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OrigamMediaTimeLabel from './OrigamMediaTimeLabel.vue'

describe('OrigamMediaTimeLabel', () => {
    it('renders the default data-cy hook', () => {
        const wrapper = mount(OrigamMediaTimeLabel, { props: { currentTime: 0, duration: 100 } })
        expect(wrapper.attributes('data-cy')).toBe('origam-media-time-label')
    })

    it('formats short medias as mm:ss', () => {
        const wrapper = mount(OrigamMediaTimeLabel, { props: { currentTime: 65, duration: 130 } })
        expect(wrapper.text()).toContain('01:05')
        expect(wrapper.text()).toContain('02:10')
    })

    it('formats hour-long medias as h:mm:ss', () => {
        const wrapper = mount(OrigamMediaTimeLabel, { props: { currentTime: 3725, duration: 7200 } })
        expect(wrapper.text()).toContain('1:02:05')
        expect(wrapper.text()).toContain('2:00:00')
    })

    it('falls back to the em-dash placeholder when duration is NaN', () => {
        const wrapper = mount(OrigamMediaTimeLabel, { props: { currentTime: 0, duration: NaN } })
        expect(wrapper.text()).toContain('--:--')
    })

    it('honours a custom formatter prop', () => {
        const wrapper = mount(OrigamMediaTimeLabel, {
            props: {
                currentTime: 42,
                duration: 100,
                format: (s: number) => `${s}s`
            }
        })
        expect(wrapper.text()).toContain('42s')
        expect(wrapper.text()).toContain('100s')
    })
})
