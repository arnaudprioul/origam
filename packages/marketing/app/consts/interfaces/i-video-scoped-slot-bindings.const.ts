import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIDEO_SCOPED_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-video-scoped-slot-bindings',
    name: 'IVideoScopedSlotBindings',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_video_scoped_slot_bindings.description',
    descriptionFallback: 'Bindings passed to the #controls scoped slot of OrigamVideo. The default toolbar is built on top of the exact same surface, so a consumer who replaces the slot has access to the full state machine without re-implementing event listeners.',
    definition: `export interface IVideoScopedSlotBindings {
    playing: boolean
    paused: boolean
    currentTime: number
    duration: number
    buffered: number
    volume: number
    muted: boolean
    fullscreen: boolean
    pip: boolean
    loading: boolean
    error: MediaError | Error | null
    playbackRate: number
    remoteAvailable: boolean
    remoteState: 'disconnected' | 'connecting' | 'connected'
    methods: IVideoPlayerMethods
}`,
    extends: [],
    props: [
        { name: 'playing', type: 'boolean', optional: false, descriptionFallback: 'True while the <video> is decoding frames and producing audio.' },
        { name: 'paused', type: 'boolean', optional: false, descriptionFallback: 'True when playback is paused (or has not started yet).' },
        { name: 'currentTime', type: 'number', optional: false, descriptionFallback: 'Current playhead position in seconds.' },
        { name: 'duration', type: 'number', optional: false, descriptionFallback: 'Total duration in seconds. NaN until metadata is loaded.' },
        { name: 'buffered', type: 'number', optional: false, descriptionFallback: 'End of the buffered range in seconds.' },
        { name: 'volume', type: 'number', optional: false, descriptionFallback: 'Volume between 0 and 1 — independent from muted.' },
        { name: 'muted', type: 'boolean', optional: false, descriptionFallback: 'True when the output is muted. Independent from volume.' },
        { name: 'fullscreen', type: 'boolean', optional: false, descriptionFallback: 'True when the element (or wrapper) is in fullscreen.' },
        { name: 'pip', type: 'boolean', optional: false, descriptionFallback: 'True when the video is in picture-in-picture.' },
        { name: 'loading', type: 'boolean', optional: false, descriptionFallback: 'True between loadstart and loadedmetadata — used by the loader overlay.' },
        { name: 'error', type: 'MediaError | Error | null', optional: false, descriptionFallback: 'Set to the most recent media error (if any), else null.' },
        { name: 'playbackRate', type: 'number', optional: false, descriptionFallback: 'Current playback rate (1 = normal).' },
        { name: 'remoteAvailable', type: 'boolean', optional: false, descriptionFallback: 'True when at least one Remote Playback target is available on the network.' },
        { name: 'remoteState', type: "'disconnected' | 'connecting' | 'connected'", optional: false, descriptionFallback: 'Connection lifecycle from the Remote Playback API.' },
        { name: 'methods', type: 'IVideoPlayerMethods', optional: false, descriptionFallback: 'Imperative actions — wired to the underlying <video> element.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_video_scoped_slot_bindings.example',
            titleFallback: 'Rendering a custom controls bar with scoped slot bindings',
            code: `<OrigamVideo src="/video.mp4">
    <template #controls="{ playing, currentTime, duration, methods }">
        <button @click="methods.togglePlay()">
            {{ playing ? 'Pause' : 'Play' }}
        </button>
        <span>{{ currentTime }} / {{ duration }}</span>
    </template>
</OrigamVideo>`,
            lang: 'html',
        },
    ],
}
