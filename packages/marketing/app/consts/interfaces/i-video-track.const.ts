import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIDEO_TRACK_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-video-track',
    name: 'IVideoTrack',
    category: 'Data Shapes',
    descriptionKey: 'interfaces.catalog.i_video_track.description',
    descriptionFallback: 'A single <track> declaration attached to the <video> element. Mirrors the HTML attributes of the native element 1:1 so consumers do not have to learn a new shape. The component renders one <track> per item.',
    definition: `export interface IVideoTrack {
    kind: TVideoTrackKind
    src: string
    srclang: string
    label?: string
    default?: boolean
}`,
    extends: [],
    props: [
        { name: 'kind', type: 'TVideoTrackKind', optional: false, descriptionFallback: 'Kind of the track. captions is the default — used by the built-in captions switcher. subtitles is treated the same way; descriptions and chapters are declared but not surfaced in the default toolbar.' },
        { name: 'src', type: 'string', optional: false, descriptionFallback: 'URL of the WebVTT file. Same-origin or CORS-enabled, otherwise the browser silently rejects the track.' },
        { name: 'srclang', type: 'string', optional: false, descriptionFallback: 'BCP-47 language tag — "en", "fr", "pt-BR". Drives the language label in the captions switcher and is exposed to assistive technology via the underlying <track srclang>.' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Human-readable label shown in the switcher ("English", "Francais"). Defaults to the uppercased srclang when omitted.' },
        { name: 'default', type: 'boolean', optional: true, descriptionFallback: 'Marks this track as the one to enable on load. At most one track per kind should be flagged — if multiple are passed, the first one wins.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
        { slug: 'i-video-props', name: 'IVideoProps', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video-track.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_video_track.example',
            titleFallback: 'Attaching captions tracks to OrigamVideo',
            code: `const tracks: IVideoTrack[] = [
    { kind: 'captions', src: '/captions/en.vtt', srclang: 'en', label: 'English', default: true },
    { kind: 'captions', src: '/captions/fr.vtt', srclang: 'fr', label: 'Francais' },
]`,
            lang: 'typescript',
        },
    ],
}
