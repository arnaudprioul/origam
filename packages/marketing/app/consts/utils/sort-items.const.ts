import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SORT_ITEMS_UTIL_DOC: IUtilDoc = {
    slug: 'sort-items',
    name: 'sortItems',
    category: 'DataTable',
    icon: 'mdi-sort',
    descriptionKey: 'utils.catalog.sort_items.description',
    descriptionFallback: 'Sort an array of internal data-table items by one or more sort keys and directions, with optional custom compare functions per key.',
    signature: `function sortItems<T extends IInternalItem>(
  items: T[],
  sortByItems: Array<IDataTableSortItem>,
  options?: {
    transform?: (item: T) => Record<string, any>
    sortFunctions?: Record<string, TDataTableCompareFunction>
    sortRawFunctions?: Record<string, TDataTableCompareFunction>
  }
): T[]`,
    params: [
        {
            name: 'items',
            type: 'T[]',
            required: true,
            descriptionKey: 'utils.detail.sort_items.param_items',
            descriptionFallback: 'The array of internal items to sort. Each item must satisfy IInternalItem (has a raw property).',
        },
        {
            name: 'sortByItems',
            type: 'Array<IDataTableSortItem>',
            required: true,
            descriptionKey: 'utils.detail.sort_items.param_sort_by_items',
            descriptionFallback: 'Ordered list of sort descriptors. Each entry specifies a key and an order ("asc" | "desc" | false).',
        },
        {
            name: 'options',
            type: '{ transform?, sortFunctions?, sortRawFunctions? }',
            required: false,
            descriptionKey: 'utils.detail.sort_items.param_options',
            descriptionFallback: 'Optional overrides: transform maps an item before comparison; sortFunctions and sortRawFunctions provide per-key compare functions.',
        },
    ],
    returns: {
        type: 'T[]',
        descriptionKey: 'utils.detail.sort_items.returns',
        descriptionFallback: 'A new sorted array of items. The original array is not mutated.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/sort.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.sort_items.example_basic',
            titleFallback: 'Sort by a single key ascending',
            code: `import { sortItems } from 'origam'

const sorted = sortItems(
  [{ raw: { name: 'Bob' } }, { raw: { name: 'Alice' } }],
  [{ key: 'name', order: 'asc' }]
)
// → [{ raw: { name: 'Alice' } }, { raw: { name: 'Bob' } }]`,
            lang: 'typescript',
        },
    ],
    related: ['filter-items', 'group-items'],
}
