import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const DATE_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'date-mode',
    name: 'DATE_MODE',
    category: 'DatePicker',
    descriptionKey: 'enums.catalog.date_mode.description',
    descriptionFallback: 'Active view of OrigamDatePicker: day grid within a month, month list for the year, or year list for decade navigation.',
    definition: `export enum DATE_MODE {
    MONTH  = 'month',
    MONTHS = 'months',
    YEARS  = 'years',
}`,
    values: [
        {
            value: 'DATE_MODE.MONTH',
            descriptionKey: 'enums.detail.date_mode.month',
            descriptionFallback: 'Day-grid view — displays individual days of the selected month.',
        },
        {
            value: 'DATE_MODE.MONTHS',
            descriptionKey: 'enums.detail.date_mode.months',
            descriptionFallback: 'Month-list view — displays months of the selected year.',
        },
        {
            value: 'DATE_MODE.YEARS',
            descriptionKey: 'enums.detail.date_mode.years',
            descriptionFallback: 'Year-list view — displays a range of years for decade navigation.',
        },
    ],
    usedBy: [
        { slug: 'date-picker', name: 'DatePicker', propName: 'mode' },
    ],
    sourceFile: 'packages/ds/src/enums/DatePicker/date-picker.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.date_mode.example',
            titleFallback: 'Opening the picker in year-selection view',
            code: `<origam-date-picker :mode="DATE_MODE.YEARS" v-model="selectedDate" />`,
            lang: 'vue',
        },
    ],
}
