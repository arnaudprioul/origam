import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SNACKBAR_GROUP_DEFAULT_ID_CONST_DOC: IConstDoc = {
    slug: 'snackbar-group-default-id',
    name: 'SNACKBAR_GROUP_DEFAULT_ID',
    category: 'Feedback & Notifications',
    descriptionKey: 'consts.catalog.snackbar_group_default_id.description',
    descriptionFallback: 'Default stack identifier used by `useSnackbarGroup` when the consumer does not pass an explicit id. Multiple independent stacks can coexist on a page — each is keyed by its own id in the composable\'s internal Map.',
    definition: `export const SNACKBAR_GROUP_DEFAULT_ID = 'default'`,
    value: "'default'",
    usedBy: [
        { name: 'useSnackbarGroup' },
        { name: 'OrigamSnackbarGroup' },
    ],
    sourceFile: 'packages/ds/src/consts/Snackbar/snackbar-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.snackbar_group_default_id.example',
            titleFallback: 'Targeting the default snackbar stack',
            code: `import { SNACKBAR_GROUP_DEFAULT_ID } from 'origam'

const { push } = useSnackbarGroup(SNACKBAR_GROUP_DEFAULT_ID)
push({ message: 'Hello!' })`,
            lang: 'typescript',
        },
    ],
}
