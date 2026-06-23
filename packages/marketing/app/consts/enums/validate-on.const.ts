import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const VALIDATE_ON_ENUM_DOC: IEnumDoc = {
    slug: 'validate-on',
    name: 'VALIDATE_ON',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.validate_on.description',
    descriptionFallback: 'TypeScript enum for the validation trigger of form fields — blur, input, submit, and lazy variants.',
    definition: `export enum VALIDATE_ON {
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
        { value: 'VALIDATE_ON.BLUR', descriptionKey: 'enums.detail.validate_on.blur', descriptionFallback: 'Validate when the field loses focus.' },
        { value: 'VALIDATE_ON.INPUT', descriptionKey: 'enums.detail.validate_on.input', descriptionFallback: 'Validate on every keystroke / value change.' },
        { value: 'VALIDATE_ON.SUBMIT', descriptionKey: 'enums.detail.validate_on.submit', descriptionFallback: 'Validate only when the form is submitted.' },
        { value: 'VALIDATE_ON.LAZY_BLUR', descriptionKey: 'enums.detail.validate_on.lazy_blur', descriptionFallback: 'Lazy + blur — defers the first validation until blur, then validates on each change.' },
        { value: 'VALIDATE_ON.LAZY_INPUT', descriptionKey: 'enums.detail.validate_on.lazy_input', descriptionFallback: 'Lazy + input — defers the first validation, then validates on each input event.' },
        { value: 'VALIDATE_ON.LAZY_SUBMIT', descriptionKey: 'enums.detail.validate_on.lazy_submit', descriptionFallback: 'Lazy + submit — defers until first submit, then validates normally.' },
        { value: 'VALIDATE_ON.BLUR_LAZY', descriptionKey: 'enums.detail.validate_on.blur_lazy', descriptionFallback: 'Alias of LAZY_BLUR — blur then lazy re-validation.' },
        { value: 'VALIDATE_ON.INPUT_LAZY', descriptionKey: 'enums.detail.validate_on.input_lazy', descriptionFallback: 'Alias of LAZY_INPUT — input then lazy re-validation.' },
        { value: 'VALIDATE_ON.SUBMIT_LAZY', descriptionKey: 'enums.detail.validate_on.submit_lazy', descriptionFallback: 'Alias of LAZY_SUBMIT — submit then lazy re-validation.' },
        { value: 'VALIDATE_ON.LAZY', descriptionKey: 'enums.detail.validate_on.lazy', descriptionFallback: 'Defers all validation until explicitly triggered (e.g. form submit).' },
    ],
    usedBy: [
        { slug: 'number-field', name: 'NumberField', propName: 'validateOn' },
        { slug: 'form', name: 'Form', propName: 'validateOn' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/validation.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.validate_on.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { VALIDATE_ON } from 'origam'

const trigger: VALIDATE_ON = VALIDATE_ON.BLUR`,
            lang: 'typescript',
        },
    ],
}
