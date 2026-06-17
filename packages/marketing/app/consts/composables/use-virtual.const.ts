import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_VIRTUAL_DOC: IComposableDoc = {
    slug: 'use-virtual',
    name: 'useVirtual',
    domain: 'Commons',
    icon: 'mdi-view-list-outline',
    descriptionKey: '',
    descriptionFallback: 'Virtual-scroll engine for large datasets. Maintains a dynamic window of visible items, computes per-item offsets via a debounced binary-search algorithm, tracks scroll velocity for predictive buffering, and exposes scrollToIndex with optional animated scrolling through useGoTo. SSR-safe — all DOM access is guarded.',
    signature: `function useVirtual<T>(
  props: IVirtualProps,
  items: Ref<readonly T[]>
): {
  containerRef: Ref<HTMLElement | undefined>
  markerRef: Ref<HTMLElement | undefined>
  computedItems: ComputedRef<Array<{ raw: T; index: number }>>
  paddingTop: ShallowRef<number>
  paddingBottom: ShallowRef<number>
  scrollToIndex: (index: number, options?: Partial<IGoToOptions>) => void
  handleScroll: () => void
  handleScrollend: () => void
  handleItemResize: (index: number, height: number) => void
}`,
    params: [
        {
            name: 'props',
            type: 'IVirtualProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reads `itemHeight` (expected row height in px, used to estimate the initial window), `height` (container height as string / number), `scrollDuration` (ms, default 300), `scrollEasing` (easing name, default easeInOutCubic).',
        },
        {
            name: 'items',
            type: 'Ref<readonly T[]>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The full dataset ref. The composable slices this array to produce `computedItems`. Changing the ref triggers an offset recalculation.',
        },
    ],
    returns: [
        {
            name: 'containerRef',
            type: 'Ref<HTMLElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Assign to the scrollable container element. The composable reads `scrollTop` from it and listens to `handleScroll` / `handleScrollend`.',
        },
        {
            name: 'markerRef',
            type: 'Ref<HTMLElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Assign to a zero-height element at the top of the list content area. Its `offsetTop` is used to compute an offset if there is padding or a header above the virtual list.',
        },
        {
            name: 'computedItems',
            type: 'ComputedRef<Array<{ raw: T; index: number }>>',
            descriptionKey: '',
            descriptionFallback: 'The slice of items currently in the render window. Each entry carries the original `raw` item and its absolute `index` in the full list.',
        },
        {
            name: 'paddingTop',
            type: 'ShallowRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Pixel padding to add above the first rendered item to preserve the scroll height.',
        },
        {
            name: 'paddingBottom',
            type: 'ShallowRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Pixel padding to add below the last rendered item to preserve the scroll height.',
        },
        {
            name: 'scrollToIndex',
            type: '(index: number, options?: Partial<IGoToOptions>) => void',
            descriptionKey: '',
            descriptionFallback: 'Programmatically scroll the container to a specific item index. Defers the scroll if the list has not yet measured (first render not complete). Pass `{ duration: 0 }` for instant scroll.',
        },
        {
            name: 'handleScroll',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Bind to the `scroll` event of the container element. Computes scroll velocity and triggers visible-items recalculation.',
        },
        {
            name: 'handleScrollend',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Bind to the `scrollend` event. Resets scroll velocity and recalculates the visible window.',
        },
        {
            name: 'handleItemResize',
            type: '(index: number, height: number) => void',
            descriptionKey: '',
            descriptionFallback: 'Call when a rendered item changes its measured height. Updates the size cache and triggers an offset recalculation. Wire via a ResizeObserver on each rendered row.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Virtual list with 10 000 rows',
            code: `<script setup lang="ts">
import { useVirtual } from 'origam'
import { ref } from 'vue'

const items = ref(Array.from({ length: 10_000 }, (_, i) => ({ id: i, label: \`Item \${i}\` })))

const {
    containerRef,
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    handleScroll,
    handleScrollend,
    handleItemResize,
    scrollToIndex
} = useVirtual({ itemHeight: 48, height: '600px' }, items)
</script>

<template>
  <div
    ref="containerRef"
    style="height: 600px; overflow-y: auto;"
    @scroll="handleScroll"
    @scrollend="handleScrollend"
  >
    <div ref="markerRef" />
    <div :style="{ paddingTop: paddingTop + 'px', paddingBottom: paddingBottom + 'px' }">
      <div
        v-for="item in computedItems"
        :key="item.raw.id"
        style="height: 48px;"
      >
        {{ item.raw.label }}
      </div>
    </div>
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-go-to', 'use-display'],
    consumedInterfaces: ['IVirtualProps', 'IGoToOptions'],
    noteFallback: 'useVirtual is used internally by OrigamList, OrigamSelect, OrigamDataTable, and OrigamAutocomplete. For variable-height rows, call handleItemResize from a ResizeObserver on each rendered item — the composable will update its offset cache and adjust the window accordingly.',
}
