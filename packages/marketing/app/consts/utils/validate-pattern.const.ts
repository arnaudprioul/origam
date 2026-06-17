import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const VALIDATE_PATTERN_UTIL_DOC: IUtilDoc = {
    slug: 'validate-pattern',
    name: 'validatePattern',
    category: 'Mask',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.validate_pattern.description',
    descriptionFallback: 'Run a named or custom validator against an unmasked string. Named validators (e.g. "numeric", "alpha") are looked up in the built-in VALIDATORS registry; unknown names throw to catch typos early.',
    signature: `function validatePattern(
  unmasked: string,
  validator: TPatternValidator
): boolean`,
    params: [
        {
            name: 'unmasked',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.validate_pattern.param_unmasked',
            descriptionFallback: 'The raw value after mask characters have been stripped (output of unmaskValue).',
        },
        {
            name: 'validator',
            type: 'TPatternValidator',
            required: true,
            descriptionKey: 'utils.detail.validate_pattern.param_validator',
            descriptionFallback: 'Either a named validator string (e.g. "numeric", "alpha", "alphanumeric") or a custom (s: string) => boolean function.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.validate_pattern.returns',
        descriptionFallback: 'true when the unmasked value satisfies the validator, false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/validate-pattern.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.validate_pattern.example_basic',
            titleFallback: 'Named and custom validators',
            code: `import { validatePattern } from 'origam'

validatePattern('1234567890', 'numeric')  // → true
validatePattern('abc123', 'numeric')      // → false

// Custom validator
validatePattern('hello', (s) => s.length >= 3)  // → true`,
            lang: 'typescript',
        },
    ],
    related: ['unmask-value', 'apply-mask'],
}
