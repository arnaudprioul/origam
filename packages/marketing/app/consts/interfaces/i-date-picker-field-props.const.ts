import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-field-props',
    name: 'IDatePickerFieldProps',
    category: 'DatePickerField',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IDatePickerFieldProps extends ITextFieldProps, ITransitionComponentProps {
    menu?: boolean;
    menuProps?: IMenuProps;
    range?: boolean;
    multiple?: boolean;
    openOnClear?: boolean;
    closeText?: string;
    openText?: string;
    closeOnSelect?: boolean;
    chipProps?: IChipProps;
    closableChips?: boolean;
}`,
    extends: ['ITextFieldProps', 'ITransitionComponentProps'],
    props: [
        { name: 'menu', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'menuProps', type: 'IMenuProps', optional: true, descriptionFallback: '' },
        { name: 'range', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'multiple', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'openOnClear', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'closeText', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'openText', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'closeOnSelect', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'chipProps', type: 'IChipProps', optional: true, descriptionFallback: '' },
        { name: 'closableChips', type: 'boolean', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/DatePickerField/date-picker-field.interface.ts',
    examples: [],
}
