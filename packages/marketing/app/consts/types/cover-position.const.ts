import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const COVER_POSITION_TYPE_DOC: ITypeDoc = {
    slug: 'cover-position',
    name: 'TCoverPosition',
    kind: 'type',
    category: 'Media',
    descriptionKey: 'types.catalog.cover_position.description',
    descriptionFallback: 'Side of the audio surface where the album cover is painted relative to the controller and metadata column in OrigamAudio.',
    definition: `export type TCoverPosition = \`\${COVER_POSITION}\`

// Where COVER_POSITION is:
export enum COVER_POSITION {
    LEFT  = 'left',
    RIGHT = 'right'
}`,
    values: [
        {
            value: 'left',
            descriptionKey: 'types.detail.cover_position.left',
            descriptionFallback: 'Album cover is rendered on the left side of the audio player layout.',
        },
        {
            value: 'right',
            descriptionKey: 'types.detail.cover_position.right',
            descriptionFallback: 'Album cover is rendered on the right side of the audio player layout.',
        },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', propName: 'coverPosition' },
    ],
    sourceFile: 'packages/ds/src/types/Audio/cover-position.type.ts',
    examples: [
        {
            titleKey: 'types.detail.cover_position.example',
            titleFallback: 'Audio player with the cover on the right',
            code: `<origam-audio
  src="/tracks/intro.mp3"
  cover="/img/album-cover.jpg"
  cover-position="right"
  title="Intro Theme"
/>`,
            lang: 'html',
        },
    ],
}
