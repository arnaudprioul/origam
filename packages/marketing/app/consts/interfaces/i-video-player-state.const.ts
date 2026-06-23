import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIDEO_PLAYER_STATE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-video-player-state',
    name: 'IVideoPlayerState',
    category: 'Composable Returns',
    descriptionKey: 'interfaces.catalog.i_video_player_state.description',
    descriptionFallback: 'Reactive state surface returned by useVideoPlayer. Extends the media-shared IMediaPlayerState baseline with video-specific reactive refs: fullscreen and pip.',
    definition: `export interface IVideoPlayerState extends IMediaPlayerState {
    fullscreen: Ref<boolean>
    pip: Ref<boolean>
}`,
    extends: ['IMediaPlayerState'],
    props: [
        { name: 'fullscreen', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the element (or wrapper) is in fullscreen.' },
        { name: 'pip', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the video is in picture-in-picture.' },
    ],
    usedBy: [
        { slug: 'use-video-player', name: 'useVideoPlayer', kind: 'composable' },
        { slug: 'video', name: 'Video', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_video_player_state.example',
            titleFallback: 'Reading fullscreen and PIP state',
            code: `const { state } = useVideoPlayer({ videoRef })
// Reactive fullscreen flag
console.log(state.fullscreen.value) // false
console.log(state.pip.value)        // false`,
            lang: 'typescript',
        },
    ],
}
