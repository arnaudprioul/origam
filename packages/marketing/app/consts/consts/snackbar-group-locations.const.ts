import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SNACKBAR_GROUP_LOCATIONS_CONST_DOC: IConstDoc = {
    slug: 'snackbar-group-locations',
    name: 'SNACKBAR_GROUP_LOCATIONS',
    category: 'Feedback & Notifications',
    descriptionKey: 'consts.catalog.snackbar_group_locations.description',
    descriptionFallback: 'Closed list of valid `location` values for OrigamSnackbarGroup. Covers the eight placement zones available on the viewport edges and corners.',
    definition: `export const SNACKBAR_GROUP_LOCATIONS: ReadonlyArray<TSnackbarGroupLocation> = [
    'top-left',
    'top-right',
    'top-center',
    'bottom-left',
    'bottom-right',
    'bottom-center',
    'top',
    'bottom'
]`,
    values: [
        { value: "'top-left'", descriptionKey: 'consts.detail.snackbar_group_locations.top_left', descriptionFallback: 'Top-left corner of the viewport.' },
        { value: "'top-right'", descriptionKey: 'consts.detail.snackbar_group_locations.top_right', descriptionFallback: 'Top-right corner of the viewport.' },
        { value: "'top-center'", descriptionKey: 'consts.detail.snackbar_group_locations.top_center', descriptionFallback: 'Top-centre of the viewport.' },
        { value: "'bottom-left'", descriptionKey: 'consts.detail.snackbar_group_locations.bottom_left', descriptionFallback: 'Bottom-left corner of the viewport.' },
        { value: "'bottom-right'", descriptionKey: 'consts.detail.snackbar_group_locations.bottom_right', descriptionFallback: 'Bottom-right corner of the viewport.' },
        { value: "'bottom-center'", descriptionKey: 'consts.detail.snackbar_group_locations.bottom_center', descriptionFallback: 'Bottom-centre of the viewport.' },
        { value: "'top'", descriptionKey: 'consts.detail.snackbar_group_locations.top', descriptionFallback: 'Full-width strip at the top of the viewport.' },
        { value: "'bottom'", descriptionKey: 'consts.detail.snackbar_group_locations.bottom', descriptionFallback: 'Full-width strip at the bottom of the viewport.' },
    ],
    usedBy: [
        { name: 'useSnackbarGroup' },
        { name: 'OrigamSnackbarGroup' },
    ],
    sourceFile: 'packages/ds/src/consts/Snackbar/snackbar-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.snackbar_group_locations.example',
            titleFallback: 'Iterating locations for a HstSelect control',
            code: `import { SNACKBAR_GROUP_LOCATIONS } from 'origam'

const options = SNACKBAR_GROUP_LOCATIONS.map(l => ({ label: l, value: l }))`,
            lang: 'typescript',
        },
    ],
}
