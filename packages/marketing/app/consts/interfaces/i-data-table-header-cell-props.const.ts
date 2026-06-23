import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADER_CELL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-header-cell-props',
    name: 'IDataTableHeaderCellProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_header_cell_props.description',
    descriptionFallback: 'Props for the header cell wrapper component in <OrigamDataTable> — the full headers matrix plus the shared IHeaderCellProps and IColorProps surfaces.',
    definition: `export interface IDataTableHeaderCellProps extends ICommonsComponentProps, IColorProps, IHeaderCellProps {
    headers: Array<Array<IInternalDataTableHeader>>
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IHeaderCellProps'],
    props: [
        { name: 'headers', type: 'Array<Array<IInternalDataTableHeader>>', optional: false, descriptionFallback: 'Two-dimensional array of resolved internal header definitions (rows × columns) used to render the full header grid including multi-row spans.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_header_cell_props.example',
            titleFallback: 'Passing a resolved headers matrix',
            code: `// Typically consumed internally — the DataTable builds the matrix from IDataTableHeader[]
// and injects it into IDataTableHeaderCellProps.
const headers: IDataTableHeader[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name', children: [
        { key: 'first', title: 'First' },
        { key: 'last', title: 'Last' },
    ]},
]`,
            lang: 'typescript',
        },
    ],
}
