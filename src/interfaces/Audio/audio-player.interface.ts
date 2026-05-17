import type { Ref } from 'vue'

import type {
    IBorderProps,
    ICommonsComponentProps,
    IMarginProps,
    IMediaPlayerEmits,
    IMediaPlayerMethods,
    IMediaPlayerState,
    IPaddingProps,
    IRoundedProps,
    ISrcObject,
    ITagProps,
    IVideoTrack
} from '../../interfaces'

import type { TAudioControls } from '../../types'

/**
 * A single `<source>` entry when the consumer passes multiple audio
 * URLs (typically one `mp3` + one `ogg` so the browser picks
 * whichever codec it can decode).
 *
 * Mirrors `IVideoSource` minus the video-specific fields
 * (`quality`, `label`).
 */
export interface IAudioSource {
    /** Absolute or root-relative URL to the audio file. */
    src: string
    /**
     * MIME type — `"audio/mpeg"`, `"audio/ogg"`, `"audio/wav"`,
     * `"application/vnd.apple.mpegurl"` for HLS, etc. Optional but
     * recommended: it lets the browser skip sources it can't decode
     * without a network round-trip.
     */
    type?: string
}

/**
 * Bindings handed to the `#controls` scoped slot of `<OrigamAudio>`.
 * State is exposed as plain unwrapped values (snapshot at render
 * time) — Vue's render-driven reactivity re-invokes the slot on
 * every meaningful change.
 */
export interface IAudioScopedSlotBindings {
    playing: boolean
    paused: boolean
    currentTime: number
    duration: number
    buffered: number
    volume: number
    muted: boolean
    playbackRate: number
    loading: boolean
    error: MediaError | Error | null
    methods: IAudioPlayerMethods
}

/**
 * Slot signatures for `<OrigamAudio>`.
 */
export interface IAudioSlots {
    /** Override the entire title/artist/cover strip. */
    metadata?: () => any
    /** Override the cover image / placeholder. */
    cover?: () => any
    /** Override the title rendering. */
    title?: () => any
    /** Override the entire controls (replaces the default
     *  `<OrigamMediaController>`). */
    controls?: (bindings: IAudioScopedSlotBindings) => any
    /** Overlay rendered while the media is loading. */
    loading?: () => any
    /** Overlay rendered when an error occurred. */
    error?: (bindings: { error: MediaError | Error }) => any
}

/**
 * Props for `<OrigamAudio>` — composes the headless `useAudioPlayer`
 * with `<OrigamMediaController>` to paint an opinionated audio card
 * (cover + title/artist + transport bar). Designed to drop into a
 * page without surrounding chrome.
 */
export interface IAudioProps
    extends ICommonsComponentProps,
        ITagProps,
        IRoundedProps,
        IBorderProps,
        IMarginProps,
        IPaddingProps {
    /**
     * Media URL — either a single string for `<audio src>`, an
     * `IAudioSource` object (`{ src, type }`), or an array of sources
     * for codec fallback. The browser walks the array top-down and
     * picks the first source whose `type` it can decode.
     */
    src: string | IAudioSource | Array<IAudioSource>
    /**
     * Optional captions / chapters tracks attached to the `<audio>`.
     * Reuses the video track shape (kind / src / srclang / label /
     * default) so consumers learn the API once.
     *
     * @default []
     */
    tracks?: Array<IVideoTrack>
    /**
     * Optional title shown above the controls (e.g. `"Podcast Episode 42"`).
     */
    title?: string
    /**
     * Optional artist / author shown next to the title.
     */
    artist?: string
    /**
     * Optional cover image shown next to the title. Accepts a URL
     * string or an `ISrcObject` for srcset / lazy-src support.
     */
    cover?: string | ISrcObject
    /**
     * Starts playback as soon as `loadedmetadata` fires. Most
     * browsers require `muted=true` alongside `autoplay`; the
     * component forces `muted=true` when the consumer asks for
     * autoplay without an explicit `muted` value.
     *
     * **Accessibility:** `autoplay` is suppressed when the user has
     * requested reduced motion.
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
     * Buffering hint. `'metadata'` (default) loads just enough to
     * compute the duration; `'none'` defers everything until the
     * user presses play; `'auto'` lets the browser pre-buffer.
     *
     * @default 'metadata'
     */
    preload?: 'none' | 'metadata' | 'auto'
    /**
     * Mirrors the native `crossorigin` attribute. Required when the
     * media is served from a CORS-enabled origin and the consumer
     * needs WebAudio access to the decoded samples.
     */
    crossorigin?: string
    /**
     * Which control surface to render. `'custom'` paints the
     * `<OrigamMediaController>` shell; `'native'` exposes the
     * browser's built-in `controls` attribute on the `<audio>`.
     *
     * @default 'custom'
     */
    controls?: TAudioControls
    /**
     * Available playback rates exposed via the config menu.
     *
     * @default [0.5, 0.75, 1, 1.25, 1.5, 2]
     */
    playbackRates?: ReadonlyArray<number>
    /**
     * Initial playback rate. The runtime value is exposed via the
     * `update:playbackRate` emit.
     *
     * @default 1
     */
    playbackRate?: number
    /**
     * Enable the cast / AirPlay button (Remote Playback API). The
     * button only renders when this flag is true AND at least one
     * cast-capable device is detected.
     *
     * @default false
     */
    allowRemotePlayback?: boolean
    /**
     * Adds a "Download" row to the cog menu that lets the listener
     * download the currently-playing audio file.
     *
     * @default false
     */
    downloadable?: boolean
    /**
     * Override the downloaded file name. Defaults to the trailing
     * segment of the source URL.
     */
    downloadFilename?: string
}

/**
 * Emits surfaced by `<OrigamAudio>`. Event names mirror the native
 * DOM events one-to-one so consumers can move between the wrapper
 * and a vanilla `<audio>` without re-wiring listeners.
 */
export interface IAudioEmits {
    (e: 'play'): void
    (e: 'pause'): void
    (e: 'ended'): void
    (e: 'timeupdate', event: Event): void
    (e: 'volumechange', event: Event): void
    (e: 'loadedmetadata', event: Event): void
    (e: 'error', payload: Event | MediaError | Error): void
    /** Two-way binding for the playback rate. The component DOES NOT
     *  set this in response to the consumer's prop changes — only
     *  when the user picks a rate from the config menu. */
    (e: 'update:playbackRate', rate: number): void
    /** Fired when the listener clicks the "Download" row in the
     *  config menu. Payload is the URL of the file. */
    (e: 'download', url: string): void
}

/**
 * Reactive state surface returned by `useAudioPlayer` (Audio
 * namespace). For the moment audio does not expose any state beyond
 * the media-agnostic baseline — the alias exists so future
 * audio-specific extensions (e.g. waveform analysis, frequency bins
 * via Web Audio API) have a home without breaking the
 * `IAudioPlayerState` import path on consumers.
 *
 * Note: distinct from `ISoundPlayerState` exposed by `<OrigamSound>`,
 * which carries its own waveform-aware composable.
 */
export interface IAudioPlayerState extends IMediaPlayerState {}

/**
 * Imperative methods returned by `useAudioPlayer` (Audio namespace).
 * Like the state, no audio-specific commands today — kept as a
 * separate symbol so the Composable layer can grow without churn on
 * consumer types.
 */
export interface IAudioPlayerMethods extends IMediaPlayerMethods {}

/**
 * Emit signatures recommended for audio host components. Same shape
 * as the media baseline — composable does NOT emit; this interface
 * is for the host SFC's `defineEmits` contract.
 */
export interface IAudioPlayerEmits extends IMediaPlayerEmits {}

/**
 * Options accepted by `useAudioPlayer` (Audio namespace). Named
 * distinctly from the legacy `IUseAudioPlayerOptions` in the Sound
 * namespace so both can coexist in the public barrel.
 */
export interface IUseOrigamAudioPlayerOptions {
    /** Suppress autoplay when the user has requested reduced motion. */
    autoplay?: boolean
    /** Initial muted state. */
    muted?: boolean
    /** Loop on `ended`. */
    loop?: boolean
    /** Buffering hint. */
    preload?: 'none' | 'metadata' | 'auto'
    /**
     * Resolves to the `HTMLAudioElement` to drive. When omitted, the
     * composable creates an empty ref and expects the consumer to
     * `bind` it on a `<audio ref>` themselves.
     */
    audioRef?: Ref<HTMLAudioElement | null>
}
