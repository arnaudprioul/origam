/**
 * /components/infinite-scroll — full documentation data for OrigamInfiniteScroll.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/InfiniteScroll/infinite-scroll.interface.ts
 * cross-checked against packages/ds/src/components/InfiniteScroll/OrigamInfiniteScroll.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const INFINITE_SCROLL_DOC: IComponentDoc = {
    slug: 'infinite-scroll',
    name: 'InfiniteScroll',
    tag: 'origam-infinite-scroll',
    icon: 'mdi-infinity',
    category: 'Data & List',
    descriptionKey: 'components.catalog.infinite_scroll.description',
    descriptionFallback: 'Sentinel-based infinite scroll that fires a load event when the user reaches the start or end of a scrollable area.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-infinite-scroll--design',
    docUrl: 'http://localhost:4000/components/InfiniteScroll/OrigamInfiniteScroll',

    family: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'side',
            type: { label: "'start' | 'end' | 'both'", slug: '', kind: 'primitive' },
            defaultValue: "'end'",
            descriptionKey: 'components.infinite_scroll.props.side.description',
            descriptionFallback: 'Which edge(s) of the scroll area to observe. "both" watches top and bottom simultaneously.'
        },
        {
            name: 'mode',
            type: { label: "'intersect' | 'manual'", slug: '', kind: 'primitive' },
            defaultValue: "'intersect'",
            descriptionKey: 'components.infinite_scroll.props.mode.description',
            descriptionFallback: 'How the next page is triggered. "intersect" fires automatically when the sentinel enters the viewport; "manual" shows a Load More button.'
        },
        {
            name: 'loadMoreText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Load more'",
            descriptionKey: 'components.infinite_scroll.props.load_more_text.description',
            descriptionFallback: 'Label for the Load More button shown in manual mode.'
        },
        {
            name: 'emptyText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'No more items'",
            descriptionKey: 'components.infinite_scroll.props.empty_text.description',
            descriptionFallback: 'Message displayed when the done callback is called with "empty".'
        },
        {
            name: 'margin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.infinite_scroll.props.margin.description',
            descriptionFallback: 'Root margin passed to the IntersectionObserver. Expands the detection zone, e.g. "0px 0px 200px 0px" to load ahead.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.infinite_scroll.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root of the scroll container.'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.infinite_scroll.props.height.description',
            descriptionFallback: 'Explicit height. Set this to make the component itself the scroll container.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.infinite_scroll.props.max_height.description',
            descriptionFallback: 'Maximum height before the scroll container clips and scrolls.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.infinite_scroll.props.color.description',
            descriptionFallback: 'Color applied to the progress spinner and the Load More button.'
        },
        // ── IDirectionProps ────────────────────────────────────────────
        {
            name: 'direction',
            type: { label: "'horizontal' | 'vertical'", slug: '', kind: 'primitive' },
            defaultValue: "'vertical'",
            descriptionKey: 'components.infinite_scroll.props.direction.description',
            descriptionFallback: 'Scroll axis to observe.'
        }
    ],

    emits: [
        {
            event: 'load',
            payload: { label: '{ side: TInfiniteScrollSide, done: (status: "ok" | "empty" | "error") => void }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.infinite_scroll.emits.load.description',
            descriptionFallback: 'Fired when the sentinel enters the viewport (or the user clicks Load More in manual mode). Call done("ok") after appending data, done("empty") when there are no more pages, or done("error") on failure.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.infinite_scroll.slots.default.description',
            descriptionFallback: 'The scrollable list content. Items are appended here as new pages load.'
        },
        {
            slot: 'loading',
            slotProps: '{ side, props }',
            descriptionKey: 'components.infinite_scroll.slots.loading.description',
            descriptionFallback: 'Custom loading indicator shown while a page fetch is in flight. The default renders an OrigamProgress spinner.'
        },
        {
            slot: 'empty',
            slotProps: '{ side, props }',
            descriptionKey: 'components.infinite_scroll.slots.empty.description',
            descriptionFallback: 'Content shown after done("empty") is called. The default renders the emptyText string.'
        },
        {
            slot: 'error',
            slotProps: '{ side, props }',
            descriptionKey: 'components.infinite_scroll.slots.error.description',
            descriptionFallback: 'Content shown after done("error") is called. Use props.onClick to retry.'
        },
        {
            slot: 'loadMore',
            slotProps: '{ side, props }',
            descriptionKey: 'components.infinite_scroll.slots.load_more.description',
            descriptionFallback: 'Custom Load More trigger shown in manual mode. The default renders an OrigamBtn.'
        }
    ],

    examples: [
        {
            titleKey: 'components.infinite_scroll.examples.basic.title',
            titleFallback: 'Automatic infinite scroll',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'

const items = ref(Array.from({ length: 20 }, (_, i) => \`Item \${i + 1}\`))

async function onLoad({ done }: { done: (s: 'ok' | 'empty' | 'error') => void }) {
  const nextPage = await fetchNextPage()
  if (nextPage.length) {
    items.value.push(...nextPage)
    done('ok')
  } else {
    done('empty')
  }
}
</script>
<template>
  <origam-infinite-scroll height="400" @load="onLoad">
    <div v-for="item in items" :key="item">{{ item }}</div>
  </origam-infinite-scroll>
</template>`
        },
        {
            titleKey: 'components.infinite_scroll.examples.manual.title',
            titleFallback: 'Manual load mode',
            lang: 'vue',
            code: `<template>
  <origam-infinite-scroll mode="manual" height="300" @load="onLoad">
    <div v-for="item in items" :key="item">{{ item }}</div>
  </origam-infinite-scroll>
</template>`
        }
    ]
}
