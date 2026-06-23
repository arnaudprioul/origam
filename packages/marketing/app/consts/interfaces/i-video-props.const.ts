import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIDEO_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-video-props',
    name: 'IVideoProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_video_props.description',
    descriptionFallback: 'Props for OrigamVideo. Extends the standard DS visual interfaces (color, dimension, rounded, border, margin, padding, elevation) with media-specific controls: src, poster, tracks, autoplay, loop, aspect-ratio, fullscreen, PIP, skip, quality switching, and download.',
    definition: `export interface IVideoProps extends ICommonsComponentProps, IColorProps, IBgColorProps, IDimensionProps, IRoundedProps, IBorderProps, IMarginProps, IPaddingProps, IElevationProps {
    src: string | Array<IVideoSource>
    poster?: string
    tracks?: Array<IVideoTrack>
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    controls?: TVideoControls
    playsInline?: boolean
    preload?: 'none' | 'metadata' | 'auto'
    aspectRatio?: string
    crossorigin?: 'anonymous' | 'use-credentials'
    disablePictureInPicture?: boolean
    skipSeconds?: number
    showCenterControls?: boolean
    playbackRates?: ReadonlyArray<number>
    playbackRate?: number
    inset?: boolean
    allowRemotePlayback?: boolean
    doubleTapToSkip?: boolean
    downloadable?: boolean
    downloadFilename?: string
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'IDimensionProps', 'IRoundedProps', 'IBorderProps', 'IMarginProps', 'IPaddingProps', 'IElevationProps'],
    props: [
        { name: 'src', type: 'string | Array<IVideoSource>', optional: false, descriptionFallback: 'Media URL — either a single string for <video src>, or an array of source descriptors for codec fallback.' },
        { name: 'poster', type: 'string', optional: true, descriptionFallback: 'Image rendered before playback starts. Maps to the native poster attribute when the #poster slot is not used.' },
        { name: 'tracks', type: 'Array<IVideoTrack>', optional: true, default: '[]', descriptionFallback: 'Captions / subtitles / chapter tracks attached to the player.' },
        { name: 'autoplay', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Starts playback as soon as loadedmetadata fires. Suppressed when the user has requested reduced motion.' },
        { name: 'muted', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Starts the player muted.' },
        { name: 'loop', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Loops playback. The player restarts at 0 when ended fires.' },
        { name: 'controls', type: 'TVideoControls', optional: true, default: "'custom'", descriptionFallback: 'Which control surface to render: custom, native, or none.' },
        { name: 'playsInline', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Mirrors the native playsinline attribute. Required on iOS to keep the player inside the page.' },
        { name: 'preload', type: "'none' | 'metadata' | 'auto'", optional: true, default: "'metadata'", descriptionFallback: 'Buffering hint.' },
        { name: 'aspectRatio', type: 'string', optional: true, default: "'16/9'", descriptionFallback: 'CSS aspect-ratio value applied to the wrapper. Accepts presets or any raw value.' },
        { name: 'crossorigin', type: "'anonymous' | 'use-credentials'", optional: true, descriptionFallback: 'Mirrors the native crossorigin attribute. Required for canvas / WebAudio access.' },
        { name: 'disablePictureInPicture', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Disables the picture-in-picture button and keyboard shortcut.' },
        { name: 'skipSeconds', type: 'number', optional: true, default: '30', descriptionFallback: 'Seconds skipped by the ±skip buttons. Pass 0 to hide the skip buttons.' },
        { name: 'showCenterControls', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Show the centered ±skip buttons + play/pause overlay on hover.' },
        { name: 'playbackRates', type: 'ReadonlyArray<number>', optional: true, default: '[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]', descriptionFallback: 'Available playback rates exposed via the config menu.' },
        { name: 'playbackRate', type: 'number', optional: true, default: '1', descriptionFallback: 'Initial playback rate.' },
        { name: 'inset', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Controls overlaid on the video bottom edge with auto-hide while playing.' },
        { name: 'allowRemotePlayback', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Enable the cast / AirPlay button (Remote Playback API).' },
        { name: 'doubleTapToSkip', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Enable double-tap gestures on touch devices.' },
        { name: 'downloadable', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Adds a "Download" row to the settings menu.' },
        { name: 'downloadFilename', type: 'string', optional: true, descriptionFallback: 'Override the downloaded file name.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_video_props.example',
            titleFallback: 'Basic OrigamVideo usage',
            code: `<OrigamVideo
    src="/video.mp4"
    aspect-ratio="16/9"
    :autoplay="false"
    :muted="true"
    controls="custom"
    :downloadable="true"
/>`,
            lang: 'html',
        },
    ],
}
