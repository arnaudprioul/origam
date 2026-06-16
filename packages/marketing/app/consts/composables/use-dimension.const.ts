import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_DIMENSION_DOC: IComposableDoc = {
    slug: 'use-dimension',
    name: 'useDimension',
    domain: 'Commons',
    icon: 'mdi-resize',
    descriptionKey: '',
    descriptionFallback: 'Resolves the six dimension props (width, height, minWidth, maxWidth, minHeight, maxHeight) into inline CSS declarations. Numbers become `px` values, strings pass through (supports CSS lengths, custom properties and aspect-ratio shortcuts).',
    signature: `function useDimension(
  props: IDimensionProps
): {
  dimensionStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IDimensionProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props extending IDimensionProps. Reads width, height, minWidth, maxWidth, minHeight, maxHeight.',
        },
    ],
    returns: [
        {
            name: 'dimensionStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline CSS declarations for all provided dimension props, e.g. ["width: 200px", "max-height: 50vh"].',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Basic usage',
            code: `<script setup lang="ts">
import { useDimension } from 'origam'

const props = defineProps<{
  width?: string | number
  height?: string | number
  maxHeight?: string | number
}>()

const { dimensionStyles } = useDimension(props)
</script>

<template>
  <div :style="dimensionStyles">
    Sized container
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'With CSS custom properties',
            code: `<origam-img
  width="320"
  height="240"
  max-height="50vh"
  src="/hero.webp"
/>`,
            lang: 'vue',
        },
    ],
    related: ['use-size'],
    consumedInterfaces: ['IDimensionProps'],
    noteFallback: 'Always extend IDimensionProps rather than declaring width/height manually. A hand-rolled height-only prop silently ignores maxHeight, minHeight, etc.',
}
