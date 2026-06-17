import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TRANSFORM_DATA_TABLE_ITEMS_UTIL_DOC: IUtilDoc = {
    slug: 'transform-data-table-items',
    name: 'transformDataTableItems',
    category: 'DataTable',
    icon: 'mdi-table',
    descriptionKey: 'utils.catalog.transform_data_table_items.description',
    descriptionFallback: 'Map an array of raw data objects to normalised IDataTableItem rows by calling transformDataTableItem for each entry. Returns an empty array when items is undefined.',
    signature: `function transformDataTableItems(
  props: Omit<IDataTableItemsProps, 'items'>,
  items: Array<IDataTableItem> | undefined,
  columns: Array<IInternalDataTableHeader>
): Array<IDataTableItem>`,
    params: [
        {
            name: 'props',
            type: 'Omit<IDataTableItemsProps, "items">',
            required: true,
            descriptionKey: 'utils.detail.transform_data_table_items.param_props',
            descriptionFallback: 'The DataTable props driving value/key/selectable resolution (same as transformDataTableItem).',
        },
        {
            name: 'items',
            type: 'Array<IDataTableItem> | undefined',
            required: true,
            descriptionKey: 'utils.detail.transform_data_table_items.param_items',
            descriptionFallback: 'Raw data rows to normalise. Passing `undefined` returns an empty array without throwing.',
        },
        {
            name: 'columns',
            type: 'Array<IInternalDataTableHeader>',
            required: true,
            descriptionKey: 'utils.detail.transform_data_table_items.param_columns',
            descriptionFallback: 'Resolved column descriptors forwarded to transformDataTableItem for per-column value extraction.',
        },
    ],
    returns: {
        type: 'Array<IDataTableItem>',
        descriptionKey: 'utils.detail.transform_data_table_items.returns',
        descriptionFallback: 'A new array of normalised rows. The length matches the input when items is defined; empty array otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/items.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.transform_data_table_items.example_basic',
            titleFallback: 'Normalise all rows of a table',
            code: `import { transformDataTableItems } from 'origam'

const rows = transformDataTableItems(
  { itemValue: 'id', itemSelectable: undefined, returnObject: false },
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  [{ key: 'name', value: 'name' }]
)
// rows[0].value → 1
// rows[0].columns → { name: 'Alice' }`,
            lang: 'typescript',
        },
    ],
    related: ['transform-data-table-item', 'transform-list-items'],
}
