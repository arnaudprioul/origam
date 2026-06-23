import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INFINITE_SCROLL_INTERSECT_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-infinite-scroll-intersect-emits',
    name: 'IInfiniteScrollIntersectEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_infinite_scroll_intersect_emits.description',
    descriptionFallback: 'Emit contract for the lower-level OrigamInfiniteScrollIntersect sentinel — bubbles IntersectionObserver entries as an intersect event carrying the visibility state and scroll side.',
    definition: `export interface IInfiniteScrollIntersectEmits {
    (e: 'intersect', value: { isIntersecting: boolean, side: TInfiniteScrollSide }): void
}`,
    extends: [],
    props: [
        { name: 'intersect', type: "(e: 'intersect', value: { isIntersecting: boolean, side: TInfiniteScrollSide }) => void", optional: false, descriptionFallback: 'Fired when the sentinel element enters or exits the viewport. isIntersecting is true when entering.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InfiniteScroll/infinite-scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_infinite_scroll_intersect_emits.example',
            titleFallback: 'Using the low-level intersect sentinel',
            code: `<OrigamInfiniteScrollIntersect
    :root-ref="scrollContainerRef"
    @intersect="({ isIntersecting, side }) => isIntersecting && loadPage(side)"
/>`,
            lang: 'vue',
        },
    ],
}
