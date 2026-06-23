import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_PREVIEW_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-preview-props',
    name: 'IColorPickerPreviewProps',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_preview_props.description',
    descriptionFallback: 'Props for OrigamColorPickerPreview — the hue/alpha slider strip that shows a preview swatch and lets the user adjust transparency.',
    definition: `export interface IColorPickerPreviewProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    hideAlpha?: boolean
}`,
    extends: ['ICommonsComponentProps', 'IDimensionProps'],
    props: [
        { name: 'colorHsv', type: 'THSVA | null', optional: true, descriptionFallback: 'Current colour as an HSVA tuple. Drives both the hue gradient and the alpha slider position.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Make the hue and alpha sliders non-interactive.' },
        { name: 'hideAlpha', type: 'boolean', optional: true, descriptionFallback: 'Hide the alpha (opacity) slider. Use when the picker should only output fully-opaque colours.' },
    ],
    usedBy: [
        { slug: 'color-picker-preview', name: 'ColorPickerPreview', kind: 'component' },
        { slug: 'color-picker', name: 'ColorPicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker-preview.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_preview_props.example',
            titleFallback: 'Standalone preview strip without alpha',
            code: `<OrigamColorPickerPreview
    :color-hsv="hsva"
    :hide-alpha="true"
    @update:color-hsv="hsva = $event"
/>`,
            lang: 'vue',
        },
    ],
}
