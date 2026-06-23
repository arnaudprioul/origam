import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_LUHN_VALID_UTIL_DOC: IUtilDoc = {
    slug: 'is-luhn-valid',
    name: 'isLuhnValid',
    category: 'Mask',
    icon: 'mdi-credit-card-check-outline',
    descriptionKey: 'utils.catalog.is_luhn_valid.description',
    descriptionFallback: 'Validates a numeric string using the Luhn checksum algorithm (ISO/IEC 7812). Commonly used to verify credit card numbers, IMEI codes, and SIRET-like sequences.',
    signature: `function isLuhnValid(digits: string): boolean`,
    params: [
        {
            name: 'digits',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_luhn_valid.param_digits',
            descriptionFallback: 'A string containing only ASCII digits. Non-digit characters or empty strings return false immediately without running the checksum.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_luhn_valid.returns',
        descriptionFallback: 'true when the digit string passes the Luhn mod-10 check; false for empty input, non-digit characters, or a bad checksum.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/validate-pattern.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_luhn_valid.example_basic',
            titleFallback: 'Credit card number validation',
            code: `import { isLuhnValid } from 'origam'

isLuhnValid('4532015112830366') // → true  (valid Visa test number)
isLuhnValid('1234567890123456') // → false
isLuhnValid('79927398713')      // → true  (canonical example)
isLuhnValid('')                 // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-iban-valid'],
}
