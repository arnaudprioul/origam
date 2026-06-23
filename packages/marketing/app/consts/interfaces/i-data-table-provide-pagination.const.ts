import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_PROVIDE_PAGINATION_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-provide-pagination',
    name: 'IDataTableProvidePagination',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_provide_pagination.description',
    descriptionFallback: 'Internal provide/inject contract for pagination state in <OrigamDataTable> — exposes the page cursors, the total page count and navigation helpers consumed by footer and slot children.',
    definition: `export interface IDataTableProvidePagination {
    page: Ref<number>
    itemsPerPage: Ref<number>
    startIndex: ComputedRef<number>
    stopIndex: ComputedRef<number>
    pageCount: ComputedRef<number>
    itemsLength: Ref<number>
    nextPage: () => void
    prevPage: () => void
    setPage: (value: number) => void
    setItemsPerPage: (value: number) => void
}`,
    extends: [],
    props: [
        { name: 'page', type: 'Ref<number>', optional: false, descriptionFallback: 'Current 1-based page number as a reactive ref.' },
        { name: 'itemsPerPage', type: 'Ref<number>', optional: false, descriptionFallback: 'Number of rows per page as a reactive ref.' },
        { name: 'startIndex', type: 'ComputedRef<number>', optional: false, descriptionFallback: 'Zero-based index of the first row on the current page.' },
        { name: 'stopIndex', type: 'ComputedRef<number>', optional: false, descriptionFallback: 'Zero-based index of the last row on the current page (exclusive).' },
        { name: 'pageCount', type: 'ComputedRef<number>', optional: false, descriptionFallback: 'Total number of pages computed from itemsLength and itemsPerPage.' },
        { name: 'itemsLength', type: 'Ref<number>', optional: false, descriptionFallback: 'Total number of items across all pages (used for server-side pagination).' },
        { name: 'nextPage', type: '() => void', optional: false, descriptionFallback: 'Advances to the next page if available.' },
        { name: 'prevPage', type: '() => void', optional: false, descriptionFallback: 'Goes back to the previous page if available.' },
        { name: 'setPage', type: '(value: number) => void', optional: false, descriptionFallback: 'Navigates to the given page number (clamped to valid range).' },
        { name: 'setItemsPerPage', type: '(value: number) => void', optional: false, descriptionFallback: 'Changes the number of rows per page and resets to page 1.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/pagination.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_provide_pagination.example',
            titleFallback: 'Accessing pagination state via inject',
            code: `import { inject } from 'vue'
import { DATA_TABLE_PAGINATION_KEY } from 'origam'

const { page, pageCount, nextPage, prevPage } = inject(DATA_TABLE_PAGINATION_KEY)!`,
            lang: 'typescript',
        },
    ],
}
