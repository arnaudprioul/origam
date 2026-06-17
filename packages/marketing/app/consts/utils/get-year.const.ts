import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_YEAR_UTIL_DOC: IUtilDoc = {
    slug: 'get-year',
    name: 'getYear',
    category: 'Commons',
    icon: 'mdi-calendar-blank',
    descriptionKey: 'utils.catalog.get_year.description',
    descriptionFallback: 'Returns the full four-digit year of a native Date object. A thin, named wrapper around Date.prototype.getFullYear() that keeps date utility code readable.',
    signature: `function getYear(date: Date): number`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_year.param_date',
            descriptionFallback: 'A native JavaScript Date instance.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_year.returns',
        descriptionFallback: 'The full year as an integer (e.g. 2024).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_year.example_basic',
            titleFallback: 'Extract the year from a Date',
            code: `import { getYear } from 'origam'

getYear(new Date('2024-06-15'))  // → 2024`,
            lang: 'typescript',
        },
    ],
    related: ['get-week', 'get-week-array', 'get-weekdays'],
}
