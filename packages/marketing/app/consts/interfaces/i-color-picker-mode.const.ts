import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PICKER_MODE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-picker-mode',
    name: 'IColorPickerMode',
    category: 'Color',
    descriptionKey: 'interfaces.catalog.i_color_picker_mode.description',
    descriptionFallback: 'Descriptor for a single colour input mode (RGB, HSL, HSV, HEX) — holds the input field config, bi-directional HSVA conversion functions and the list of editable channel inputs.',
    definition: `export interface IColorPickerMode {
    inputProps: Record<string, unknown>
    inputs: Array<{
        [key: string]: any
        label: string
        getValue: (color: any) => number | string
        getColor: (color: any, v: string) => any
    }>
    from: (color: any) => THSVA
    to: (color: THSVA) => any
}`,
    extends: [],
    props: [
        { name: 'inputProps', type: 'Record<string, unknown>', optional: false, descriptionFallback: 'Base props spread onto every channel input element for this mode (e.g. min/max/step for number inputs).' },
        { name: 'inputs', type: 'Array<{ label: string; getValue: (color: any) => number | string; getColor: (color: any, v: string) => any; [key: string]: any }>', optional: false, descriptionFallback: 'List of editable channel inputs. Each entry has a display label, a getter to extract the channel value from a colour and a setter that merges a new channel value back into the colour.' },
        { name: 'from', type: '(color: any) => THSVA', optional: false, descriptionFallback: 'Convert a colour from this mode\'s native representation (e.g. an RGBA object) to the internal THSVA tuple.' },
        { name: 'to', type: '(color: THSVA) => any', optional: false, descriptionFallback: 'Convert the internal THSVA tuple back to this mode\'s native representation for output and display.' },
    ],
    usedBy: [
        { slug: 'color-picker', name: 'ColorPicker', kind: 'component' },
        { slug: 'color-picker-edit', name: 'ColorPickerEdit', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ColorPicker/color-picker.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_picker_mode.example',
            titleFallback: 'Shape of a custom colour mode descriptor',
            code: `import type { IColorPickerMode } from 'origam'

const hexMode: IColorPickerMode = {
    inputProps: { maxlength: 7 },
    inputs: [{ label: 'HEX', getValue: c => rgbaToHex(c), getColor: (c, v) => hexToRgba(v) }],
    from: hexToHsva,
    to: hsvaToHex,
}`,
            lang: 'typescript',
        },
    ],
}
