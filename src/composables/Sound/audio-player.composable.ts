import {
    onBeforeUnmount,
    onMounted,
    ref,
    type Ref
} from 'vue'

import type {
    ISoundPlayerMethods,
    ISoundPlayerState,
    IUseAudioPlayerOptions
} from '../../interfaces'

/**
 * Inline defaults — same rationale as every other composable in the
 * package: keep the literal values close to the only function that
 * uses them so the lifecycle is obvious at a glance, and so the
 * matching `withDefaults(defineProps<…>())` in `<OrigamSound>` does
 * not have to import a constant that the SFC compiler would reject
 * (cf. CLAUDE.md "withDefaults() — inline literals only" rule).
 */
const AUDIO_DEFAULT_VOLUME = 1

/**
 * Predicate that returns true when the user has explicitly requested
 * reduced motion through the OS-level accessibility setting. We
 * suppress audio autoplay under that flag for the same reason video
 * autoplay is suppressed — unannounced audio is the auditory
 * equivalent of unsolicited motion, and several screen-reader users
 * map "reduce motion" to "do not surprise me".
 */
function prefersReducedMotion (): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Resolve the end of the buffered range to a single number. The native
 * `TimeRanges` API exposes potentially-disjoint chunks; for a progress
 * UI we only care about the right edge of the latest contiguous chunk,
 * which is `end(length - 1)`.
 */
function readBufferedEnd (audio: HTMLAudioElement): number {
    if (!audio.buffered || audio.buffered.length === 0) return 0
    try {
        return audio.buffered.end(audio.buffered.length - 1)
    } catch {
        return 0
    }
}

/**
 * Headless audio player composable. Owns the runtime state machine
 * (`playing`, `paused`, `currentTime`, `duration`, `buffered`,
 * `volume`, `muted`, `ready`, `loading`, `error`) and exposes
 * imperative methods that wrap the native `HTMLMediaElement` API.
 *
 * The composable does NOT mount the `<audio>` element — consumers pass
 * a ref (or accept the one the composable creates) and bind it on the
 * `<audio>` tag themselves. This keeps the headless / styled split
 * clean: `<OrigamSound>` is just a default skin on top of this state.
 *
 * @example
 * ```ts
 * const audioRef = ref<HTMLAudioElement | null>(null)
 * const { state, methods } = useAudioPlayer({ audioRef, autoplay: false })
 *
 * // template:
 * // <audio ref="audioRef" src="…" />
 * ```
 */
export function useAudioPlayer (options: IUseAudioPlayerOptions = {}): {
    audioRef: Ref<HTMLAudioElement | null>
    state: ISoundPlayerState
    methods: ISoundPlayerMethods
} {
    const audioRef: Ref<HTMLAudioElement | null> = options.audioRef ?? ref(null)

    const playing: Ref<boolean> = ref(false)
    const paused: Ref<boolean> = ref(true)
    const currentTime: Ref<number> = ref(0)
    const duration: Ref<number> = ref(NaN)
    const buffered: Ref<number> = ref(0)
    const volume: Ref<number> = ref(AUDIO_DEFAULT_VOLUME)
    const muted: Ref<boolean> = ref(Boolean(options.muted))
    const ready: Ref<boolean> = ref(false)
    const loading: Ref<boolean> = ref(false)
    const error: Ref<MediaError | Error | null> = ref(null)

    /*********************************************************
     * Imperative methods — every method either short-circuits when no
     * element is bound yet (defensive against an early call before the
     * `<audio>` mounts) or forwards to the native API. Async methods
     * swallow rejections into `error.value` so the caller never has to
     * wrap in try/catch.
     ********************************************************/
    const play = async (): Promise<void> => {
        const el = audioRef.value
        if (!el) return
        try {
            await el.play()
        } catch (err) {
            error.value = err instanceof Error ? err : new Error(String(err))
        }
    }

    const pause = (): void => {
        audioRef.value?.pause()
    }

    const seek = (seconds: number): void => {
        const el = audioRef.value
        if (!el) return
        const max = Number.isFinite(el.duration) ? el.duration : seconds
        el.currentTime = Math.max(0, Math.min(seconds, max))
    }

    const setVolume = (value: number): void => {
        const el = audioRef.value
        if (!el) return
        const clamped = Math.max(0, Math.min(1, value))
        el.volume = clamped
        // Native browsers do NOT auto-unmute when you raise the volume
        // — they keep `muted=true` until the user toggles it. We mirror
        // the video composable behaviour so the inline volume slider
        // doesn't appear to do nothing when the player is muted.
        if (clamped > 0 && el.muted) {
            el.muted = false
        }
    }

    const toggleMute = (): void => {
        const el = audioRef.value
        if (!el) return
        el.muted = !el.muted
    }

    const load = (): void => {
        audioRef.value?.load()
    }

    /*********************************************************
     * Listener bindings — installed in onMounted because we need the
     * element to exist, and the consumer might mount the `<audio>`
     * AFTER the composable is invoked (typical flow: setup() calls
     * `useAudioPlayer()`, then the template renders the `<audio>`).
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
        const el = audioRef.value
        if (!el) return
        currentTime.value = el.currentTime
        buffered.value = readBufferedEnd(el)
    }
    const onProgress = () => {
        const el = audioRef.value
        if (!el) return
        buffered.value = readBufferedEnd(el)
    }
    const onVolumeChange = () => {
        const el = audioRef.value
        if (!el) return
        volume.value = el.volume
        muted.value = el.muted
    }
    const onLoadedMetadata = () => {
        const el = audioRef.value
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
        const el = audioRef.value
        if (el?.error) error.value = el.error
        else error.value = new Error('Unknown audio error')
    }

    const bind = (el: HTMLAudioElement): void => {
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

        // Hydrate the initial state from whatever the element already
        // has — typical reason: SSR rendered the `<audio>` with src and
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
                '[origam:sound] `autoplay` requested but the user prefers reduced motion; autoplay was suppressed.'
            )
        }
    }

    const unbind = (el: HTMLAudioElement): void => {
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
    }

    onMounted(() => {
        const el = audioRef.value
        if (el) bind(el)
    })

    onBeforeUnmount(() => {
        const el = audioRef.value
        if (el) unbind(el)
    })

    return {
        audioRef,
        state: {
            playing,
            paused,
            currentTime,
            duration,
            buffered,
            volume,
            muted,
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
export function shouldSuppressAudioAutoplay (): boolean {
    return prefersReducedMotion()
}
