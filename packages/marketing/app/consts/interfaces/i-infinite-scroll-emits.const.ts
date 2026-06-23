import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INFINITE_SCROLL_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-infinite-scroll-emits',
    name: 'IInfiniteScrollEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_infinite_scroll_emits.description',
    descriptionFallback: 'Emit contract for OrigamInfiniteScroll — the load event fires when the sentinel enters the viewport; the handler must call done() with ok, empty, or error to signal the result.',
    definition: `export interface IInfiniteScrollEmits {
    (e: 'load', value: { side: TInfiniteScrollSide, done: (status: 'ok' | 'empty' | 'error') => void }): void
}`,
    extends: [],
    props: [
        { name: 'load', type: "(e: 'load', value: { side: TInfiniteScrollSide, done: (status: 'ok' | 'empty' | 'error') => void }) => void", optional: false, descriptionFallback: "Fired when the intersection sentinel enters the viewport. Call done('ok') after fetching, done('empty') when no more data, done('error') on failure." },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InfiniteScroll/infinite-scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_infinite_scroll_emits.example',
            titleFallback: 'Fetching the next page on load',
            code: `<OrigamInfiniteScroll @load="async ({ done }) => {
    const more = await fetchNextPage()
    done(more.length ? 'ok' : 'empty')
}" />`,
            lang: 'vue',
        },
    ],
}
