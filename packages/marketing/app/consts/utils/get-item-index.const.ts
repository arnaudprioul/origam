import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_ITEM_INDEX_UTIL_DOC: IUtilDoc = {
    slug: 'get-item-index',
    name: 'getItemIndex',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_item_index.description',
    descriptionFallback: 'Finds the array index of the group item whose ID matches the resolved ID of the given value. Returns -1 when no match is found.',
    signature: `function getItemIndex(
  items: UnwrapRef<Array<IGroupItem>>,
  value: unknown
): number`,
    params: [
        {
            name: 'items',
            type: 'UnwrapRef<Array<IGroupItem>>',
            required: true,
            descriptionKey: 'utils.detail.get_item_index.param_items',
            descriptionFallback: 'The reactive list of registered group items (id + value pairs).',
        },
        {
            name: 'value',
            type: 'unknown',
            required: true,
            descriptionKey: 'utils.detail.get_item_index.param_value',
            descriptionFallback: 'The value to look up. Internally passed to getIds() which performs deep equality matching and index-fallback resolution.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_item_index.returns',
        descriptionFallback: 'The zero-based index of the matching item in the items array, or -1 when not found.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_item_index.example_basic',
            titleFallback: 'Find the position of a selected value',
            code: `import { getItemIndex } from 'origam'

const items = [
  { id: 0, value: 'home' },
  { id: 1, value: 'about' },
]
getItemIndex(items, 'about')  // → 1
getItemIndex(items, 'missing')  // → -1`,
            lang: 'typescript',
        },
    ],
    related: ['get-ids'],
}
