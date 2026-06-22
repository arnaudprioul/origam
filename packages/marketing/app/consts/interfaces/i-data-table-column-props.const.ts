import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_COLUMN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-column-props',
    name: 'IDataTableColumnProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_column_props.description',
    descriptionFallback: 'Props for a single column cell in <OrigamDataTable> — alignment, sticky offset, nowrap, plus dimension and padding from the shared Commons interfaces.',
    definition: `export interface IDataTableColumnProps extends ICommonsComponentProps, ITagProps, IDimensionProps, IPaddingProps {
    align?: ALIGN.START | ALIGN.END | ALIGN.CENTER
    fixed?: boolean
    fixedOffset?: number | string
    lastFixed?: boolean
    nowrap?: boolean
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IDimensionProps', 'IPaddingProps'],
    props: [
        { name: 'align', type: 'ALIGN.START | ALIGN.END | ALIGN.CENTER', optional: true, descriptionFallback: 'Horizontal alignment of the cell content — start, end, or center.' },
        { name: 'fixed', type: 'boolean', optional: true, descriptionFallback: 'Pins the column to the left side of the table when the user scrolls horizontally.' },
        { name: 'fixedOffset', type: 'number | string', optional: true, descriptionFallback: 'Left offset (px or CSS length) used to stack multiple fixed columns side by side.' },
        { name: 'lastFixed', type: 'boolean', optional: true, descriptionFallback: 'Marks this as the last fixed column, triggering a box-shadow divider on its right edge.' },
        { name: 'nowrap', type: 'boolean', optional: true, descriptionFallback: 'Prevents text wrapping inside the cell.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/column.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_column_props.example',
            titleFallback: 'Fixed left column with center alignment',
            code: `<OrigamDataTableColumn fixed :fixedOffset="0" align="center" nowrap />`,
            lang: 'vue',
        },
    ],
}
