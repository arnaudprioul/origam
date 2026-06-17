import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_MONTH_UTIL_DOC: IUtilDoc = {
    slug: 'get-month',
    name: 'getMonth',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_month.description',
    descriptionFallback: 'Returns the zero-based month index (0 = January, 11 = December) of a Date object. Thin semantic wrapper around Date.prototype.getMonth().',
    signature: `function getMonth(date: Date): number`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_month.param_date',
            descriptionFallback: 'The Date instance from which to extract the month index.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_month.returns',
        descriptionFallback: 'An integer between 0 (January) and 11 (December).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_month.example_basic',
            titleFallback: 'Extract month index from a date',
            code: `import { getMonth } from 'origam'

const date = new Date('2024-03-15')
getMonth(date) // → 2 (March)`,
            lang: 'typescript',
        },
    ],
    related: ['get-minutes', 'get-next-month', 'get-previous-month'],
}
