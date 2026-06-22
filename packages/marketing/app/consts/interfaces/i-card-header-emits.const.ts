import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CARD_HEADER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-card-header-emits',
    name: 'ICardHeaderEmits',
    category: 'Card',
    descriptionKey: 'interfaces.catalog.i_card_header_emits.description',
    descriptionFallback: 'Emit signatures fired by OrigamCardHeader — clicks on the prepend and append adjacent slots, inherited from IAdjacentEmits.',
    definition: `export interface ICardHeaderEmits extends IAdjacentEmits {}`,
    extends: ['IAdjacentEmits'],
    props: [],
    usedBy: [
        { slug: 'card-header', name: 'OrigamCardHeader', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Card/card-header.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_card_header_emits.example',
            titleFallback: 'Listening to prepend/append clicks on OrigamCardHeader',
            code: `<OrigamCardHeader
    title="My Card"
    @click:prepend="onMenuOpen"
    @click:append="onClose"
/>`,
            lang: 'vue',
        },
    ],
}
