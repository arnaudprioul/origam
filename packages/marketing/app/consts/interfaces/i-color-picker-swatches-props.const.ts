import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_SWATCHES_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-swatches-props',
    name: 'IColorPickerSwatchesProps',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_swatches_props.description',
    descriptionFallback: 'Props for OrigamColorPickerSwatches — the grid of colour swatch tiles displayed below the picker controls.',
    definition: `export interface IColorPickerSwatchesProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    swatches?: Array<Array<TColorType>>
}`,
    extends: ['ICommonsComponentProps', 'IDimensionProps'],
    props: [
        { name: 'colorHsv', type: 'THSVA | null', optional: true, descriptionFallback: 'Current colour as an HSVA tuple. Used to highlight the matching swatch tile.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Prevent swatch tile selection.' },
        { name: 'swatches', type: 'Array<Array<TColorType>>', optional: true, descriptionFallback: 'Custom 2-D array of colour values (rows × swatches-per-row). Each inner array forms one row in the grid. Defaults to the built-in Material colour ramps.' },
    ],
    usedBy: [
        { slug: 'color-picker-swatches', name: 'ColorPickerSwatches', kind: 'component' },
        { slug: 'color-picker', name: 'ColorPicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker-swatches.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_swatches_props.example',
            titleFallback: 'Custom brand swatches in two rows',
            code: `<OrigamColorPickerSwatches
    :swatches="[
        ['#1a1a2e', '#16213e', '#0f3460'],
        ['#e94560', '#f5a623', '#ffffff'],
    ]"
    :color-hsv="hsva"
    @update:color-hsv="hsva = $event"
/>`,
            lang: 'vue',
        },
    ],
}
