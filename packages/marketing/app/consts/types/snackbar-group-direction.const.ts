import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const SNACKBAR_GROUP_DIRECTION_TYPE_DOC: ITypeDoc = {
    slug: 'snackbar-group-direction',
    name: 'TSnackbarGroupDirection',
    kind: 'type',
    category: 'Feedback & Status',
    descriptionKey: 'types.catalog.snackbar_group_direction.description',
    descriptionFallback: 'Stacking direction for OrigamSnackbarGroup — controls whether new items are appended at the top or bottom of the visible list.',
    definition: `export type TSnackbarGroupDirection = 'top-down' | 'bottom-up'`,
    values: [
        {
            value: 'top-down',
            descriptionKey: 'types.detail.snackbar_group_direction.top_down',
            descriptionFallback: 'Newest item appended at the bottom of the visible list; older items drift upward as the stack grows. Default for top-anchored locations.',
        },
        {
            value: 'bottom-up',
            descriptionKey: 'types.detail.snackbar_group_direction.bottom_up',
            descriptionFallback: 'Newest item appears at the top of the visible list; older items drift downward. Default for bottom-anchored locations.',
        },
    ],
    usedBy: [
        { slug: 'snackbar-group', name: 'SnackbarGroup', propName: 'direction' },
    ],
    sourceFile: 'packages/ds/src/types/Snackbar/snackbar-group-direction.type.ts',
    examples: [
        {
            titleKey: 'types.detail.snackbar_group_direction.example',
            titleFallback: 'Snackbar group stacking bottom-up at top-right',
            code: `<origam-snackbar-group location="top-right" direction="bottom-up">
  <origam-snackbar v-for="n in notifications" :key="n.id" :text="n.message" />
</origam-snackbar-group>`,
            lang: 'html',
        },
    ],
}
