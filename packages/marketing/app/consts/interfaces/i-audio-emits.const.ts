import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-emits',
    name: 'IAudioEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_audio_emits.description',
    descriptionFallback: 'Emits surfaced by <OrigamAudio>. Event names mirror native DOM audio events one-to-one, plus v-model bindings for playbackRate, currentTrackIndex, loopMode and shuffle.',
    definition: `export interface IAudioEmits {
    (e: 'play'): void
    (e: 'pause'): void
    (e: 'ended'): void
    (e: 'timeupdate', event: Event): void
    (e: 'volumechange', event: Event): void
    (e: 'loadedmetadata', event: Event): void
    (e: 'error', payload: Event | MediaError | Error): void
    (e: 'update:playbackRate', rate: number): void
    (e: 'download', url: string): void
    (e: 'waveform', peaks: Array<number>): void
    (e: 'previous'): void
    (e: 'next'): void
    (e: 'update:currentTrackIndex', index: number): void
    (e: 'update:loopMode', mode: TAudioLoopMode): void
    (e: 'update:shuffle', shuffle: boolean): void
    (e: 'track-change', track: IAudioTrack, index: number): void
}`,
    extends: [],
    props: [
        { name: 'play', type: '() => void', optional: false, descriptionFallback: 'Fired when playback starts.' },
        { name: 'pause', type: '() => void', optional: false, descriptionFallback: 'Fired when playback is paused.' },
        { name: 'ended', type: '() => void', optional: false, descriptionFallback: 'Fired when the current track finishes.' },
        { name: 'timeupdate', type: '(event: Event) => void', optional: false, descriptionFallback: 'Fired as the playhead advances. Carries the native Event.' },
        { name: 'volumechange', type: '(event: Event) => void', optional: false, descriptionFallback: 'Fired when the volume or muted state changes.' },
        { name: 'loadedmetadata', type: '(event: Event) => void', optional: false, descriptionFallback: 'Fired when the browser has loaded enough metadata to report duration.' },
        { name: 'error', type: '(payload: Event | MediaError | Error) => void', optional: false, descriptionFallback: 'Fired when a playback or network error occurs.' },
        { name: 'update:playbackRate', type: '(rate: number) => void', optional: false, descriptionFallback: 'Two-way v-model binding for playback rate. Fired when the user picks a rate from the config menu.' },
        { name: 'download', type: '(url: string) => void', optional: false, descriptionFallback: 'Fired when the listener clicks the Download entry in the config menu. Payload is the file URL.' },
        { name: 'waveform', type: '(peaks: Array<number>) => void', optional: false, descriptionFallback: 'Fired once per waveform recomputation. Payload is downsampled peaks (0..1 amplitudes).' },
        { name: 'previous', type: '() => void', optional: false, descriptionFallback: 'Fired when the listener clicks the previous track button.' },
        { name: 'next', type: '() => void', optional: false, descriptionFallback: 'Fired when the listener clicks the next track button.' },
        { name: 'update:currentTrackIndex', type: '(index: number) => void', optional: false, descriptionFallback: 'Two-way v-model binding for the active playlist track index.' },
        { name: 'update:loopMode', type: '(mode: TAudioLoopMode) => void', optional: false, descriptionFallback: 'Two-way v-model binding for the loop mode. Fired when the user cycles the loop button.' },
        { name: 'update:shuffle', type: '(shuffle: boolean) => void', optional: false, descriptionFallback: 'Two-way v-model binding for the shuffle flag.' },
        { name: 'track-change', type: '(track: IAudioTrack, index: number) => void', optional: false, descriptionFallback: 'Fired whenever the active track changes (manual click, prev/next or auto-advance).' },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_emits.example',
            titleFallback: 'Listening to track-change on OrigamAudio',
            code: `<OrigamAudio
    :src="track.src"
    @track-change="onTrackChange"
    @ended="onEnded"
/>`,
            lang: 'vue',
        },
    ],
}
