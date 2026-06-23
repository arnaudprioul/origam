import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-emits',
    name: 'IListEmits',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_emits.description',
    descriptionFallback: 'Emit contract for <OrigamList> — covers selection and open-state propagation plus user-driven click events on items and groups.',
    definition: `export interface IListEmits {
    (e: 'update:selected', value: Array<unknown>): void
    (e: 'update:opened', value: Array<unknown>): void
    (e: 'click:open', value: { id: unknown, value: boolean, path: Array<unknown> }): void
    (e: 'click:select', value: { id: unknown, value: boolean, path: Array<unknown> }): void
}`,
    extends: [],
    props: [
        {
            name: 'update:selected',
            type: 'Array<unknown>',
            optional: false,
            descriptionFallback: 'Emitted when the selected item set changes. Carry the new selected values array for v-model:selected binding.',
        },
        {
            name: 'update:opened',
            type: 'Array<unknown>',
            optional: false,
            descriptionFallback: 'Emitted when the open group set changes. Carry the new opened group IDs array for v-model:opened binding.',
        },
        {
            name: 'click:open',
            type: '{ id: unknown; value: boolean; path: Array<unknown> }',
            optional: false,
            descriptionFallback: 'Emitted when the user clicks to open or close a group item. Provides the group id, the new open state, and the full path in the nested structure.',
        },
        {
            name: 'click:select',
            type: '{ id: unknown; value: boolean; path: Array<unknown> }',
            optional: false,
            descriptionFallback: 'Emitted when the user clicks to select or deselect an item. Provides the item id, the new selected state, and the path.',
        },
    ],
    usedBy: [
        { slug: 'list', name: 'List', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_emits.example',
            titleFallback: 'Two-way binding on selection and open state',
            code: `<OrigamList
    v-model:selected="selected"
    v-model:opened="opened"
    @click:select="onSelect"
    @click:open="onOpen"
    :items="navItems"
/>`,
            lang: 'vue',
        },
    ],
}
