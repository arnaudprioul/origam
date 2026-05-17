<template>
	<Story
			group="components"
			title="Chart/OrigamChart"
	>
		<Variant
				title="Playground"
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
						data-cy="chart-playground"
				>
					<origam-chart
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
							data-cy="chart-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="chart-playground-log"
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

		<Variant title="Prop — type (8 primitives)">
			<div
					class="story-shell"
					data-cy="chart-types"
			>
				<p class="hint">
					One component, eight visualisation primitives. Switch via the
					<code>type</code> prop; the rest of the API is shared.
				</p>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>line</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-line"
						/>
					</div>
					<div class="story-col">
						<strong>area</strong>
						<origam-chart
								type="area"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-area"
						/>
					</div>
					<div class="story-col">
						<strong>column</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-column"
						/>
					</div>
					<div class="story-col">
						<strong>bar</strong>
						<origam-chart
								type="bar"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-bar"
						/>
					</div>
					<div class="story-col">
						<strong>pie</strong>
						<origam-chart
								type="pie"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="240"
								data-cy="chart-type-pie"
						/>
					</div>
					<div class="story-col">
						<strong>donut</strong>
						<origam-chart
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="240"
								data-cy="chart-type-donut"
						/>
					</div>
					<div class="story-col">
						<strong>scatter</strong>
						<origam-chart
								type="scatter"
								:series="FIXTURE_SCATTER"
								:height="240"
								data-cy="chart-type-scatter"
						/>
					</div>
					<div class="story-col">
						<strong>radar</strong>
						<origam-chart
								type="radar"
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								:height="240"
								data-cy="chart-type-radar"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — series (1 vs 2 vs 5 series)">
			<div
					class="story-shell"
					data-cy="chart-series-count"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>1 series</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_SALES_SERIES.slice(0, 1)"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-series-1"
						/>
					</div>
					<div class="story-col">
						<strong>2 series</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-series-2"
						/>
					</div>
					<div class="story-col">
						<strong>5 series</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-series-5"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — stacked (column)">
			<div
					class="story-shell"
					data-cy="chart-stacked"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>stacked = false</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:stacked="false"
								:height="280"
								data-cy="chart-stacked-off"
						/>
					</div>
					<div class="story-col">
						<strong>stacked = true</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:stacked="true"
								:height="280"
								data-cy="chart-stacked-on"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (palettes)">
			<div
					class="story-shell"
					data-cy="chart-palette"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>primary palette (default)</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-palette-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS palette</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:color-scheme="['#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#0ea5e9']"
								:height="240"
								data-cy="chart-palette-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip (custom card)">
			<div
					class="story-shell"
					data-cy="chart-slot-tooltip"
			>
				<p class="hint">
					Hover a data point to see the custom tooltip slot. The default tooltip
					renders a single coloured row; this slot replaces it with a richer card.
				</p>
				<origam-chart
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="chart-slot-tooltip-chart"
				>
					<template #tooltip="{ point, series, category }">
						<div class="custom-tooltip">
							<strong>{{ series.name }}</strong>
							<span class="custom-tooltip__category">{{ category }}</span>
							<span class="custom-tooltip__value">${{ point.y }}k</span>
						</div>
					</template>
				</origam-chart>
			</div>
		</Variant>

		<Variant title="Slot — legend-item (custom)">
			<div
					class="story-shell"
					data-cy="chart-slot-legend"
			>
				<origam-chart
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="chart-slot-legend-chart"
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
				</origam-chart>
			</div>
		</Variant>

		<Variant title="Slot — title (with subtitle + badge)">
			<div
					class="story-shell"
					data-cy="chart-slot-title"
			>
				<origam-chart
						type="area"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="chart-slot-title-chart"
				>
					<template #title>
						<div class="custom-title">
							<span class="custom-title__main">Sales pipeline</span>
							<span class="custom-title__badge">live</span>
						</div>
						<div class="custom-title__sub">
							Updated 2 minutes ago
						</div>
					</template>
				</origam-chart>
			</div>
		</Variant>

		<Variant title="Slot — empty (custom CTA)">
			<div
					class="story-shell"
					data-cy="chart-slot-empty"
			>
				<origam-chart
						type="line"
						:series="[]"
						:height="240"
						data-cy="chart-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							<strong>No data yet</strong>
							<small>Connect a data source to start charting.</small>
						</div>
					</template>
				</origam-chart>
			</div>
		</Variant>

		<Variant title="Emit — point-click + legend-click">
			<div
					class="story-shell"
					data-cy="chart-emits"
			>
				<p class="hint">
					Click a data point or a legend entry — the emit payloads land below.
				</p>
				<origam-chart
						type="column"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="chart-emits-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="chart-emits-log"
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

	import { OrigamChart } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const TYPE_OPTIONS = [
		{ value: 'line', label: 'line' },
		{ value: 'area', label: 'area' },
		{ value: 'bar', label: 'bar' },
		{ value: 'column', label: 'column' },
		{ value: 'pie', label: 'pie' },
		{ value: 'donut', label: 'donut' },
		{ value: 'scatter', label: 'scatter' },
		{ value: 'radar', label: 'radar' }
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

	const FIXTURE_COUNTRIES = ['US', 'France', 'Germany', 'Japan', 'Brazil']
	const FIXTURE_REVENUE_PIE: Array<IChartSeries> = [
		{
			name: 'Revenue',
			data: [120, 80, 60, 45, 25],
			type: 'pie'
		}
	]

	const FIXTURE_SCATTER: Array<IChartSeries> = [
		{
			name: 'Cohort A',
			data: [
				{ x: 1, y: 5 },
				{ x: 2, y: 8 },
				{ x: 3, y: 7 },
				{ x: 5, y: 12 },
				{ x: 8, y: 9 },
				{ x: 13, y: 18 }
			],
			color: 'primary',
			type: 'scatter'
		},
		{
			name: 'Cohort B',
			data: [
				{ x: 2, y: 3 },
				{ x: 4, y: 6 },
				{ x: 6, y: 10 },
				{ x: 9, y: 14 },
				{ x: 12, y: 22 }
			],
			color: 'success',
			type: 'scatter'
		}
	]

	const FIXTURE_RADAR_AXES = ['Speed', 'Power', 'Agility', 'Stamina', 'Skill', 'Defence']
	const FIXTURE_RADAR: Array<IChartSeries> = [
		{ name: 'Player A', data: [80, 65, 75, 90, 70, 60], color: 'primary', type: 'radar' },
		{ name: 'Player B', data: [55, 85, 60, 70, 90, 80], color: 'success', type: 'radar' }
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
