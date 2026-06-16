import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const DIRECTION_TYPE_DOC: ITypeDoc = {
    slug: 'direction',
    name: 'TDirection',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.direction.description',
    descriptionFallback: 'Axis direction: horizontal or vertical.',
    definition: `export type TDirection = \`\${DIRECTION}\`

// Where DIRECTION is:
export enum DIRECTION {
    HORIZONTAL = 'horizontal',
    VERTICAL   = 'vertical'
}`,
    values: [
        { value: 'horizontal', descriptionKey: 'types.detail.direction.horizontal', descriptionFallback: 'Horizontal axis — items laid out left to right.' },
        { value: 'vertical', descriptionKey: 'types.detail.direction.vertical', descriptionFallback: 'Vertical axis — items stacked top to bottom.' },
    ],
    usedBy: [
        { slug: 'divider', name: 'Divider', propName: 'direction' },
        { slug: 'slider-field', name: 'SliderField', propName: 'direction' },
        { slug: 'rating-field', name: 'RatingField', propName: 'direction' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/direction.type.ts',
    examples: [
        {
            titleKey: 'types.detail.direction.example',
            titleFallback: 'Divider direction',
            code: `<origam-divider direction="horizontal" />
<origam-divider direction="vertical"   />`,
            lang: 'html',
        },
    ],
}
