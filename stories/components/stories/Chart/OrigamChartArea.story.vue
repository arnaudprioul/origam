<template>
	<Story
			group="components"
			title="Chart/OrigamChartArea"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IChartAreaProps>({
					series: makeDemoSeries(),
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
					height: 320,
					title: 'Area chart',
					subtitle: 'origam demo data',
					showLegend: true,
					legendPosition: 'bottom',
					showTooltip: true,
					animated: true,
					animationDuration: 600
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="chart-area-default"
				>
					<origam-chart-area
							v-bind="state"
							data-cy="chart-area-default-host"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.title" title="title" />
				<HstText v-model="state.subtitle" title="subtitle" />
				<HstNumber v-model="state.height" title="height (px)" />
				<HstCheckbox v-model="state.showLegend" title="showLegend" />
				<HstSelect
						v-model="state.legendPosition"
						title="legendPosition"
						:options="legendPositionOptions"
				/>
				<HstCheckbox v-model="state.showTooltip" title="showTooltip" />
				<HstCheckbox v-model="state.animated" title="animated" />
				<HstNumber v-model="state.animationDuration" title="animationDuration (ms)" />
			</template>
		</Variant>

		<Variant title="Prop — legendPosition (top / right / bottom / left)">
			<div class="story-shell" data-cy="chart-area-legend">
				<p class="hint">
					Anchor of the legend block. The plotting area shrinks
					accordingly via flex layout.
				</p>
				<div
						v-for="pos in legendPositions"
						:key="pos"
						class="story-col"
				>
					<strong>legendPosition = {{ pos }}</strong>
					<origam-chart-area
							:series="makeDemoSeries()"
							:categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
							:height="220"
							:legend-position="pos"
							:data-cy="`chart-area-legend-${pos}`"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — animated (on / off)">
			<div class="story-shell" data-cy="chart-area-animated">
				<p class="hint">
					Toggle the entrance animation. Respects
					<code>prefers-reduced-motion</code>.
				</p>
				<div class="story-col">
					<strong>animated = true</strong>
					<origam-chart-area
							:series="makeDemoSeries()"
							:categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
							:height="240"
							:animated="true"
							data-cy="chart-area-animated-on"
					/>
				</div>
				<div class="story-col">
					<strong>animated = false</strong>
					<origam-chart-area
							:series="makeDemoSeries()"
							:categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
							:height="240"
							:animated="false"
							data-cy="chart-area-animated-off"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — title (custom title block)">
			<div class="story-shell" data-cy="chart-area-slot-title">
				<p class="hint">
					Override the title block — the default renders
					`title` + `subtitle` text. Slot has no bindings.
				</p>
				<origam-chart-area
						:series="makeDemoSeries()"
						:categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
						:height="280"
						data-cy="chart-area-slot-title-host"
				>
					<template #title>
						<div class="custom-title">
							<span class="custom-title__badge">LIVE</span>
							<strong class="custom-title__text">Area — custom slot title</strong>
						</div>
					</template>
				</origam-chart-area>
			</div>
		</Variant>

		<Variant title="Slot — empty (no series state)">
			<div class="story-shell" data-cy="chart-area-slot-empty">
				<p class="hint">
					Renders when `series` is an empty array — useful for
					loading states or filtered-out datasets.
				</p>
				<origam-chart-area
						:series="[]"
						:height="200"
						data-cy="chart-area-slot-empty-host"
				>
					<template #empty>
						<div class="custom-empty">No data to display</div>
					</template>
				</origam-chart-area>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle (counters)">
			<div class="story-shell" data-cy="chart-area-emits">
				<p class="hint">
					Click a data point, click a legend entry, or
					toggle a series via the legend to see the counters
					increment.
				</p>
				<origam-chart-area
						:series="makeDemoSeries()"
						:categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
						:height="280"
						data-cy="chart-area-emits-host"
						@point-click="counters.pointClick++"
						@legend-click="counters.legendClick++"
						@series-toggle="counters.seriesToggle++"
				/>
				<dl class="story-counters">
					<div>
						<dt>point-click</dt>
						<dd data-cy="chart-area-emit-count-point">{{ counters.pointClick }}</dd>
					</div>
					<div>
						<dt>legend-click</dt>
						<dd data-cy="chart-area-emit-count-legend">{{ counters.legendClick }}</dd>
					</div>
					<div>
						<dt>series-toggle</dt>
						<dd data-cy="chart-area-emit-count-toggle">{{ counters.seriesToggle }}</dd>
					</div>
				</dl>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamChartArea } from '@origam/components'

	import type { IChartAreaProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const legendPositions = ['top', 'right', 'bottom', 'left'] as const
	const legendPositionOptions = legendPositions.map(value => ({ label: value, value }))

	function makeDemoSeries () {
		return [
			{ name: 'Revenue', data: [120, 145, 132, 168, 195, 210], color: 'primary' as const },
			{ name: 'Expenses', data: [80, 92, 88, 105, 118, 124], color: 'warning' as const }
		]
	}

	const counters = ref({
		pointClick: 0,
		legendClick: 0,
		seriesToggle: 0
	})
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		padding: 16px;
		max-width: 720px;
	}

	.hint {
		flex-basis: 100%;
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px;
		border-radius: 8px;
		background: var(--origam-color__surface---raised, #f5f5f5);
		min-width: 280px;
		flex: 1 1 280px;
	}

	.story-col strong {
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #171717);
	}

	.custom-title {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px;
		background: var(--origam-color__surface---raised, #f5f5f5);
		border-radius: 6px;
	}

	.custom-title__badge {
		padding: 2px 8px;
		background: var(--origam-color__action--danger---bg, #ef4444);
		color: #ffffff;
		border-radius: 4px;
		font: 700 0.7rem/1 ui-monospace, monospace;
		letter-spacing: 0.05em;
	}

	.custom-title__text {
		font: 600 0.95rem/1.2 system-ui, sans-serif;
	}

	.custom-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 32px;
		font: 0.95rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #6b7280);
		background: var(--origam-color__surface---raised, #f5f5f5);
		border-radius: 8px;
		width: 100%;
	}

	.story-counters {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin: 0;
		padding: 12px;
		background: var(--origam-color__surface---raised, #f3f4f6);
		border-radius: 8px;
	}

	.story-counters > div {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.story-counters dt {
		font: 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-counters dd {
		margin: 0;
		font: 600 1rem/1.2 system-ui, sans-serif;
	}
</style>

<docs lang="md" src="@docs/components/Chart/OrigamChartArea.md"/>
