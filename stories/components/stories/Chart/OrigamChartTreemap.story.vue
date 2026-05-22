<template>
	<Story
			group="components"
			title="Chart/OrigamChartTreemap"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					algorithm: 'squarified',
					height: 400,
					animated: true,
					showLegend: true,
					showTooltip: true,
					showLabel: true,
					legendPosition: 'bottom'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="treemap-playground"
				>
					<origam-chart-treemap
							:series="FIXTURE_TECH"
							:algorithm="state.algorithm"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:show-label="Boolean(state.showLabel)"
							:legend-position="state.legendPosition"
							title="Tech portfolio"
							subtitle="% allocation"
							data-cy="treemap-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="treemap-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.algorithm"
						title="algorithm"
						:options="ALGORITHM_OPTIONS"
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
						v-model="state.showLabel"
						title="showLabel"
				/>
			</template>
		</Variant>

		<Variant title="Prop — algorithm (squarified vs slice-dice)">
			<div
					class="story-shell"
					data-cy="treemap-algorithm"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>squarified (compact tiles)</strong>
						<origam-chart-treemap
								:series="FIXTURE_TECH"
								algorithm="squarified"
								:height="360"
								title="Squarified"
								data-cy="treemap-algorithm-squarified"
						/>
					</div>
					<div class="story-col">
						<strong>slice-dice (ordered rows)</strong>
						<origam-chart-treemap
								:series="FIXTURE_TECH"
								algorithm="slice-dice"
								:height="360"
								title="Slice-Dice"
								data-cy="treemap-algorithm-slice-dice"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (DS intents vs custom palette)">
			<div
					class="story-shell"
					data-cy="treemap-color-scheme"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default (intent cycle)</strong>
						<origam-chart-treemap
								:series="FIXTURE_TECH_NO_COLOR"
								:height="320"
								title="Intent palette"
								data-cy="treemap-color-intent"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS colors</strong>
						<origam-chart-treemap
								:series="FIXTURE_TECH_NO_COLOR"
								:color-scheme="['#0ea5e9','#06b6d4','#14b8a6','#10b981','#84cc16','#eab308','#f97316','#ef4444','#ec4899','#8b5cf6']"
								:height="320"
								title="Custom palette"
								data-cy="treemap-color-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showLabel (on / off)">
			<div
					class="story-shell"
					data-cy="treemap-show-label"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>showLabel = true</strong>
						<origam-chart-treemap
								:series="FIXTURE_BUDGET"
								:show-label="true"
								:height="320"
								title="Labels visible"
								data-cy="treemap-label-on"
						/>
					</div>
					<div class="story-col">
						<strong>showLabel = false</strong>
						<origam-chart-treemap
								:series="FIXTURE_BUDGET"
								:show-label="false"
								:height="320"
								title="Labels hidden"
								data-cy="treemap-label-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="treemap-slot-tooltip"
			>
				<origam-chart-treemap
						:series="FIXTURE_TECH"
						:height="400"
						title="Custom tooltip"
						data-cy="treemap-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category }}</strong>
							<span>{{ point?.y?.toLocaleString() }}%</span>
						</div>
					</template>
				</origam-chart-treemap>
			</div>
		</Variant>

		<Variant title="Slot — legend-item">
			<div
					class="story-shell"
					data-cy="treemap-slot-legend-item"
			>
				<origam-chart-treemap
						:series="FIXTURE_BUDGET"
						:height="380"
						title="Custom legend"
						data-cy="treemap-slot-legend-item-chart"
				>
					<template #legend-item="{ series, visible }">
						<span
								class="custom-legend-item"
								:style="{ opacity: visible ? 1 : 0.4 }"
						>
							{{ series.name }}
						</span>
					</template>
				</origam-chart-treemap>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="treemap-slot-empty"
			>
				<origam-chart-treemap
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="treemap-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No portfolio data available. Add assets to see the breakdown.
						</div>
					</template>
				</origam-chart-treemap>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle">
			<div
					class="story-shell"
					data-cy="treemap-emit"
			>
				<origam-chart-treemap
						:series="FIXTURE_BUDGET"
						:height="360"
						title="Interact with the chart"
						data-cy="treemap-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="treemap-emit-log"
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

	import { OrigamChartTreemap } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const ALGORITHM_OPTIONS = [
		{ value: 'squarified', label: 'squarified' },
		{ value: 'slice-dice', label: 'slice-dice' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_TECH: Array<IChartSeries> = [
		{
			name: 'Tech Portfolio',
			data: [
				{ name: 'AAPL', value: 25 },
				{ name: 'MSFT', value: 18 },
				{ name: 'GOOG', value: 14 },
				{ name: 'AMZN', value: 11 },
				{ name: 'NVDA', value: 9 },
				{ name: 'META', value: 7 },
				{ name: 'TSLA', value: 5 },
				{ name: 'ORCL', value: 4 },
				{ name: 'IBM', value: 4 },
				{ name: 'ADBE', value: 3 }
			] as Array<any>
		}
	]

	const FIXTURE_TECH_NO_COLOR: Array<IChartSeries> = [
		{
			name: 'Tech Portfolio',
			data: [
				{ name: 'AAPL', value: 25 },
				{ name: 'MSFT', value: 18 },
				{ name: 'GOOG', value: 14 },
				{ name: 'AMZN', value: 11 },
				{ name: 'NVDA', value: 9 },
				{ name: 'META', value: 7 },
				{ name: 'TSLA', value: 5 },
				{ name: 'ORCL', value: 4 },
				{ name: 'IBM', value: 4 },
				{ name: 'ADBE', value: 3 }
			] as Array<any>
		}
	]

	const FIXTURE_BUDGET: Array<IChartSeries> = [
		{
			name: 'Budget',
			data: [
				{ name: 'Engineering', value: 42 },
				{ name: 'Marketing', value: 22 },
				{ name: 'Sales', value: 18 },
				{ name: 'Support', value: 11 },
				{ name: 'Ops', value: 7 }
			] as Array<any>
		}
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
		gap: 2px;
		padding: 4px;
	}

	.custom-legend-item {
		font-size: 0.8125rem;
		padding: 2px 4px;
		cursor: pointer;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
		text-align: center;
		max-width: 280px;
	}
</style>
