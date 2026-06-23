import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-props',
    name: 'IDatePickerProps',
    category: 'Date Picker',
    descriptionKey: 'interfaces.catalog.i_date_picker_props.description',
    descriptionFallback: 'Full props surface for OrigamDatePicker — aggregates color, border, elevation, spacing, picker controls, month/months/years and header sub-interfaces into the top-level component contract. Supports single, multiple and range v-model values.',
    definition: `export interface IDatePickerProps extends ICommonsComponentProps, IColorProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IPickerProps, IDatePickerControlsProps, IDatePickerMonthProps, IDatePickerMonthsProps, IDatePickerYearsProps, IDatePickerHeaderProps {
    modelValue?: string | Date | Array<string | Date>
}`,
    extends: [
        'ICommonsComponentProps',
        'IColorProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'IPaddingProps',
        'IMarginProps',
        'IPickerProps',
        'IDatePickerControlsProps',
        'IDatePickerMonthProps',
        'IDatePickerMonthsProps',
        'IDatePickerYearsProps',
        'IDatePickerHeaderProps',
    ],
    props: [
        { name: 'modelValue', type: 'string | Date | Array<string | Date>', optional: true, descriptionFallback: 'The selected date(s). A single string or Date for single/range mode; an array for multiple mode.' },
    ],
    usedBy: [
        { slug: 'date-picker', name: 'OrigamDatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_picker_props.example',
            titleFallback: 'Basic date picker with v-model',
            code: `<OrigamDatePicker v-model="selectedDate" color="primary" :rounded="true" />`,
            lang: 'html',
        },
    ],
}
