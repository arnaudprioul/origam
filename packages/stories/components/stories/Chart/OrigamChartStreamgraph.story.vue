<template>
	<Story
			group="components"
			title="Chart/OrigamChartStreamgraph"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					offsetMode: 'wiggle',
					smoothing: 'curve',
					height: 400,
					animated: true,
					showLegend: true,
					showTooltip: true,
					showAxis: true,
					showGrid: false,
					legendPosition: 'bottom'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="streamgraph-playground"
				>
					<origam-chart-streamgraph
							:series="FIXTURE_MUSIC"
							:categories="FIXTURE_MUSIC_CATEGORIES"
							:offset-mode="state.offsetMode"
							:smoothing="state.smoothing"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:show-axis="Boolean(state.showAxis)"
							:show-grid="Boolean(state.showGrid)"
							:legend-position="state.legendPosition"
							title="Music Genre Listens"
							subtitle="12 months, 5 genres"
							data-cy="streamgraph-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="streamgraph-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.offsetMode"
						title="offsetMode"
						:options="OFFSET_MODE_OPTIONS"
				/>
				<HstSelect
						v-model="state.smoothing"
						title="smoothing"
						:options="SMOOTHING_OPTIONS"
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
						v-model="state.showAxis"
						title="showAxis"
				/>
				<HstCheckbox
						v-model="state.showGrid"
						title="showGrid"
				/>
			</template>
		</Variant>

		<Variant title="Prop — offsetMode (wiggle / silhouette / expand / zero)">
			<div
					class="story-shell"
					data-cy="streamgraph-offset-mode"
			>
				<div class="story-grid story-grid--4">
					<div class="story-col">
						<strong>wiggle (canonical)</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_MUSIC"
								:categories="FIXTURE_MUSIC_CATEGORIES"
								offset-mode="wiggle"
								:height="300"
								title="Wiggle"
								data-cy="streamgraph-offset-wiggle"
						/>
					</div>
					<div class="story-col">
						<strong>silhouette (centered)</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_MUSIC"
								:categories="FIXTURE_MUSIC_CATEGORIES"
								offset-mode="silhouette"
								:height="300"
								title="Silhouette"
								data-cy="streamgraph-offset-silhouette"
						/>
					</div>
					<div class="story-col">
						<strong>expand (100% normalised)</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_MUSIC"
								:categories="FIXTURE_MUSIC_CATEGORIES"
								offset-mode="expand"
								:height="300"
								title="Expand"
								data-cy="streamgraph-offset-expand"
						/>
					</div>
					<div class="story-col">
						<strong>zero (stacked area)</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_MUSIC"
								:categories="FIXTURE_MUSIC_CATEGORIES"
								offset-mode="zero"
								:height="300"
								title="Zero"
								data-cy="streamgraph-offset-zero"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — smoothing (none vs curve)">
			<div
					class="story-shell"
					data-cy="streamgraph-smoothing"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>none (linear segments)</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_TECH"
								:categories="FIXTURE_TECH_CATEGORIES"
								offset-mode="wiggle"
								smoothing="none"
								:height="340"
								title="No smoothing"
								data-cy="streamgraph-smoothing-none"
						/>
					</div>
					<div class="story-col">
						<strong>curve (Catmull-Rom)</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_TECH"
								:categories="FIXTURE_TECH_CATEGORIES"
								offset-mode="wiggle"
								smoothing="curve"
								:height="340"
								title="Catmull-Rom curve"
								data-cy="streamgraph-smoothing-curve"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="streamgraph-color-scheme"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>default palette (intent cycle)</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_MUSIC_NO_COLOR"
								:categories="FIXTURE_MUSIC_CATEGORIES"
								:height="280"
								data-cy="streamgraph-color-default"
						/>
					</div>
					<div class="story-col">
						<strong>warm custom CSS colors</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_MUSIC_NO_COLOR"
								:categories="FIXTURE_MUSIC_CATEGORIES"
								:color-scheme="['#f97316','#fb923c','#fbbf24','#a78bfa','#c084fc']"
								:height="280"
								data-cy="streamgraph-color-warm"
						/>
					</div>
					<div class="story-col">
						<strong>cool intent names</strong>
						<origam-chart-streamgraph
								:series="FIXTURE_MUSIC_NO_COLOR"
								:categories="FIXTURE_MUSIC_CATEGORIES"
								:color-scheme="['info','primary','success','warning','danger']"
								:height="280"
								data-cy="streamgraph-color-intent"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="streamgraph-slot-tooltip"
			>
				<origam-chart-streamgraph
						:series="FIXTURE_MUSIC"
						:categories="FIXTURE_MUSIC_CATEGORIES"
						:height="380"
						title="Custom multi-series tooltip"
						data-cy="streamgraph-slot-tooltip-chart"
				>
					<template #tooltip="{ category, allPoints }">
						<div class="custom-tooltip">
							<strong class="custom-tooltip__category">{{ category }}</strong>
							<ul class="custom-tooltip__list">
								<li
										v-for="p in allPoints"
										:key="p.series.name"
										class="custom-tooltip__row"
								>
									<span
											class="custom-tooltip__swatch"
											:style="{ background: p.color }"
									/>
									<span class="custom-tooltip__name">{{ p.series.name }}</span>
									<span class="custom-tooltip__value">{{ p.value.toLocaleString() }}</span>
								</li>
							</ul>
						</div>
					</template>
				</origam-chart-streamgraph>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="streamgraph-slot-empty"
			>
				<origam-chart-streamgraph
						:series="[]"
						:categories="[]"
						:height="320"
						title="Empty state"
						data-cy="streamgraph-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No streaming data available for this period.
						</div>
					</template>
				</origam-chart-streamgraph>
			</div>
		</Variant>

		<Variant title="Emit — point-click on ribbon">
			<div
					class="story-shell"
					data-cy="streamgraph-emit"
			>
				<origam-chart-streamgraph
						:series="FIXTURE_TECH"
						:categories="FIXTURE_TECH_CATEGORIES"
						:height="360"
						title="Click a ribbon (or press Enter / Space)"
						subtitle="Tech stack adoption over 8 quarters"
						data-cy="streamgraph-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="streamgraph-emit-log"
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

	import { OrigamChartStreamgraph } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const OFFSET_MODE_OPTIONS = [
		{ value: 'wiggle', label: 'wiggle' },
		{ value: 'silhouette', label: 'silhouette' },
		{ value: 'expand', label: 'expand' },
		{ value: 'zero', label: 'zero' }
	]

	const SMOOTHING_OPTIONS = [
		{ value: 'curve', label: 'curve (Catmull-Rom)' },
		{ value: 'none', label: 'none (linear)' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	// Music genre listens over 12 months — 5 genres with realistic ebb/flow
	const FIXTURE_MUSIC_CATEGORIES = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	]

	const FIXTURE_MUSIC: Array<IChartSeries> = [
		{
			name: 'Pop',
			data: [420, 480, 510, 460, 440, 490, 530, 560, 520, 480, 460, 500],
			color: 'primary'
		},
		{
			name: 'Rock',
			data: [320, 300, 280, 310, 350, 370, 360, 340, 380, 400, 420, 390],
			color: 'danger'
		},
		{
			name: 'Hip-Hop',
			data: [260, 310, 380, 420, 400, 380, 350, 330, 310, 340, 360, 390],
			color: 'warning'
		},
		{
			name: 'Electronic',
			data: [180, 200, 220, 190, 210, 260, 300, 340, 310, 280, 250, 230],
			color: 'info'
		},
		{
			name: 'Jazz',
			data: [90, 80, 75, 85, 95, 100, 88, 92, 110, 120, 130, 115],
			color: 'success'
		}
	]

	const FIXTURE_MUSIC_NO_COLOR: Array<IChartSeries> = FIXTURE_MUSIC.map(({ name, data }) => ({ name, data }))

	// Tech stack adoption over 8 quarters — growth/decline patterns
	const FIXTURE_TECH_CATEGORIES = ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25']

	const FIXTURE_TECH: Array<IChartSeries> = [
		{
			name: 'Vue',
			data: [280, 310, 340, 370, 400, 420, 440, 460],
			color: 'success'
		},
		{
			name: 'React',
			data: [620, 600, 580, 560, 540, 520, 500, 490],
			color: 'info'
		},
		{
			name: 'Svelte',
			data: [60, 80, 110, 140, 170, 200, 230, 260],
			color: 'warning'
		},
		{
			name: 'Angular',
			data: [380, 360, 340, 310, 280, 260, 240, 220],
			color: 'danger'
		}
	]

	const logLines = ref<Array<string>>([])

	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → series="${ point.seriesName }" x="${ point.x }" y=${ point.y }`)
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
		gap: 6px;
		padding: 4px;
		min-width: 160px;
	}

	.custom-tooltip__category {
		font-size: 0.8125rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		padding-bottom: 4px;
	}

	.custom-tooltip__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.custom-tooltip__row {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.75rem;
	}

	.custom-tooltip__swatch {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 2px;
		flex-shrink: 0;
	}

	.custom-tooltip__name {
		flex: 1;
	}

	.custom-tooltip__value {
		font-weight: 600;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
