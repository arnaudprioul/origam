import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHECKBOX_BTN_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-checkbox-btn-emits',
    name: 'ICheckboxBtnEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_checkbox_btn_emits.description',
    descriptionFallback: 'Emits for <OrigamCheckboxBtn>. Extends ICommonsComponentEmits, IFocusEmits and ISelectionControlEmits with an indeterminate-sync event fired when the indeterminate state changes.',
    definition: `export interface ICheckboxBtnEmits extends ICommonsComponentEmits, IFocusEmits, ISelectionControlEmits {
    (e: 'update:indeterminate', event: any): void
}`,
    extends: ['ICommonsComponentEmits', 'IFocusEmits', 'ISelectionControlEmits'],
    props: [
        { name: 'update:indeterminate', type: '(event: any) => void', optional: false, descriptionFallback: "Fired when the indeterminate prop should be synced back to the parent. Use v-model:indeterminate to bind it two-way." },
    ],
    usedBy: [
        { slug: 'checkbox-btn', name: 'OrigamCheckboxBtn', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Checkbox/checkbox-btn.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_checkbox_btn_emits.example',
            titleFallback: 'Two-way indeterminate binding',
            code: `<OrigamCheckboxBtn
    v-model="checked"
    v-model:indeterminate="isIndeterminate"
    @update:indeterminate="onIndeterminateChange"
/>`,
            lang: 'vue',
        },
    ],
}
