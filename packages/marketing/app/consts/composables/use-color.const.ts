import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_COLOR_DOC: IComposableDoc = {
    slug: 'use-color',
    name: 'useColor',
    domain: 'Commons',
    icon: 'mdi-palette',
    descriptionKey: '',
    descriptionFallback: 'Resolve background and text colors from intent tokens or raw CSS values. Part of the classes-first strategy: tokenised intents emit utility classes, custom hex/rgb values emit inline styles.',
    signature: `function useColor(
  colors: ComputedRef<{ background?: TColor; text?: TColor }>
): {
  colorClasses: ComputedRef<string[]>
  colorStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'colors',
            type: 'ComputedRef<{ background?: TColor; text?: TColor }>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'A computed ref wrapping both the background and text color values. Either key may be omitted.',
        },
    ],
    returns: [
        {
            name: 'colorClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Utility class names to bind via :class. Populated when the value is a tokenised intent (e.g. "primary"). Empty for gradients and raw hex/rgb.',
        },
        {
            name: 'colorStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline CSS declarations to bind via :style. Populated for gradients, raw CSS colors, and auto-contrast foreground pairing.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Basic intent color',
            code: `<script setup lang="ts">
import { computed } from 'vue'
import { useColor } from 'origam'

const { colorClasses, colorStyles } = useColor(
  computed(() => ({ background: 'primary', text: 'primary' }))
)
</script>

<template>
  <div :class="colorClasses" :style="colorStyles">
    Primary surface with auto-contrast text
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Gradient foreground (background-clip: text)',
            code: `<script setup lang="ts">
import { computed } from 'vue'
import { useColor } from 'origam'

const { colorClasses, colorStyles } = useColor(
  computed(() => ({ text: 'linear-gradient(90deg, #7c3aed, #2563eb)' }))
)
</script>

<template>
  <span :class="colorClasses" :style="colorStyles" style="font-size: 2rem; font-weight: 800;">
    Gradient text
  </span>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-background-color', 'use-text-color', 'use-color-effect'],
    consumedInterfaces: ['IBgColorProps', 'IColorProps'],
    noteFallback: 'useColor is the low-level building block. Most components should prefer useColorEffect which adds state-aware (hover/active/disabled) resolution.',
}
