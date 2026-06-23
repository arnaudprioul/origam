import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_SLOT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-slot-props',
    name: 'IDataTableSlotProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_slot_props.description',
    descriptionFallback: 'Full slot scope injected into top-level slots (#default, #body, #footer…) of <OrigamDataTable> — aggregates pagination, sort, selection, expansion, grouping state and all toggle helpers.',
    definition: `export interface IDataTableSlotProps<T> {
    page: number
    itemsPerPage: number
    sortBy: UnwrapRef<IDataTableProvideSort['sortBy']>
    pageCount: number
    toggleSort: IDataTableProvideSort['toggleSort']
    setItemsPerPage: IDataTableProvidePagination['setItemsPerPage']
    someSelected: boolean
    allSelected: boolean
    isSelected: IDataTableProvideSelection['isSelected']
    select: IDataTableProvideSelection['select']
    selectAll: IDataTableProvideSelection['selectAll']
    toggleSelect: IDataTableProvideSelection['toggleSelect']
    isExpanded: IDataTableProvideExpanded['isExpanded']
    toggleExpand: IDataTableProvideExpanded['toggleExpand']
    isGroupOpen: IDataTableProvideGroup['isGroupOpen']
    toggleGroup: IDataTableProvideGroup['toggleGroup']
    items: T[]
    internalItems: Array<IDataTableItem>
    groupedItems: Array<IDataTableItem<T> | IDataTableGroup<IDataTableItem<T>>>
    columns: Array<IInternalDataTableHeader>
    headers: Array<Array<IInternalDataTableHeader>>
}`,
    extends: [],
    props: [
        { name: 'page', type: 'number', optional: false, descriptionFallback: 'Current page number (1-based).' },
        { name: 'itemsPerPage', type: 'number', optional: false, descriptionFallback: 'Number of rows shown per page.' },
        { name: 'sortBy', type: 'Array<IDataTableSortItem>', optional: false, descriptionFallback: 'Active sort descriptors (key + direction).' },
        { name: 'pageCount', type: 'number', optional: false, descriptionFallback: 'Total number of pages.' },
        { name: 'toggleSort', type: '(column: IInternalDataTableHeader) => void', optional: false, descriptionFallback: 'Cycles the sort state of the given column.' },
        { name: 'setItemsPerPage', type: '(value: number) => void', optional: false, descriptionFallback: 'Changes the rows-per-page setting.' },
        { name: 'someSelected', type: 'boolean', optional: false, descriptionFallback: 'True when at least one row is selected.' },
        { name: 'allSelected', type: 'boolean', optional: false, descriptionFallback: 'True when all selectable rows are selected.' },
        { name: 'isSelected', type: '(items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean', optional: false, descriptionFallback: 'Checks whether all passed items are selected.' },
        { name: 'select', type: '(items: Array<IDataTableSelectableItem>, value: boolean) => void', optional: false, descriptionFallback: 'Sets selection state for an array of items.' },
        { name: 'selectAll', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Selects or deselects all rows on the current page.' },
        { name: 'toggleSelect', type: '(item: IDataTableSelectableItem) => void', optional: false, descriptionFallback: 'Toggles selection for a single item.' },
        { name: 'isExpanded', type: '(item: IDataTableItem) => boolean', optional: false, descriptionFallback: 'Checks whether an item row is expanded.' },
        { name: 'toggleExpand', type: '(item: IDataTableItem) => void', optional: false, descriptionFallback: 'Toggles the expansion state of an item row.' },
        { name: 'isGroupOpen', type: '(group: IDataTableGroup) => boolean', optional: false, descriptionFallback: 'Checks whether a group node is open.' },
        { name: 'toggleGroup', type: '(group: IDataTableGroup) => void', optional: false, descriptionFallback: 'Toggles the open/closed state of a group node.' },
        { name: 'items', type: 'T[]', optional: false, descriptionFallback: 'Raw items on the current page.' },
        { name: 'internalItems', type: 'Array<IDataTableItem>', optional: false, descriptionFallback: 'Enriched internal items on the current page.' },
        { name: 'groupedItems', type: 'Array<IDataTableItem<T> | IDataTableGroup<IDataTableItem<T>>>', optional: false, descriptionFallback: 'Items and group nodes as rendered in the tbody.' },
        { name: 'columns', type: 'Array<IInternalDataTableHeader>', optional: false, descriptionFallback: 'Resolved column descriptors in display order.' },
        { name: 'headers', type: 'Array<Array<IInternalDataTableHeader>>', optional: false, descriptionFallback: 'Multi-row header matrix (for column-group headers).' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/data-table.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_slot_props.example',
            titleFallback: 'Custom footer using IDataTableSlotProps',
            code: `<OrigamDataTable :items="rows" :headers="headers">
    <template #footer="{ page, pageCount, setItemsPerPage }">
        <div>Page {{ page }} / {{ pageCount }}</div>
    </template>
</OrigamDataTable>`,
            lang: 'vue',
        },
    ],
}
