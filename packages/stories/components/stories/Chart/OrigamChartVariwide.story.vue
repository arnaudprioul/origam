<template>
	<Story
			group="components"
			title="Chart/OrigamChartVariwide"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					animated: true,
					showLegend: false,
					showTooltip: true,
					showAxis: true,
					showGrid: true,
					showLabel: true,
					legendPosition: 'bottom',
					barGap: 2
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="variwide-playground"
				>
					<origam-chart-variwide
							:series="FIXTURE_GDP_POP"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:show-axis="Boolean(state.showAxis)"
							:show-grid="Boolean(state.showGrid)"
							:show-label="Boolean(state.showLabel)"
							:legend-position="state.legendPosition"
							:bar-gap="Number(state.barGap)"
							title="GDP × Population (2023)"
							subtitle="Width = population (M) · Height = GDP (T$)"
							data-cy="variwide-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="variwide-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstNumber
						v-model="state.barGap"
						title="barGap (px)"
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
						v-model="state.showLabel"
						title="showLabel"
				/>
				<HstCheckbox
						v-model="state.showAxis"
						title="showAxis"
				/>
				<HstCheckbox
						v-model="state.showGrid"
						title="showGrid"
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

		<Variant title="Prop — barGap (0 vs 8)">
			<div
					class="story-shell"
					data-cy="variwide-bargap"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>barGap = 0 (flush columns)</strong>
						<origam-chart-variwide
								:series="FIXTURE_GDP_POP"
								:bar-gap="0"
								:height="300"
								title="barGap = 0"
								data-cy="variwide-bargap-0"
						/>
					</div>
					<div class="story-col">
						<strong>barGap = 8 (spaced columns)</strong>
						<origam-chart-variwide
								:series="FIXTURE_GDP_POP"
								:bar-gap="8"
								:height="300"
								title="barGap = 8"
								data-cy="variwide-bargap-8"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showLabel / showAxis / showGrid">
			<div
					class="story-shell"
					data-cy="variwide-labels"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>showLabel = true (default)</strong>
						<origam-chart-variwide
								:series="FIXTURE_GDP_POP"
								:show-label="true"
								:height="260"
								data-cy="variwide-label-on"
						/>
					</div>
					<div class="story-col">
						<strong>showLabel = false</strong>
						<origam-chart-variwide
								:series="FIXTURE_GDP_POP"
								:show-label="false"
								:height="260"
								data-cy="variwide-label-off"
						/>
					</div>
					<div class="story-col">
						<strong>showAxis + showGrid = false</strong>
						<origam-chart-variwide
								:series="FIXTURE_GDP_POP"
								:show-axis="false"
								:show-grid="false"
								:height="260"
								data-cy="variwide-noaxis"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="variwide-color-scheme"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>default intent cycle</strong>
						<origam-chart-variwide
								:series="FIXTURE_GDP_POP_NO_COLOR"
								:height="260"
								data-cy="variwide-color-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom hex palette</strong>
						<origam-chart-variwide
								:series="FIXTURE_GDP_POP_NO_COLOR"
								:color-scheme="['#6366f1','#8b5cf6','#a78bfa','#f59e0b','#10b981','#ef4444']"
								:height="260"
								data-cy="variwide-color-custom"
						/>
					</div>
					<div class="story-col">
						<strong>per-datum color override</strong>
						<origam-chart-variwide
								:series="FIXTURE_REVENUE_MARKET_SHARE"
								:height="260"
								data-cy="variwide-color-per-datum"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip (custom card showing both encodings)">
			<div
					class="story-shell"
					data-cy="variwide-slot-tooltip"
			>
				<origam-chart-variwide
						:series="FIXTURE_GDP_POP"
						:height="360"
						title="Custom tooltip — hover a column"
						data-cy="variwide-slot-tooltip-chart"
				>
					<template #tooltip="{ category, value, widthValue, formattedValue, formattedWidth, color }">
						<div class="custom-tooltip">
							<div
									class="custom-tooltip__swatch"
									:style="{ background: color }"
							></div>
							<div class="custom-tooltip__content">
								<strong class="custom-tooltip__title">{{ category }}</strong>
								<dl class="custom-tooltip__data">
									<dt>GDP</dt>
									<dd>{{ formattedValue }} T$</dd>
									<dt>Population</dt>
									<dd>{{ widthValue }} M</dd>
								</dl>
							</div>
						</div>
					</template>
				</origam-chart-variwide>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="variwide-slot-empty"
			>
				<origam-chart-variwide
						:series="[]"
						:height="300"
						title="Empty state"
						data-cy="variwide-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No data available for the selected period.
						</div>
					</template>
				</origam-chart-variwide>
			</div>
		</Variant>

		<Variant title="Emit — point-click on column">
			<div
					class="story-shell"
					data-cy="variwide-emit"
			>
				<origam-chart-variwide
						:series="FIXTURE_GDP_POP"
						:height="360"
						title="Click a column"
						data-cy="variwide-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="variwide-emit-log"
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

	import { OrigamChartVariwide } from '@origam/components'

	import type { IChartPoint, IChartSeries, IChartVariwideDatum } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const GDP_POP_DATA: Array<IChartVariwideDatum> = [
		{ category: 'US', value: 23, width: 331 },
		{ category: 'China', value: 18, width: 1411 },
		{ category: 'Germany', value: 4.2, width: 83 },
		{ category: 'Japan', value: 4.9, width: 125 },
		{ category: 'India', value: 3.5, width: 1393 },
		{ category: 'UK', value: 3.1, width: 67 }
	]

	const FIXTURE_GDP_POP: Array<IChartSeries> = [
		{ name: 'GDP × Population', data: GDP_POP_DATA as unknown as Array<number> }
	]

	const FIXTURE_GDP_POP_NO_COLOR: Array<IChartSeries> = [
		{ name: 'GDP × Population', data: GDP_POP_DATA as unknown as Array<number> }
	]

	const REVENUE_DATA: Array<IChartVariwideDatum> = [
		{ category: 'Phone', value: 120, width: 38, color: 'primary' },
		{ category: 'Laptop', value: 95, width: 22, color: 'success' },
		{ category: 'Tablet', value: 42, width: 15, color: 'warning' },
		{ category: 'Watch', value: 28, width: 14, color: 'danger' },
		{ category: 'Earbuds', value: 18, width: 11, color: 'info' }
	]

	const FIXTURE_REVENUE_MARKET_SHARE: Array<IChartSeries> = [
		{ name: 'Revenue × Market share', data: REVENUE_DATA as unknown as Array<number> }
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

	.custom-tooltip {
		display: flex;
		gap: 10px;
		padding: 4px;
		align-items: flex-start;
	}

	.custom-tooltip__swatch {
		width: 12px;
		height: 12px;
		border-radius: 3px;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.custom-tooltip__content {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.custom-tooltip__title {
		font-size: 0.875rem;
	}

	.custom-tooltip__data {
		margin: 0;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2px 8px;
		font-size: 0.8125rem;
	}

	.custom-tooltip__data dt {
		color: var(--origam-color-text-secondary, #9ca3af);
	}

	.custom-tooltip__data dd {
		margin: 0;
		font-weight: 600;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
