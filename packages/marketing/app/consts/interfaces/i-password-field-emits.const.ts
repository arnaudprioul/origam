import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PASSWORD_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-password-field-emits',
    name: 'IPasswordFieldEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_password_field_emits.description',
    descriptionFallback: 'Emits contract for <OrigamPasswordField>. Extends IFieldEmits and IInputEmits with a control click event, a control mousedown event and a strength-level update event.',
    definition: `export interface IPasswordFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'click:control', event: MouseEvent): void
    (e: 'mousedown:control', event: MouseEvent): void
    (e: 'update:strength', value: TPasswordStrengthLevel): void
}`,
    extends: ['IFieldEmits', 'IInputEmits'],
    props: [
        { name: 'click:control', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the user clicks the control area of the password field.' },
        { name: 'mousedown:control', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted on mousedown on the control area.' },
        { name: 'update:strength', type: '(value: TPasswordStrengthLevel) => void', optional: false, descriptionFallback: 'Fires when the computed strength level changes. Use with v-model:strength to track password quality (weak | fair | good | strong).' },
    ],
    usedBy: [
        { slug: 'password-field', name: 'PasswordField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/PasswordField/password-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_password_field_emits.example',
            titleFallback: 'Listening to password strength changes',
            code: `<origam-password-field
    v-model="password"
    v-model:strength="strength"
    @click:control="onControlClick"
/>`,
            lang: 'html',
        },
    ],
}
