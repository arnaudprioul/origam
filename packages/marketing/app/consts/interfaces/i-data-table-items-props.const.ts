import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_ITEMS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-items-props',
    name: 'IDataTableItemsProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_items_props.description',
    descriptionFallback: 'Configures the items data source of <OrigamDataTable> — the items array, the key extractor, the selectability resolver and per-row/cell prop factories.',
    definition: `export interface IDataTableItemsProps {
    items?: Array<IDataTableItem>
    itemValue?: TSelectItemKey
    itemSelectable?: TSelectItemKey
    rowProps?: TDataTableRow<any>
    cellProps?: TDataTableCell<any>
    returnObject?: boolean
}`,
    extends: [],
    props: [
        { name: 'items', type: 'Array<IDataTableItem>', optional: true, descriptionFallback: 'Array of data objects to display, one per row.' },
        { name: 'itemValue', type: 'TSelectItemKey', optional: true, descriptionFallback: 'Property path (or function) used to derive the unique key for each item — required for selection and expansion tracking.' },
        { name: 'itemSelectable', type: 'TSelectItemKey', optional: true, descriptionFallback: 'Property path (or function) that returns a boolean indicating whether a row can be selected.' },
        { name: 'rowProps', type: 'TDataTableRow<any>', optional: true, descriptionFallback: 'Object or function returning extra props (class, style, data-*…) merged onto each <tr> root element.' },
        { name: 'cellProps', type: 'TDataTableCell<any>', optional: true, descriptionFallback: 'Object or function returning extra props merged onto each <td> cell element.' },
        { name: 'returnObject', type: 'boolean', optional: true, descriptionFallback: 'When true, v-model:modelValue and select events return the full raw object instead of the extracted itemValue.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/items.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_items_props.example',
            titleFallback: 'DataTable with custom itemValue and rowProps',
            code: `<OrigamDataTable
    :items="users"
    item-value="id"
    :row-props="({ item }) => ({ class: item.active ? 'active-row' : '' })"
/>`,
            lang: 'vue',
        },
    ],
}
