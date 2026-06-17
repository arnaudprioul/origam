import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_MEDIA_PLAYER_DOC: IComposableDoc = {
    slug: 'use-media-player',
    name: 'useMediaPlayer',
    domain: 'Media',
    icon: 'mdi-play-circle-outline',
    descriptionKey: '',
    descriptionFallback: 'Headless media player engine shared by useAudioPlayer and useVideoPlayer. Owns all HTMLMediaElement event bindings (play, pause, ended, timeupdate, progress, volumechange, loadedmetadata, loadstart, canplay, waiting, error, ratechange) plus the Remote Playback API (cast / AirPlay). Suppresses autoplay when prefers-reduced-motion is active.',
    signature: `function useMediaPlayer(
  options?: IUseMediaPlayerOptions
): {
  mediaRef: Ref<HTMLMediaElement | null>
  state: IMediaPlayerState
  methods: IMediaPlayerMethods
}`,
    params: [
        {
            name: 'options',
            type: 'IUseMediaPlayerOptions',
            required: false,
            defaultValue: '{}',
            descriptionKey: '',
            descriptionFallback: 'Accepts `mediaRef` (bring your own ref), `autoplay`, `muted`, `loop`, `preload`. All optional. When `autoplay` is true but the OS prefers-reduced-motion setting is active, a console warning is emitted and autoplay is suppressed.',
        },
    ],
    returns: [
        {
            name: 'mediaRef',
            type: 'Ref<HTMLMediaElement | null>',
            descriptionKey: '',
            descriptionFallback: 'Template ref to bind to the native `<audio>` or `<video>` element. Reused from `options.mediaRef` when provided.',
        },
        {
            name: 'state',
            type: 'IMediaPlayerState',
            descriptionKey: '',
            descriptionFallback: 'Reactive object: playing (Ref<boolean>), paused (Ref<boolean>), currentTime (Ref<number>), duration (Ref<number>), buffered (Ref<number>), volume (Ref<number>), muted (Ref<boolean>), ready (Ref<boolean>), loading (Ref<boolean>), error (Ref<MediaError | Error | null>), playbackRate (Ref<number>), remoteAvailable (Ref<boolean>), remoteState (Ref<"disconnected" | "connecting" | "connected">).',
        },
        {
            name: 'methods',
            type: 'IMediaPlayerMethods',
            descriptionKey: '',
            descriptionFallback: 'Imperative controls: play(), pause(), toggle(), seek(seconds), setVolume(value), toggleMute(), load(), skipBackward(seconds), skipForward(seconds), setPlaybackRate(rate), requestRemotePlayback(), stopRemotePlayback(). All async methods swallow rejections into state.error.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Custom video player UI',
            code: `<script setup lang="ts">
import { useMediaPlayer } from 'origam'
import { ref } from 'vue'

const mediaRef = ref<HTMLVideoElement | null>(null)
const { state, methods } = useMediaPlayer({ mediaRef, muted: true })
</script>

<template>
  <video ref="mediaRef" src="/demo.mp4" />
  <div class="controls">
    <button @click="methods.toggle()">
      {{ state.playing.value ? 'Pause' : 'Play' }}
    </button>
    <input
      type="range"
      :max="state.duration.value"
      :value="state.currentTime.value"
      @input="(e) => methods.seek(Number((e.target as HTMLInputElement).value))"
    />
    <button @click="methods.toggleMute()">
      {{ state.muted.value ? 'Unmute' : 'Mute' }}
    </button>
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-audio-player', 'use-video-player', 'use-waveform'],
    consumedInterfaces: ['IUseMediaPlayerOptions', 'IMediaPlayerState', 'IMediaPlayerMethods'],
    noteFallback: 'useMediaPlayer is the single source of truth for HTMLMediaElement event wiring in origam. Specialised composables (useAudioPlayer, useVideoPlayer) layer type-narrowing and medium-specific features (fullscreen, PIP) on top of this base without duplicating the listener code.',
}
