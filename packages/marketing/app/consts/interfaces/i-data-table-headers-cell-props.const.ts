import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADERS_CELL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-headers-cell-props',
    name: 'IDataTableHeadersCellProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_headers_cell_props.description',
    descriptionFallback: 'Props for the headers cell component (single <th>) in <OrigamDataTable> — the full two-dimensional headers matrix plus the shared ICommonsComponentProps, IColorProps, and IHeaderCellProps surfaces.',
    definition: `export interface IDataTableHeadersCellProps extends ICommonsComponentProps, IColorProps, IHeaderCellProps {
    headers: Array<Array<IInternalDataTableHeader>>
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IHeaderCellProps'],
    props: [
        { name: 'headers', type: 'Array<Array<IInternalDataTableHeader>>', optional: false, descriptionFallback: 'Two-dimensional array of resolved internal header definitions used to calculate colspan/rowspan for the header cell.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_headers_cell_props.example',
            titleFallback: 'Internal usage — resolved headers matrix',
            code: `// IDataTableHeadersCellProps is an internal contract consumed by
// OrigamDataTableHeadersCell. It receives the headers matrix built
// by the parent DataTable from the user-supplied IDataTableHeader[].`,
            lang: 'typescript',
        },
    ],
}
