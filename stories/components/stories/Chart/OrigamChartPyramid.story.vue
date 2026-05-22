<template>
	<Story
			group="components"
			title="Chart/OrigamChartPyramid"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					type: 'pyramid',
					height: 400,
					animated: true,
					showLegend: true,
					showTooltip: true,
					legendPosition: 'bottom',
					labelPlacement: 'auto'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="pyramid-playground"
				>
					<origam-chart-pyramid
							:type="state.type"
							:series="FIXTURE_FUNNEL"
							:categories="FIXTURE_FUNNEL_CATEGORIES"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:legend-position="state.legendPosition"
							:label-placement="state.labelPlacement"
							title="Conversion pyramid"
							subtitle="Q1 2026"
							data-cy="pyramid-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="pyramid-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.type"
						title="type"
						:options="TYPE_OPTIONS"
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
				<HstSelect
						v-model="state.labelPlacement"
						title="labelPlacement"
						:options="LABEL_PLACEMENT_OPTIONS"
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
			</template>
		</Variant>

		<Variant title="Prop — type (funnel / pyramid side by side)">
			<div
					class="story-shell"
					data-cy="pyramid-types"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>funnel (widest at top)</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="360"
								title="Funnel"
								data-cy="pyramid-type-funnel"
						/>
					</div>
					<div class="story-col">
						<strong>pyramid (widest at bottom)</strong>
						<origam-chart-pyramid
								type="pyramid"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="360"
								title="Pyramid"
								data-cy="pyramid-type-pyramid"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — series (3 / 5 / 8 slices)">
			<div
					class="story-shell"
					data-cy="pyramid-series"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>3 slices</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL_3"
								:categories="FIXTURE_FUNNEL_CATEGORIES_3"
								:height="280"
								data-cy="pyramid-series-3"
						/>
					</div>
					<div class="story-col">
						<strong>5 slices</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="280"
								data-cy="pyramid-series-5"
						/>
					</div>
					<div class="story-col">
						<strong>8 slices</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL_8"
								:categories="FIXTURE_FUNNEL_CATEGORIES_8"
								:height="280"
								data-cy="pyramid-series-8"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (intent cycle / custom / single-series color)">
			<div
					class="story-shell"
					data-cy="pyramid-color-scheme"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>default palette (intent cycle)</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL_NO_COLOR"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="280"
								data-cy="pyramid-color-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS colors</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL_NO_COLOR"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:color-scheme="['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ddd6fe']"
								:height="280"
								data-cy="pyramid-color-custom"
						/>
					</div>
					<div class="story-col">
						<strong>series.color = 'success'</strong>
						<origam-chart-pyramid
								type="pyramid"
								:series="FIXTURE_FUNNEL_SUCCESS"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="280"
								data-cy="pyramid-color-series"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — labelPlacement (auto / inside / outside)">
			<div
					class="story-shell"
					data-cy="pyramid-label-placement"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>auto (default)</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								label-placement="auto"
								:height="280"
								data-cy="pyramid-label-auto"
						/>
					</div>
					<div class="story-col">
						<strong>inside</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								label-placement="inside"
								:height="280"
								data-cy="pyramid-label-inside"
						/>
					</div>
					<div class="story-col">
						<strong>outside</strong>
						<origam-chart-pyramid
								type="funnel"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								label-placement="outside"
								:height="280"
								data-cy="pyramid-label-outside"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="pyramid-slot-tooltip"
			>
				<origam-chart-pyramid
						type="funnel"
						:series="FIXTURE_FUNNEL"
						:categories="FIXTURE_FUNNEL_CATEGORIES"
						:height="360"
						title="Custom tooltip"
						data-cy="pyramid-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category }}</strong>
							<span>{{ typeof point?.y === 'number' ? point.y.toLocaleString() : (point?.y ?? '') }} users</span>
						</div>
					</template>
				</origam-chart-pyramid>
			</div>
		</Variant>

		<Variant title="Slot — legend-item">
			<div
					class="story-shell"
					data-cy="pyramid-slot-legend-item"
			>
				<origam-chart-pyramid
						type="funnel"
						:series="FIXTURE_FUNNEL"
						:categories="FIXTURE_FUNNEL_CATEGORIES"
						:height="360"
						title="Custom legend"
						data-cy="pyramid-slot-legend-item-chart"
				>
					<template #legend-item="{ series, visible }">
						<span
								class="custom-legend-item"
								:style="{ opacity: visible ? 1 : 0.4 }"
						>
							{{ series.name }}
						</span>
					</template>
				</origam-chart-pyramid>
			</div>
		</Variant>

		<Variant title="Slot — title">
			<div
					class="story-shell"
					data-cy="pyramid-slot-title"
			>
				<origam-chart-pyramid
						type="funnel"
						:series="FIXTURE_FUNNEL"
						:categories="FIXTURE_FUNNEL_CATEGORIES"
						:height="380"
						data-cy="pyramid-slot-title-chart"
				>
					<template #title>
						<div class="custom-title">
							<strong>Marketing pipeline</strong>
							<em>Week 21 — 2026</em>
						</div>
					</template>
				</origam-chart-pyramid>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="pyramid-slot-empty"
			>
				<origam-chart-pyramid
						type="funnel"
						:series="[]"
						:categories="[]"
						:height="320"
						title="Empty state"
						data-cy="pyramid-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No pipeline data yet for this period.
						</div>
					</template>
				</origam-chart-pyramid>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle">
			<div
					class="story-shell"
					data-cy="pyramid-emit"
			>
				<origam-chart-pyramid
						type="funnel"
						:series="FIXTURE_FUNNEL"
						:categories="FIXTURE_FUNNEL_CATEGORIES"
						:height="360"
						title="Interact with the chart"
						data-cy="pyramid-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="pyramid-emit-log"
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

	import { OrigamChartPyramid } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const TYPE_OPTIONS = [
		{ value: 'funnel', label: 'funnel' },
		{ value: 'pyramid', label: 'pyramid' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const LABEL_PLACEMENT_OPTIONS = [
		{ value: 'auto', label: 'auto' },
		{ value: 'inside', label: 'inside' },
		{ value: 'outside', label: 'outside' }
	]

	const FIXTURE_FUNNEL_CATEGORIES = ['Visitors', 'Leads', 'Prospects', 'Demos', 'Customers']

	const FIXTURE_FUNNEL: Array<IChartSeries> = [
		{ name: 'Pipeline', data: [1000, 600, 200, 80, 50] }
	]

	const FIXTURE_FUNNEL_NO_COLOR: Array<IChartSeries> = [
		{ name: 'Pipeline', data: [1000, 600, 200, 80, 50] }
	]

	const FIXTURE_FUNNEL_SUCCESS: Array<IChartSeries> = [
		{ name: 'Pipeline', data: [1000, 600, 200, 80, 50], color: 'success' }
	]

	const FIXTURE_FUNNEL_CATEGORIES_3 = ['Awareness', 'Consideration', 'Conversion']

	const FIXTURE_FUNNEL_3: Array<IChartSeries> = [
		{ name: 'Sales', data: [2000, 800, 300] }
	]

	const FIXTURE_FUNNEL_CATEGORIES_8 = [
		'Impressions', 'Clicks', 'Sessions', 'Sign-ups',
		'Activations', 'Engagements', 'Purchases', 'Loyalists'
	]

	const FIXTURE_FUNNEL_8: Array<IChartSeries> = [
		{ name: 'Full pipeline', data: [50000, 12000, 6000, 2400, 1200, 600, 200, 80] }
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

	.custom-legend-item {
		font-size: 0.8125rem;
		padding: 2px 4px;
		cursor: pointer;
	}

	.custom-title {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>
