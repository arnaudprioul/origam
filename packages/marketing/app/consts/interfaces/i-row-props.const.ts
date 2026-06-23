import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ROW_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-row-props',
    name: 'IRowProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_row_props.description',
    descriptionFallback: 'Props for <OrigamRow>, the grid row container. Extends commons, tag, padding, margin, border, color, density, align, and justify surfaces with two row-specific props: gutters (column/row gap shorthand) and direction (flex-direction override).',
    definition: `export interface IRowProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IColorProps, IDensityProps, IAlignProps, IJustifyProps {
    gutters?: string | number
    direction?: TFlexDirection
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IColorProps',
        'IDensityProps',
        'IAlignProps',
        'IJustifyProps',
    ],
    props: [
        { name: 'gutters', type: 'string | number', optional: true, descriptionFallback: 'Uniform gap between columns and rows. Accepts a CSS length string or a spacing-scale number (converted to px). Overrides default grid-gap.' },
        { name: 'direction', type: 'TFlexDirection', optional: true, descriptionFallback: 'Flex-direction of the row — "row" (default), "row-reverse", "column", or "column-reverse".' },
    ],
    usedBy: [
        { slug: 'row', name: 'Row', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Grids/row.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_row_props.example',
            titleFallback: 'Building a responsive two-column layout with OrigamRow',
            code: `<OrigamRow :gutters="16" align="center" justify="space-between">
    <OrigamCol :cols="6">Left</OrigamCol>
    <OrigamCol :cols="6">Right</OrigamCol>
</OrigamRow>`,
            lang: 'html',
        },
    ],
}
