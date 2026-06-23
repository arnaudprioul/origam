import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_ROW_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-row-props',
    name: 'IDataTableRowProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_row_props.description',
    descriptionFallback: 'Props contract for <OrigamDataTableRow> — receives the resolved internal item and optional per-cell prop factory; extends ICommonsComponentProps and IDisplayProps.',
    definition: `export interface IDataTableRowProps extends ICommonsComponentProps, IDisplayProps {
    item: IDataTableItem
    cellProps?: TDataTableCell<any>
}`,
    extends: ['ICommonsComponentProps', 'IDisplayProps'],
    props: [
        { name: 'item', type: 'IDataTableItem', optional: false, descriptionFallback: 'The resolved internal item descriptor containing key, index, raw data and column values.' },
        { name: 'cellProps', type: 'TDataTableCell<any>', optional: true, descriptionFallback: 'Object or function returning extra props merged onto each cell element of this row.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/row.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_row_props.example',
            titleFallback: 'Custom row with cellProps factory',
            code: `<OrigamDataTable
    :items="orders"
    :headers="headers"
    :cell-props="({ column }) => column.key === 'amount' ? { class: 'text-right' } : {}"
/>`,
            lang: 'vue',
        },
    ],
}
