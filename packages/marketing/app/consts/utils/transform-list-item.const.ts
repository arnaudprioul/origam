import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TRANSFORM_LIST_ITEM_UTIL_DOC: IUtilDoc = {
    slug: 'transform-list-item',
    name: 'transformListItem',
    category: 'List',
    icon: 'mdi-format-list-bulleted',
    descriptionKey: 'utils.catalog.transform_list_item.description',
    descriptionFallback: 'Convert one raw item (string or object) to a normalised IInternalListItem with resolved title, value, optional children array, itemProps, and the original raw reference.',
    signature: `function transformListItem(
  props: Omit<IItemProps, 'items'>,
  item: any
): IInternalListItem`,
    params: [
        {
            name: 'props',
            type: 'Omit<IItemProps, "items">',
            required: true,
            descriptionKey: 'utils.detail.transform_list_item.param_props',
            descriptionFallback: 'List props that control field extraction: `itemTitle`, `itemValue`, `itemChildren`, and `itemProps`.',
        },
        {
            name: 'item',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.transform_list_item.param_item',
            descriptionFallback: 'The raw item — a string or a plain object. Strings are used directly as the title; objects are walked by the `itemTitle`/`itemValue` path props.',
        },
    ],
    returns: {
        type: 'IInternalListItem',
        descriptionKey: 'utils.detail.transform_list_item.returns',
        descriptionFallback: 'A normalised object with `title` (string), `value`, `props`, `children` (recursively transformed array or undefined), and `raw` (original item).',
    },
    sourceFile: 'packages/ds/src/utils/List/list-item.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.transform_list_item.example_basic',
            titleFallback: 'Normalise a plain object item',
            code: `import { transformListItem } from 'origam'

const item = transformListItem(
  { itemTitle: 'label', itemValue: 'id', itemChildren: 'children', itemProps: false },
  { id: 42, label: 'Settings', children: [] }
)
// item.title  → 'Settings'
// item.value  → 42
// item.children → []`,
            lang: 'typescript',
        },
    ],
    related: ['transform-list-items', 'transform-data-table-item'],
}
