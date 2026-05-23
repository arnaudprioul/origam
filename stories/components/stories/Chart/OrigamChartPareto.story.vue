<template>
	<Story
			group="components"
			title="Chart/OrigamChartPareto"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					animated: true,
					showLegend: true,
					showTooltip: true,
					showAxis: true,
					showGrid: true,
					showLine: true,
					showLabel: false,
					legendPosition: 'bottom',
					barGap: 4,
					barColor: 'primary',
					lineColor: 'danger'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="pareto-playground"
				>
					<origam-chart-pareto
							:series="FIXTURE_DEFECTS"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:show-axis="Boolean(state.showAxis)"
							:show-grid="Boolean(state.showGrid)"
							:show-line="Boolean(state.showLine)"
							:show-label="Boolean(state.showLabel)"
							:legend-position="state.legendPosition"
							:bar-gap="Number(state.barGap)"
							:bar-color="state.barColor"
							:line-color="state.lineColor"
							title="Defect Causes — Pareto Analysis"
							subtitle="Sorted by frequency (descending)"
							data-cy="pareto-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="pareto-playground-log"
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
				<HstText
						v-model="state.barColor"
						title="barColor"
				/>
				<HstText
						v-model="state.lineColor"
						title="lineColor"
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
						v-model="state.showLine"
						title="showLine"
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

		<Variant title="Prop — showLine (on/off)">
			<div
					class="story-shell"
					data-cy="pareto-showline"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>showLine = true (default)</strong>
						<origam-chart-pareto
								:series="FIXTURE_DEFECTS"
								:show-line="true"
								:height="300"
								title="showLine = true"
								data-cy="pareto-showline-on"
						/>
					</div>
					<div class="story-col">
						<strong>showLine = false (columns only)</strong>
						<origam-chart-pareto
								:series="FIXTURE_DEFECTS"
								:show-line="false"
								:height="300"
								title="showLine = false"
								data-cy="pareto-showline-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — barColor / lineColor (DS intents vs custom hex)">
			<div
					class="story-shell"
					data-cy="pareto-colors"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>intent: primary / danger (default)</strong>
						<origam-chart-pareto
								:series="FIXTURE_SALES"
								bar-color="primary"
								line-color="danger"
								:height="260"
								title="primary / danger"
								data-cy="pareto-colors-intent"
						/>
					</div>
					<div class="story-col">
						<strong>intent: success / warning</strong>
						<origam-chart-pareto
								:series="FIXTURE_SALES"
								bar-color="success"
								line-color="warning"
								:height="260"
								title="success / warning"
								data-cy="pareto-colors-success"
						/>
					</div>
					<div class="story-col">
						<strong>custom hex: #6366f1 / #f59e0b</strong>
						<origam-chart-pareto
								:series="FIXTURE_SALES"
								bar-color="#6366f1"
								line-color="#f59e0b"
								:height="260"
								title="custom hex"
								data-cy="pareto-colors-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showLabel">
			<div
					class="story-shell"
					data-cy="pareto-showlabel"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>showLabel = false (default)</strong>
						<origam-chart-pareto
								:series="FIXTURE_DEFECTS"
								:show-label="false"
								:height="300"
								title="showLabel = false"
								data-cy="pareto-label-off"
						/>
					</div>
					<div class="story-col">
						<strong>showLabel = true</strong>
						<origam-chart-pareto
								:series="FIXTURE_DEFECTS"
								:show-label="true"
								:height="300"
								title="showLabel = true"
								data-cy="pareto-label-on"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip (custom card showing share + cumulative)">
			<div
					class="story-shell"
					data-cy="pareto-slot-tooltip"
			>
				<origam-chart-pareto
						:series="FIXTURE_DEFECTS"
						:height="380"
						title="Custom tooltip — hover a column"
						data-cy="pareto-slot-tooltip-chart"
				>
					<template #tooltip="{ category, value, share, cumulative, color }">
						<div class="custom-tooltip">
							<div
									class="custom-tooltip__swatch"
									:style="{ background: color }"
							></div>
							<div class="custom-tooltip__content">
								<strong class="custom-tooltip__title">{{ category }}</strong>
								<dl class="custom-tooltip__data">
									<dt>Count</dt>
									<dd>{{ value }}</dd>
									<dt>Share</dt>
									<dd>{{ Math.round(share * 100) }}%</dd>
									<dt>Cumulative</dt>
									<dd>{{ Math.round(cumulative * 100) }}%</dd>
								</dl>
							</div>
						</div>
					</template>
				</origam-chart-pareto>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="pareto-slot-empty"
			>
				<origam-chart-pareto
						:series="[]"
						:height="300"
						title="Empty state"
						data-cy="pareto-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No defect data available for the selected period.
						</div>
					</template>
				</origam-chart-pareto>
			</div>
		</Variant>

		<Variant title="Emit — point-click on column">
			<div
					class="story-shell"
					data-cy="pareto-emit"
			>
				<origam-chart-pareto
						:series="FIXTURE_DEFECTS"
						:height="360"
						title="Click a column to emit point-click"
						data-cy="pareto-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="pareto-emit-log"
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

	import OrigamChartPareto from '@origam/components/Chart/OrigamChartPareto.vue'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import type { IChartParetoDatum } from '@origam/interfaces/Chart/chart-pareto.interface'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const DEFECT_DATA: Array<IChartParetoDatum> = [
		{ category: 'Bad welding', value: 89 },
		{ category: 'Wrong size', value: 66 },
		{ category: 'Loose fastener', value: 52 },
		{ category: 'Surface scratch', value: 41 },
		{ category: 'Bent frame', value: 28 },
		{ category: 'Misalignment', value: 19 },
		{ category: 'Paint chip', value: 14 },
		{ category: 'Cracking', value: 9 },
		{ category: 'Discoloration', value: 6 },
		{ category: 'Other', value: 4 }
	]

	const SALES_DATA: Array<IChartParetoDatum> = [
		{ category: 'North America', value: 480 },
		{ category: 'Europe', value: 320 },
		{ category: 'Asia', value: 210 },
		{ category: 'Latin America', value: 95 },
		{ category: 'Middle East', value: 60 },
		{ category: 'Africa', value: 35 }
	]

	const FIXTURE_DEFECTS: Array<IChartSeries> = [
		{ name: 'Defect causes', data: DEFECT_DATA as unknown as Array<number> }
	]

	const FIXTURE_SALES: Array<IChartSeries> = [
		{ name: 'Sales by region', data: SALES_DATA as unknown as Array<number> }
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
