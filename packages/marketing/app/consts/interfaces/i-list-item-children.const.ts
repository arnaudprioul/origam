import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_ITEM_CHILDREN_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-item-children',
    name: 'IListItemChildren',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_item_children.description',
    descriptionFallback: 'Data contract describing a flat items array together with an optional returnObject flag. Used by slots that expose item lists from <OrigamList> to nested child components.',
    definition: `export interface IListItemChildren {
    items: Array<IInternalListItemChildren>
    returnObject?: boolean
}`,
    extends: [],
    props: [
        {
            name: 'items',
            type: 'Array<IInternalListItemChildren>',
            optional: false,
            descriptionFallback: 'The normalised child items array to render.',
        },
        {
            name: 'returnObject',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'When true, item values are the full raw objects instead of the extracted itemValue.',
        },
    ],
    usedBy: [
        { slug: 'list', name: 'List', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-children.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_item_children.example',
            titleFallback: 'Slot exposing normalised children',
            code: `<OrigamList :items="tree">
    <template #children="{ items, returnObject }">
        <!-- items: IInternalListItemChildren[] -->
        <OrigamListItem
            v-for="item in items"
            :key="item.value"
            :title="item.title"
        />
    </template>
</OrigamList>`,
            lang: 'vue',
        },
    ],
}
