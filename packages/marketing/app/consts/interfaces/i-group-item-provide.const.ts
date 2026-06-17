import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GROUP_ITEM_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-group-item-provide',
    name: 'IGroupItemProvide',
    category: 'Group & Selection',
    descriptionKey: 'interfaces.catalog.i_group_item_provide.description',
    descriptionFallback: 'Runtime injection provided by each item component to its descendants — exposes identity, selection state, toggle and a back-reference to the parent group.',
    definition: `export interface IGroupItemProvide {
    id: number
    isSelected: Ref<boolean>
    toggle: () => void
    select: (value: boolean) => void
    selectedClass: Ref<Array<(string | undefined)> | false>
    value: Ref<unknown>
    disabled: Ref<boolean | undefined>
    group: IGroupProvide
}`,
    extends: [],
    props: [
        { name: 'id', type: 'number', optional: false, descriptionFallback: 'Unique numeric id assigned by the parent group on registration.' },
        { name: 'isSelected', type: 'Ref<boolean>', optional: false, descriptionFallback: 'Reactive flag — true when this item is in the group selection.' },
        { name: 'toggle', type: '() => void', optional: false, descriptionFallback: 'Toggles the selected state of this item inside the group.' },
        { name: 'select', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Explicitly sets the selected state to the given boolean.' },
        { name: 'selectedClass', type: 'Ref<Array<(string | undefined)> | false>', optional: false, descriptionFallback: 'Resolved CSS class list to apply when selected, or false when not selected.' },
        { name: 'value', type: 'Ref<unknown>', optional: false, descriptionFallback: 'Reactive ref wrapping the item value (mirrors the value prop).' },
        { name: 'disabled', type: 'Ref<boolean | undefined>', optional: false, descriptionFallback: 'Reactive disabled state — true prevents selection.' },
        { name: 'group', type: 'IGroupProvide', optional: false, descriptionFallback: 'Back-reference to the parent group provide object.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_group_item_provide.example',
            titleFallback: 'Injecting the group-item provide in a child component',
            code: `import { inject } from 'vue'
import type { IGroupItemProvide } from 'origam'

const groupItem = inject<IGroupItemProvide>('groupItem')
const { isSelected, toggle } = groupItem!`,
            lang: 'typescript',
        },
    ],
}
