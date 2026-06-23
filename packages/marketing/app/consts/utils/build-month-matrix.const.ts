import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const BUILD_MONTH_MATRIX_UTIL_DOC: IUtilDoc = {
    slug: 'build-month-matrix',
    name: 'buildMonthMatrix',
    category: 'Calendar',
    icon: 'mdi-calendar-month-outline',
    descriptionKey: 'utils.catalog.build_month_matrix.description',
    descriptionFallback: 'Build a fixed 6-row × 7-column date matrix for the month containing the given date. The grid always has exactly 6 rows so the calendar height stays stable when navigating month-to-month.',
    signature: 'function buildMonthMatrix(date: Date, firstDayOfWeek: number): Array<Array<Date>>',
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.build_month_matrix.param_date',
            descriptionFallback: 'Any date inside the target month. Day precision is used to determine the first day of the month.',
        },
        {
            name: 'firstDayOfWeek',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.build_month_matrix.param_first_day_of_week',
            descriptionFallback: 'The index of the first weekday column: 0 = Sunday, 1 = Monday, … 6 = Saturday. Controls how the grid is anchored.',
        },
    ],
    returns: {
        type: 'Array<Array<Date>>',
        descriptionKey: 'utils.detail.build_month_matrix.returns',
        descriptionFallback: 'A 6×7 nested array of Date objects covering the visible weeks. Dates from the previous and next month fill the padding rows.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.build_month_matrix.example_basic',
            titleFallback: 'Generate a January 2024 grid (Monday start)',
            code: `import { buildMonthMatrix } from 'origam'

const matrix = buildMonthMatrix(new Date('2024-01-15'), 1)
// matrix.length === 6
// matrix[0].length === 7
// matrix[0][0] → 2024-01-01 (or last days of Dec 2023 for the padding)`,
            lang: 'typescript',
        },
    ],
    related: ['build-disabled-predicate', 'add-weeks'],
}
