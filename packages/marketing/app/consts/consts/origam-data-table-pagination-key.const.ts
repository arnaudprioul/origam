import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATA_TABLE_PAGINATION_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-data-table-pagination-key',
    name: 'ORIGAM_DATA_TABLE_PAGINATION_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_data_table_pagination_key.description',
    descriptionFallback: 'Vue provide/inject symbol that shares the pagination state (page, itemsPerPage, startIndex, stopIndex, pageCount, itemsLength) and navigation helpers (prevPage, nextPage, setPage, setItemsPerPage) from OrigamDataTable to its footer component.',
    definition: `export const ORIGAM_DATA_TABLE_PAGINATION_KEY: InjectionKey<{
    page: Ref<number>
    itemsPerPage: Ref<number>
    startIndex: Ref<number>
    stopIndex: Ref<number>
    pageCount: Ref<number>
    itemsLength: Ref<number>
    prevPage: () => void
    nextPage: () => void
    setPage: (value: number) => void
    setItemsPerPage: (value: number) => void
}> = Symbol.for('origam:data-table-pagination')`,
    value: "Symbol.for('origam:data-table-pagination')",
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
        { name: 'OrigamDataTableFooter', slug: 'data-table' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/pagination.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_data_table_pagination_key.example',
            titleFallback: 'Consuming pagination state in a custom footer slot',
            code: `import { inject } from 'vue'
import { ORIGAM_DATA_TABLE_PAGINATION_KEY } from 'origam'

const paginationCtx = inject(ORIGAM_DATA_TABLE_PAGINATION_KEY)
// paginationCtx?.setPage(2)`,
            lang: 'typescript',
        },
    ],
}
