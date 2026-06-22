import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-props',
    name: 'IDataTableProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_props.description',
    descriptionFallback: 'Complete props contract for <OrigamDataTable> — composes all DataTable sub-interfaces (items, sort, select, paginate, expand, group, headers, footer, filters) plus table-wide visibility flags and a global search string.',
    definition: `export interface IDataTableProps extends ITableProps, IDataTableRowProps, IDataTableExpandProps, IDataTableGroupProps, IDataTableHeaderProps, IDataTableItemsProps, IDataTableSelectProps, IDataTableSortProps, IDataTableHeadersProps, IDataTablePaginationProps, IFiltersProps, IDataTableFooterProps {
    hideDefaultBody?: boolean
    hideDefaultFooter?: boolean
    hideDefaultHeader?: boolean
    search?: string
}`,
    extends: [
        'ITableProps', 'IDataTableRowProps', 'IDataTableExpandProps', 'IDataTableGroupProps',
        'IDataTableHeaderProps', 'IDataTableItemsProps', 'IDataTableSelectProps', 'IDataTableSortProps',
        'IDataTableHeadersProps', 'IDataTablePaginationProps', 'IFiltersProps', 'IDataTableFooterProps',
    ],
    props: [
        { name: 'hideDefaultBody', type: 'boolean', optional: true, descriptionFallback: 'Hides the default tbody rendering — use when you provide a fully custom body via the #body slot.' },
        { name: 'hideDefaultFooter', type: 'boolean', optional: true, descriptionFallback: 'Hides the built-in pagination footer.' },
        { name: 'hideDefaultHeader', type: 'boolean', optional: true, descriptionFallback: 'Hides the built-in column-header row.' },
        { name: 'search', type: 'string', optional: true, descriptionFallback: 'Client-side search string applied to all visible columns. Pass an empty string to clear.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/data-table.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_props.example',
            titleFallback: 'Full-featured data table',
            code: `<OrigamDataTable
    :items="users"
    :headers="headers"
    item-value="id"
    show-select
    multi-sort
    :items-per-page="10"
    search="alice"
/>`,
            lang: 'vue',
        },
    ],
}
