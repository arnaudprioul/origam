<template>
	<Story
			group="components"
			title="Chart/OrigamChartSankey"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					height: 400,
					animated: true,
					showLegend: false,
					showTooltip: true,
					legendPosition: 'bottom',
					nodeWidth: 16,
					nodePadding: 8,
					linkOpacity: 0.4,
					showLabel: true
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="sankey-playground"
				>
					<origam-chart-sankey
							:series="FIXTURE_WEB_FUNNEL"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:legend-position="state.legendPosition"
							:node-width="Number(state.nodeWidth)"
							:node-padding="Number(state.nodePadding)"
							:link-opacity="Number(state.linkOpacity)"
							:show-label="Boolean(state.showLabel)"
							title="Web funnel flow"
							subtitle="May 2026"
							data-cy="sankey-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="sankey-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstNumber
						v-model="state.nodeWidth"
						title="nodeWidth"
				/>
				<HstNumber
						v-model="state.nodePadding"
						title="nodePadding"
				/>
				<HstSlider
						v-model="state.linkOpacity"
						title="linkOpacity"
						:min="0"
						:max="1"
						:step="0.05"
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
			</template>
		</Variant>

		<Variant title="Prop — nodeWidth / nodePadding (compact vs spaced)">
			<div
					class="story-shell"
					data-cy="sankey-node-sizing"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>compact (nodeWidth=8, nodePadding=4)</strong>
						<origam-chart-sankey
								:series="FIXTURE_ENERGY"
								:height="360"
								:node-width="8"
								:node-padding="4"
								title="Energy budget — compact"
								data-cy="sankey-compact"
						/>
					</div>
					<div class="story-col">
						<strong>spaced (nodeWidth=24, nodePadding=16)</strong>
						<origam-chart-sankey
								:series="FIXTURE_ENERGY"
								:height="360"
								:node-width="24"
								:node-padding="16"
								title="Energy budget — spaced"
								data-cy="sankey-spaced"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — linkOpacity (translucent vs opaque)">
			<div
					class="story-shell"
					data-cy="sankey-link-opacity"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>translucent (linkOpacity=0.2)</strong>
						<origam-chart-sankey
								:series="FIXTURE_WEB_FUNNEL"
								:height="360"
								:link-opacity="0.2"
								title="Translucent links"
								data-cy="sankey-translucent"
						/>
					</div>
					<div class="story-col">
						<strong>opaque (linkOpacity=0.85)</strong>
						<origam-chart-sankey
								:series="FIXTURE_WEB_FUNNEL"
								:height="360"
								:link-opacity="0.85"
								title="Opaque links"
								data-cy="sankey-opaque"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (DS intents vs custom palette)">
			<div
					class="story-shell"
					data-cy="sankey-color-scheme"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default DS intent cycle</strong>
						<origam-chart-sankey
								:series="FIXTURE_ENERGY"
								:height="360"
								title="DS intents"
								data-cy="sankey-color-intents"
						/>
					</div>
					<div class="story-col">
						<strong>custom palette</strong>
						<origam-chart-sankey
								:series="FIXTURE_ENERGY"
								:color-scheme="['#6366f1','#8b5cf6','#ec4899']"
								:height="360"
								title="Custom palette"
								data-cy="sankey-color-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="sankey-slot-tooltip"
			>
				<origam-chart-sankey
						:series="FIXTURE_WEB_FUNNEL"
						:height="380"
						title="Custom tooltip"
						data-cy="sankey-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category }}</strong>
							<span>{{ typeof point?.y === 'number' ? point.y.toLocaleString() : (point?.y ?? '') }} users</span>
						</div>
					</template>
				</origam-chart-sankey>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="sankey-slot-empty"
			>
				<origam-chart-sankey
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="sankey-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No flow data available for this period.
						</div>
					</template>
				</origam-chart-sankey>
			</div>
		</Variant>

		<Variant title="Emit — point-click on node + link">
			<div
					class="story-shell"
					data-cy="sankey-emit"
			>
				<origam-chart-sankey
						:series="FIXTURE_WEB_FUNNEL"
						:height="360"
						title="Interact — click nodes or links"
						data-cy="sankey-emit-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="sankey-emit-log"
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

	import { OrigamChartSankey } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const FIXTURE_ENERGY: Array<IChartSeries> = [
		{
			name: 'Energy budget',
			data: [
				{ from: 'Solar', to: 'Grid', value: 30 },
				{ from: 'Wind', to: 'Grid', value: 25 },
				{ from: 'Nuclear', to: 'Grid', value: 20 },
				{ from: 'Grid', to: 'Residential', value: 35 },
				{ from: 'Grid', to: 'Industrial', value: 25 },
				{ from: 'Grid', to: 'Commercial', value: 15 }
			] as any
		}
	]

	const FIXTURE_WEB_FUNNEL: Array<IChartSeries> = [
		{
			name: 'Web funnel',
			data: [
				{ from: 'Home', to: 'Catalogue', value: 100 },
				{ from: 'Catalogue', to: 'Cart', value: 40 },
				{ from: 'Catalogue', to: 'Exit', value: 60 },
				{ from: 'Cart', to: 'Checkout', value: 25 },
				{ from: 'Cart', to: 'Exit', value: 15 },
				{ from: 'Checkout', to: 'Success', value: 20 },
				{ from: 'Checkout', to: 'Failure', value: 5 }
			] as any
		}
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
