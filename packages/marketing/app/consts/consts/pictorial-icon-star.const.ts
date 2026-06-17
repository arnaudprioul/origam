import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PICTORIAL_ICON_STAR_CONST_DOC: IConstDoc = {
    slug: 'pictorial-icon-star',
    name: 'PICTORIAL_ICON_STAR',
    category: 'Chart',
    descriptionKey: 'consts.catalog.pictorial_icon_star.description',
    descriptionFallback: 'SVG path d string for a five-pointed star / rating shape, sized to fit a viewBox="0 0 24 24" coordinate system. Use it as the icon prop of OrigamChartPictorial for rating or performance data series.',
    definition: `export const PICTORIAL_ICON_STAR =
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z'`,
    value: "'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z'",
    usedBy: [
        { name: 'OrigamChartPictorial', slug: 'origam-chart-pictorial' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/pictorial-icons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.pictorial_icon_star.example',
            titleFallback: 'Using the star icon in a pictorial chart',
            code: `<template>
  <OrigamChartPictorial :icon="PICTORIAL_ICON_STAR" :value="4" :max="5" />
</template>

<script setup lang="ts">
import { PICTORIAL_ICON_STAR } from 'origam'
</script>`,
            lang: 'vue',
        },
    ],
}
