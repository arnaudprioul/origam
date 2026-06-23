<template>
	<Story
			group="components"
			title="Chart/OrigamChartHoneycomb"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IChartHoneycombProps>>({
					orientation: 'pointy-top',
					colorMode: 'categorical',
					tileSize: 30,
					tileGap: 2,
					title: 'Hex tile grid',
					subtitle: '3×3 categorical'
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-chart-honeycomb
							:orientation="state.orientation"
							:color-mode="state.colorMode"
							:heatmap-color-range="state.colorMode === 'heatmap' ? ['info', 'danger'] : undefined"
							:tile-size="state.tileSize"
							:tile-gap="state.tileGap"
							:series="FIXTURE_HEATMAP"
							:height="360"
							:bg-color="state.bgColor"
							:elevation="state.elevation"
							:rounded="state.rounded"
							:aspect-ratio="state.aspectRatio"
							:title="state.title"
							:subtitle="state.subtitle"
							:show-label="true"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Orientation">
					<HstSelect v-model="state.orientation" title="Orientation" :options="ORIENTATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.bgColor"   title="Bg Color"   :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.colorMode" title="Color Mode" :options="COLOR_MODE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Tile Sizing">
					<HstNumber v-model="state.tileSize" title="Tile Size" :min="10" :max="80" :step="5"/>
					<HstNumber v-model="state.tileGap"  title="Tile Gap"  :min="0"  :max="20" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Labels">
					<HstText v-model="state.title"      title="Title"/>
					<HstText v-model="state.subtitle"   title="Subtitle"/>
					<HstText v-model="state.aspectRatio" title="Aspect Ratio"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IChartHoneycombProps>>({
					showLabel: true,
					showLegend: true,
					legendPosition: 'bottom',
					showTooltip: true,
					animated: true,
					animationDuration: 600
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-chart-honeycomb
							:series="FIXTURE_3X3"
							:height="360"
							:show-label="state.showLabel"
							:show-legend="state.showLegend"
							:legend-position="state.legendPosition"
							:show-tooltip="state.showTooltip"
							:animated="state.animated"
							:animation-duration="state.animationDuration"
							title="Functional controls"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Display">
					<HstCheckbox v-model="state.showLabel"   title="Show Label"/>
					<HstCheckbox v-model="state.showLegend"  title="Show Legend"/>
					<HstCheckbox v-model="state.showTooltip" title="Show Tooltip"/>
				</StoryGroup>
				<StoryGroup title="Legend">
					<HstSelect v-model="state.legendPosition" title="Legend Position" :options="LEGEND_POSITION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Animation">
					<HstCheckbox v-model="state.animated"         title="Animated"/>
					<HstNumber   v-model="state.animationDuration" title="Duration (ms)" :min="100" :max="2000" :step="100"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - point-click">
			<div class="story-shell">
				<origam-chart-honeycomb
						:series="FIXTURE_3X3"
						:height="360"
						title="Click on a tile"
						@point-click="logEvent('point-click', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Events - legend-click">
			<div class="story-shell">
				<origam-chart-honeycomb
						:series="FIXTURE_3X3"
						:height="360"
						title="Click on a legend entry"
						@legend-click="logEvent('legend-click', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Events - series-toggle">
			<div class="story-shell">
				<origam-chart-honeycomb
						:series="FIXTURE_3X3"
						:height="360"
						title="Toggle a series via the legend"
						@series-toggle="logEvent('series-toggle', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Slots - Title">
			<div class="story-shell">
				<origam-chart-honeycomb
						:series="FIXTURE_3X3"
						:height="360"
				>
					<template #title>
						<strong>Custom title</strong>
						<em> — overriding the default header</em>
					</template>
				</origam-chart-honeycomb>
			</div>
		</Variant>

		<Variant title="Slots - Tooltip">
			<div class="story-shell">
				<origam-chart-honeycomb
						:series="FIXTURE_HEATMAP"
						color-mode="heatmap"
						:height="360"
						title="Custom tooltip"
				>
					<template #tooltip="{ point, category }">
						<div class="custom-tooltip">
							<strong>{{ category || point?.x }}</strong>
							<span>Value: {{ point?.y }}</span>
						</div>
					</template>
				</origam-chart-honeycomb>
			</div>
		</Variant>

		<Variant title="Slots - Legend-Item">
			<div class="story-shell">
				<origam-chart-honeycomb
						:series="FIXTURE_3X3"
						:height="360"
						title="Custom legend items"
				>
					<template #legend-item="{ series, visible }">
						<span
								class="custom-legend-item"
								:style="{ opacity: visible ? 1 : 0.4 }"
						>
							{{ series.name }}
						</span>
					</template>
				</origam-chart-honeycomb>
			</div>
		</Variant>

		<Variant title="Slots - Empty">
			<div class="story-shell">
				<origam-chart-honeycomb
						:series="[]"
						:height="320"
						title="Empty state"
				>
					<template #empty>
						<div class="custom-empty">
							No hex tile data available for this period.
						</div>
					</template>
				</origam-chart-honeycomb>
			</div>
		</Variant>

		<Variant title="Slots - Tile-Label">
			<div class="story-shell">
				<origam-chart-honeycomb
						:series="FIXTURE_3X3"
						:height="360"
						:show-label="true"
						title="Custom tile label"
				>
					<template #tile-label="{ name, value, x, y }">
						<tspan
								text-anchor="middle"
								dominant-baseline="middle"
								style="font-size: 0.5rem; font-weight: 700;"
						>{{ name || `${x},${y}` }}{{ value !== undefined ? ` (${value})` : '' }}</tspan>
					</template>
				</origam-chart-honeycomb>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IChartHoneycombProps>>({
					orientation: 'pointy-top',
					colorMode: 'categorical',
					showLabel: true,
					showLegend: true,
					legendPosition: 'bottom',
					showTooltip: true,
					animated: true,
					tileSize: 30,
					tileGap: 2,
					title: 'Hex tile grid',
					subtitle: '3×3 categorical'
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-chart-honeycomb
							:orientation="state.orientation"
							:color-mode="state.colorMode"
							:series="FIXTURE_3X3"
							:height="400"
							:tile-size="state.tileSize"
							:tile-gap="state.tileGap"
							:show-label="state.showLabel"
							:show-legend="state.showLegend"
							:show-tooltip="state.showTooltip"
							:legend-position="state.legendPosition"
							:animated="state.animated"
							:bg-color="state.bgColor"
							:elevation="state.elevation"
							:rounded="state.rounded"
							:title="state.title"
							:subtitle="state.subtitle"
							@point-click="logEvent('point-click', $event)"
							@legend-click="logEvent('legend-click', $event)"
							@series-toggle="logEvent('series-toggle', $event)"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title"    title="Title"/>
					<HstText v-model="state.subtitle" title="Subtitle"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect   v-model="state.orientation" title="Orientation" :options="ORIENTATION_OPTIONS"/>
					<HstSelect   v-model="state.colorMode"   title="Color Mode"  :options="COLOR_MODE_OPTIONS"/>
					<HstSelect   v-model="state.bgColor"     title="Bg Color"    :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.elevation"   title="Elevation"   :options="ELEVATION_OPTIONS"/>
					<HstSelect   v-model="state.rounded"     title="Rounded"     :options="ROUNDED_OPTIONS"/>
					<HstNumber   v-model="state.tileSize"    title="Tile Size"   :min="10" :max="80" :step="5"/>
					<HstNumber   v-model="state.tileGap"     title="Tile Gap"    :min="0"  :max="20" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.showLabel"    title="Show Label"/>
					<HstCheckbox v-model="state.showLegend"   title="Show Legend"/>
					<HstCheckbox v-model="state.showTooltip"  title="Show Tooltip"/>
					<HstCheckbox v-model="state.animated"     title="Animated"/>
					<HstSelect   v-model="state.legendPosition" title="Legend Position" :options="LEGEND_POSITION_OPTIONS"/>
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

	import { OrigamChartHoneycomb } from '@origam/components'
	import { CHART_HONEYCOMB_COLOR_MODE, CHART_HONEYCOMB_ORIENTATION } from '@origam/enums'
	import type { IChartHoneycombProps, IChartSeries } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		ROUNDED_OPTIONS
	} from '@stories/const'

	const ORIENTATION_OPTIONS = [
		{ value: CHART_HONEYCOMB_ORIENTATION.POINTY_TOP, label: 'pointy-top' },
		{ value: CHART_HONEYCOMB_ORIENTATION.FLAT_TOP,   label: 'flat-top' }
	]

	const COLOR_MODE_OPTIONS = [
		{ value: CHART_HONEYCOMB_COLOR_MODE.CATEGORICAL, label: 'categorical' },
		{ value: CHART_HONEYCOMB_COLOR_MODE.HEATMAP,     label: 'heatmap' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top',    label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left',   label: 'left' },
		{ value: 'right',  label: 'right' }
	]

	const FIXTURE_3X3: Array<IChartSeries> = [
		{
			name: 'Grid 3x3',
			data: [
				{ x: 0, y: 0, name: 'A1', color: 'primary' },
				{ x: 1, y: 0, name: 'A2', color: 'success' },
				{ x: 2, y: 0, name: 'A3', color: 'warning' },
				{ x: 0, y: 1, name: 'B1', color: 'danger' },
				{ x: 1, y: 1, name: 'B2', color: 'info' },
				{ x: 2, y: 1, name: 'B3', color: 'secondary' },
				{ x: 0, y: 2, name: 'C1', color: 'ghost' },
				{ x: 1, y: 2, name: 'C2', color: 'primary' },
				{ x: 2, y: 2, name: 'C3', color: 'success' }
			]
		}
	]

	const FIXTURE_HEATMAP: Array<IChartSeries> = [
		{
			name: 'Heatmap',
			data: [
				{ x: 0, y: 0, name: 'T1', value: 10 },
				{ x: 1, y: 0, name: 'T2', value: 25 },
				{ x: 2, y: 0, name: 'T3', value: 40 },
				{ x: 3, y: 0, name: 'T4', value: 55 },
				{ x: 0, y: 1, name: 'T5', value: 20 },
				{ x: 1, y: 1, name: 'T6', value: 60 },
				{ x: 2, y: 1, name: 'T7', value: 80 },
				{ x: 3, y: 1, name: 'T8', value: 35 },
				{ x: 0, y: 2, name: 'T9', value: 90 },
				{ x: 1, y: 2, name: 'T10', value: 45 },
				{ x: 2, y: 2, name: 'T11', value: 15 },
				{ x: 3, y: 2, name: 'T12', value: 70 }
			]
		}
	]
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
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

	.custom-empty {
		color: var(--origam-color-text-secondary, #6b7280);
		font-style: italic;
	}
</style>

<docs
		lang="md"
		src="@docs/components/Chart/OrigamChartHoneycomb.md"
/>
