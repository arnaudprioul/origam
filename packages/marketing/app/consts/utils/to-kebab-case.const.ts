import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TO_KEBAB_CASE_UTIL_DOC: IUtilDoc = {
    slug: 'to-kebab-case',
    name: 'toKebabCase',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.to_kebab_case.description',
    descriptionFallback: 'Convert any string (camelCase, PascalCase, etc.) to kebab-case by replacing non-alpha characters with hyphens and inserting a hyphen before each uppercase letter. Results are cached for performance.',
    signature: `function toKebabCase(str?: string): string`,
    params: [
        {
            name: 'str',
            type: 'string',
            required: false,
            defaultValue: "''",
            descriptionKey: 'utils.detail.to_kebab_case.param_str',
            descriptionFallback: 'The input string to convert. Defaults to an empty string when omitted.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.to_kebab_case.returns',
        descriptionFallback: 'A lowercase, hyphen-separated string. Results are memoised in an internal Map so repeated calls with the same input are O(1).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.to_kebab_case.example_basic',
            titleFallback: 'Convert different case conventions',
            code: `import { toKebabCase } from 'origam'

toKebabCase('camelCase')   // → 'camel-case'
toKebabCase('PascalCase')  // → '-pascal-case'
toKebabCase('myProp123')   // → 'my-prop123'
toKebabCase()              // → ''`,
            lang: 'typescript',
        },
    ],
    related: ['event-name', 'convert-to-unit'],
}
