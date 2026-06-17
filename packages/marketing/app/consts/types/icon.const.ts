import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const ICON_TYPE_DOC: ITypeDoc = {
    slug: 'icon',
    name: 'TIcon',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.icon.description',
    descriptionFallback: 'Accepted value for any icon prop across the design system — a string glyph name, a multi-path SVG array, or a Vue component.',
    definition: `export type TIcon =
    | string
    | Array<(string | [path: string, opacity: number])>
    | Component`,
    values: [],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'prependIcon' },
        { slug: 'btn', name: 'Btn', propName: 'appendIcon' },
        { slug: 'tab', name: 'Tab', propName: 'icon' },
        { slug: 'snackbar', name: 'Snackbar', propName: 'icon' },
        { slug: 'pagination', name: 'Pagination', propName: 'firstIcon' },
        { slug: 'slide-group', name: 'SlideGroup', propName: 'nextIcon' },
    ],
    sourceFile: 'packages/ds/src/types/Icon/icon.type.ts',
    examples: [
        {
            titleKey: 'types.detail.icon.example_string',
            titleFallback: 'String glyph name (MDI)',
            code: `<origam-btn prepend-icon="mdi-check">Save</origam-btn>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.icon.example_component',
            titleFallback: 'Custom Vue component as icon',
            code: `<script setup lang="ts">
import MyLogoIcon from './MyLogoIcon.vue'
</script>

<template>
  <origam-btn :prepend-icon="MyLogoIcon">Brand</origam-btn>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: 'types.detail.icon.example_multipath',
            titleFallback: 'Multi-path SVG array with per-path opacity',
            code: `<origam-icon
  :icon="[
    'M12 2 L22 22 L2 22 Z',
    ['M12 8 L12 14', 0.5],
  ]"
/>`,
            lang: 'html',
        },
    ],
}
