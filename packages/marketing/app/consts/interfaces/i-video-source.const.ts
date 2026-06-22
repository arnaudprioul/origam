import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIDEO_SOURCE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-video-source',
    name: 'IVideoSource',
    category: 'Data Shapes',
    descriptionKey: 'interfaces.catalog.i_video_source.description',
    descriptionFallback: 'A single <source> entry when the consumer passes multiple media URLs to OrigamVideo (typically one mp4 + one webm so the browser picks whichever codec it can decode). Supports optional quality labelling for the in-player quality switcher.',
    definition: `export interface IVideoSource {
    src: string
    type?: string
    quality?: string
    label?: string
}`,
    extends: [],
    props: [
        { name: 'src', type: 'string', optional: false, descriptionFallback: 'Absolute or root-relative URL to the media file.' },
        { name: 'type', type: 'string', optional: true, descriptionFallback: 'MIME type — video/mp4, video/webm, application/vnd.apple.mpegurl for HLS. Recommended: lets the browser skip sources it cannot decode without a network round-trip.' },
        { name: 'quality', type: 'string', optional: true, descriptionFallback: 'Quality identifier used to group multiple sources of the same content at different resolutions (e.g. "1080p", "720p", "auto"). When two or more sources expose distinct quality values, OrigamVideo shows a Quality entry in the settings menu.' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Optional human-readable label override for the quality switcher menu. Defaults to the quality value when not provided.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'i-video-props', name: 'IVideoProps', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video-track.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_video_source.example',
            titleFallback: 'Passing multiple sources for quality switching',
            code: `const sources: IVideoSource[] = [
    { src: '/video-1080.mp4', type: 'video/mp4', quality: '1080p' },
    { src: '/video-720.mp4',  type: 'video/mp4', quality: '720p' },
    { src: '/video-480.webm', type: 'video/webm', quality: '480p' },
]`,
            lang: 'typescript',
        },
    ],
}
