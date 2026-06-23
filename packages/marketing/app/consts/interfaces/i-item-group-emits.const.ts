import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ITEM_GROUP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-item-group-emits',
    name: 'IItemGroupEmits',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_item_group_emits.description',
    descriptionFallback: 'Emit contract for <OrigamItemGroup> — inherits the v-model update events from ICommonsComponentEmits so the active item set can be two-way bound.',
    definition: `export interface IItemGroupEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'item-group', name: 'ItemGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ItemGroup/item-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_item_group_emits.example',
            titleFallback: 'Listening to the update:modelValue emit',
            code: `<OrigamItemGroup v-model="selected" @update:modelValue="onSelectionChange">
    <OrigamItem value="a">Item A</OrigamItem>
    <OrigamItem value="b">Item B</OrigamItem>
</OrigamItemGroup>`,
            lang: 'vue',
        },
    ],
}
