import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-props',
    name: 'IAudioProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_audio_props.description',
    descriptionFallback: 'Full props contract for <OrigamAudio> — composes useAudioPlayer with OrigamMediaController to paint an opinionated audio card (cover + title/artist + transport bar). Exposes variant, cover, playlist, loop mode, shuffle, waveform, playback rates and the full design surface.',
    definition: `export interface IAudioProps extends ICommonsComponentProps, ITagProps, IRoundedProps, IBorderProps, IDimensionProps, IMarginProps, IPaddingProps, IElevationProps, IPositionProps, IColorProps, IBgColorProps {
    variant?: TAudioVariant
    coverPosition?: TCoverPosition
    src: string | IAudioSource | Array<IAudioSource>
    tracks?: Array<IVideoTrack>
    title?: string
    artist?: string
    album?: string
    cover?: string | ISrcObject
    waveform?: boolean | 'auto'
    waveformColor?: string
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    loopMode?: TAudioLoopMode
    shuffle?: boolean
    playlist?: Array<IAudioTrack>
    currentTrackIndex?: number
    preload?: 'none' | 'metadata' | 'auto'
    crossorigin?: string
    controls?: TAudioControls
    playbackRates?: ReadonlyArray<number>
    playbackRate?: number
    allowRemotePlayback?: boolean
    downloadable?: boolean
    downloadFilename?: string
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'IRoundedProps', 'IBorderProps',
        'IDimensionProps', 'IMarginProps', 'IPaddingProps', 'IElevationProps',
        'IPositionProps', 'IColorProps', 'IBgColorProps',
    ],
    props: [
        { name: 'variant', type: 'TAudioVariant', optional: true, default: "'expanded'", descriptionFallback: "Visual variant: 'expanded' (full strip with waveform) or 'compact' (slim transport dock)." },
        { name: 'coverPosition', type: 'TCoverPosition', optional: true, default: "'left'", descriptionFallback: "Side of the surface where the album cover is painted. The controller sits on the opposite side." },
        { name: 'src', type: 'string | IAudioSource | Array<IAudioSource>', optional: false, descriptionFallback: 'Media URL — a single string, an IAudioSource object or an array for codec fallback.' },
        { name: 'tracks', type: 'Array<IVideoTrack>', optional: true, default: '[]', descriptionFallback: 'Optional captions/chapters tracks attached to the audio element.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Optional title shown above the controls.' },
        { name: 'artist', type: 'string', optional: true, descriptionFallback: 'Optional artist/author shown next to the title.' },
        { name: 'album', type: 'string', optional: true, descriptionFallback: 'Optional album name shown below the artist.' },
        { name: 'cover', type: 'string | ISrcObject', optional: true, descriptionFallback: 'Optional cover image (URL string or ISrcObject for srcset/lazy-src support).' },
        { name: 'waveform', type: "boolean | 'auto'", optional: true, default: 'false', descriptionFallback: "Display the computed waveform above controls. 'auto' activates only when OfflineAudioContext is supported." },
        { name: 'waveformColor', type: 'string', optional: true, default: "'currentColor'", descriptionFallback: 'Stroke colour for the played portion of the waveform bars.' },
        { name: 'autoplay', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Starts playback as soon as loadedmetadata fires. Suppressed when the user has requested reduced motion.' },
        { name: 'muted', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Starts the player muted.' },
        { name: 'loop', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Legacy loop flag — maps to loopMode="one". Prefer loopMode for new code.' },
        { name: 'loopMode', type: 'TAudioLoopMode', optional: true, default: "'none'", descriptionFallback: "Tri-state loop strategy: 'none', 'all' (loop playlist) or 'one' (loop current track)." },
        { name: 'shuffle', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Shuffle the playlist order when navigating with prev/next or auto-advancing.' },
        { name: 'playlist', type: 'Array<IAudioTrack>', optional: true, descriptionFallback: 'Optional list of tracks to play sequentially.' },
        { name: 'currentTrackIndex', type: 'number', optional: true, default: '0', descriptionFallback: 'Index of the currently-active track in the playlist. Supports v-model:currentTrackIndex.' },
        { name: 'preload', type: "'none' | 'metadata' | 'auto'", optional: true, default: "'metadata'", descriptionFallback: "Buffering hint: 'metadata', 'none' or 'auto'." },
        { name: 'crossorigin', type: 'string', optional: true, descriptionFallback: 'Mirrors the native crossorigin attribute. Required when CORS-enabled origin needs WebAudio access.' },
        { name: 'controls', type: 'TAudioControls', optional: true, default: "'custom'", descriptionFallback: "Which control surface to render: 'custom' paints OrigamMediaController; 'native' uses the browser built-in controls." },
        { name: 'playbackRates', type: 'ReadonlyArray<number>', optional: true, default: '[0.5, 0.75, 1, 1.25, 1.5, 2]', descriptionFallback: 'Available playback rates exposed via the config menu.' },
        { name: 'playbackRate', type: 'number', optional: true, default: '1', descriptionFallback: 'Initial playback rate.' },
        { name: 'allowRemotePlayback', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Enable the cast/AirPlay button (Remote Playback API).' },
        { name: 'downloadable', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Adds a Download row to the cog menu.' },
        { name: 'downloadFilename', type: 'string', optional: true, descriptionFallback: 'Override the downloaded file name. Defaults to the trailing segment of the source URL.' },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_props.example',
            titleFallback: 'Audio player with playlist and waveform',
            code: `<OrigamAudio
    :playlist="tracks"
    v-model:current-track-index="activeIndex"
    loop-mode="all"
    :waveform="true"
    cover="/default-cover.jpg"
/>`,
            lang: 'vue',
        },
    ],
}
