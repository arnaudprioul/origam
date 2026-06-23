import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_DELAY_DOC: IComposableDoc = {
    slug: 'use-delay',
    name: 'useDelay',
    domain: 'Commons',
    icon: 'mdi-timer-outline',
    descriptionKey: '',
    descriptionFallback: 'Manages open/close delay timing for overlay components. Reads openDelay and closeDelay from IDelayProps and exposes runOpenDelay / runCloseDelay helpers that debounce state transitions. Each new call cancels any in-flight delay, preventing race conditions when hover enters and leaves quickly.',
    signature: `function useDelay(
  props: IDelayProps,
  cb?: (value: boolean) => void
): {
  clearDelay: () => void
  runOpenDelay: () => Promise<unknown>
  runCloseDelay: () => Promise<unknown>
}`,
    params: [
        {
            name: 'props',
            type: 'IDelayProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props object containing openDelay and closeDelay (number | string). Both are optional; missing values default to 0 (no delay).',
        },
        {
            name: 'cb',
            type: '(value: boolean) => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional callback invoked with true when the open delay fires, false when the close delay fires. Use this to drive a reactive open state instead of awaiting the promise.',
        },
    ],
    returns: [
        {
            name: 'clearDelay',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Cancel the currently scheduled delay without triggering the callback.',
        },
        {
            name: 'runOpenDelay',
            type: '() => Promise<unknown>',
            descriptionKey: '',
            descriptionFallback: 'Start the open delay. Cancels any previously scheduled delay. Resolves with true after props.openDelay ms and fires cb(true).',
        },
        {
            name: 'runCloseDelay',
            type: '() => Promise<unknown>',
            descriptionKey: '',
            descriptionFallback: 'Start the close delay. Cancels any previously scheduled delay. Resolves with false after props.closeDelay ms and fires cb(false).',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Tooltip with open/close delay',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useDelay } from 'origam'

const isOpen = ref(false)

const { runOpenDelay, runCloseDelay } = useDelay(
  { openDelay: 300, closeDelay: 100 },
  (value) => { isOpen.value = value }
)
</script>

<template>
  <span
    @mouseenter="runOpenDelay"
    @mouseleave="runCloseDelay"
  >
    Hover me
  </span>
  <div v-if="isOpen">Tooltip content</div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Await the delay promise',
            code: `<script setup lang="ts">
import { useDelay } from 'origam'

const { runOpenDelay } = useDelay({ openDelay: 500 })

async function onHover() {
  // Wait 500 ms before doing something
  await runOpenDelay()
  console.log('Delay elapsed')
}
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-hover', 'use-activator'],
    consumedInterfaces: ['IDelayProps'],
}
