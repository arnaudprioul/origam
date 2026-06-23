import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GRID_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-grid-item-props',
    name: 'IGridItemProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_grid_item_props.description',
    descriptionFallback: 'Props for OrigamGridItem — controls CSS Grid placement via column, row and area (object or shorthand string syntax), plus per-item alignSelf and justifySelf overrides.',
    definition: `export interface IGridItemProps extends ICommonsComponentProps, ITagProps {
    column?: IGridLineSpec | string | number
    row?: IGridLineSpec | string | number
    area?: string
    alignSelf?: TGridPlaceSelf
    justifySelf?: TGridPlaceSelf
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [
        { name: 'column', type: 'IGridLineSpec | string | number', optional: true, descriptionFallback: 'Inline-axis placement (grid-column). Pass an object { start, end } / { start, span } or a CSS string like "1 / 5".' },
        { name: 'row', type: 'IGridLineSpec | string | number', optional: true, descriptionFallback: 'Block-axis placement (grid-row). Same accepted shapes as column.' },
        { name: 'area', type: 'string', optional: true, descriptionFallback: 'grid-area name. When set, overrides column and row.' },
        { name: 'alignSelf', type: 'TGridPlaceSelf', optional: true, descriptionFallback: 'Per-item align-self override.' },
        { name: 'justifySelf', type: 'TGridPlaceSelf', optional: true, descriptionFallback: 'Per-item justify-self override.' },
    ],
    usedBy: [
        { slug: 'grid-item', name: 'GridItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Grid/grid-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_grid_item_props.example',
            titleFallback: 'Placing an item across columns with object syntax',
            code: `<OrigamGridItem :column="{ start: 1, span: 2 }" :row="{ start: 2, end: 4 }">
    Content
</OrigamGridItem>`,
            lang: 'vue',
        },
    ],
}
