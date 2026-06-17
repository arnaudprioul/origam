import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DATE_2000_JUNARY_SUNDAY_CONST_DOC: IConstDoc = {
    slug: 'date-2000-junary-sunday',
    name: 'DATE_2000_JUNARY_SUNDAY',
    category: 'Date & Time',
    descriptionKey: 'consts.catalog.date_2000_junary_sunday.description',
    descriptionFallback: 'A fixed Date anchor set to Sunday 2 January 2000 (new Date(2000, 0, 2)). Used by date-picker and calendar components as a reference Sunday to compute the first day of week offset without depending on the runtime locale or a full-blown date library.',
    definition: `export const DATE_2000_JUNARY_SUNDAY = new Date(2000, 0, 2)`,
    value: 'new Date(2000, 0, 2)',
    usedBy: [
        { name: 'OrigamDatePicker', slug: 'date-picker' },
        { name: 'OrigamCalendar', slug: 'calendar' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/date.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.date_2000_junary_sunday.example',
            titleFallback: 'Computing the day-of-week offset for a locale',
            code: `import { DATE_2000_JUNARY_SUNDAY } from 'origam'

// Sunday = 0 in getDay(); used as pivot for locale first-day-of-week
const sundayIndex = DATE_2000_JUNARY_SUNDAY.getDay() // 0`,
            lang: 'typescript',
        },
    ],
}
