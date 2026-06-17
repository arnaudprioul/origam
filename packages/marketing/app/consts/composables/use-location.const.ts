import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_LOCATION_DOC: IComposableDoc = {
    slug: 'use-location',
    name: 'useLocation',
    domain: 'Commons',
    icon: 'mdi-crosshairs-gps',
    descriptionKey: '',
    descriptionFallback: 'Converts a semantic anchor string (e.g. "top center", "bottom end") into CSS positioning styles for absolutely-placed elements. Used internally by Badge, Chip, and floating content components to position decorators relative to their host. Also exposes useLocationStrategies for the full popup positioning pipeline.',
    signature: `function useLocation(
  props: ILocationProps,
  opposite?: boolean,
  offset?: (side: string) => number
): {
  locationStyles: ComputedRef<Record<string, string | number>>
}`,
    params: [
        {
            name: 'props',
            type: 'ILocationProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props extending ILocationProps. The location key accepts a TAnchor string ("top", "bottom start", "right center", etc.).',
        },
        {
            name: 'opposite',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            descriptionKey: '',
            descriptionFallback: 'When true, positions the element on the opposite side (e.g. "top" becomes bottom: calc(100% - Npx)). Used for tooltip anchoring to a host.',
        },
        {
            name: 'offset',
            type: '(side: string) => number',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional function returning a pixel offset for a given side string. Allows per-side inset adjustments without altering the anchor semantics.',
        },
    ],
    returns: [
        {
            name: 'locationStyles',
            type: 'ComputedRef<Record<string, string | number>>',
            descriptionKey: '',
            descriptionFallback: 'Computed CSS properties (top, left, right, bottom, transform) that place the element at the requested anchor position. Bind via :style.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Position a badge at top-end',
            code: `<script setup lang="ts">
import { useLocation } from 'origam'

const props = defineProps<{ location?: string }>()
const { locationStyles } = useLocation(
  { location: props.location ?? 'top end' } as any
)
</script>

<template>
  <span class="badge" :style="locationStyles">99+</span>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Opposite anchor (tooltip above host)',
            code: `<script setup lang="ts">
import { useLocation } from 'origam'

// opposite=true: "bottom" → places at top of host edge
const { locationStyles } = useLocation(
  { location: 'bottom center' } as any,
  true
)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-activator', 'use-location-strategies'],
    consumedInterfaces: ['ILocationProps', 'ILocationStrategyProps'],
}
