import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_CHART_ZOOM_DOC: IComposableDoc = {
    slug: 'use-chart-zoom',
    name: 'useChartZoom',
    domain: 'Chart',
    icon: 'mdi-magnify-plus-outline',
    descriptionKey: '',
    descriptionFallback: 'Manages interactive zoom and pan state for OrigamChartCartesian. The zoom window is expressed as a closed [zoomStart, zoomEnd] range of category indices. Provides scroll-wheel zoom, drag-to-select zoom, and programmatic pan, all with clamping invariants.',
    signature: `function useChartZoom(options: { dataLength: () => number }): {
  zoomStart: Ref<number>
  zoomEnd: ComputedRef<number>
  zoomEndRaw: Ref<number>
  isDragging: Ref<boolean>
  dragStartPx: Ref<number | null>
  dragEndPx: Ref<number | null>
  isZoomed: ComputedRef<boolean>
  zoomTo: (start: number, end: number) => void
  zoomReset: () => void
  zoomBy: (deltaFraction: number, anchorFraction: number) => void
  panBy: (deltaCategories: number) => void
  pxToCategoryIndex: (svgX: number, plotX0: number, plotX1: number) => number
  categoryIndexToPx: (categoryIndex: number, plotX0: number, plotX1: number) => number
  WHEEL_ZOOM_STEP: number
}`,
    params: [
        {
            name: 'options.dataLength',
            type: '() => number',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive getter returning the total number of categories or data points. Must always return a value >= 1.',
        },
    ],
    returns: [
        {
            name: 'zoomStart',
            type: 'Ref<number>',
            descriptionKey: '',
            descriptionFallback: 'Reactive start index of the current zoom window (category index, >= 0).',
        },
        {
            name: 'zoomEnd',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Clamped end index of the current zoom window. Always <= dataLength - 1.',
        },
        {
            name: 'zoomEndRaw',
            type: 'Ref<number>',
            descriptionKey: '',
            descriptionFallback: 'Raw (unclamped) end index ref. Infinity when no zoom is active.',
        },
        {
            name: 'isDragging',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while the user is performing a drag-to-select zoom gesture.',
        },
        {
            name: 'dragStartPx',
            type: 'Ref<number | null>',
            descriptionKey: '',
            descriptionFallback: 'SVG X pixel where the current drag started. Null when not dragging.',
        },
        {
            name: 'dragEndPx',
            type: 'Ref<number | null>',
            descriptionKey: '',
            descriptionFallback: 'SVG X pixel at the current drag cursor position. Null when not dragging.',
        },
        {
            name: 'isZoomed',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the window is narrower than the full data range.',
        },
        {
            name: 'zoomTo',
            type: '(start: number, end: number) => void',
            descriptionKey: '',
            descriptionFallback: 'Zoom to an explicit [start, end] category-index range, with clamping applied.',
        },
        {
            name: 'zoomReset',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Restore the full data range (sets zoomStart = 0, zoomEnd = Infinity).',
        },
        {
            name: 'zoomBy',
            type: '(deltaFraction: number, anchorFraction: number) => void',
            descriptionKey: '',
            descriptionFallback: 'Zoom in or out by a fraction of the current visible window, anchored at a fractional position (0 = left edge, 1 = right edge). Positive delta zooms in.',
        },
        {
            name: 'panBy',
            type: '(deltaCategories: number) => void',
            descriptionKey: '',
            descriptionFallback: 'Shift the visible window by N categories while preserving the window size.',
        },
        {
            name: 'pxToCategoryIndex',
            type: '(svgX: number, plotX0: number, plotX1: number) => number',
            descriptionKey: '',
            descriptionFallback: 'Convert an SVG X pixel offset to a fractional category index within the current zoom window.',
        },
        {
            name: 'categoryIndexToPx',
            type: '(categoryIndex: number, plotX0: number, plotX1: number) => number',
            descriptionKey: '',
            descriptionFallback: 'Convert a category index to an SVG X pixel offset. Used to position the drag-selection overlay.',
        },
        {
            name: 'WHEEL_ZOOM_STEP',
            type: 'number',
            descriptionKey: '',
            descriptionFallback: 'Scroll-wheel zoom speed constant (0.15 = ~15 % per notch). Exposed for consumers that need to replicate the feel in custom event handlers.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Basic scroll-wheel zoom',
            code: `<script setup lang="ts">
import { useChartZoom } from 'origam'

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const {
  zoomStart,
  zoomEnd,
  isZoomed,
  zoomReset,
  zoomBy,
  panBy,
  WHEEL_ZOOM_STEP
} = useChartZoom({ dataLength: () => categories.length })

function onWheel(event: WheelEvent) {
  event.preventDefault()
  const delta = event.deltaY > 0 ? WHEEL_ZOOM_STEP : -WHEEL_ZOOM_STEP
  zoomBy(delta, 0.5)
}
</script>

<template>
  <div @wheel.prevent="onWheel">
    <span>Showing {{ zoomStart }} – {{ zoomEnd }}</span>
    <button v-if="isZoomed" @click="zoomReset">Reset zoom</button>
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Programmatic pan',
            code: `<script setup lang="ts">
import { useChartZoom } from 'origam'

const { panBy, zoomTo } = useChartZoom({ dataLength: () => 12 })

// Zoom in on months 2–5 then pan right by 1
zoomTo(2, 5)
panBy(1) // now shows [3, 6]
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-chart', 'use-chart-gauge'],
}
