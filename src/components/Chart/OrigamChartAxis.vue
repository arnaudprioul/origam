<template>
	<g
			v-if="showGrid"
			class="origam-chart__grid"
			data-cy="origam-chart-grid"
	>
		<line
				v-for="(tick, i) in ticks.y"
				:key="`yg-${ i }`"
				class="origam-chart__grid-line"
				:x1="plot.x0"
				:y1="tick.position"
				:x2="plot.x1"
				:y2="tick.position"
		/>
	</g>

	<g
			v-if="showAxis"
			class="origam-chart__axis"
			data-cy="origam-chart-axis"
	>
		<line
				class="origam-chart__axis-line"
				:x1="plot.x0"
				:y1="plot.y0"
				:x2="plot.x0"
				:y2="plot.y1"
		/>
		<line
				class="origam-chart__axis-line"
				:x1="plot.x0"
				:y1="plot.y1"
				:x2="plot.x1"
				:y2="plot.y1"
		/>
		<text
				v-for="(tick, i) in ticks.y"
				:key="`yl-${ i }`"
				class="origam-chart__axis-label origam-chart__axis-label--y"
				:x="plot.x0 - 8"
				:y="tick.position"
				text-anchor="end"
				dominant-baseline="middle"
		>
			{{ formatY(tick.value as number) }}
		</text>
		<text
				v-for="(tick, i) in ticks.x"
				:key="`xl-${ i }`"
				class="origam-chart__axis-label origam-chart__axis-label--x"
				:x="tick.position"
				:y="plot.y1 + 16"
				text-anchor="middle"
		>
			{{ formatX(tick.value) }}
		</text>
	</g>
</template>

<script
		lang="ts"
		setup
>
	import type { IChartAxisProps } from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Cartesian-only chrome (X+Y axes + horizontal grid lines +
	 * tick labels). Extracted from the legacy `<OrigamChart>` so
	 * polar / radar / gauge families don't inherit it — the user's
	 * primary complaint about pie charts showing axis lines came
	 * from `<OrigamChart>` rendering this block for every type
	 * that wasn't a radar.
	 *
	 * The component is a pure renderer:
	 *   - inputs are the pre-computed `plot` corners + `ticks` array
	 *     from `useChart()`,
	 *   - outputs are SVG `<g>` groups identical to the ones the
	 *     legacy shell painted (same classes, same `data-cy`, same
	 *     SCSS rules — visual parity is the whole point).
	 *
	 * No JS interaction, no DOM measurement, SSR-safe.
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartAxis'
	})

	/*********************************************************
	 * Props — defaulted inline (literals only, per CLAUDE.md).
	 ********************************************************/
	const props = withDefaults(defineProps<IChartAxisProps>(), {
		showAxis: true,
		showGrid: true,
		xAxisFormat: undefined,
		yAxisFormat: undefined
	})

	/*********************************************************
	 * Format helpers — fall back to identity when the consumer
	 * doesn't supply a formatter. Identical to the helpers the
	 * legacy `<OrigamChart>` defined inline.
	 ********************************************************/
	const formatX = (value: number | string): string => {
		if (props.xAxisFormat) return props.xAxisFormat(value)
		return String(value)
	}

	const formatY = (value: number): string => {
		if (props.yAxisFormat) return props.yAxisFormat(value)
		return String(value)
	}
</script>
