import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FORM_FIELD_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-form-field',
    name: 'IFormField',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_form_field.description',
    descriptionFallback: 'Internal registration record for a field inside an OrigamForm — carries the field id, validation/reset methods, the component instance, and the current valid/error state.',
    definition: `export interface IFormField {
    id: number | string
    validate: () => Promise<Array<string>>
    reset: () => Promise<void>
    resetValidation: () => Promise<void>
    vm: Raw<ComponentInternalInstance>
    isValid?: boolean | null
    errorMessages: Array<string>
}`,
    extends: [],
    props: [
        { name: 'id', type: 'number | string', optional: false, descriptionFallback: 'Unique identifier of the field within the form.' },
        { name: 'validate', type: '() => Promise<Array<string>>', optional: false, descriptionFallback: 'Run validation rules and return an array of error messages.' },
        { name: 'reset', type: '() => Promise<void>', optional: false, descriptionFallback: 'Reset the field value and clear validation state.' },
        { name: 'resetValidation', type: '() => Promise<void>', optional: false, descriptionFallback: 'Clear validation errors without resetting the value.' },
        { name: 'vm', type: 'Raw<ComponentInternalInstance>', optional: false, descriptionFallback: 'Raw reference to the field component instance.' },
        { name: 'isValid', type: 'boolean | null', optional: true, descriptionFallback: 'Current validity state: true, false, or null when untouched.' },
        { name: 'errorMessages', type: 'Array<string>', optional: false, descriptionFallback: 'Current list of error messages for this field.' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Form/form.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_form_field.example',
            titleFallback: 'Accessing registered fields via IFormProvide',
            code: `import type { IFormField } from 'origam'

const form = inject(FORM_PROVIDE_KEY)
form.items.value.forEach((field: IFormField) => {
    console.log(field.id, field.isValid, field.errorMessages)
})`,
            lang: 'typescript',
        },
    ],
}
