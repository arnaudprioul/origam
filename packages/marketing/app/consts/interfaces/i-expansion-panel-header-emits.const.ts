import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EXPANSION_PANEL_HEADER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-expansion-panel-header-emits',
    name: 'IExpansionPanelHeaderEmits',
    category: 'Disclosure',
    descriptionKey: 'interfaces.catalog.i_expansion_panel_header_emits.description',
    descriptionFallback: 'Emits contract for OrigamExpansionPanelHeader — inherits IAdjacentEmits which carries click events from the prepend and append icon slots.',
    definition: `export interface IExpansionPanelHeaderEmits extends IAdjacentEmits {}`,
    extends: ['IAdjacentEmits'],
    props: [],
    usedBy: [
        { slug: 'expansion-panel-header', name: 'OrigamExpansionPanelHeader', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ExpensionPanel/expansion-panel-header.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_expansion_panel_header_emits.example',
            titleFallback: 'Listening to prepend icon click',
            code: `<OrigamExpansionPanelHeader
    prepend-icon="mdi-star"
    @click:prepend="handleStarClick"
>
    Section title
</OrigamExpansionPanelHeader>`,
            lang: 'html',
        },
    ],
}
