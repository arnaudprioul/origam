import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FIELD_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-field-slots',
    name: 'IFieldSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_field_slots.description',
    descriptionFallback: 'Slot signatures for OrigamField — default slot for the inner input element, plus label, floating label, prefix, suffix and loader slots.',
    definition: `export interface IFieldSlots extends IAdjacentInnerSlots {
    default?: (props: { class?: string | Array<string> } & IFieldDefaultSlotProps) => any
    loader?: () => any
    label?: (props: ILabelProps) => any
    floatingLabel?: (props: ILabelProps) => any
    prefix?: () => any
    suffix?: () => any
}`,
    extends: ['IAdjacentInnerSlots'],
    props: [
        { name: 'default', type: '(props: { class?: string | Array<string> } & IFieldDefaultSlotProps) => any', optional: true, descriptionFallback: 'Default slot for the inner native input; receives IFieldDefaultSlotProps plus an optional class override.' },
        { name: 'loader', type: '() => any', optional: true, descriptionFallback: 'Custom loader content shown when the field is in a loading state.' },
        { name: 'label', type: '(props: ILabelProps) => any', optional: true, descriptionFallback: 'Custom static label content.' },
        { name: 'floatingLabel', type: '(props: ILabelProps) => any', optional: true, descriptionFallback: 'Custom floating label content.' },
        { name: 'prefix', type: '() => any', optional: true, descriptionFallback: 'Custom prefix content rendered inside the field before the input.' },
        { name: 'suffix', type: '() => any', optional: true, descriptionFallback: 'Custom suffix content rendered inside the field after the input.' },
    ],
    usedBy: [
        { slug: 'field', name: 'Field', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Field/field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_field_slots.example',
            titleFallback: 'Custom label and prefix slots',
            code: `<OrigamField>
    <template #label>My <strong>label</strong></template>
    <template #prefix>$</template>
    <template #default="{ id }">
        <input :id="id" type="number" />
    </template>
</OrigamField>`,
            lang: 'vue',
        },
    ],
}
