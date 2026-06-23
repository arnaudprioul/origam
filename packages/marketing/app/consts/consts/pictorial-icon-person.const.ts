import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PICTORIAL_ICON_PERSON_CONST_DOC: IConstDoc = {
    slug: 'pictorial-icon-person',
    name: 'PICTORIAL_ICON_PERSON',
    category: 'Chart',
    descriptionKey: 'consts.catalog.pictorial_icon_person.description',
    descriptionFallback: 'SVG path d string for a human silhouette shape, sized to fit a viewBox="0 0 24 24" coordinate system. Default icon for OrigamChartPictorial when no icon prop is provided.',
    definition: `export const PICTORIAL_ICON_PERSON =
    'M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Zm-7 20a7 7 0 0 1 14 0v1H5v-1Z'`,
    value: "'M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Zm-7 20a7 7 0 0 1 14 0v1H5v-1Z'",
    usedBy: [
        { name: 'OrigamChartPictorial', slug: 'origam-chart-pictorial' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/pictorial-icons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.pictorial_icon_person.example',
            titleFallback: 'Using the person silhouette in a pictorial chart',
            code: `<template>
  <OrigamChartPictorial :icon="PICTORIAL_ICON_PERSON" :value="42" :max="100" />
</template>

<script setup lang="ts">
import { PICTORIAL_ICON_PERSON } from 'origam'
</script>`,
            lang: 'vue',
        },
    ],
}
