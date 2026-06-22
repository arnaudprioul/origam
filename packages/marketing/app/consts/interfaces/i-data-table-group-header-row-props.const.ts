import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_GROUP_HEADER_ROW_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-group-header-row-props',
    name: 'IDataTableGroupHeaderRowProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_group_header_row_props.description',
    descriptionFallback: 'Props for the group header row component in <OrigamDataTable> — carries the group item, its resolved internal item, column definitions, and handlers for expand/select/group-toggle interactions.',
    definition: `export interface IDataTableGroupHeaderRowProps<T = IDataTableGroup> extends ICommonsComponentProps, IColorProps, IPaddingProps {
    index: number
    item: T
    internalItem: IDataTableItem<T>
    columns: IInternalDataTableHeader[]
    isExpanded: (item: IDataTableItem) => boolean
    toggleExpand: (item: IDataTableItem) => void
    isSelected: (items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean
    toggleSelect: (item: IDataTableSelectableItem) => void
    toggleGroup: (group: IDataTableGroup) => void
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IPaddingProps'],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Position of this group header in the rendered row list.' },
        { name: 'item', type: 'T', optional: false, descriptionFallback: 'The raw group descriptor (IDataTableGroup by default).' },
        { name: 'internalItem', type: 'IDataTableItem<T>', optional: false, descriptionFallback: 'The resolved internal item wrapping the group for selection/expansion APIs.' },
        { name: 'columns', type: 'IInternalDataTableHeader[]', optional: false, descriptionFallback: 'Flattened column definitions, used to render the correct number of cells.' },
        { name: 'isExpanded', type: '(item: IDataTableItem) => boolean', optional: false, descriptionFallback: 'Returns true when the given row is currently expanded.' },
        { name: 'toggleExpand', type: '(item: IDataTableItem) => void', optional: false, descriptionFallback: 'Toggles the expanded state of the given row.' },
        { name: 'isSelected', type: '(items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean', optional: false, descriptionFallback: 'Returns true when all given items are currently selected.' },
        { name: 'toggleSelect', type: '(item: IDataTableSelectableItem) => void', optional: false, descriptionFallback: 'Toggles the selected state of the given item.' },
        { name: 'toggleGroup', type: '(group: IDataTableGroup) => void', optional: false, descriptionFallback: 'Opens or closes the given group.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_group_header_row_props.example',
            titleFallback: 'Custom group header using slot props',
            code: `<OrigamDataTable :groupBy="[{ key: 'status' }]" :items="rows">
    <template #group-header="{ item, toggleGroup }">
        <td colspan="5" @click="toggleGroup(item)">{{ item.value }}</td>
    </template>
</OrigamDataTable>`,
            lang: 'vue',
        },
    ],
}
