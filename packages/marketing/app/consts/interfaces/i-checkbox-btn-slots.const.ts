import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHECKBOX_BTN_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-checkbox-btn-slots',
    name: 'ICheckboxBtnSlots',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_checkbox_btn_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamCheckboxBtn>. Extends ICommonsComponentSlots with a label slot and an input slot that exposes the underlying props, icon and color state for full customisation.',
    definition: `export interface ICheckboxBtnSlots extends ICommonsComponentSlots {
    label?: () => any
    input?: (data: { props: any, icon: TIcon, textColorStyles: TColor, backgroundColorStyles: TColor, model: any }) => any
}`,
    extends: ['ICommonsComponentSlots'],
    props: [
        { name: 'label', type: '() => any', optional: true, descriptionFallback: 'Replaces the default label text. Use for rich label content (links, icons, formatted text).' },
        { name: 'input', type: '(data: { props: any; icon: TIcon; textColorStyles: TColor; backgroundColorStyles: TColor; model: any }) => any', optional: true, descriptionFallback: 'Replaces the entire checkbox visual (box + icon). Receives props, the resolved icon, text/background color style maps, and the current model value.' },
    ],
    usedBy: [
        { slug: 'checkbox-btn', name: 'OrigamCheckboxBtn', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Checkbox/checkbox-btn.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_checkbox_btn_slots.example',
            titleFallback: 'Custom label slot with a link',
            code: `<OrigamCheckboxBtn v-model="accepted">
    <template #label>
        I agree to the
        <a href="/terms" target="_blank">Terms of Service</a>
    </template>
</OrigamCheckboxBtn>`,
            lang: 'vue',
        },
    ],
}
