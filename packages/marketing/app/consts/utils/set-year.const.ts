import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SET_YEAR_UTIL_DOC: IUtilDoc = {
    slug: 'set-year',
    name: 'setYear',
    category: 'Commons',
    icon: 'mdi-calendar-edit',
    descriptionKey: 'utils.catalog.set_year.description',
    descriptionFallback: 'Return a new Date with the full year replaced by the given value. The original date is never mutated.',
    signature: `function setYear(date: Date, year: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.set_year.param_date',
            descriptionFallback: 'The source date. It is cloned before the year is updated.',
        },
        {
            name: 'year',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.set_year.param_year',
            descriptionFallback: 'The four-digit year to set (e.g. 2025).',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.set_year.returns',
        descriptionFallback: 'A new Date object with the specified year.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.set_year.example_basic',
            titleFallback: 'Change the year of a date',
            code: `import { setYear } from 'origam'

const d = new Date('2024-03-15')
setYear(d, 2000)  // → 2000-03-15
setYear(d, 2030)  // → 2030-03-15`,
            lang: 'typescript',
        },
    ],
    related: ['set-date', 'set-hours', 'set-minutes', 'set-month'],
}
