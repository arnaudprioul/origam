import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FORM_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-form-provide',
    name: 'IFormProvide',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_form_provide.description',
    descriptionFallback: 'Provide/inject contract exposed by OrigamForm to its descendant fields — lets fields register/unregister themselves and report validation state back to the parent form.',
    definition: `export interface IFormProvide {
    register: (item: {
        id: number | string
        vm: ComponentInternalInstance
        validate: () => Promise<Array<string>>
        reset: () => Promise<void>
        resetValidation: () => Promise<void>
    }) => void
    unregister: (id: number | string) => void
    update: (id: number | string, isValid: boolean | undefined, errorMessages: Array<string>) => void
    items?: Ref<Array<IFormField>>
    isDisabled: ComputedRef<boolean>
    isReadonly: ComputedRef<boolean>
    isValidating?: Ref<boolean>
    isValid: Ref<boolean | null | undefined>
    validateOn: Ref<TValidateOn | undefined>
}`,
    extends: [],
    props: [
        { name: 'register', type: '(item: { id, vm, validate, reset, resetValidation }) => void', optional: false, descriptionFallback: 'Called by a field on mount to register itself with the parent form.' },
        { name: 'unregister', type: '(id: number | string) => void', optional: false, descriptionFallback: 'Called by a field on unmount to deregister itself.' },
        { name: 'update', type: '(id: number | string, isValid: boolean | undefined, errorMessages: Array<string>) => void', optional: false, descriptionFallback: 'Called by a field after validation to report its current valid state and error messages.' },
        { name: 'items', type: 'Ref<Array<IFormField>>', optional: true, descriptionFallback: 'Reactive list of all registered fields.' },
        { name: 'isDisabled', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'Whether the form is disabled.' },
        { name: 'isReadonly', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'Whether the form is readonly.' },
        { name: 'isValidating', type: 'Ref<boolean>', optional: true, descriptionFallback: 'True while form validation is running.' },
        { name: 'isValid', type: 'Ref<boolean | null | undefined>', optional: false, descriptionFallback: 'Overall form validity.' },
        { name: 'validateOn', type: 'Ref<TValidateOn | undefined>', optional: false, descriptionFallback: 'When validation should be triggered.' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Form/form.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_form_provide.example',
            titleFallback: 'Injecting IFormProvide inside a custom field',
            code: `import { inject } from 'vue'
import type { IFormProvide } from 'origam'

const form = inject<IFormProvide>('FORM_PROVIDE_KEY')
form?.register({ id: myId, vm: getCurrentInstance()!, validate, reset, resetValidation })`,
            lang: 'typescript',
        },
    ],
}
