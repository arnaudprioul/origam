import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INLINE_EDIT_EDIT_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-inline-edit-edit-slot-bindings',
    name: 'IInlineEditEditSlotBindings',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_inline_edit_edit_slot_bindings.description',
    descriptionFallback: 'Scoped slot bindings exposed by the #edit slot of OrigamInlineEdit — gives full control over the input layout while delegating state-machine logic to the component.',
    definition: `export interface IInlineEditEditSlotBindings {
    value: string
    setValue: (next: string) => void
    confirm: () => void
    cancel: () => void
    error: string | null
    isPending: boolean
}`,
    extends: [],
    props: [
        { name: 'value', type: 'string', optional: false, descriptionFallback: 'Current draft value (two-way; mutate via setValue).' },
        { name: 'setValue', type: '(next: string) => void', optional: false, descriptionFallback: 'Update the draft value from within the slot.' },
        { name: 'confirm', type: '() => void', optional: false, descriptionFallback: 'Run the validator and, if it passes, commit the draft.' },
        { name: 'cancel', type: '() => void', optional: false, descriptionFallback: 'Discard the draft and return to display mode.' },
        { name: 'error', type: 'string | null', optional: false, descriptionFallback: 'Current validation error message, or null when none.' },
        { name: 'isPending', type: 'boolean', optional: false, descriptionFallback: 'True while an async validator is in flight.' },
    ],
    usedBy: [
        { slug: 'inline-edit', name: 'InlineEdit', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InlineEdit/inline-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_inline_edit_edit_slot_bindings.example',
            titleFallback: 'Custom textarea input in the #edit slot',
            code: `<OrigamInlineEdit v-model="bio" multiline>
    <template #edit="{ value, setValue, confirm, cancel, error }">
        <textarea :value="value" @input="setValue($event.target.value)" />
        <span v-if="error" role="alert">{{ error }}</span>
        <button @click="confirm">OK</button>
        <button @click="cancel">Cancel</button>
    </template>
</OrigamInlineEdit>`,
            lang: 'vue',
        },
    ],
}
