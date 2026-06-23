import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TRANSFORM_LIST_ITEMS_UTIL_DOC: IUtilDoc = {
    slug: 'transform-list-items',
    name: 'transformListItems',
    category: 'List',
    icon: 'mdi-format-list-bulleted',
    descriptionKey: 'utils.catalog.transform_list_items.description',
    descriptionFallback: 'Map an array of raw items (strings or objects) to normalised IInternalListItemChildren by calling transformListItem for each entry. The main entry-point used by OrigamList and OrigamSelect.',
    signature: `function transformListItems(
  props: IItemProps & { itemType?: string },
  items: Array<string | object>
): Array<IInternalListItemChildren>`,
    params: [
        {
            name: 'props',
            type: 'IItemProps & { itemType?: string }',
            required: true,
            descriptionKey: 'utils.detail.transform_list_items.param_props',
            descriptionFallback: 'The list props controlling field extraction. The optional `itemType` is forwarded but currently unused by transformListItem itself.',
        },
        {
            name: 'items',
            type: 'Array<string | object>',
            required: true,
            descriptionKey: 'utils.detail.transform_list_items.param_items',
            descriptionFallback: 'Raw items to normalise. Each entry is passed to transformListItem.',
        },
    ],
    returns: {
        type: 'Array<IInternalListItemChildren>',
        descriptionKey: 'utils.detail.transform_list_items.returns',
        descriptionFallback: 'An array of normalised list items with the same length as the input.',
    },
    sourceFile: 'packages/ds/src/utils/List/list-item.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.transform_list_items.example_basic',
            titleFallback: 'Build a OrigamList-ready item array',
            code: `import { transformListItems } from 'origam'

const items = transformListItems(
  { itemTitle: 'name', itemValue: 'id', itemChildren: 'children', itemProps: false },
  [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Settings' },
  ]
)
// items[0].title → 'Home'
// items[0].value → 1`,
            lang: 'typescript',
        },
    ],
    related: ['transform-list-item', 'transform-data-table-items'],
}
