import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_POSITION_DOC: IComposableDoc = {
    slug: 'use-position',
    name: 'usePosition',
    domain: 'Commons',
    icon: 'mdi-map-marker-outline',
    descriptionKey: '',
    descriptionFallback: 'Derives CSS positioning classes and inline style declarations from IPositionProps. Emits a BEM modifier class for the position variant (absolute, fixed, sticky, relative, static) and inline top/bottom/left/right properties for any offset props that are set.',
    signature: `function usePosition(
  props: IPositionProps,
  name?: string
): {
  positionClasses: ComputedRef<string | undefined>
  positionStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IPositionProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props containing `position` (CSS position keyword), `top`, `bottom`, `left`, `right` (CSS length values or token references).',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix used to build the BEM modifier class, e.g. "origam-btn" → "origam-btn--fixed".',
        },
    ],
    returns: [
        {
            name: 'positionClasses',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: '',
            descriptionFallback: 'BEM modifier class string when position is set (e.g. "origam-card--sticky"), undefined otherwise.',
        },
        {
            name: 'positionStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Array of inline CSS declarations for top / bottom / left / right. Only includes sides that have a non-falsy prop value.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Sticky banner',
            code: `<template>
  <origam-sheet position="sticky" top="0" z-index="10">
    Sticky header
  </origam-sheet>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Floating action button',
            code: `<origam-btn
  position="fixed"
  bottom="24px"
  right="24px"
  color="primary"
  icon="mdi-plus"
  aria-label="Add item"
/>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Inside a custom component',
            code: `<script setup lang="ts">
import { usePosition } from 'origam'

const props = defineProps<{
  position?: string
  top?: string
  bottom?: string
  left?: string
  right?: string
}>()

const { positionClasses, positionStyles } = usePosition(props)
</script>

<template>
  <div :class="['my-widget', positionClasses]" :style="positionStyles">
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-dimension', 'use-margin'],
    consumedInterfaces: ['IPositionProps'],
}
