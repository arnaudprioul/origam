import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_TEXT_COLOR_DOC: IComposableDoc = {
    slug: 'use-text-color',
    name: 'useTextColor',
    domain: 'Commons',
    icon: 'mdi-format-color-text',
    descriptionKey: '',
    descriptionFallback: 'Foreground-only color helper. Resolves the `color` prop to a utility class (`origam--color-*`) for tokenised intents, or to an inline `color:` declaration for raw CSS values and gradients.',
    signature: `function useTextColor<T extends Record<K, TColor>, K extends string>(
  props: T | Ref<TColor>,
  name?: K
): {
  textColorClasses: ComputedRef<string[]>
  textColorStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'T | Ref<TColor>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Either the component props object (paired with `name`) or a plain Ref<TColor>.',
        },
        {
            name: 'name',
            type: 'K',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'The key to read from the props object. Typically "color". Omit when passing a plain Ref.',
        },
    ],
    returns: [
        {
            name: 'textColorClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Utility class names (e.g. ["origam--color-primary"]) to bind via :class.',
        },
        {
            name: 'textColorStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline CSS declarations (e.g. ["color: #6d28d9"]) to bind via :style. For gradients, includes background-image + background-clip: text.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Color an icon with an intent',
            code: `<script setup lang="ts">
import { useTextColor } from 'origam'

const props = defineProps<{ color?: string }>()
const { textColorClasses, textColorStyles } = useTextColor(props, 'color')
</script>

<template>
  <origam-icon
    icon="mdi-star"
    :class="textColorClasses"
    :style="textColorStyles"
  />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-color', 'use-background-color', 'use-color-effect'],
    consumedInterfaces: ['IColorProps'],
}
