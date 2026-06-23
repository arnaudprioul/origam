import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SNACKBAR_GROUP_ITEM_ACTION_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-snackbar-group-item-action',
    name: 'ISnackbarGroupItemAction',
    category: 'Data Shapes',
    descriptionKey: 'interfaces.catalog.i_snackbar_group_item_action.description',
    descriptionFallback: 'Action button descriptor attached to a snackbar stack item. Rendered as a button inside the toast — clicking it invokes handler and by default dismisses the item.',
    definition: `export interface ISnackbarGroupItemAction {
    label: string
    handler: () => void
    intent?: TIntent
    keepOpen?: boolean
}`,
    extends: [],
    props: [
        { name: 'label', type: 'string', optional: false, descriptionFallback: 'Text label displayed on the action button.' },
        { name: 'handler', type: '() => void', optional: false, descriptionFallback: 'Callback invoked when the action button is clicked.' },
        { name: 'intent', type: 'TIntent', optional: true, descriptionFallback: 'Semantic intent driving the button color (e.g. "primary", "danger").' },
        { name: 'keepOpen', type: 'boolean', optional: true, descriptionFallback: 'When true, the snackbar stays visible after the action is clicked (e.g. for multi-step confirmations). Defaults to false.' },
    ],
    usedBy: [
        { slug: 'snackbar-item', name: 'SnackbarItem', kind: 'component' },
        { slug: 'use-snackbar-group', name: 'useSnackbarGroup', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Snackbar/snackbar-group-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_snackbar_group_item_action.example',
            titleFallback: 'Notify with an undo action',
            code: `import { useSnackbarGroup } from 'origam'

const { notify } = useSnackbarGroup()

notify({
    title: 'File deleted',
    actions: [
        {
            label: 'Undo',
            handler: () => restoreFile(),
            intent: 'primary',
            keepOpen: false,
        },
    ],
})`,
            lang: 'typescript',
        },
    ],
}
