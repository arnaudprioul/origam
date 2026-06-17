import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_THROTTLE_DOC: IComposableDoc = {
    slug: 'use-throttle',
    name: 'useThrottleFn',
    domain: 'Commons',
    icon: 'mdi-timer-outline',
    descriptionKey: '',
    descriptionFallback: 'Wraps a function so it executes at most once per wait milliseconds. The first call fires immediately; subsequent calls within the wait window are silently discarded. After the window expires the next call fires again immediately. Designed for scroll, resize, and pointer-move handlers where firing on every frame would be prohibitively expensive.',
    signature: `function useThrottleFn<T extends any[], R = void>(
  fn: (...args: T) => R,
  wait: number
): (...args: T) => void`,
    params: [
        {
            name: 'fn',
            type: '(...args: T) => R',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The function to throttle. Called immediately on the first invocation within each window. The return value is discarded — the wrapper always returns void.',
        },
        {
            name: 'wait',
            type: 'number',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Throttle window in milliseconds. No call will execute within wait ms of the previous execution.',
        },
    ],
    returns: [
        {
            name: '(...args: T) => void',
            type: '(...args: T) => void',
            descriptionKey: '',
            descriptionFallback: 'The throttled wrapper function. Call it as you would the original fn — excess calls within the wait window are dropped without side effects.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Throttle a scroll handler to 16 ms',
            code: `<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useThrottleFn } from 'origam'

function handleScroll() {
  // expensive layout read
  console.log(window.scrollY)
}

const throttled = useThrottleFn(handleScroll, 16)

onMounted(() => window.addEventListener('scroll', throttled, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', throttled))
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Throttle a search-as-you-type input',
            code: `<script setup lang="ts">
import { useThrottleFn } from 'origam'

const search = useThrottleFn((query: string) => {
  // fire API call at most once per 300 ms
  fetchResults(query)
}, 300)
</script>

<template>
  <origam-text-field @input="(e) => search(e.target.value)" />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-event-listener'],
    consumedInterfaces: [],
    noteFallback: 'useThrottleFn is a leading-edge throttle: the function fires on the FIRST call, then blocks subsequent calls for wait ms. This keeps UI responses instantaneous for the first interaction while capping the overall call rate.',
}
