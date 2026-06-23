import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_SORT_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-sort-item',
    name: 'IDataTableSortItem',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_sort_item.description',
    descriptionFallback: 'A single sort descriptor in the sortBy array — pairs a column key with an optional sort direction. Used by both the sort props and the provide/inject sort contract.',
    definition: `export interface IDataTableSortItem {
    key: string,
    order?: boolean | TSortDirection
}`,
    extends: [],
    props: [
        { name: 'key', type: 'string', optional: false, descriptionFallback: 'The column key to sort by — must match a key in the headers array.' },
        { name: 'order', type: 'boolean | TSortDirection', optional: true, descriptionFallback: "Sort direction: 'asc', 'desc', true (= 'asc') or false (= 'desc'). Omit to infer ascending." },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/sort.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_sort_item.example',
            titleFallback: 'Initial multi-column sort',
            code: `<OrigamDataTable
    :items="users"
    :headers="headers"
    :sort-by="[{ key: 'lastName', order: 'asc' }, { key: 'firstName', order: 'asc' }]"
    multi-sort
/>`,
            lang: 'vue',
        },
    ],
}
