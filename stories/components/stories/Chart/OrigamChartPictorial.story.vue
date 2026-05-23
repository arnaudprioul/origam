<template>
	<Story
			group="components"
			title="Chart/OrigamChartPictorial"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					animated: true,
					showLegend: true,
					showTooltip: true,
					showLabel: true,
					showAxis: true,
					legendPosition: 'bottom',
					direction: 'vertical',
					iconsPerUnit: 10
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="pictorial-playground"
				>
					<origam-chart-pictorial
							:series="FIXTURE_SATISFACTION"
							:categories="FIXTURE_SATISFACTION_CATEGORIES"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:show-label="Boolean(state.showLabel)"
							:show-axis="Boolean(state.showAxis)"
							:legend-position="state.legendPosition"
							:direction="state.direction"
							:icons-per-unit="Number(state.iconsPerUnit)"
							title="Customer satisfaction"
							subtitle="Q1 2026"
							data-cy="pictorial-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="pictorial-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.direction"
						title="direction"
						:options="DIRECTION_OPTIONS"
				/>
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstNumber
						v-model="state.iconsPerUnit"
						title="iconsPerUnit"
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
				<HstCheckbox
						v-model="state.showAxis"
						title="showAxis"
				/>
			</template>
		</Variant>

		<Variant title="Prop — icon (person / heart / star / dollar)">
			<div
					class="story-shell"
					data-cy="pictorial-icons"
			>
				<div class="story-grid story-grid--4">
					<div class="story-col">
						<strong>person (default)</strong>
						<origam-chart-pictorial
								:series="FIXTURE_SATISFACTION"
								:categories="FIXTURE_SATISFACTION_CATEGORIES"
								:icons-per-unit="5"
								:height="300"
								title="Satisfaction"
								data-cy="pictorial-icon-person"
						/>
					</div>
					<div class="story-col">
						<strong>heart</strong>
						<origam-chart-pictorial
								:series="FIXTURE_SATISFACTION"
								:categories="FIXTURE_SATISFACTION_CATEGORIES"
								:icons-per-unit="5"
								:height="300"
								:icon="PICTORIAL_ICON_HEART"
								icon-color="danger"
								title="Satisfaction"
								data-cy="pictorial-icon-heart"
						/>
					</div>
					<div class="story-col">
						<strong>star</strong>
						<origam-chart-pictorial
								:series="FIXTURE_RATINGS"
								:categories="FIXTURE_RATINGS_CATEGORIES"
								:icons-per-unit="10"
								:height="300"
								:icon="PICTORIAL_ICON_STAR"
								icon-color="warning"
								title="Ratings"
								data-cy="pictorial-icon-star"
						/>
					</div>
					<div class="story-col">
						<strong>dollar</strong>
						<origam-chart-pictorial
								:series="FIXTURE_SATISFACTION"
								:categories="FIXTURE_SATISFACTION_CATEGORIES"
								:icons-per-unit="5"
								:height="300"
								:icon="PICTORIAL_ICON_DOLLAR"
								icon-color="success"
								title="Satisfaction"
								data-cy="pictorial-icon-dollar"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — direction (vertical / horizontal)">
			<div
					class="story-shell"
					data-cy="pictorial-direction"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>vertical (default)</strong>
						<origam-chart-pictorial
								:series="FIXTURE_SATISFACTION"
								:categories="FIXTURE_SATISFACTION_CATEGORIES"
								:icons-per-unit="5"
								:height="360"
								direction="vertical"
								title="Vertical"
								data-cy="pictorial-direction-vertical"
						/>
					</div>
					<div class="story-col">
						<strong>horizontal</strong>
						<origam-chart-pictorial
								:series="FIXTURE_SATISFACTION"
								:categories="FIXTURE_SATISFACTION_CATEGORIES"
								:icons-per-unit="5"
								:height="360"
								direction="horizontal"
								title="Horizontal"
								data-cy="pictorial-direction-horizontal"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — iconsPerUnit (1 vs 10)">
			<div
					class="story-shell"
					data-cy="pictorial-icons-per-unit"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>iconsPerUnit=1 (65 icons total for promoters)</strong>
						<origam-chart-pictorial
								:series="FIXTURE_SATISFACTION"
								:categories="FIXTURE_SATISFACTION_CATEGORIES"
								:icons-per-unit="1"
								:height="360"
								title="Fine granularity"
								data-cy="pictorial-ipu-1"
						/>
					</div>
					<div class="story-col">
						<strong>iconsPerUnit=5 (13 icons total for promoters)</strong>
						<origam-chart-pictorial
								:series="FIXTURE_SATISFACTION"
								:categories="FIXTURE_SATISFACTION_CATEGORIES"
								:icons-per-unit="5"
								:height="360"
								title="Coarse granularity"
								data-cy="pictorial-ipu-5"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="pictorial-color-scheme"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>default palette (intent cycle)</strong>
						<origam-chart-pictorial
								:series="FIXTURE_RATINGS"
								:categories="FIXTURE_RATINGS_CATEGORIES"
								:icons-per-unit="10"
								:height="280"
								data-cy="pictorial-color-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS colors</strong>
						<origam-chart-pictorial
								:series="FIXTURE_RATINGS"
								:categories="FIXTURE_RATINGS_CATEGORIES"
								:icons-per-unit="10"
								:color-scheme="['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ddd6fe']"
								:height="280"
								data-cy="pictorial-color-custom"
						/>
					</div>
					<div class="story-col">
						<strong>iconColor = 'success' (single override)</strong>
						<origam-chart-pictorial
								:series="FIXTURE_SATISFACTION"
								:categories="FIXTURE_SATISFACTION_CATEGORIES"
								:icons-per-unit="5"
								:height="280"
								icon-color="success"
								data-cy="pictorial-color-intent"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="pictorial-slot-tooltip"
			>
				<origam-chart-pictorial
						:series="FIXTURE_SATISFACTION"
						:categories="FIXTURE_SATISFACTION_CATEGORIES"
						:icons-per-unit="5"
						:height="360"
						title="Custom tooltip"
						data-cy="pictorial-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category }}</strong>
							<span>{{ point?.y }}%</span>
						</div>
					</template>
				</origam-chart-pictorial>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="pictorial-slot-empty"
			>
				<origam-chart-pictorial
						:series="[]"
						:categories="[]"
						:height="320"
						title="Empty state"
						data-cy="pictorial-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No satisfaction data available for this period.
						</div>
					</template>
				</origam-chart-pictorial>
			</div>
		</Variant>

		<Variant title="Emit — point-click">
			<div
					class="story-shell"
					data-cy="pictorial-emit"
			>
				<origam-chart-pictorial
						:series="FIXTURE_SATISFACTION"
						:categories="FIXTURE_SATISFACTION_CATEGORIES"
						:icons-per-unit="5"
						:height="360"
						title="Click a column"
						data-cy="pictorial-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="pictorial-emit-log"
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

	import { OrigamChartPictorial } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import {
		PICTORIAL_ICON_DOLLAR,
		PICTORIAL_ICON_HEART,
		PICTORIAL_ICON_STAR
	} from '@origam/consts'

	import { useStoryInitState } from '@stories/composables'

	const DIRECTION_OPTIONS = [
		{ value: 'vertical', label: 'vertical' },
		{ value: 'horizontal', label: 'horizontal' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_SATISFACTION_CATEGORIES = ['Promoters', 'Passives', 'Detractors']

	const FIXTURE_SATISFACTION: Array<IChartSeries> = [
		{ name: 'Satisfaction', data: [65, 25, 10] }
	]

	const FIXTURE_RATINGS_CATEGORIES = ['★', '★★', '★★★', '★★★★', '★★★★★']

	const FIXTURE_RATINGS: Array<IChartSeries> = [
		{ name: 'Ratings', data: [4, 12, 28, 55, 78] }
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

	.custom-tooltip {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 4px;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
