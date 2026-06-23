import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_ITEM_KEY_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-item-key',
    name: 'IDataTableItemKey',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_data_table_item_key.description',
    descriptionFallback: 'Slot props for per-cell slots in <OrigamDataTable> (e.g. #item.{key}) — extends IDataTableItemBase with the resolved cell value and the column definition.',
    definition: `export interface IDataTableItemKey<T = any> extends IDataTableItemBase<T> {
    value: any
    column: IInternalDataTableHeader
}`,
    extends: ['IDataTableItemBase'],
    props: [
        { name: 'value', type: 'any', optional: false, descriptionFallback: 'The resolved cell value for this column, computed from the row object via the column value accessor.' },
        { name: 'column', type: 'IInternalDataTableHeader', optional: false, descriptionFallback: 'The resolved internal column definition for this cell.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/items.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_item_key.example',
            titleFallback: 'Custom cell renderer for the name column',
            code: `<OrigamDataTable :headers="headers" :items="rows">
    <template #item.name="{ value, item }">
        <strong>{{ value }}</strong>
        <span> ({{ item.email }})</span>
    </template>
</OrigamDataTable>`,
            lang: 'vue',
        },
    ],
}
