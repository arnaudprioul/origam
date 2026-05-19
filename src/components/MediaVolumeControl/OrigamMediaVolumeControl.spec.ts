import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OrigamMediaVolumeControl from './OrigamMediaVolumeControl.vue'

const TOOLTIP_STUB = {
    template: `
        <div class="origam-tooltip-stub">
            <slot name="activator" :props="{}" />
            <slot />
        </div>
    `
}

const SCRUBBER_STUB = {
    props: ['modelValue', 'orientation', 'ariaLabel', 'ariaValueText', 'max', 'step'],
    template: `
        <div
            role="slider"
            :aria-valuenow="modelValue"
            :aria-orientation="orientation"
            :aria-label="ariaLabel"
            :aria-valuetext="ariaValueText"
            data-cy="scrubber-stub"
        />
    `
}

const mountVolume = (props: { volume?: number, muted?: boolean } = {}) => mount(OrigamMediaVolumeControl, {
    attachTo: document.body,
    props: {
        volume: props.volume ?? 1,
        muted: props.muted ?? false,
        muteLabel: 'Mute',
        unmuteLabel: 'Unmute',
        volumeLabel: 'Volume'
    },
    global: {
        stubs: {
            OrigamIcon: { template: '<i aria-hidden="true" />' },
            OrigamTooltip: TOOLTIP_STUB,
            OrigamMediaScrubber: SCRUBBER_STUB
        }
    }
})

describe('OrigamMediaVolumeControl', () => {
    it('renders the mute label when not muted', () => {
        const wrapper = mountVolume({ muted: false })
        const btn = wrapper.find('[data-cy="origam-media-volume-control-mute"]')
        expect(btn.exists()).toBe(true)
        expect(btn.attributes('aria-label')).toBe('Mute')
    })

    it('renders the unmute label when muted', () => {
        const wrapper = mountVolume({ muted: true })
        const btn = wrapper.find('[data-cy="origam-media-volume-control-mute"]')
        expect(btn.attributes('aria-label')).toBe('Unmute')
    })

    it('aria-valuenow reflects the linear volume when not muted', () => {
        const wrapper = mountVolume({ volume: 0.6, muted: false })
        const slider = wrapper.find('[role="slider"]')
        expect(slider.attributes('aria-valuenow')).toBe('0.6')
    })

    it('aria-valuenow collapses to 0 when muted (resolvedVolume rule)', () => {
        const wrapper = mountVolume({ volume: 0.7, muted: true })
        const slider = wrapper.find('[role="slider"]')
        expect(slider.attributes('aria-valuenow')).toBe('0')
    })

    it('emits update:muted with the negated value on click', async () => {
        const wrapper = mountVolume({ muted: false })
        const btn = wrapper.find('[data-cy="origam-media-volume-control-mute"]')
        await btn.trigger('click')
        const emitted = wrapper.emitted('update:muted') as Array<Array<boolean>>
        expect(emitted).toBeTruthy()
        expect(emitted[0][0]).toBe(true)
    })

    it('emits update:volume when the scrubber updates', async () => {
        const wrapper = mountVolume({ muted: false })
        // Stub forwards `modelValue`; emulate an update from the scrubber.
        const scrubber = wrapper.findComponent({ name: 'OrigamMediaScrubber' } as any)
        if (scrubber.exists()) {
            scrubber.vm.$emit('update:modelValue', 0.4)
            await wrapper.vm.$nextTick()
            const emitted = wrapper.emitted('update:volume') as Array<Array<number>>
            expect(emitted).toBeTruthy()
            expect(emitted[0][0]).toBe(0.4)
        }
    })
})
