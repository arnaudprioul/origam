import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_FR_DATE_VALID_UTIL_DOC: IUtilDoc = {
    slug: 'is-fr-date-valid',
    name: 'isFrDateValid',
    category: 'Mask',
    icon: 'mdi-calendar-check',
    descriptionKey: 'utils.catalog.is_fr_date_valid.description',
    descriptionFallback: 'Validates an 8-digit unmasked string representing a French calendar date (DDMMYYYY) against real Gregorian rules including leap years.',
    signature: `function isFrDateValid(unmasked: string): boolean`,
    params: [
        {
            name: 'unmasked',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_fr_date_valid.param_unmasked',
            descriptionFallback: 'The raw 8-digit string extracted from the mask (DDMMYYYY, no separators). Any other length or non-digit content returns false.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_fr_date_valid.returns',
        descriptionFallback: 'true when the string encodes a real calendar date in DDMMYYYY format; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/validate-pattern.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_fr_date_valid.example_basic',
            titleFallback: 'Valid and invalid French dates',
            code: `import { isFrDateValid } from 'origam'

isFrDateValid('29022024') // → true  (29 Feb 2024, leap year)
isFrDateValid('29022023') // → false (not a leap year)
isFrDateValid('31012025') // → true
isFrDateValid('00012025') // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-iso-date-valid', 'is-us-date-valid'],
}
