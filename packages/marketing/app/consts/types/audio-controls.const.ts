import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const AUDIO_CONTROLS_TYPE_DOC: ITypeDoc = {
    slug: 'audio-controls',
    name: 'TAudioControls',
    kind: 'type',
    category: 'Media',
    descriptionKey: 'types.catalog.audio_controls.description',
    descriptionFallback: 'Controls rendering strategy for OrigamAudio — custom Origam UI or native browser controls.',
    definition: `export type TAudioControls = 'custom' | 'native'`,
    values: [
        {
            value: 'custom',
            descriptionKey: 'types.detail.audio_controls.custom',
            descriptionFallback: 'Renders the OrigamMediaController shell on top of the <audio> element. The native controls attribute is suppressed. Default.',
        },
        {
            value: 'native',
            descriptionKey: 'types.detail.audio_controls.native',
            descriptionFallback: 'Passes the native controls attribute to the <audio> element and lets the browser paint its own bar. No custom UI is rendered.',
        },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', propName: 'controls' },
    ],
    sourceFile: 'packages/ds/src/types/Audio/audio-controls.type.ts',
    examples: [
        {
            titleKey: 'types.detail.audio_controls.example',
            titleFallback: 'Custom vs native controls',
            code: `<!-- Custom Origam controls (default) -->
<origam-audio src="/track.mp3" controls="custom" />

<!-- Native browser controls -->
<origam-audio src="/track.mp3" controls="native" />`,
            lang: 'html',
        },
    ],
}
