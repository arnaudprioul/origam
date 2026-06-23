import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_SELECTABLE_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-selectable-item',
    name: 'IDataTableSelectableItem',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_selectable_item.description',
    descriptionFallback: 'Minimal shape that every selectable row must satisfy — carries the resolved selection key and an optional flag to opt the row out of selection.',
    definition: `export interface IDataTableSelectableItem {
    value?: any
    selectable?: boolean
}`,
    extends: [],
    props: [
        { name: 'value', type: 'any', optional: true, descriptionFallback: 'The resolved unique key for this item (derived from itemValue). Used as the selection set entry.' },
        { name: 'selectable', type: 'boolean', optional: true, descriptionFallback: 'When false, the row is excluded from selection regardless of the current strategy.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/select.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_selectable_item.example',
            titleFallback: 'Marking rows as non-selectable',
            code: `const users = [
    { id: 1, name: 'Alice', selectable: true },
    { id: 2, name: 'Bob',   selectable: false }, // row is disabled
]`,
            lang: 'typescript',
        },
    ],
}
