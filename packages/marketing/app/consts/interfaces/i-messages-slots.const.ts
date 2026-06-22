import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MESSAGES_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-messages-slots',
    name: 'IMessagesSlots',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_messages_slots.description',
    descriptionFallback: 'Scoped slots exposed by <OrigamMessages>. The default slot receives each individual message string so consumers can customise its rendering (e.g. add an icon, apply markup, link to a help article).',
    definition: `export interface IMessagesSlots {
    default?: (data: { message: string }) => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '(data: { message: string }) => any', optional: true, descriptionFallback: 'Scoped slot rendered once per message entry. Receives the individual message string so consumers can customise the display (icon, markup, links, etc.).' },
    ],
    usedBy: [
        { slug: 'messages', name: 'Messages', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Messages/messages.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_messages_slots.example',
            titleFallback: 'Custom message rendering with an icon',
            code: `<OrigamMessages :active="true" :messages="errors">
    <template #default="{ message }">
        <origam-icon icon="mdi-alert-circle" size="16" />
        <span>{{ message }}</span>
    </template>
</OrigamMessages>`,
            lang: 'vue',
        },
    ],
}
