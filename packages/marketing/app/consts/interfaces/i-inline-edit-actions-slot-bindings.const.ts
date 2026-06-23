import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INLINE_EDIT_ACTIONS_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-inline-edit-actions-slot-bindings',
    name: 'IInlineEditActionsSlotBindings',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_inline_edit_actions_slot_bindings.description',
    descriptionFallback: 'Scoped slot bindings exposed by the #actions slot of OrigamInlineEdit — provides confirm/cancel callbacks and a pending flag for rendering custom action buttons.',
    definition: `export interface IInlineEditActionsSlotBindings {
    confirm: () => void
    cancel: () => void
    isPending: boolean
}`,
    extends: [],
    props: [
        { name: 'confirm', type: '() => void', optional: false, descriptionFallback: 'Run the validator and commit the draft if it passes.' },
        { name: 'cancel', type: '() => void', optional: false, descriptionFallback: 'Discard the draft and return to display mode.' },
        { name: 'isPending', type: 'boolean', optional: false, descriptionFallback: 'True while an async validator is in flight.' },
    ],
    usedBy: [
        { slug: 'inline-edit', name: 'InlineEdit', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InlineEdit/inline-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_inline_edit_actions_slot_bindings.example',
            titleFallback: 'Custom confirm / cancel buttons via #actions slot',
            code: `<OrigamInlineEdit v-model="title">
    <template #actions="{ confirm, cancel, isPending }">
        <button :disabled="isPending" @click="confirm">Save</button>
        <button @click="cancel">Discard</button>
    </template>
</OrigamInlineEdit>`,
            lang: 'vue',
        },
    ],
}
