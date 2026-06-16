/**
 * /components/infinite-scroll-intersect — full documentation data for OrigamInfiniteScrollIntersect.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/InfiniteScroll/infinite-scroll.interface.ts  (props / emits)
 *   - packages/ds/src/components/InfiniteScroll/OrigamInfiniteScrollIntersect.vue (template, defineExpose)
 *   - packages/ds/tokens/component/infinite-scroll.json                          (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const INFINITE_SCROLL_INTERSECT_DOC: IComponentDoc = {
    slug: 'infinite-scroll-intersect',
    name: 'InfiniteScrollIntersect',
    tag: 'origam-infinite-scroll-intersect',
    icon: 'mdi-arrow-collapse-down',
    category: 'Data Display',
    descriptionKey: 'components.catalog.infinite_scroll_intersect.description',
    descriptionFallback: 'Low-level sentinel element used by InfiniteScroll to detect when the scroll boundary enters the viewport via IntersectionObserver.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-infinite-scroll--design',
    docUrl: 'http://localhost:4000/components/InfiniteScroll/OrigamInfiniteScroll',

    parentSlug: 'infinite-scroll',

    family: [
        {
            slug: 'infinite-scroll',
            name: 'InfiniteScroll',
            descriptionKey: 'components.catalog.infinite_scroll.description',
            descriptionFallback: 'Scroll container that triggers a load callback when the sentinel enters the viewport.'
        }
    ],

    props: [
        {
            name: 'side',
            type: { label: 'TInfiniteScrollSide', slug: 'infinite-scroll-side', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.infinite_scroll_intersect.props.side.description',
            descriptionFallback: 'Identifies whether this sentinel monitors the top or bottom boundary. Passed back verbatim in the intersect emit payload.'
        },
        {
            name: 'rootRef',
            type: { label: 'HTMLElement', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.infinite_scroll_intersect.props.root_ref.description',
            descriptionFallback: 'Reference to the scroll container used as the IntersectionObserver root. Required.'
        },
        {
            name: 'margin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.infinite_scroll_intersect.props.margin.description',
            descriptionFallback: 'CSS rootMargin passed to IntersectionObserver. Allows early or late triggering relative to the viewport edge.'
        }
    ],

    emits: [
        {
            event: 'intersect',
            payload: { label: '{ side: TInfiniteScrollSide, isIntersecting: boolean }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.infinite_scroll_intersect.emits.intersect.description',
            descriptionFallback: 'Fired each time the sentinel\'s IntersectionObserver entry changes. Carries the side and the current isIntersecting state.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.infinite_scroll_intersect.examples.basic.title',
            titleFallback: 'Manual sentinel usage',
            lang: 'vue',
            code: `<template>
  <!-- Prefer <origam-infinite-scroll> for the common use-case.
       Use this low-level sentinel only when you need custom scroll logic. -->
  <div ref="scrollRoot" style="overflow: auto; height: 400px;">
    <div v-for="item in items" :key="item.id">{{ item.label }}</div>

    <origam-infinite-scroll-intersect
      side="bottom"
      :root-ref="scrollRoot"
      margin="0px 0px 200px 0px"
      @intersect="onIntersect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scrollRoot = ref<HTMLElement>()
const items = ref([{ id: 1, label: 'Item 1' }])

function onIntersect({ side, isIntersecting }: { side: string; isIntersecting: boolean }) {
  if (isIntersecting) loadMore()
}

function loadMore() {
  // fetch next page
}
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-infinite-scroll-intersect',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamInfiniteScrollIntersect',
        svgDesc: 'Schematic of the InfiniteScrollIntersect sentinel element with 1 numbered part.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="644" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="350" y="84" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">height: 1px (invisible sentinel)</text>
  <circle cx="36" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <line x1="46" y1="44" x2="88" y2="28" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="92" y="28" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-infinite-scroll-intersect</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-infinite-scroll-intersect&gt;</code> — a single invisible sentinel <code>&lt;div&gt;</code> observed by an IntersectionObserver.`,
        legend: [
            {
                num: 1,
                cls: '.origam-infinite-scroll-intersect',
                descriptionKey: 'components.infinite_scroll_intersect.anatomy.root',
                descriptionFallback: 'Root element. A minimal <code>&lt;div&gt;</code> containing a non-breaking space (<code>&amp;nbsp;</code>) to ensure the browser paints it. Observed by <code>useIntersectionObserver</code> and fires the <code>intersect</code> emit on visibility change.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-infinite-scroll---loader-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.infinite_scroll_intersect.css_vars.loader_color',
            descriptionFallback: 'Color of the loading spinner in the parent InfiniteScroll loader slot.'
        },
        {
            name: '--origam-infinite-scroll---loader-gap',
            defaultValue: '{space.3}',
            descriptionKey: 'components.infinite_scroll_intersect.css_vars.loader_gap',
            descriptionFallback: 'Gap between the loader and adjacent elements in the side zone.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.infinite_scroll_intersect.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.infinite_scroll_intersect.a11y.invisible_note',
                noteFallback: 'The sentinel is a non-interactive, invisible element with no ARIA role. Screen readers ignore it. Announce newly loaded content via a live region on the parent component.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/infinite-scroll.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'infinite-scroll.loader.color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.infinite_scroll_intersect.tokens.loader_color',
                descriptionFallback: 'Color passed to the OrigamProgress spinner in the loading slot.'
            },
            {
                tokenPath: 'infinite-scroll.loader.gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.infinite_scroll_intersect.tokens.loader_gap',
                descriptionFallback: 'Gap between loader and adjacent elements within the side zone.'
            },
            {
                tokenPath: 'infinite-scroll.empty.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.infinite_scroll_intersect.tokens.empty_color',
                descriptionFallback: 'Text color for the empty-state message shown when no more items are available.'
            }
        ]
    } satisfies IComponentTokens
}
