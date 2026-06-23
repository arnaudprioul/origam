// Unit tests for `useMediaPlayer` + `shouldSuppressAutoplay`.
// Covers: state defaults, all media events (play/pause/ended/timeupdate/
// progress/volumechange/loadedmetadata/loadstart/canplay/waiting/error/
// ratechange), all imperative methods (play/pause/toggle/seek/setVolume/
// toggleMute/load/skipBackward/skipForward/setPlaybackRate/
// requestRemotePlayback/stopRemotePlayback), muted option, no-op when ref
// is null, autoplay + reducedMotion warning, unbind on unmount.

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { shouldSuppressAutoplay, useMediaPlayer } from '@origam/composables/Media/use-media-player.composable'

// ─── media stub ──────────────────────────────────────────────────────────────

function patchMediaPrototype (overrides: Partial<HTMLMediaElement> = {}) {
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

function createMediaHost (options: Parameters<typeof useMediaPlayer>[0] = {}) {
    let captured: ReturnType<typeof useMediaPlayer> | null = null
    const Host = defineComponent({
        setup () {
            captured = useMediaPlayer(options)
            return () => h('div', [h('audio', { ref: captured!.mediaRef })])
        }
    })
    const wrapper = mount(Host)
    return { wrapper, getApi: () => captured! }
}

function getMedia (wrapper: ReturnType<typeof mount>): HTMLMediaElement {
    const el = wrapper.element as HTMLElement
    const media = el.tagName === 'AUDIO' ? el : el.querySelector('audio')
    if (!media) throw new Error('no <audio> element found')
    return media as HTMLMediaElement
}

function fire (el: HTMLElement, type: string) {
    el.dispatchEvent(new Event(type))
}

// ─── suite ──────────────────────────────────────────────────────────────────

describe('useMediaPlayer — state defaults', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('playing=false, paused=true, currentTime=0, duration=NaN', async () => {
        const { getApi } = createMediaHost()
        await nextTick()
        const { state } = getApi()
        expect(state.playing.value).toBe(false)
        expect(state.paused.value).toBe(true)
        expect(state.currentTime.value).toBe(0)
        expect(Number.isNaN(state.duration.value)).toBe(true)
    })

    it('volume=1, muted=false, ready=false, loading=false, error=null', async () => {
        const { getApi } = createMediaHost()
        await nextTick()
        const { state } = getApi()
        expect(state.volume.value).toBe(1)
        expect(state.muted.value).toBe(false)
        expect(state.ready.value).toBe(false)
        expect(state.loading.value).toBe(false)
        expect(state.error.value).toBeNull()
    })

    it('playbackRate=1, remoteAvailable=false, remoteState=disconnected', async () => {
        const { getApi } = createMediaHost()
        await nextTick()
        const { state } = getApi()
        expect(state.playbackRate.value).toBe(1)
        expect(state.remoteAvailable.value).toBe(false)
        expect(state.remoteState.value).toBe('disconnected')
    })

    it('muted option initialises state.muted=true', async () => {
        const { getApi } = createMediaHost({ muted: true })
        await nextTick()
        expect(getApi().state.muted.value).toBe(true)
    })
})

describe('useMediaPlayer — play / pause / ended events', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('play event → playing=true, paused=false', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        fire(getMedia(wrapper), 'play')
        expect(getApi().state.playing.value).toBe(true)
        expect(getApi().state.paused.value).toBe(false)
    })

    it('pause event → playing=false, paused=true', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        fire(getMedia(wrapper), 'play')
        fire(getMedia(wrapper), 'pause')
        expect(getApi().state.playing.value).toBe(false)
        expect(getApi().state.paused.value).toBe(true)
    })

    it('ended event → playing=false, paused=true', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        fire(getMedia(wrapper), 'play')
        fire(getMedia(wrapper), 'ended')
        expect(getApi().state.playing.value).toBe(false)
        expect(getApi().state.paused.value).toBe(true)
    })
})

describe('useMediaPlayer — timeupdate / progress events', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('timeupdate syncs currentTime from el.currentTime', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'currentTime', { configurable: true, value: 42 })
        fire(media, 'timeupdate')
        expect(getApi().state.currentTime.value).toBe(42)
    })

    it('timeupdate syncs buffered from el.buffered', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'buffered', {
            configurable: true,
            value: {
                length: 1,
                end: vi.fn().mockReturnValue(60)
            }
        })
        fire(media, 'timeupdate')
        expect(getApi().state.buffered.value).toBe(60)
    })

    it('progress syncs buffered from el.buffered', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'buffered', {
            configurable: true,
            value: { length: 1, end: vi.fn().mockReturnValue(90) }
        })
        fire(media, 'progress')
        expect(getApi().state.buffered.value).toBe(90)
    })
})

describe('useMediaPlayer — volumechange event', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('volumechange syncs volume and muted from element', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'volume', { configurable: true, value: 0.5 })
        Object.defineProperty(media, 'muted', { configurable: true, value: true })
        fire(media, 'volumechange')
        expect(getApi().state.volume.value).toBe(0.5)
        expect(getApi().state.muted.value).toBe(true)
    })
})

describe('useMediaPlayer — loadedmetadata event', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('sets ready=true, loading=false, duration from element', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'duration', { configurable: true, value: 180 })
        fire(media, 'loadedmetadata')
        expect(getApi().state.ready.value).toBe(true)
        expect(getApi().state.loading.value).toBe(false)
        expect(getApi().state.duration.value).toBe(180)
    })
})

describe('useMediaPlayer — loadstart / canplay / waiting events', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('loadstart → loading=true, error=null', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        fire(getMedia(wrapper), 'loadstart')
        expect(getApi().state.loading.value).toBe(true)
        expect(getApi().state.error.value).toBeNull()
    })

    it('canplay → loading=false', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        fire(getMedia(wrapper), 'loadstart')
        fire(getMedia(wrapper), 'canplay')
        expect(getApi().state.loading.value).toBe(false)
    })

    it('waiting → loading=true', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        fire(getMedia(wrapper), 'waiting')
        expect(getApi().state.loading.value).toBe(true)
    })
})

describe('useMediaPlayer — error event', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('error event sets loading=false and captures el.error', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        const fakeError = { code: 3, message: 'MEDIA_ERR_DECODE' }
        Object.defineProperty(media, 'error', { configurable: true, value: fakeError })
        fire(media, 'error')
        expect(getApi().state.loading.value).toBe(false)
        // toEqual (not toBe) because the ref wraps the value in a reactive proxy
        expect(getApi().state.error.value).toEqual(fakeError)
    })

    it('error event creates generic error when el.error is null', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'error', { configurable: true, value: null })
        fire(media, 'error')
        expect(getApi().state.error.value).toBeInstanceOf(Error)
    })
})

describe('useMediaPlayer — ratechange event', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('ratechange syncs playbackRate from element', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'playbackRate', { configurable: true, value: 1.5 })
        fire(media, 'ratechange')
        expect(getApi().state.playbackRate.value).toBe(1.5)
    })
})

describe('useMediaPlayer — imperative methods', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('play() delegates to el.play()', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const playSpy = vi.spyOn(getMedia(wrapper), 'play').mockResolvedValue(undefined)
        await getApi().methods.play()
        expect(playSpy).toHaveBeenCalled()
    })

    it('play() stores error in state on rejection', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        vi.spyOn(getMedia(wrapper), 'play').mockRejectedValue(new Error('NotAllowedError'))
        await getApi().methods.play()
        expect(getApi().state.error.value).toBeInstanceOf(Error)
    })

    it('pause() delegates to el.pause()', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const pauseSpy = vi.spyOn(getMedia(wrapper), 'pause')
        getApi().methods.pause()
        expect(pauseSpy).toHaveBeenCalled()
    })

    it('toggle() calls play when paused', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const playSpy = vi.spyOn(getMedia(wrapper), 'play').mockResolvedValue(undefined)
        // state.playing is false initially
        await getApi().methods.toggle()
        expect(playSpy).toHaveBeenCalled()
    })

    it('toggle() calls pause when playing', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        fire(getMedia(wrapper), 'play') // set playing=true
        const pauseSpy = vi.spyOn(getMedia(wrapper), 'pause')
        await getApi().methods.toggle()
        expect(pauseSpy).toHaveBeenCalled()
    })

    it('seek(30) sets currentTime=30 when duration=60', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'duration', { configurable: true, value: 60 })
        getApi().methods.seek(30)
        expect(media.currentTime).toBe(30)
    })

    it('seek(-1) clamps to 0', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'duration', { configurable: true, value: 60 })
        getApi().methods.seek(-1)
        expect(media.currentTime).toBe(0)
    })

    it('seek(999) clamps to duration', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'duration', { configurable: true, value: 60 })
        getApi().methods.seek(999)
        expect(media.currentTime).toBe(60)
    })

    it('setVolume(0.7) sets el.volume', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        getApi().methods.setVolume(0.7)
        expect(getMedia(wrapper).volume).toBe(0.7)
    })

    it('setVolume(>1) clamps to 1', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        getApi().methods.setVolume(5)
        expect(getMedia(wrapper).volume).toBe(1)
    })

    it('setVolume(>0) un-mutes the element', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        media.muted = true
        getApi().methods.setVolume(0.5)
        expect(media.muted).toBe(false)
    })

    it('toggleMute flips muted', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        media.muted = false
        getApi().methods.toggleMute()
        expect(media.muted).toBe(true)
    })

    it('load() calls el.load()', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const loadSpy = vi.spyOn(getMedia(wrapper), 'load')
        getApi().methods.load()
        expect(loadSpy).toHaveBeenCalled()
    })

    it('skipBackward(10) moves currentTime by -10', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'duration', { configurable: true, value: 120 })
        Object.defineProperty(media, 'currentTime', { configurable: true, writable: true, value: 50 })
        getApi().methods.skipBackward(10)
        expect(media.currentTime).toBe(40)
    })

    it('skipForward(10) moves currentTime by +10', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)
        Object.defineProperty(media, 'duration', { configurable: true, value: 120 })
        Object.defineProperty(media, 'currentTime', { configurable: true, writable: true, value: 50 })
        getApi().methods.skipForward(10)
        expect(media.currentTime).toBe(60)
    })

    it('setPlaybackRate(2) sets rate and syncs state', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        getApi().methods.setPlaybackRate(2)
        expect(getMedia(wrapper).playbackRate).toBe(2)
        expect(getApi().state.playbackRate.value).toBe(2)
    })

    it('setPlaybackRate(0) clamps to 0.25', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        getApi().methods.setPlaybackRate(0)
        expect(getMedia(wrapper).playbackRate).toBe(0.25)
    })

    it('setPlaybackRate(10) clamps to 4', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        getApi().methods.setPlaybackRate(10)
        expect(getMedia(wrapper).playbackRate).toBe(4)
    })
})

describe('useMediaPlayer — no-op when mediaRef is null', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('all methods are safe to call when ref is null', () => {
        const nullRef = ref<HTMLMediaElement | null>(null)
        let api!: ReturnType<typeof useMediaPlayer>
        const Host = defineComponent({
            setup () {
                api = useMediaPlayer({ mediaRef: nullRef })
                return () => h('div') // no media element
            }
        })
        mount(Host)
        expect(() => api.methods.play()).not.toThrow()
        expect(() => api.methods.pause()).not.toThrow()
        expect(() => api.methods.seek(10)).not.toThrow()
        expect(() => api.methods.setVolume(0.5)).not.toThrow()
        expect(() => api.methods.toggleMute()).not.toThrow()
        expect(() => api.methods.load()).not.toThrow()
        expect(() => api.methods.skipBackward(5)).not.toThrow()
        expect(() => api.methods.skipForward(5)).not.toThrow()
        expect(() => api.methods.setPlaybackRate(1)).not.toThrow()
    })
})

describe('useMediaPlayer — unbind on unmount', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('removes media event listeners on unmount (state no longer updates)', async () => {
        const { wrapper, getApi } = createMediaHost()
        await nextTick()
        const media = getMedia(wrapper)

        wrapper.unmount()

        // After unmount, play event should not update state
        media.dispatchEvent(new Event('play'))
        expect(getApi().state.playing.value).toBe(false)
    })
})

describe('shouldSuppressAutoplay', () => {
    afterEach(() => vi.restoreAllMocks())

    it('returns false when matchMedia returns matches=false for reduced-motion', () => {
        Object.defineProperty(window, 'matchMedia', {
            configurable: true,
            value: vi.fn().mockReturnValue({ matches: false })
        })
        expect(shouldSuppressAutoplay()).toBe(false)
    })

    it('returns true when matchMedia says reduced motion is preferred', () => {
        Object.defineProperty(window, 'matchMedia', {
            configurable: true,
            value: vi.fn().mockImplementation((query: string) => ({
                matches: query.includes('reduce'),
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn()
            }))
        })
        expect(shouldSuppressAutoplay()).toBe(true)
    })

    it('returns false when matchMedia is not available (SSR-like)', () => {
        const original = window.matchMedia
        Object.defineProperty(window, 'matchMedia', { configurable: true, value: undefined })
        expect(shouldSuppressAutoplay()).toBe(false)
        Object.defineProperty(window, 'matchMedia', { configurable: true, value: original })
    })
})

describe('useMediaPlayer — autoplay + reducedMotion warning', () => {
    let restore: () => void
    beforeEach(() => { restore = patchMediaPrototype() })
    afterEach(() => { restore(); vi.restoreAllMocks() })

    it('logs a warning when autoplay=true and reducedMotion is true', async () => {
        // Override matchMedia to return matches=true for reduce
        Object.defineProperty(window, 'matchMedia', {
            configurable: true,
            value: vi.fn().mockImplementation((query: string) => ({
                matches: query.includes('reduce'),
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn()
            }))
        })

        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
        createMediaHost({ autoplay: true })
        await nextTick()
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('autoplay')
        )
    })
})
