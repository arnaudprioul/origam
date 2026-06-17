import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_WEEK_UTIL_DOC: IUtilDoc = {
    slug: 'get-week',
    name: 'getWeek',
    category: 'Commons',
    icon: 'mdi-calendar-week',
    descriptionKey: 'utils.catalog.get_week.description',
    descriptionFallback: 'Returns the ISO-like week number (1–53) of a date, computed via the configured DateAdapter. The algorithm aligns with the ISO 8601 definition: weeks start on Monday and week 1 contains the first Thursday of the year.',
    signature: `function getWeek(adapter: DateAdapter, value: any): number`,
    params: [
        {
            name: 'adapter',
            type: 'DateAdapter',
            required: true,
            descriptionKey: 'utils.detail.get_week.param_adapter',
            descriptionFallback: 'The active date adapter instance. Provides the toJsDate() conversion so the function is date-library agnostic.',
        },
        {
            name: 'value',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.get_week.param_value',
            descriptionFallback: 'A date value in the format understood by the adapter (native Date, ISO string, or library-specific object).',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_week.returns',
        descriptionFallback: 'The week number (1–53) of the given date.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_week.example_basic',
            titleFallback: 'Get week number with the native adapter',
            code: `import { getWeek } from 'origam'
import { useDate } from 'origam'

const { adapter } = useDate()
getWeek(adapter, new Date('2024-01-08'))  // → 2`,
            lang: 'typescript',
        },
    ],
    related: ['get-week-array', 'get-weekdays', 'get-year'],
}
