import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const FLEX_DIRECTION_ENUM_DOC: IEnumDoc = {
    slug: 'flex-direction',
    name: 'FLEX_DIRECTION',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.flex_direction.description',
    descriptionFallback: 'CSS flex-direction values exposed as a TypeScript enum. Used by OrigamRow to control the main axis of a grid row.',
    definition: `export enum FLEX_DIRECTION {
    ROW            = 'row',
    COLUMN         = 'column',
    COLUMN_REVERSE = 'column-reverse',
    ROW_REVERSE    = 'row-reverse',
}`,
    values: [
        {
            value: 'FLEX_DIRECTION.ROW',
            descriptionKey: 'enums.detail.flex_direction.row',
            descriptionFallback: 'Items are laid out left to right (default).',
        },
        {
            value: 'FLEX_DIRECTION.COLUMN',
            descriptionKey: 'enums.detail.flex_direction.column',
            descriptionFallback: 'Items are stacked top to bottom.',
        },
        {
            value: 'FLEX_DIRECTION.COLUMN_REVERSE',
            descriptionKey: 'enums.detail.flex_direction.column_reverse',
            descriptionFallback: 'Items are stacked bottom to top.',
        },
        {
            value: 'FLEX_DIRECTION.ROW_REVERSE',
            descriptionKey: 'enums.detail.flex_direction.row_reverse',
            descriptionFallback: 'Items are laid out right to left.',
        },
    ],
    usedBy: [
        { slug: 'row', name: 'Row', propName: 'direction' },
    ],
    sourceFile: 'packages/ds/src/enums/Grids/row.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.flex_direction.example',
            titleFallback: 'Reversing a grid row',
            code: `<origam-row :direction="FLEX_DIRECTION.ROW_REVERSE">
    <origam-col :cols="6">Left (visually right)</origam-col>
    <origam-col :cols="6">Right (visually left)</origam-col>
</origam-row>`,
            lang: 'vue',
        },
    ],
}
