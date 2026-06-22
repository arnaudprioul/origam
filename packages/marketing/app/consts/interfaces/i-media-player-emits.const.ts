import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_PLAYER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-player-emits',
    name: 'IMediaPlayerEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_media_player_emits.description',
    descriptionFallback: 'Shared media event signatures. Composables themselves do NOT emit — consumers wire their own emits from the state refs. This interface is kept for documentation and for components that want to surface the same shape on their public emit contract.',
    definition: `export interface IMediaPlayerEmits {
    (e: 'play'): void
    (e: 'pause'): void
    (e: 'ended'): void
    (e: 'timeupdate', currentTime: number): void
    (e: 'volumechange', volume: number): void
    (e: 'loadedmetadata', payload: { duration: number }): void
    (e: 'error', err: MediaError | Error): void
    (e: 'update:playbackRate', rate: number): void
}`,
    extends: [],
    props: [
        { name: 'play', type: '() => void', optional: false, descriptionFallback: 'Fired when playback starts.' },
        { name: 'pause', type: '() => void', optional: false, descriptionFallback: 'Fired when playback is paused.' },
        { name: 'ended', type: '() => void', optional: false, descriptionFallback: 'Fired when the current track or video finishes.' },
        { name: 'timeupdate', type: '(currentTime: number) => void', optional: false, descriptionFallback: 'Fired as the playhead advances. Payload is the current time in seconds.' },
        { name: 'volumechange', type: '(volume: number) => void', optional: false, descriptionFallback: 'Fired when the volume or muted state changes. Payload is the new linear volume [0, 1].' },
        { name: 'loadedmetadata', type: '(payload: { duration: number }) => void', optional: false, descriptionFallback: 'Fired when the browser has loaded enough metadata to report duration.' },
        { name: 'error', type: '(err: MediaError | Error) => void', optional: false, descriptionFallback: 'Fired when a playback or network error occurs.' },
        { name: 'update:playbackRate', type: '(rate: number) => void', optional: false, descriptionFallback: 'Two-way v-model binding for playback rate. Fired when the user picks a rate from the config menu.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_player_emits.example',
            titleFallback: 'Listening to media events',
            code: `<OrigamVideo
    src="/video.mp4"
    @play="onPlay"
    @ended="onEnded"
    @timeupdate="onTimeUpdate"
/>`,
            lang: 'vue',
        },
    ],
}
