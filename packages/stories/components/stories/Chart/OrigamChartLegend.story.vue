<template>
	<Story
			group="components"
			title="Chart/OrigamChartLegend"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<IChartLegendProps>({ items: ITEMS_3, position: 'bottom' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<div
							class="legend-host"
							:class="`legend-host--${state.position}`"
					>
						<origam-chart-legend
								:items="state.items"
								:position="state.position"
						/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstSelect
							v-model="state.position"
							title="Position"
							:options="CHART_LEGEND_POSITION_OPTIONS"
					/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<IChartLegendProps>({ items: ITEMS_3, position: 'bottom' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<div
							class="legend-host"
							:class="`legend-host--${state.position}`"
					>
						<origam-chart-legend
								:items="state.items"
								:position="state.position"
						/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstSelect
							v-model="state.items"
							title="Items"
							:options="ITEMS_OPTIONS"
					/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstSelect
							v-model="state.position"
							title="Position"
							:options="CHART_LEGEND_POSITION_OPTIONS"
					/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - legend-click">
			<origam-chart-legend
					:items="ITEMS_3"
					position="bottom"
					@legend-click="logEvent('legend-click', $event)"
			/>
		</Variant>

		<Variant title="Events - series-toggle">
			<origam-chart-legend
					:items="ITEMS_3"
					position="bottom"
					@series-toggle="logEvent('series-toggle', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - legend-item">
			<origam-chart-legend
					:items="ITEMS_3"
					position="bottom"
			>
				<template #legend-item="{ series, visible, index }">
					<span
							class="custom-legend-item"
							:style="{ opacity: visible ? 1 : 0.4 }"
					>
						<span
								class="custom-legend-item__swatch"
								:style="{ backgroundColor: COLORS[index] ?? '#9ca3af' }"
						/>
						<span class="custom-legend-item__name">{{ series.name }}</span>
						<span class="custom-legend-item__badge">{{ index + 1 }}</span>
					</span>
				</template>
			</origam-chart-legend>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IChartLegendProps>({ items: ITEMS_3, position: 'bottom' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<div
							class="legend-host"
							:class="`legend-host--${state.position}`"
					>
						<origam-chart-legend
								v-bind="state"
								@legend-click="logEvent('legend-click', $event)"
								@series-toggle="logEvent('series-toggle', $event)"
						/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstSelect
							v-model="state.items"
							title="Items"
							:options="ITEMS_OPTIONS"
					/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect
							v-model="state.position"
							title="Position"
							:options="CHART_LEGEND_POSITION_OPTIONS"
					/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamChartLegend } from '@origam/components'
	import type {
		IChartLegendItem,
		IChartLegendProps,
		IChartSeries
	} from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	const CHART_LEGEND_POSITION_OPTIONS = [
		{ label: 'top', value: 'top' },
		{ label: 'bottom', value: 'bottom' },
		{ label: 'left', value: 'left' },
		{ label: 'right', value: 'right' }
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

	const ITEMS_OPTIONS = [
		{ label: '1 item', value: ITEMS_1 },
		{ label: '3 items', value: ITEMS_3 },
		{ label: '7 items', value: ITEMS_7 }
	]
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
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

	.custom-legend-item__badge {
		font-size: 0.625rem;
		padding: 1px 5px;
		border-radius: 999px;
		background-color: rgba(0, 0, 0, 0.08);
		font-weight: 600;
	}
</style>

<docs
		lang="md"
		src="@docs/components/Chart/OrigamChartLegend.md"
/>
