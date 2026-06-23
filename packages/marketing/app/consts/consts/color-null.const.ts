import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_NULL_CONST_DOC: IConstDoc = {
    slug: 'color-null',
    name: 'COLOR_NULL',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_null.description',
    descriptionFallback: 'Default HSV color object used as the initial / empty state of OrigamColorPicker. Represents opaque black (h=0, s=0, v=0, a=1).',
    definition: `export const COLOR_NULL = { h: 0, s: 0, v: 0, a: 1 }`,
    values: [
        { value: 'h: 0', descriptionKey: 'consts.detail.color_null.h', descriptionFallback: 'Hue — 0 = red/black start of the hue wheel.' },
        { value: 's: 0', descriptionKey: 'consts.detail.color_null.s', descriptionFallback: 'Saturation — 0 = fully desaturated (greyscale / black).' },
        { value: 'v: 0', descriptionKey: 'consts.detail.color_null.v', descriptionFallback: 'Value (brightness) — 0 = black.' },
        { value: 'a: 1', descriptionKey: 'consts.detail.color_null.a', descriptionFallback: 'Alpha — 1 = fully opaque.' },
    ],
    usedBy: [
        { name: 'OrigamColorPicker', slug: 'color-picker' },
    ],
    sourceFile: 'packages/ds/src/consts/ColorPicker/color-picker.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_null.example',
            titleFallback: 'Resetting the picker to the null color',
            code: `import { COLOR_NULL } from 'origam'

const color = ref({ ...COLOR_NULL })

function reset() {
  color.value = { ...COLOR_NULL }
}`,
            lang: 'typescript',
        },
    ],
}
