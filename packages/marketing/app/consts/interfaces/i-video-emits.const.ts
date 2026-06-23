import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIDEO_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-video-emits',
    name: 'IVideoEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_video_emits.description',
    descriptionFallback: 'Emits surfaced by OrigamVideo. The event names mirror the native DOM events one-to-one so consumers can move between the wrapper and a vanilla <video> without re-wiring listeners. Extends IMediaPlayerEmits with video-specific events (fullscreen, pip, skip, quality-change, download).',
    definition: `export interface IVideoEmits extends IMediaPlayerEmits {
    (e: 'enterfullscreen'): void
    (e: 'exitfullscreen'): void
    (e: 'enterpip'): void
    (e: 'exitpip'): void
    (e: 'skip', seconds: number): void
    (e: 'quality-change', quality: string): void
    (e: 'download', url: string): void
}`,
    extends: ['IMediaPlayerEmits'],
    props: [
        { name: 'enterfullscreen', type: '() => void', optional: false, descriptionFallback: 'Fired when the player enters fullscreen.' },
        { name: 'exitfullscreen', type: '() => void', optional: false, descriptionFallback: 'Fired when the player exits fullscreen.' },
        { name: 'enterpip', type: '() => void', optional: false, descriptionFallback: 'Fired when the player enters picture-in-picture.' },
        { name: 'exitpip', type: '() => void', optional: false, descriptionFallback: 'Fired when the player exits picture-in-picture.' },
        { name: 'skip', type: '(seconds: number) => void', optional: false, descriptionFallback: 'Skip event — positive seconds = forward, negative = backward. Fired by the centered skip buttons and by the double-tap gesture.' },
        { name: 'quality-change', type: '(quality: string) => void', optional: false, descriptionFallback: 'Fired when the viewer picks a different quality from the settings menu.' },
        { name: 'download', type: '(url: string) => void', optional: false, descriptionFallback: 'Fired when the viewer clicks the "Download" row in the settings menu.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_video_emits.example',
            titleFallback: 'Listening to video-specific emits',
            code: `<OrigamVideo
    src="/video.mp4"
    @enterfullscreen="onFullscreen"
    @skip="onSkip"
    @quality-change="onQuality"
/>`,
            lang: 'html',
        },
    ],
}
