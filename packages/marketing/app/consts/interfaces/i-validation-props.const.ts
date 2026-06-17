import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VALIDATION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-validation-props',
    name: 'IValidationProps',
    category: 'Form & Validation',
    descriptionKey: 'interfaces.catalog.i_validation_props.description',
    descriptionFallback: 'Complete validation surface for form-control components — extends IFocusProps with rules, error state, error messages, disabled/readonly flags, label and the validateOn trigger.',
    definition: `export interface IValidationProps extends IFocusProps {
    disabled?: boolean
    error?: boolean
    errorMessages?: Array<string> | string
    maxErrors?: number | string
    name?: string
    label?: string
    readonly?: boolean
    rules?: Array<any>
    modelValue?: any
    validateOn?: TValidateOn
    validationValue?: any
}`,
    extends: ['IFocusProps'],
    props: [
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables the field — prevents interaction and validation.' },
        { name: 'error', type: 'boolean', optional: true, descriptionFallback: 'Forces the field into an error state regardless of rule results.' },
        { name: 'errorMessages', type: 'Array<string> | string', optional: true, descriptionFallback: 'Static error message(s) shown alongside rule-produced errors.' },
        { name: 'maxErrors', type: 'number | string', optional: true, descriptionFallback: 'Maximum number of error messages to display simultaneously.' },
        { name: 'name', type: 'string', optional: true, descriptionFallback: 'HTML name attribute and validation identifier for the field.' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Label text displayed above or inside the field.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Makes the field non-editable while keeping it focusable and validatable.' },
        { name: 'rules', type: 'Array<any>', optional: true, descriptionFallback: 'Array of validation rule functions. Each receives the current value and returns true (valid) or an error string.' },
        { name: 'modelValue', type: 'any', optional: true, descriptionFallback: 'The v-model value of the field, forwarded to rule functions during validation.' },
        { name: 'validateOn', type: 'TValidateOn', optional: true, descriptionFallback: 'When validation runs — e.g. "input", "blur", "submit", or combinations thereof.' },
        { name: 'validationValue', type: 'any', optional: true, descriptionFallback: 'Override the value passed to rule functions (useful when the internal representation differs from modelValue).' },
    ],
    usedBy: [
        { slug: 'text-field', name: 'TextField', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'checkbox', name: 'Checkbox', kind: 'component' },
        { slug: 'switch', name: 'Switch', kind: 'component' },
        { slug: 'use-validation', name: 'useValidation', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/validation.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_validation_props.example',
            titleFallback: 'Declaring a typed form-field component',
            code: `import type { IValidationProps } from 'origam'

interface IMyFieldProps extends IValidationProps {
    placeholder?: string
}

const props = defineProps<IMyFieldProps>()`,
            lang: 'typescript',
        },
    ],
}
