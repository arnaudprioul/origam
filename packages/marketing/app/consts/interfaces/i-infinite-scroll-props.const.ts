import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INFINITE_SCROLL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-infinite-scroll-props',
    name: 'IInfiniteScrollProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_infinite_scroll_props.description',
    descriptionFallback: 'Props contract for OrigamInfiniteScroll — configures scroll side, intersection mode, empty/load-more text labels, root margin, and visual surfaces.',
    definition: `export interface IInfiniteScrollProps extends ICommonsComponentProps, IColorProps, IBgColorProps, IDimensionProps, ITagProps, IDirectionProps {
    side?: TInfiniteScrollSide
    mode?: TInfiniteScrollMode
    loadMoreText?: string
    emptyText?: string
    margin?: string
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'IDimensionProps', 'ITagProps', 'IDirectionProps'],
    props: [
        { name: 'side', type: 'TInfiniteScrollSide', optional: true, descriptionFallback: "Which end of the scroll container triggers load ('start' | 'end' | 'both')." },
        { name: 'mode', type: 'TInfiniteScrollMode', optional: true, descriptionFallback: "Intersection mode: 'intersect' (automatic) or 'manual' (shows a load-more button)." },
        { name: 'loadMoreText', type: 'string', optional: true, descriptionFallback: 'Label for the manual load-more button.' },
        { name: 'emptyText', type: 'string', optional: true, descriptionFallback: 'Text displayed when done is called with empty.' },
        { name: 'margin', type: 'string', optional: true, descriptionFallback: 'IntersectionObserver rootMargin for the sentinel.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InfiniteScroll/infinite-scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_infinite_scroll_props.example',
            titleFallback: 'Automatic infinite scroll on the bottom of a list',
            code: `<OrigamInfiniteScroll
    side="end"
    mode="intersect"
    empty-text="No more results"
    @load="loadMore"
>
    <ArticleCard v-for="a in articles" :key="a.id" v-bind="a" />
</OrigamInfiniteScroll>`,
            lang: 'vue',
        },
    ],
}
