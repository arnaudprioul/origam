import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_MASONRY_DOC: IComposableDoc = {
    slug: 'use-masonry',
    name: 'useMasonry',
    domain: 'Masonry',
    icon: 'mdi-view-dashboard-variant-outline',
    descriptionKey: '',
    descriptionFallback: 'JavaScript fallback layout engine for OrigamMasonry when CSS grid-template-rows: masonry is unavailable. Implements a bucket-fill algorithm that places items into the shortest column, tracks container and item resize events via ResizeObserver, and exposes reactive per-item coordinates for inline-style assignment.',
    signature: `function useMasonry(options: IUseMasonryOptions): {
  containerRef: Ref<HTMLElement | null>
  setItem: (index: number, el: HTMLElement | null) => void
  layout: Ref<IMasonryLayoutResult>
  relayout: () => void
}`,
    params: [
        {
            name: 'columnsRef',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Default column count. Used when no breakpoint in breakpointsRef matches the container width.',
        },
        {
            name: 'gapRef',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Gap between items in pixels (both axes). The component resolves token/string gaps to a number before passing it here.',
        },
        {
            name: 'breakpointsRef',
            type: 'Ref<TMasonryColumnBreakpoints | undefined>',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional map of container-width breakpoints to column counts (e.g. { 600: 2, 900: 3 }). The largest key that is less than or equal to the container width wins.',
        },
        {
            name: 'alignRef',
            type: "Ref<TMasonryAlign>",
            required: false,
            defaultValue: "'top'",
            descriptionKey: '',
            descriptionFallback: "Vertical alignment of items within a column. 'top' packs items to the top; 'center' distributes unused space above and below each column's content.",
        },
    ],
    returns: [
        {
            name: 'containerRef',
            type: 'Ref<HTMLElement | null>',
            descriptionKey: '',
            descriptionFallback: 'Bind this ref to the masonry container element. The composable installs a ResizeObserver on it to re-measure on width changes.',
        },
        {
            name: 'setItem',
            type: '(index: number, el: HTMLElement | null) => void',
            descriptionKey: '',
            descriptionFallback: 'Register a child element by its render index. Call via :ref="(el) => setItem(idx, el)" on each masonry child. Idempotent — safe to call on updates.',
        },
        {
            name: 'layout',
            type: 'Ref<IMasonryLayoutResult>',
            descriptionKey: '',
            descriptionFallback: 'Reactive layout result containing containerHeight and an items array of per-item { left, top, width, height, column } descriptors. Apply as inline styles on each child.',
        },
        {
            name: 'relayout',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Manual re-measure trigger. Call after async content changes (images loaded, fonts ready) that do not fire a ResizeObserver event.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Basic masonry grid',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useMasonry } from 'origam'

const items = ref([/* ... */])
const { containerRef, setItem, layout } = useMasonry({
  columnsRef: ref(3),
  gapRef: ref(16)
})
</script>

<template>
  <div
    :ref="containerRef"
    :style="{ position: 'relative', height: layout.containerHeight + 'px' }"
  >
    <div
      v-for="(item, i) in items"
      :key="item.id"
      :ref="(el) => setItem(i, el as HTMLElement)"
      :style="{
        position: 'absolute',
        left: layout.items[i]?.left + 'px',
        top: layout.items[i]?.top + 'px',
        width: layout.items[i]?.width + 'px'
      }"
    >
      {{ item.content }}
    </div>
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Responsive breakpoints',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useMasonry } from 'origam'

const { containerRef, setItem, layout, relayout } = useMasonry({
  columnsRef: ref(1),
  gapRef: ref(12),
  breakpointsRef: ref({ 600: 2, 900: 3, 1200: 4 }),
  alignRef: ref('center')
})
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-resize-observer', 'use-css-support'],
    consumedInterfaces: ['IUseMasonryOptions', 'IMasonryLayoutResult', 'IMasonryItemRect'],
    noteFallback: 'useMasonry is the JS fallback path. OrigamMasonry first checks CSS.supports("grid-template-rows: masonry") and only activates this composable when that query returns false. The bucketFill and pickColumnsForWidth utilities are exported separately for unit testing.',
}
