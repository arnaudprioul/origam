<template>
	<Story
			group="components"
			title="Chart/OrigamChartHoneycomb"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					orientation: 'pointy-top',
					colorMode: 'categorical',
					showLabel: true,
					showLegend: true,
					legendPosition: 'bottom',
					showTooltip: true,
					animated: true,
					tileSize: 30,
					tileGap: 2
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="honeycomb-playground"
				>
					<origam-chart-honeycomb
							:orientation="state.orientation"
							:color-mode="state.colorMode"
							:series="FIXTURE_3X3"
							:height="Number(state.height) || 400"
							:tile-size="Number(state.tileSize)"
							:tile-gap="Number(state.tileGap)"
							:show-label="Boolean(state.showLabel)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:legend-position="state.legendPosition"
							:animated="Boolean(state.animated)"
							title="Hex tile grid"
							subtitle="3×3 categorical"
							data-cy="honeycomb-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="honeycomb-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.orientation"
						title="orientation"
						:options="ORIENTATION_OPTIONS"
				/>
				<HstSelect
						v-model="state.colorMode"
						title="colorMode"
						:options="COLOR_MODE_OPTIONS"
				/>
				<HstSelect
						v-model="state.legendPosition"
						title="legendPosition"
						:options="LEGEND_POSITION_OPTIONS"
				/>
				<HstNumber
						v-model="state.tileSize"
						title="tileSize"
				/>
				<HstNumber
						v-model="state.tileGap"
						title="tileGap"
				/>
				<HstCheckbox
						v-model="state.showLabel"
						title="showLabel"
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
						v-model="state.animated"
						title="animated"
				/>
			</template>
		</Variant>

		<Variant title="Prop — orientation (pointy-top vs flat-top side by side)">
			<div
					class="story-shell"
					data-cy="honeycomb-orientation"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>pointy-top (default)</strong>
						<origam-chart-honeycomb
								orientation="pointy-top"
								:series="FIXTURE_3X3"
								:height="360"
								title="Pointy-top"
								data-cy="honeycomb-orientation-pointy"
						/>
					</div>
					<div class="story-col">
						<strong>flat-top</strong>
						<origam-chart-honeycomb
								orientation="flat-top"
								:series="FIXTURE_3X3"
								:height="360"
								title="Flat-top"
								data-cy="honeycomb-orientation-flat"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorMode (categorical vs heatmap side by side)">
			<div
					class="story-shell"
					data-cy="honeycomb-color-mode"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>categorical</strong>
						<origam-chart-honeycomb
								color-mode="categorical"
								:series="FIXTURE_HEATMAP"
								:height="360"
								:show-label="true"
								title="Categorical"
								data-cy="honeycomb-color-mode-categorical"
						/>
					</div>
					<div class="story-col">
						<strong>heatmap</strong>
						<origam-chart-honeycomb
								color-mode="heatmap"
								:series="FIXTURE_HEATMAP"
								:heatmap-color-range="['info', 'danger']"
								:height="360"
								:show-label="true"
								title="Heatmap"
								data-cy="honeycomb-color-mode-heatmap"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (DS intents vs custom palette)">
			<div
					class="story-shell"
					data-cy="honeycomb-color-scheme"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>DS intent cycle</strong>
						<origam-chart-honeycomb
								color-mode="categorical"
								:series="FIXTURE_3X3_NO_COLOR"
								:height="300"
								title="Intent cycle"
								data-cy="honeycomb-color-scheme-intents"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS palette</strong>
						<origam-chart-honeycomb
								color-mode="categorical"
								:series="FIXTURE_3X3_NO_COLOR"
								:color-scheme="['#6366f1', '#8b5cf6', '#a78bfa', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6']"
								:height="300"
								title="Custom palette"
								data-cy="honeycomb-color-scheme-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — tileSize / tileGap (compact vs spaced)">
			<div
					class="story-shell"
					data-cy="honeycomb-tile-sizing"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>compact (size=20, gap=1)</strong>
						<origam-chart-honeycomb
								:tile-size="20"
								:tile-gap="1"
								:series="FIXTURE_US_STATES"
								:height="300"
								:show-label="true"
								title="Compact US states"
								data-cy="honeycomb-tile-compact"
						/>
					</div>
					<div class="story-col">
						<strong>spaced (size=40, gap=6)</strong>
						<origam-chart-honeycomb
								:tile-size="40"
								:tile-gap="6"
								:series="FIXTURE_3X3"
								:height="300"
								:show-label="true"
								title="Spaced 3×3"
								data-cy="honeycomb-tile-spaced"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip (custom card)">
			<div
					class="story-shell"
					data-cy="honeycomb-slot-tooltip"
			>
				<origam-chart-honeycomb
						:series="FIXTURE_HEATMAP"
						color-mode="heatmap"
						:height="360"
						title="Custom tooltip"
						data-cy="honeycomb-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category || point?.x }}</strong>
							<span>Value: {{ point?.y }}</span>
						</div>
					</template>
				</origam-chart-honeycomb>
			</div>
		</Variant>

		<Variant title="Slot — legend-item (custom render)">
			<div
					class="story-shell"
					data-cy="honeycomb-slot-legend-item"
			>
				<origam-chart-honeycomb
						:series="FIXTURE_3X3"
						:height="360"
						title="Custom legend"
						data-cy="honeycomb-slot-legend-item-chart"
				>
					<template #legend-item="{ series, visible }">
						<span
								class="custom-legend-item"
								:style="{ opacity: visible ? 1 : 0.4 }"
						>
							{{ series.name }}
						</span>
					</template>
				</origam-chart-honeycomb>
			</div>
		</Variant>

		<Variant title="Slot — empty (custom CTA)">
			<div
					class="story-shell"
					data-cy="honeycomb-slot-empty"
			>
				<origam-chart-honeycomb
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="honeycomb-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No hex tile data available for this period.
						</div>
					</template>
				</origam-chart-honeycomb>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle">
			<div
					class="story-shell"
					data-cy="honeycomb-emit"
			>
				<origam-chart-honeycomb
						:series="FIXTURE_3X3"
						:height="360"
						title="Interact with tiles"
						data-cy="honeycomb-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="honeycomb-emit-log"
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

	import { OrigamChartHoneycomb } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const ORIENTATION_OPTIONS = [
		{ value: 'pointy-top', label: 'pointy-top' },
		{ value: 'flat-top', label: 'flat-top' }
	]

	const COLOR_MODE_OPTIONS = [
		{ value: 'categorical', label: 'categorical' },
		{ value: 'heatmap', label: 'heatmap' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_3X3: Array<IChartSeries> = [
		{
			name: 'Grid 3x3',
			data: [
				{ x: 0, y: 0, name: 'A1', color: 'primary' },
				{ x: 1, y: 0, name: 'A2', color: 'success' },
				{ x: 2, y: 0, name: 'A3', color: 'warning' },
				{ x: 0, y: 1, name: 'B1', color: 'danger' },
				{ x: 1, y: 1, name: 'B2', color: 'info' },
				{ x: 2, y: 1, name: 'B3', color: 'secondary' },
				{ x: 0, y: 2, name: 'C1', color: 'ghost' },
				{ x: 1, y: 2, name: 'C2', color: 'primary' },
				{ x: 2, y: 2, name: 'C3', color: 'success' }
			]
		}
	]

	const FIXTURE_3X3_NO_COLOR: Array<IChartSeries> = [
		{
			name: 'Grid 3x3',
			data: [
				{ x: 0, y: 0, name: 'A1' },
				{ x: 1, y: 0, name: 'A2' },
				{ x: 2, y: 0, name: 'A3' },
				{ x: 0, y: 1, name: 'B1' },
				{ x: 1, y: 1, name: 'B2' },
				{ x: 2, y: 1, name: 'B3' },
				{ x: 0, y: 2, name: 'C1' },
				{ x: 1, y: 2, name: 'C2' },
				{ x: 2, y: 2, name: 'C3' }
			]
		}
	]

	const FIXTURE_HEATMAP: Array<IChartSeries> = [
		{
			name: 'Heatmap',
			data: [
				{ x: 0, y: 0, name: 'T1', value: 10 },
				{ x: 1, y: 0, name: 'T2', value: 25 },
				{ x: 2, y: 0, name: 'T3', value: 40 },
				{ x: 3, y: 0, name: 'T4', value: 55 },
				{ x: 0, y: 1, name: 'T5', value: 20 },
				{ x: 1, y: 1, name: 'T6', value: 60 },
				{ x: 2, y: 1, name: 'T7', value: 80 },
				{ x: 3, y: 1, name: 'T8', value: 35 },
				{ x: 0, y: 2, name: 'T9', value: 90 },
				{ x: 1, y: 2, name: 'T10', value: 45 },
				{ x: 2, y: 2, name: 'T11', value: 15 },
				{ x: 3, y: 2, name: 'T12', value: 70 }
			]
		}
	]

	const FIXTURE_US_STATES: Array<IChartSeries> = [
		{
			name: 'US States',
			data: [
				{ x: 0, y: 0, name: 'WA', value: 7.6 },
				{ x: 1, y: 0, name: 'MT', value: 1.1 },
				{ x: 2, y: 0, name: 'ND', value: 0.8 },
				{ x: 3, y: 0, name: 'MN', value: 5.7 },
				{ x: 4, y: 0, name: 'MI', value: 10.0 },
				{ x: 0, y: 1, name: 'OR', value: 4.2 },
				{ x: 1, y: 1, name: 'ID', value: 1.9 },
				{ x: 2, y: 1, name: 'SD', value: 0.9 },
				{ x: 3, y: 1, name: 'WI', value: 5.9 },
				{ x: 4, y: 1, name: 'NY', value: 19.5 },
				{ x: 0, y: 2, name: 'CA', value: 39.5 },
				{ x: 1, y: 2, name: 'NV', value: 3.1 },
				{ x: 2, y: 2, name: 'NE', value: 2.0 },
				{ x: 3, y: 2, name: 'IA', value: 3.2 },
				{ x: 4, y: 2, name: 'OH', value: 11.8 },
				{ x: 0, y: 3, name: 'AZ', value: 7.5 },
				{ x: 1, y: 3, name: 'CO', value: 5.8 },
				{ x: 2, y: 3, name: 'KS', value: 2.9 },
				{ x: 3, y: 3, name: 'MO', value: 6.2 },
				{ x: 4, y: 3, name: 'PA', value: 13.0 },
				{ x: 0, y: 4, name: 'TX', value: 29.0 },
				{ x: 1, y: 4, name: 'OK', value: 4.0 },
				{ x: 2, y: 4, name: 'AR', value: 3.0 },
				{ x: 3, y: 4, name: 'TN', value: 6.9 }
			]
		}
	]

	const logLines = ref<Array<string>>([])

	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → x=${ point.x } y=${ point.y }`)
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
	}
</style>
