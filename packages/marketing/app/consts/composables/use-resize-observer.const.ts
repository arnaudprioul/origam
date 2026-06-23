import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_RESIZE_OBSERVER_DOC: IComposableDoc = {
    slug: 'use-resize-observer',
    name: 'useResizeObserver',
    domain: 'Commons',
    icon: 'mdi-resize',
    descriptionKey: '',
    descriptionFallback: 'Wraps the native ResizeObserver API with a reactive template ref. Returns a resizeRef to attach to any element and a readonly contentRect that updates on every resize. Automatically disconnects the observer on component unmount. Supports both content-box (default) and border-box measurement.',
    signature: `function useResizeObserver(
  callback?: ResizeObserverCallback,
  box?: 'content' | 'border'
): IResizeState

// IResizeState shape:
// { resizeRef: Ref<HTMLElement | null | undefined>; contentRect: Readonly<Ref<DOMRectReadOnly | undefined>> }`,
    params: [
        {
            name: 'callback',
            type: 'ResizeObserverCallback',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional raw ResizeObserver callback. Receives the full entries array and the observer instance. Called on every resize event before contentRect is updated.',
        },
        {
            name: 'box',
            type: "'content' | 'border'",
            required: false,
            defaultValue: "'content'",
            descriptionKey: '',
            descriptionFallback: 'Which box model dimension to capture. "content" uses entries[0].contentRect; "border" calls getBoundingClientRect() on the element for border-box dimensions including padding and border.',
        },
    ],
    returns: [
        {
            name: 'resizeRef',
            type: 'Ref<HTMLElement | null | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Assign this ref to the element you want to observe: <div :ref="resizeRef">. Watching the ref automatically connects/disconnects the observer.',
        },
        {
            name: 'contentRect',
            type: 'Readonly<Ref<DOMRectReadOnly | undefined>>',
            descriptionKey: '',
            descriptionFallback: 'Reactive dimensions of the observed element. undefined until the first resize event fires. Provides width, height, top, left, right, bottom.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Track element dimensions reactively',
            code: `<script setup lang="ts">
import { computed } from 'vue'
import { useResizeObserver } from 'origam'

const { resizeRef, contentRect } = useResizeObserver()

const isWide = computed(() => (contentRect.value?.width ?? 0) > 600)
</script>

<template>
  <div :ref="resizeRef" :class="{ 'layout--wide': isWide }">
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom callback + border-box',
            code: `<script setup lang="ts">
import { useResizeObserver } from 'origam'

const { resizeRef, contentRect } = useResizeObserver(
  (entries) => console.log('resized', entries[0].borderBoxSize),
  'border'
)
</script>

<template>
  <section :ref="resizeRef">
    Width incl. border: {{ contentRect?.width }}px
  </section>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-drag-resizer', 'use-display', 'use-event-listener'],
    consumedInterfaces: ['IResizeState'],
}
