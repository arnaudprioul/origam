import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADER_CELL_COLUMN_SLOT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-header-cell-column-slot',
    name: 'IDataTableHeaderCellColumnSlot',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_data_table_header_cell_column_slot.description',
    descriptionFallback: 'Slot props injected into per-column header cell slots of <OrigamDataTable> — provides the column definition plus sort helpers (isSorted, toggleSort, getSortIcon) and selection helpers (selectAll, someSelected, allSelected).',
    definition: `export interface IDataTableHeaderCellColumnSlot {
    column: IInternalDataTableHeader
    selectAll: (value: boolean) => void
    isSorted: (column: IInternalDataTableHeader) => boolean
    toggleSort: (column: IInternalDataTableHeader) => void
    sortBy: Ref<Array<IDataTableSortItem>>
    someSelected: ComputedRef<boolean>
    allSelected: ComputedRef<boolean>
    getSortIcon: (column: IInternalDataTableHeader) => TIcon
}`,
    extends: [],
    props: [
        { name: 'column', type: 'IInternalDataTableHeader', optional: false, descriptionFallback: 'The resolved internal column definition for this header cell.' },
        { name: 'selectAll', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Selects or deselects all rows.' },
        { name: 'isSorted', type: '(column: IInternalDataTableHeader) => boolean', optional: false, descriptionFallback: 'Returns true when the column is part of the active sort.' },
        { name: 'toggleSort', type: '(column: IInternalDataTableHeader) => void', optional: false, descriptionFallback: 'Cycles the sort direction for the column (none → asc → desc).' },
        { name: 'sortBy', type: 'Ref<Array<IDataTableSortItem>>', optional: false, descriptionFallback: 'Reactive list of active sort columns.' },
        { name: 'someSelected', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'True when at least one row is selected (used for the indeterminate checkbox state).' },
        { name: 'allSelected', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'True when every visible row is selected.' },
        { name: 'getSortIcon', type: '(column: IInternalDataTableHeader) => TIcon', optional: false, descriptionFallback: 'Returns the correct sort indicator icon for the column.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/items.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_header_cell_column_slot.example',
            titleFallback: 'Custom header cell with sort indicator',
            code: `<OrigamDataTable :headers="headers" :items="rows">
    <template #header.name="{ column, isSorted, toggleSort, getSortIcon }">
        <span @click="toggleSort(column)">
            {{ column.title }}
            <origam-icon v-if="isSorted(column)" :icon="getSortIcon(column)" />
        </span>
    </template>
</OrigamDataTable>`,
            lang: 'vue',
        },
    ],
}
