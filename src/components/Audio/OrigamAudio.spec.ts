// Unit tests for <OrigamAudio> — covers the bridge between
// `useAudioPlayer` and the `<OrigamMediaController>` shell. Tests
// stay hermetic by stubbing the OrigamMediaController + OrigamImg
// children (their behaviour is covered by their own specs).

import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import OrigamAudio from './OrigamAudio.vue'

import { ORIGAM_LOCALE_KEY } from '../../consts'

import type { IAudioSource } from '../../interfaces'

const stubLocale = (): any => ({
    t: (key: string, ...args: Array<unknown>) => {
        if (args.length === 0) return key
        return `${key}|${args.join(',')}`
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
                OrigamMediaController: {
                    props: ['state', 'methods', 'playbackRates', 'allowRemotePlayback', 'downloadable', 'downloadUrl'],
                    template: '<div class="origam-media-controller-stub" data-cy="origam-audio-controls" />'
                }
            }
        },
        props: {
            src: 'https://example.com/track.mp3',
            ...opts.props
        },
        slots: opts.slots
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
        // autoplay attribute may be the string 'true' or absent in stubs;
        // we assert via the DOM property to be portable across jsdom.
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
    it('does NOT mount the controller and sets the native controls attribute when controls="native"', () => {
        const wrapper = mountAudio({ props: { controls: 'native' } })
        const audio = wrapper.find('audio')
        const el = audio.element as HTMLAudioElement
        expect(el.controls).toBe(true)
        expect(wrapper.find('[data-cy="origam-audio-controls"]').exists()).toBe(false)
    })

    it('mounts the controller and leaves the native controls off when controls="custom"', () => {
        const wrapper = mountAudio({ props: { controls: 'custom' } })
        const audio = wrapper.find('audio')
        const el = audio.element as HTMLAudioElement
        expect(el.controls).toBe(false)
        expect(wrapper.find('[data-cy="origam-audio-controls"]').exists()).toBe(true)
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
        // The default title rendering is replaced.
        expect(wrapper.find('[data-cy="origam-audio-title"]').exists()).toBe(false)
    })

    it('replaces the default controller when the #controls slot is provided', () => {
        const wrapper = mountAudio({
            slots: {
                controls: () => h('div', { 'data-cy': 'custom-controls' }, 'Custom controls')
            }
        })
        expect(wrapper.find('[data-cy="custom-controls"]').exists()).toBe(true)
        expect(wrapper.find('[data-cy="origam-audio-controls"]').exists()).toBe(false)
    })
})
