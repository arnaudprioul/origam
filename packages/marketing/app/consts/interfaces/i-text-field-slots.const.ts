import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXT_FIELD_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-text-field-slots',
    name: 'ITextFieldSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_text_field_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamTextField> — extends field and input slots with a counter slot for custom counter markup and a field slot to fully replace the field surface.',
    definition: `export interface ITextFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    counter?: (data: { counter: string, max?: string | number, value: string | number }) => any
    field?: (data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any
}`,
    extends: ['IFieldSlots', 'IInputSlots'],
    props: [
        { name: 'counter', type: '(data: { counter: string, max?: string | number, value: string | number }) => any', optional: true, descriptionFallback: 'Custom slot for the character counter. Receives current counter text, max and numeric value.' },
        { name: 'field', type: '(data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any', optional: true, descriptionFallback: 'Override slot that replaces the entire field surface. Receives the field state context.' },
    ],
    usedBy: [
        { slug: 'text-field', name: 'TextField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/TextField/text-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_text_field_slots.example',
            titleFallback: 'Custom counter slot',
            code: `<OrigamTextField v-model="bio" counter="280">
  <template #counter="{ value, max }">
    <span :style="{ color: value > max ? 'var(--origam-color-danger)' : undefined }">
      {{ value }} / {{ max }}
    </span>
  </template>
</OrigamTextField>`,
            lang: 'html',
        },
    ],
}
