import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_GROUP_HEADER_SLOT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-group-header-slot',
    name: 'IDataTableGroupHeaderSlot',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_data_table_group_header_slot.description',
    descriptionFallback: 'Slot props injected into the #group-header slot of <OrigamDataTable> — extends IDataTableItemBase with the group item, column list, and group-open/select/expand handlers.',
    definition: `export interface IDataTableGroupHeaderSlot<T = IDataTableGroup> extends IDataTableItemBase<T> {
    index: number
    item: T
    columns: IInternalDataTableHeader[]
    isExpanded: (item: IDataTableItem) => boolean
    toggleExpand: (item: IDataTableItem) => void
    isSelected: (items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean
    toggleSelect: (item: IDataTableSelectableItem) => void
    toggleGroup: (group: IDataTableGroup) => void
    isGroupOpen: (group: IDataTableGroup) => boolean
}`,
    extends: ['IDataTableItemBase'],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Position of this group header in the rendered list.' },
        { name: 'item', type: 'T', optional: false, descriptionFallback: 'The group descriptor (IDataTableGroup by default).' },
        { name: 'columns', type: 'IInternalDataTableHeader[]', optional: false, descriptionFallback: 'Flattened column definitions.' },
        { name: 'isExpanded', type: '(item: IDataTableItem) => boolean', optional: false, descriptionFallback: 'Returns true when the given row is expanded.' },
        { name: 'toggleExpand', type: '(item: IDataTableItem) => void', optional: false, descriptionFallback: 'Toggles row expansion.' },
        { name: 'isSelected', type: '(items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean', optional: false, descriptionFallback: 'Returns true when all given items are selected.' },
        { name: 'toggleSelect', type: '(item: IDataTableSelectableItem) => void', optional: false, descriptionFallback: 'Toggles row selection.' },
        { name: 'toggleGroup', type: '(group: IDataTableGroup) => void', optional: false, descriptionFallback: 'Opens or closes the group.' },
        { name: 'isGroupOpen', type: '(group: IDataTableGroup) => boolean', optional: false, descriptionFallback: 'Returns true when the group is currently open (expanded).' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_group_header_slot.example',
            titleFallback: 'Rendering a custom group header row',
            code: `<OrigamDataTable :groupBy="[{ key: 'category' }]" :items="rows">
    <template #group-header="{ item, toggleGroup, isGroupOpen }">
        <tr>
            <td colspan="5" @click="toggleGroup(item)">
                {{ item.value }} {{ isGroupOpen(item) ? '▲' : '▼' }}
            </td>
        </tr>
    </template>
</OrigamDataTable>`,
            lang: 'vue',
        },
    ],
}
