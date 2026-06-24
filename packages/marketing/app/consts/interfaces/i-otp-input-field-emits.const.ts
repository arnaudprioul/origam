import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_OTP_INPUT_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-otp-input-field-emits',
    name: 'IOtpInputFieldEmits',
    category: 'OtpInputField',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IOtpInputFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'finish', value: string): void;
    (e: 'click:control', event: MouseEvent): void;
    (e: 'mousedown:control', event: MouseEvent): void;
    (e: 'click:clear', event: MouseEvent): void;
}`,
    extends: ['IFieldEmits', 'IInputEmits'],
    props: [],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/OtpInputField/otp-input-field.interface.ts',
    examples: [],
}
