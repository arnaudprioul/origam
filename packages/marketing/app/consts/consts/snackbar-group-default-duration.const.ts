import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SNACKBAR_GROUP_DEFAULT_DURATION_CONST_DOC: IConstDoc = {
    slug: 'snackbar-group-default-duration',
    name: 'SNACKBAR_GROUP_DEFAULT_DURATION',
    category: 'Feedback & Notifications',
    descriptionKey: 'consts.catalog.snackbar_group_default_duration.description',
    descriptionFallback: 'Default auto-dismiss timeout in milliseconds (5000 ms = 5 s) applied to SnackbarGroup items when neither the stack nor the per-item options specify a duration. A per-item value of 0 makes the snackbar sticky.',
    definition: `export const SNACKBAR_GROUP_DEFAULT_DURATION = 5000`,
    value: '5000',
    usedBy: [
        { name: 'useSnackbarGroup' },
        { name: 'OrigamSnackbarGroup' },
    ],
    sourceFile: 'packages/ds/src/consts/Snackbar/snackbar-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.snackbar_group_default_duration.example',
            titleFallback: 'Binding the default duration to a custom stack',
            code: `import { SNACKBAR_GROUP_DEFAULT_DURATION } from 'origam'

const { push } = useSnackbarGroup()
push({ message: 'Saved!', duration: SNACKBAR_GROUP_DEFAULT_DURATION })`,
            lang: 'typescript',
        },
    ],
}
