import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_SOURCE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-source',
    name: 'IAudioSource',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_audio_source.description',
    descriptionFallback: 'A single <source> entry when the consumer passes multiple audio URLs (typically one mp3 + one ogg so the browser picks whichever codec it can decode). Mirrors IVideoSource minus video-specific fields.',
    definition: `export interface IAudioSource {
    src: string
    type?: string
}`,
    extends: [],
    props: [
        { name: 'src', type: 'string', optional: false, descriptionFallback: 'Absolute or root-relative URL to the audio file.' },
        { name: 'type', type: 'string', optional: true, descriptionFallback: 'MIME type — "audio/mpeg", "audio/ogg", "audio/wav", "application/vnd.apple.mpegurl" for HLS, etc. Optional but recommended.' },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_source.example',
            titleFallback: 'Codec fallback array with IAudioSource',
            code: `<OrigamAudio :src="[
    { src: '/audio/track.mp3', type: 'audio/mpeg' },
    { src: '/audio/track.ogg', type: 'audio/ogg' }
]" />`,
            lang: 'vue',
        },
    ],
}
