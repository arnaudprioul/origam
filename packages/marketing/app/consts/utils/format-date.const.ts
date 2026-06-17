import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_DATE_UTIL_DOC: IUtilDoc = {
    slug: 'format-date',
    name: 'formatDate',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_date.description',
    descriptionFallback: 'Format a Date object using a named format string (e.g. "fullDate", "shortDate", "monthAndYear") with locale-aware output via Intl.DateTimeFormat. Supports custom format functions via a formats map.',
    signature: `function formatDate(
  value: Date,
  formatString: string,
  locale: string,
  formats?: Record<string, TCustomDateFormat>
): string`,
    params: [
        {
            name: 'value',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.format_date.param_value',
            descriptionFallback: 'The Date object to format.',
        },
        {
            name: 'formatString',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.format_date.param_format_string',
            descriptionFallback: "Named format key such as 'fullDate', 'shortDate', 'monthAndYear', 'year', 'month', 'dayOfMonth', or 'weekday'.",
        },
        {
            name: 'locale',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.format_date.param_locale',
            descriptionFallback: "BCP 47 locale tag used by Intl.DateTimeFormat, e.g. 'en-US' or 'fr-FR'.",
        },
        {
            name: 'formats',
            type: 'Record<string, TCustomDateFormat>',
            required: false,
            descriptionKey: 'utils.detail.format_date.param_formats',
            descriptionFallback: 'Optional map of custom format functions keyed by format string. Overrides the built-in named formats.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.format_date.returns',
        descriptionFallback: 'Locale-formatted date string.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    noteKey: 'utils.detail.format_date.note',
    noteFallback: 'A simpler overload also exists in packages/ds/src/utils/Calendar/date.util.ts with signature (date, locale, options: Intl.DateTimeFormatOptions) for direct Intl option objects.',
    examples: [
        {
            titleKey: 'utils.detail.format_date.example_basic',
            titleFallback: 'Format using a named preset',
            code: `import { formatDate } from 'origam'

const d = new Date(2024, 5, 17) // June 17 2024
formatDate(d, 'fullDate', 'en-US')    // → 'June 17, 2024'
formatDate(d, 'shortDate', 'fr-FR')   // → '17/06/2024'
formatDate(d, 'monthAndYear', 'de-DE') // → 'Juni 2024'`,
            lang: 'typescript',
        },
    ],
    related: ['format-time', 'format-media-time'],
}
