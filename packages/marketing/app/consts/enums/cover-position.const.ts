import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const COVER_POSITION_ENUM_DOC: IEnumDoc = {
    slug: 'cover-position',
    name: 'COVER_POSITION',
    category: 'Audio',
    descriptionKey: 'enums.catalog.cover_position.description',
    descriptionFallback: 'Side of the audio surface where the album cover is painted relative to the controller column in OrigamAudio.',
    definition: `export enum COVER_POSITION {
    LEFT  = 'left',
    RIGHT = 'right',
}`,
    values: [
        {
            value: 'COVER_POSITION.LEFT',
            descriptionKey: 'enums.detail.cover_position.left',
            descriptionFallback: 'Album cover is displayed to the left of the controller.',
        },
        {
            value: 'COVER_POSITION.RIGHT',
            descriptionKey: 'enums.detail.cover_position.right',
            descriptionFallback: 'Album cover is displayed to the right of the controller.',
        },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', propName: 'coverPosition' },
    ],
    sourceFile: 'packages/ds/src/enums/Audio/cover-position.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.cover_position.example',
            titleFallback: 'Placing the cover on the right',
            code: `<origam-audio :cover-position="COVER_POSITION.RIGHT" src="/track.mp3" />`,
            lang: 'vue',
        },
    ],
}
