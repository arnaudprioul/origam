import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_PAGINATION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-pagination-props',
    name: 'IDataTablePaginationProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_pagination_props.description',
    descriptionFallback: 'Controls the page and items-per-page props for paginated data tables — the minimal binding surface for server-side or client-side pagination.',
    definition: `export interface IDataTablePaginationProps {
    page?: number | string
    itemsPerPage?: number | string
}`,
    extends: [],
    props: [
        { name: 'page', type: 'number | string', optional: true, descriptionFallback: 'Current page number (1-based). Bind with v-model:page for two-way sync.' },
        { name: 'itemsPerPage', type: 'number | string', optional: true, descriptionFallback: 'Number of rows displayed per page. Bind with v-model:itemsPerPage for two-way sync.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/pagination.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_pagination_props.example',
            titleFallback: 'Server-side pagination with v-model',
            code: `<OrigamDataTable
    v-model:page="page"
    v-model:items-per-page="perPage"
    :items="rows"
    :items-length="total"
    @update:options="loadPage"
/>`,
            lang: 'vue',
        },
    ],
}
