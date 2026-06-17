import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_EVENT_LISTENER_DOC: IComposableDoc = {
    slug: 'use-event-listener',
    name: 'useEventListener',
    domain: 'Commons',
    icon: 'mdi-ear-hearing',
    descriptionKey: '',
    descriptionFallback: 'Registers one or more DOM event listeners on a target element (or window by default) and automatically removes them when the Vue scope is disposed. Supports reactive targets and options via watchers.',
    signature: `// Overload 1 — explicit target
function useEventListener(
  target: MaybeRef<EventTarget | null | undefined>,
  events: string | string[],
  listeners: EventListener | EventListener[],
  options?: AddEventListenerOptions
): () => void

// Overload 2 — window implicit target
function useEventListener(
  events: string | string[],
  listeners: EventListener | EventListener[],
  options?: AddEventListenerOptions
): () => void`,
    params: [
        {
            name: 'target',
            type: 'MaybeRef<EventTarget | null | undefined>',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'The element to listen on. Omit to default to window. Accepts a plain element, a ref, or a template ref.',
        },
        {
            name: 'events',
            type: 'string | string[]',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'One event name or an array of event names to register (e.g. "click" or ["mousedown", "touchstart"]).',
        },
        {
            name: 'listeners',
            type: 'EventListener | EventListener[]',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'One handler or an array of handlers. Each listener is registered against every event name via a cross product.',
        },
        {
            name: 'options',
            type: 'AddEventListenerOptions',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Standard addEventListener options (capture, passive, once). Reactive — changing this ref re-registers the listeners.',
        },
    ],
    returns: [
        {
            name: 'stop',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Calling stop() immediately removes all registered listeners and stops the internal watcher. Called automatically on scope dispose.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Listen on window',
            code: `<script setup lang="ts">
import { useEventListener } from 'origam'

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') console.log('Escape pressed')
})
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Listen on a specific element',
            code: `<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useEventListener } from 'origam'

const btn = useTemplateRef<HTMLElement>('btn')

useEventListener(btn, 'click', () => {
  console.log('button clicked')
})
</script>

<template>
  <button ref="btn">Click me</button>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-drag-resizer', 'use-hover'],
    consumedInterfaces: [],
}
