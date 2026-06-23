import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIRTUAL_SCROLL_ITEM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-virtual-scroll-item-emits',
    name: 'IVirtualScrollItemEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_virtual_scroll_item_emits.description',
    descriptionFallback: 'Emits fired by OrigamVirtualScrollItem. The resize-observed height is forwarded to the parent virtual scroller so it can update its intrinsic-size cache.',
    definition: `export interface IVirtualScrollItemEmits {
    (e: 'update:height', value: number): void
}`,
    extends: [],
    props: [
        { name: 'update:height', type: '(value: number) => void', optional: false, descriptionFallback: 'Fired when the item height changes (measured via ResizeObserver). The parent virtual scroller uses this to update its intrinsic-size cache for accurate scrollbar geometry.' },
    ],
    usedBy: [
        { slug: 'virtual-scroll-item', name: 'VirtualScrollItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/VirtualScroll/virtual-scroll-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_virtual_scroll_item_emits.example',
            titleFallback: 'Receiving height updates from a virtual scroll item',
            code: `<OrigamVirtualScrollItem @update:height="onItemHeight">
    <MyCard />
</OrigamVirtualScrollItem>`,
            lang: 'html',
        },
    ],
}
