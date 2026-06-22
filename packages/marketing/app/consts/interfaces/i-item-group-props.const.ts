import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ITEM_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-item-group-props',
    name: 'IItemGroupProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_item_group_props.description',
    descriptionFallback: 'Props for <OrigamItemGroup> — the renderless selection container. Provides multi-select or single-select semantics without any visual chrome. The tag prop is shadowed locally to ensure Vue 3 runtime prop registration.',
    definition: `export interface IItemGroupProps extends ICommonsComponentProps, ITagProps, IGroupProps {
    tag?: string
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IGroupProps'],
    props: [
        {
            name: 'tag',
            type: 'string',
            optional: true,
            descriptionFallback: 'Root element tag for the group container. Shadowed locally from ITagProps to force Vue 3 runtime prop registration.',
        },
    ],
    usedBy: [
        { slug: 'item-group', name: 'ItemGroup', kind: 'component' },
        { slug: 'btn-toggle', name: 'BtnToggle', kind: 'component' },
        { slug: 'chip-group', name: 'ChipGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ItemGroup/item-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_item_group_props.example',
            titleFallback: 'Single-select item group',
            code: `<OrigamItemGroup v-model="selected" tag="nav">
    <OrigamItem value="home">Home</OrigamItem>
    <OrigamItem value="about">About</OrigamItem>
</OrigamItemGroup>`,
            lang: 'vue',
        },
    ],
}
