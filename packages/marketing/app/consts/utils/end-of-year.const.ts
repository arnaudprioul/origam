import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const END_OF_YEAR_UTIL_DOC: IUtilDoc = {
    slug: 'end-of-year',
    name: 'endOfYear',
    category: 'Commons',
    icon: 'mdi-calendar-end',
    descriptionKey: 'utils.catalog.end_of_year.description',
    descriptionFallback: 'Returns a new Date set to December 31 of the year containing the given date (midnight local time). The input date is not mutated.',
    signature: `function endOfYear(date: Date): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.end_of_year.param_date',
            descriptionFallback: 'Any date within the target year. Only the year part is used.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.end_of_year.returns',
        descriptionFallback: 'A new Date at midnight on December 31 of the same year as the input.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.end_of_year.example_basic',
            titleFallback: 'Last day of the year',
            code: `import { endOfYear } from 'origam'

endOfYear(new Date('2024-03-15'))
// → Date: 2024-12-31`,
            lang: 'typescript',
        },
    ],
    related: ['end-of-month', 'end-of-day', 'end-of-week'],
}
