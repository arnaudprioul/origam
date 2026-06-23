import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PICTORIAL_ICON_BEER_MUG_CONST_DOC: IConstDoc = {
    slug: 'pictorial-icon-beer-mug',
    name: 'PICTORIAL_ICON_BEER_MUG',
    category: 'Chart',
    descriptionKey: 'consts.catalog.pictorial_icon_beer_mug.description',
    descriptionFallback: 'SVG path d string for a beer mug shape, sized to fit a viewBox="0 0 24 24" coordinate system. Typical use case: beer consumption per capita demos in OrigamChartPictorial.',
    definition: `export const PICTORIAL_ICON_BEER_MUG =
    'M5 10h12v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9zm12 0V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v5h12zM17 11h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v-7z'`,
    value: "'M5 10h12v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9zm12 0V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v5h12zM17 11h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v-7z'",
    usedBy: [
        { name: 'OrigamChartPictorial', slug: 'origam-chart-pictorial' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/pictorial-icons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.pictorial_icon_beer_mug.example',
            titleFallback: 'Using the beer mug icon in a pictorial chart',
            code: `<template>
  <OrigamChartPictorial :icon="PICTORIAL_ICON_BEER_MUG" :value="68" :max="100" />
</template>

<script setup lang="ts">
import { PICTORIAL_ICON_BEER_MUG } from 'origam'
</script>`,
            lang: 'vue',
        },
    ],
}
