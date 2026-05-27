<template>
	<Story
			group="components"
			title="Chart/OrigamChartHeatmap"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 440,
					animated: true,
					showLabel: true,
					showAxis: true,
					showGradientLegend: true,
					showTooltip: true,
					legendPosition: 'bottom',
					cellGap: 2,
					colorRangeStart: 'info',
					colorRangeEnd: 'danger'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="heatmap-playground"
				>
					<origam-chart-heatmap
							:series="FIXTURE_ACTIVITY"
							:x-categories="HOURS"
							:y-categories="DAYS"
							:height="Number(state.height)"
							:cell-gap="Number(state.cellGap)"
							:color-range="[state.colorRangeStart, state.colorRangeEnd]"
							:animated="Boolean(state.animated)"
							:show-label="Boolean(state.showLabel)"
							:show-axis="Boolean(state.showAxis)"
							:show-gradient-legend="Boolean(state.showGradientLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:legend-position="state.legendPosition"
							title="GitHub-style activity grid"
							subtitle="Commits per weekday × hour"
							data-cy="heatmap-playground-chart"
							@point-click="onPointClick"
					/>
					<pre
							class="story-log"
							data-cy="heatmap-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstNumber
						v-model="state.cellGap"
						title="cellGap"
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
						v-model="state.showGradientLegend"
						title="showGradientLegend"
				/>
				<HstCheckbox
						v-model="state.showTooltip"
						title="showTooltip"
				/>
			</template>
		</Variant>

		<Variant title="Prop — colorRange (info→danger vs primary→warning)">
			<div
					class="story-shell"
					data-cy="heatmap-color-range"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>info → danger (default)</strong>
						<origam-chart-heatmap
								:series="FIXTURE_CORRELATION"
								:x-categories="TICKERS"
								:y-categories="TICKERS"
								:color-range="['info', 'danger']"
								:height="320"
								title="Correlation matrix"
								data-cy="heatmap-color-range-info-danger"
						/>
					</div>
					<div class="story-col">
						<strong>primary → warning</strong>
						<origam-chart-heatmap
								:series="FIXTURE_CORRELATION"
								:x-categories="TICKERS"
								:y-categories="TICKERS"
								:color-range="['primary', 'warning']"
								:height="320"
								title="Correlation matrix"
								data-cy="heatmap-color-range-primary-warning"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — cellGap (compact vs spaced)">
			<div
					class="story-shell"
					data-cy="heatmap-cell-gap"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>compact (cellGap=0)</strong>
						<origam-chart-heatmap
								:series="FIXTURE_ACTIVITY"
								:x-categories="HOURS"
								:y-categories="DAYS"
								:cell-gap="0"
								:height="280"
								title="No gap"
								data-cy="heatmap-cell-gap-compact"
						/>
					</div>
					<div class="story-col">
						<strong>spaced (cellGap=6)</strong>
						<origam-chart-heatmap
								:series="FIXTURE_ACTIVITY"
								:x-categories="HOURS"
								:y-categories="DAYS"
								:cell-gap="6"
								:height="280"
								title="Wide gap"
								data-cy="heatmap-cell-gap-spaced"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showLabel / showAxis (on/off matrix)">
			<div
					class="story-shell"
					data-cy="heatmap-flags"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>showLabel=true showAxis=true</strong>
						<origam-chart-heatmap
								:series="FIXTURE_CORRELATION"
								:x-categories="TICKERS"
								:y-categories="TICKERS"
								:show-label="true"
								:show-axis="true"
								:height="300"
								title="Labels + axes"
								data-cy="heatmap-flags-both-on"
						/>
					</div>
					<div class="story-col">
						<strong>showLabel=false showAxis=false</strong>
						<origam-chart-heatmap
								:series="FIXTURE_CORRELATION"
								:x-categories="TICKERS"
								:y-categories="TICKERS"
								:show-label="false"
								:show-axis="false"
								:height="300"
								title="No labels / no axes"
								data-cy="heatmap-flags-both-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="heatmap-slot-tooltip"
			>
				<origam-chart-heatmap
						:series="FIXTURE_ACTIVITY"
						:x-categories="HOURS"
						:y-categories="DAYS"
						:height="400"
						title="Custom tooltip"
						data-cy="heatmap-slot-tooltip-chart"
				>
					<template #tooltip="{ point }">
						<div class="custom-tooltip">
							<strong>{{ point?.x }} h</strong>
							<span>{{ point?.y }} commits</span>
						</div>
					</template>
				</origam-chart-heatmap>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="heatmap-slot-empty"
			>
				<origam-chart-heatmap
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="heatmap-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No activity data available for this period.
						</div>
					</template>
				</origam-chart-heatmap>
			</div>
		</Variant>

		<Variant title="Emit — point-click on cell">
			<div
					class="story-shell"
					data-cy="heatmap-emit"
			>
				<origam-chart-heatmap
						:series="FIXTURE_ACTIVITY"
						:x-categories="HOURS"
						:y-categories="DAYS"
						:height="400"
						title="Click a cell"
						data-cy="heatmap-emit-chart"
						@point-click="onPointClick"
				/>
				<pre
						class="story-log"
						data-cy="heatmap-emit-log"
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

	import { OrigamChartHeatmap } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + 'h')
	const TICKERS = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSLA']

	const seedRandom = (seed: number): (() => number) => {
		let s = seed
		return () => {
			s = (s * 16807 + 0) % 2147483647
			return (s - 1) / 2147483646
		}
	}

	const buildActivityData = (): Array<{ x: number | string, y: number | string, value: number }> => {
		const rand = seedRandom(42)
		const data: Array<{ x: number | string, y: number | string, value: number }> = []
		for (const day of DAYS) {
			for (const hour of HOURS) {
				const base = rand() * 5
				const spike = rand() > 0.93 ? rand() * 45 : 0
				data.push({ x: hour, y: day, value: Math.round(base + spike) })
			}
		}
		return data
	}

	const buildCorrelationData = (): Array<{ x: number | string, y: number | string, value: number }> => {
		const rand = seedRandom(7)
		const data: Array<{ x: number | string, y: number | string, value: number }> = []
		for (let i = 0; i < TICKERS.length; i++) {
			for (let j = 0; j < TICKERS.length; j++) {
				const val = i === j ? 1 : Math.abs((i - j) / 5) * (rand() * 2 - 1)
				data.push({ x: TICKERS[j], y: TICKERS[i], value: parseFloat(val.toFixed(2)) })
			}
		}
		return data
	}

	const FIXTURE_ACTIVITY: Array<IChartSeries> = [
		{ name: 'Commits', data: buildActivityData() }
	]

	const FIXTURE_CORRELATION: Array<IChartSeries> = [
		{ name: 'Correlation', data: buildCorrelationData() }
	]

	const logLines = ref<Array<string>>([])

	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → x="${ point.x }" y=${ point.y }`)
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

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
