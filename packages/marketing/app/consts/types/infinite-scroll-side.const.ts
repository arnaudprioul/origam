import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const INFINITE_SCROLL_SIDE_TYPE_DOC: ITypeDoc = {
    slug: 'infinite-scroll-side',
    name: 'TInfiniteScrollSide',
    kind: 'type',
    category: 'Navigation',
    descriptionKey: 'types.catalog.infinite_scroll_side.description',
    descriptionFallback: 'Which end(s) of the scroll container trigger the load event in OrigamInfiniteScroll — start, end, or both simultaneously.',
    definition: `export type TInfiniteScrollSide = \`\${INFINITE_SCROLL_SIDE}\`

// Where INFINITE_SCROLL_SIDE is:
export enum INFINITE_SCROLL_SIDE {
    START = 'start',
    END   = 'end',
    BOTH  = 'both'
}`,
    values: [
        { value: 'start', descriptionKey: 'types.detail.infinite_scroll_side.start', descriptionFallback: 'The load sentinel is placed at the top/left of the scroll container — useful for prepend-loading (e.g. chat history).' },
        { value: 'end', descriptionKey: 'types.detail.infinite_scroll_side.end', descriptionFallback: 'The load sentinel is placed at the bottom/right — standard "load more" pagination (default).' },
        { value: 'both', descriptionKey: 'types.detail.infinite_scroll_side.both', descriptionFallback: 'Sentinels at both ends — bidirectional scrolling. The load event payload includes which side triggered the load.' },
    ],
    usedBy: [
        { slug: 'infinite-scroll', name: 'InfiniteScroll', propName: 'side' },
    ],
    sourceFile: 'packages/ds/src/types/InfiniteScroll/infinite-scroll.type.ts',
    examples: [
        {
            titleKey: 'types.detail.infinite_scroll_side.example_end',
            titleFallback: 'Standard bottom-triggered infinite scroll',
            code: `<origam-infinite-scroll side="end" @load="onLoad">
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</origam-infinite-scroll>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.infinite_scroll_side.example_both',
            titleFallback: 'Bidirectional scroll (chat history)',
            code: `<origam-infinite-scroll
  side="both"
  @load="({ side, done }) => loadPage(side, done)"
>
  <div v-for="msg in messages" :key="msg.id">{{ msg.text }}</div>
</origam-infinite-scroll>`,
            lang: 'html',
        },
    ],
}
