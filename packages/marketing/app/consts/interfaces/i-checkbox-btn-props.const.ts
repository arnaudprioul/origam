import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHECKBOX_BTN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-checkbox-btn-props',
    name: 'ICheckboxBtnProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_checkbox_btn_props.description',
    descriptionFallback: 'Props for <OrigamCheckboxBtn>. Extends ISelectionControlProps with indeterminate state support — the third visual state between checked and unchecked.',
    definition: `export interface ICheckboxBtnProps extends ICommonsComponentProps, ISelectionControlProps {
    indeterminate?: boolean
    indeterminateIcon?: TIcon
}`,
    extends: ['ICommonsComponentProps', 'ISelectionControlProps'],
    props: [
        { name: 'indeterminate', type: 'boolean', optional: true, descriptionFallback: 'Puts the checkbox into an indeterminate state (neither checked nor unchecked). Typically used for a parent checkbox when children are in a mixed state.' },
        { name: 'indeterminateIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon displayed when the checkbox is in the indeterminate state. Defaults to the DS minus/dash glyph.' },
    ],
    usedBy: [
        { slug: 'checkbox-btn', name: 'OrigamCheckboxBtn', kind: 'component' },
        { slug: 'i-checkbox-props', name: 'ICheckboxProps', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Checkbox/checkbox-btn.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_checkbox_btn_props.example',
            titleFallback: 'Indeterminate parent checkbox',
            code: `<OrigamCheckboxBtn
    v-model="allSelected"
    :indeterminate="someSelected && !allSelected"
    label="Select all"
/>`,
            lang: 'vue',
        },
    ],
}
