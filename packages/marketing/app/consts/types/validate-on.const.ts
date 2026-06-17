import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const VALIDATE_ON_TYPE_DOC: ITypeDoc = {
    slug: 'validate-on',
    name: 'TValidateOn',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.validate_on.description',
    descriptionFallback: 'Controls when field-level validation rules are evaluated — on blur, on input, on form submit, or a lazy variant of each.',
    definition: `export type TValidateOn = \`\${VALIDATE_ON}\`

// Where VALIDATE_ON is:
export enum VALIDATE_ON {
    BLUR         = 'blur',
    INPUT        = 'input',
    SUBMIT       = 'submit',
    LAZY_BLUR    = 'lazy blur',
    LAZY_INPUT   = 'lazy input',
    LAZY_SUBMIT  = 'lazy submit',
    BLUR_LAZY    = 'blur lazy',
    INPUT_LAZY   = 'input lazy',
    SUBMIT_LAZY  = 'submit lazy',
    LAZY         = 'lazy',
}`,
    values: [
        {
            value: 'blur',
            descriptionKey: 'types.detail.validate_on.blur',
            descriptionFallback: 'Validation runs when the field loses focus.',
        },
        {
            value: 'input',
            descriptionKey: 'types.detail.validate_on.input',
            descriptionFallback: 'Validation runs on every keystroke / value change — immediate inline feedback.',
        },
        {
            value: 'submit',
            descriptionKey: 'types.detail.validate_on.submit',
            descriptionFallback: 'Validation runs only when the enclosing form is submitted.',
        },
        {
            value: 'lazy blur',
            descriptionKey: 'types.detail.validate_on.lazy_blur',
            descriptionFallback: 'First validation fires on blur; subsequent validations fire on every input after the first error was shown.',
        },
        {
            value: 'lazy input',
            descriptionKey: 'types.detail.validate_on.lazy_input',
            descriptionFallback: 'First validation fires on input; once an error appears it continues on every subsequent change.',
        },
        {
            value: 'lazy submit',
            descriptionKey: 'types.detail.validate_on.lazy_submit',
            descriptionFallback: 'First validation fires on submit; after that errors are cleared on every input change.',
        },
        {
            value: 'blur lazy',
            descriptionKey: 'types.detail.validate_on.blur_lazy',
            descriptionFallback: 'Alias of "lazy blur" — validate on blur with lazy re-evaluation once an error is visible.',
        },
        {
            value: 'input lazy',
            descriptionKey: 'types.detail.validate_on.input_lazy',
            descriptionFallback: 'Alias of "lazy input".',
        },
        {
            value: 'submit lazy',
            descriptionKey: 'types.detail.validate_on.submit_lazy',
            descriptionFallback: 'Alias of "lazy submit".',
        },
        {
            value: 'lazy',
            descriptionKey: 'types.detail.validate_on.lazy',
            descriptionFallback: 'Defers the first validation to the next cycle that matches the default trigger (blur), then validates eagerly on every subsequent change.',
        },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', propName: 'validateOn' },
        { slug: 'text-field', name: 'TextField', propName: 'validateOn' },
        { slug: 'select', name: 'Select', propName: 'validateOn' },
        { slug: 'checkbox', name: 'Checkbox', propName: 'validateOn' },
        { slug: 'radio', name: 'Radio', propName: 'validateOn' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/validation.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.validate_on.example',
            titleFallback: 'Validate an email field on blur with lazy re-check',
            code: `<origam-text-field
  type="email"
  validate-on="lazy blur"
  :rules="[v => /.+@.+/.test(v) || 'Invalid email']"
  v-model="email"
/>`,
            lang: 'html',
        },
    ],
}
