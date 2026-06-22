import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIRTUAL_SCROLL_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-virtual-scroll-item-props',
    name: 'IVirtualScrollItemProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_virtual_scroll_item_props.description',
    descriptionFallback: 'Props for OrigamVirtualScrollItem. Extends ICommonsComponentProps with a single renderless flag to strip the wrapper element when the consumer manages its own DOM node.',
    definition: `export interface IVirtualScrollItemProps extends ICommonsComponentProps {
    renderless?: boolean
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'renderless', type: 'boolean', optional: true, descriptionFallback: 'When true, the component does not render a wrapper element — it only measures and forwards the height. The consumer is responsible for rendering the item DOM node.' },
    ],
    usedBy: [
        { slug: 'virtual-scroll-item', name: 'VirtualScrollItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/VirtualScroll/virtual-scroll-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_virtual_scroll_item_props.example',
            titleFallback: 'Using VirtualScrollItem inside a virtual list',
            code: `<OrigamVirtualScrollItem
    v-for="item in items"
    :key="item.id"
    :renderless="false"
>
    <MyRow :data="item" />
</OrigamVirtualScrollItem>`,
            lang: 'html',
        },
    ],
}
