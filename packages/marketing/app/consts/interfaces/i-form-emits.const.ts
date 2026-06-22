import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FORM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-form-emits',
    name: 'IFormEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_form_emits.description',
    descriptionFallback: 'Emit contract for OrigamForm — fires submit when the form is submitted (after validation) and reset when it is reset.',
    definition: `export interface IFormEmits {
    (e: 'submit', value: any): void
    (e: 'reset', value: any): void
}`,
    extends: [],
    props: [
        { name: 'submit', type: '(e: "submit", value: any) => void', optional: false, descriptionFallback: 'Emitted when the form is submitted; value carries the ISubmitEventPromise (a SubmitEvent + Promise<IFormValidationResult>).' },
        { name: 'reset', type: '(e: "reset", value: any) => void', optional: false, descriptionFallback: 'Emitted when the form is reset.' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Form/form.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_form_emits.example',
            titleFallback: 'Handling form submit and reset',
            code: `<OrigamForm @submit="onSubmit" @reset="onReset">
    <!-- fields -->
</OrigamForm>`,
            lang: 'vue',
        },
    ],
}
