import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ITEM_GROUP_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-item-group-item-props',
    name: 'IItemGroupItemProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_item_group_item_props.description',
    descriptionFallback: 'Props for <OrigamItem> — a single registered member inside an <OrigamItemGroup>. Named IItemGroupItemProps to avoid collision with IItemProps from the List area. The tag prop is shadowed locally to ensure runtime registration.',
    definition: `export interface IItemGroupItemProps extends ICommonsComponentProps, ITagProps, IGroupItemProps {
    tag?: string
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IGroupItemProps'],
    props: [
        {
            name: 'tag',
            type: 'string',
            optional: true,
            descriptionFallback: 'Root element tag rendered by the item. Shadowed locally from ITagProps to force Vue 3 runtime prop registration.',
        },
    ],
    usedBy: [
        { slug: 'item-group', name: 'ItemGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ItemGroup/item-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_item_group_item_props.example',
            titleFallback: 'Using OrigamItem inside a group',
            code: `<OrigamItemGroup v-model="active">
    <OrigamItem value="tab-1" tag="button">Tab 1</OrigamItem>
    <OrigamItem value="tab-2" tag="button">Tab 2</OrigamItem>
</OrigamItemGroup>`,
            lang: 'vue',
        },
    ],
}
