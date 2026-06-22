import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FORM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-form-props',
    name: 'IFormProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_form_props.description',
    descriptionFallback: 'Props for OrigamForm — controls disabled/readonly state, validation timing (validateOn), fast-fail behaviour, error messages, hints, scroll-to-error, and the overall validity v-model.',
    definition: `export interface IFormProps extends ICommonsComponentProps {
    disabled?: boolean
    fastFail?: boolean
    readonly?: boolean
    modelValue?: boolean | null
    validateOn?: TValidateOn
    rules?: Array<any>
    errorMessages?: Array<string> | string
    hint?: string
    messages?: Array<string> | string
    scrollToError?: boolean | ScrollIntoViewOptions
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disable all fields inside the form.' },
        { name: 'fastFail', type: 'boolean', optional: true, descriptionFallback: 'Stop validation after the first field failure.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Render all fields in read-only mode.' },
        { name: 'modelValue', type: 'boolean | null', optional: true, descriptionFallback: 'v-model for the overall form validity. null = untouched.' },
        { name: 'validateOn', type: 'TValidateOn', optional: true, descriptionFallback: 'When to trigger validation: blur, input, submit, or combinations.' },
        { name: 'rules', type: 'Array<any>', optional: true, descriptionFallback: 'Form-level validation rules applied on submit.' },
        { name: 'errorMessages', type: 'Array<string> | string', optional: true, descriptionFallback: 'Form-level error messages displayed under the form.' },
        { name: 'hint', type: 'string', optional: true, descriptionFallback: 'Helper text displayed below the form.' },
        { name: 'messages', type: 'Array<string> | string', optional: true, descriptionFallback: 'Informational messages displayed below the form.' },
        { name: 'scrollToError', type: 'boolean | ScrollIntoViewOptions', optional: true, descriptionFallback: 'Scroll to the first invalid field after a failed submission.' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Form/form.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_form_props.example',
            titleFallback: 'Form with blur-triggered validation and scroll-to-error',
            code: `<OrigamForm
    v-model="isFormValid"
    validate-on="blur"
    :scroll-to-error="{ behavior: 'smooth' }"
>
    <!-- fields -->
</OrigamForm>`,
            lang: 'vue',
        },
    ],
}
