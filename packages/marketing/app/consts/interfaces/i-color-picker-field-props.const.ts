import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-field-props',
    name: 'IColorPickerFieldProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_color_picker_field_props.description',
    descriptionFallback: 'Props for OrigamColorPickerField — a text-field that opens an inline ColorPicker menu, inheriting the full field + input pipeline (validation, density, adjacent, transition).',
    definition: `export interface IColorPickerFieldProps extends ICommonsComponentProps, IColorProps, ITextFieldProps, IDensityProps, IAdjacentProps, IAdjacentInnerProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, ITransitionComponentProps {
    menu?: boolean
    menuProps?: IMenuProps
    openOnClear?: boolean
    closeText?: string
    openText?: string
    closeOnSelect?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'IColorProps',
        'ITextFieldProps',
        'IDensityProps',
        'IAdjacentProps',
        'IAdjacentInnerProps',
        'IFieldProps',
        'IInputProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'ITransitionComponentProps',
    ],
    props: [
        { name: 'menu', type: 'boolean', optional: true, descriptionFallback: 'Control the open/closed state of the colour picker menu programmatically.' },
        { name: 'menuProps', type: 'IMenuProps', optional: true, descriptionFallback: 'Props passed through to the underlying OrigamMenu component (offset, placement, z-index, etc.).' },
        { name: 'openOnClear', type: 'boolean', optional: true, descriptionFallback: 'Reopen the picker menu when the clear button is activated.' },
        { name: 'closeText', type: 'string', optional: true, descriptionFallback: 'Label of the close/confirm button at the bottom of the picker panel.' },
        { name: 'openText', type: 'string', optional: true, descriptionFallback: 'Accessible label of the trigger button that opens the picker.' },
        { name: 'closeOnSelect', type: 'boolean', optional: true, descriptionFallback: 'Automatically close the picker when a colour is committed (click outside or confirm).' },
    ],
    usedBy: [
        { slug: 'color-picker-field', name: 'ColorPickerField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPickerField/color-picker-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_field_props.example',
            titleFallback: 'Colour picker field with label and close-on-select',
            code: `<OrigamColorPickerField
    v-model="color"
    label="Brand colour"
    :close-on-select="true"
    close-text="Apply"
/>`,
            lang: 'vue',
        },
    ],
}
