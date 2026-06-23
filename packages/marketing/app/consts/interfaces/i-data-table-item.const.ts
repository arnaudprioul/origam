import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-item',
    name: 'IDataTableItem',
    category: 'Data Table',
    descriptionKey: 'interfaces.catalog.i_data_table_item.description',
    descriptionFallback: 'Internal representation of a single data-table row — extends IInternalItem, IDataTableGroupableItem, and IDataTableSelectableItem with a unique key, row index, and a pre-computed column values map.',
    definition: `export interface IDataTableItem<T = any> extends IInternalItem<T>, IDataTableGroupableItem<T>, IDataTableSelectableItem {
    key: any
    index: number
    columns: {
        [key: string]: any
    }
}`,
    extends: ['IInternalItem', 'IDataTableGroupableItem', 'IDataTableSelectableItem'],
    props: [
        { name: 'key', type: 'any', optional: false, descriptionFallback: 'Unique key derived from itemValue; used to track selection and expansion state.' },
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Zero-based position of the item in the current (possibly filtered/sorted) dataset.' },
        { name: 'columns', type: '{ [key: string]: any }', optional: false, descriptionFallback: 'Pre-resolved cell values keyed by column key.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'OrigamDataTable', kind: 'component' },
        { slug: 'data-table-row', name: 'OrigamDataTableRow', kind: 'component' },
        { slug: 'data-table-rows', name: 'OrigamDataTableRows', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/items.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_item.example',
            titleFallback: 'Reading internal item values in a custom cell slot',
            code: `<template #item.name="{ item }">
    <!-- item is typed as IDataTableItem -->
    <strong>{{ item.columns.name }}</strong>
    <small> (#{{ item.index }})</small>
</template>`,
            lang: 'html',
        },
    ],
}
