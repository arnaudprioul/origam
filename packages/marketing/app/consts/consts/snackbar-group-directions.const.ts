import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SNACKBAR_GROUP_DIRECTIONS_CONST_DOC: IConstDoc = {
    slug: 'snackbar-group-directions',
    name: 'SNACKBAR_GROUP_DIRECTIONS',
    category: 'Feedback & Notifications',
    descriptionKey: 'consts.catalog.snackbar_group_directions.description',
    descriptionFallback: 'Closed list of valid `direction` values for OrigamSnackbarGroup. Exposed so stories and consumers can iterate the matrix without duplicating string literals.',
    definition: `export const SNACKBAR_GROUP_DIRECTIONS: ReadonlyArray<TSnackbarGroupDirection> = [
    'top-down',
    'bottom-up'
]`,
    values: [
        { value: "'top-down'", descriptionKey: 'consts.detail.snackbar_group_directions.top_down', descriptionFallback: 'Snackbars stack from top to bottom — newest item appears below the previous one.' },
        { value: "'bottom-up'", descriptionKey: 'consts.detail.snackbar_group_directions.bottom_up', descriptionFallback: 'Snackbars stack from bottom to top — newest item appears above the previous one.' },
    ],
    usedBy: [
        { name: 'useSnackbarGroup' },
        { name: 'OrigamSnackbarGroup' },
    ],
    sourceFile: 'packages/ds/src/consts/Snackbar/snackbar-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.snackbar_group_directions.example',
            titleFallback: 'Iterating directions for a HstSelect control',
            code: `import { SNACKBAR_GROUP_DIRECTIONS } from 'origam'

const options = SNACKBAR_GROUP_DIRECTIONS.map(d => ({ label: d, value: d }))`,
            lang: 'typescript',
        },
    ],
}
