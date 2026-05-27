<template>
	<Story
			group="components"
			title="Chart/OrigamChartBoxPlot"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					animated: true,
					showLegend: false,
					showTooltip: true,
					showOutliers: true,
					showAxis: true,
					showGrid: true,
					legendPosition: 'bottom',
					boxWidth: 0.6,
					whiskerCapWidth: 0.4
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="box-plot-playground"
				>
					<origam-chart-box-plot
							:series="FIXTURE_API_SERIES"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:show-outliers="Boolean(state.showOutliers)"
							:show-axis="Boolean(state.showAxis)"
							:show-grid="Boolean(state.showGrid)"
							:legend-position="state.legendPosition"
							:box-width="Number(state.boxWidth)"
							:whisker-cap-width="Number(state.whiskerCapWidth)"
							title="API Response Time"
							subtitle="Distribution per endpoint (ms)"
							data-cy="box-plot-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="box-plot-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstSelect
						v-model="state.legendPosition"
						title="legendPosition"
						:options="LEGEND_POSITION_OPTIONS"
				/>
				<HstNumber
						v-model="state.boxWidth"
						title="boxWidth [0..1]"
				/>
				<HstNumber
						v-model="state.whiskerCapWidth"
						title="whiskerCapWidth [0..1]"
				/>
				<HstCheckbox
						v-model="state.animated"
						title="animated"
				/>
				<HstCheckbox
						v-model="state.showLegend"
						title="showLegend"
				/>
				<HstCheckbox
						v-model="state.showTooltip"
						title="showTooltip"
				/>
				<HstCheckbox
						v-model="state.showOutliers"
						title="showOutliers"
				/>
				<HstCheckbox
						v-model="state.showAxis"
						title="showAxis"
				/>
				<HstCheckbox
						v-model="state.showGrid"
						title="showGrid"
				/>
			</template>
		</Variant>

		<Variant title="Prop — raw samples (computes quartiles internally)">
			<div
					class="story-shell"
					data-cy="box-plot-raw-samples"
			>
				<origam-chart-box-plot
						:series="FIXTURE_SALES_SERIES"
						:height="380"
						:show-outliers="true"
						:show-axis="true"
						title="Daily Sales Distribution"
						subtitle="Raw samples — Mon / Wed / Fri"
						data-cy="box-plot-raw-samples-chart"
				/>
			</div>
		</Variant>

		<Variant title="Prop — boxWidth (slim 0.3 vs wide 0.9)">
			<div
					class="story-shell"
					data-cy="box-plot-box-width"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>boxWidth = 0.3 (slim)</strong>
						<origam-chart-box-plot
								:series="FIXTURE_API_SERIES"
								:height="320"
								:box-width="0.3"
								:whisker-cap-width="0.2"
								title="Slim boxes"
								data-cy="box-plot-slim"
						/>
					</div>
					<div class="story-col">
						<strong>boxWidth = 0.9 (wide)</strong>
						<origam-chart-box-plot
								:series="FIXTURE_API_SERIES"
								:height="320"
								:box-width="0.9"
								:whisker-cap-width="0.7"
								title="Wide boxes"
								data-cy="box-plot-wide"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showOutliers (on / off)">
			<div
					class="story-shell"
					data-cy="box-plot-outliers"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>showOutliers = true</strong>
						<origam-chart-box-plot
								:series="FIXTURE_API_SERIES"
								:height="320"
								:show-outliers="true"
								title="With outliers"
								data-cy="box-plot-outliers-on"
						/>
					</div>
					<div class="story-col">
						<strong>showOutliers = false</strong>
						<origam-chart-box-plot
								:series="FIXTURE_API_SERIES"
								:height="320"
								:show-outliers="false"
								title="Without outliers"
								data-cy="box-plot-outliers-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="box-plot-color-scheme"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default intent palette</strong>
						<origam-chart-box-plot
								:series="FIXTURE_API_SERIES"
								:height="300"
								title="Intent palette"
								data-cy="box-plot-color-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS ramp</strong>
						<origam-chart-box-plot
								:series="FIXTURE_API_SERIES"
								:color-scheme="['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ddd6fe']"
								:height="300"
								title="Custom purple ramp"
								data-cy="box-plot-color-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="box-plot-slot-tooltip"
			>
				<origam-chart-box-plot
						:series="FIXTURE_API_SERIES"
						:height="380"
						title="Custom tooltip"
						data-cy="box-plot-slot-tooltip-chart"
				>
					<template #tooltip="{ box }">
						<div class="custom-tooltip">
							<strong>{{ box.category }}</strong>
							<dl class="custom-tooltip__stats">
								<dt>Median</dt>
								<dd>{{ box.rawStats.median }} ms</dd>
								<dt>IQR</dt>
								<dd>{{ Math.round(box.iqr) }} ms</dd>
								<dt>Min / Max</dt>
								<dd>{{ box.rawStats.min }} / {{ box.rawStats.max }} ms</dd>
								<dt>Outliers</dt>
								<dd>{{ box.outliers.length }}</dd>
							</dl>
						</div>
					</template>
				</origam-chart-box-plot>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="box-plot-slot-empty"
			>
				<origam-chart-box-plot
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="box-plot-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No distribution data available for this period.
						</div>
					</template>
				</origam-chart-box-plot>
			</div>
		</Variant>

		<Variant title="Emit — point-click">
			<div
					class="story-shell"
					data-cy="box-plot-emit"
			>
				<origam-chart-box-plot
						:series="FIXTURE_API_SERIES"
						:height="360"
						title="Click a box or outlier"
						data-cy="box-plot-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="box-plot-emit-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import OrigamChartBoxPlot from '@origam/components/Chart/OrigamChartBoxPlot.vue'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'
	import type { IChartBoxPlotDatum, IChartBoxPlotRawDatum } from '@origam/interfaces/Chart/chart-box-plot.interface'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const API_DATA: Array<IChartBoxPlotDatum> = [
		{ category: '/users', min: 12, q1: 18, median: 24, q3: 32, max: 58, outliers: [120, 180] },
		{ category: '/products', min: 20, q1: 28, median: 38, q3: 52, max: 90, outliers: [150] },
		{ category: '/orders', min: 45, q1: 58, median: 70, q3: 88, max: 132, outliers: [] },
		{ category: '/payments', min: 80, q1: 95, median: 115, q3: 140, max: 200, outliers: [320, 450] },
		{ category: '/auth', min: 8, q1: 12, median: 16, q3: 22, max: 40, outliers: [] }
	]

	const FIXTURE_API_SERIES: Array<IChartSeries> = [
		{ name: 'API response time (ms)', data: API_DATA as unknown as Array<number> }
	]

	const buildSalesSamples = (offset: number): Array<number> =>
		Array.from({ length: 30 }, (_, i) =>
			Math.round(50 + Math.random() * 40 + (i * 0.5) + offset)
		)

	const SALES_DATA: Array<IChartBoxPlotRawDatum> = [
		{ category: 'Monday', samples: buildSalesSamples(0) },
		{ category: 'Wednesday', samples: buildSalesSamples(15) },
		{ category: 'Friday', samples: buildSalesSamples(30) }
	]

	const FIXTURE_SALES_SERIES: Array<IChartSeries> = [
		{ name: 'Daily sales', data: SALES_DATA as unknown as Array<number> }
	]

	const logLines = ref<Array<string>>([])

	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → x="${ point.x }" y=${ point.y }`)
	}

	const onLegendClick = (series: IChartSeries, index: number) => {
		appendLog(`legend-click → ${ series.name } (index ${ index })`)
	}

	const onSeriesToggle = (series: IChartSeries, visible: boolean) => {
		appendLog(`series-toggle → ${ series.name } now ${ visible ? 'visible' : 'hidden' }`)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
	}

	.story-log {
		font-size: 0.75rem;
		color: var(--origam-color-text-secondary, #6b7280);
		min-height: 80px;
		border: 1px solid var(--origam-color-border-subtle, #e5e7eb);
		border-radius: 4px;
		padding: 8px;
		white-space: pre-wrap;
	}

	.story-grid {
		display: grid;
		gap: 16px;
	}

	.story-grid--2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}

	.story-col strong {
		font-size: 0.8125rem;
		color: var(--origam-color-text-secondary, #6b7280);
	}

	.custom-tooltip {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 4px;
		min-width: 160px;
	}

	.custom-tooltip__stats {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2px 8px;
		margin: 0;
		font-size: 0.75rem;
	}

	.custom-tooltip__stats dt {
		opacity: 0.7;
	}

	.custom-tooltip__stats dd {
		margin: 0;
		font-weight: 600;
		text-align: right;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
