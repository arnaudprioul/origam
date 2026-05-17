import type { Ref } from 'vue'

import type {
    IMediaPlayerEmits,
    IMediaPlayerMethods,
    IMediaPlayerState
} from '../../interfaces'

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
