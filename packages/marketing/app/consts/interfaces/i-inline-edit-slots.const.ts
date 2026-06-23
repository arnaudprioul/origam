import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INLINE_EDIT_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-inline-edit-slots',
    name: 'IInlineEditSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_inline_edit_slots.description',
    descriptionFallback: 'Slot signatures for OrigamInlineEdit — three optional scoped slots: #display for the read affordance, #edit for the input layout, and #actions for confirm/cancel buttons.',
    definition: `export interface IInlineEditSlots {
    display?: (bindings: IInlineEditDisplaySlotBindings) => any
    edit?: (bindings: IInlineEditEditSlotBindings) => any
    actions?: (bindings: IInlineEditActionsSlotBindings) => any
}`,
    extends: [],
    props: [
        { name: 'display', type: '(bindings: IInlineEditDisplaySlotBindings) => any', optional: true, descriptionFallback: 'Custom read-mode affordance. Receives IInlineEditDisplaySlotBindings.' },
        { name: 'edit', type: '(bindings: IInlineEditEditSlotBindings) => any', optional: true, descriptionFallback: 'Custom edit-mode input layout. Receives IInlineEditEditSlotBindings.' },
        { name: 'actions', type: '(bindings: IInlineEditActionsSlotBindings) => any', optional: true, descriptionFallback: 'Custom confirm/cancel buttons. Receives IInlineEditActionsSlotBindings.' },
    ],
    usedBy: [
        { slug: 'inline-edit', name: 'InlineEdit', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InlineEdit/inline-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_inline_edit_slots.example',
            titleFallback: 'Fully custom inline edit with all three slots',
            code: `<OrigamInlineEdit v-model="name">
    <template #display="{ value, edit }">
        <span @click="edit">{{ value || 'Untitled' }}</span>
    </template>
    <template #edit="{ value, setValue, confirm, cancel }">
        <input :value="value" @input="setValue($event.target.value)" @keydown.enter="confirm" />
    </template>
    <template #actions="{ confirm, cancel }">
        <OrigamBtn icon="mdi-check" @click="confirm" />
        <OrigamBtn icon="mdi-close" @click="cancel" />
    </template>
</OrigamInlineEdit>`,
            lang: 'vue',
        },
    ],
}
