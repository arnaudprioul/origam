// Unit tests for <OrigamAudio> — verifies the Stemtracks shell wiring
// between `useAudioPlayer` and the atomic media sub-components
// (OrigamMediaPlayBtn, OrigamMediaVolumeControl, OrigamMediaTimeLabel,
// OrigamMediaCastBtn, OrigamMediaConfigMenu, OrigamSliderField). Child
// atoms are stubbed so the spec stays hermetic — their own behaviour
// lives in their respective specs.

import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import OrigamAudio from './OrigamAudio.vue'

import { ORIGAM_LOCALE_KEY } from '../../consts'

import type { IAudioSource } from '../../interfaces'

const stubLocale = (): any => ({
    t: (key: string, ...args: Array<unknown>) => {
        if (args.length === 0) return key
        return `${ key }|${ args.join(',') }`
    },
    n: (n: number) => String(n),
    current: { value: 'en' },
    fallback: { value: 'en' },
    messages: { value: {} },
    provide: () => stubLocale(),
    rtl: { value: false },
    isRtl: { value: false }
})

const localeInstance = stubLocale()

interface IMountOpts {
    props?: Record<string, unknown>
    slots?: Record<string, unknown>
    emits?: Record<string, unknown>
}

const mountAudio = (opts: IMountOpts = {}): VueWrapper => {
    return mount(OrigamAudio, {
        attachTo: document.body,
        global: {
            provide: {
                [ORIGAM_LOCALE_KEY as unknown as symbol]: localeInstance
            },
            stubs: {
                OrigamIcon: { template: '<i aria-hidden="true" />' },
                OrigamImg: {
                    props: ['src', 'alt'],
                    template: '<img :src="src" :alt="alt" />'
                },
                OrigamMediaPlayBtn: {
                    props: ['playing', 'playLabel', 'pauseLabel', 'dataCy'],
                    emits: ['click'],
                    template: '<button type="button" :data-cy="dataCy" :aria-label="playing ? pauseLabel : playLabel" @click="$emit(\'click\', $event)" />'
                },
                OrigamMediaTimeLabel: {
                    props: ['currentTime', 'duration', 'dataCy'],
                    template: '<span :data-cy="dataCy">{{ currentTime }}/{{ duration }}</span>'
                },
                OrigamMediaVolumeControl: {
                    props: ['volume', 'muted', 'muteLabel', 'unmuteLabel', 'volumeLabel', 'dataCy'],
                    emits: ['update:muted', 'update:volume'],
                    template: '<div :data-cy="dataCy"><button type="button" :aria-label="muted ? unmuteLabel : muteLabel" data-cy="origam-audio-volume-toggle" @click="$emit(\'update:muted\', !muted)" /></div>'
                },
                OrigamMediaCastBtn: {
                    props: ['available', 'casting', 'castLabel', 'stopCastLabel', 'dataCy'],
                    emits: ['click'],
                    template: '<button v-if="available" type="button" :data-cy="dataCy" :aria-label="casting ? stopCastLabel : castLabel" @click="$emit(\'click\', $event)" />'
                },
                OrigamMediaConfigMenu: {
                    props: ['playbackRates', 'playbackRate', 'downloadable', 'downloadUrl', 'downloadFilename', 'settingsLabel', 'qualityLabel', 'speedLabel', 'downloadLabel', 'normalSpeedLabel', 'dataCy'],
                    emits: ['update:playbackRate', 'download'],
                    template: '<div :data-cy="dataCy" class="origam-media-config-menu-stub"><button type="button" :data-cy="`${dataCy}-rate`" @click="$emit(\'update:playbackRate\', 2)" /><button v-if="downloadable && downloadUrl" type="button" :data-cy="`${dataCy}-download`" @click="$emit(\'download\', $event)" /></div>'
                },
                OrigamSliderField: {
                    props: ['modelValue', 'max', 'step', 'buffered', 'peaks', 'variant', 'showThumbOnHoverOnly', 'showHoverTooltip', 'formatHoverTooltip', 'ariaLabel'],
                    emits: ['update:modelValue'],
                    template: '<div :data-variant="variant" data-cy="origam-slider-field-stub" />'
                }
            }
        },
        props: {
            src: 'https://example.com/track.mp3',
            ...opts.props
        },
        slots: opts.slots,
        attrs: opts.emits ?? {}
    })
}

describe('OrigamAudio — element wiring', () => {
    it('mounts an <audio> element with the resolved native attributes', () => {
        const wrapper = mountAudio({
            props: {
                src: 'https://example.com/track.mp3',
                autoplay: true,
                muted: true,
                loop: true,
                preload: 'auto'
            }
        })
        const audio = wrapper.find('audio')
        expect(audio.exists()).toBe(true)
        expect(audio.attributes('src')).toBe('https://example.com/track.mp3')
        const el = audio.element as HTMLAudioElement
        expect(el.muted).toBe(true)
        expect(el.loop).toBe(true)
        expect(el.preload).toBe('auto')
    })

    it('renders one <source> per entry when src is an array', () => {
        const sources: Array<IAudioSource> = [
            { src: 'a.mp3', type: 'audio/mpeg' },
            { src: 'a.ogg', type: 'audio/ogg' }
        ]
        const wrapper = mountAudio({ props: { src: sources } })
        const renderedSources = wrapper.findAll('source')
        expect(renderedSources).toHaveLength(2)
        expect(renderedSources[0].attributes('src')).toBe('a.mp3')
        expect(renderedSources[0].attributes('type')).toBe('audio/mpeg')
        expect(renderedSources[1].attributes('src')).toBe('a.ogg')
    })

    it('uses the semantic <article> root, the <nav> transport row, the <figure> cover, and the <header> metadata', () => {
        const wrapper = mountAudio({
            props: {
                title: 'Episode 42',
                artist: 'Origam DS Cast',
                cover: 'https://example.com/cover.jpg'
            }
        })
        const root = wrapper.find('[data-cy="origam-audio"]')
        expect(root.exists()).toBe(true)
        expect(root.element.tagName).toBe('ARTICLE')
        const transport = wrapper.find('[data-cy="origam-audio-controls"]')
        expect(transport.exists()).toBe(true)
        expect(transport.element.tagName).toBe('NAV')
        const cover = wrapper.find('[data-cy="origam-audio-cover-figure"]')
        expect(cover.exists()).toBe(true)
        expect(cover.element.tagName).toBe('FIGURE')
        const meta = wrapper.find('[data-cy="origam-audio-metadata"]')
        expect(meta.exists()).toBe(true)
        expect(meta.element.tagName).toBe('HEADER')
    })
})

describe('OrigamAudio — metadata strip', () => {
    it('renders title, artist, and cover when provided', () => {
        const wrapper = mountAudio({
            props: {
                title: 'Episode 42',
                artist: 'Origam DS Cast',
                cover: 'https://example.com/cover.jpg'
            }
        })
        const meta = wrapper.find('[data-cy="origam-audio-metadata"]')
        expect(meta.exists()).toBe(true)

        const title = wrapper.find('[data-cy="origam-audio-title"]')
        expect(title.text()).toBe('Episode 42')

        const artist = wrapper.find('[data-cy="origam-audio-artist"]')
        expect(artist.text()).toBe('Origam DS Cast')

        const cover = wrapper.find('[data-cy="origam-audio-cover"]')
        expect(cover.exists()).toBe(true)
        expect(cover.attributes('src')).toBe('https://example.com/cover.jpg')
    })

    it('omits the metadata strip entirely when title, artist, and cover are all absent', () => {
        const wrapper = mountAudio()
        expect(wrapper.find('[data-cy="origam-audio-metadata"]').exists()).toBe(false)
    })
})

describe('OrigamAudio — controls strategy', () => {
    it('does NOT mount the transport nav and sets the native controls attribute when controls="native"', () => {
        const wrapper = mountAudio({ props: { controls: 'native' } })
        const audio = wrapper.find('audio')
        const el = audio.element as HTMLAudioElement
        expect(el.controls).toBe(true)
        expect(wrapper.find('[data-cy="origam-audio-controls"]').exists()).toBe(false)
    })

    it('mounts the transport nav and leaves the native controls off when controls="custom"', () => {
        const wrapper = mountAudio({ props: { controls: 'custom' } })
        const audio = wrapper.find('audio')
        const el = audio.element as HTMLAudioElement
        expect(el.controls).toBe(false)
        expect(wrapper.find('[data-cy="origam-audio-controls"]').exists()).toBe(true)
    })

    it('renders the OrigamMediaPlayBtn atom inside the transport nav', () => {
        const wrapper = mountAudio()
        const playBtn = wrapper.find('[data-cy="origam-audio-play"]')
        expect(playBtn.exists()).toBe(true)
        expect(playBtn.attributes('aria-label')).toMatch(/play/i)
    })

    it('renders the OrigamMediaVolumeControl atom and forwards mute toggle', async () => {
        const wrapper = mountAudio()
        const volumeToggle = wrapper.find('[data-cy="origam-audio-volume-toggle"]')
        expect(volumeToggle.exists()).toBe(true)
        await volumeToggle.trigger('click')
        // Forwarded to the composable — no crash and the audio element
        // remains stable.
        expect(wrapper.find('audio').exists()).toBe(true)
    })

    it('mounts the OrigamMediaConfigMenu when downloadable or multiple playback rates are exposed', () => {
        const wrapper = mountAudio({ props: { downloadable: true } })
        const config = wrapper.find('[data-cy="origam-audio-config"]')
        expect(config.exists()).toBe(true)
    })

    it('emits "download" with the source URL when the config menu Download row is clicked', async () => {
        const wrapper = mountAudio({ props: { downloadable: true } })
        const downloadBtn = wrapper.find('[data-cy="origam-audio-config-download"]')
        expect(downloadBtn.exists()).toBe(true)
        await downloadBtn.trigger('click')
        const events = wrapper.emitted('download')
        expect(events).toBeTruthy()
        expect(events?.[0]?.[0]).toBe('https://example.com/track.mp3')
    })

    it('emits update:playbackRate when the config menu Speed row is picked', async () => {
        const wrapper = mountAudio()
        const rateBtn = wrapper.find('[data-cy="origam-audio-config-rate"]')
        expect(rateBtn.exists()).toBe(true)
        await rateBtn.trigger('click')
        const events = wrapper.emitted('update:playbackRate')
        expect(events).toBeTruthy()
        expect(events?.[0]?.[0]).toBe(2)
    })
})

describe('OrigamAudio — transport navigation', () => {
    it('renders previous + next buttons in the transport nav', () => {
        const wrapper = mountAudio()
        const previous = wrapper.find('[data-cy="origam-audio-previous"]')
        const next = wrapper.find('[data-cy="origam-audio-next"]')
        expect(previous.exists()).toBe(true)
        expect(next.exists()).toBe(true)
    })

    it('emits "previous" when the previous button is clicked', async () => {
        const wrapper = mountAudio()
        await wrapper.find('[data-cy="origam-audio-previous"]').trigger('click')
        expect(wrapper.emitted('previous')).toBeTruthy()
    })

    it('emits "next" when the next button is clicked', async () => {
        const wrapper = mountAudio()
        await wrapper.find('[data-cy="origam-audio-next"]').trigger('click')
        expect(wrapper.emitted('next')).toBeTruthy()
    })
})

describe('OrigamAudio — variant routing', () => {
    it('applies the expanded variant class by default and renders the waveform slider', () => {
        const wrapper = mountAudio({ props: { title: 'Track' } })
        const root = wrapper.find('[data-cy="origam-audio"]')
        expect(root.classes()).toContain('origam-audio--expanded')
        const waveform = wrapper.find('[data-cy="origam-audio-waveform"]')
        expect(waveform.exists()).toBe(true)
    })

    it('applies the compact variant class and hides the waveform slider', () => {
        const wrapper = mountAudio({ props: { variant: 'compact' } })
        const root = wrapper.find('[data-cy="origam-audio"]')
        expect(root.classes()).toContain('origam-audio--compact')
        const waveform = wrapper.find('[data-cy="origam-audio-waveform"]')
        expect(waveform.exists()).toBe(false)
    })

    it('honours the legacy "minimal" alias as the compact variant', () => {
        const wrapper = mountAudio({ props: { variant: 'minimal' } })
        const root = wrapper.find('[data-cy="origam-audio"]')
        expect(root.classes()).toContain('origam-audio--compact')
    })

    it('flips the cover-position class to right when coverPosition="right"', () => {
        const wrapper = mountAudio({ props: { coverPosition: 'right' } })
        const root = wrapper.find('[data-cy="origam-audio"]')
        expect(root.classes()).toContain('origam-audio--cover-right')
    })
})

describe('OrigamAudio — slot overrides', () => {
    it('replaces the default metadata strip when the #metadata slot is provided', () => {
        const wrapper = mountAudio({
            props: { title: 'Original title' },
            slots: {
                metadata: () => h('div', { 'data-cy': 'custom-meta', class: 'custom-meta' }, 'Custom metadata')
            }
        })
        const meta = wrapper.find('[data-cy="origam-audio-metadata"]')
        expect(meta.exists()).toBe(true)
        expect(wrapper.find('[data-cy="custom-meta"]').exists()).toBe(true)
        expect(meta.text()).toContain('Custom metadata')
        expect(wrapper.find('[data-cy="origam-audio-title"]').exists()).toBe(false)
    })

    it('replaces the default transport when the #controls slot is provided', () => {
        const wrapper = mountAudio({
            slots: {
                controls: () => h('div', { 'data-cy': 'custom-controls' }, 'Custom controls')
            }
        })
        expect(wrapper.find('[data-cy="custom-controls"]').exists()).toBe(true)
        expect(wrapper.find('[data-cy="origam-audio-controls"]').exists()).toBe(false)
    })
})
