import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_US_DATE_VALID_UTIL_DOC: IUtilDoc = {
    slug: 'is-us-date-valid',
    name: 'isUsDateValid',
    category: 'Mask',
    icon: 'mdi-calendar-check',
    descriptionKey: 'utils.catalog.is_us_date_valid.description',
    descriptionFallback: 'Validates an 8-digit unmasked string representing a US calendar date (MMDDYYYY) against real Gregorian rules including leap years.',
    signature: `function isUsDateValid(unmasked: string): boolean`,
    params: [
        {
            name: 'unmasked',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_us_date_valid.param_unmasked',
            descriptionFallback: 'The raw 8-digit string extracted from the mask (MMDDYYYY, no separators). Any other length or non-digit content returns false.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_us_date_valid.returns',
        descriptionFallback: 'true when the string encodes a real calendar date in MMDDYYYY format; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/validate-pattern.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_us_date_valid.example_basic',
            titleFallback: 'Valid and invalid US dates',
            code: `import { isUsDateValid } from 'origam'

isUsDateValid('02292024') // → true  (Feb 29 2024, leap year)
isUsDateValid('02292023') // → false (not a leap year)
isUsDateValid('01312025') // → true
isUsDateValid('13012025') // → false (month 13)`,
            lang: 'typescript',
        },
    ],
    related: ['is-fr-date-valid', 'is-iso-date-valid'],
}
