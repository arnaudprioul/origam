import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const START_OF_WEEK_UTIL_DOC: IUtilDoc = {
    slug: 'start-of-week',
    name: 'startOfWeek',
    category: 'Commons',
    icon: 'mdi-calendar-week',
    descriptionKey: 'utils.catalog.start_of_week.description',
    descriptionFallback: 'Return a new Date rewound to the first day of the week containing the given date. The first day of week is derived from the locale (or from an explicit override).',
    signature: `function startOfWeek(date: Date, locale: string, firstDayOfWeek?: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.start_of_week.param_date',
            descriptionFallback: 'The reference date. The function walks backwards until the weekday matches the first-day-of-week.',
        },
        {
            name: 'locale',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.start_of_week.param_locale',
            descriptionFallback: 'A BCP 47 locale string used to look up the first day of week (e.g. "en-US" → Sunday, "fr-FR" → Monday).',
        },
        {
            name: 'firstDayOfWeek',
            type: 'number',
            required: false,
            descriptionKey: 'utils.detail.start_of_week.param_first_day_of_week',
            descriptionFallback: 'Explicit override (0 = Sunday … 6 = Saturday). When provided, the locale lookup is skipped.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.start_of_week.returns',
        descriptionFallback: 'A new Date at the start of the week (same time as the input date).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.start_of_week.example_basic',
            titleFallback: 'Find Monday from any day (fr-FR locale)',
            code: `import { startOfWeek } from 'origam'

// Thursday 2024-03-14 → Monday 2024-03-11 (fr-FR starts on Monday)
startOfWeek(new Date('2024-03-14'), 'fr-FR')
// → 2024-03-11

// Same date, explicit override: week starts on Sunday
startOfWeek(new Date('2024-03-14'), 'fr-FR', 0)
// → 2024-03-10`,
            lang: 'typescript',
        },
    ],
    related: ['start-of-week-fixed', 'start-of-day', 'start-of-month'],
}
