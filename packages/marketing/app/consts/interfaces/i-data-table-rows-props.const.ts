import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_ROWS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-rows-props',
    name: 'IDataTableRowsProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_rows_props.description',
    descriptionFallback: 'Props contract for the internal <OrigamDataTableRows> body renderer — receives the full list of items/groups, empty-state text and per-row/cell prop factories.',
    definition: `export interface IDataTableRowsProps extends ICommonsComponentProps, ILoaderProps, IDisplayProps {
    hideNoData?: boolean
    items?: Array<IDataTableItem | IDataTableGroup> | readonly (IDataTableItem | IDataTableGroup)[]
    noDataText?: string
    rowProps?: TDataTableRow<any>
    cellProps?: TDataTableCell<any>
}`,
    extends: ['ICommonsComponentProps', 'ILoaderProps', 'IDisplayProps'],
    props: [
        { name: 'hideNoData', type: 'boolean', optional: true, descriptionFallback: 'Suppresses the empty-state row when there are no items to display.' },
        { name: 'items', type: 'Array<IDataTableItem | IDataTableGroup> | readonly (IDataTableItem | IDataTableGroup)[]', optional: true, descriptionFallback: 'Mixed array of resolved items and group nodes to render in the tbody.' },
        { name: 'noDataText', type: 'string', optional: true, descriptionFallback: 'Text shown in the empty-state row when items is empty and hideNoData is false.' },
        { name: 'rowProps', type: 'TDataTableRow<any>', optional: true, descriptionFallback: 'Object or function returning extra props merged onto each <tr> element.' },
        { name: 'cellProps', type: 'TDataTableCell<any>', optional: true, descriptionFallback: 'Object or function returning extra props merged onto each <td> element.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/row.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_rows_props.example',
            titleFallback: 'Custom no-data text',
            code: `<OrigamDataTable
    :items="[]"
    :headers="headers"
    no-data-text="No records found."
/>`,
            lang: 'vue',
        },
    ],
}
