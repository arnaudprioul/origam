import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_OTP_INPUT_FIELD_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-otp-input-field-slots',
    name: 'IOtpInputFieldSlots',
    category: 'OtpInputField',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IOtpInputFieldSlots extends Omit<IFieldSlots, 'default'>, Omit<IInputSlots, 'default'> {
    default?: () => any;
    field?: (data: {
        id: string;
        isDisabled: boolean;
        isDirty: boolean;
        isValid: boolean | undefined;
        isReadonly: boolean;
    }) => any;
}`,
    extends: ['Omit', 'Omit'],
    props: [
        { name: 'default', type: '() => any', optional: true, descriptionFallback: 'Generic slot — no slot props.' },
        { name: 'field', type: '(data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean | undefined, isReadonly: boolean }) => any', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/OtpInputField/otp-input-field.interface.ts',
    examples: [],
}
