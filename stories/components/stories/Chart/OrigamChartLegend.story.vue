<template>
	<Story
			group="components"
			title="Chart/OrigamChartLegend"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					position: 'bottom'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="legend-playground"
				>
					<div
							class="legend-host"
							:class="`legend-host--${state.position}`"
					>
						<origam-chart-legend
								:items="ITEMS_3"
								:position="state.position"
								data-cy="legend-playground-legend"
								@legend-click="onLegendClick"
								@series-toggle="onSeriesToggle"
						/>
					</div>
					<pre
							class="story-log"
							data-cy="legend-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.position"
						title="position"
						:options="POSITION_OPTIONS"
				/>
			</template>
		</Variant>

		<Variant title="Prop — position (top / bottom / left / right)">
			<div
					class="story-shell"
					data-cy="legend-position"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>top</strong>
						<div class="legend-host legend-host--top">
							<origam-chart-legend
									:items="ITEMS_3"
									position="top"
									data-cy="legend-position-top"
							/>
						</div>
					</div>
					<div class="story-col">
						<strong>bottom</strong>
						<div class="legend-host legend-host--bottom">
							<origam-chart-legend
									:items="ITEMS_3"
									position="bottom"
									data-cy="legend-position-bottom"
							/>
						</div>
					</div>
					<div class="story-col">
						<strong>left</strong>
						<div class="legend-host legend-host--left">
							<origam-chart-legend
									:items="ITEMS_3"
									position="left"
									data-cy="legend-position-left"
							/>
						</div>
					</div>
					<div class="story-col">
						<strong>right</strong>
						<div class="legend-host legend-host--right">
							<origam-chart-legend
									:items="ITEMS_3"
									position="right"
									data-cy="legend-position-right"
							/>
						</div>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — items (1 / 3 / 7 series)">
			<div
					class="story-shell"
					data-cy="legend-items-count"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>1 item</strong>
						<div class="legend-host legend-host--bottom">
							<origam-chart-legend
									:items="ITEMS_1"
									position="bottom"
									data-cy="legend-items-1"
							/>
						</div>
					</div>
					<div class="story-col">
						<strong>3 items</strong>
						<div class="legend-host legend-host--bottom">
							<origam-chart-legend
									:items="ITEMS_3"
									position="bottom"
									data-cy="legend-items-3"
							/>
						</div>
					</div>
					<div class="story-col">
						<strong>7 items</strong>
						<div class="legend-host legend-host--bottom">
							<origam-chart-legend
									:items="ITEMS_7"
									position="bottom"
									data-cy="legend-items-7"
							/>
						</div>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — legend-item">
			<div
					class="story-shell"
					data-cy="legend-slot-item"
			>
				<p class="hint">Custom legend-item slot: displays colour chip, series name, and a metadata badge.</p>
				<div class="legend-host legend-host--bottom">
					<origam-chart-legend
							:items="ITEMS_3"
							position="bottom"
							data-cy="legend-slot-item-legend"
					>
						<template #legend-item="{ series, visible, index }">
							<div class="custom-legend-item">
								<span
										class="custom-legend-item__swatch"
										:style="{ backgroundColor: COLORS[index] ?? '#9ca3af', opacity: visible ? 1 : 0.4 }"
								/>
								<span
										class="custom-legend-item__name"
										:class="{ 'custom-legend-item__name--hidden': !visible }"
								>
									{{ series.name }}
								</span>
								<span class="custom-legend-item__badge">{{ index + 1 }}</span>
							</div>
						</template>
					</origam-chart-legend>
				</div>
			</div>
		</Variant>

		<Variant title="Emit — legend-click">
			<div
					class="story-shell"
					data-cy="legend-emit-click"
			>
				<p class="hint">Click any legend item — the legend-click emit fires with the series and its index.</p>
				<div class="legend-host legend-host--bottom">
					<origam-chart-legend
							:items="ITEMS_3"
							position="bottom"
							data-cy="legend-emit-click-legend"
							@legend-click="onLegendClick"
					/>
				</div>
				<pre
						class="story-log"
						data-cy="legend-emit-click-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Emit — series-toggle">
			<div
					class="story-shell"
					data-cy="legend-emit-toggle"
			>
				<p class="hint">Click to toggle visibility — series-toggle fires with the resulting boolean.</p>
				<div class="legend-host legend-host--bottom">
					<origam-chart-legend
							:items="ITEMS_3"
							position="bottom"
							data-cy="legend-emit-toggle-legend"
							@series-toggle="onSeriesToggle"
					/>
				</div>
				<pre
						class="story-log"
						data-cy="legend-emit-toggle-log"
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

	import { OrigamChartLegend } from '@origam/components'

	import type { IChartLegendItem, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316']

	const makeSeries = (name: string): IChartSeries => ({ name, data: [] })

	const ITEMS_1: Array<IChartLegendItem> = [
		{ series: makeSeries('Revenue'), index: 0, color: COLORS[0], visible: true }
	]

	const ITEMS_3: Array<IChartLegendItem> = [
		{ series: makeSeries('Sales 2025'), index: 0, color: COLORS[0], visible: true },
		{ series: makeSeries('Sales 2026'), index: 1, color: COLORS[1], visible: true },
		{ series: makeSeries('Target'), index: 2, color: COLORS[2], visible: true }
	]

	const ITEMS_7: Array<IChartLegendItem> = [
		{ series: makeSeries('Product A'), index: 0, color: COLORS[0], visible: true },
		{ series: makeSeries('Product B'), index: 1, color: COLORS[1], visible: true },
		{ series: makeSeries('Product C'), index: 2, color: COLORS[2], visible: true },
		{ series: makeSeries('Product D'), index: 3, color: COLORS[3], visible: true },
		{ series: makeSeries('Product E'), index: 4, color: COLORS[4], visible: true },
		{ series: makeSeries('Product F'), index: 5, color: COLORS[5], visible: true },
		{ series: makeSeries('Product G'), index: 6, color: COLORS[6], visible: true }
	]

	const logLines = ref<Array<string>>([])
	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onLegendClick = (series: IChartSeries, index: number) => {
		appendLog(`legend-click → "${series.name}" (index ${index})`)
	}
	const onSeriesToggle = (series: IChartSeries, visible: boolean) => {
		appendLog(`series-toggle → "${series.name}" now ${visible ? 'visible' : 'hidden'}`)
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

	.legend-host {
		display: flex;
		border: 1px dashed var(--origam-color-border-subtle, #e5e7eb);
		border-radius: 6px;
		padding: 12px;
		min-height: 48px;
	}

	.legend-host--top,
	.legend-host--bottom {
		justify-content: center;
	}

	.legend-host--left {
		justify-content: flex-start;
	}

	.legend-host--right {
		justify-content: flex-end;
	}

	.custom-legend-item {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border-radius: 999px;
		background-color: rgba(0, 0, 0, 0.04);
		font-size: 0.8125rem;
		cursor: pointer;
		user-select: none;
	}

	.custom-legend-item__swatch {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 3px;
		flex-shrink: 0;
	}

	.custom-legend-item__name {
		font-weight: 500;
	}

	.custom-legend-item__name--hidden {
		opacity: 0.4;
		text-decoration: line-through;
	}

	.custom-legend-item__badge {
		font-size: 0.625rem;
		padding: 1px 5px;
		border-radius: 999px;
		background-color: rgba(0, 0, 0, 0.08);
		font-weight: 600;
	}
</style>
