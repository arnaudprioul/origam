import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ADJACENT_INNER_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-adjacent-inner-slots',
    name: 'IAdjacentInnerSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_adjacent_inner_slots.description',
    descriptionFallback: 'Slot signatures for content rendered inside the input chrome — leading edge, trailing edge, and the clear action.',
    definition: `export interface IAdjacentInnerSlots {
    prependInner?: () => any
    appendInner?: () => any
    clear?: () => any
}`,
    extends: [],
    props: [
        { name: 'prependInner', type: '() => any', optional: true, descriptionFallback: 'Content rendered inside the input at the leading edge, replacing prependInnerIcon.' },
        { name: 'appendInner', type: '() => any', optional: true, descriptionFallback: 'Content rendered inside the input at the trailing edge, replacing appendInnerIcon.' },
        { name: 'clear', type: '() => any', optional: true, descriptionFallback: 'Custom content for the clear action slot.' },
    ],
    usedBy: [
        { slug: 'input', name: 'Input', kind: 'component' },
        { slug: 'field', name: 'Field', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/adjacent.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_adjacent_inner_slots.example',
            titleFallback: 'Custom prepend-inner slot',
            code: `<OrigamInput>
    <template #prepend-inner>
        <OrigamIcon icon="mdi-magnify" />
    </template>
</OrigamInput>`,
            lang: 'vue',
        },
    ],
}
