import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const OTP_INPUT_FIELD_TYPE_ENUM_DOC: IEnumDoc = {
    slug: 'otp-input-field-type',
    name: 'OTP_INPUT_FIELD_TYPE',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.otp_input_field_type.description',
    descriptionFallback: 'TypeScript enum for OTP input field type — text, number, or password.',
    definition: `export enum OTP_INPUT_FIELD_TYPE {
    TEXT     = 'text',
    NUMBER   = 'number',
    PASSWORD = 'password',
}`,
    values: [
        { value: 'OTP_INPUT_FIELD_TYPE.TEXT', descriptionKey: 'enums.detail.otp_input_field_type.text', descriptionFallback: 'Plain text input — characters are visible as the user types.' },
        { value: 'OTP_INPUT_FIELD_TYPE.NUMBER', descriptionKey: 'enums.detail.otp_input_field_type.number', descriptionFallback: 'Numeric input — triggers a numeric keyboard on mobile devices.' },
        { value: 'OTP_INPUT_FIELD_TYPE.PASSWORD', descriptionKey: 'enums.detail.otp_input_field_type.password', descriptionFallback: 'Password input — characters are masked for security.' },
    ],
    usedBy: [
        { slug: 'otp-input-field', name: 'OtpInputField', propName: 'type' },
    ],
    sourceFile: 'packages/ds/src/enums/OtpInputField/otp-input-field.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.otp_input_field_type.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { OTP_INPUT_FIELD_TYPE } from 'origam'

const fieldType: OTP_INPUT_FIELD_TYPE = OTP_INPUT_FIELD_TYPE.NUMBER`,
            lang: 'typescript',
        },
    ],
}
