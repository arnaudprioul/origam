import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const FLEX_DIRECTION_TYPE_DOC: ITypeDoc = {
    slug: 'flex-direction',
    name: 'TFlexDirection',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.flex_direction.description',
    descriptionFallback: 'CSS flex-direction values accepted by <OrigamRow> and other flex containers. Drives the direction child items flow along the main axis.',
    definition: `export type TFlexDirection = \`\${FLEX_DIRECTION}\`

// Where FLEX_DIRECTION is:
export enum FLEX_DIRECTION {
    ROW            = 'row',
    COLUMN         = 'column',
    COLUMN_REVERSE = 'column-reverse',
    ROW_REVERSE    = 'row-reverse',
}`,
    values: [
        {
            value: 'row',
            descriptionKey: 'types.detail.flex_direction.row',
            descriptionFallback: 'Default. Items are laid out horizontally, left to right (in LTR contexts).',
        },
        {
            value: 'column',
            descriptionKey: 'types.detail.flex_direction.column',
            descriptionFallback: 'Items are stacked vertically, top to bottom.',
        },
        {
            value: 'row-reverse',
            descriptionKey: 'types.detail.flex_direction.row_reverse',
            descriptionFallback: 'Items flow horizontally in reverse — right to left in LTR contexts.',
        },
        {
            value: 'column-reverse',
            descriptionKey: 'types.detail.flex_direction.column_reverse',
            descriptionFallback: 'Items are stacked vertically in reverse — bottom to top.',
        },
    ],
    usedBy: [
        { slug: 'row', name: 'Row', propName: 'direction' },
    ],
    sourceFile: 'packages/ds/src/types/Grids/row.type.ts',
    examples: [
        {
            titleKey: 'types.detail.flex_direction.example_column',
            titleFallback: 'Vertical column layout',
            code: `<origam-row direction="column">
  <origam-col>First</origam-col>
  <origam-col>Second</origam-col>
  <origam-col>Third</origam-col>
</origam-row>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.flex_direction.example_row_reverse',
            titleFallback: 'Reversed row (RTL simulation)',
            code: `<origam-row direction="row-reverse">
  <origam-col>Last item shown first</origam-col>
  <origam-col>Middle</origam-col>
  <origam-col>First item shown last</origam-col>
</origam-row>`,
            lang: 'html',
        },
    ],
}
