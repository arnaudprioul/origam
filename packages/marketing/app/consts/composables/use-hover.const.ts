import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_HOVER_DOC: IComposableDoc = {
    slug: 'use-hover',
    name: 'useHover',
    domain: 'Commons',
    icon: 'mdi-cursor-pointer',
    descriptionKey: '',
    descriptionFallback: 'Tracks whether the host element is hovered via mouseenter/mouseleave events. Supports forced-on (hover=true) and IHoverState config objects for per-axis style overrides. Pairs with useColorEffect for theme-aware hover surfaces.',
    signature: `function useHover(
  props: IHoverProps,
  name?: string
): {
  isHover: ComputedRef<boolean>
  hoverState: ComputedRef<IHoverState | undefined>
  hoverClasses: ComputedRef<string[]>
  onMouseenter: () => void
  onMouseleave: () => void
}`,
    params: [
        {
            name: 'props',
            type: 'IHoverProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props. Reads `props.hover` — accepts undefined/false (event-driven), true (forced on), or an IHoverState config object.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for the `{name}--hovered` class.',
        },
    ],
    returns: [
        {
            name: 'isHover',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the element is hovered (event-driven) or when forced via `hover=true` / `{ enabled: true }`.',
        },
        {
            name: 'hoverState',
            type: 'ComputedRef<IHoverState | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The IHoverState config object when the consumer passed one, undefined otherwise. Consumed by useStateEffect.',
        },
        {
            name: 'hoverClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Includes `{name}--hovered` when isHover is true.',
        },
        {
            name: 'onMouseenter',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Bind to `@mouseenter` on the root element to activate event-driven hover tracking.',
        },
        {
            name: 'onMouseleave',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Bind to `@mouseleave` on the root element to deactivate hover tracking.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Component with hover color effect',
            code: `<script setup lang="ts">
import { useHover, useColorEffect } from 'origam'

const props = defineProps<{
  color?: string
  bgColor?: string
}>()

const { isHover, hoverClasses, onMouseenter, onMouseleave } = useHover(props)
const { colorStyles } = useColorEffect(props, isHover)
</script>

<template>
  <div
    :class="hoverClasses"
    :style="colorStyles"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    Hover me
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Forced hover (story / test)',
            code: `<!-- Always rendered in hover state — useful for stories -->
<origam-card :hover="true" bg-color="primary" />

<!-- Style override on hover -->
<origam-btn :hover="{ bgColor: 'success' }">Hover = success</origam-btn>`,
            lang: 'vue',
        },
    ],
    related: ['use-active', 'use-color-effect'],
    consumedInterfaces: ['IHoverProps', 'IHoverState'],
}
