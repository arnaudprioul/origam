<template>
	<Story
			group="components"
			title="Chart/OrigamChartRadar"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 360,
					animated: true,
					legendPosition: 'bottom',
					showLegend: true
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="radar-playground"
				>
					<origam-chart-radar
							:series="FIXTURE_RADAR"
							:categories="FIXTURE_RADAR_AXES"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:legend-position="state.legendPosition"
							:show-legend="Boolean(state.showLegend)"
							title="Player comparison"
							subtitle="6 skill dimensions"
							data-cy="radar-playground-chart"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="radar-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
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
			</template>
		</Variant>

		<Variant title="Prop — series (1 / 2 / 4 players)">
			<div
					class="story-shell"
					data-cy="radar-series-count"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>1 player</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR.slice(0, 1)"
								:categories="FIXTURE_RADAR_AXES"
								:height="240"
								data-cy="radar-series-1"
						/>
					</div>
					<div class="story-col">
						<strong>2 players</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								:height="240"
								data-cy="radar-series-2"
						/>
					</div>
					<div class="story-col">
						<strong>4 players</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR_4"
								:categories="FIXTURE_RADAR_AXES"
								:height="240"
								data-cy="radar-series-4"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — categories (5 / 6 / 8 spokes)">
			<div
					class="story-shell"
					data-cy="radar-spokes"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>5 spokes</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR_5_SPOKES"
								:categories="FIXTURE_AXES_5"
								:height="240"
								data-cy="radar-spokes-5"
						/>
					</div>
					<div class="story-col">
						<strong>6 spokes</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								:height="240"
								data-cy="radar-spokes-6"
						/>
					</div>
					<div class="story-col">
						<strong>8 spokes</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR_8_SPOKES"
								:categories="FIXTURE_AXES_8"
								:height="240"
								data-cy="radar-spokes-8"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — legendPosition">
			<div
					class="story-shell"
					data-cy="radar-legend-position"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>top</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								legend-position="top"
								:height="260"
								data-cy="radar-legend-top"
						/>
					</div>
					<div class="story-col">
						<strong>right</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								legend-position="right"
								:height="260"
								data-cy="radar-legend-right"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — height">
			<div
					class="story-shell"
					data-cy="radar-height"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>200px</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								:height="200"
								:show-legend="false"
								data-cy="radar-height-200"
						/>
					</div>
					<div class="story-col">
						<strong>320px</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								:height="320"
								:show-legend="false"
								data-cy="radar-height-320"
						/>
					</div>
					<div class="story-col">
						<strong>480px</strong>
						<origam-chart-radar
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								:height="480"
								:show-legend="false"
								data-cy="radar-height-480"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="radar-slot-tooltip"
			>
				<p class="hint">
					The radar chart does not currently surface a hover tooltip — interaction is limited to the legend. This slot is reserved for future use.
				</p>
				<origam-chart-radar
						:series="FIXTURE_RADAR"
						:categories="FIXTURE_RADAR_AXES"
						:height="320"
						data-cy="radar-slot-tooltip-chart"
				/>
			</div>
		</Variant>

		<Variant title="Slot — legend-item">
			<div
					class="story-shell"
					data-cy="radar-slot-legend"
			>
				<origam-chart-radar
						:series="FIXTURE_RADAR"
						:categories="FIXTURE_RADAR_AXES"
						:height="320"
						data-cy="radar-slot-legend-chart"
				>
					<template #legend-item="{ series, visible }">
						<div class="custom-legend-item">
							<span
									class="custom-legend-item__dot"
									:style="{ backgroundColor: visible ? (series.color === 'primary' ? '#3b82f6' : '#10b981') : '#9ca3af' }"
							/>
							<span class="custom-legend-item__name">{{ series.name }}</span>
							<small class="custom-legend-item__state">{{ visible ? 'visible' : 'hidden' }}</small>
						</div>
					</template>
				</origam-chart-radar>
			</div>
		</Variant>

		<Variant title="Slot — title">
			<div
					class="story-shell"
					data-cy="radar-slot-title"
			>
				<origam-chart-radar
						:series="FIXTURE_RADAR"
						:categories="FIXTURE_RADAR_AXES"
						:height="320"
						data-cy="radar-slot-title-chart"
				>
					<template #title>
						<div class="custom-title">
							<span class="custom-title__main">Skill radar</span>
							<span class="custom-title__badge">live</span>
						</div>
					</template>
				</origam-chart-radar>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="radar-slot-empty"
			>
				<origam-chart-radar
						:series="[]"
						:categories="FIXTURE_RADAR_AXES"
						:height="240"
						data-cy="radar-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							<strong>No players</strong>
							<small>Add at least one series to display the radar.</small>
						</div>
					</template>
				</origam-chart-radar>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle">
			<div
					class="story-shell"
					data-cy="radar-emits"
			>
				<p class="hint">Click a legend entry to toggle series visibility — emits land below.</p>
				<origam-chart-radar
						:series="FIXTURE_RADAR"
						:categories="FIXTURE_RADAR_AXES"
						:height="320"
						data-cy="radar-emits-chart"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="radar-emits-log"
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

	import { OrigamChartRadar } from '@origam/components'

	import type { IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_RADAR_AXES = ['Speed', 'Power', 'Agility', 'Stamina', 'Skill', 'Defence']
	const FIXTURE_AXES_5 = ['Speed', 'Power', 'Agility', 'Stamina', 'Skill']
	const FIXTURE_AXES_8 = ['Speed', 'Power', 'Agility', 'Stamina', 'Skill', 'Defence', 'Vision', 'Technique']

	const FIXTURE_RADAR: Array<IChartSeries> = [
		{ name: 'Player A', data: [80, 65, 75, 90, 70, 60], color: 'primary' },
		{ name: 'Player B', data: [55, 85, 60, 70, 90, 80], color: 'success' }
	]

	const FIXTURE_RADAR_4: Array<IChartSeries> = [
		{ name: 'Player A', data: [80, 65, 75, 90, 70, 60], color: 'primary' },
		{ name: 'Player B', data: [55, 85, 60, 70, 90, 80], color: 'success' },
		{ name: 'Player C', data: [70, 70, 80, 60, 75, 85], color: 'warning' },
		{ name: 'Player D', data: [90, 55, 65, 80, 60, 70], color: 'danger' }
	]

	const FIXTURE_RADAR_5_SPOKES: Array<IChartSeries> = [
		{ name: 'Player A', data: [80, 65, 75, 90, 70], color: 'primary' },
		{ name: 'Player B', data: [55, 85, 60, 70, 90], color: 'success' }
	]

	const FIXTURE_RADAR_8_SPOKES: Array<IChartSeries> = [
		{ name: 'Player A', data: [80, 65, 75, 90, 70, 60, 85, 72], color: 'primary' },
		{ name: 'Player B', data: [55, 85, 60, 70, 90, 80, 65, 78], color: 'success' }
	]

	const logLines = ref<Array<string>>([])
	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
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
