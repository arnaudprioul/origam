/**
 * Props for the low-level Commons `useAudio` composable (frequency
 * analyser + play-on-flag wiring). Renamed from the legacy
 * `IAudioProps` symbol to avoid collision with the canonical
 * `IAudioProps` of `<OrigamAudio>` (`src/interfaces/Audio/`).
 */
export interface IUseAudioProps {
    audio?: string
    playAudio?: boolean
}
