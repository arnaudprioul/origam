import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_ISO_DATE_VALID_UTIL_DOC: IUtilDoc = {
    slug: 'is-iso-date-valid',
    name: 'isIsoDateValid',
    category: 'Mask',
    icon: 'mdi-calendar-check',
    descriptionKey: 'utils.catalog.is_iso_date_valid.description',
    descriptionFallback: 'Validates an 8-digit unmasked string representing an ISO calendar date (YYYYMMDD) against real Gregorian rules including leap years.',
    signature: `function isIsoDateValid(unmasked: string): boolean`,
    params: [
        {
            name: 'unmasked',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_iso_date_valid.param_unmasked',
            descriptionFallback: 'The raw 8-digit string extracted from the mask (YYYYMMDD, no separators). Any other length or non-digit content returns false.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_iso_date_valid.returns',
        descriptionFallback: 'true when the string encodes a real calendar date in YYYYMMDD format; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/validate-pattern.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_iso_date_valid.example_basic',
            titleFallback: 'Valid and invalid ISO dates',
            code: `import { isIsoDateValid } from 'origam'

isIsoDateValid('20240229') // → true  (29 Feb 2024, leap year)
isIsoDateValid('20230229') // → false (not a leap year)
isIsoDateValid('20250131') // → true
isIsoDateValid('20251340') // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-fr-date-valid', 'is-us-date-valid'],
}
