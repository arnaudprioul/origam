import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADERS_SLOT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-headers-slot-props',
    name: 'IDataTableHeadersSlotProps',
    category: 'Data Table',
    descriptionKey: 'interfaces.catalog.i_data_table_headers_slot_props.description',
    descriptionFallback: 'Slot props injected into the DataTable headers slot — provides column definitions, sort state, selection state, and helpers to toggle sort, select-all, and retrieve the sort icon.',
    definition: `export interface IDataTableHeadersSlotProps {
    headers: Array<Array<IInternalDataTableHeader>>
    columns: Array<IInternalDataTableHeader>
    sortBy: UnwrapRef<Ref<Array<IDataTableSortItem>>>
    someSelected: UnwrapRef<ComputedRef<boolean>>
    allSelected: UnwrapRef<ComputedRef<boolean>>
    toggleSort: (column: IInternalDataTableHeader) => void
    selectAll: (value: boolean) => void
    getSortIcon: (column: IInternalDataTableHeader) => TIcon
    isSorted: (column: IInternalDataTableHeader) => boolean
}`,
    extends: [],
    props: [
        { name: 'headers', type: 'Array<Array<IInternalDataTableHeader>>', optional: false, descriptionFallback: 'Resolved header rows (supports multi-row/span headers).' },
        { name: 'columns', type: 'Array<IInternalDataTableHeader>', optional: false, descriptionFallback: 'Flat list of leaf columns, used to iterate cells.' },
        { name: 'sortBy', type: 'UnwrapRef<Ref<Array<IDataTableSortItem>>>', optional: false, descriptionFallback: 'Current sort configuration (key + direction).' },
        { name: 'someSelected', type: 'UnwrapRef<ComputedRef<boolean>>', optional: false, descriptionFallback: 'True when at least one row is selected (indeterminate state).' },
        { name: 'allSelected', type: 'UnwrapRef<ComputedRef<boolean>>', optional: false, descriptionFallback: 'True when every selectable row is selected.' },
        { name: 'toggleSort', type: '(column: IInternalDataTableHeader) => void', optional: false, descriptionFallback: 'Cycles sort direction for the given column.' },
        { name: 'selectAll', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Selects or deselects all rows.' },
        { name: 'getSortIcon', type: '(column: IInternalDataTableHeader) => TIcon', optional: false, descriptionFallback: 'Returns the icon name matching the column sort direction.' },
        { name: 'isSorted', type: '(column: IInternalDataTableHeader) => boolean', optional: false, descriptionFallback: 'Returns true if the column is part of the active sort.' },
    ],
    usedBy: [
        { slug: 'data-table-headers', name: 'OrigamDataTableHeaders', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_headers_slot_props.example',
            titleFallback: 'Custom header slot leveraging IDataTableHeadersSlotProps',
            code: `<template #headers="{ columns, toggleSort, sortBy, isSorted }">
    <tr>
        <th
            v-for="col in columns"
            :key="col.key"
            @click="() => toggleSort(col)"
        >
            {{ col.title }}
            <span v-if="isSorted(col)"> (sorted)</span>
        </th>
    </tr>
</template>`,
            lang: 'html',
        },
    ],
}
