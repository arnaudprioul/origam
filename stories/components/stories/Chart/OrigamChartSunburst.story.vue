<template>
	<Story
			group="components"
			title="Chart/OrigamChartSunburst"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					innerRadius: 0.15,
					ringPadding: 1,
					animated: true,
					showLabel: true,
					showLegend: true,
					showTooltip: true,
					legendPosition: 'bottom'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="sunburst-playground"
				>
					<origam-chart-sunburst
							:series="FIXTURE_BUDGET_SERIES"
							:height="Number(state.height)"
							:inner-radius="Number(state.innerRadius)"
							:ring-padding="Number(state.ringPadding)"
							:animated="Boolean(state.animated)"
							:show-label="Boolean(state.showLabel)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:legend-position="state.legendPosition"
							title="Budget Breakdown"
							subtitle="Q1 2026"
							data-cy="sunburst-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="sunburst-playground-log"
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
						:max="0.6"
						:step="0.05"
				/>
				<HstNumber
						v-model="state.ringPadding"
						title="ringPadding"
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
						v-model="state.showLegend"
						title="showLegend"
				/>
				<HstCheckbox
						v-model="state.showTooltip"
						title="showTooltip"
				/>
			</template>
		</Variant>

		<Variant title="Prop — innerRadius (pie vs donut)">
			<div
					class="story-shell"
					data-cy="sunburst-inner-radius"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>innerRadius=0 (full pie)</strong>
						<origam-chart-sunburst
								:series="FIXTURE_BUDGET_SERIES"
								:inner-radius="0"
								:height="320"
								title="Full Pie"
								data-cy="sunburst-inner-0"
						/>
					</div>
					<div class="story-col">
						<strong>innerRadius=0.4 (deep donut)</strong>
						<origam-chart-sunburst
								:series="FIXTURE_BUDGET_SERIES"
								:inner-radius="0.4"
								:height="320"
								title="Deep Donut"
								data-cy="sunburst-inner-04"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — ringPadding">
			<div
					class="story-shell"
					data-cy="sunburst-ring-padding"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>ringPadding=0 (flush)</strong>
						<origam-chart-sunburst
								:series="FIXTURE_BUDGET_SERIES"
								:ring-padding="0"
								:height="280"
								data-cy="sunburst-padding-0"
						/>
					</div>
					<div class="story-col">
						<strong>ringPadding=1 (default)</strong>
						<origam-chart-sunburst
								:series="FIXTURE_BUDGET_SERIES"
								:ring-padding="1"
								:height="280"
								data-cy="sunburst-padding-1"
						/>
					</div>
					<div class="story-col">
						<strong>ringPadding=4 (wide gap)</strong>
						<origam-chart-sunburst
								:series="FIXTURE_BUDGET_SERIES"
								:ring-padding="4"
								:height="280"
								data-cy="sunburst-padding-4"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="sunburst-color-scheme"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default intent cycle</strong>
						<origam-chart-sunburst
								:series="FIXTURE_FS_SERIES"
								:height="320"
								data-cy="sunburst-color-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS ramp</strong>
						<origam-chart-sunburst
								:series="FIXTURE_FS_SERIES"
								:color-scheme="['#6366f1', '#0ea5e9', '#10b981']"
								:height="320"
								data-cy="sunburst-color-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="sunburst-slot-tooltip"
			>
				<origam-chart-sunburst
						:series="FIXTURE_BUDGET_SERIES"
						:height="380"
						title="Custom tooltip"
						data-cy="sunburst-slot-tooltip-chart"
				>
					<template #tooltip="{ node, path, point }">
						<div class="custom-tooltip">
							<strong>{{ path || node?.name }}</strong>
							<span>{{ point?.y?.toLocaleString() }}</span>
						</div>
					</template>
				</origam-chart-sunburst>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="sunburst-slot-empty"
			>
				<origam-chart-sunburst
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="sunburst-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No hierarchy data available for this period.
						</div>
					</template>
				</origam-chart-sunburst>
			</div>
		</Variant>

		<Variant title="Emit — point-click on node">
			<div
					class="story-shell"
					data-cy="sunburst-emit"
			>
				<origam-chart-sunburst
						:series="FIXTURE_BUDGET_SERIES"
						:height="360"
						title="Click a node"
						data-cy="sunburst-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="sunburst-emit-log"
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

	import OrigamChartSunburst from '@origam/components/Chart/OrigamChartSunburst.vue'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import type { IChartSunburstDatum } from '@origam/interfaces/Chart/chart-sunburst.interface'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const BUDGET_DATA: Array<IChartSunburstDatum> = [
		{
			name: 'Engineering',
			value: 50,
			children: [
				{
					name: 'Frontend',
					value: 20,
					children: [
						{ name: 'Vue', value: 8 },
						{ name: 'React', value: 7 },
						{ name: 'Tooling', value: 5 }
					]
				},
				{
					name: 'Backend',
					value: 20,
					children: [
						{ name: 'Node', value: 10 },
						{ name: 'Python', value: 6 },
						{ name: 'Go', value: 4 }
					]
				},
				{ name: 'DevOps', value: 10 }
			]
		},
		{
			name: 'Marketing',
			value: 30,
			children: [
				{ name: 'Digital', value: 20 },
				{ name: 'Print', value: 10 }
			]
		},
		{ name: 'Sales', value: 20 }
	]

	const FS_DATA: Array<IChartSunburstDatum> = [
		{
			name: 'src',
			value: 1200,
			children: [
				{ name: 'components', value: 500 },
				{ name: 'composables', value: 300 },
				{ name: 'utils', value: 200 },
				{ name: 'types', value: 200 }
			]
		},
		{
			name: 'tests',
			value: 400,
			children: [
				{ name: 'unit', value: 250 },
				{ name: 'e2e', value: 150 }
			]
		},
		{ name: 'docs', value: 100 }
	]

	const FIXTURE_BUDGET_SERIES: Array<IChartSeries> = [
		{ name: 'Budget', data: BUDGET_DATA as any }
	]

	const FIXTURE_FS_SERIES: Array<IChartSeries> = [
		{ name: 'Filesystem', data: FS_DATA as any }
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

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
