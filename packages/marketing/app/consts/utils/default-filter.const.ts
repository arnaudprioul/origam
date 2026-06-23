import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DEFAULT_FILTER_UTIL_DOC: IUtilDoc = {
    slug: 'default-filter',
    name: 'defaultFilter',
    category: 'Commons',
    icon: 'mdi-filter-outline',
    descriptionKey: 'utils.catalog.default_filter.description',
    descriptionFallback: 'Case-insensitive substring search. Returns the index of the query inside the stringified value, or -1 when there is no match or either argument is null.',
    signature: `function defaultFilter(value: string | number, query: string | number): number`,
    params: [
        {
            name: 'value',
            type: 'string | number',
            required: true,
            descriptionKey: 'utils.detail.default_filter.param_value',
            descriptionFallback: 'The item value to search within. Converted to lowercase string before comparison.',
        },
        {
            name: 'query',
            type: 'string | number',
            required: true,
            descriptionKey: 'utils.detail.default_filter.param_query',
            descriptionFallback: 'The search term. Converted to lowercase string before comparison.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.default_filter.returns',
        descriptionFallback: 'The index of the first occurrence of query in value (locale-insensitive), or -1 when not found or when either argument is null.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/filters.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.default_filter.example_basic',
            titleFallback: 'Substring match',
            code: `import { defaultFilter } from 'origam'

defaultFilter('Hello World', 'world') // → 6  (found at index 6)
defaultFilter('Hello World', 'xyz')   // → -1 (not found)
defaultFilter(null, 'query')          // → -1 (null guard)`,
            lang: 'typescript',
        },
    ],
    related: ['filter-items'],
}
