import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHECKBOX_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-checkbox-emits',
    name: 'ICheckboxEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_checkbox_emits.description',
    descriptionFallback: 'Emits for <OrigamCheckbox>. Composes ICommonsComponentEmits, IFocusEmits (focus/blur) and ISelectionControlEmits (update:modelValue and update:indeterminate).',
    definition: `export interface ICheckboxEmits extends ICommonsComponentEmits, IFocusEmits, ISelectionControlEmits {

}`,
    extends: ['ICommonsComponentEmits', 'IFocusEmits', 'ISelectionControlEmits'],
    props: [],
    usedBy: [
        { slug: 'checkbox', name: 'OrigamCheckbox', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Checkbox/checkbox.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_checkbox_emits.example',
            titleFallback: 'Listening to focus and value changes',
            code: `<OrigamCheckbox
    v-model="checked"
    @focus="onFocus"
    @blur="onBlur"
    @update:model-value="onChange"
/>`,
            lang: 'vue',
        },
    ],
}
