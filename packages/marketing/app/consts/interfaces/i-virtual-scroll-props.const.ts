import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIRTUAL_SCROLL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-virtual-scroll-props',
    name: 'IVirtualScrollProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_virtual_scroll_props.description',
    descriptionFallback: 'Props for OrigamVirtualScroll. Extends ICommonsComponentProps, IDimensionProps, and IVirtualProps with an items array and a renderless flag for custom DOM rendering.',
    definition: `export interface IVirtualScrollProps extends ICommonsComponentProps, IDimensionProps, IVirtualProps {
    items?: Array<any>
    renderless?: boolean
}`,
    extends: ['ICommonsComponentProps', 'IDimensionProps', 'IVirtualProps'],
    props: [
        { name: 'items', type: 'Array<any>', optional: true, descriptionFallback: 'The list of items to render. Each item is exposed to the #default scoped slot as the rendered payload.' },
        { name: 'renderless', type: 'boolean', optional: true, descriptionFallback: 'When true, the component does not render a wrapper element — only the scoped slot content is rendered. The consumer is responsible for managing the scroll container.' },
    ],
    usedBy: [
        { slug: 'virtual-scroll', name: 'VirtualScroll', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/VirtualScroll/virtual-scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_virtual_scroll_props.example',
            titleFallback: 'Basic virtual list with OrigamVirtualScroll',
            code: `<OrigamVirtualScroll :items="bigList" height="400px">
    <template #default="{ item }">
        <MyRow :data="item" />
    </template>
</OrigamVirtualScroll>`,
            lang: 'html',
        },
    ],
}
