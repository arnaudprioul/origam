import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_HOLD_DOC: IComposableDoc = {
    slug: 'use-hold',
    name: 'useHold',
    domain: 'NumberField',
    icon: 'mdi-timer-play-outline',
    descriptionKey: '',
    descriptionFallback: 'Implements a press-and-hold repeat pattern for increment/decrement controls. Fires the toggle callback once immediately on press, then starts an auto-repeat loop after an initial delay. Used internally by OrigamNumberField stepper buttons.',
    signature: `function useHold(
  { toggleUpDown }: { toggleUpDown: (increment: boolean) => void },
  holdRepeat?: number,
  holdDelay?: number
): {
  holdStart: (value: 'up' | 'down') => void
  holdStop: () => void
}`,
    params: [
        {
            name: 'toggleUpDown',
            type: '(increment: boolean) => void',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Callback invoked on each tick. Receives true for increment (up), false for decrement (down).',
        },
        {
            name: 'holdRepeat',
            type: 'number',
            required: false,
            defaultValue: '50',
            descriptionKey: '',
            descriptionFallback: 'Repeat interval in milliseconds once the hold is established. Defaults to 50ms.',
        },
        {
            name: 'holdDelay',
            type: 'number',
            required: false,
            defaultValue: '500',
            descriptionKey: '',
            descriptionFallback: 'Initial delay in milliseconds before the repeat loop starts. Defaults to 500ms.',
        },
    ],
    returns: [
        {
            name: 'holdStart',
            type: "(value: 'up' | 'down') => void",
            descriptionKey: '',
            descriptionFallback: "Call on mousedown/touchstart. Pass 'up' to increment or 'down' to decrement. Fires once immediately, then begins the repeat loop after holdDelay.",
        },
        {
            name: 'holdStop',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Call on mouseup/touchend/mouseleave to clear the timeout and interval. Also called automatically on scope dispose.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Press-and-hold stepper',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useHold } from 'origam'

const count = ref(0)

const { holdStart, holdStop } = useHold({
  toggleUpDown: (increment) => {
    count.value += increment ? 1 : -1
  }
})
</script>

<template>
  <div>
    <button
      @mousedown="holdStart('down')"
      @mouseup="holdStop"
      @mouseleave="holdStop"
    >−</button>
    <span>{{ count }}</span>
    <button
      @mousedown="holdStart('up')"
      @mouseup="holdStop"
      @mouseleave="holdStop"
    >+</button>
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-number-field'],
    consumedInterfaces: [],
    noteFallback: 'Timers are cleared automatically via onScopeDispose — no manual cleanup needed in setup(). holdStop is still required on mouseup/touchend to cancel an in-progress hold.',
}
