import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXTAREA_FIELD_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-textarea-field-slots',
    name: 'ITextareaFieldSlots',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_textarea_field_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamTextareaField>. Extends field and input slots with a counter slot, a field override slot, and rich-mode toolbar replacement slots.',
    definition: `export interface ITextareaFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    counter?: (data: { counter: string, max?: string | number, value: string | number }) => any
    field?: (data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any
    /** Replace the rich-text toolbar entirely (rich mode only). */
    toolbar?: (data: ITextareaToolbarSlotProps) => any
    /** Replace a single toolbar button (rich mode only). */
    'toolbar-item'?: (data: {
        command: TTextareaToolbarCommand
        label: string
        icon: string
        isActive: boolean
        onClick: () => void
    }) => any
}`,
    extends: ['IFieldSlots', 'IInputSlots'],
    props: [
        { name: 'counter', type: '(data: { counter: string, max?: string | number, value: string | number }) => any', optional: true, descriptionFallback: 'Replace the counter chip rendered below the textarea.' },
        { name: 'field', type: '(data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any', optional: true, descriptionFallback: 'Override the inner field wrapper with full control state access.' },
        { name: 'toolbar', type: '(data: ITextareaToolbarSlotProps) => any', optional: true, descriptionFallback: 'Replace the rich-text toolbar entirely (rich mode only).' },
        { name: "'toolbar-item'", type: '(data: { command: TTextareaToolbarCommand, label: string, icon: string, isActive: boolean, onClick: () => void }) => any', optional: true, descriptionFallback: 'Replace a single toolbar button while keeping the rest of the toolbar (rich mode only).' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/TextareaField/textarea-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_textarea_field_slots.example',
            titleFallback: 'Custom counter slot on a rich textarea',
            code: `<OrigamTextareaField v-model="text" mode="rich">
    <template #counter="{ counter, max, value }">
        <span>{{ value }} / {{ max }}</span>
    </template>
</OrigamTextareaField>`,
            lang: 'vue',
        },
    ],
}
