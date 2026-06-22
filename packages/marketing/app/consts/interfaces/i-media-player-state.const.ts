import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_PLAYER_STATE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-player-state',
    name: 'IMediaPlayerState',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_media_player_state.description',
    descriptionFallback: 'Reactive state surface returned by useMediaPlayer — the media-agnostic base shared between useVideoPlayer and useAudioPlayer. All fields are Vue Refs so they are directly bindable in templates.',
    definition: `export interface IMediaPlayerState {
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
    playbackRate: Ref<number>
    remoteAvailable: Ref<boolean>
    remoteState: Ref<'disconnected' | 'connecting' | 'connected'>
}`,
    extends: [],
    props: [
        { name: 'playing', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True while the element is decoding frames / producing audio.' },
        { name: 'paused', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when playback is paused (or has not started yet).' },
        { name: 'currentTime', type: 'Ref<number>', optional: false, descriptionFallback: 'Current playhead position in seconds.' },
        { name: 'duration', type: 'Ref<number>', optional: false, descriptionFallback: 'Total duration in seconds. NaN until metadata loads. Can be Infinity for live streams — consumers must guard max UI bindings with Number.isFinite().' },
        { name: 'buffered', type: 'Ref<number>', optional: false, descriptionFallback: 'End of the buffered range in seconds (the right edge of the last contiguous chunk the browser can play without stalling).' },
        { name: 'volume', type: 'Ref<number>', optional: false, descriptionFallback: 'Volume between 0 and 1 — independent from muted.' },
        { name: 'muted', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the output is muted. Independent from volume.' },
        { name: 'ready', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True once metadata has loaded and duration is finite.' },
        { name: 'loading', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True between loadstart and loadedmetadata (or waiting).' },
        { name: 'error', type: 'Ref<MediaError | Error | null>', optional: false, descriptionFallback: 'Last media error captured by the composable, if any.' },
        { name: 'playbackRate', type: 'Ref<number>', optional: false, descriptionFallback: 'Current playback rate. 1 = normal speed.' },
        { name: 'remoteAvailable', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when at least one Remote Playback device is reachable.' },
        { name: 'remoteState', type: "Ref<'disconnected' | 'connecting' | 'connected'>", optional: false, descriptionFallback: 'Connection state of the Remote Playback session.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
        { slug: 'media-controller', name: 'MediaController', kind: 'component' },
        { slug: 'use-media-player', name: 'useMediaPlayer', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_player_state.example',
            titleFallback: 'Binding reactive state from useMediaPlayer',
            code: `const { state } = useMediaPlayer({ mediaRef })
// Direct template binding — no .value needed in templates
// state.playing, state.currentTime, state.duration`,
            lang: 'typescript',
        },
    ],
}
