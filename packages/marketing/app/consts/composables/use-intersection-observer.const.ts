import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_INTERSECTION_OBSERVER_DOC: IComposableDoc = {
    slug: 'use-intersection-observer',
    name: 'useIntersectionObserver',
    domain: 'Commons',
    icon: 'mdi-eye-check-outline',
    descriptionKey: '',
    descriptionFallback: 'Creates a reactive IntersectionObserver that tracks whether a bound element is intersecting the viewport. Returns a template ref to attach to the target element and a reactive boolean that flips when the element enters or leaves the visible area.',
    signature: `function useIntersectionObserver(
  callback?: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): {
  intersectionRef: Ref<HTMLElement | undefined>
  isIntersecting: ShallowRef<boolean>
}`,
    params: [
        {
            name: 'callback',
            type: 'IntersectionObserverCallback',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional raw IntersectionObserver callback. Called with the full entries array before isIntersecting is updated.',
        },
        {
            name: 'options',
            type: 'IntersectionObserverInit',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Standard IntersectionObserver init options (root, rootMargin, threshold).',
        },
    ],
    returns: [
        {
            name: 'intersectionRef',
            type: 'Ref<HTMLElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Bind this template ref to the element you want to observe. The observer is automatically attached and re-attached when the ref changes.',
        },
        {
            name: 'isIntersecting',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Reactive flag that is true when at least one entry in the latest callback batch is intersecting.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Lazy-reveal on scroll',
            code: `<script setup lang="ts">
import { useIntersectionObserver } from 'origam'

const { intersectionRef, isIntersecting } = useIntersectionObserver()
</script>

<template>
  <div :ref="intersectionRef" :class="{ visible: isIntersecting }">
    Content revealed when entering viewport
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom threshold with callback',
            code: `<script setup lang="ts">
import { useIntersectionObserver } from 'origam'

const { intersectionRef, isIntersecting } = useIntersectionObserver(
  (entries) => {
    console.log('intersection entries', entries)
  },
  { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
)
</script>

<template>
  <section :ref="intersectionRef">
    50% visible triggers the callback
  </section>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-lazy', 'use-resize-observer'],
    consumedInterfaces: [],
}
