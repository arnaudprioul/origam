import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_WEEKDAYS_UTIL_DOC: IUtilDoc = {
    slug: 'get-weekdays',
    name: 'getWeekdays',
    category: 'Commons',
    icon: 'mdi-calendar-range',
    descriptionKey: 'utils.catalog.get_weekdays.description',
    descriptionFallback: 'Returns an array of 7 narrow weekday labels (single character or narrow abbreviation) for the given locale, rotated so the first element corresponds to the locale-specific (or explicit) first day of the week. Used to render calendar column headers.',
    signature: `function getWeekdays(
  locale: string,
  firstDayOfWeek?: number
): Array<string>`,
    params: [
        {
            name: 'locale',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.get_weekdays.param_locale',
            descriptionFallback: 'BCP 47 locale tag. When firstDayOfWeek is omitted the function reads the locale-specific default from an internal lookup table.',
        },
        {
            name: 'firstDayOfWeek',
            type: 'number',
            required: false,
            descriptionKey: 'utils.detail.get_weekdays.param_first_day',
            descriptionFallback: 'Explicit override (0 = Sunday, 1 = Monday, …). Takes priority over the locale table when provided.',
        },
    ],
    returns: {
        type: 'Array<string>',
        descriptionKey: 'utils.detail.get_weekdays.returns',
        descriptionFallback: "An array of 7 narrow weekday strings in the Intl 'narrow' format (e.g. 'M', 'T', 'W', …) rotated to start on the first day of the week.",
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_weekdays.example_basic',
            titleFallback: 'Narrow weekday labels for English locale',
            code: `import { getWeekdays } from 'origam'

getWeekdays('en-US')   // → ['S', 'M', 'T', 'W', 'T', 'F', 'S']
getWeekdays('en-GB')   // → ['M', 'T', 'W', 'T', 'F', 'S', 'S']`,
            lang: 'typescript',
        },
    ],
    related: ['get-week-array', 'get-weekday-names', 'get-week'],
}
