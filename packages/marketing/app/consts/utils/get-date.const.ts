import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_DATE_UTIL_DOC: IUtilDoc = {
    slug: 'get-date',
    name: 'getDate',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_date.description',
    descriptionFallback: 'Returns the day of the month (1–31) for a given Date object. Thin wrapper around Date.prototype.getDate() used by the Calendar component.',
    signature: `function getDate(date: Date): number`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_date.param_date',
            descriptionFallback: 'A JavaScript Date instance from which the day-of-month is extracted.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_date.returns',
        descriptionFallback: 'Integer between 1 and 31 representing the day of the month.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_date.example_basic',
            titleFallback: 'Extract day of month',
            code: `import { getDate } from 'origam'

const d = new Date('2026-06-17')
getDate(d)  // → 17`,
            lang: 'typescript',
        },
    ],
    related: ['get-hours', 'get-diff'],
}
