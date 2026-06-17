import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TO_ISO_UTIL_DOC: IUtilDoc = {
    slug: 'to-iso',
    name: 'toISO',
    category: 'Commons',
    icon: 'mdi-calendar-outline',
    descriptionKey: 'utils.catalog.to_iso.description',
    descriptionFallback: 'Format a Date (adapter-aware) to a zero-padded `YYYY-MM-DD` ISO date string. Works with any IDateAdapter so it is locale-independent and consistent across calendar systems.',
    signature: `function toISO(adapter: IDateAdapter<any>, value: Date): string`,
    params: [
        {
            name: 'adapter',
            type: 'IDateAdapter<any>',
            required: true,
            descriptionKey: 'utils.detail.to_iso.param_adapter',
            descriptionFallback: 'The date adapter instance. Its `toJsDate()` method is used to normalise the value before extracting year/month/day parts.',
        },
        {
            name: 'value',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.to_iso.param_value',
            descriptionFallback: 'The date to format. Passed through `adapter.toJsDate()` first.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.to_iso.returns',
        descriptionFallback: 'An ISO-8601 date string `YYYY-MM-DD`, e.g. "2024-06-01".',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.to_iso.example_basic',
            titleFallback: 'Format a date with the default adapter',
            code: `import { toISO, useDateAdapter } from 'origam'

const { adapter } = useDateAdapter()
toISO(adapter, new Date('2024-06-01'))
// → '2024-06-01'`,
            lang: 'typescript',
        },
    ],
    related: ['to-date', 'format-date', 'parse-iso'],
}
