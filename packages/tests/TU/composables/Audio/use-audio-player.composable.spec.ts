// Unit tests for `useAudioPlayer` (Audio namespace).
// This composable is a typed wrapper around `useMediaPlayer`. Tests verify:
//   - The returned surface shape (audioRef, state, methods).
//   - That state defaults are correct.
//   - That the external audioRef option is honoured.
//   - Core method delegations (play/pause/toggle/seek/volume/mute/rate).
//
// Shares the same HTMLMediaElement stubbing pattern as video-player.spec.ts.

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useAudioPlayer } from '@origam/composables/Audio/use-audio-player.composable'

// ─── media stub ──────────────────────────────────────────────────────────────

function patchAudioPrototype (overrides: Partial<HTMLMediaElement> = {}) {
    const proto = HTMLMediaElement.prototype as unknown as Record<string, any>
    const original = { play: proto.play, pause: proto.pause, load: proto.load }
    proto.play = vi.fn().mockResolvedValue(undefined)
    proto.pause = vi.fn()
    proto.load = vi.fn()
    Object.entries(overrides).forEach(([k, v]) => {
        Object.defineProperty(proto, k, { configurable: true, value: v })
    })
    return () => {
        proto.play = original.play
        proto.pause = original.pause
        proto.load = original.load
    }
}

// ─── helpers ────────────────────────────────────────────────────────────────

function createAudioHost (options: Parameters<typeof useAudioPlayer>[0] = {}) {
    let captured: ReturnType<typeof useAudioPlayer> | null = null
    const Host = defineComponent({
        setup () {
            captured = useAudioPlayer(options)
            return () => h('div', [h('audio', { ref: captured!.audioRef })])
        }
    })
    const wrapper = mount(Host)
    return { wrapper, getApi: () => captured! }
}

function getAudio (wrapper: ReturnType<typeof mount>): HTMLAudioElement {
    const el = wrapper.element as HTMLElement
    const audio = el.tagName === 'AUDIO' ? el : el.querySelector('audio')
    if (!audio) throw new Error('no <audio> element found')
    return audio as HTMLAudioElement
}

function dispatchMediaEvent (el: HTMLElement, type: string) {
    el.dispatchEvent(new Event(type))
}

// ─── suite ──────────────────────────────────────────────────────────────────

describe('useAudioPlayer — surface shape', () => {
    let restore: () => void
    beforeEach(() => { restore = patchAudioPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('exposes audioRef, state and methods', async () => {
        const { getApi } = createAudioHost()
        await nextTick()
        const { audioRef, state, methods } = getApi()
        expect(audioRef).toBeDefined()
        expect(state).toBeDefined()
        expect(methods).toBeDefined()
    })

    it('state initialises to safe defaults', async () => {
        const { getApi } = createAudioHost()
        await nextTick()
        const { state } = getApi()
        expect(state.playing.value).toBe(false)
        expect(state.paused.value).toBe(true)
        expect(state.currentTime.value).toBe(0)
        expect(state.muted.value).toBe(false)
        expect(state.volume.value).toBe(1)
        expect(state.ready.value).toBe(false)
        expect(state.loading.value).toBe(false)
        expect(state.error.value).toBeNull()
        expect(state.playbackRate.value).toBe(1)
    })

    it('methods object contains all expected method names', async () => {
        const { getApi } = createAudioHost()
        await nextTick()
        const { methods } = getApi()
        const expected = ['play', 'pause', 'toggle', 'seek', 'setVolume', 'toggleMute',
            'load', 'skipBackward', 'skipForward', 'setPlaybackRate',
            'requestRemotePlayback', 'stopRemotePlayback']
        expected.forEach(name => {
            expect(typeof (methods as Record<string, unknown>)[name]).toBe('function')
        })
    })
})

describe('useAudioPlayer — muted option', () => {
    let restore: () => void
    beforeEach(() => { restore = patchAudioPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('state.muted starts true when muted option is true', async () => {
        const { getApi } = createAudioHost({ muted: true })
        await nextTick()
        expect(getApi().state.muted.value).toBe(true)
    })
})

describe('useAudioPlayer — external audioRef option', () => {
    let restore: () => void
    beforeEach(() => { restore = patchAudioPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('uses the supplied audioRef instead of creating one', async () => {
        const externalRef = ref<HTMLAudioElement | null>(null)
        const { getApi } = createAudioHost({ audioRef: externalRef })
        await nextTick()
        expect(getApi().audioRef).toBe(externalRef)
    })
})

describe('useAudioPlayer — play / pause state via media events', () => {
    let restore: () => void
    beforeEach(() => { restore = patchAudioPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('state.playing becomes true on play event', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        dispatchMediaEvent(audio, 'play')
        expect(getApi().state.playing.value).toBe(true)
        expect(getApi().state.paused.value).toBe(false)
    })

    it('state.playing becomes false on pause event', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        dispatchMediaEvent(audio, 'play')
        dispatchMediaEvent(audio, 'pause')
        expect(getApi().state.playing.value).toBe(false)
        expect(getApi().state.paused.value).toBe(true)
    })

    it('state transitions to not-playing on ended event', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        dispatchMediaEvent(audio, 'play')
        dispatchMediaEvent(audio, 'ended')
        expect(getApi().state.playing.value).toBe(false)
    })
})

describe('useAudioPlayer — loadedmetadata / loadstart / canplay / waiting', () => {
    let restore: () => void
    beforeEach(() => { restore = patchAudioPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('ready=true and loading=false after loadedmetadata', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)

        Object.defineProperty(audio, 'duration', { configurable: true, value: 120 })
        dispatchMediaEvent(audio, 'loadedmetadata')

        expect(getApi().state.ready.value).toBe(true)
        expect(getApi().state.loading.value).toBe(false)
        expect(getApi().state.duration.value).toBe(120)
    })

    it('loading=true on loadstart, false on canplay', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)

        dispatchMediaEvent(audio, 'loadstart')
        expect(getApi().state.loading.value).toBe(true)
        expect(getApi().state.error.value).toBeNull()

        dispatchMediaEvent(audio, 'canplay')
        expect(getApi().state.loading.value).toBe(false)
    })

    it('loading=true on waiting event', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)

        dispatchMediaEvent(audio, 'waiting')
        expect(getApi().state.loading.value).toBe(true)
    })
})

describe('useAudioPlayer — methods (imperative)', () => {
    let restore: () => void
    beforeEach(() => { restore = patchAudioPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('methods.play() calls el.play()', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        const playSpy = vi.spyOn(audio, 'play').mockResolvedValue(undefined)
        await getApi().methods.play()
        expect(playSpy).toHaveBeenCalled()
    })

    it('methods.pause() calls el.pause()', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        const pauseSpy = vi.spyOn(audio, 'pause')
        getApi().methods.pause()
        expect(pauseSpy).toHaveBeenCalled()
    })

    it('methods.seek() clamps to [0, duration]', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        Object.defineProperty(audio, 'duration', { configurable: true, value: 60 })

        getApi().methods.seek(-5)
        expect(audio.currentTime).toBe(0)

        getApi().methods.seek(100)
        expect(audio.currentTime).toBe(60)

        getApi().methods.seek(30)
        expect(audio.currentTime).toBe(30)
    })

    it('methods.setVolume() clamps to [0, 1]', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)

        getApi().methods.setVolume(2)
        expect(audio.volume).toBe(1)

        getApi().methods.setVolume(-1)
        expect(audio.volume).toBe(0)
    })

    it('methods.toggleMute() flips muted flag', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)

        audio.muted = false
        getApi().methods.toggleMute()
        expect(audio.muted).toBe(true)

        getApi().methods.toggleMute()
        expect(audio.muted).toBe(false)
    })

    it('methods.setPlaybackRate() clamps to [0.25, 4]', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)

        getApi().methods.setPlaybackRate(0.1)
        expect(audio.playbackRate).toBe(0.25)

        getApi().methods.setPlaybackRate(10)
        expect(audio.playbackRate).toBe(4)

        getApi().methods.setPlaybackRate(1.5)
        expect(audio.playbackRate).toBe(1.5)
        expect(getApi().state.playbackRate.value).toBe(1.5)
    })

    it('methods.skipBackward() subtracts from currentTime', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        Object.defineProperty(audio, 'duration', { configurable: true, value: 60 })
        Object.defineProperty(audio, 'currentTime', { configurable: true, writable: true, value: 30 })

        getApi().methods.skipBackward(10)
        expect(audio.currentTime).toBe(20)
    })

    it('methods.skipForward() adds to currentTime', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        Object.defineProperty(audio, 'duration', { configurable: true, value: 60 })
        Object.defineProperty(audio, 'currentTime', { configurable: true, writable: true, value: 30 })

        getApi().methods.skipForward(10)
        expect(audio.currentTime).toBe(40)
    })

    it('methods.load() calls el.load()', async () => {
        const { wrapper, getApi } = createAudioHost()
        await nextTick()
        const audio = getAudio(wrapper)
        const loadSpy = vi.spyOn(audio, 'load')
        getApi().methods.load()
        expect(loadSpy).toHaveBeenCalled()
    })
})

describe('useAudioPlayer — no-op when mediaRef is null', () => {
    let restore: () => void
    beforeEach(() => { restore = patchAudioPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('methods do not throw when called before the element is mounted', () => {
        const externalRef = ref<HTMLAudioElement | null>(null)
        const Host = defineComponent({
            setup () {
                const api = useAudioPlayer({ audioRef: externalRef })
                return () => h('div') // no <audio> tag → ref stays null
            }
        })
        const { getApi } = { getApi: (() => {
            let api!: ReturnType<typeof useAudioPlayer>
            const H = defineComponent({
                setup () {
                    api = useAudioPlayer({ audioRef: externalRef })
                    return () => h('div')
                }
            })
            mount(H)
            return () => api
        })() }

        expect(() => getApi().methods.play()).not.toThrow()
        expect(() => getApi().methods.pause()).not.toThrow()
        expect(() => getApi().methods.seek(10)).not.toThrow()
        expect(() => getApi().methods.setVolume(0.5)).not.toThrow()
        expect(() => getApi().methods.toggleMute()).not.toThrow()
        expect(() => getApi().methods.load()).not.toThrow()
    })
})
