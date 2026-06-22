import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_WINDOW_ITEM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-window-item-emits',
    name: 'IWindowItemEmits',
    category: 'State & Interaction',
    descriptionKey: 'interfaces.catalog.i_window_item_emits.description',
    descriptionFallback: 'Emits contract for <OrigamWindowItem> — inherits group membership lifecycle events (selected/deselected) from IGroupEmits.',
    definition: `export interface IWindowItemEmits extends IGroupEmits {}`,
    extends: ['IGroupEmits'],
    props: [],
    usedBy: [
        { slug: 'window-item', name: 'WindowItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Window/window-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_window_item_emits.example',
            titleFallback: 'Reacting to slide activation',
            code: `<OrigamWindowItem @group:selected="onActivated" @group:deselected="onDeactivated">
  <img src="slide.jpg" alt="Slide content" />
</OrigamWindowItem>`,
            lang: 'html',
        },
    ],
}
