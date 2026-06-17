import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_LOCAL_DATE_UTIL_DOC: IUtilDoc = {
    slug: 'parse-local-date',
    name: 'parseLocalDate',
    category: 'Calendar',
    icon: 'mdi-calendar-today',
    descriptionKey: 'utils.catalog.parse_local_date.description',
    descriptionFallback: 'Parse a `"YYYY-MM-DD"` string into a local-time `Date` by splitting on `-` and passing individual components to `new Date()`. This avoids the UTC offset that the single-argument `new Date(string)` constructor introduces.',
    signature: `function parseLocalDate(value: string): Date`,
    params: [
        {
            name: 'value',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.parse_local_date.param_value',
            descriptionFallback: 'A `"YYYY-MM-DD"` date string. The components are split and passed as separate numeric arguments to `new Date()` to force local time zone.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.parse_local_date.returns',
        descriptionFallback: 'A `Date` set to midnight in the user\'s local time zone. Avoids the off-by-one-day bug that `new Date("YYYY-MM-DD")` triggers when the timezone offset is negative.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_local_date.example_basic',
            titleFallback: 'Parse a date without timezone shift',
            code: `import { parseLocalDate } from 'origam'

const d = parseLocalDate('2025-01-15')
// Always local midnight — no UTC offset surprise`,
            lang: 'typescript',
        },
    ],
    related: ['parse-iso', 'format-date', 'add-days'],
}
