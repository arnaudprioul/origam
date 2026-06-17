import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_HOURS_UTIL_DOC: IUtilDoc = {
    slug: 'get-hours',
    name: 'getHours',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_hours.description',
    descriptionFallback: 'Returns the hour (0–23) for a given Date object. Thin wrapper around Date.prototype.getHours() used by the TimePicker component.',
    signature: `function getHours(date: Date): number`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_hours.param_date',
            descriptionFallback: 'A JavaScript Date instance from which the hour value is extracted.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_hours.returns',
        descriptionFallback: 'Integer between 0 and 23 representing the hour of the day in local time.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_hours.example_basic',
            titleFallback: 'Extract hour from a Date',
            code: `import { getHours } from 'origam'

const d = new Date('2026-06-17T14:30:00')
getHours(d)  // → 14`,
            lang: 'typescript',
        },
    ],
    related: ['get-date', 'get-diff'],
}
