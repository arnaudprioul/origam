import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-emits',
    name: 'IColorPickerEmits',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_emits.description',
    descriptionFallback: 'Emits fired by OrigamColorPicker — v-model on the resolved colour plus the active input mode.',
    definition: `export interface IColorPickerEmits extends ICommonsComponentEmits, IColorModeEmits {}`,
    extends: ['ICommonsComponentEmits', 'IColorModeEmits'],
    props: [],
    usedBy: [
        { slug: 'color-picker', name: 'ColorPicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_emits.example',
            titleFallback: 'Full ColorPicker with v-model and mode tracking',
            code: `<OrigamColorPicker
    v-model="color"
    :mode="colorMode"
    @update:mode="colorMode = $event"
/>`,
            lang: 'vue',
        },
    ],
}
