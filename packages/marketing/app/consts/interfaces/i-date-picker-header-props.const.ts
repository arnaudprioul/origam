import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_HEADER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-header-props',
    name: 'IDatePickerHeaderProps',
    category: 'Date Picker',
    descriptionKey: 'interfaces.catalog.i_date_picker_header_props.description',
    descriptionFallback: 'Props for the DatePicker header row — shows the current month/year label and handles the click that switches between month and year views. Extends ICommonsComponentProps, IColorProps, IAdjacentProps and IDensityProps.',
    definition: `export interface IDatePickerHeaderProps extends ICommonsComponentProps, IColorProps, IAdjacentProps, IDensityProps {
    header?: string
    transition?: TTransitionProps
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IAdjacentProps', 'IDensityProps'],
    props: [
        { name: 'header', type: 'string', optional: true, descriptionFallback: 'Label displayed in the header (e.g. "June 2025"). Computed by the parent when not provided.' },
        { name: 'transition', type: 'TTransitionProps', optional: true, descriptionFallback: 'Transition applied when the header label changes (month/year navigation).' },
    ],
    usedBy: [
        { slug: 'date-picker-header', name: 'OrigamDatePickerHeader', kind: 'component' },
        { slug: 'date-picker', name: 'OrigamDatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-header.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_picker_header_props.example',
            titleFallback: 'Extending for a custom header',
            code: `import type { IDatePickerHeaderProps } from 'origam'

interface IMyPickerHeaderProps extends IDatePickerHeaderProps {
    showWeekNumber?: boolean
}`,
            lang: 'typescript',
        },
    ],
}
