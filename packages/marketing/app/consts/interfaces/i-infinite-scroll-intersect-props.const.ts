import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INFINITE_SCROLL_INTERSECT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-infinite-scroll-intersect-props',
    name: 'IInfiniteScrollIntersectProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_infinite_scroll_intersect_props.description',
    descriptionFallback: 'Props for the low-level OrigamInfiniteScrollIntersect sentinel element — configures the IntersectionObserver root, scroll side, and margin.',
    definition: `export interface IInfiniteScrollIntersectProps extends ICommonsComponentProps {
    side?: TInfiniteScrollSide
    rootRef: HTMLElement
    margin?: string
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'side', type: 'TInfiniteScrollSide', optional: true, descriptionFallback: "Which scroll direction this sentinel monitors ('start' | 'end' | 'both')." },
        { name: 'rootRef', type: 'HTMLElement', optional: false, descriptionFallback: 'The scrollable container element passed as the IntersectionObserver root.' },
        { name: 'margin', type: 'string', optional: true, descriptionFallback: 'IntersectionObserver rootMargin — triggers load before the sentinel is fully visible.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InfiniteScroll/infinite-scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_infinite_scroll_intersect_props.example',
            titleFallback: 'Sentinel with 200px pre-load margin',
            code: `<OrigamInfiniteScrollIntersect
    :root-ref="listRef"
    side="end"
    margin="0px 0px 200px 0px"
    @intersect="onIntersect"
/>`,
            lang: 'vue',
        },
    ],
}
