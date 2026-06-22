import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_MONTHS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-months-props',
    name: 'IDatePickerMonthsProps',
    category: 'Date Picker',
    descriptionKey: 'interfaces.catalog.i_date_picker_months_props.description',
    descriptionFallback: 'Props for the months-grid panel that lets the user pick a month — displays a 4x3 grid of month tiles, optionally bounded by min/max. Extends ICommonsComponentProps, IColorProps and IDimensionProps.',
    definition: `export interface IDatePickerMonthsProps extends ICommonsComponentProps, IColorProps, IDimensionProps {
    min?: unknown
    max?: unknown
    month: number
    year: number
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IDimensionProps'],
    props: [
        { name: 'min', type: 'unknown', optional: true, descriptionFallback: 'Minimum selectable date boundary — months before this date are disabled.' },
        { name: 'max', type: 'unknown', optional: true, descriptionFallback: 'Maximum selectable date boundary — months after this date are disabled.' },
        { name: 'month', type: 'number', optional: false, descriptionFallback: 'Currently active zero-based month index (0 = January … 11 = December). Controls the highlighted tile.' },
        { name: 'year', type: 'number', optional: false, descriptionFallback: 'Four-digit year displayed above the grid and used to compute min/max constraints.' },
    ],
    usedBy: [
        { slug: 'date-picker-months', name: 'OrigamDatePickerMonths', kind: 'component' },
        { slug: 'date-picker', name: 'OrigamDatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-months.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_picker_months_props.example',
            titleFallback: 'Standalone months panel',
            code: `<OrigamDatePickerMonths
    :month="5"
    :year="2025"
    @update:month="m => console.log(m)"
/>`,
            lang: 'html',
        },
    ],
}
