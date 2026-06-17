import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const END_OF_WEEK_UTIL_DOC: IUtilDoc = {
    slug: 'end-of-week',
    name: 'endOfWeek',
    category: 'Commons',
    icon: 'mdi-calendar-week-end',
    descriptionKey: 'utils.catalog.end_of_week.description',
    descriptionFallback: 'Returns the last day of the ISO week containing the given date, respecting the locale\'s first-day-of-week setting. The input date is not mutated.',
    signature: `function endOfWeek(date: Date, locale: string): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.end_of_week.param_date',
            descriptionFallback: 'Any date within the target week.',
        },
        {
            name: 'locale',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.end_of_week.param_locale',
            descriptionFallback: 'BCP 47 locale string (e.g. "en-US", "fr-FR"). The last two characters determine the first day of the week used to derive the last day.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.end_of_week.returns',
        descriptionFallback: 'A new Date set to the last day of the week for the given locale.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.end_of_week.example_basic',
            titleFallback: 'Last day of the week per locale',
            code: `import { endOfWeek } from 'origam'

// In the US the week starts on Sunday → last day is Saturday
endOfWeek(new Date('2024-06-12'), 'en-US') // → Date: 2024-06-15 (Saturday)

// In France the week starts on Monday → last day is Sunday
endOfWeek(new Date('2024-06-12'), 'fr-FR') // → Date: 2024-06-16 (Sunday)`,
            lang: 'typescript',
        },
    ],
    related: ['end-of-week-fixed', 'end-of-month', 'each-day-of-interval'],
}
