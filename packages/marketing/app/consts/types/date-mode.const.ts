import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const DATE_MODE_TYPE_DOC: ITypeDoc = {
    slug: 'date-mode',
    name: 'TDateMode',
    kind: 'type',
    category: 'Time & Calendar',
    descriptionKey: 'types.catalog.date_mode.description',
    descriptionFallback: 'DatePicker view mode: month (day grid), months (month selector), or years (year list).',
    definition: `export type TDateMode = \`\${DATE_MODE}\`

// Where DATE_MODE is:
export enum DATE_MODE {
    MONTH  = 'month',
    MONTHS = 'months',
    YEARS  = 'years'
}`,
    values: [
        { value: 'month', descriptionKey: 'types.detail.date_mode.month', descriptionFallback: 'Day grid — shows the current month with individual day cells.' },
        { value: 'months', descriptionKey: 'types.detail.date_mode.months', descriptionFallback: 'Month selector — shows a 3×4 grid of months for quick month picking.' },
        { value: 'years', descriptionKey: 'types.detail.date_mode.years', descriptionFallback: 'Year list — shows a scrollable list of years.' },
    ],
    usedBy: [
        { slug: 'date-picker', name: 'DatePicker', propName: 'viewMode' },
        { slug: 'date-picker-controls', name: 'DatePickerControls', propName: 'viewMode' },
        { slug: 'date-picker-field', name: 'DatePickerField', propName: 'viewMode' },
    ],
    sourceFile: 'packages/ds/src/types/DatePicker/date-picker.type.ts',
    examples: [
        {
            titleKey: 'types.detail.date_mode.example',
            titleFallback: 'DatePicker starting on year selector',
            code: `<origam-date-picker view-mode="years" />`,
            lang: 'html',
        },
    ],
}
