import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ISO_WEEK_NUMBER_UTIL_DOC: IUtilDoc = {
    slug: 'iso-week-number',
    name: 'isoWeekNumber',
    category: 'Calendar',
    icon: 'mdi-calendar-week-outline',
    descriptionKey: 'utils.catalog.iso_week_number.description',
    descriptionFallback: 'Returns the ISO 8601 week number for a given Date. Week 1 is the week containing the year\'s first Thursday (Thursday-of-week / first-Thursday-of-year algorithm).',
    signature: `function isoWeekNumber(date: Date): number`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.iso_week_number.param_date',
            descriptionFallback: 'The date whose ISO week number is computed.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.iso_week_number.returns',
        descriptionFallback: 'Integer week number in the range [1, 53] per ISO 8601.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.iso_week_number.example_basic',
            titleFallback: 'ISO week number for specific dates',
            code: `import { isoWeekNumber } from 'origam'

isoWeekNumber(new Date('2024-01-01')) // → 1
isoWeekNumber(new Date('2024-12-30')) // → 1  (belongs to week 1 of 2025)
isoWeekNumber(new Date('2024-06-15')) // → 24`,
            lang: 'typescript',
        },
    ],
    related: ['is-weekend', 'is-valid'],
}
