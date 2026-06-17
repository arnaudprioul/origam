import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ACTIVATOR_DOC: IComposableDoc = {
    slug: 'use-activator',
    name: 'useActivator',
    domain: 'Commons',
    icon: 'mdi-cursor-pointer',
    descriptionKey: '',
    descriptionFallback: 'Wire an activator element (button, link, any DOM node) to an overlay component. Manages click, hover, focus, and context-menu open strategies, delay scheduling, and cursor-position targeting. Used internally by Menu, Tooltip, Dialog, and every component that needs a trigger-controlled overlay.',
    signature: `function useActivator(
  props: IActivatorProps,
  { isActive, isTop }: { isActive: Ref<boolean>; isTop: Ref<boolean> }
): {
  activatorEl: Ref<HTMLElement | undefined>
  activatorRef: Ref<HTMLElement | undefined>
  target: ComputedRef<HTMLElement | [x: number, y: number] | undefined>
  targetEl: ComputedRef<HTMLElement | undefined>
  targetRef: Ref<HTMLElement | undefined>
  activatorEvents: ComputedRef<Partial<Record<string, EventListener>>>
  contentEvents: ComputedRef<Record<string, EventListener>>
  scrimEvents: ComputedRef<Record<string, EventListener>>
}`,
    params: [
        {
            name: 'props',
            type: 'IActivatorProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props controlling how the overlay is triggered. Includes activator selector/element, open-on strategy (click, hover, focus, context-menu), close-on-content-click, delay settings inherited from IDelayProps, and an optional target override.',
        },
        {
            name: 'isActive',
            type: 'Ref<boolean>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive flag representing the open/closed state of the overlay. useActivator reads and writes this ref to toggle the overlay on user interaction.',
        },
        {
            name: 'isTop',
            type: 'Ref<boolean>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive flag set by the overlay stack manager. When true, this overlay is the topmost one; when it becomes false while hover/focus-triggered, the composable auto-closes the overlay.',
        },
    ],
    returns: [
        {
            name: 'activatorEl',
            type: 'Ref<HTMLElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The resolved activator DOM element. Updated on each user interaction event so the overlay can position itself relative to the correct element.',
        },
        {
            name: 'activatorRef',
            type: 'Ref<HTMLElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Template ref for a statically rendered activator child. Assign to the activator element via v-bind to let the composable resolve it automatically on mount.',
        },
        {
            name: 'target',
            type: 'ComputedRef<HTMLElement | [x: number, y: number] | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Resolved positioning target. Returns cursor coordinates when target="cursor" is set, the element bound to targetRef when provided, or falls back to the activatorEl.',
        },
        {
            name: 'targetEl',
            type: 'ComputedRef<HTMLElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Target as a plain HTMLElement (undefined when target is a coordinate pair). Useful for anchor-positioning calculations that require an element.',
        },
        {
            name: 'targetRef',
            type: 'Ref<HTMLElement | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Template ref for an explicit positioning target element, independent from the activator element.',
        },
        {
            name: 'activatorEvents',
            type: 'ComputedRef<Partial<Record<string, EventListener>>>',
            descriptionKey: '',
            descriptionFallback: 'Event listeners to spread on the activator element via v-bind. Only includes listeners relevant to the active open strategy (onClick, onMouseenter/leave, onFocus/Blur, onContextmenu).',
        },
        {
            name: 'contentEvents',
            type: 'ComputedRef<Record<string, EventListener>>',
            descriptionKey: '',
            descriptionFallback: 'Event listeners to spread on the overlay content panel. Handles hover-sustain (keep open while cursor is inside the content), focus-in/out relay, and closeOnContentClick.',
        },
        {
            name: 'scrimEvents',
            type: 'ComputedRef<Record<string, EventListener>>',
            descriptionKey: '',
            descriptionFallback: 'Event listeners for the backdrop scrim element. Sustains hover-open when the cursor moves from the activator to the scrim before reaching the content.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Click-triggered overlay',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useActivator } from 'origam'

const isActive = ref(false)
const isTop = ref(true)

const { activatorRef, activatorEvents, contentEvents } = useActivator(
  { openOnClick: true },
  { isActive, isTop }
)
</script>

<template>
  <button v-bind="activatorEvents" ref="activatorRef">Open</button>
  <div v-if="isActive" v-bind="contentEvents">Overlay content</div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Hover-triggered tooltip',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useActivator } from 'origam'

const isActive = ref(false)
const isTop = ref(true)

const { activatorRef, activatorEvents, contentEvents } = useActivator(
  { openOnHover: true, openDelay: 300, closeDelay: 100 },
  { isActive, isTop }
)
</script>

<template>
  <span v-bind="activatorEvents" ref="activatorRef">Hover me</span>
  <div v-if="isActive" v-bind="contentEvents" role="tooltip">Tooltip</div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-delay', 'use-hover', 'use-focus'],
    consumedInterfaces: ['IActivatorProps', 'IDelayProps'],
    noteFallback: 'useActivator is a low-level primitive used by all overlay components. For most cases, prefer <OrigamMenu>, <OrigamTooltip>, or <OrigamDialog> which consume it internally.',
}
