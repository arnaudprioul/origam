import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATA_TABLE_SORT_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-data-table-sort-key',
    name: 'ORIGAM_DATA_TABLE_SORT_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_data_table_sort_key.description',
    descriptionFallback: 'Vue provide/inject symbol that exposes the sorting API (sortBy array, toggleSort callback, isSorted predicate) from OrigamDataTable to its column-header subcomponents.',
    definition: `export const ORIGAM_DATA_TABLE_SORT_KEY: InjectionKey<{
    sortBy: Ref<Array<IDataTableSortItem>>
    toggleSort: (column: IInternalDataTableHeader) => void
    isSorted: (column: IInternalDataTableHeader) => boolean
}> = Symbol.for('origam:data-table-sort')`,
    value: "Symbol.for('origam:data-table-sort')",
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
        { name: 'OrigamDataTableHeaders', slug: 'data-table' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/sort.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_data_table_sort_key.example',
            titleFallback: 'Toggling sort order from a custom header cell',
            code: `import { inject } from 'vue'
import { ORIGAM_DATA_TABLE_SORT_KEY } from 'origam'

const sortCtx = inject(ORIGAM_DATA_TABLE_SORT_KEY)
// sortCtx?.toggleSort(column)`,
            lang: 'typescript',
        },
    ],
}
