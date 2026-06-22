import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_ITEM_BASE_SLOT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-item-base-slot',
    name: 'IDataTableItemBaseSlot',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_data_table_item_base_slot.description',
    descriptionFallback: 'Slot props for row-level slots in <OrigamDataTable> — extends IDataTableItemBase with the flat columns array, used by #item and #expanded-item slots.',
    definition: `export interface IDataTableItemBaseSlot<T = any> extends IDataTableItemBase<T> {
    columns: IInternalDataTableHeader[]
}`,
    extends: ['IDataTableItemBase'],
    props: [
        { name: 'columns', type: 'IInternalDataTableHeader[]', optional: false, descriptionFallback: 'Flat list of resolved column definitions for the current row. Use to iterate over cells in a fully custom #item slot.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/items.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_item_base_slot.example',
            titleFallback: 'Fully custom row with dynamic column iteration',
            code: `<OrigamDataTable :headers="headers" :items="rows">
    <template #item="{ item, columns }">
        <tr>
            <td v-for="col in columns" :key="col.key">
                {{ item[col.key] }}
            </td>
        </tr>
    </template>
</OrigamDataTable>`,
            lang: 'vue',
        },
    ],
}
