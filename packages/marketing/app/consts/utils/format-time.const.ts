import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_TIME_UTIL_DOC: IUtilDoc = {
    slug: 'format-time',
    name: 'formatTime',
    category: 'Calendar',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_time.description',
    descriptionFallback: 'Format a Date object as a locale-aware time string in 12-hour or 24-hour notation, using Intl.DateTimeFormat so the locale separator and AM/PM marker are honoured.',
    signature: `function formatTime(date: Date, format: '12h' | '24h', locale?: string): string`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.format_time.param_date',
            descriptionFallback: 'The Date object whose time portion will be formatted.',
        },
        {
            name: 'format',
            type: "'12h' | '24h'",
            required: true,
            descriptionKey: 'utils.detail.format_time.param_format',
            descriptionFallback: "Clock format: '12h' for AM/PM notation, '24h' for 24-hour notation.",
        },
        {
            name: 'locale',
            type: 'string',
            required: false,
            descriptionKey: 'utils.detail.format_time.param_locale',
            descriptionFallback: "Optional BCP 47 locale tag (e.g. 'en-US'). Falls back to the runtime default when omitted.",
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.format_time.returns',
        descriptionFallback: 'Locale-formatted time string, e.g. "02:05 PM" or "14:05".',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.format_time.example_basic',
            titleFallback: 'Format time in 12h and 24h',
            code: `import { formatTime } from 'origam'

const d = new Date(2024, 5, 17, 14, 5)
formatTime(d, '12h', 'en-US') // → '02:05 PM'
formatTime(d, '24h', 'fr-FR') // → '14:05'`,
            lang: 'typescript',
        },
    ],
    related: ['format-date', 'format-media-time'],
}
