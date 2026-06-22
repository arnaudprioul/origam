import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHECKBOX_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-checkbox-slots',
    name: 'ICheckboxSlots',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_checkbox_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamCheckbox>. Provides a default slot for full layout control, a label slot for rich label content, and an input slot for replacing the checkbox visual itself.',
    definition: `export interface ICheckboxSlots {
    default?: (data: { id: string, messagesId: string, isDisabled: boolean, isReadonly: boolean, isValid: boolean }) => any
    label?: () => any
    input?: (data: { props: any, icon: TIcon, textColorStyles: TColor, backgroundColorStyles: TColor, model: any }) => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '(data: { id: string; messagesId: string; isDisabled: boolean; isReadonly: boolean; isValid: boolean }) => any', optional: true, descriptionFallback: 'Full layout override. Receives the generated ids and derived boolean state flags.' },
        { name: 'label', type: '() => any', optional: true, descriptionFallback: 'Replaces the label text. Use for rich content (links, icons, formatted text).' },
        { name: 'input', type: '(data: { props: any; icon: TIcon; textColorStyles: TColor; backgroundColorStyles: TColor; model: any }) => any', optional: true, descriptionFallback: 'Replaces the checkbox visual (box + icon). Receives the resolved props, icon, color style maps, and the current model.' },
    ],
    usedBy: [
        { slug: 'checkbox', name: 'OrigamCheckbox', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Checkbox/checkbox.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_checkbox_slots.example',
            titleFallback: 'Default slot for a completely custom layout',
            code: `<OrigamCheckbox v-model="val">
    <template #default="{ id, isDisabled, isValid }">
        <input :id="id" type="checkbox" :disabled="isDisabled" v-model="val">
        <label :for="id" :class="{ 'is-invalid': !isValid }">Custom label</label>
    </template>
</OrigamCheckbox>`,
            lang: 'vue',
        },
    ],
}
