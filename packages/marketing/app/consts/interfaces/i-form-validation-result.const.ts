import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FORM_VALIDATION_RESULT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-form-validation-result',
    name: 'IFormValidationResult',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_form_validation_result.description',
    descriptionFallback: 'Result of a full form validation — carries an overall valid flag and the per-field error details via IFieldValidationResult.',
    definition: `export interface IFormValidationResult {
    valid: boolean
    errors: IFieldValidationResult[]
}`,
    extends: [],
    props: [
        { name: 'valid', type: 'boolean', optional: false, descriptionFallback: 'True when every registered field passed validation.' },
        { name: 'errors', type: 'IFieldValidationResult[]', optional: false, descriptionFallback: 'Array of per-field validation results for fields that have errors.' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Form/form.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_form_validation_result.example',
            titleFallback: 'Checking the validation result on submit',
            code: `<OrigamForm @submit="async (event) => {
    const { valid, errors } = await event
    if (!valid) {
        console.log('Errors:', errors)
    }
}">`,
            lang: 'vue',
        },
    ],
}
