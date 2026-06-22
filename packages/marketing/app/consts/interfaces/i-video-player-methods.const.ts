import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIDEO_PLAYER_METHODS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-video-player-methods',
    name: 'IVideoPlayerMethods',
    category: 'Composable Returns',
    descriptionKey: 'interfaces.catalog.i_video_player_methods.description',
    descriptionFallback: 'Imperative methods returned by useVideoPlayer. Extends the media-shared baseline IMediaPlayerMethods with video-specific commands: toggleFullscreen, togglePip, and related enter/exit variants.',
    definition: `export interface IVideoPlayerMethods extends IMediaPlayerMethods {
    enterFullscreen: () => Promise<void>
    exitFullscreen: () => Promise<void>
    toggleFullscreen: () => Promise<void>
    requestPip: () => Promise<void>
    exitPip: () => Promise<void>
    togglePip: () => Promise<void>
}`,
    extends: ['IMediaPlayerMethods'],
    props: [
        { name: 'enterFullscreen', type: '() => Promise<void>', optional: false, descriptionFallback: 'Enter fullscreen (or noop if already in).' },
        { name: 'exitFullscreen', type: '() => Promise<void>', optional: false, descriptionFallback: 'Exit fullscreen (or noop if not in).' },
        { name: 'toggleFullscreen', type: '() => Promise<void>', optional: false, descriptionFallback: 'Convenience: enter or exit based on current state.' },
        { name: 'requestPip', type: '() => Promise<void>', optional: false, descriptionFallback: 'Enter picture-in-picture (or noop if unsupported).' },
        { name: 'exitPip', type: '() => Promise<void>', optional: false, descriptionFallback: 'Exit picture-in-picture (or noop if not in).' },
        { name: 'togglePip', type: '() => Promise<void>', optional: false, descriptionFallback: 'Convenience: enter or exit PIP based on current state.' },
    ],
    usedBy: [
        { slug: 'use-video-player', name: 'useVideoPlayer', kind: 'composable' },
        { slug: 'video', name: 'Video', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_video_player_methods.example',
            titleFallback: 'Using video-specific methods from useVideoPlayer',
            code: `const { state, methods } = useVideoPlayer({ videoRef })
// Toggle fullscreen on button click
await methods.toggleFullscreen()
// Enter PIP
await methods.requestPip()`,
            lang: 'typescript',
        },
    ],
}
