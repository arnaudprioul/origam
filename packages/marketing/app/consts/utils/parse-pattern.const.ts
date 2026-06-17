import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_PATTERN_UTIL_DOC: IUtilDoc = {
    slug: 'parse-pattern',
    name: 'parsePattern',
    category: 'Mask',
    icon: 'mdi-regex',
    descriptionKey: 'utils.catalog.parse_pattern.description',
    descriptionFallback: 'Compile a mask pattern string into an array of `IMaskToken` objects. `#` matches a digit, `A` matches a letter, `*` matches any character, and all other characters become literal separators. Results are cached per pattern.',
    signature: `function parsePattern(pattern: string): Array<IMaskToken>`,
    params: [
        {
            name: 'pattern',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.parse_pattern.param_pattern',
            descriptionFallback: 'The mask pattern string. Special characters: `#` (digit), `A` (letter), `*` (any). Every other character is treated as a literal separator (e.g. `-`, `/`, `(`, `)`).',
        },
    ],
    returns: {
        type: 'Array<IMaskToken>',
        descriptionKey: 'utils.detail.parse_pattern.returns',
        descriptionFallback: 'An array of token descriptors, each with `{ kind, char, consumer }`. `consumer: true` means the token consumes one character of user input; `consumer: false` means it is a literal automatically inserted.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/apply-mask.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_pattern.example_basic',
            titleFallback: 'Compile a phone number mask',
            code: `import { parsePattern } from 'origam'

parsePattern('(##) ####-####')
// → [
//   { kind: 'literal', char: '(', consumer: false },
//   { kind: 'digit',   char: '#', consumer: true  },
//   { kind: 'digit',   char: '#', consumer: true  },
//   { kind: 'literal', char: ')', consumer: false },
//   ...
// ]`,
            lang: 'typescript',
        },
    ],
    related: ['apply-mask'],
}
