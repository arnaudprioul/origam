import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const EACH_DAY_OF_INTERVAL_UTIL_DOC: IUtilDoc = {
    slug: 'each-day-of-interval',
    name: 'eachDayOfInterval',
    category: 'Calendar',
    icon: 'mdi-calendar-range',
    descriptionKey: 'utils.catalog.each_day_of_interval.description',
    descriptionFallback: 'Inclusive day-range iterator. Returns every date at midnight (00:00 local) between from and to. Returns an empty array when to is before from.',
    signature: `function eachDayOfInterval(from: Date, to: Date): Array<Date>`,
    params: [
        {
            name: 'from',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.each_day_of_interval.param_from',
            descriptionFallback: 'The start of the interval (inclusive). Time component is discarded — only the calendar date is used.',
        },
        {
            name: 'to',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.each_day_of_interval.param_to',
            descriptionFallback: 'The end of the interval (inclusive). Time component is discarded — only the calendar date is used.',
        },
    ],
    returns: {
        type: 'Array<Date>',
        descriptionKey: 'utils.detail.each_day_of_interval.returns',
        descriptionFallback: 'An array of Date objects, one per calendar day from from to to (inclusive). Empty array when to < from.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.each_day_of_interval.example_basic',
            titleFallback: 'Iterating over a date range',
            code: `import { eachDayOfInterval } from 'origam'

const days = eachDayOfInterval(
    new Date('2024-06-01'),
    new Date('2024-06-03')
)
// → [Date(2024-06-01), Date(2024-06-02), Date(2024-06-03)]`,
            lang: 'typescript',
        },
    ],
    related: ['diff-minutes', 'end-of-week', 'end-of-month'],
}
