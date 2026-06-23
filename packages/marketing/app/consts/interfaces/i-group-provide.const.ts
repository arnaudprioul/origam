import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GROUP_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-group-provide',
    name: 'IGroupProvide',
    category: 'Group & Selection',
    descriptionKey: 'interfaces.catalog.i_group_provide.description',
    descriptionFallback: 'Runtime injection provided by a group component to all its item descendants — exposes registration, selection control, navigation and the full item list.',
    definition: `export interface IGroupProvide {
    register: (item: IGroupItem, cmp: ComponentInternalInstance) => void
    unregister: (id: number) => void
    select: (id: number, value: boolean) => void
    selected: Ref<Readonly<Array<number>>>
    isSelected: (id: number) => boolean
    prev: () => void
    next: () => void
    selectedClass: Ref<string | undefined>
    items: ComputedRef<Array<{
        id: number
        value: unknown
        disabled: boolean | undefined
    }>>
    disabled: Ref<boolean | undefined>
    getItemIndex: (value: unknown) => number
}`,
    extends: [],
    props: [
        { name: 'register', type: '(item: IGroupItem, cmp: ComponentInternalInstance) => void', optional: false, descriptionFallback: 'Registers a new item in the group; called by each item on mount.' },
        { name: 'unregister', type: '(id: number) => void', optional: false, descriptionFallback: 'Removes an item from the group by its numeric id; called on unmount.' },
        { name: 'select', type: '(id: number, value: boolean) => void', optional: false, descriptionFallback: 'Sets the selected state of a specific item by id.' },
        { name: 'selected', type: 'Ref<Readonly<Array<number>>>', optional: false, descriptionFallback: 'Reactive list of currently selected item ids.' },
        { name: 'isSelected', type: '(id: number) => boolean', optional: false, descriptionFallback: 'Returns true if the item with the given id is currently selected.' },
        { name: 'prev', type: '() => void', optional: false, descriptionFallback: 'Selects the previous item in registration order (wraps around).' },
        { name: 'next', type: '() => void', optional: false, descriptionFallback: 'Selects the next item in registration order (wraps around).' },
        { name: 'selectedClass', type: 'Ref<string | undefined>', optional: false, descriptionFallback: 'CSS class applied to selected items, reactive to the group-level prop.' },
        { name: 'items', type: 'ComputedRef<Array<{ id: number; value: unknown; disabled: boolean | undefined }>>', optional: false, descriptionFallback: 'Computed list of all registered items with their id, value and disabled state.' },
        { name: 'disabled', type: 'Ref<boolean | undefined>', optional: false, descriptionFallback: 'Whether the entire group is disabled.' },
        { name: 'getItemIndex', type: '(value: unknown) => number', optional: false, descriptionFallback: 'Returns the registration index of the item whose value matches the argument, or -1.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_group_provide.example',
            titleFallback: 'Injecting the group provide in an item component',
            code: `import { inject } from 'vue'
import type { IGroupProvide } from 'origam'

const group = inject<IGroupProvide>('group')
group?.next()`,
            lang: 'typescript',
        },
    ],
}
