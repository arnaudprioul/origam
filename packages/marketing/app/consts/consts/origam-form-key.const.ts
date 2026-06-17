import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_FORM_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-form-key',
    name: 'ORIGAM_FORM_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_form_key.description',
    descriptionFallback: 'Vue provide/inject symbol that exposes the IFormProvide context from OrigamForm to nested form-field components (OrigamTextField, OrigamSelect, …), enabling coordinated validation, disabled/readonly state propagation, and form submission handling.',
    definition: `export const ORIGAM_FORM_KEY: InjectionKey<IFormProvide> = Symbol.for('origam:form')`,
    value: "Symbol.for('origam:form')",
    usedBy: [
        { name: 'OrigamForm', slug: 'form' },
        { name: 'useForm' },
        { name: 'OrigamTextField', slug: 'text-field' },
        { name: 'OrigamSelect', slug: 'select' },
    ],
    sourceFile: 'packages/ds/src/consts/Form/form.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_form_key.example',
            titleFallback: 'Registering a custom field inside OrigamForm',
            code: `import { inject } from 'vue'
import { ORIGAM_FORM_KEY } from 'origam'

const form = inject(ORIGAM_FORM_KEY)
// form?.register({ id, validate, reset, resetValidation })`,
            lang: 'typescript',
        },
    ],
}
