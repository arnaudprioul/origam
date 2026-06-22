import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_PROVIDE_SORT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-provide-sort',
    name: 'IDataTableProvideSort',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_provide_sort.description',
    descriptionFallback: 'Internal provide/inject contract for column-sort state in <OrigamDataTable> — exposes the current sortBy array and helpers used by column headers to query and toggle sort order.',
    definition: `export interface IDataTableProvideSort {
    sortBy: Ref<Array<IDataTableSortItem>>
    toggleSort: (column: IInternalDataTableHeader) => void
    isSorted: (column: IInternalDataTableHeader) => boolean
}`,
    extends: [],
    props: [
        { name: 'sortBy', type: 'Ref<Array<IDataTableSortItem>>', optional: false, descriptionFallback: 'Reactive array of active sort descriptors — each entry has a key and an optional direction.' },
        { name: 'toggleSort', type: '(column: IInternalDataTableHeader) => void', optional: false, descriptionFallback: 'Cycles through the sort states for the given column (none → asc → desc → none when mustSort is false).' },
        { name: 'isSorted', type: '(column: IInternalDataTableHeader) => boolean', optional: false, descriptionFallback: 'Returns true when the given column has an active sort entry in sortBy.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/sort.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_provide_sort.example',
            titleFallback: 'Accessing sort state in a custom header slot',
            code: `<template #header.name="{ column, toggleSort, isSorted }">
    <button @click="toggleSort(column)">
        Name {{ isSorted(column) ? '(sorted)' : '' }}
    </button>
</template>`,
            lang: 'vue',
        },
    ],
}
