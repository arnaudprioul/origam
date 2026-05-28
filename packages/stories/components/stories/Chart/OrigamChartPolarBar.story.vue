<template>
	<Story
			group="components"
			title="Chart/OrigamChartPolarBar"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					innerRadius: 0.1,
					startAngle: 0,
					gap: 0.02,
					animated: true,
					showLabel: true,
					showValue: false,
					showLegend: true,
					showTooltip: true,
					legendPosition: 'bottom'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="polar-bar-playground"
				>
					<origam-chart-polar-bar
							:series="FIXTURE_WEEKLY"
							:categories="FIXTURE_WEEKLY_CATEGORIES"
							:height="Number(state.height)"
							:inner-radius="Number(state.innerRadius)"
							:start-angle="Number(state.startAngle)"
							:gap="Number(state.gap)"
							:animated="Boolean(state.animated)"
							:show-label="Boolean(state.showLabel)"
							:show-value="Boolean(state.showValue)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:legend-position="state.legendPosition"
							title="Hours of activity"
							subtitle="By day of week"
							data-cy="polar-bar-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="polar-bar-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstSlider
						v-model="state.innerRadius"
						title="innerRadius"
						:min="0"
						:max="0.8"
						:step="0.05"
				/>
				<HstSlider
						v-model="state.startAngle"
						title="startAngle (rad)"
						:min="-3.14"
						:max="3.14"
						:step="0.1"
				/>
				<HstSlider
						v-model="state.gap"
						title="gap (rad)"
						:min="0"
						:max="0.15"
						:step="0.01"
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
						v-model="state.showValue"
						title="showValue"
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

		<Variant title="Prop — innerRadius (0 vs 0.4)">
			<div
					class="story-shell"
					data-cy="polar-bar-inner-radius"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>innerRadius=0 (no hole)</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_WEEKLY"
								:categories="FIXTURE_WEEKLY_CATEGORIES"
								:height="320"
								:inner-radius="0"
								title="No centre hole"
								data-cy="polar-bar-inner-radius-0"
						/>
					</div>
					<div class="story-col">
						<strong>innerRadius=0.4 (donut-style)</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_WEEKLY"
								:categories="FIXTURE_WEEKLY_CATEGORIES"
								:height="320"
								:inner-radius="0.4"
								title="With centre hole"
								data-cy="polar-bar-inner-radius-04"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — startAngle (0 / -π÷2 / π÷4)">
			<div
					class="story-shell"
					data-cy="polar-bar-start-angle"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>0 rad (3 o'clock)</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:height="280"
								:start-angle="0"
								:show-legend="false"
								data-cy="polar-bar-angle-0"
						/>
					</div>
					<div class="story-col">
						<strong>-π/2 rad (12 o'clock)</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:height="280"
								:start-angle="-1.5708"
								:show-legend="false"
								data-cy="polar-bar-angle-neg-half-pi"
						/>
					</div>
					<div class="story-col">
						<strong>π/4 rad (4:30)</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:height="280"
								:start-angle="0.7854"
								:show-legend="false"
								data-cy="polar-bar-angle-quarter-pi"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — gap (0 vs 0.05)">
			<div
					class="story-shell"
					data-cy="polar-bar-gap"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>gap=0 (flush wedges)</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_WEEKLY"
								:categories="FIXTURE_WEEKLY_CATEGORIES"
								:height="320"
								:gap="0"
								title="No gap"
								data-cy="polar-bar-gap-0"
						/>
					</div>
					<div class="story-col">
						<strong>gap=0.05 (visible spacing)</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_WEEKLY"
								:categories="FIXTURE_WEEKLY_CATEGORIES"
								:height="320"
								:gap="0.05"
								title="Generous gap"
								data-cy="polar-bar-gap-005"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="polar-bar-color-scheme"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>default (intent cycle)</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:height="280"
								:show-legend="false"
								data-cy="polar-bar-color-default"
						/>
					</div>
					<div class="story-col">
						<strong>indigo ramp</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_SALES"
								:categories="FIXTURE_SALES_CATEGORIES"
								:height="280"
								:color-scheme="['#6366f1','#818cf8','#a5b4fc','#c7d2fe','#e0e7ff']"
								:show-legend="false"
								data-cy="polar-bar-color-indigo"
						/>
					</div>
					<div class="story-col">
						<strong>series.color = 'success'</strong>
						<origam-chart-polar-bar
								:series="FIXTURE_SALES_SUCCESS"
								:categories="FIXTURE_SALES_CATEGORIES"
								:height="280"
								:show-legend="false"
								data-cy="polar-bar-color-series"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip (custom card with percentage)">
			<div
					class="story-shell"
					data-cy="polar-bar-slot-tooltip"
			>
				<origam-chart-polar-bar
						:series="FIXTURE_WEEKLY"
						:categories="FIXTURE_WEEKLY_CATEGORIES"
						:height="380"
						title="Custom tooltip — hover a wedge"
						data-cy="polar-bar-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category, percentage }">
						<div class="custom-tooltip">
							<strong>{{ category }}</strong>
							<span>{{ typeof point?.y === 'number' ? point.y : (point?.y ?? '') }} hrs</span>
							<span class="custom-tooltip__pct">{{ percentage }} of week</span>
						</div>
					</template>
				</origam-chart-polar-bar>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="polar-bar-slot-empty"
			>
				<origam-chart-polar-bar
						:series="[]"
						:categories="[]"
						:height="320"
						title="Empty state"
						data-cy="polar-bar-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No activity data available for this period.
						</div>
					</template>
				</origam-chart-polar-bar>
			</div>
		</Variant>

		<Variant title="Emit — point-click">
			<div
					class="story-shell"
					data-cy="polar-bar-emit"
			>
				<origam-chart-polar-bar
						:series="FIXTURE_WEEKLY"
						:categories="FIXTURE_WEEKLY_CATEGORIES"
						:height="360"
						title="Click a wedge"
						data-cy="polar-bar-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="polar-bar-emit-log"
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

	import { OrigamChartPolarBar } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_WEEKLY_CATEGORIES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

	const FIXTURE_WEEKLY: Array<IChartSeries> = [
		{ name: 'Activity (hrs)', data: [8, 9, 7, 8, 10, 4, 3] }
	]

	const FIXTURE_SALES_CATEGORIES = ['Phone', 'Laptop', 'Tablet', 'Watch', 'Earbuds']

	const FIXTURE_SALES: Array<IChartSeries> = [
		{ name: 'Sales (units)', data: [45, 30, 15, 8, 12] }
	]

	const FIXTURE_SALES_SUCCESS: Array<IChartSeries> = [
		{ name: 'Sales (units)', data: [45, 30, 15, 8, 12], color: 'success' }
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
		flex-direction: column;
		gap: 2px;
		padding: 4px;
	}

	.custom-tooltip__pct {
		font-size: 0.75rem;
		opacity: 0.8;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
