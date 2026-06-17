import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VALIDATION_FIELD_RESULT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-validation-field-result',
    name: 'IValidationFieldResult',
    category: 'Form & Validation',
    descriptionKey: 'interfaces.catalog.i_validation_field_result.description',
    descriptionFallback: 'Result object for a single validated field — pairs the field identifier with the list of error messages produced by failed rules.',
    definition: `export interface IValidationFieldResult {
    id: number | string
    errorMessages: Array<string>
}`,
    extends: [],
    props: [
        { name: 'id', type: 'number | string', optional: false, descriptionFallback: 'Unique identifier of the field — matches the name or auto-generated id of the form control.' },
        { name: 'errorMessages', type: 'Array<string>', optional: false, descriptionFallback: 'List of error messages produced by the failed validation rules for this field.' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
        { slug: 'use-form', name: 'useForm', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/validation.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_validation_field_result.example',
            titleFallback: 'Collecting field results from form.validate()',
            code: `import type { IValidationFieldResult } from 'origam'

const results: IValidationFieldResult[] = await form.value.validate()

const invalid = results.filter(r => r.errorMessages.length > 0)
console.log('Invalid fields:', invalid.map(r => r.id))`,
            lang: 'typescript',
        },
    ],
}
