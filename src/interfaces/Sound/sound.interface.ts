import type { Ref } from 'vue'

import type {
    ICommonsComponentProps,
    ISoundMetadata
} from '../../interfaces'

import type { TSoundControls } from '../../types'

/**
 * A single `<source>` entry when the consumer passes multiple media
 * URLs (typically one `mp3` + one `ogg` so the browser picks whichever
 * codec it can decode).
 */
export interface ISoundSource {
    /** Absolute or root-relative URL to the media file. */
    src: string
    /**
     * MIME type — `"audio/mpeg"`, `"audio/ogg"`, `"audio/wav"`, …
     * Optional but recommended: it lets the browser skip sources it
     * can't decode without a network round-trip.
     */
    type?: string
}

/**
 * Bindings passed to the `#controls` scoped slot of `<OrigamSound>`.
 *
 * The default toolbar is built on top of the exact same surface, so a
 * consumer who replaces the slot has access to the full state machine
 * without re-implementing event listeners.
 */
export interface ISoundScopedSlotBindings {
    /** True while the `<audio>` is decoding samples. */
    playing: boolean
    /** True when playback is paused (or has not started yet). */
    paused: boolean
    /** Current playhead position in seconds. */
    currentTime: number
    /** Total duration in seconds. `NaN` until metadata is loaded. */
    duration: number
    /** End of the buffered range in seconds. */
    buffered: number
    /** Volume between 0 and 1 — independent from `muted`. */
    volume: number
    /** True when the output is muted. Independent from `volume`. */
    muted: boolean
    /** True between `loadstart` and `loadedmetadata`. */
    loading: boolean
    /** Set to the most recent media error (if any), else null. */
    error: MediaError | Error | null
    /** Imperative actions — wired to the underlying `<audio>` element. */
    methods: ISoundPlayerMethods
}

/**
 * Slot signatures for `<OrigamSound>`.
 */
export interface ISoundSlots {
    /** Full toolbar replacement. Receives state + imperative methods. */
    controls?: (bindings: ISoundScopedSlotBindings) => any
    /** Custom cover rendering (replaces the default `<img>`). */
    cover?: () => any
    /** Custom title/artist/album block. */
    metadata?: (bindings: { metadata: ISoundMetadata }) => any
    /** Custom waveform rendering (replaces the default `<canvas>`). */
    waveform?: (bindings: { peaks: Array<number>; currentTime: number; duration: number }) => any
    /** Overlay rendered while an error occurred. */
    error?: (bindings: { error: MediaError | Error }) => any
}

/**
 * Props for `<OrigamSound>`.
 */
export interface ISoundProps extends ICommonsComponentProps {
    /**
     * Media URL — either a single string for `<audio src>`, or an array
     * of `<source>` descriptors when multiple formats are provided. The
     * browser walks the list top-down and picks the first source whose
     * `type` it can decode; pass the most preferred codec first.
     */
    src: string | Array<ISoundSource>
    /**
     * Cover image displayed at the left of the default toolbar. Use
     * this for a single-resolution image; pass an `artwork[]` in
     * `metadata` instead when the OS lock-screen needs multi-resolution
     * variants.
     */
    cover?: string
    /**
     * Metadata block surfaced to the OS through the Media Session API
     * AND rendered in the default toolbar (title / artist / album).
     */
    metadata?: ISoundMetadata
    /**
     * Display the computed waveform above the scrubber. Pass `true` to
     * force the computation (when supported); pass `'auto'` to
     * activate it only when the browser supports `OfflineAudioContext`.
     * Default `false` (no waveform).
     *
     * @default false
     */
    waveform?: boolean | 'auto'
    /**
     * Stroke color for the waveform bars. Default `'currentColor'`,
     * which inherits from the surrounding text color so the waveform
     * blends with the typographic system out of the box.
     *
     * @default 'currentColor'
     */
    waveformColor?: string
    /**
     * Starts playback as soon as `loadedmetadata` fires. Browsers
     * usually require `muted` to be true alongside `autoplay`; the
     * component forces `muted=true` when the consumer asks for
     * autoplay without an explicit `muted` value.
     *
     * **Accessibility:** `autoplay` is suppressed when the user has
     * requested reduced motion (`prefers-reduced-motion: reduce`).
     *
     * @default false
     */
    autoplay?: boolean
    /**
     * Starts the player muted.
     *
     * @default false
     */
    muted?: boolean
    /**
     * Loops playback. The player restarts at `0` when `ended` fires.
     *
     * @default false
     */
    loop?: boolean
    /**
     * Which control surface to render. `'custom'` paints the in-house
     * toolbar; `'native'` exposes the browser's built-in `controls`
     * attribute; `'none'` renders neither so the consumer can drive
     * playback through the `#controls` slot or programmatically.
     *
     * @default 'custom'
     */
    controls?: TSoundControls
    /**
     * Buffering hint. `'metadata'` (default) loads just enough to
     * compute the duration; `'none'` defers everything until the user
     * presses play; `'auto'` lets the browser pre-buffer.
     *
     * @default 'metadata'
     */
    preload?: 'none' | 'metadata' | 'auto'
    /**
     * Mirrors the native `crossorigin` attribute. Required when the
     * media is served from a CORS-enabled origin and the consumer needs
     * `OfflineAudioContext` access to decoded samples (waveform
     * computation in particular).
     */
    crossorigin?: 'anonymous' | 'use-credentials'
}

/**
 * Emits surfaced by `<OrigamSound>`. Event names mirror the native DOM
 * events one-to-one so consumers can move between the wrapper and a
 * vanilla `<audio>` without re-wiring listeners.
 */
export interface ISoundEmits {
    (e: 'play'): void
    (e: 'pause'): void
    (e: 'ended'): void
    (e: 'timeupdate', currentTime: number): void
    (e: 'volumechange', volume: number): void
    (e: 'loadedmetadata', payload: { duration: number }): void
    (e: 'error', err: MediaError | Error): void
    (e: 'waveform', peaks: Array<number>): void
}

/**
 * Options accepted by `useAudioPlayer`. A subset of the public props
 * (no wrapper concerns like `class`, …) plus an `audioRef` getter so
 * the composable can be wired from outside an `<OrigamSound>` host.
 */
export interface IUseAudioPlayerOptions {
    /** Same semantics as `ISoundProps.autoplay`. */
    autoplay?: boolean
    /** Same semantics as `ISoundProps.muted`. */
    muted?: boolean
    /** Same semantics as `ISoundProps.loop`. */
    loop?: boolean
    /** Same semantics as `ISoundProps.preload`. */
    preload?: 'none' | 'metadata' | 'auto'
    /**
     * Resolves to the `HTMLAudioElement` to drive. When omitted, the
     * composable creates an empty ref and expects the consumer to
     * bind it on an `<audio ref>` themselves.
     */
    audioRef?: Ref<HTMLAudioElement | null>
}

/**
 * Reactive state surface returned by `useAudioPlayer`.
 */
export interface ISoundPlayerState {
    playing: Ref<boolean>
    paused: Ref<boolean>
    currentTime: Ref<number>
    duration: Ref<number>
    buffered: Ref<number>
    volume: Ref<number>
    muted: Ref<boolean>
    ready: Ref<boolean>
    loading: Ref<boolean>
    error: Ref<MediaError | Error | null>
}

/**
 * Imperative methods returned by `useAudioPlayer`.
 */
export interface ISoundPlayerMethods {
    play: () => Promise<void>
    pause: () => void
    seek: (seconds: number) => void
    setVolume: (value: number) => void
    toggleMute: () => void
    /** Force a reload of the underlying `<audio>` element. */
    load: () => void
}

/**
 * Options accepted by `useWaveform`.
 */
export interface IUseWaveformOptions {
    /**
     * Number of buckets the audio is reduced to. Higher values mean a
     * smoother visual at the cost of more decoded samples kept in
     * memory.
     *
     * @default 200
     */
    bins?: number
    /**
     * Optional `crossOrigin` flag forwarded to the underlying
     * `fetch()`. Required when the audio is served from a CORS-enabled
     * origin and the host is on a different origin.
     */
    crossOrigin?: 'anonymous' | 'use-credentials'
}
