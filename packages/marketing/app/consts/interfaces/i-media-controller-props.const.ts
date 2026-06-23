import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_CONTROLLER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-controller-props',
    name: 'IMediaControllerProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_media_controller_props.description',
    descriptionFallback: 'Props for <OrigamMediaController> — the universal media-controls shell consumed by <OrigamVideo> and <OrigamAudio>. Purely presentational: it receives state and methods from the parent and emits intents back. Audio-specific controls (loop, shuffle, prev/next) are opt-in so video consumers see zero regression.',
    definition: `export interface IMediaControllerProps extends ICommonsComponentProps {
    state: IMediaPlayerState
    methods: IMediaPlayerMethods
    inset?: boolean
    visible?: boolean
    playbackRates?: ReadonlyArray<number>
    allowRemotePlayback?: boolean
    downloadable?: boolean
    downloadUrl?: string | null
    downloadFilename?: string
    qualityOptions?: ReadonlyArray<TQualityOption>
    currentQuality?: string | null
    showPrevious?: boolean
    showNext?: boolean
    showLoop?: boolean
    showShuffle?: boolean
    loopMode?: TAudioLoopMode
    shuffle?: boolean
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'state', type: 'IMediaPlayerState', optional: false, descriptionFallback: 'Reactive media state from useMediaPlayer() (or any specialisation: useVideoPlayer, useAudioPlayer). Required.' },
        { name: 'methods', type: 'IMediaPlayerMethods', optional: false, descriptionFallback: 'Imperative methods from useMediaPlayer(). Required.' },
        { name: 'inset', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'YouTube-style overlay mode: the shell sits on top of the media surface with a dark gradient and auto-hides on visible=false. When false, the shell renders as a regular always-on toolbar.' },
        { name: 'visible', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Visibility flag driven by the parent autohide logic.' },
        { name: 'playbackRates', type: 'ReadonlyArray<number>', optional: true, default: '[0.5, 0.75, 1, 1.25, 1.5, 2]', descriptionFallback: 'Available playback rates exposed via the config menu.' },
        { name: 'allowRemotePlayback', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Enable the cast / AirPlay button (Remote Playback API).' },
        { name: 'downloadable', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Adds a "Download" row to the config menu.' },
        { name: 'downloadUrl', type: 'string | null', optional: true, default: 'null', descriptionFallback: 'URL surfaced to the consumer when "Download" is clicked.' },
        { name: 'downloadFilename', type: 'string', optional: true, descriptionFallback: 'Suggested filename written to the <a download="…"> attribute.' },
        { name: 'qualityOptions', type: 'ReadonlyArray<TQualityOption>', optional: true, default: '[]', descriptionFallback: 'Optional list of quality variants. When the array exposes >= 2 entries, a "Quality" drill-down appears in the config menu.' },
        { name: 'currentQuality', type: 'string | null', optional: true, default: 'null', descriptionFallback: 'Currently-active quality identifier.' },
        { name: 'showPrevious', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Show the "previous" transport button. The parent listens to the previous emit and decides whether to skip back 10s (single-track) or jump to the previous playlist track.' },
        { name: 'showNext', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Show the "next" transport button. Parent owns the action.' },
        { name: 'showLoop', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Show the tri-state loop button (none → all → one → none).' },
        { name: 'showShuffle', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Show the shuffle toggle button.' },
        { name: 'loopMode', type: 'TAudioLoopMode', optional: true, default: "'none'", descriptionFallback: 'Current loop mode. Supports v-model:loopMode. The Controller cycles this on click; the parent observes and applies its playlist / <audio loop> policy.' },
        { name: 'shuffle', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Current shuffle state. Supports v-model:shuffle. The Controller toggles on click; the parent reads and switches its next-track resolution accordingly.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-controller.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_controller_props.example',
            titleFallback: 'Using OrigamMediaController inside a video component',
            code: `<OrigamMediaController
    :state="state"
    :methods="methods"
    :inset="true"
    :visible="controlsVisible"
    :downloadable="true"
    download-url="/video.mp4"
    @download="onDownload"
/>`,
            lang: 'vue',
        },
    ],
}
