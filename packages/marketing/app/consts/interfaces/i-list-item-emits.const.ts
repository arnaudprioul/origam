import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_ITEM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-item-emits',
    name: 'IListItemEmits',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_item_emits.description',
    descriptionFallback: 'Emit contract for <OrigamListItem> — inherits the generic click event from IClickEmits and the prepend/append slot click events from IAdjacentEmits.',
    definition: `export interface IListItemEmits extends IClickEmits, IAdjacentEmits {}`,
    extends: ['IClickEmits', 'IAdjacentEmits'],
    props: [],
    usedBy: [
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_item_emits.example',
            titleFallback: 'Listening to click and adjacent emits',
            code: `<OrigamListItem
    title="Download"
    @click="onItemClick"
    @click:prepend="onIconClick"
>
    <template #prepend>
        <OrigamIcon icon="mdi-download" />
    </template>
</OrigamListItem>`,
            lang: 'vue',
        },
    ],
}
