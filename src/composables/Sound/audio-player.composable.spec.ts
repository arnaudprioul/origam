// Unit tests for `useAudioPlayer` — covers the headless state machine
// (play/pause/ended/timeupdate, buffered, volume, muted) on top of a
// stubbed `HTMLAudioElement`. We don't try to test real CSS / DOM
// behaviour here (the e2e spec does).

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { shouldSuppressAudioAutoplay, useAudioPlayer } from './audio-player.composable'

function createHost (options: Parameters<typeof useAudioPlayer>[0] = {}) {
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
    if (!audio) throw new Error('no <audio> element found in host')
    return audio as HTMLAudioElement
}

function patchAudioPrototype (overrides: Partial<HTMLMediaElement> = {}) {
    const proto = HTMLMediaElement.prototype as unknown as Record<string, any>
    const original = {
        play: proto.play,
        pause: proto.pause,
        load: proto.load
    }
    proto.play = vi.fn().mockResolvedValue(undefined)
    proto.pause = vi.fn()
    proto.load = vi.fn()
    Object.entries(overrides).forEach(([key, value]) => {
        Object.defineProperty(proto, key, { configurable: true, value })
    })
    return () => {
        proto.play = original.play
        proto.pause = original.pause
        proto.load = original.load
    }
}

describe('useAudioPlayer', () => {
    let restore: () => void
    beforeEach(() => {
        restore = patchAudioPrototype()
    })
    afterEach(() => {
        restore()
        vi.restoreAllMocks()
    })

    it('exposes the documented state surface initialised to safe defaults', async () => {
        const { getApi } = createHost()
        await nextTick()
        const { state } = getApi()
        expect(state.playing.value).toBe(false)
        expect(state.paused.value).toBe(true)
        expect(state.currentTime.value).toBe(0)
        expect(state.volume.value).toBeGreaterThanOrEqual(0)
        expect(state.muted.value).toBe(false)
        expect(state.error.value).toBeNull()
    })

    it('flips `playing` / `paused` on the native play and pause events', async () => {
        const { wrapper, getApi } = createHost()
        await nextTick()
        const { state } = getApi()
        const audio = getAudio(wrapper)

        audio.dispatchEvent(new Event('play'))
        expect(state.playing.value).toBe(true)
        expect(state.paused.value).toBe(false)

        audio.dispatchEvent(new Event('pause'))
        expect(state.playing.value).toBe(false)
        expect(state.paused.value).toBe(true)
    })

    it('updates `currentTime` on the timeupdate event', async () => {
        const { wrapper, getApi } = createHost()
        await nextTick()
        const { state } = getApi()
        const audio = getAudio(wrapper)
        Object.defineProperty(audio, 'currentTime', { configurable: true, value: 42 })

        audio.dispatchEvent(new Event('timeupdate'))
        expect(state.currentTime.value).toBe(42)
    })

    it('updates `duration` and clears `loading` on loadedmetadata', async () => {
        const { wrapper, getApi } = createHost()
        await nextTick()
        const { state } = getApi()
        const audio = getAudio(wrapper)
        Object.defineProperty(audio, 'duration', { configurable: true, value: 187.5 })

        audio.dispatchEvent(new Event('loadstart'))
        expect(state.loading.value).toBe(true)

        audio.dispatchEvent(new Event('loadedmetadata'))
        expect(state.duration.value).toBe(187.5)
        expect(state.loading.value).toBe(false)
        expect(state.ready.value).toBe(true)
    })

    it('captures errors from the error event', async () => {
        const { wrapper, getApi } = createHost()
        await nextTick()
        const { state } = getApi()
        const audio = getAudio(wrapper)

        audio.dispatchEvent(new Event('error'))
        expect(state.error.value).not.toBeNull()
    })

    it('seek() clamps to [0, duration]', async () => {
        const { wrapper, getApi } = createHost()
        await nextTick()
        const { methods } = getApi()
        const audio = getAudio(wrapper)
        Object.defineProperty(audio, 'duration', { configurable: true, value: 60 })

        let writes = 0
        let last = 0
        Object.defineProperty(audio, 'currentTime', {
            configurable: true,
            get () { return last },
            set (v: number) { writes++; last = v }
        })

        methods.seek(-5)
        expect(last).toBe(0)
        methods.seek(120)
        expect(last).toBe(60)
        methods.seek(30)
        expect(last).toBe(30)
        expect(writes).toBe(3)
    })

    it('setVolume() clamps to [0, 1] and unmutes when the new value is non-zero', async () => {
        const { wrapper, getApi } = createHost()
        await nextTick()
        const { methods } = getApi()
        const audio = getAudio(wrapper)

        let vol = 0
        let mute = true
        Object.defineProperty(audio, 'volume', {
            configurable: true,
            get () { return vol },
            set (v: number) { vol = v }
        })
        Object.defineProperty(audio, 'muted', {
            configurable: true,
            get () { return mute },
            set (v: boolean) { mute = v }
        })

        methods.setVolume(1.5)
        expect(vol).toBe(1)
        expect(mute).toBe(false)

        methods.setVolume(-0.2)
        expect(vol).toBe(0)
    })

    it('toggleMute() flips the muted flag on the element', async () => {
        const { wrapper, getApi } = createHost()
        await nextTick()
        const { methods } = getApi()
        const audio = getAudio(wrapper)

        let mute = false
        Object.defineProperty(audio, 'muted', {
            configurable: true,
            get () { return mute },
            set (v: boolean) { mute = v }
        })

        methods.toggleMute()
        expect(mute).toBe(true)
        methods.toggleMute()
        expect(mute).toBe(false)
    })

    it('emits a console warning when autoplay is requested while prefers-reduced-motion is set', async () => {
        const matchMedia = vi.fn().mockReturnValue({ matches: true, media: '(prefers-reduced-motion: reduce)' })
        Object.defineProperty(window, 'matchMedia', { configurable: true, value: matchMedia })
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

        createHost({ autoplay: true })
        await nextTick()

        expect(warn).toHaveBeenCalled()
        expect(String(warn.mock.calls[0]?.[0] ?? '')).toContain('reduced motion')
    })

    it('shouldSuppressAudioAutoplay() reports the prefers-reduced-motion outcome', () => {
        const matchMedia = vi.fn().mockReturnValue({ matches: true })
        Object.defineProperty(window, 'matchMedia', { configurable: true, value: matchMedia })
        expect(shouldSuppressAudioAutoplay()).toBe(true)
    })

    it('accepts an externally-supplied audioRef so the consumer can drive the binding', async () => {
        const externalRef = ref<HTMLAudioElement | null>(null)
        let api: ReturnType<typeof useAudioPlayer> | null = null
        const Host = defineComponent({
            setup () {
                api = useAudioPlayer({ audioRef: externalRef })
                return () => h('div', [h('audio', { ref: externalRef })])
            }
        })
        const wrapper = mount(Host)
        await nextTick()
        expect(api!.audioRef).toBe(externalRef)
        const audio = getAudio(wrapper)
        expect(audio).toBeTruthy()
    })
})
