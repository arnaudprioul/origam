import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const EXTRACT_KEYS_UTIL_DOC: IUtilDoc = {
    slug: 'extract-keys',
    name: 'extractKeys',
    category: 'DataTable',
    icon: 'mdi-key-variant',
    descriptionKey: 'utils.catalog.extract_keys.description',
    descriptionFallback: 'Recursively collects all header key values from a nested DataTable header tree into a Set. Traverses children arrays automatically.',
    signature: `function extractKeys(
  headers: Array<IDataTableHeader>,
  keys?: Set<string>
): Set<string>`,
    params: [
        {
            name: 'headers',
            type: 'Array<IDataTableHeader>',
            required: true,
            descriptionKey: 'utils.detail.extract_keys.param_headers',
            descriptionFallback: 'The flat or nested array of DataTable header definitions to traverse.',
        },
        {
            name: 'keys',
            type: 'Set<string>',
            required: false,
            defaultValue: 'new Set<string>()',
            descriptionKey: 'utils.detail.extract_keys.param_keys',
            descriptionFallback: 'An existing Set to accumulate keys into. A new empty Set is created when omitted.',
        },
    ],
    returns: {
        type: 'Set<string>',
        descriptionKey: 'utils.detail.extract_keys.returns',
        descriptionFallback: 'The (possibly pre-populated) Set with all header key values appended.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/headers.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.extract_keys.example_basic',
            titleFallback: 'Collect column keys from nested headers',
            code: `import { extractKeys } from 'origam'

const headers = [
    { key: 'name', title: 'Name' },
    {
        title: 'Address',
        children: [
            { key: 'city', title: 'City' },
            { key: 'zip', title: 'ZIP' },
        ],
    },
]

extractKeys(headers) // → Set { 'name', 'city', 'zip' }`,
            lang: 'typescript',
        },
    ],
    related: ['extract-leaves', 'filter-items'],
}
