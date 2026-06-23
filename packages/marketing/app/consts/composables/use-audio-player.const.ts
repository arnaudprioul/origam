import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_AUDIO_PLAYER_DOC: IComposableDoc = {
    slug: 'use-audio-player',
    name: 'useAudioPlayer',
    domain: 'Audio',
    icon: 'mdi-headphones',
    descriptionKey: '',
    descriptionFallback: 'Headless audio player composable. A typed wrapper around useMediaPlayer that exposes a typed `audioRef` (HTMLAudioElement) instead of the generic HTMLMediaElement, and reserves a stable extension point for future audio-specific features such as waveform analysis, Web Audio AnalyserNode wiring, and AudioWorklet pipes.',
    signature: `function useAudioPlayer(
  options?: IUseOrigamAudioPlayerOptions
): {
  audioRef: Ref<HTMLAudioElement | null>
  state: IAudioPlayerState
  methods: IAudioPlayerMethods
}`,
    params: [
        {
            name: 'options',
            type: 'IUseOrigamAudioPlayerOptions',
            required: false,
            defaultValue: '{}',
            descriptionKey: '',
            descriptionFallback: 'Optional configuration. Accepts `audioRef` (bring your own ref), `autoplay`, `muted`, `loop`, and `preload`. All fields are optional.',
        },
    ],
    returns: [
        {
            name: 'audioRef',
            type: 'Ref<HTMLAudioElement | null>',
            descriptionKey: '',
            descriptionFallback: 'Template ref to bind to the native `<audio>` element. If `options.audioRef` was provided it is returned as-is; otherwise a new ref is created.',
        },
        {
            name: 'state',
            type: 'IAudioPlayerState',
            descriptionKey: '',
            descriptionFallback: 'Reactive playback state: playing, paused, currentTime, duration, buffered, volume, muted, ready, loading, error, playbackRate, remoteAvailable, remoteState.',
        },
        {
            name: 'methods',
            type: 'IAudioPlayerMethods',
            descriptionKey: '',
            descriptionFallback: 'Imperative controls: play, pause, toggle, seek, setVolume, toggleMute, load, skipBackward, skipForward, setPlaybackRate, requestRemotePlayback, stopRemotePlayback.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Minimal headless audio player',
            code: `<script setup lang="ts">
import { useAudioPlayer } from 'origam'

const { audioRef, state, methods } = useAudioPlayer({ autoplay: false })
</script>

<template>
  <audio ref="audioRef" src="/track.mp3" />
  <button @click="methods.toggle()">
    {{ state.playing.value ? 'Pause' : 'Play' }}
  </button>
  <span>{{ state.currentTime.value.toFixed(1) }} / {{ state.duration.value.toFixed(1) }}s</span>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Using OrigamAudio (recommended)',
            code: `<template>
  <origam-audio src="/track.mp3" :volume="0.8" />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-media-player', 'use-waveform', 'use-audio'],
    consumedInterfaces: ['IUseOrigamAudioPlayerOptions', 'IAudioPlayerState', 'IAudioPlayerMethods'],
    noteFallback: 'useAudioPlayer is a thin typed adapter — all runtime logic lives in useMediaPlayer. Use this composable when building a custom audio UI that needs a properly typed `HTMLAudioElement` ref; use useMediaPlayer directly when the element type is dynamic.',
}
