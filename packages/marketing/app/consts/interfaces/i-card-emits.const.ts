import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CARD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-card-emits',
    name: 'ICardEmits',
    category: 'Card',
    descriptionKey: 'interfaces.catalog.i_card_emits.description',
    descriptionFallback: 'Emit signatures fired by OrigamCard — inherited from IAdjacentEmits (prepend/append clicks), IActiveEmits (active state sync) and IHoverEmits (hover state sync).',
    definition: `export interface ICardEmits extends IAdjacentEmits, IActiveEmits, IHoverEmits {}`,
    extends: ['IAdjacentEmits', 'IActiveEmits', 'IHoverEmits'],
    props: [],
    usedBy: [
        { slug: 'card', name: 'OrigamCard', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Card/card.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_card_emits.example',
            titleFallback: 'Listening to OrigamCard emits',
            code: `<OrigamCard
    hover
    @click:prepend="onPrependClick"
    @update:active="onActiveChange"
    @update:hover="onHoverChange"
/>`,
            lang: 'vue',
        },
    ],
}
