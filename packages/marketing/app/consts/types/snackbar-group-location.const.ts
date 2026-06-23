import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const SNACKBAR_GROUP_LOCATION_TYPE_DOC: ITypeDoc = {
    slug: 'snackbar-group-location',
    name: 'TSnackbarGroupLocation',
    kind: 'type',
    category: 'Feedback & Status',
    descriptionKey: 'types.catalog.snackbar_group_location.description',
    descriptionFallback: 'Viewport anchor location for OrigamSnackbarGroup — two-keyword strings describe a corner, single keywords describe an edge with horizontal centering.',
    definition: `export type TSnackbarGroupLocation =
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'top'
    | 'bottom'`,
    values: [
        {
            value: 'top-left',
            descriptionKey: 'types.detail.snackbar_group_location.top_left',
            descriptionFallback: 'Pins the stack to the top-left corner of the viewport.',
        },
        {
            value: 'top-right',
            descriptionKey: 'types.detail.snackbar_group_location.top_right',
            descriptionFallback: 'Pins the stack to the top-right corner of the viewport.',
        },
        {
            value: 'top-center',
            descriptionKey: 'types.detail.snackbar_group_location.top_center',
            descriptionFallback: 'Centers the stack horizontally at the top of the viewport.',
        },
        {
            value: 'bottom-left',
            descriptionKey: 'types.detail.snackbar_group_location.bottom_left',
            descriptionFallback: 'Pins the stack to the bottom-left corner of the viewport.',
        },
        {
            value: 'bottom-right',
            descriptionKey: 'types.detail.snackbar_group_location.bottom_right',
            descriptionFallback: 'Pins the stack to the bottom-right corner of the viewport.',
        },
        {
            value: 'bottom-center',
            descriptionKey: 'types.detail.snackbar_group_location.bottom_center',
            descriptionFallback: 'Centers the stack horizontally at the bottom of the viewport.',
        },
        {
            value: 'top',
            descriptionKey: 'types.detail.snackbar_group_location.top',
            descriptionFallback: 'Alias for top-center — horizontal centering at the top edge.',
        },
        {
            value: 'bottom',
            descriptionKey: 'types.detail.snackbar_group_location.bottom',
            descriptionFallback: 'Alias for bottom-center — horizontal centering at the bottom edge.',
        },
    ],
    usedBy: [
        { slug: 'snackbar-group', name: 'SnackbarGroup', propName: 'location' },
    ],
    sourceFile: 'packages/ds/src/types/Snackbar/snackbar-group-location.type.ts',
    examples: [
        {
            titleKey: 'types.detail.snackbar_group_location.example',
            titleFallback: 'Notification stack at bottom-right',
            code: `<origam-snackbar-group location="bottom-right">
  <origam-snackbar text="File saved successfully" />
  <origam-snackbar text="Sync complete" color="success" />
</origam-snackbar-group>`,
            lang: 'html',
        },
    ],
}
