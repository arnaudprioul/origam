import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_ACTIVATOR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-activator-props',
    name: 'IListActivatorProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_activator_props.description',
    descriptionFallback: 'Props for the internal list group activator component. Provides the basic commons and tag surface — the activator is the clickable header that toggles a list group open or closed.',
    definition: `export interface IListActivatorProps extends ICommonsComponentProps, ITagProps {
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [],
    usedBy: [
        { slug: 'list-group', name: 'ListGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_activator_props.example',
            titleFallback: 'Custom activator slot on a list group',
            code: `<OrigamListGroup>
    <template #activator="{ props }">
        <OrigamListItem v-bind="props" title="Settings" />
    </template>
</OrigamListGroup>`,
            lang: 'vue',
        },
    ],
}
