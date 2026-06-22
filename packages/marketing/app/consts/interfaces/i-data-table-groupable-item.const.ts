import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_GROUPABLE_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-groupable-item',
    name: 'IDataTableGroupableItem',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_data_table_groupable_item.description',
    descriptionFallback: 'Minimal discriminated-union marker for a data row node in a grouped DataTable tree. Carries a type="item" literal to distinguish row nodes from IDataTableGroup group nodes.',
    definition: `export interface IDataTableGroupableItem<T = any> {
    type: 'item'
    raw: T
}`,
    extends: [],
    props: [
        { name: 'type', type: "'item'", optional: false, descriptionFallback: 'Discriminant literal — always "item". Distinguishes data row nodes from group nodes (type: "group") in the mixed tree.' },
        { name: 'raw', type: 'T', optional: false, descriptionFallback: 'The original data object for this row.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_groupable_item.example',
            titleFallback: 'Type-narrowing in a custom cell renderer',
            code: `function renderNode(node: IDataTableGroupableItem | IDataTableGroup) {
    if (node.type === 'item') {
        // node is IDataTableGroupableItem — access node.raw
    } else {
        // node is IDataTableGroup
    }
}`,
            lang: 'typescript',
        },
    ],
}
