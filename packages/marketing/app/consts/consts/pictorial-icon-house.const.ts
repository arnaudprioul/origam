import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PICTORIAL_ICON_HOUSE_CONST_DOC: IConstDoc = {
    slug: 'pictorial-icon-house',
    name: 'PICTORIAL_ICON_HOUSE',
    category: 'Chart',
    descriptionKey: 'consts.catalog.pictorial_icon_house.description',
    descriptionFallback: 'SVG path d string for a house / home shape, sized to fit a viewBox="0 0 24 24" coordinate system. Use it as the icon prop of OrigamChartPictorial for housing-related data series.',
    definition: `export const PICTORIAL_ICON_HOUSE =
    'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'`,
    value: "'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'",
    usedBy: [
        { name: 'OrigamChartPictorial', slug: 'origam-chart-pictorial' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/pictorial-icons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.pictorial_icon_house.example',
            titleFallback: 'Using the house icon in a pictorial chart',
            code: `<template>
  <OrigamChartPictorial :icon="PICTORIAL_ICON_HOUSE" :value="30" :max="100" />
</template>

<script setup lang="ts">
import { PICTORIAL_ICON_HOUSE } from 'origam'
</script>`,
            lang: 'vue',
        },
    ],
}
