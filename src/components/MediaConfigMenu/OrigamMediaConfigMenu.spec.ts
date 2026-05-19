import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OrigamMediaConfigMenu from './OrigamMediaConfigMenu.vue'

const TOOLTIP_STUB = {
    props: ['modelValue'],
    template: `
        <div class="origam-tooltip-stub">
            <slot name="activator" :props="{}" />
            <slot />
        </div>
    `
}

const mountMenu = (overrides: Partial<{
    playbackRates: ReadonlyArray<number>
    playbackRate: number
    qualityOptions: ReadonlyArray<{ quality: string, label: string }>
    currentQuality: string | null
    downloadable: boolean
    downloadUrl: string | null
}> = {}) => mount(OrigamMediaConfigMenu, {
    attachTo: document.body,
    props: {
        playbackRates: overrides.playbackRates ?? [0.5, 1, 1.5, 2],
        playbackRate: overrides.playbackRate ?? 1,
        qualityOptions: overrides.qualityOptions,
        currentQuality: overrides.currentQuality,
        downloadable: overrides.downloadable,
        downloadUrl: overrides.downloadUrl,
        settingsLabel: 'Settings',
        qualityLabel: 'Quality',
        speedLabel: 'Playback speed',
        downloadLabel: 'Download',
        normalSpeedLabel: 'Normal'
    },
    global: {
        stubs: {
            OrigamIcon: { template: '<i aria-hidden="true" />' },
            OrigamTooltip: TOOLTIP_STUB
        }
    }
})

describe('OrigamMediaConfigMenu — exposed state', () => {
    it('starts with open=false and section=main', () => {
        const wrapper = mountMenu()
        expect((wrapper.vm as any).open).toBe(false)
        expect((wrapper.vm as any).section).toBe('main')
    })

    it('emits update:playbackRate and closes after picking a rate', async () => {
        const wrapper = mountMenu()
        const exposed = wrapper.vm as any
        exposed.open = true
        exposed.section = 'speed'
        await wrapper.vm.$nextTick()

        const rateBtn = wrapper.find('[data-cy="origam-media-config-menu-rate-1.5"]')
        expect(rateBtn.exists()).toBe(true)
        await rateBtn.trigger('click')

        const emitted = wrapper.emitted('update:playbackRate') as Array<Array<number>>
        expect(emitted).toBeTruthy()
        expect(emitted[0][0]).toBe(1.5)
        expect(exposed.open).toBe(false)
    })

    it('emits quality-change with the picked quality', async () => {
        const wrapper = mountMenu({
            qualityOptions: [
                { quality: '480p', label: '480p' },
                { quality: '720p', label: '720p' }
            ],
            currentQuality: '480p'
        })
        const exposed = wrapper.vm as any
        exposed.open = true
        exposed.section = 'quality'
        await wrapper.vm.$nextTick()

        const qualityBtn = wrapper.find('[data-cy="origam-media-config-menu-quality-720p"]')
        expect(qualityBtn.exists()).toBe(true)
        await qualityBtn.trigger('click')

        const emitted = wrapper.emitted('quality-change') as Array<Array<string>>
        expect(emitted).toBeTruthy()
        expect(emitted[0][0]).toBe('720p')
    })

    it('emits download when the download row is clicked', async () => {
        const wrapper = mountMenu({ downloadable: true, downloadUrl: 'https://example.com/x.mp4' })
        const exposed = wrapper.vm as any
        exposed.open = true
        await wrapper.vm.$nextTick()

        const dl = wrapper.find('[data-cy="origam-media-config-menu-download"]')
        expect(dl.exists()).toBe(true)
        await dl.trigger('click')

        const emitted = wrapper.emitted('download')
        expect(emitted).toBeTruthy()
    })

    it('does not render the download row when downloadUrl is null', async () => {
        const wrapper = mountMenu({ downloadable: true, downloadUrl: null })
        const exposed = wrapper.vm as any
        exposed.open = true
        await wrapper.vm.$nextTick()
        expect(wrapper.find('[data-cy="origam-media-config-menu-download"]').exists()).toBe(false)
    })
})
