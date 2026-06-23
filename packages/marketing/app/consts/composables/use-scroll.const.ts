import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SCROLL_DOC: IComposableDoc = {
    slug: 'use-scroll',
    name: 'useScroll',
    domain: 'Commons',
    icon: 'mdi-gesture-swipe-vertical',
    descriptionKey: '',
    descriptionFallback: 'Tracks scroll position and direction on a configurable target element (or window). Returns reactive flags for scroll direction, activity state, threshold crossing, and a scroll ratio useful for progressive UI transitions. Also exposes useScrollStrategies (apply named scroll behaviours like block, close, or reposition to floating overlays) and useScrolling (keyboard + scroll helpers for virtualised list + search-field combos).',
    signature: `function useScroll(
  props: IScrollProps,
  args?: IScrollArguments
): {
  scrollThreshold: ComputedRef<number>
  currentScroll: ShallowRef<number>
  currentThreshold: ShallowRef<number>
  isScrollActive: ShallowRef<boolean>
  scrollRatio: ComputedRef<number>
  isScrollingUp: ShallowRef<boolean>
  savedScroll: ShallowRef<number>
}

function useScrollStrategies(
  props: IScrollStrategyProps,
  data: IScrollStrategyData
): void

function useScrolling(
  listRef: Ref<TOrigamList | undefined>,
  textFieldRef: Ref<TOrigamTextField | undefined>
): {
  onListScroll: () => void
  onListKeydown: (e: KeyboardEvent) => Promise<void>
}`,
    params: [
        {
            name: 'props',
            type: 'IScrollProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props containing `scrollTarget` (CSS selector string for a custom scroll container, defaults to window) and `scrollThreshold` (pixel distance that must be crossed before scroll events activate).',
        },
        {
            name: 'args',
            type: 'IScrollArguments',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional arguments bag. `canScroll: Ref<boolean>` — when provided, scroll events are ignored while canScroll is false (used by layouts that conditionally enable scrolling).',
        },
    ],
    returns: [
        {
            name: 'currentScroll',
            type: 'ShallowRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Current scroll position in pixels (scrollTop or pageYOffset).',
        },
        {
            name: 'isScrollingUp',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the most recent scroll event moved upward.',
        },
        {
            name: 'isScrollActive',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while scrolling is actively happening. Used by app bars to hide/show.',
        },
        {
            name: 'scrollRatio',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Normalised ratio: (scrollThreshold - currentScroll) / scrollThreshold, clamped to [0, 1]. 1 = at top, 0 = threshold crossed.',
        },
        {
            name: 'scrollThreshold',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'The threshold prop coerced to a number.',
        },
        {
            name: 'currentThreshold',
            type: 'ShallowRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Absolute distance between currentScroll and scrollThreshold.',
        },
        {
            name: 'savedScroll',
            type: 'ShallowRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Scroll position saved at the last direction reversal. Used by app-bar hide strategies.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Auto-hide app bar on scroll',
            code: `<template>
  <origam-app-bar scroll-behavior="hide" :scroll-threshold="64">
    My App
  </origam-app-bar>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom scroll ratio indicator',
            code: `<script setup lang="ts">
import { useScroll } from 'origam'

const { scrollRatio, currentScroll } = useScroll({ scrollThreshold: 200 })
</script>

<template>
  <div class="progress-bar" :style="{ width: (1 - scrollRatio) * 100 + '%' }" />
  <p>Scrolled: {{ currentScroll }}px</p>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Scroll strategy on a floating overlay',
            code: `<!-- OrigamMenu uses useScrollStrategies internally -->
<origam-menu scroll-strategy="close">
  <template #activator="{ props }">
    <origam-btn v-bind="props">Open menu</origam-btn>
  </template>
  <origam-list>
    <origam-list-item title="Item 1" />
    <origam-list-item title="Item 2" />
  </origam-list>
</origam-menu>`,
            lang: 'vue',
        },
    ],
    related: ['use-go-to', 'use-event-listener', 'use-display'],
    consumedInterfaces: ['IScrollProps', 'IScrollArguments', 'IScrollStrategyProps', 'IScrollStrategyData'],
}
