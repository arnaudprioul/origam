<template>
	<origam-chart
			v-bind="$attrs"
			type="trend"
			:series="series"
			:categories="categories"
			:height="height"
			:title="title"
			:subtitle="subtitle"
			:show-legend="showLegend"
			:legend-position="legendPosition"
			:show-tooltip="showTooltip"
			:animated="animated"
			:animation-duration="animationDuration"
			:color-scheme="colorScheme"
			:aspect-ratio="aspectRatio"
			data-cy="origam-chart-trend"
	>
		<template
				v-for="(_, slotName) in $slots"
				#[slotName]="slotProps"
		>
			<slot
					:name="slotName"
					v-bind="slotProps ?? {}"
			/>
		</template>
	</origam-chart>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamChart } from '../Chart'

	import type { IChartTrendProps } from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Thin wrapper around `<OrigamChart>` that hard-codes
	 * `type="trend"` and exposes only trend-relevant props.
	 * Behaviour, styling, accessibility, and i18n are inherited
	 * verbatim from `<OrigamChart>`. Use this component when you
	 * want a type-safe surface; use `<OrigamChart>` directly when
	 * you need to switch types at runtime.
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartTrend',
		inheritAttrs: false
	})

	defineProps<IChartTrendProps>()

	defineEmits<{
		(e: 'point-click', point: unknown, originalEvent: MouseEvent | KeyboardEvent): void
		(e: 'legend-click', series: unknown, index: number): void
		(e: 'series-toggle', series: unknown, visible: boolean): void
	}>()
</script>
