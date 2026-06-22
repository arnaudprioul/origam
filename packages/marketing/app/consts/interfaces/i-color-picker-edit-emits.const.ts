import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_EDIT_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-edit-emits',
    name: 'IColorPickerEditEmits',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_edit_emits.description',
    descriptionFallback: 'Emits fired by OrigamColorPickerEdit — text-field edits push HSVA updates and mode switches up through the shared channels.',
    definition: `export interface IColorPickerEditEmits extends IColorHsvEmits, IColorModeEmits {}`,
    extends: ['IColorHsvEmits', 'IColorModeEmits'],
    props: [],
    usedBy: [
        { slug: 'color-picker-edit', name: 'ColorPickerEdit', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_edit_emits.example',
            titleFallback: 'Listening to edit events in the parent',
            code: `<OrigamColorPickerEdit
    :color-hsv="hsva"
    :mode="mode"
    @update:color-hsv="hsva = $event"
    @update:mode="mode = $event"
/>`,
            lang: 'vue',
        },
    ],
}
