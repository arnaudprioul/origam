import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EMPTY_STATE_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-empty-state-slots',
    name: 'IEmptyStateSlots',
    category: 'Feedback & Status',
    descriptionKey: 'interfaces.catalog.i_empty_state_slots.description',
    descriptionFallback: 'Slot contract for OrigamEmptyState. All slots are optional. The default slot replaces the entire built-in layout; targeted slots (icon, title, description, actions) swap individual pieces.',
    definition: `export interface IEmptyStateSlots {
    default?: () => any
    icon?: () => any
    title?: () => any
    description?: () => any
    actions?: () => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '() => any', optional: true, descriptionFallback: 'Replaces the entire built-in layout (icon + title + description + actions) for a fully bespoke empty page.' },
        { name: 'icon', type: '() => any', optional: true, descriptionFallback: 'Replaces the default OrigamIcon. Use for SVG or <img> illustrations. Mark aria-hidden="true" for decorative content.' },
        { name: 'title', type: '() => any', optional: true, descriptionFallback: 'Replaces the rendered title element. Wins over the title prop when both are provided.' },
        { name: 'description', type: '() => any', optional: true, descriptionFallback: 'Replaces the rendered description element. Wins over the description prop when both are provided.' },
        { name: 'actions', type: '() => any', optional: true, descriptionFallback: 'Actions row rendered below the description. Typically holds 1–2 buttons (Create, Retry, Sign in …).' },
    ],
    usedBy: [
        { slug: 'empty-state', name: 'OrigamEmptyState', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/EmptyState/empty-state.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_empty_state_slots.example',
            titleFallback: 'Custom illustration with a retry action',
            code: `<OrigamEmptyState preset="error" title="Something went wrong">
    <template #icon>
        <img src="/illustrations/error.svg" alt="" aria-hidden="true" />
    </template>
    <template #actions>
        <OrigamBtn color="primary" @click="retry">Retry</OrigamBtn>
    </template>
</OrigamEmptyState>`,
            lang: 'html',
        },
    ],
}
