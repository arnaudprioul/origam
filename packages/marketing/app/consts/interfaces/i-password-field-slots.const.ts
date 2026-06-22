import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PASSWORD_FIELD_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-password-field-slots',
    name: 'IPasswordFieldSlots',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_password_field_slots.description',
    descriptionFallback: 'Slots contract for <OrigamPasswordField>. Extends IFieldSlots and IInputSlots (minus default) with an info slot for the requirements popup body, a counter slot and a field slot to replace the native input.',
    definition: `export interface IPasswordFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    info?: (data: { [key: string]: any }) => any
    counter?: (data: { counter: string, max?: string | number, value: string | number }) => any
    field?: (data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any
}`,
    extends: ['IFieldSlots', 'IInputSlots'],
    props: [
        { name: 'info', type: '(data: { [key: string]: any }) => any', optional: true, descriptionFallback: 'Replaces the default strength-requirements popup body. Receives the current requirements state as bindings.' },
        { name: 'counter', type: '(data: { counter: string, max?: string | number, value: string | number }) => any', optional: true, descriptionFallback: 'Replaces the character counter rendered inside the details slot.' },
        { name: 'field', type: '(data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any', optional: true, descriptionFallback: 'Replaces the default <input> element. Receives field state bindings.' },
    ],
    usedBy: [
        { slug: 'password-field', name: 'PasswordField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/PasswordField/password-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_password_field_slots.example',
            titleFallback: 'Custom requirements popup via the info slot',
            code: `<origam-password-field v-model="password" :requirements="true">
    <template #info="{ met }">
        <p>{{ met ? 'All requirements met!' : 'Keep going...' }}</p>
    </template>
</origam-password-field>`,
            lang: 'html',
        },
    ],
}
