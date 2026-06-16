import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_COLOR_EFFECT_DOC: IComposableDoc = {
    slug: 'use-color-effect',
    name: 'useColorEffect',
    domain: 'Commons',
    icon: 'mdi-palette-swatch',
    descriptionKey: '',
    descriptionFallback: 'State-aware (hover / active / disabled) color resolution for components that paint a surface. Resolves bg and fg independently per state axis. Auto-contrasts foreground when only `bgColor` is set. Used by Btn, Card, Chip and ~49 other components.',
    signature: `function useColorEffect(
  props: IColorProps & IBgColorProps,
  isHover?: Ref<boolean> | ComputedRef<boolean>,
  isActive?: Ref<boolean> | ComputedRef<boolean>,
  isDisabled?: Ref<boolean> | ComputedRef<boolean>
): {
  colorClasses: ComputedRef<string[]>
  colorStyles: ComputedRef<string[]>
  color: ComputedRef<TColor | undefined>
  bgColor: ComputedRef<TColor | undefined>
}`,
    params: [
        {
            name: 'props',
            type: 'IColorProps & IBgColorProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props containing color, bgColor, hoverColor, hoverBgColor, activeColor, activeBgColor.',
        },
        {
            name: 'isHover',
            type: 'Ref<boolean> | ComputedRef<boolean>',
            required: false,
            defaultValue: 'ref(false)',
            descriptionKey: '',
            descriptionFallback: 'Reactive hover state from useHover. When true, resolves the hover color slot (bgHover token rung or -20% darken).',
        },
        {
            name: 'isActive',
            type: 'Ref<boolean> | ComputedRef<boolean>',
            required: false,
            defaultValue: 'ref(false)',
            descriptionKey: '',
            descriptionFallback: 'Reactive active state from useActive. When true, resolves the active color slot (bgActive token rung or -30% darken).',
        },
        {
            name: 'isDisabled',
            type: 'Ref<boolean> | ComputedRef<boolean>',
            required: false,
            defaultValue: 'ref(false)',
            descriptionKey: '',
            descriptionFallback: 'When true, utility classes are suppressed (empty colorClasses). Disabled surfaces are rendered via opacity veil on the resting color, not a token swap.',
        },
    ],
    returns: [
        {
            name: 'colorClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Utility class names for the resting state only. Empty during hover/active/disabled (inline styles take over).',
        },
        {
            name: 'colorStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline CSS declarations resolving bg and fg for the current state. Includes auto-contrast pairing and gradient clip-text support.',
        },
        {
            name: 'color',
            type: 'ComputedRef<TColor | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The effective foreground color for the current state (resting, hover or active).',
        },
        {
            name: 'bgColor',
            type: 'ComputedRef<TColor | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The effective background color for the current state (resting, hover or active).',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'State-aware surface component',
            code: `<script setup lang="ts">
import { useColorEffect, useHover, useActive } from 'origam'

const props = defineProps<{
  color?: string
  bgColor?: string
}>()

const { isHover, onMouseenter, onMouseleave } = useHover(props)
const { isActive, onActive } = useActive(props)
const { colorClasses, colorStyles } = useColorEffect(props, isHover, isActive)
</script>

<template>
  <button
    :class="colorClasses"
    :style="colorStyles"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @click="onActive"
  >
    Hover and click me
  </button>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-color', 'use-hover', 'use-active'],
    consumedInterfaces: ['IColorProps', 'IBgColorProps'],
    noteFallback: 'The bgColor disabled path is intentionally a no-op token-swap: disabled appearance is always an opacity veil on the resting color. This keeps every btn in a row visually consistent — same color family, just dimmed.',
}
