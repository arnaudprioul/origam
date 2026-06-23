import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SNACKBAR_DOC: IComposableDoc = {
    slug: 'use-snackbar',
    name: 'useCountdown',
    domain: 'Snackbar',
    icon: 'mdi-timer-sand',
    descriptionKey: '',
    descriptionFallback: 'Internal countdown timer used by OrigamSnackbar to drive the auto-dismiss progress indicator. Counts down from a given millisecond value using setInterval, ticking at the CSS transition duration of the host element so the progress bar remains visually synchronised. Exposes clear / reset / start controls and a reactive time ref.',
    signature: `function useCountdown(
  milliseconds: number
): {
  time: ShallowRef<number>
  clear: () => void
  reset: () => void
  start: (el?: HTMLElement) => void
}`,
    params: [
        {
            name: 'milliseconds',
            type: 'number',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Total countdown duration in milliseconds. This is the initial value of time and the value it resets to on reset().',
        },
    ],
    returns: [
        {
            name: 'time',
            type: 'ShallowRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Remaining milliseconds. Starts at the initial milliseconds value, decrements on each tick, and bottoms out at 0. Bind to a progress bar width to visualise the countdown.',
        },
        {
            name: 'clear',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Stops the interval without resetting time. Use to pause the countdown (e.g. while the user is hovering the snackbar).',
        },
        {
            name: 'reset',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Clears the interval and resets time to the initial milliseconds value on the next tick. Use when the snackbar content changes and the countdown should restart.',
        },
        {
            name: 'start',
            type: '(el?: HTMLElement) => void',
            descriptionKey: '',
            descriptionFallback: 'Start (or resume) the countdown. Reads the CSS transitionDuration of el to synchronise tick frequency with the progress bar animation. Falls back to 200 ms when no element is provided or no transition is set. Clears any existing interval before starting.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Auto-dismiss snackbar with countdown progress bar',
            code: `<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCountdown } from 'origam'

const progressEl = ref<HTMLElement>()
const DURATION = 5000

const { time, start, clear, reset } = useCountdown(DURATION)

const progressPct = computed(() => (time.value / DURATION) * 100)

onMounted(() => start(progressEl.value))
</script>

<template>
  <div
    class="snackbar"
    @mouseenter="clear"
    @mouseleave="start"
  >
    <slot />
    <div
      ref="progressEl"
      class="snackbar__progress"
      :style="{ width: progressPct + '%' }"
    />
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-snackbar-group'],
    consumedInterfaces: [],
    noteFallback: 'useCountdown is an internal primitive used by OrigamSnackbar. For pushing notifications from application code, use useSnackbarGroup instead. The interval is cleared via onScopeDispose so it never leaks after the component unmounts.',
}
