import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_BACKGROUND_COLOR_DOC: IComposableDoc = {
    slug: 'use-background-color',
    name: 'useBackgroundColor',
    domain: 'Commons',
    icon: 'mdi-format-color-fill',
    descriptionKey: '',
    descriptionFallback: 'Surface-only color helper. Resolves the `bgColor` prop (or a reactive ref) to a utility class (`origam--bg-*`) when the value is a tokenised intent, or to an inline background-color declaration for raw CSS values.',
    signature: `function useBackgroundColor<T extends Record<K, TColor>, K extends string>(
  props: T | Ref<TColor>,
  name?: K
): {
  backgroundColorClasses: ComputedRef<string[]>
  backgroundColorStyles: ComputedRef<string[]>
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
            descriptionFallback: 'The key to read from the props object. Typically "bgColor". Omit when passing a plain Ref.',
        },
    ],
    returns: [
        {
            name: 'backgroundColorClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Utility class names (e.g. ["origam--bg-primary"]) to bind via :class. Empty when value is gradient or raw hex.',
        },
        {
            name: 'backgroundColorStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline CSS declarations (e.g. ["background-color: #ff0080"]) to bind via :style. Empty when a utility class applies.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Usage with props object',
            code: `<script setup lang="ts">
import { useBackgroundColor } from 'origam'

const props = defineProps<{ bgColor?: string }>()
const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'bgColor')
</script>

<template>
  <div :class="backgroundColorClasses" :style="backgroundColorStyles">
    Surface with theme-aware background
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Usage with a plain Ref',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useBackgroundColor } from 'origam'

const bgColor = ref('success')
const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(bgColor)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-color', 'use-text-color', 'use-color-effect'],
    consumedInterfaces: ['IBgColorProps'],
}
