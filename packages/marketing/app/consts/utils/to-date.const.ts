import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TO_DATE_UTIL_DOC: IUtilDoc = {
    slug: 'to-date',
    name: 'toDate',
    category: 'Calendar',
    icon: 'mdi-calendar-outline',
    descriptionKey: 'utils.catalog.to_date.description',
    descriptionFallback: 'Coerce a Date, ISO string, or epoch number to a Date instance. Returns null for null, undefined, and unparseable values so the caller can branch without catching exceptions.',
    signature: `function toDate(value: Date | string | number | null | undefined): Date | null`,
    params: [
        {
            name: 'value',
            type: 'Date | string | number | null | undefined',
            required: true,
            descriptionKey: 'utils.detail.to_date.param_value',
            descriptionFallback: 'The raw value to coerce. A Date is cloned; a string is parsed via `new Date()` (ISO-8601 natively supported); a number is treated as epoch milliseconds. null and undefined return null immediately.',
        },
    ],
    returns: {
        type: 'Date | null',
        descriptionKey: 'utils.detail.to_date.returns',
        descriptionFallback: 'A new Date instance on success, or null when the input is null/undefined/unparseable (NaN check applied).',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.to_date.example_basic',
            titleFallback: 'Coercing various input types',
            code: `import { toDate } from 'origam'

toDate('2024-06-01')       // → Date(2024-06-01)
toDate(1717200000000)      // → Date(…epoch…)
toDate(new Date())         // → cloned Date
toDate(null)               // → null
toDate('not-a-date')       // → null`,
            lang: 'typescript',
        },
    ],
    related: ['to-iso', 'format-date', 'add-days'],
}
