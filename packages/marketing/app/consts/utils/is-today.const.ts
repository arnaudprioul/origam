import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_TODAY_UTIL_DOC: IUtilDoc = {
    slug: 'is-today',
    name: 'isToday',
    category: 'Calendar',
    icon: 'mdi-calendar-star',
    descriptionKey: 'utils.catalog.is_today.description',
    descriptionFallback: 'Returns true when a Date object falls on the current calendar day in local timezone. Captures the "now" reference at call time (no memoization) to keep the function pure across calls.',
    signature: `function isToday(date: Date): boolean`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_today.param_date',
            descriptionFallback: 'The date to compare against today. The comparison is delegated to isSameDay(date, new Date()).',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_today.returns',
        descriptionFallback: 'true when the date shares the same local calendar day as the current moment; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_today.example_basic',
            titleFallback: 'Highlighting today in a calendar cell',
            code: `import { isToday } from 'origam'

isToday(new Date())            // → true
isToday(new Date('2020-01-01')) // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-past', 'is-same-day'],
}
