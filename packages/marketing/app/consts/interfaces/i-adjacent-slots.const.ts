import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ADJACENT_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-adjacent-slots',
    name: 'IAdjacentSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_adjacent_slots.description',
    descriptionFallback: 'Slot signatures for outer prepend and append content — replaces the icon/avatar props with arbitrary markup.',
    definition: `export interface IAdjacentSlots {
    prepend?: () => any
    append?: () => any
}`,
    extends: [],
    props: [
        { name: 'prepend', type: '() => any', optional: true, descriptionFallback: 'Custom content rendered at the leading edge of the component, replacing prependIcon/prependAvatar.' },
        { name: 'append', type: '() => any', optional: true, descriptionFallback: 'Custom content rendered at the trailing edge of the component, replacing appendIcon/appendAvatar.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
        { slug: 'field', name: 'Field', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/adjacent.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_adjacent_slots.example',
            titleFallback: 'Custom prepend slot',
            code: `<OrigamBtn>
    <template #prepend>
        <OrigamAvatar src="/user.jpg" size="sm" />
    </template>
    Profile
</OrigamBtn>`,
            lang: 'vue',
        },
    ],
}
