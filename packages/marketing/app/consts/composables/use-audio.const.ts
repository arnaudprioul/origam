import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_AUDIO_DOC: IComposableDoc = {
    slug: 'use-audio',
    name: 'useAudio',
    domain: 'Commons',
    icon: 'mdi-waveform',
    descriptionKey: '',
    descriptionFallback: 'Wire an <audio> element to the Web Audio API for frequency analysis and playback control. Tracks play/pause state, creates an AnalyserNode on first play to feed real-time frequency data (Uint8Array), and reacts to prop changes to reset playback when the audio source changes.',
    signature: `function useAudio(props: IUseAudioProps): {
  audioData: ShallowRef<Uint8Array | null>
  analyser: Ref<AnalyserNode | null>
  audioRef: Ref<HTMLAudioElement | undefined>
  wasPlayed: Ref<boolean>
  isPlaying: Ref<boolean>
  onPlay: () => void
  onStop: () => void
}`,
    params: [
        {
            name: 'props',
            type: 'IUseAudioProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props object with audio (URL of the audio source) and playAudio (boolean flag). When playAudio changes to true the composable calls onPlay(); when it changes to false it calls onStop(). When audio changes, wasPlayed and isPlaying are reset.',
        },
    ],
    returns: [
        {
            name: 'audioData',
            type: 'ShallowRef<Uint8Array | null>',
            descriptionKey: '',
            descriptionFallback: 'Shallow ref holding the AnalyserNode\'s frequency-bin byte array. Updated every animation frame while playing. Bind to a visualiser (e.g. OrigamAudio waveform bars).',
        },
        {
            name: 'analyser',
            type: 'Ref<AnalyserNode | null>',
            descriptionKey: '',
            descriptionFallback: 'The Web Audio AnalyserNode created on first play. Null until onPlay() is called at least once. fftSize is fixed at 256 (128 frequency bins).',
        },
        {
            name: 'audioRef',
            type: 'Ref<HTMLAudioElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Template ref to assign to the native <audio> element. The composable calls .play() and .pause() on it.',
        },
        {
            name: 'wasPlayed',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True after the first play invocation. Used to create the AudioContext only once per audio source — re-creating it on every play would leak nodes.',
        },
        {
            name: 'isPlaying',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Reactive playback state. True while the audio is playing and the animation loop is running.',
        },
        {
            name: 'onPlay',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Start playback. Creates the AudioContext on first call, starts the requestAnimationFrame loop to fill audioData, and sets isPlaying to true.',
        },
        {
            name: 'onStop',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Pause playback, stop the animation loop, and set isPlaying to false.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Basic audio player with frequency visualiser',
            code: `<script setup lang="ts">
import { useAudio } from 'origam'

const props = defineProps<{ audio?: string; playAudio?: boolean }>()

const { audioRef, isPlaying, audioData, onPlay, onStop } = useAudio(props)
</script>

<template>
  <audio ref="audioRef" :src="audio" />
  <button @click="isPlaying ? onStop() : onPlay()">
    {{ isPlaying ? 'Pause' : 'Play' }}
  </button>
  <canvas v-if="audioData" />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-audio-player', 'use-waveform'],
    consumedInterfaces: ['IUseAudioProps'],
    noteFallback: 'useAudio is the low-level Web Audio API bridge. <OrigamAudio> wraps it with a full playback UI and waveform visualiser. Use useAudio directly only when building custom audio UIs.',
}
