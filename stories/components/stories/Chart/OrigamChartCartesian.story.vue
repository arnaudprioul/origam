<template>
	<Story
			group="components"
			title="Chart/OrigamChartCartesian"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					type: 'line',
					height: 360,
					stacked: false,
					animated: true,
					legendPosition: 'bottom',
					smoothing: 'none',
					showGrid: true,
					showAxis: true,
					showLegend: true,
					showTooltip: true
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="cartesian-playground"
				>
					<origam-chart-cartesian
							:type="state.type"
							:series="FIXTURE_SALES_SERIES"
							:categories="FIXTURE_MONTHS"
							:height="Number(state.height)"
							:stacked="Boolean(state.stacked)"
							:animated="Boolean(state.animated)"
							:legend-position="state.legendPosition"
							:smoothing="state.smoothing"
							:show-grid="Boolean(state.showGrid)"
							:show-axis="Boolean(state.showAxis)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							title="Monthly sales"
							subtitle="2025 vs 2026"
							data-cy="cartesian-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="cartesian-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.type"
						title="type"
						:options="TYPE_OPTIONS"
				/>
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstSelect
						v-model="state.legendPosition"
						title="legendPosition"
						:options="LEGEND_POSITION_OPTIONS"
				/>
				<HstSelect
						v-model="state.smoothing"
						title="smoothing"
						:options="SMOOTHING_OPTIONS"
				/>
				<HstCheckbox
						v-model="state.stacked"
						title="stacked"
				/>
				<HstCheckbox
						v-model="state.animated"
						title="animated"
				/>
				<HstCheckbox
						v-model="state.showGrid"
						title="showGrid"
				/>
				<HstCheckbox
						v-model="state.showAxis"
						title="showAxis"
				/>
				<HstCheckbox
						v-model="state.showLegend"
						title="showLegend"
				/>
				<HstCheckbox
						v-model="state.showTooltip"
						title="showTooltip"
				/>
			</template>
		</Variant>

		<Variant title="Prop — type (line)">
			<div
					class="story-shell"
					data-cy="cartesian-type-line"
			>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Line chart"
						data-cy="cartesian-chart-line"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (spline)">
			<div
					class="story-shell"
					data-cy="cartesian-type-spline"
			>
				<origam-chart-cartesian
						type="spline"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Spline chart"
						data-cy="cartesian-chart-spline"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (stepped-line)">
			<div
					class="story-shell"
					data-cy="cartesian-type-stepped-line"
			>
				<origam-chart-cartesian
						type="stepped-line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Stepped-line chart"
						data-cy="cartesian-chart-stepped-line"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (area)">
			<div
					class="story-shell"
					data-cy="cartesian-type-area"
			>
				<origam-chart-cartesian
						type="area"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Area chart"
						data-cy="cartesian-chart-area"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (bar)">
			<div
					class="story-shell"
					data-cy="cartesian-type-bar"
			>
				<origam-chart-cartesian
						type="bar"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Bar chart"
						data-cy="cartesian-chart-bar"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (column)">
			<div
					class="story-shell"
					data-cy="cartesian-type-column"
			>
				<origam-chart-cartesian
						type="column"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Column chart"
						data-cy="cartesian-chart-column"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (scatter)">
			<div
					class="story-shell"
					data-cy="cartesian-type-scatter"
			>
				<origam-chart-cartesian
						type="scatter"
						:series="FIXTURE_SCATTER"
						:height="300"
						title="Scatter chart"
						data-cy="cartesian-chart-scatter"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (trend)">
			<div
					class="story-shell"
					data-cy="cartesian-type-trend"
			>
				<p class="hint">
					Trend sparklines suppress axes, grid, legend, and header. They are designed to fill a table cell or dashboard tile.
				</p>
				<origam-chart-cartesian
						type="trend"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="80"
						data-cy="cartesian-chart-trend"
				/>
			</div>
		</Variant>

		<Variant title="Prop — stacked">
			<div
					class="story-shell"
					data-cy="cartesian-stacked"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>stacked = false</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:stacked="false"
								:height="280"
								data-cy="cartesian-stacked-off"
						/>
					</div>
					<div class="story-col">
						<strong>stacked = true</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:stacked="true"
								:height="280"
								data-cy="cartesian-stacked-on"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — smoothing">
			<div
					class="story-shell"
					data-cy="cartesian-smoothing"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>smoothing = none</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								smoothing="none"
								:height="260"
								data-cy="cartesian-smoothing-none"
						/>
					</div>
					<div class="story-col">
						<strong>smoothing = curve</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								smoothing="curve"
								:height="260"
								data-cy="cartesian-smoothing-curve"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — yMin / yMax">
			<div
					class="story-shell"
					data-cy="cartesian-yrange"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>auto range</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="260"
								data-cy="cartesian-yrange-auto"
						/>
					</div>
					<div class="story-col">
						<strong>yMin=0 yMax=60</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:y-min="0"
								:y-max="60"
								:height="260"
								data-cy="cartesian-yrange-fixed"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — animated">
			<div
					class="story-shell"
					data-cy="cartesian-animated"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>animated = true</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:animated="true"
								:height="260"
								data-cy="cartesian-animated-on"
						/>
					</div>
					<div class="story-col">
						<strong>animated = false</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:animated="false"
								:height="260"
								data-cy="cartesian-animated-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — series (1 / 2 / 5)">
			<div
					class="story-shell"
					data-cy="cartesian-series-count"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>1 series</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES.slice(0, 1)"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="cartesian-series-1"
						/>
					</div>
					<div class="story-col">
						<strong>2 series</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="cartesian-series-2"
						/>
					</div>
					<div class="story-col">
						<strong>5 series</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="cartesian-series-5"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="cartesian-color-scheme"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default palette</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="260"
								data-cy="cartesian-palette-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom palette</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:color-scheme="['#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#0ea5e9']"
								:height="260"
								data-cy="cartesian-palette-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — categories">
			<div
					class="story-shell"
					data-cy="cartesian-categories"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>month labels</strong>
						<origam-chart-cartesian
								type="bar"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="260"
								data-cy="cartesian-categories-months"
						/>
					</div>
					<div class="story-col">
						<strong>quarter labels</strong>
						<origam-chart-cartesian
								type="bar"
								:series="FIXTURE_QUARTER_SERIES"
								:categories="FIXTURE_QUARTERS"
								:height="260"
								data-cy="cartesian-categories-quarters"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — legendPosition (top / bottom / left / right)">
			<div
					class="story-shell"
					data-cy="cartesian-legend-position"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>top</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								legend-position="top"
								:height="260"
								data-cy="cartesian-legend-top"
						/>
					</div>
					<div class="story-col">
						<strong>bottom</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								legend-position="bottom"
								:height="260"
								data-cy="cartesian-legend-bottom"
						/>
					</div>
					<div class="story-col">
						<strong>left</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								legend-position="left"
								:height="260"
								data-cy="cartesian-legend-left"
						/>
					</div>
					<div class="story-col">
						<strong>right</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								legend-position="right"
								:height="260"
								data-cy="cartesian-legend-right"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — height">
			<div
					class="story-shell"
					data-cy="cartesian-height"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>height = 160</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="160"
								data-cy="cartesian-height-160"
						/>
					</div>
					<div class="story-col">
						<strong>height = 300</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="300"
								data-cy="cartesian-height-300"
						/>
					</div>
					<div class="story-col">
						<strong>height = 480</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="480"
								data-cy="cartesian-height-480"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showAxis / showGrid / showLegend / showTooltip">
			<div
					class="story-shell"
					data-cy="cartesian-chrome"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>all chrome on</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:show-axis="true"
								:show-grid="true"
								:show-legend="true"
								:show-tooltip="true"
								:height="260"
								data-cy="cartesian-chrome-on"
						/>
					</div>
					<div class="story-col">
						<strong>all chrome off</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:show-axis="false"
								:show-grid="false"
								:show-legend="false"
								:show-tooltip="false"
								:height="260"
								data-cy="cartesian-chrome-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="cartesian-slot-tooltip"
			>
				<p class="hint">Hover a data point to see the custom tooltip slot.</p>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="cartesian-slot-tooltip-chart"
				>
					<template #tooltip="{ point, series, category }">
						<div class="custom-tooltip">
							<strong>{{ series.name }}</strong>
							<span class="custom-tooltip__category">{{ category }}</span>
							<span class="custom-tooltip__value">${{ point.y }}k</span>
						</div>
					</template>
				</origam-chart-cartesian>
			</div>
		</Variant>

		<Variant title="Slot — legend-item">
			<div
					class="story-shell"
					data-cy="cartesian-slot-legend"
			>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="cartesian-slot-legend-chart"
				>
					<template #legend-item="{ series, visible }">
						<div class="custom-legend-item">
							<span
									class="custom-legend-item__dot"
									:style="{ backgroundColor: visible ? (series.color === 'primary' ? '#3b82f6' : '#10b981') : '#9ca3af' }"
							/>
							<span class="custom-legend-item__name">{{ series.name }}</span>
							<small class="custom-legend-item__state">{{ visible ? 'shown' : 'hidden' }}</small>
						</div>
					</template>
				</origam-chart-cartesian>
			</div>
		</Variant>

		<Variant title="Slot — title">
			<div
					class="story-shell"
					data-cy="cartesian-slot-title"
			>
				<origam-chart-cartesian
						type="area"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="cartesian-slot-title-chart"
				>
					<template #title>
						<div class="custom-title">
							<span class="custom-title__main">Sales pipeline</span>
							<span class="custom-title__badge">live</span>
						</div>
						<div class="custom-title__sub">Updated 2 minutes ago</div>
					</template>
				</origam-chart-cartesian>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="cartesian-slot-empty"
			>
				<origam-chart-cartesian
						type="line"
						:series="[]"
						:height="240"
						data-cy="cartesian-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							<strong>No data yet</strong>
							<small>Connect a data source to start charting.</small>
						</div>
					</template>
				</origam-chart-cartesian>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle">
			<div
					class="story-shell"
					data-cy="cartesian-emits"
			>
				<p class="hint">Click a data point or a legend entry — the emit payloads land below.</p>
				<origam-chart-cartesian
						type="column"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="cartesian-emits-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="cartesian-emits-log"
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

	import { OrigamChartCartesian } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const TYPE_OPTIONS = [
		{ value: 'line', label: 'line' },
		{ value: 'spline', label: 'spline' },
		{ value: 'stepped-line', label: 'stepped-line' },
		{ value: 'area', label: 'area' },
		{ value: 'bar', label: 'bar' },
		{ value: 'column', label: 'column' },
		{ value: 'scatter', label: 'scatter' },
		{ value: 'trend', label: 'trend' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const SMOOTHING_OPTIONS = [
		{ value: 'none', label: 'none' },
		{ value: 'curve', label: 'curve' }
	]

	const FIXTURE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const FIXTURE_QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4']

	const FIXTURE_SALES_SERIES: Array<IChartSeries> = [
		{ name: 'Sales 2025', data: [12, 18, 22, 19, 25, 32, 28, 33, 30, 36, 39, 42], color: 'primary' },
		{ name: 'Sales 2026', data: [16, 22, 25, 23, 30, 38, 35, 41, 39, 45, 48, 52], color: 'success' }
	]

	const FIXTURE_FIVE_SERIES: Array<IChartSeries> = [
		{ name: 'Product A', data: [10, 14, 18, 16, 22, 28, 25, 30, 33, 36, 38, 42], color: 'primary' },
		{ name: 'Product B', data: [6, 10, 14, 12, 18, 22, 19, 24, 28, 30, 32, 35], color: 'success' },
		{ name: 'Product C', data: [4, 6, 10, 9, 13, 16, 14, 18, 21, 23, 25, 28], color: 'warning' },
		{ name: 'Product D', data: [3, 5, 8, 7, 10, 13, 11, 15, 17, 19, 21, 23], color: 'danger' },
		{ name: 'Product E', data: [2, 3, 5, 4, 7, 9, 8, 11, 13, 15, 17, 19], color: 'info' }
	]

	const FIXTURE_QUARTER_SERIES: Array<IChartSeries> = [
		{ name: 'Revenue', data: [120, 185, 210, 250], color: 'primary' },
		{ name: 'Costs', data: [90, 130, 155, 175], color: 'danger' }
	]

	const FIXTURE_SCATTER: Array<IChartSeries> = [
		{
			name: 'Cohort A',
			data: [
				{ x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 7 },
				{ x: 5, y: 12 }, { x: 8, y: 9 }, { x: 13, y: 18 }
			],
			color: 'primary',
			type: 'scatter'
		},
		{
			name: 'Cohort B',
			data: [
				{ x: 2, y: 3 }, { x: 4, y: 6 }, { x: 6, y: 10 },
				{ x: 9, y: 14 }, { x: 12, y: 22 }
			],
			color: 'success',
			type: 'scatter'
		}
	]

	const logLines = ref<Array<string>>([])
	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → series="${point.seriesName}" x="${point.x}" y=${point.y}`)
	}
	const onLegendClick = (series: IChartSeries, index: number) => {
		appendLog(`legend-click → ${series.name} (index ${index})`)
	}
	const onSeriesToggle = (series: IChartSeries, visible: boolean) => {
		appendLog(`series-toggle → ${series.name} now ${visible ? 'visible' : 'hidden'}`)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
	}

	.story-grid {
		display: grid;
		gap: 16px;
	}

	.story-grid--2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.story-grid--3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
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

	.hint {
		margin: 0;
		font-size: 0.875rem;
		color: var(--origam-color-text-secondary, #6b7280);
	}

	.story-log {
		margin: 0;
		padding: 8px 12px;
		background-color: rgba(0, 0, 0, 0.04);
		border-radius: 6px;
		font-size: 0.75rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		white-space: pre-wrap;
		min-height: 80px;
	}

	.custom-tooltip {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px 12px;
		background-color: #111827;
		color: #ffffff;
		border-radius: 8px;
	}

	.custom-tooltip__category {
		font-size: 0.6875rem;
		opacity: 0.7;
	}

	.custom-tooltip__value {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.custom-legend-item {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 8px;
		border-radius: 999px;
		background-color: rgba(0, 0, 0, 0.05);
		font-size: 0.8125rem;
	}

	.custom-legend-item__dot {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 999px;
	}

	.custom-legend-item__state {
		opacity: 0.6;
	}

	.custom-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 1.125rem;
		font-weight: 700;
	}

	.custom-title__badge {
		font-size: 0.6875rem;
		padding: 2px 6px;
		border-radius: 4px;
		background-color: #22c55e;
		color: #ffffff;
	}

	.custom-title__sub {
		font-size: 0.75rem;
		color: #6b7280;
	}

	.custom-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 24px;
	}

	.custom-empty small {
		color: #6b7280;
	}
</style>
