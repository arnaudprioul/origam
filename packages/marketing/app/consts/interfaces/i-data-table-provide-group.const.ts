import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_PROVIDE_GROUP_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-provide-group',
    name: 'IDataTableProvideGroup',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_provide_group.description',
    descriptionFallback: 'Internal provide/inject contract for row-grouping state in <OrigamDataTable> — exposes the groupBy axis, the open/closed set of group nodes and helpers to toggle, extract and query groups.',
    definition: `export interface IDataTableProvideGroup {
    sortByWithGroups: ComputedRef<Array<IDataTableSortItem>>
    toggleGroup: (group: IDataTableGroup) => void
    opened: Ref<Set<string> & Omit<Set<string>, keyof Set<any>>>
    groupBy: Ref<Array<IDataTableSortItem>>
    extractRows: (items: Array<IDataTableGroupableItem | IDataTableGroup<IDataTableGroupableItem>>) => Array<IDataTableGroupableItem>
    isGroupOpen: (group: IDataTableGroup) => boolean
}`,
    extends: [],
    props: [
        { name: 'sortByWithGroups', type: 'ComputedRef<Array<IDataTableSortItem>>', optional: false, descriptionFallback: 'Computed sort array that prepends the groupBy columns so groups are contiguous before any user-defined sort keys.' },
        { name: 'toggleGroup', type: '(group: IDataTableGroup) => void', optional: false, descriptionFallback: 'Toggles the open/closed state of a group node.' },
        { name: 'opened', type: 'Ref<Set<string>>', optional: false, descriptionFallback: 'Reactive set of group IDs that are currently open (expanded).' },
        { name: 'groupBy', type: 'Ref<Array<IDataTableSortItem>>', optional: false, descriptionFallback: 'Reactive array of column keys used as the grouping axis.' },
        { name: 'extractRows', type: '(items: Array<IDataTableGroupableItem | IDataTableGroup<IDataTableGroupableItem>>) => Array<IDataTableGroupableItem>', optional: false, descriptionFallback: 'Flattens a mixed array of items and group nodes into a plain array of leaf items.' },
        { name: 'isGroupOpen', type: '(group: IDataTableGroup) => boolean', optional: false, descriptionFallback: 'Returns true when the given group is currently expanded.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_provide_group.example',
            titleFallback: 'Grouping rows by a column',
            code: `<OrigamDataTable
    :items="orders"
    :headers="headers"
    :group-by="[{ key: 'status' }]"
/>`,
            lang: 'vue',
        },
    ],
}
