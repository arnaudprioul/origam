import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INLINE_EDIT_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-inline-edit-emits',
    name: 'IInlineEditEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_inline_edit_emits.description',
    descriptionFallback: 'Emit contract for OrigamInlineEdit — covers the v-model echo, edit/cancel/confirm lifecycle events, and validation error reporting.',
    definition: `export interface IInlineEditEmits {
    (e: 'update:modelValue', value: string | number): void
    (e: 'edit'): void
    (e: 'cancel'): void
    (e: 'confirm', value: string | number): void
    (e: 'validate-error', message: string): void
}`,
    extends: [],
    props: [
        { name: 'update:modelValue', type: "(e: 'update:modelValue', value: string | number) => void", optional: false, descriptionFallback: 'v-model echo — fired after successful validation with the committed value.' },
        { name: 'edit', type: "(e: 'edit') => void", optional: false, descriptionFallback: 'Fired when the component enters edit mode (display → input transition).' },
        { name: 'cancel', type: "(e: 'cancel') => void", optional: false, descriptionFallback: 'Fired when the user cancels — the draft was discarded.' },
        { name: 'confirm', type: "(e: 'confirm', value: string | number) => void", optional: false, descriptionFallback: 'Fires after validation passes, before update:modelValue. Useful for server-side persistence.' },
        { name: 'validate-error', type: "(e: 'validate-error', message: string) => void", optional: false, descriptionFallback: 'Fired when a validator returns an error message (sync or async).' },
    ],
    usedBy: [
        { slug: 'inline-edit', name: 'InlineEdit', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InlineEdit/inline-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_inline_edit_emits.example',
            titleFallback: 'Persisting to an API on confirm',
            code: `<OrigamInlineEdit
    v-model="title"
    @confirm="value => api.patchTitle(value)"
    @validate-error="msg => toast.error(msg)"
/>`,
            lang: 'vue',
        },
    ],
}
