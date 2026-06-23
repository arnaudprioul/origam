import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERNAL_LIST_ITEM_CHILDREN_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-internal-list-item-children',
    name: 'IInternalListItemChildren',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_internal_list_item_children.description',
    descriptionFallback: 'Extension of IInternalListItem that carries an optional type discriminator. Used for heterogeneous lists where items can be regular entries, subheaders, or dividers.',
    definition: `export interface IInternalListItemChildren<T = any> extends IInternalListItem<T> {
    type?: TListItemType
}`,
    extends: ['IInternalListItem'],
    props: [
        {
            name: 'type',
            type: 'TListItemType',
            optional: true,
            descriptionFallback: 'Discriminator that identifies the kind of list item — e.g. item, subheader, or divider.',
        },
    ],
    usedBy: [
        { slug: 'list', name: 'List', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-children.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_internal_list_item_children.example',
            titleFallback: 'Rendering a heterogeneous list with type discriminators',
            code: `<OrigamList :items="mixedItems">
    <template #item="{ item }">
        <!-- item: IInternalListItemChildren -->
        <OrigamListSubheader v-if="item.type === 'subheader'" :title="item.title" />
        <OrigamDivider v-else-if="item.type === 'divider'" />
        <OrigamListItem v-else v-bind="item.props" />
    </template>
</OrigamList>`,
            lang: 'vue',
        },
    ],
}
