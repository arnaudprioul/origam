import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TABLE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-table-props',
    name: 'ITableProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_table_props.description',
    descriptionFallback: 'Props for <OrigamTable> — a styled semantic <table> wrapper. Supports border, rounded, elevation, padding, margin, hover, dimension and density contracts, plus fixed header/footer, caption and ARIA row count.',
    definition: `export interface ITableProps extends ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IHoverProps, IDimensionProps, IDensityProps, ITagProps {
    fixedHeader?: boolean
    fixedFooter?: boolean
    caption?: string
    captionVisible?: boolean
    ariaRowcount?: number
}`,
    extends: [
        'ICommonsComponentProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'IPaddingProps',
        'IMarginProps',
        'IHoverProps',
        'IDimensionProps',
        'IDensityProps',
        'ITagProps',
    ],
    props: [
        { name: 'fixedHeader', type: 'boolean', optional: true, descriptionFallback: 'Pins the <thead> to the top of the scroll area so it stays visible while scrolling.' },
        { name: 'fixedFooter', type: 'boolean', optional: true, descriptionFallback: 'Pins the <tfoot> to the bottom of the scroll area.' },
        { name: 'caption', type: 'string', optional: true, descriptionFallback: 'Text content for the <caption> element (accessibility + SEO).' },
        { name: 'captionVisible', type: 'boolean', optional: true, descriptionFallback: 'When false (default) the caption is visually hidden but accessible. Set to true to render it visibly.' },
        { name: 'ariaRowcount', type: 'number', optional: true, descriptionFallback: 'Populates the aria-rowcount attribute — required when not all rows are in the DOM (virtual/paginated tables).' },
    ],
    usedBy: [
        { slug: 'table', name: 'Table', kind: 'component' },
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Table/table.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_table_props.example',
            titleFallback: 'Table with fixed header and accessible caption',
            code: `<OrigamTable
  :fixed-header="true"
  caption="User list"
  :aria-rowcount="totalRows"
  elevation="sm"
  rounded="md"
>
  <thead>…</thead>
  <tbody>…</tbody>
</OrigamTable>`,
            lang: 'html',
        },
    ],
}
