import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SNACKBAR_GROUP_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-snackbar-group-item',
    name: 'ISnackbarGroupItem',
    category: 'Data Shapes',
    descriptionKey: 'interfaces.catalog.i_snackbar_group_item.description',
    descriptionFallback: 'Materialised item held inside the snackbar stack store. Extends ISnackbarGroupItemOptions with auto-generated id and createdAt timestamp — used internally by useSnackbarGroup and OrigamSnackbarGroup.',
    definition: `export interface ISnackbarGroupItem extends ISnackbarGroupItemOptions {
    id: string
    createdAt: number
}`,
    extends: ['ISnackbarGroupItemOptions'],
    props: [
        { name: 'id', type: 'string', optional: false, descriptionFallback: 'Auto-generated unique identifier for this stack item. Used by dismiss(id) to address a specific notification.' },
        { name: 'createdAt', type: 'number', optional: false, descriptionFallback: 'Unix timestamp (ms) when the item was added to the stack. Used for FIFO eviction when max is exceeded.' },
    ],
    usedBy: [
        { slug: 'use-snackbar-group', name: 'useSnackbarGroup', kind: 'composable' },
        { slug: 'snackbar-group', name: 'SnackbarGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Snackbar/snackbar-group-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_snackbar_group_item.example',
            titleFallback: 'Accessing the current stack items',
            code: `import { useSnackbarGroup } from 'origam'
import type { ISnackbarGroupItem } from 'origam'

const { items, dismiss } = useSnackbarGroup()

// items is Ref<ISnackbarGroupItem[]>
const latest: ISnackbarGroupItem = items.value[0]
dismiss(latest.id)`,
            lang: 'typescript',
        },
    ],
}
