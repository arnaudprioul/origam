import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PICTORIAL_ICON_DOLLAR_CONST_DOC: IConstDoc = {
    slug: 'pictorial-icon-dollar',
    name: 'PICTORIAL_ICON_DOLLAR',
    category: 'Chart',
    descriptionKey: 'consts.catalog.pictorial_icon_dollar.description',
    descriptionFallback: 'SVG path d string for a dollar / currency symbol shape, sized to fit a viewBox="0 0 24 24" coordinate system. Use it as the icon prop of OrigamChartPictorial for financial or revenue data series.',
    definition: `export const PICTORIAL_ICON_DOLLAR =
    'M12 1v2.09C9.15 3.49 7 5.37 7 8c0 2.87 2.34 4.31 5 5.31 2.32.87 3 1.4 3 2.69 0 1.45-1.28 2-3 2-1.87 0-3-.85-3-2.5H7c0 2.44 1.78 4.16 5 4.5V22h2v-2.09c2.85-.4 5-2.28 5-5.41 0-3.08-2.38-4.49-5-5.39-2.17-.8-3-1.42-3-2.61 0-1.17 1.04-2 3-2s3 1.01 3 2.5h2c0-2.44-1.88-4.16-5-4.5V1h-2Z'`,
    value: "'M12 1v2.09C9.15 3.49 7 5.37 7 8c0 2.87 2.34 4.31 5 5.31 2.32.87 3 1.4 3 2.69 0 1.45-1.28 2-3 2-1.87 0-3-.85-3-2.5H7c0 2.44 1.78 4.16 5 4.5V22h2v-2.09c2.85-.4 5-2.28 5-5.41 0-3.08-2.38-4.49-5-5.39-2.17-.8-3-1.42-3-2.61 0-1.17 1.04-2 3-2s3 1.01 3 2.5h2c0-2.44-1.88-4.16-5-4.5V1h-2Z'",
    usedBy: [
        { name: 'OrigamChartPictorial', slug: 'origam-chart-pictorial' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/pictorial-icons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.pictorial_icon_dollar.example',
            titleFallback: 'Using the dollar icon in a pictorial chart',
            code: `<template>
  <OrigamChartPictorial :icon="PICTORIAL_ICON_DOLLAR" :value="75" :max="100" />
</template>

<script setup lang="ts">
import { PICTORIAL_ICON_DOLLAR } from 'origam'
</script>`,
            lang: 'vue',
        },
    ],
}
