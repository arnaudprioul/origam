import {
    onBeforeUnmount,
    onMounted,
    ref,
    type Ref
} from 'vue'

import type {
    IUseVideoPlayerOptions,
    IVideoPlayerMethods,
    IVideoPlayerState
} from '../../interfaces'

/**
 * Inline defaults — same rationale as every other composable in the
 * package: keep the literal values close to the only function that
 * uses them so the lifecycle is obvious at a glance, and so the
 * matching `withDefaults(defineProps<…>())` in `<OrigamVideo>` does
 * not have to import a constant that the SFC compiler would reject
 * (cf. CLAUDE.md "withDefaults() — inline literals only" rule).
 */
const VIDEO_DEFAULT_VOLUME = 1
const VIDEO_DEFAULT_PRELOAD: 'none' | 'metadata' | 'auto' = 'metadata'

/**
 * Predicate that returns true when the user has explicitly requested
 * reduced motion through the OS-level accessibility setting. Used to
 * suppress autoplay — chasing motion is the single most common
 * complaint from users with vestibular sensitivity, and autoplay is
 * the worst offender in a video player.
 */
function prefersReducedMotion (): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Resolve the end of the buffered range to a single number. The native
 * `TimeRanges` API exposes potentially-disjoint chunks (browsers may
 * pre-fetch a few seconds before the playhead AND a chunk at the end
 * of the stream); for a progress UI we only care about the right edge
 * of the latest contiguous chunk, which is `end(length - 1)`.
 */
function readBufferedEnd (video: HTMLVideoElement): number {
    if (!video.buffered || video.buffered.length === 0) return 0
    try {
        return video.buffered.end(video.buffered.length - 1)
    } catch {
        return 0
    }
}

/**
 * Headless video player composable. Owns the runtime state machine
 * (`playing`, `paused`, `currentTime`, `duration`, `buffered`,
 * `volume`, `muted`, `fullscreen`, `pip`, `ready`, `loading`, `error`)
 * and exposes imperative methods that wrap the native
 * `HTMLMediaElement` API.
 *
 * The composable does NOT mount the `<video>` element — consumers pass
 * a ref (or accept the one the composable creates) and bind it on the
 * `<video>` tag themselves. This keeps the headless / styled split
 * clean: `<OrigamVideo>` is just a default skin on top of this state.
 *
 * @example
 * ```ts
 * const videoRef = ref<HTMLVideoElement | null>(null)
 * const { state, methods } = useVideoPlayer({ videoRef, autoplay: false })
 *
 * // template:
 * // <video ref="videoRef" src="…" />
 * ```
 */
export function useVideoPlayer (options: IUseVideoPlayerOptions = {}): {
    videoRef: Ref<HTMLVideoElement | null>
    state: IVideoPlayerState
    methods: IVideoPlayerMethods
} {
    const videoRef: Ref<HTMLVideoElement | null> = options.videoRef ?? ref(null)

    const playing: Ref<boolean> = ref(false)
    const paused: Ref<boolean> = ref(true)
    const currentTime: Ref<number> = ref(0)
    const duration: Ref<number> = ref(NaN)
    const buffered: Ref<number> = ref(0)
    const volume: Ref<number> = ref(VIDEO_DEFAULT_VOLUME)
    const muted: Ref<boolean> = ref(Boolean(options.muted))
    const fullscreen: Ref<boolean> = ref(false)
    const pip: Ref<boolean> = ref(false)
    const ready: Ref<boolean> = ref(false)
    const loading: Ref<boolean> = ref(false)
    const error: Ref<MediaError | Error | null> = ref(null)

    /*********************************************************
     * Imperative methods — every method either short-circuits when no
     * element is bound yet (defensive against an early call before the
     * `<video>` mounts) or forwards to the native API. Async methods
     * swallow rejections into `error.value` so the caller never has to
     * wrap in try/catch.
     ********************************************************/
    const play = async (): Promise<void> => {
        const el = videoRef.value
        if (!el) return
        try {
            await el.play()
        } catch (err) {
            error.value = err instanceof Error ? err : new Error(String(err))
        }
    }

    const pause = (): void => {
        videoRef.value?.pause()
    }

    const seek = (seconds: number): void => {
        const el = videoRef.value
        if (!el) return
        const max = Number.isFinite(el.duration) ? el.duration : seconds
        el.currentTime = Math.max(0, Math.min(seconds, max))
    }

    const setVolume = (value: number): void => {
        const el = videoRef.value
        if (!el) return
        const clamped = Math.max(0, Math.min(1, value))
        el.volume = clamped
        // Native browsers do NOT auto-unmute when you raise the volume
        // — they keep `muted=true` until the user toggles it. We mirror
        // that behaviour so the inline volume slider doesn't appear to
        // do nothing when the player is muted (and surface a UX hint
        // by clearing muted when the volume is raised from zero).
        if (clamped > 0 && el.muted) {
            el.muted = false
        }
    }

    const toggleMute = (): void => {
        const el = videoRef.value
        if (!el) return
        el.muted = !el.muted
    }

    const toggleFullscreen = async (): Promise<void> => {
        const el = videoRef.value
        if (!el || typeof document === 'undefined') return
        try {
            const fsEl = document.fullscreenElement
            if (fsEl) {
                await document.exitFullscreen()
            } else {
                // iOS Safari only exposes `webkitEnterFullscreen` on the
                // `<video>` element itself — the standard
                // `requestFullscreen` Promise either rejects or no-ops.
                // Branch on the presence of the standard API first.
                if (typeof el.requestFullscreen === 'function') {
                    await el.requestFullscreen()
                } else {
                    const legacy = el as unknown as { webkitEnterFullscreen?: () => void }
                    legacy.webkitEnterFullscreen?.()
                }
            }
        } catch (err) {
            error.value = err instanceof Error ? err : new Error(String(err))
        }
    }

    const togglePip = async (): Promise<void> => {
        const el = videoRef.value
        if (!el || typeof document === 'undefined') return
        try {
            if ((document as unknown as { pictureInPictureElement?: Element | null }).pictureInPictureElement) {
                await (document as unknown as { exitPictureInPicture: () => Promise<void> }).exitPictureInPicture()
            } else {
                const requestPip = (el as unknown as { requestPictureInPicture?: () => Promise<PictureInPictureWindow> }).requestPictureInPicture
                if (typeof requestPip === 'function') {
                    await requestPip.call(el)
                }
            }
        } catch (err) {
            error.value = err instanceof Error ? err : new Error(String(err))
        }
    }

    const load = (): void => {
        videoRef.value?.load()
    }

    /*********************************************************
     * Listener bindings — installed in onMounted because we need the
     * element to exist, and the consumer might mount the `<video>`
     * AFTER the composable is invoked (typical flow: setup() calls
     * `useVideoPlayer()`, then the template renders the `<video>`).
     ********************************************************/
    const onPlay = () => {
        playing.value = true
        paused.value = false
    }
    const onPause = () => {
        playing.value = false
        paused.value = true
    }
    const onEnded = () => {
        playing.value = false
        paused.value = true
    }
    const onTimeUpdate = () => {
        const el = videoRef.value
        if (!el) return
        currentTime.value = el.currentTime
        buffered.value = readBufferedEnd(el)
    }
    const onProgress = () => {
        const el = videoRef.value
        if (!el) return
        buffered.value = readBufferedEnd(el)
    }
    const onVolumeChange = () => {
        const el = videoRef.value
        if (!el) return
        volume.value = el.volume
        muted.value = el.muted
    }
    const onLoadedMetadata = () => {
        const el = videoRef.value
        if (!el) return
        duration.value = el.duration
        ready.value = true
        loading.value = false
    }
    const onLoadStart = () => {
        loading.value = true
        error.value = null
    }
    const onCanPlay = () => {
        loading.value = false
    }
    const onWaiting = () => {
        loading.value = true
    }
    const onError = () => {
        loading.value = false
        const el = videoRef.value
        if (el?.error) error.value = el.error
        else error.value = new Error('Unknown video error')
    }
    const onEnterPip = () => {
        pip.value = true
    }
    const onLeavePip = () => {
        pip.value = false
    }
    const onFullscreenChange = () => {
        fullscreen.value = Boolean(document.fullscreenElement)
    }

    const bind = (el: HTMLVideoElement): void => {
        el.addEventListener('play', onPlay)
        el.addEventListener('pause', onPause)
        el.addEventListener('ended', onEnded)
        el.addEventListener('timeupdate', onTimeUpdate)
        el.addEventListener('progress', onProgress)
        el.addEventListener('volumechange', onVolumeChange)
        el.addEventListener('loadedmetadata', onLoadedMetadata)
        el.addEventListener('loadstart', onLoadStart)
        el.addEventListener('canplay', onCanPlay)
        el.addEventListener('waiting', onWaiting)
        el.addEventListener('error', onError)
        el.addEventListener('enterpictureinpicture', onEnterPip as EventListener)
        el.addEventListener('leavepictureinpicture', onLeavePip as EventListener)

        // Hydrate the initial state from whatever the element already
        // has — typical reason: SSR rendered the `<video>` with src and
        // the browser pre-fetched metadata before our composable
        // attached.
        volume.value = el.volume
        muted.value = el.muted || Boolean(options.muted)
        paused.value = el.paused
        playing.value = !el.paused
        if (Number.isFinite(el.duration)) {
            duration.value = el.duration
            ready.value = true
        }

        // Apply autoplay — but only when the OS hasn't asked for
        // reduced motion. The native `autoplay` attribute is set on
        // the element by the host component when this flag is true,
        // so we don't need to call `play()` ourselves; the branch is
        // here to log a one-time warning that the consumer's intent
        // was overridden.
        if (options.autoplay && prefersReducedMotion()) {
            console.warn(
                '[origam:video] `autoplay` requested but the user prefers reduced motion; autoplay was suppressed.'
            )
        }
    }

    const unbind = (el: HTMLVideoElement): void => {
        el.removeEventListener('play', onPlay)
        el.removeEventListener('pause', onPause)
        el.removeEventListener('ended', onEnded)
        el.removeEventListener('timeupdate', onTimeUpdate)
        el.removeEventListener('progress', onProgress)
        el.removeEventListener('volumechange', onVolumeChange)
        el.removeEventListener('loadedmetadata', onLoadedMetadata)
        el.removeEventListener('loadstart', onLoadStart)
        el.removeEventListener('canplay', onCanPlay)
        el.removeEventListener('waiting', onWaiting)
        el.removeEventListener('error', onError)
        el.removeEventListener('enterpictureinpicture', onEnterPip as EventListener)
        el.removeEventListener('leavepictureinpicture', onLeavePip as EventListener)
    }

    onMounted(() => {
        const el = videoRef.value
        if (el) bind(el)
        if (typeof document !== 'undefined') {
            document.addEventListener('fullscreenchange', onFullscreenChange)
        }
    })

    onBeforeUnmount(() => {
        const el = videoRef.value
        if (el) unbind(el)
        if (typeof document !== 'undefined') {
            document.removeEventListener('fullscreenchange', onFullscreenChange)
        }
    })

    return {
        videoRef,
        state: {
            playing,
            paused,
            currentTime,
            duration,
            buffered,
            volume,
            muted,
            fullscreen,
            pip,
            ready,
            loading,
            error
        },
        methods: {
            play,
            pause,
            seek,
            setVolume,
            toggleMute,
            toggleFullscreen,
            togglePip,
            load
        }
    }
}

/**
 * Reduced-motion check exported for the host component — kept here so
 * the single source of truth for "should autoplay run?" stays in the
 * composable, even when the decision is made by the SFC at attribute
 * resolution time (i.e. before the composable's onMounted has fired).
 */
export function shouldSuppressAutoplay (): boolean {
    return prefersReducedMotion()
}

/**
 * Default preload value re-exported so the host component can mirror
 * it in `withDefaults()` without duplicating the literal string.
 * Inline-literal-only constraint on `withDefaults` does not apply here
 * because the SFC inlines the literal at the call-site and only uses
 * this constant in JSDoc.
 */
export { VIDEO_DEFAULT_PRELOAD }
