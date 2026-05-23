<template>
	<Story
			group="components"
			title="Chart/OrigamChartMap"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					mode: 'choropleth',
					height: 400,
					animated: true,
					showLegend: true,
					showTooltip: true,
					legendPosition: 'bottom',
					routeCurvature: 0.3,
					nodeRadius: 4
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="map-playground"
				>
					<origam-chart-map
							:mode="state.mode"
							:series="state.mode === 'choropleth' ? FIXTURE_GDP : FIXTURE_ROUTES"
							:height="Number(state.height)"
							:animated="Boolean(state.animated)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							:legend-position="state.legendPosition"
							:route-curvature="Number(state.routeCurvature)"
							:node-radius="Number(state.nodeRadius)"
							title="World Map"
							subtitle="Origam Design System"
							data-cy="map-playground-chart"
							@point-click="onPointClick"
					/>
					<pre
							class="story-log"
							data-cy="map-playground-log"
					>{{ logLines.join('\n') }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.mode"
						title="mode"
						:options="MODE_OPTIONS"
				/>
				<HstNumber
						v-model="state.height"
						title="height (px)"
				/>
				<HstNumber
						v-model="state.routeCurvature"
						title="routeCurvature [0..1]"
				/>
				<HstNumber
						v-model="state.nodeRadius"
						title="nodeRadius (px)"
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
			</template>
		</Variant>

		<Variant title="Prop — mode (choropleth vs flight-routes)">
			<div
					class="story-shell"
					data-cy="map-mode"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>choropleth (GDP by country)</strong>
						<origam-chart-map
								mode="choropleth"
								:series="FIXTURE_GDP"
								:height="320"
								title="GDP by Country"
								subtitle="Approximate trillions USD"
								data-cy="map-mode-choropleth"
						/>
					</div>
					<div class="story-col">
						<strong>flight-routes (routes from GB)</strong>
						<origam-chart-map
								mode="flight-routes"
								:series="FIXTURE_ROUTES"
								:height="320"
								:show-legend="false"
								title="Routes from GB"
								data-cy="map-mode-routes"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorRange (info→danger vs primary→success)">
			<div
					class="story-shell"
					data-cy="map-color-range"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>info → danger (default)</strong>
						<origam-chart-map
								mode="choropleth"
								:series="FIXTURE_GDP"
								:color-range="['info', 'danger']"
								:height="300"
								data-cy="map-color-range-default"
						/>
					</div>
					<div class="story-col">
						<strong>primary → success</strong>
						<origam-chart-map
								mode="choropleth"
								:series="FIXTURE_GDP"
								:color-range="['primary', 'success']"
								:height="300"
								data-cy="map-color-range-alt"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — routeCurvature (0 straight vs 0.5 arc)">
			<div
					class="story-shell"
					data-cy="map-curvature"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>routeCurvature=0 (straight)</strong>
						<origam-chart-map
								mode="flight-routes"
								:series="FIXTURE_ROUTES"
								:route-curvature="0"
								:show-legend="false"
								:height="300"
								data-cy="map-curvature-straight"
						/>
					</div>
					<div class="story-col">
						<strong>routeCurvature=0.5 (arc)</strong>
						<origam-chart-map
								mode="flight-routes"
								:series="FIXTURE_ROUTES"
								:route-curvature="0.5"
								:show-legend="false"
								:height="300"
								data-cy="map-curvature-arc"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="map-slot-tooltip"
			>
				<origam-chart-map
						mode="choropleth"
						:series="FIXTURE_GDP"
						:height="380"
						title="Custom tooltip — hover a coloured country"
						data-cy="map-slot-tooltip-chart"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category }}</strong>
							<span>{{ typeof point?.y === 'number' ? point.y.toFixed(2) + 'T USD' : '' }}</span>
						</div>
					</template>
				</origam-chart-map>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="map-slot-empty"
			>
				<origam-chart-map
						mode="choropleth"
						:series="[]"
						:height="320"
						title="Empty state"
						data-cy="map-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							No country data available for this period.
						</div>
					</template>
				</origam-chart-map>
			</div>
		</Variant>

		<Variant title="Emit — point-click">
			<div
					class="story-shell"
					data-cy="map-emit"
			>
				<origam-chart-map
						mode="choropleth"
						:series="FIXTURE_GDP"
						:height="360"
						title="Click a coloured country"
						data-cy="map-emit-chart"
						@point-click="onPointClick"
				/>
				<pre
						class="story-log"
						data-cy="map-emit-log"
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

	import OrigamChartMap from '@origam/components/Chart/OrigamChartMap.vue'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import type { IChartMapChoroplethDatum, IChartMapRouteDatum } from '@origam/interfaces/Chart/chart-map.interface'

	import { useStoryInitState } from '@stories/composables'

	const MODE_OPTIONS = [
		{ value: 'choropleth', label: 'choropleth' },
		{ value: 'flight-routes', label: 'flight-routes' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const GDP_DATA: Array<IChartMapChoroplethDatum> = [
		{ code: 'US', value: 27.4, name: 'United States' },
		{ code: 'CN', value: 17.7, name: 'China' },
		{ code: 'DE', value: 4.4, name: 'Germany' },
		{ code: 'JP', value: 4.2, name: 'Japan' },
		{ code: 'IN', value: 3.7, name: 'India' },
		{ code: 'GB', value: 3.1, name: 'United Kingdom' },
		{ code: 'FR', value: 2.9, name: 'France' },
		{ code: 'IT', value: 2.1, name: 'Italy' },
		{ code: 'CA', value: 2.1, name: 'Canada' },
		{ code: 'BR', value: 2.1, name: 'Brazil' },
		{ code: 'RU', value: 1.9, name: 'Russia' },
		{ code: 'KR', value: 1.7, name: 'South Korea' },
		{ code: 'AU', value: 1.7, name: 'Australia' },
		{ code: 'ES', value: 1.6, name: 'Spain' },
		{ code: 'MX', value: 1.4, name: 'Mexico' },
		{ code: 'ID', value: 1.4, name: 'Indonesia' },
		{ code: 'TR', value: 1.1, name: 'Turkey' },
		{ code: 'NL', value: 1.1, name: 'Netherlands' },
		{ code: 'AR', value: 0.6, name: 'Argentina' },
		{ code: 'ZA', value: 0.4, name: 'South Africa' }
	]

	const FIXTURE_GDP: Array<IChartSeries> = [
		{ name: 'GDP (trillions USD)', data: GDP_DATA as any }
	]

	const ROUTES_DATA: Array<IChartMapRouteDatum> = [
		{ from: 'GB', to: 'US', value: 850 },
		{ from: 'GB', to: 'FR', value: 400 },
		{ from: 'GB', to: 'DE', value: 350 },
		{ from: 'GB', to: 'JP', value: 280 },
		{ from: 'GB', to: 'IN', value: 260 },
		{ from: 'GB', to: 'AU', value: 220 },
		{ from: 'GB', to: 'ZA', value: 180 },
		{ from: 'GB', to: 'BR', value: 160 }
	]

	const FIXTURE_ROUTES: Array<IChartSeries> = [
		{ name: 'Routes from GB', data: ROUTES_DATA as any }
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
