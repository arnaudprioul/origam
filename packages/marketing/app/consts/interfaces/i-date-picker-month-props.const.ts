import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_MONTH_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-month-props',
    name: 'IDatePickerMonthProps',
    category: 'Date Picker',
    descriptionKey: 'interfaces.catalog.i_date_picker_month_props.description',
    descriptionFallback: 'Props for the month-grid view of the DatePicker — renders the days of a given month with optional week numbers, multi-select, range selection and animated transitions. Extends ICommonsComponentProps, IColorProps and ICalendarProps.',
    definition: `export interface IDatePickerMonthProps extends ICommonsComponentProps, IColorProps, ICalendarProps {
    hideWeekdays?: boolean
    multiple?: boolean | number | (string & {})
    range?: boolean
    showWeek?: boolean
    transition?: TTransitionProps
    reverseTransition?: TTransitionProps
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'ICalendarProps'],
    props: [
        { name: 'hideWeekdays', type: 'boolean', optional: true, descriptionFallback: 'Hide the weekday header row (Mon Tue Wed …).' },
        { name: 'multiple', type: 'boolean | number | (string & {})', optional: true, descriptionFallback: 'Allow selecting multiple dates. Pass a number to cap the selection count.' },
        { name: 'range', type: 'boolean', optional: true, descriptionFallback: 'Enable range selection — the first click sets the start, the second sets the end.' },
        { name: 'showWeek', type: 'boolean', optional: true, descriptionFallback: 'Show ISO week numbers in a leading column.' },
        { name: 'transition', type: 'TTransitionProps', optional: true, descriptionFallback: 'Transition applied when navigating forward to the next month.' },
        { name: 'reverseTransition', type: 'TTransitionProps', optional: true, descriptionFallback: 'Transition applied when navigating backward to the previous month.' },
    ],
    usedBy: [
        { slug: 'date-picker-month', name: 'OrigamDatePickerMonth', kind: 'component' },
        { slug: 'date-picker', name: 'OrigamDatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-month.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_picker_month_props.example',
            titleFallback: 'Range date picker with week numbers',
            code: `<OrigamDatePicker :range="true" :show-week="true" />`,
            lang: 'html',
        },
    ],
}
