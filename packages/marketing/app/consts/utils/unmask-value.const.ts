import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const UNMASK_VALUE_UTIL_DOC: IUtilDoc = {
    slug: 'unmask-value',
    name: 'unmaskValue',
    category: 'Mask',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.unmask_value.description',
    descriptionFallback: 'Strip mask characters from a formatted string and return only the raw user input. Delegates to applyMask() and extracts its unmasked output.',
    signature: `function unmaskValue(value: string, pattern: string): string`,
    params: [
        {
            name: 'value',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.unmask_value.param_value',
            descriptionFallback: 'The masked (formatted) string, e.g. "(12) 3456-7890".',
        },
        {
            name: 'pattern',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.unmask_value.param_pattern',
            descriptionFallback: 'The mask pattern that was applied to produce the formatted value, e.g. "(##) ####-####".',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.unmask_value.returns',
        descriptionFallback: 'The raw characters with mask separators removed, e.g. "1234567890".',
    },
    sourceFile: 'packages/ds/src/utils/Mask/apply-mask.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.unmask_value.example_basic',
            titleFallback: 'Strip mask from a phone number',
            code: `import { unmaskValue } from 'origam'

unmaskValue('(12) 3456-7890', '(##) ####-####')
// → '1234567890'

unmaskValue('12/31/2024', '##/##/####')
// → '12312024'`,
            lang: 'typescript',
        },
    ],
    related: ['apply-mask', 'validate-pattern'],
}
