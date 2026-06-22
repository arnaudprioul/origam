import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_ITEM_BASE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-item-base',
    name: 'IDataTableItemBase',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_data_table_item_base.description',
    descriptionFallback: 'Base shape shared by all row slot contexts in <OrigamDataTable> — provides the row index, raw item, its resolved internal item, and handlers for expand and select.',
    definition: `export interface IDataTableItemBase<T = any> {
    index: number
    item: T
    internalItem: IDataTableItem<T>
    isExpanded: (item: IDataTableItem) => boolean
    toggleExpand: (item: IDataTableItem) => void
    isSelected: (items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean
    toggleSelect: (item: IDataTableSelectableItem) => void
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Zero-based position of this row in the rendered items list.' },
        { name: 'item', type: 'T', optional: false, descriptionFallback: 'The raw data object for this row.' },
        { name: 'internalItem', type: 'IDataTableItem<T>', optional: false, descriptionFallback: 'The resolved internal item wrapping the raw object with computed key, columns map, and selection/expansion flags.' },
        { name: 'isExpanded', type: '(item: IDataTableItem) => boolean', optional: false, descriptionFallback: 'Returns true when the given row is currently expanded.' },
        { name: 'toggleExpand', type: '(item: IDataTableItem) => void', optional: false, descriptionFallback: 'Toggles the expanded state of the given row.' },
        { name: 'isSelected', type: '(items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean', optional: false, descriptionFallback: 'Returns true when all given items are currently selected.' },
        { name: 'toggleSelect', type: '(item: IDataTableSelectableItem) => void', optional: false, descriptionFallback: 'Toggles the selected state of the given item.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/items.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_item_base.example',
            titleFallback: 'Row slot using IDataTableItemBase handlers',
            code: `<OrigamDataTable :items="rows" show-expand>
    <template #item="{ item, index, isExpanded, toggleExpand }">
        <tr @click="toggleExpand(item)">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ isExpanded(item) ? 'open' : 'closed' }}</td>
        </tr>
    </template>
</OrigamDataTable>`,
            lang: 'vue',
        },
    ],
}
