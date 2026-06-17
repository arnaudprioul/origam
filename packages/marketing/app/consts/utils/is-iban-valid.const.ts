import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_IBAN_VALID_UTIL_DOC: IUtilDoc = {
    slug: 'is-iban-valid',
    name: 'isIbanValid',
    category: 'Mask',
    icon: 'mdi-bank-check',
    descriptionKey: 'utils.catalog.is_iban_valid.description',
    descriptionFallback: 'Validates an IBAN string using the ISO 13616 mod-97 algorithm. Strips whitespace, rearranges the character groups, converts letters to numbers, and verifies the remainder equals 1.',
    signature: `function isIbanValid(raw: string): boolean`,
    params: [
        {
            name: 'raw',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_iban_valid.param_raw',
            descriptionFallback: 'The raw IBAN string, optionally containing spaces (they are stripped before validation). Must be 4–34 alphanumeric characters after normalisation.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_iban_valid.returns',
        descriptionFallback: 'true when the IBAN passes the ISO 13616 mod-97 check; false for empty input, wrong length, invalid characters, or a bad checksum.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/validate-pattern.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_iban_valid.example_basic',
            titleFallback: 'Valid and invalid IBAN',
            code: `import { isIbanValid } from 'origam'

isIbanValid('GB82 WEST 1234 5698 7654 32') // → true
isIbanValid('FR76 3000 6000 0112 3456 7890 189') // → true
isIbanValid('INVALIDIBAN')                  // → false
isIbanValid('')                             // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-luhn-valid'],
}
