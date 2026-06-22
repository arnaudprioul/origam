import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SNACKBAR_GROUP_ITEM_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-snackbar-group-item-options',
    name: 'ISnackbarGroupItemOptions',
    category: 'Data Shapes',
    descriptionKey: 'interfaces.catalog.i_snackbar_group_item_options.description',
    descriptionFallback: 'Options accepted by useSnackbarGroup().notify(opts) — every field is optional except that the resulting item must surface either a title, a message, or both to the user.',
    definition: `export interface ISnackbarGroupItemOptions {
    title?: string
    message?: string
    intent?: TIntent
    duration?: number
    icon?: TIcon
    actions?: ReadonlyArray<ISnackbarGroupItemAction>
    dismissible?: boolean
    onDismiss?: () => void
}`,
    extends: [],
    props: [
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Bold first line. Useful for short labels (e.g. "Saved").' },
        { name: 'message', type: 'string', optional: true, descriptionFallback: 'Body text under the title (or sole line when title is absent).' },
        { name: 'intent', type: 'TIntent', optional: true, descriptionFallback: 'Semantic intent driving icon defaults, role=status|alert, and surface coloring. Defaults to "info".' },
        { name: 'duration', type: 'number', optional: true, descriptionFallback: 'Auto-dismiss timeout in ms. Overrides the stack-level defaultDuration. Pass 0 to make the item sticky.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Prepend icon override. Defaults to the per-intent icon (mdiCheckCircle for success, mdiAlertCircle for danger, …).' },
        { name: 'actions', type: 'ReadonlyArray<ISnackbarGroupItemAction>', optional: true, descriptionFallback: 'Optional action buttons rendered in the snackbar footer.' },
        { name: 'dismissible', type: 'boolean', optional: true, descriptionFallback: 'Whether to show the close (X) button. Default true.' },
        { name: 'onDismiss', type: '() => void', optional: true, descriptionFallback: 'Callback fired once the item leaves the stack.' },
    ],
    usedBy: [
        { slug: 'use-snackbar-group', name: 'useSnackbarGroup', kind: 'composable' },
        { slug: 'snackbar-group', name: 'SnackbarGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Snackbar/snackbar-group-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_snackbar_group_item_options.example',
            titleFallback: 'notify() with full options',
            code: `import { useSnackbarGroup } from 'origam'
import type { ISnackbarGroupItemOptions } from 'origam'

const { notify } = useSnackbarGroup()

const opts: ISnackbarGroupItemOptions = {
    title: 'Changes saved',
    intent: 'success',
    duration: 3000,
    dismissible: true,
    onDismiss: () => console.log('dismissed'),
}

notify(opts)`,
            lang: 'typescript',
        },
    ],
}
