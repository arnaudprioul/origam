import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_VIDEO_PLAYER_DOC: IComposableDoc = {
    slug: 'use-video-player',
    name: 'useVideoPlayer',
    domain: 'Video',
    icon: 'mdi-video-outline',
    descriptionKey: '',
    descriptionFallback: 'Headless video player composable. Composes the media-shared useMediaPlayer base and adds video-only state (fullscreen, pip) plus methods (enterFullscreen, exitFullscreen, toggleFullscreen, requestPip, exitPip, togglePip). Handles the iOS Safari webkitEnterFullscreen fallback and the document-level fullscreenchange listener.',
    signature: `function useVideoPlayer(
  options?: IUseVideoPlayerOptions
): {
  videoRef: Ref<HTMLVideoElement | null>
  state: IVideoPlayerState
  methods: IVideoPlayerMethods
}`,
    params: [
        {
            name: 'options',
            type: 'IUseVideoPlayerOptions',
            required: false,
            defaultValue: '{}',
            descriptionKey: '',
            descriptionFallback: 'Accepts `videoRef` (bring your own typed ref), `autoplay`, `muted`, `loop`, `preload`. All optional. Autoplay is suppressed when prefers-reduced-motion is active.',
        },
    ],
    returns: [
        {
            name: 'videoRef',
            type: 'Ref<HTMLVideoElement | null>',
            descriptionKey: '',
            descriptionFallback: 'Template ref to bind to the `<video>` element. Reused from `options.videoRef` when provided.',
        },
        {
            name: 'state',
            type: 'IVideoPlayerState',
            descriptionKey: '',
            descriptionFallback: 'All IMediaPlayerState fields (playing, paused, currentTime, duration, buffered, volume, muted, ready, loading, error, playbackRate, remoteAvailable, remoteState) plus `fullscreen: Ref<boolean>` and `pip: Ref<boolean>`.',
        },
        {
            name: 'methods',
            type: 'IVideoPlayerMethods',
            descriptionKey: '',
            descriptionFallback: 'All IMediaPlayerMethods (play, pause, toggle, seek, setVolume, toggleMute, load, skipBackward, skipForward, setPlaybackRate, requestRemotePlayback, stopRemotePlayback) plus `enterFullscreen`, `exitFullscreen`, `toggleFullscreen`, `requestPip`, `exitPip`, `togglePip`.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Custom video player with fullscreen and PIP',
            code: `<script setup lang="ts">
import { useVideoPlayer } from 'origam'

const { videoRef, state, methods } = useVideoPlayer({ muted: true })
</script>

<template>
  <video ref="videoRef" src="/demo.mp4" />
  <div class="controls">
    <button @click="methods.toggle()">
      {{ state.playing.value ? 'Pause' : 'Play' }}
    </button>
    <button @click="methods.toggleFullscreen()">
      {{ state.fullscreen.value ? 'Exit fullscreen' : 'Fullscreen' }}
    </button>
    <button @click="methods.togglePip()">
      {{ state.pip.value ? 'Exit PiP' : 'Picture-in-picture' }}
    </button>
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Using OrigamVideo (recommended)',
            code: `<template>
  <origam-video
    src="/demo.mp4"
    :controls="true"
    :autoplay="false"
  />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-media-player', 'use-audio-player'],
    consumedInterfaces: ['IUseVideoPlayerOptions', 'IVideoPlayerState', 'IVideoPlayerMethods'],
    noteFallback: 'useVideoPlayer adds video-only APIs on top of useMediaPlayer. The fullscreen implementation falls back to `webkitEnterFullscreen` on iOS Safari. PIP uses the standard `requestPictureInPicture` API and silently no-ops on browsers that do not support it (Firefox desktop).',
}
