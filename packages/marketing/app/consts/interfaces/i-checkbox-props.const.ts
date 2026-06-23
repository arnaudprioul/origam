import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHECKBOX_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-checkbox-props',
    name: 'ICheckboxProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_checkbox_props.description',
    descriptionFallback: 'Props for <OrigamCheckbox> — the full-featured form checkbox combining ICheckboxBtnProps with IInputProps (validation, messages, label) and all visual surface interfaces (color, border, elevation, density, spacing, rounded).',
    definition: `export interface ICheckboxProps extends ICommonsComponentProps, IInputProps, ICheckboxBtnProps, IDensityProps, IPaddingProps, IMarginProps, IRoundedProps, IColorProps, IBorderProps, IElevationProps, IActiveProps, IHoverProps {

}`,
    extends: [
        'ICommonsComponentProps',
        'IInputProps',
        'ICheckboxBtnProps',
        'IDensityProps',
        'IPaddingProps',
        'IMarginProps',
        'IRoundedProps',
        'IColorProps',
        'IBorderProps',
        'IElevationProps',
        'IActiveProps',
        'IHoverProps',
    ],
    props: [],
    usedBy: [
        { slug: 'checkbox', name: 'OrigamCheckbox', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Checkbox/checkbox.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_checkbox_props.example',
            titleFallback: 'Full checkbox with validation and color',
            code: `<OrigamCheckbox
    v-model="accepted"
    label="Accept terms"
    color="primary"
    :rules="[v => !!v || 'Required']"
    :indeterminate="someSelected"
/>`,
            lang: 'vue',
        },
    ],
}
