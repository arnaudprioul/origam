import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PICTORIAL_ICON_HEART_CONST_DOC: IConstDoc = {
    slug: 'pictorial-icon-heart',
    name: 'PICTORIAL_ICON_HEART',
    category: 'Chart',
    descriptionKey: 'consts.catalog.pictorial_icon_heart.description',
    descriptionFallback: 'SVG path d string for a heart / favourite shape, sized to fit a viewBox="0 0 24 24" coordinate system. Use it as the icon prop of OrigamChartPictorial for health or engagement data series.',
    definition: `export const PICTORIAL_ICON_HEART =
    'M12 21.593c-.525-.438-10.55-8.862-10.55-13.097 0-3.555 2.715-5.496 5.388-5.496 1.71 0 3.417.826 4.538 2.362.352.481.965 1.287 1.39 1.838.424-.551 1.037-1.357 1.389-1.838 1.122-1.536 2.829-2.362 4.538-2.362 2.674 0 5.39 1.941 5.39 5.496 0 4.235-10.026 12.659-10.55 13.097H12Z'`,
    value: "'M12 21.593c-.525-.438-10.55-8.862-10.55-13.097 0-3.555 2.715-5.496 5.388-5.496 1.71 0 3.417.826 4.538 2.362.352.481.965 1.287 1.39 1.838.424-.551 1.037-1.357 1.389-1.838 1.122-1.536 2.829-2.362 4.538-2.362 2.674 0 5.39 1.941 5.39 5.496 0 4.235-10.026 12.659-10.55 13.097H12Z'",
    usedBy: [
        { name: 'OrigamChartPictorial', slug: 'origam-chart-pictorial' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/pictorial-icons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.pictorial_icon_heart.example',
            titleFallback: 'Using the heart icon in a pictorial chart',
            code: `<template>
  <OrigamChartPictorial :icon="PICTORIAL_ICON_HEART" :value="88" :max="100" />
</template>

<script setup lang="ts">
import { PICTORIAL_ICON_HEART } from 'origam'
</script>`,
            lang: 'vue',
        },
    ],
}
