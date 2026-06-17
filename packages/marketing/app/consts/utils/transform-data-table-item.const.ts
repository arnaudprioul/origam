import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TRANSFORM_DATA_TABLE_ITEM_UTIL_DOC: IUtilDoc = {
    slug: 'transform-data-table-item',
    name: 'transformDataTableItem',
    category: 'DataTable',
    icon: 'mdi-table-row',
    descriptionKey: 'utils.catalog.transform_data_table_item.description',
    descriptionFallback: 'Convert one raw data object to an IDataTableItem with a normalised `value`, `key`, `selectable` flag, pre-resolved per-column values, and the original `raw` reference. Used internally by transformDataTableItems.',
    signature: `function transformDataTableItem(
  props: Omit<IDataTableItemsProps, 'items'>,
  item: IDataTableItem,
  index: number,
  columns: Array<IInternalDataTableHeader>
): IDataTableItem`,
    params: [
        {
            name: 'props',
            type: 'Omit<IDataTableItemsProps, "items">',
            required: true,
            descriptionKey: 'utils.detail.transform_data_table_item.param_props',
            descriptionFallback: 'The DataTable props that drive value/key resolution: `itemValue`, `itemSelectable`, `returnObject`, and `itemProps`.',
        },
        {
            name: 'item',
            type: 'IDataTableItem',
            required: true,
            descriptionKey: 'utils.detail.transform_data_table_item.param_item',
            descriptionFallback: 'The raw data row object to normalise.',
        },
        {
            name: 'index',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.transform_data_table_item.param_index',
            descriptionFallback: 'Zero-based position of the item in its parent array, stored on the result as `index`.',
        },
        {
            name: 'columns',
            type: 'Array<IInternalDataTableHeader>',
            required: true,
            descriptionKey: 'utils.detail.transform_data_table_item.param_columns',
            descriptionFallback: 'The resolved column descriptors. Each column with a non-null `key` gets its value pre-extracted into `result.columns`.',
        },
    ],
    returns: {
        type: 'IDataTableItem',
        descriptionKey: 'utils.detail.transform_data_table_item.returns',
        descriptionFallback: 'A normalised row with `type: "item"`, `key`, `value`, `selectable`, `columns` (per-column values map), and `raw` (original object).',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/items.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.transform_data_table_item.example_basic',
            titleFallback: 'Normalise a single table row',
            code: `import { transformDataTableItem } from 'origam'

const item = { id: 1, name: 'Alice', role: 'admin' }
const columns = [
  { key: 'name', value: 'name' },
  { key: 'role', value: 'role' },
]

const row = transformDataTableItem(
  { itemValue: 'id', itemSelectable: undefined, returnObject: false },
  item,
  0,
  columns
)
// row.value → 1
// row.columns → { name: 'Alice', role: 'admin' }`,
            lang: 'typescript',
        },
    ],
    related: ['transform-data-table-items', 'transform-list-item'],
}
