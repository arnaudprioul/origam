import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FUZZY_MATCH_UTIL_DOC: IUtilDoc = {
    slug: 'fuzzy-match',
    name: 'fuzzyMatch',
    category: 'CommandPalette',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.fuzzy_match.description',
    descriptionFallback: 'Score and filter an array of items against a fuzzy query string using a subsequence + positional scoring algorithm. Returns matched items sorted by descending score. An empty query returns all items with score 0.',
    signature: `function fuzzyMatch<T>(
  items: ReadonlyArray<T>,
  query: string,
  getHaystack: (item: T) => { label: string; haystack: string }
): Array<IFuzzyMatchResult<T>>`,
    params: [
        {
            name: 'items',
            type: 'ReadonlyArray<T>',
            required: true,
            descriptionKey: 'utils.detail.fuzzy_match.param_items',
            descriptionFallback: 'The full list of items to match against.',
        },
        {
            name: 'query',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.fuzzy_match.param_query',
            descriptionFallback: 'The search string. Matching is case-insensitive. Empty string returns all items.',
        },
        {
            name: 'getHaystack',
            type: '(item: T) => { label: string; haystack: string }',
            required: true,
            descriptionKey: 'utils.detail.fuzzy_match.param_get_haystack',
            descriptionFallback: 'Extractor function. "label" is used for display-quality scoring (prefix/word bonuses); "haystack" is the full searchable text for subsequence matching.',
        },
    ],
    returns: {
        type: 'Array<IFuzzyMatchResult<T>>',
        descriptionKey: 'utils.detail.fuzzy_match.returns',
        descriptionFallback: 'Matched items wrapped in IFuzzyMatchResult { item, score }, sorted by score descending. Non-matching items are omitted.',
    },
    sourceFile: 'packages/ds/src/utils/CommandPalette/fuzzy-match.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.fuzzy_match.example_basic',
            titleFallback: 'Filter a command list',
            code: `import { fuzzyMatch } from 'origam'

const commands = [
  { id: 'new-file', title: 'New File' },
  { id: 'open-folder', title: 'Open Folder' },
]
const results = fuzzyMatch(commands, 'nf', (cmd) => ({
  label: cmd.title,
  haystack: cmd.title,
}))
// results[0].item → { id: 'new-file', title: 'New File' }`,
            lang: 'typescript',
        },
    ],
    related: ['flatten-items'],
}
