import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FIELD_VALIDATION_RESULT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-field-validation-result',
    name: 'IFieldValidationResult',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_field_validation_result.description',
    descriptionFallback: 'Validation result for a single field — carries the field id and the list of error messages produced by its validation rules.',
    definition: `export interface IFieldValidationResult {
    id: number | string
    errorMessages: string[]
}`,
    extends: [],
    props: [
        { name: 'id', type: 'number | string', optional: false, descriptionFallback: 'Identifier of the field that was validated (matches the id used when registering with IFormProvide).' },
        { name: 'errorMessages', type: 'string[]', optional: false, descriptionFallback: 'Array of error message strings produced by the field validation rules.' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Form/form.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_field_validation_result.example',
            titleFallback: 'Reading per-field errors after form submission',
            code: `const onSubmit = (result: IFormValidationResult) => {
    result.errors.forEach((field: IFieldValidationResult) => {
        console.log(field.id, field.errorMessages)
    })
}`,
            lang: 'typescript',
        },
    ],
}
