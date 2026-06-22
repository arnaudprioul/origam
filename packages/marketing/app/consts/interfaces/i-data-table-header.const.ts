import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADER_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-header',
    name: 'IDataTableHeader',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_data_table_header.description',
    descriptionFallback: 'Definition of a single column header in <OrigamDataTable> — key, value accessor, title, alignment, fixed pinning, width/minWidth/maxWidth, sorting callbacks, filter function, mobile visibility, and nested children for multi-row headers.',
    definition: `export interface IDataTableHeader<T = any> {
    key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {})
    value?: TSelectItemKey<T>
    title?: string
    fixed?: boolean
    align?: Omit<TAlign, ALIGN.BASELINE | ALIGN.STRETCH>
    width?: number | string
    minWidth?: string
    maxWidth?: string
    nowrap?: boolean
    headerProps?: any
    cellProps?: TDataTableHeaderCell
    sortable?: boolean
    sort?: TDataTableCompareFunction
    sortRaw?: TDataTableCompareFunction
    filter?: TFilterFunction
    mobile?: boolean
    children?: Array<IDataTableHeader<T>>
}`,
    extends: [],
    props: [
        { name: 'key', type: "'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {})", optional: true, descriptionFallback: 'Unique column identifier. Reserved values trigger built-in columns (group toggle, row select checkbox, row expand toggle).' },
        { name: 'value', type: 'TSelectItemKey<T>', optional: true, descriptionFallback: 'Accessor for the cell value from the row object. Can be a dot-path string, a function, or an array path.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Display label in the column header cell.' },
        { name: 'fixed', type: 'boolean', optional: true, descriptionFallback: 'Pins the column to the left edge on horizontal scroll.' },
        { name: 'align', type: 'Omit<TAlign, ALIGN.BASELINE | ALIGN.STRETCH>', optional: true, descriptionFallback: 'Horizontal text alignment of all cells in this column.' },
        { name: 'width', type: 'number | string', optional: true, descriptionFallback: 'Fixed width for the column (number = px, string = any CSS length).' },
        { name: 'minWidth', type: 'string', optional: true, descriptionFallback: 'Minimum CSS width for the column.' },
        { name: 'maxWidth', type: 'string', optional: true, descriptionFallback: 'Maximum CSS width for the column.' },
        { name: 'nowrap', type: 'boolean', optional: true, descriptionFallback: 'Prevents cell text from wrapping.' },
        { name: 'headerProps', type: 'any', optional: true, descriptionFallback: 'Extra props/attributes spread onto the <th> element.' },
        { name: 'cellProps', type: 'TDataTableHeaderCell', optional: true, descriptionFallback: 'Extra props/attributes spread onto each <td> cell in this column.' },
        { name: 'sortable', type: 'boolean', optional: true, descriptionFallback: 'Enables sorting on this column. Defaults to true when value is defined.' },
        { name: 'sort', type: 'TDataTableCompareFunction', optional: true, descriptionFallback: 'Custom sort comparator applied to resolved cell values.' },
        { name: 'sortRaw', type: 'TDataTableCompareFunction', optional: true, descriptionFallback: 'Custom sort comparator applied to raw row objects.' },
        { name: 'filter', type: 'TFilterFunction', optional: true, descriptionFallback: 'Custom filter function for this column.' },
        { name: 'mobile', type: 'boolean', optional: true, descriptionFallback: 'Whether this column appears in the mobile stacked layout.' },
        { name: 'children', type: 'Array<IDataTableHeader<T>>', optional: true, descriptionFallback: 'Nested sub-columns for multi-row header spans.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_header.example',
            titleFallback: 'Headers with a fixed column and custom sort',
            code: `const headers: IDataTableHeader[] = [
    { key: 'name', title: 'Name', fixed: true, sortable: true },
    { key: 'email', title: 'Email', align: 'start' },
    { key: 'status', title: 'Status', sortable: false },
]`,
            lang: 'typescript',
        },
    ],
}
