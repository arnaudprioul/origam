import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GROUP_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-group-item',
    name: 'IGroupItem',
    category: 'Data & State',
    descriptionKey: 'interfaces.catalog.i_group_item.description',
    descriptionFallback: 'Internal registration record for a single item inside a group — carries the numeric id assigned by the group provider, a reactive value ref and a reactive disabled ref.',
    definition: `export interface IGroupItem {
    id: number
    value: Ref<unknown>
    disabled: Ref<boolean | undefined>
}`,
    extends: [],
    props: [
        {
            name: 'id',
            type: 'number',
            optional: false,
            descriptionFallback: 'Unique numeric identifier assigned by the group provider at registration time.',
        },
        {
            name: 'value',
            type: 'Ref<unknown>',
            optional: false,
            descriptionFallback: 'Reactive value ref — the logical value this item represents in the group selection model.',
        },
        {
            name: 'disabled',
            type: 'Ref<boolean | undefined>',
            optional: false,
            descriptionFallback: 'Reactive disabled state — when true, the item cannot be selected.',
        },
    ],
    usedBy: [
        { slug: 'btn-toggle', name: 'BtnToggle', kind: 'component' },
        { slug: 'slide-group', name: 'SlideGroup', kind: 'component' },
        { slug: 'chip-group', name: 'ChipGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_group_item.example',
            titleFallback: 'Shape of an item registered in a group provider',
            code: `import type { IGroupItem } from 'origam'

// Items are registered automatically when useGroupItem() mounts.
// The group provider stores them as:
const item: IGroupItem = {
    id: 1,
    value: ref('option-a'),
    disabled: ref(false),
}`,
            lang: 'typescript',
        },
    ],
}
