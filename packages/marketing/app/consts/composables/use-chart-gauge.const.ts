import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_CHART_GAUGE_DOC: IComposableDoc = {
    slug: 'use-chart-gauge',
    name: 'useChartGauge',
    domain: 'Chart',
    icon: 'mdi-gauge',
    descriptionKey: '',
    descriptionFallback: 'Solid-gauge geometry engine for <OrigamChartGauge>. Given a value clamped between min and max, computes the SVG arc paths for the track (full arc background) and the indicator (partial arc proportional to the value), plus centre coordinates and radius values for the value label. Designed to mirror a speedometer-style gauge with a configurable sweep angle and thickness.',
    signature: `function useChartGauge(options: IUseChartGaugeOptions): {
  geometry: ComputedRef<IChartGaugeGeometry>
}`,
    params: [
        {
            name: 'options',
            type: 'IUseChartGaugeOptions',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Configuration thunks. Required: value, min, max, width, height, padding. Optional: thickness (arc ring width, default 18px), startAngle (radians, default -3π/4), endAngle (radians, default 3π/4). All values are () => T getters so the composable reacts to reactive sources.',
        },
    ],
    returns: [
        {
            name: 'geometry',
            type: 'ComputedRef<IChartGaugeGeometry>',
            descriptionKey: '',
            descriptionFallback: 'Computed geometry object containing: trackPath (full arc SVG d-string), valuePath (partial arc SVG d-string, empty when value is at minimum), valueAngle (radians, for optional needle/handle), startAngle, endAngle, outerRadius, innerRadius, centerX, centerY, ratio (normalised 0..1), and clampedValue.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Speedometer gauge at 65%',
            code: `<script setup lang="ts">
import { useChartGauge } from 'origam'

const props = defineProps<{ value: number; min: number; max: number }>()

const { geometry } = useChartGauge({
  value: () => props.value,
  min: () => props.min,
  max: () => props.max,
  width: () => 300,
  height: () => 220,
  padding: () => ({ top: 16, right: 16, bottom: 40, left: 16 }),
  thickness: () => 24,
})
</script>

<template>
  <svg :viewBox="\`0 0 300 220\`" width="300" height="220">
    <path :d="geometry.trackPath" fill="var(--origam-color-neutral-200)" />
    <path :d="geometry.valuePath" fill="var(--origam-color-primary-500)" />
    <text
      :x="geometry.centerX"
      :y="geometry.centerY + 16"
      text-anchor="middle"
      font-size="24"
    >{{ geometry.clampedValue }}</text>
  </svg>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom arc sweep (half-circle)',
            code: `<script setup lang="ts">
import { useChartGauge } from 'origam'

const { geometry } = useChartGauge({
  value: () => 70,
  min: () => 0,
  max: () => 100,
  width: () => 300,
  height: () => 160,
  padding: () => ({ top: 8, right: 8, bottom: 8, left: 8 }),
  startAngle: () => -Math.PI,
  endAngle: () => 0,
  thickness: () => 20,
})
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-chart'],
    consumedInterfaces: ['IUseChartGaugeOptions', 'IChartGaugeGeometry'],
}
