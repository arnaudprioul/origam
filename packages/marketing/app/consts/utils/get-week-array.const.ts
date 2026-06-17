import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_WEEK_ARRAY_UTIL_DOC: IUtilDoc = {
    slug: 'get-week-array',
    name: 'getWeekArray',
    category: 'Commons',
    icon: 'mdi-calendar-month',
    descriptionKey: 'utils.catalog.get_week_array.description',
    descriptionFallback: 'Builds a 2-D array of Date objects representing the calendar grid for the month containing the given date. Each inner array is one week (7 days). Padding days from adjacent months fill the first and last partial weeks.',
    signature: `function getWeekArray(
  date: Date,
  locale: string,
  firstDayOfWeek?: number
): Array<Array<Date>>`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_week_array.param_date',
            descriptionFallback: 'Any date within the target month. Only the month and year are used.',
        },
        {
            name: 'locale',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.get_week_array.param_locale',
            descriptionFallback: 'BCP 47 locale tag used to look up the locale-specific first day of the week when firstDayOfWeek is omitted (e.g. "en-US" → Sunday, "fr-FR" → Monday).',
        },
        {
            name: 'firstDayOfWeek',
            type: 'number',
            required: false,
            descriptionKey: 'utils.detail.get_week_array.param_first_day',
            descriptionFallback: 'Explicit override for the first day of the week (0 = Sunday, 1 = Monday, …). When provided it takes priority over the locale lookup.',
        },
    ],
    returns: {
        type: 'Array<Array<Date>>',
        descriptionKey: 'utils.detail.get_week_array.returns',
        descriptionFallback: 'A 2-D array of Date objects. Length is 4–6 outer rows, each inner row has exactly 7 elements.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_week_array.example_basic',
            titleFallback: 'Build a January 2024 calendar grid',
            code: `import { getWeekArray } from 'origam'

const grid = getWeekArray(new Date('2024-01-15'), 'en-US')
// grid[0] → [Dec 31, Jan 1, Jan 2, Jan 3, Jan 4, Jan 5, Jan 6]
// grid.length → 5`,
            lang: 'typescript',
        },
    ],
    related: ['get-week', 'get-weekdays', 'get-weekday-names'],
}
