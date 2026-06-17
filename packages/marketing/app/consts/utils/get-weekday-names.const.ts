import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_WEEKDAY_NAMES_UTIL_DOC: IUtilDoc = {
    slug: 'get-weekday-names',
    name: 'getWeekdayNames',
    category: 'Calendar',
    icon: 'mdi-calendar-text',
    descriptionKey: 'utils.catalog.get_weekday_names.description',
    descriptionFallback: 'Returns an ordered array of localised weekday name strings for a given locale and first-day-of-week offset. The output is already rotated so the first element corresponds to firstDayOfWeek.',
    signature: `function getWeekdayNames(
  locale: string,
  firstDayOfWeek: number,
  length?: 'narrow' | 'short' | 'long'
): Array<string>`,
    params: [
        {
            name: 'locale',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.get_weekday_names.param_locale',
            descriptionFallback: 'BCP 47 locale tag used by Intl.DateTimeFormat to format the day names.',
        },
        {
            name: 'firstDayOfWeek',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.get_weekday_names.param_first_day',
            descriptionFallback: 'Zero-based index of the first day of the week (0 = Sunday, 1 = Monday, …). The returned array is rotated accordingly.',
        },
        {
            name: 'length',
            type: "'narrow' | 'short' | 'long'",
            required: false,
            defaultValue: "'short'",
            descriptionKey: 'utils.detail.get_weekday_names.param_length',
            descriptionFallback: 'Intl.DateTimeFormat weekday format: "narrow" (M), "short" (Mon), or "long" (Monday). Defaults to "short".',
        },
    ],
    returns: {
        type: 'Array<string>',
        descriptionKey: 'utils.detail.get_weekday_names.returns',
        descriptionFallback: 'An array of 7 localised weekday name strings, rotated so the first element matches firstDayOfWeek.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_weekday_names.example_basic',
            titleFallback: 'Short names starting on Monday (French)',
            code: `import { getWeekdayNames } from 'origam'

getWeekdayNames('fr-FR', 1)
// → ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.']`,
            lang: 'typescript',
        },
    ],
    related: ['get-weekdays', 'get-week-array'],
}
