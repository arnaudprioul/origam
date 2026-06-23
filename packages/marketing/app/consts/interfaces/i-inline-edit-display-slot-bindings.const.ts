import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INLINE_EDIT_DISPLAY_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-inline-edit-display-slot-bindings',
    name: 'IInlineEditDisplaySlotBindings',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_inline_edit_display_slot_bindings.description',
    descriptionFallback: 'Scoped slot bindings exposed by the #display slot of OrigamInlineEdit — provides the current value, an edit trigger, empty/placeholder state, and the disabled flag.',
    definition: `export interface IInlineEditDisplaySlotBindings {
    value: string
    edit: () => void
    isEmpty: boolean
    placeholder: string
    disabled: boolean
}`,
    extends: [],
    props: [
        { name: 'value', type: 'string', optional: false, descriptionFallback: 'Current model value coerced to string.' },
        { name: 'edit', type: '() => void', optional: false, descriptionFallback: 'Switches the component into edit mode.' },
        { name: 'isEmpty', type: 'boolean', optional: false, descriptionFallback: 'True when the value is empty or nullish — use to drive placeholder styling.' },
        { name: 'placeholder', type: 'string', optional: false, descriptionFallback: 'Resolved placeholder string with a sane fallback.' },
        { name: 'disabled', type: 'boolean', optional: false, descriptionFallback: 'Mirrors the disabled prop for visual handling.' },
    ],
    usedBy: [
        { slug: 'inline-edit', name: 'InlineEdit', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InlineEdit/inline-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_inline_edit_display_slot_bindings.example',
            titleFallback: 'Custom display affordance using a heading',
            code: `<OrigamInlineEdit v-model="title">
    <template #display="{ value, edit, isEmpty }">
        <h2 :class="{ empty: isEmpty }" @click="edit">
            {{ isEmpty ? 'Click to set title' : value }}
        </h2>
    </template>
</OrigamInlineEdit>`,
            lang: 'vue',
        },
    ],
}
