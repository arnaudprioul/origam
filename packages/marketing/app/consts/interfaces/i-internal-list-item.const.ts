import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERNAL_LIST_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-internal-list-item',
    name: 'IInternalListItem',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_internal_list_item.description',
    descriptionFallback: 'Normalised list item record extending IInternalItem with a resolved title, arbitrary props bag, and optional nested children. This is the shape every item-based list component works with internally.',
    definition: `export interface IInternalListItem<T = any> extends IInternalItem<T> {
    title?: string
    props?: {
        [key: string]: any
        title?: string
        value?: any
    }
    children?: Array<IInternalListItem<T>>
}`,
    extends: ['IInternalItem'],
    props: [
        {
            name: 'title',
            type: 'string',
            optional: true,
            descriptionFallback: 'Resolved display title for the list item.',
        },
        {
            name: 'props',
            type: '{ [key: string]: any; title?: string; value?: any }',
            optional: true,
            descriptionFallback: 'Additional props bag forwarded to the list item component, including title and value overrides.',
        },
        {
            name: 'children',
            type: 'Array<IInternalListItem<T>>',
            optional: true,
            descriptionFallback: 'Nested children items for multi-level list structures.',
        },
    ],
    usedBy: [
        { slug: 'list', name: 'List', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'autocomplete', name: 'Autocomplete', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-children.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_internal_list_item.example',
            titleFallback: 'Accessing a normalised list item in a slot',
            code: `<OrigamList :items="menu">
    <template #item="{ item }">
        <!-- item: IInternalListItem -->
        <span>{{ item.title }}</span>
        <OrigamList v-if="item.children" :items="item.children" />
    </template>
</OrigamList>`,
            lang: 'vue',
        },
    ],
}
