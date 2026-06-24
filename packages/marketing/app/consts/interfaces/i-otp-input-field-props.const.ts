import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_OTP_INPUT_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-otp-input-field-props',
    name: 'IOtpInputFieldProps',
    category: 'OtpInputField',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IOtpInputFieldProps extends IFieldProps, IInputProps, IVariantProps {
    autofocus?: boolean;
    divider?: string;
    focusAll?: boolean;
    length?: number | string;
    modelValue?: number | string | null;
    placeholder?: string;
    persistentPlaceholder?: boolean;
    role?: string;
    type?: TOtpInputFieldType;
}`,
    extends: ['IFieldProps', 'IInputProps', 'IVariantProps'],
    props: [
        { name: 'autofocus', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'divider', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'focusAll', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'length', type: 'number | string', optional: true, descriptionFallback: '' },
        { name: 'modelValue', type: 'number | string | null', optional: true, descriptionFallback: '' },
        { name: 'placeholder', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'persistentPlaceholder', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'role', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'type', type: 'TOtpInputFieldType', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/OtpInputField/otp-input-field.interface.ts',
    examples: [],
}
