import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FILTER_ITEMS_UTIL_DOC: IUtilDoc = {
    slug: 'filter-items',
    name: 'filterItems',
    category: 'Commons',
    icon: 'mdi-filter-multiple-outline',
    descriptionKey: 'utils.catalog.filter_items.description',
    descriptionFallback: 'Filters a list of items against a query string using a configurable filter function. Supports per-key custom filters, key allowlists, and three filter modes: any-key (default), union, every, and intersection.',
    signature: `function filterItems(
  items: readonly (readonly [item: IInternalItem, transformed: Record<string, unknown>])[] | readonly IInternalItem[],
  query: string,
  options?: {
    customKeyFilter?: TFilterKeyFunctions
    default?: TFilterFunction
    filterKeys?: TFilterKeys
    filterMode?: TFilterMode
    noFilter?: boolean
  }
): { index: number, matches: Record<string, TFilterMatch> }[]`,
    params: [
        {
            name: 'items',
            type: 'readonly IInternalItem[] | readonly [IInternalItem, Record<string, unknown>][]',
            required: true,
            descriptionKey: 'utils.detail.filter_items.param_items',
            descriptionFallback: 'The items to filter. Each element is either a plain item or a tuple of [original-item, transformed-item]. The transformed form is used for key lookups.',
        },
        {
            name: 'query',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.filter_items.param_query',
            descriptionFallback: 'The search string to match against. When empty and noFilter is not set, all items are returned.',
        },
        {
            name: 'options',
            type: 'object',
            required: false,
            descriptionKey: 'utils.detail.filter_items.param_options',
            descriptionFallback: 'Optional configuration: customKeyFilter (per-key filter functions), default (fallback filter, defaults to defaultFilter), filterKeys (allowlist of keys to search), filterMode (union | every | intersection), noFilter (bypass filtering).',
        },
    ],
    returns: {
        type: '{ index: number, matches: Record<string, TFilterMatch> }[]',
        descriptionKey: 'utils.detail.filter_items.returns',
        descriptionFallback: 'An array of match objects, each carrying the item\'s original index and a map of which keys matched (and at what position/value).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/filters.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.filter_items.example_basic',
            titleFallback: 'Filter a list by query',
            code: `import { filterItems } from 'origam'

const items = [
    { title: 'Apple', value: 1 },
    { title: 'Banana', value: 2 },
    { title: 'Apricot', value: 3 },
]

filterItems(items, 'ap')
// → [{ index: 0, matches: { title: 0 } }, { index: 2, matches: { title: 0 } }]`,
            lang: 'typescript',
        },
    ],
    related: ['default-filter', 'filter-input-attrs'],
}
