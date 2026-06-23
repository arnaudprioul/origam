import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_HIGHLIGHT_LINES_UTIL_DOC: IUtilDoc = {
    slug: 'parse-highlight-lines',
    name: 'parseHighlightLines',
    category: 'Code',
    icon: 'mdi-code-tags',
    descriptionKey: 'utils.catalog.parse_highlight_lines.description',
    descriptionFallback: 'Parse the `highlight-lines` prop of `<OrigamCode>` into a sorted, deduplicated array of 1-based line numbers. Accepts a number array, a comma/range string (e.g. `"1,3-5,7"`), or null/undefined (returns `[]`).',
    signature: `function parseHighlightLines(input: number[] | string | null | undefined): number[]`,
    params: [
        {
            name: 'input',
            type: 'number[] | string | null | undefined',
            required: true,
            descriptionKey: 'utils.detail.parse_highlight_lines.param_input',
            descriptionFallback: 'A number array, a comma- and/or range-separated string (e.g. `"1"`, `"1,3"`, `"1-3"`, `"1,3-5,7"`), or null/undefined. Whitespace inside the string is ignored. Zeros, negatives, and non-finite values are dropped silently.',
        },
    ],
    returns: {
        type: 'number[]',
        descriptionKey: 'utils.detail.parse_highlight_lines.returns',
        descriptionFallback: 'A sorted, deduplicated array of 1-based line numbers, or `[]` when the input is null, undefined, empty, or contains no valid numbers.',
    },
    sourceFile: 'packages/ds/src/utils/Code/parse-highlight-lines.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_highlight_lines.example_basic',
            titleFallback: 'Parse highlight ranges',
            code: `import { parseHighlightLines } from 'origam'

parseHighlightLines('1,3-5,7')   // → [1, 3, 4, 5, 7]
parseHighlightLines([2, 5])       // → [2, 5]
parseHighlightLines('  2 , 5-7 ') // → [2, 5, 6, 7]
parseHighlightLines('foo')        // → []
parseHighlightLines(null)         // → []`,
            lang: 'typescript',
        },
    ],
    related: [],
}
