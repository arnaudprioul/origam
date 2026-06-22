import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_MEDIA_PLAYER_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-media-player-options',
    name: 'IUseMediaPlayerOptions',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_use_media_player_options.description',
    descriptionFallback: 'Options accepted by useMediaPlayer. The composable is media-agnostic — mediaRef accepts any HTMLMediaElement (audio OR video).',
    definition: `export interface IUseMediaPlayerOptions {
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    preload?: 'none' | 'metadata' | 'auto'
    mediaRef?: Ref<HTMLMediaElement | null>
}`,
    extends: [],
    props: [
        { name: 'autoplay', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Suppress autoplay when the user has requested reduced motion.' },
        { name: 'muted', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Initial muted state.' },
        { name: 'loop', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Loop on ended.' },
        { name: 'preload', type: "'none' | 'metadata' | 'auto'", optional: true, default: "'metadata'", descriptionFallback: 'Buffering hint passed to the HTMLMediaElement.' },
        { name: 'mediaRef', type: 'Ref<HTMLMediaElement | null>', optional: true, descriptionFallback: 'Resolves to the HTMLMediaElement to drive. When omitted, the composable creates an empty ref and expects the consumer to bind it on a <video ref> / <audio ref> themselves.' },
    ],
    usedBy: [
        { slug: 'use-media-player', name: 'useMediaPlayer', kind: 'composable' },
        { slug: 'use-video-player', name: 'useVideoPlayer', kind: 'composable' },
        { slug: 'use-audio-player', name: 'useAudioPlayer', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_media_player_options.example',
            titleFallback: 'Passing options to useMediaPlayer',
            code: `const videoRef = ref<HTMLMediaElement | null>(null)
const { state, methods } = useMediaPlayer({
    mediaRef: videoRef,
    autoplay: false,
    muted: true,
    preload: 'metadata',
})`,
            lang: 'typescript',
        },
    ],
}
