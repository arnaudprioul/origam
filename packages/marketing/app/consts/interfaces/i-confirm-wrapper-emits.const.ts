import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CONFIRM_WRAPPER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-confirm-wrapper-emits',
    name: 'IConfirmWrapperEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_confirm_wrapper_emits.description',
    descriptionFallback: 'Emits fired by OrigamConfirmWrapper — extends the standard component and focus emit shapes, plus a dedicated update:confirm event to keep the confirmation field value in sync.',
    definition: `export interface IConfirmWrapperEmits extends ICommonsComponentEmits, IAdjacentEmits, IFocusEmits {
    (e: 'update:confirm', value: any): void
}`,
    extends: ['ICommonsComponentEmits', 'IAdjacentEmits', 'IFocusEmits'],
    props: [
        { name: 'update:confirm', type: '(value: any) => void', optional: false, descriptionFallback: 'Emitted when the confirmation field value changes. Mirrors update:modelValue for the second (confirm) input so the parent can sync both independently.' },
    ],
    usedBy: [
        { slug: 'confirm-wrapper', name: 'ConfirmWrapper', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ConfirmWrapper/confirm-wrapper.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_confirm_wrapper_emits.example',
            titleFallback: 'Syncing both primary and confirmation values',
            code: `<OrigamConfirmWrapper
    v-model="password"
    :confirm="confirmPassword"
    @update:confirm="confirmPassword = $event"
/>`,
            lang: 'vue',
        },
    ],
}
