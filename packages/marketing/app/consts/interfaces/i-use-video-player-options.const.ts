import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_VIDEO_PLAYER_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-video-player-options',
    name: 'IUseVideoPlayerOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_video_player_options.description',
    descriptionFallback: 'Options accepted by useVideoPlayer. Extends the media-agnostic IUseMediaPlayerOptions shape (minus mediaRef) and adds a videoRef so the composable can be wired from outside an OrigamVideo host.',
    definition: `export interface IUseVideoPlayerOptions extends Omit<IUseMediaPlayerOptions, 'mediaRef'> {
    videoRef?: Ref<HTMLVideoElement | null>
}`,
    extends: ['IUseMediaPlayerOptions'],
    props: [
        { name: 'videoRef', type: 'Ref<HTMLVideoElement | null>', optional: true, descriptionFallback: 'Resolves to the HTMLVideoElement to drive. When omitted, the composable creates an empty ref and expects the consumer to bind it on a <video ref> themselves.' },
        { name: 'autoplay', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Inherited from IUseMediaPlayerOptions. Suppress autoplay when the user has requested reduced motion.' },
        { name: 'muted', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Inherited from IUseMediaPlayerOptions. Initial muted state.' },
        { name: 'loop', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Inherited from IUseMediaPlayerOptions. Loop on ended.' },
        { name: 'preload', type: "'none' | 'metadata' | 'auto'", optional: true, default: "'metadata'", descriptionFallback: 'Inherited from IUseMediaPlayerOptions. Buffering hint passed to the HTMLMediaElement.' },
    ],
    usedBy: [
        { slug: 'use-video-player', name: 'useVideoPlayer', kind: 'composable' },
        { slug: 'video', name: 'Video', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_video_player_options.example',
            titleFallback: 'Wiring useVideoPlayer to a <video> element',
            code: `const videoRef = ref<HTMLVideoElement | null>(null)
const { state, methods } = useVideoPlayer({
    videoRef,
    autoplay: false,
    preload: 'metadata',
})`,
            lang: 'typescript',
        },
    ],
}
