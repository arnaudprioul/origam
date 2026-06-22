import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_GROUP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-group-emits',
    name: 'IListGroupEmits',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_group_emits.description',
    descriptionFallback: 'Emit contract for <OrigamListGroup> — fires when the user clicks the activator chrome, allowing parent components to toggle the open state.',
    definition: `export interface IListGroupEmits {
    (e: 'click:activator', event: MouseEvent): void
}`,
    extends: [],
    props: [
        {
            name: 'click:activator',
            type: 'MouseEvent',
            optional: false,
            descriptionFallback: 'Emitted when the group activator is clicked. Forwards the native MouseEvent.',
        },
    ],
    usedBy: [
        { slug: 'list-group', name: 'ListGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_group_emits.example',
            titleFallback: 'Logging activator clicks',
            code: `<OrigamListGroup @click:activator="onActivatorClick">
    <template #activator="{ props }">
        <OrigamListItem v-bind="props" title="Admin" />
    </template>
</OrigamListGroup>`,
            lang: 'vue',
        },
    ],
}
