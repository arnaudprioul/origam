import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SNACKBAR_GROUP_DEFAULT_MAX_CONST_DOC: IConstDoc = {
    slug: 'snackbar-group-default-max',
    name: 'SNACKBAR_GROUP_DEFAULT_MAX',
    category: 'Feedback & Notifications',
    descriptionKey: 'consts.catalog.snackbar_group_default_max.description',
    descriptionFallback: 'Default maximum number of snackbar items rendered concurrently in a SnackbarGroup. Excess items are evicted FIFO (oldest first) when new ones are pushed.',
    definition: `export const SNACKBAR_GROUP_DEFAULT_MAX = 5`,
    value: '5',
    usedBy: [
        { name: 'useSnackbarGroup' },
        { name: 'OrigamSnackbarGroup' },
    ],
    sourceFile: 'packages/ds/src/consts/Snackbar/snackbar-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.snackbar_group_default_max.example',
            titleFallback: 'Overriding the maximum concurrency',
            code: `<template>
  <!-- Allow up to 3 simultaneous snackbars -->
  <origam-snackbar-group :max="3" />
</template>`,
            lang: 'vue',
        },
    ],
}
