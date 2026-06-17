import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FLATTEN_ITEMS_UTIL_DOC: IUtilDoc = {
    slug: 'flatten-items',
    name: 'flattenItems',
    category: 'DataTable',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.flatten_items.description',
    descriptionFallback: 'Flatten a DataTable item tree (rows + groups) according to the current open-group set, returning only the rows that should be visible at the current expansion state.',
    signature: `function flattenItems<T extends IDataTableGroupableItem>(
  items: Array<T | IDataTableGroup<T>>,
  opened: Set<string>
): Array<T | IDataTableGroup<T>>`,
    params: [
        {
            name: 'items',
            type: 'Array<T | IDataTableGroup<T>>',
            required: true,
            descriptionKey: 'utils.detail.flatten_items.param_items',
            descriptionFallback: 'The mixed array of leaf rows and group nodes to flatten.',
        },
        {
            name: 'opened',
            type: 'Set<string>',
            required: true,
            descriptionKey: 'utils.detail.flatten_items.param_opened',
            descriptionFallback: 'Set of group IDs that are currently expanded. A group not in this set hides its children.',
        },
    ],
    returns: {
        type: 'Array<T | IDataTableGroup<T>>',
        descriptionKey: 'utils.detail.flatten_items.returns',
        descriptionFallback: 'A flat array of visible items in the order they should be rendered by the DataTable.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.flatten_items.example_basic',
            titleFallback: 'Flatten with one open group',
            code: `import { flattenItems } from 'origam'

const groups = [
  { type: 'group', id: 'g1', value: 'A', items: [{ id: 1 }, { id: 2 }] },
  { type: 'group', id: 'g2', value: 'B', items: [{ id: 3 }] },
]
// only group g1 is open
const rows = flattenItems(groups, new Set(['g1']))
// → [group A, { id:1 }, { id:2 }, group B]`,
            lang: 'typescript',
        },
    ],
    related: ['flatten-fragments'],
}
