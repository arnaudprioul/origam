import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SNACKBAR_GROUP_DEFAULT_SPACING_CONST_DOC: IConstDoc = {
    slug: 'snackbar-group-default-spacing',
    name: 'SNACKBAR_GROUP_DEFAULT_SPACING',
    category: 'Feedback & Notifications',
    descriptionKey: 'consts.catalog.snackbar_group_default_spacing.description',
    descriptionFallback: 'Default CSS gap between stacked snackbar items in a SnackbarGroup. Applied as a CSS dimension string.',
    definition: `export const SNACKBAR_GROUP_DEFAULT_SPACING = '12px'`,
    value: "'12px'",
    usedBy: [
        { name: 'useSnackbarGroup' },
        { name: 'OrigamSnackbarGroup' },
    ],
    sourceFile: 'packages/ds/src/consts/Snackbar/snackbar-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.snackbar_group_default_spacing.example',
            titleFallback: 'Reading the default spacing',
            code: `import { SNACKBAR_GROUP_DEFAULT_SPACING } from 'origam'

// Use in a custom layout
console.log(SNACKBAR_GROUP_DEFAULT_SPACING) // '12px'`,
            lang: 'typescript',
        },
    ],
}
