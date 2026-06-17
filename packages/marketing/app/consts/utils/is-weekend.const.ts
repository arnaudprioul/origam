import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_WEEKEND_UTIL_DOC: IUtilDoc = {
    slug: 'is-weekend',
    name: 'isWeekend',
    category: 'Calendar',
    icon: 'mdi-calendar-weekend-outline',
    descriptionKey: 'utils.catalog.is_weekend.description',
    descriptionFallback: 'Returns true when the given Date falls on a Saturday (day 6) or Sunday (day 0). Used to paint the weekend stripe in calendar month and week views.',
    signature: `function isWeekend(date: Date): boolean`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_weekend.param_date',
            descriptionFallback: 'The date to test.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_weekend.returns',
        descriptionFallback: 'true when the date is Saturday or Sunday, false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_weekend.example_basic',
            titleFallback: 'Detect weekend days',
            code: `import { isWeekend } from 'origam'

isWeekend(new Date('2024-01-06')) // Saturday → true
isWeekend(new Date('2024-01-07')) // Sunday   → true
isWeekend(new Date('2024-01-08')) // Monday   → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-valid', 'iso-week-number'],
}
