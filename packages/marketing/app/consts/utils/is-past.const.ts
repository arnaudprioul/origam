import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_PAST_UTIL_DOC: IUtilDoc = {
    slug: 'is-past',
    name: 'isPast',
    category: 'Calendar',
    icon: 'mdi-calendar-arrow-left',
    descriptionKey: 'utils.catalog.is_past.description',
    descriptionFallback: 'Returns true when the given Date sits in the past relative to the current moment (Date.now()). Includes earlier hours of today. Used to fade or disable past events in calendar and agenda views.',
    signature: `function isPast(date: Date): boolean`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_past.param_date',
            descriptionFallback: 'The date to compare against the current timestamp. The comparison is millisecond-accurate using Date.now().',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_past.returns',
        descriptionFallback: 'true when date.getTime() < Date.now(); false for future dates and the current moment.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_past.example_basic',
            titleFallback: 'Checking whether a date is in the past',
            code: `import { isPast } from 'origam'

isPast(new Date('2020-01-01')) // → true
isPast(new Date('2099-12-31')) // → false
isPast(new Date())             // → false (current moment)`,
            lang: 'typescript',
        },
    ],
    related: ['is-today', 'is-same-day'],
}
