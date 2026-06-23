import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const HSVA_TYPE_DOC: ITypeDoc = {
    slug: 'hsva',
    name: 'THSVA',
    kind: 'type',
    category: 'Color & Intent',
    descriptionKey: 'types.catalog.hsva.description',
    descriptionFallback: 'Structured hue-saturation-value-alpha color object used internally by OrigamColorPicker as its canonical color model. All color format conversions (HEX, RGBA, HSLA) go through THSVA as the pivot.',
    definition: `export type THSVA = { h: number, s: number, v: number, a?: number }`,
    values: [],
    usedBy: [
        { slug: 'color-picker', name: 'ColorPicker', propName: 'colorHsv' },
        { slug: 'color-picker-canvas', name: 'ColorPickerCanvas', propName: 'colorHsv' },
        { slug: 'color-picker-edit', name: 'ColorPickerEdit', propName: 'colorHsv' },
        { slug: 'color-picker-preview', name: 'ColorPickerPreview', propName: 'colorHsv' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/color.type.ts',
    examples: [
        {
            titleKey: 'types.detail.hsva.example_object',
            titleFallback: 'Controlling ColorPicker with an HSVA object',
            code: `<script setup lang="ts">
import type { THSVA } from 'origam'
const color = ref<THSVA>({ h: 210, s: 0.8, v: 0.9, a: 1 })
</script>

<template>
  <origam-color-picker v-model:color-hsv="color" />
</template>`,
            lang: 'vue',
        },
        {
            titleKey: 'types.detail.hsva.example_fields',
            titleFallback: 'THSVA field reference',
            code: `// h — hue in degrees [0, 360)
// s — saturation [0, 1]
// v — value (brightness) [0, 1]
// a — alpha [0, 1], optional (defaults to 1 when omitted)
const red: THSVA = { h: 0, s: 1, v: 1, a: 1 }`,
            lang: 'ts',
        },
    ],
}
