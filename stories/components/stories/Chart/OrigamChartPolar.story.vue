<template>
	<Story
			group="components"
			title="Chart/OrigamChartPolar"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					type: 'pie',
					height: 360,
					donutHoleSize: 0.6,
					animated: true,
					legendPosition: 'bottom',
					showLegend: true,
					showTooltip: true
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="polar-playground"
				>
					<origam-chart-polar
							:type="state.type"
							:series="FIXTURE_REVENUE_PIE"
							:categories="FIXTURE_COUNTRIES"
							:height="Number(state.height)"
							:donut-hole-size="Number(state.donutHoleSize)"
							:animated="Boolean(state.animated)"
							:legend-position="state.legendPosition"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							title="Revenue by region"
							subtitle="2026 fiscal year"
							data-cy="polar-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="polar-playground-log"
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
				<HstNumber
						v-model="state.donutHoleSize"
						title="donutHoleSize (0–1)"
				/>
				<HstSelect
						v-model="state.legendPosition"
						title="legendPosition"
						:options="LEGEND_POSITION_OPTIONS"
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
			</template>
		</Variant>

		<Variant title="Prop — type (pie)">
			<div
					class="story-shell"
					data-cy="polar-type-pie"
			>
				<origam-chart-polar
						type="pie"
						:series="FIXTURE_REVENUE_PIE"
						:categories="FIXTURE_COUNTRIES"
						:height="320"
						title="Pie chart"
						data-cy="polar-chart-pie"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (donut)">
			<div
					class="story-shell"
					data-cy="polar-type-donut"
			>
				<origam-chart-polar
						type="donut"
						:series="FIXTURE_REVENUE_PIE"
						:categories="FIXTURE_COUNTRIES"
						:height="320"
						title="Donut chart"
						data-cy="polar-chart-donut"
				/>
			</div>
		</Variant>

		<Variant title="Prop — donutHoleSize (0.3 / 0.5 / 0.7 / 0.85)">
			<div
					class="story-shell"
					data-cy="polar-donut-hole"
			>
				<div class="story-grid story-grid--4">
					<div class="story-col">
						<strong>0.3 (thin ring)</strong>
						<origam-chart-polar
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:donut-hole-size="0.3"
								:show-legend="false"
								:height="200"
								data-cy="polar-hole-03"
						/>
					</div>
					<div class="story-col">
						<strong>0.5</strong>
						<origam-chart-polar
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:donut-hole-size="0.5"
								:show-legend="false"
								:height="200"
								data-cy="polar-hole-05"
						/>
					</div>
					<div class="story-col">
						<strong>0.7 (default)</strong>
						<origam-chart-polar
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:donut-hole-size="0.7"
								:show-legend="false"
								:height="200"
								data-cy="polar-hole-07"
						/>
					</div>
					<div class="story-col">
						<strong>0.85 (wide ring)</strong>
						<origam-chart-polar
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:donut-hole-size="0.85"
								:show-legend="false"
								:height="200"
								data-cy="polar-hole-085"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — series (5 / 8 / 12 slices)">
			<div
					class="story-shell"
					data-cy="polar-series-slices"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>5 slices</strong>
						<origam-chart-polar
								type="pie"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="240"
								data-cy="polar-slices-5"
						/>
					</div>
					<div class="story-col">
						<strong>8 slices</strong>
						<origam-chart-polar
								type="pie"
								:series="FIXTURE_PIE_8"
								:categories="FIXTURE_REGIONS_8"
								:height="240"
								data-cy="polar-slices-8"
						/>
					</div>
					<div class="story-col">
						<strong>12 slices</strong>
						<origam-chart-polar
								type="pie"
								:series="FIXTURE_PIE_12"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="polar-slices-12"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="polar-color-scheme"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default palette</strong>
						<origam-chart-polar
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="280"
								data-cy="polar-palette-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS palette</strong>
						<origam-chart-polar
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:color-scheme="['#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#0ea5e9']"
								:height="280"
								data-cy="polar-palette-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — legendPosition">
			<div
					class="story-shell"
					data-cy="polar-legend-position"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>top</strong>
						<origam-chart-polar
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								legend-position="top"
								:height="260"
								data-cy="polar-legend-top"
						/>
					</div>
					<div class="story-col">
						<strong>right</strong>
						<origam-chart-polar
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								legend-position="right"
								:height="260"
								data-cy="polar-legend-right"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — height">
			<div
					class="story-shell"
					data-cy="polar-height"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>200px</strong>
						<origam-chart-polar
								type="pie"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="200"
								:show-legend="false"
								data-cy="polar-height-200"
						/>
					</div>
					<div class="story-col">
						<strong>320px</strong>
						<origam-chart-polar
								type="pie"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="320"
								:show-legend="false"
								data-cy="polar-height-320"
						/>
					</div>
					<div class="story-col">
						<strong>480px</strong>
						<origam-chart-polar
								type="pie"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="480"
								:show-legend="false"
								data-cy="polar-height-480"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="polar-slot-tooltip"
			>
				<p class="hint">Hover a slice to see the custom tooltip slot.</p>
				<origam-chart-polar
						type="donut"
						:series="FIXTURE_REVENUE_PIE"
						:categories="FIXTURE_COUNTRIES"
						:height="320"
						data-cy="polar-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category }}</strong>
							<span class="custom-tooltip__value">${{ point.y }}M</span>
						</div>
					</template>
				</origam-chart-polar>
			</div>
		</Variant>

		<Variant title="Slot — legend-item">
			<div
					class="story-shell"
					data-cy="polar-slot-legend"
			>
				<origam-chart-polar
						type="pie"
						:series="FIXTURE_REVENUE_PIE"
						:categories="FIXTURE_COUNTRIES"
						:height="320"
						data-cy="polar-slot-legend-chart"
				>
					<template #legend-item="{ series, visible, index }">
						<div class="custom-legend-item">
							<span
									class="custom-legend-item__dot"
									:style="{ backgroundColor: visible ? '#3b82f6' : '#9ca3af' }"
							/>
							<span class="custom-legend-item__name">{{ FIXTURE_COUNTRIES[index] }}</span>
							<small class="custom-legend-item__state">{{ visible ? 'on' : 'off' }}</small>
						</div>
					</template>
				</origam-chart-polar>
			</div>
		</Variant>

		<Variant title="Slot — title">
			<div
					class="story-shell"
					data-cy="polar-slot-title"
			>
				<origam-chart-polar
						type="donut"
						:series="FIXTURE_REVENUE_PIE"
						:categories="FIXTURE_COUNTRIES"
						:height="320"
						data-cy="polar-slot-title-chart"
				>
					<template #title>
						<div class="custom-title">
							<span class="custom-title__main">Revenue breakdown</span>
							<span class="custom-title__badge">Q4</span>
						</div>
					</template>
				</origam-chart-polar>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="polar-slot-empty"
			>
				<origam-chart-polar
						type="pie"
						:series="[]"
						:height="240"
						data-cy="polar-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							<strong>No slices</strong>
							<small>Add data to see the chart.</small>
						</div>
					</template>
				</origam-chart-polar>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle">
			<div
					class="story-shell"
					data-cy="polar-emits"
			>
				<p class="hint">Click a slice or a legend entry — the emit payloads land below.</p>
				<origam-chart-polar
						type="donut"
						:series="FIXTURE_REVENUE_PIE"
						:categories="FIXTURE_COUNTRIES"
						:height="320"
						data-cy="polar-emits-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="polar-emits-log"
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

	import { OrigamChartPolar } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const TYPE_OPTIONS = [
		{ value: 'pie', label: 'pie' },
		{ value: 'donut', label: 'donut' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const FIXTURE_COUNTRIES = ['US', 'France', 'Germany', 'Japan', 'Brazil']

	const FIXTURE_REGIONS_8 = ['US', 'France', 'Germany', 'Japan', 'Brazil', 'UK', 'Canada', 'Australia']

	const FIXTURE_REVENUE_PIE: Array<IChartSeries> = [
		{ name: 'Revenue', data: [120, 80, 60, 45, 25] }
	]

	const FIXTURE_PIE_8: Array<IChartSeries> = [
		{ name: 'Revenue', data: [120, 80, 60, 45, 25, 38, 52, 30] }
	]

	const FIXTURE_PIE_12: Array<IChartSeries> = [
		{ name: 'Revenue', data: [42, 55, 63, 49, 70, 88, 76, 90, 82, 95, 100, 112] }
	]

	const logLines = ref<Array<string>>([])
	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → category="${point.x}" value=${point.y}`)
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

	.story-grid--4 {
		grid-template-columns: repeat(4, minmax(0, 1fr));
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
		background-color: #3b82f6;
		color: #ffffff;
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
