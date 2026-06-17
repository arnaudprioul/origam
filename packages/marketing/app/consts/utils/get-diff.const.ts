import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_DIFF_UTIL_DOC: IUtilDoc = {
    slug: 'get-diff',
    name: 'getDiff',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_diff.description',
    descriptionFallback: 'Computes the difference between two dates in the requested unit (years, quarters, months, weeks, days, hours, minutes, seconds). Falls back to milliseconds when no unit is supplied.',
    signature: `function getDiff(date: Date, comparing: Date | string, unit?: string): number`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_diff.param_date',
            descriptionFallback: 'The reference (start) date.',
        },
        {
            name: 'comparing',
            type: 'Date | string',
            required: true,
            descriptionKey: 'utils.detail.get_diff.param_comparing',
            descriptionFallback: 'The date to compare against. Strings are parsed via new Date().',
        },
        {
            name: 'unit',
            type: 'string',
            required: false,
            descriptionKey: 'utils.detail.get_diff.param_unit',
            descriptionFallback: 'One of "years" | "quarters" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds". Omit for milliseconds.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_diff.returns',
        descriptionFallback: 'The signed integer (or millisecond float) difference. Positive when date is after comparing.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_diff.example_basic',
            titleFallback: 'Diff in days and months',
            code: `import { getDiff } from 'origam'

const a = new Date('2026-06-17')
const b = new Date('2026-01-01')

getDiff(a, b, 'months')  // → 5
getDiff(a, b, 'days')    // → 167
getDiff(a, b)            // → millisecond value`,
            lang: 'typescript',
        },
    ],
    related: ['get-date', 'get-hours'],
}
