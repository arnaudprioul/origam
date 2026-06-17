import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_MINUTES_UTIL_DOC: IUtilDoc = {
    slug: 'get-minutes',
    name: 'getMinutes',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_minutes.description',
    descriptionFallback: 'Returns the minutes component (0–59) of a Date object. Thin semantic wrapper around Date.prototype.getMinutes().',
    signature: `function getMinutes(date: Date): number`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_minutes.param_date',
            descriptionFallback: 'The Date instance from which to extract the minutes.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_minutes.returns',
        descriptionFallback: 'An integer between 0 and 59 representing the minute of the hour.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_minutes.example_basic',
            titleFallback: 'Extract minutes from a date',
            code: `import { getMinutes } from 'origam'

const now = new Date('2024-03-15T14:37:00')
getMinutes(now) // → 37`,
            lang: 'typescript',
        },
    ],
    related: ['get-month', 'get-next-month', 'get-previous-month'],
}
