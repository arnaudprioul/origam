import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_STATE_EFFECT_DOC: IComposableDoc = {
    slug: 'use-state-effect',
    name: 'useStateEffect',
    domain: 'Commons',
    icon: 'mdi-palette-swatch-variant',
    descriptionKey: '',
    descriptionFallback: 'Unified composable that consolidates eight visual axes (color, bgColor, border, rounded, elevation, padding, margin, gap) into a single state-aware layer. Reads the hover / active state and their override objects (IHoverState / IActiveState) and emits per-axis classes + styles for each axis. Replaces the prior chain of useColorEffect + useBorder + useRounded + useElevation + usePadding + useMargin that every visual component had to repeat.',
    signature: `function useStateEffect(
  props: TStateEffectProps,
  isHover?: Ref<boolean> | ComputedRef<boolean>,
  isActive?: Ref<boolean> | ComputedRef<boolean>,
  hoverState?: ComputedRef<IHoverState | undefined>,
  activeState?: ComputedRef<IActiveState | undefined>,
  isDisabled?: Ref<boolean> | ComputedRef<boolean>,
  flat?: Ref<boolean> | ComputedRef<boolean>
): {
  color: ComputedRef<TColor | undefined>
  bgColor: ComputedRef<TColor | undefined>
  border: ComputedRef<any>
  rounded: ComputedRef<any>
  elevation: ComputedRef<any>
  padding: ComputedRef<any>
  margin: ComputedRef<any>
  gap: ComputedRef<any>
  colorClasses: ComputedRef<string[]>
  colorStyles: ComputedRef<string[]>
  borderClasses: ComputedRef<string[]>
  borderStyles: ComputedRef<string[]>
  roundedClasses: ComputedRef<string[]>
  roundedStyles: ComputedRef<string[]>
  elevationClasses: ComputedRef<string[]>
  elevationStyles: ComputedRef<string[]>
  paddingClasses: ComputedRef<string[]>
  paddingStyles: ComputedRef<string[]>
  marginClasses: ComputedRef<string[]>
  marginStyles: ComputedRef<string[]>
  gapClasses: ComputedRef<string[]>
  gapStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'TStateEffectProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props implementing all eight axes: IColorProps & IBgColorProps & IBorderProps & IRoundedProps & IElevationProps & IPaddingProps & IMarginProps & { gap? }. Also reads props.status when present to force the matching semantic intent (overrides color/bgColor).',
        },
        {
            name: 'isHover',
            type: 'Ref<boolean> | ComputedRef<boolean>',
            required: false,
            defaultValue: 'ref(false)',
            descriptionKey: '',
            descriptionFallback: 'Reactive hover state from useHover. When true, the composable applies the override values from hoverState for each axis.',
        },
        {
            name: 'isActive',
            type: 'Ref<boolean> | ComputedRef<boolean>',
            required: false,
            defaultValue: 'ref(false)',
            descriptionKey: '',
            descriptionFallback: 'Reactive active/selected state from useActive. When true (and isHover is false), override values from activeState are applied. Hover takes priority when both are engaged simultaneously.',
        },
        {
            name: 'hoverState',
            type: 'ComputedRef<IHoverState | undefined>',
            required: false,
            defaultValue: 'computed(() => undefined)',
            descriptionKey: '',
            descriptionFallback: 'State config object from useHover. Contains per-axis override values (color, bgColor, border, rounded, elevation, padding, margin, gap) to apply while hovered.',
        },
        {
            name: 'activeState',
            type: 'ComputedRef<IActiveState | undefined>',
            required: false,
            defaultValue: 'computed(() => undefined)',
            descriptionKey: '',
            descriptionFallback: 'State config object from useActive. Same shape as IHoverState — per-axis overrides applied while the item is selected/active.',
        },
        {
            name: 'isDisabled',
            type: 'Ref<boolean> | ComputedRef<boolean>',
            required: false,
            defaultValue: 'ref(false)',
            descriptionKey: '',
            descriptionFallback: 'When true, colorClasses is emptied (utility classes suppressed) so the disabled opacity veil is not overridden by a tokenised background.',
        },
        {
            name: 'flat',
            type: 'Ref<boolean> | ComputedRef<boolean>',
            required: false,
            defaultValue: 'ref(false)',
            descriptionKey: '',
            descriptionFallback: 'When true, elevationClasses and elevationStyles resolve to empty. Bridges the flat prop of Btn / Card without requiring a separate useElevation call.',
        },
    ],
    returns: [
        {
            name: 'colorClasses / colorStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Tokenised intent values emit a utility class (origam--bg-primary); custom CSS colors emit an inline style. Both are empty when disabled/hover/active is true (state-inline path takes over).',
        },
        {
            name: 'borderClasses / borderStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Delegated to useBorder with a reactive proxy that swaps to hoverState/activeState.border when the state is engaged.',
        },
        {
            name: 'roundedClasses / roundedStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Delegated to useRounded. State-aware: applies hoverState/activeState.rounded when engaged.',
        },
        {
            name: 'elevationClasses / elevationStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Delegated to useElevation. Cleared when flat=true. State-aware via the pickEffective resolver.',
        },
        {
            name: 'paddingClasses / paddingStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Delegated to usePadding via a reactive getter proxy to preserve dependency tracking across state swaps.',
        },
        {
            name: 'marginClasses / marginStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Delegated to useMargin via a reactive getter proxy.',
        },
        {
            name: 'gapClasses / gapStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Gap has no dedicated composable. Emits an inline style (gap: Npx or gap: <value>) when a gap override is present. gapClasses is always empty.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Card with hover elevation + bg swap',
            code: `<script setup lang="ts">
import { useHover, useStateEffect } from 'origam'

const props = defineProps<{
  color?: string
  bgColor?: string
  hover?: boolean | object
  elevation?: string | number
}>()

const { isHover, hoverState, onMouseenter, onMouseleave } = useHover(props)

const {
  colorClasses, colorStyles,
  elevationClasses, elevationStyles,
} = useStateEffect(props, isHover)
</script>

<template>
  <div
    :class="[colorClasses, elevationClasses]"
    :style="[colorStyles, elevationStyles]"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Active nav item with full state override',
            code: `<!-- Nav item selected = active; unselected = resting state -->
<origam-btn
  :bg-color="'surface'"
  :hover="{ bgColor: 'primary', elevation: 2 }"
  :active="{ bgColor: 'primary', color: 'on-primary' }"
  :model-value="isSelected"
>
  Dashboard
</origam-btn>`,
            lang: 'vue',
        },
    ],
    related: ['use-hover', 'use-active', 'use-color-effect', 'use-border', 'use-rounded', 'use-elevation', 'use-padding', 'use-margin'],
    consumedInterfaces: ['IColorProps', 'IBgColorProps', 'IBorderProps', 'IRoundedProps', 'IElevationProps', 'IPaddingProps', 'IMarginProps', 'IHoverState', 'IActiveState'],
    noteFallback: 'useStateEffect is the recommended replacement for the manual chain useColorEffect + useBorder + useRounded + useElevation + usePadding + useMargin. Priority rule: hover overrides active when both are engaged simultaneously.',
}
