import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_EDIT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-edit-props',
    name: 'IColorPickerEditProps',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_edit_props.description',
    descriptionFallback: 'Props for OrigamColorPickerEdit — the text-input row that lets users type colour values in a chosen mode (RGB, HSL, HSV, HEX) and switch between modes.',
    definition: `export interface IColorPickerEditProps extends ICommonsComponentProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    mode?: TColorModes
    modes?: Array<TColorModes>
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'colorHsv', type: 'THSVA | null', optional: true, descriptionFallback: 'Current colour as an HSVA tuple. The edit row converts this to the active mode for display and sends updates back through update:colorHsv.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Make all text inputs read-only and disable the mode switcher.' },
        { name: 'mode', type: 'TColorModes', optional: true, descriptionFallback: 'Active colour input mode (e.g. "rgb", "hsl", "hex"). Synced via update:mode.' },
        { name: 'modes', type: 'Array<TColorModes>', optional: true, descriptionFallback: 'Subset of colour modes exposed as mode-switcher options. Defaults to all supported modes.' },
    ],
    usedBy: [
        { slug: 'color-picker-edit', name: 'ColorPickerEdit', kind: 'component' },
        { slug: 'color-picker', name: 'ColorPicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_edit_props.example',
            titleFallback: 'Standalone edit row limited to HEX and RGB',
            code: `<OrigamColorPickerEdit
    :color-hsv="hsva"
    mode="hex"
    :modes="['hex', 'rgb']"
    @update:color-hsv="hsva = $event"
    @update:mode="mode = $event"
/>`,
            lang: 'vue',
        },
    ],
}
