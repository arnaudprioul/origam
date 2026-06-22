import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_YEARS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-years-props',
    name: 'IDatePickerYearsProps',
    category: 'Date Picker',
    descriptionKey: 'interfaces.catalog.i_date_picker_years_props.description',
    descriptionFallback: 'Props for the years-grid panel that lets the user pick a year — displays a scrollable list of year tiles, optionally bounded by min/max. Extends ICommonsComponentProps, IColorProps and IDimensionProps.',
    definition: `export interface IDatePickerYearsProps extends ICommonsComponentProps, IColorProps, IDimensionProps {
    min?: unknown
    max?: unknown
    year: number
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IDimensionProps'],
    props: [
        { name: 'min', type: 'unknown', optional: true, descriptionFallback: 'Minimum selectable year boundary — years before this value are disabled.' },
        { name: 'max', type: 'unknown', optional: true, descriptionFallback: 'Maximum selectable year boundary — years after this value are disabled.' },
        { name: 'year', type: 'number', optional: false, descriptionFallback: 'Currently active four-digit year. Controls the highlighted tile and the initial scroll position.' },
    ],
    usedBy: [
        { slug: 'date-picker-years', name: 'OrigamDatePickerYears', kind: 'component' },
        { slug: 'date-picker', name: 'OrigamDatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-years.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_picker_years_props.example',
            titleFallback: 'Standalone years panel bounded to 2000–2030',
            code: `<OrigamDatePickerYears
    :year="2025"
    min="2000-01-01"
    max="2030-12-31"
    @update:year="y => console.log(y)"
/>`,
            lang: 'html',
        },
    ],
}
