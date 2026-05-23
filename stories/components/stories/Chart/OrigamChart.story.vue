<template>
	<Story
			group="components"
			title="Chart/OrigamChart"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					type: 'line',
					height: 360,
					stacked: false,
					animated: true,
					legendPosition: 'bottom',
					smoothing: 'none',
					showGrid: true,
					showAxis: true,
					showLegend: true,
					showTooltip: true
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="chart-playground"
				>
					<origam-chart
							:type="state.type"
							:series="FIXTURE_SALES_SERIES"
							:categories="FIXTURE_MONTHS"
							:height="Number(state.height)"
							:stacked="Boolean(state.stacked)"
							:animated="Boolean(state.animated)"
							:legend-position="state.legendPosition"
							:smoothing="state.smoothing"
							:show-grid="Boolean(state.showGrid)"
							:show-axis="Boolean(state.showAxis)"
							:show-legend="Boolean(state.showLegend)"
							:show-tooltip="Boolean(state.showTooltip)"
							title="Monthly sales"
							subtitle="2025 vs 2026"
							data-cy="chart-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="chart-playground-log"
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
						v-model="state.smoothing"
						title="smoothing"
						:options="SMOOTHING_OPTIONS"
				/>
				<HstCheckbox
						v-model="state.stacked"
						title="stacked"
				/>
				<HstCheckbox
						v-model="state.animated"
						title="animated"
				/>
				<HstCheckbox
						v-model="state.showGrid"
						title="showGrid"
				/>
				<HstCheckbox
						v-model="state.showAxis"
						title="showAxis"
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

		<Variant title="Prop — type (25 primitives)">
			<div
					class="story-shell"
					data-cy="chart-types"
			>
				<p class="hint">
					One component, twenty-five visualisation primitives. Switch via the
					<code>type</code> prop; the rest of the API is shared.
				</p>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>line</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-line"
						/>
					</div>
					<div class="story-col">
						<strong>area</strong>
						<origam-chart
								type="area"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-area"
						/>
					</div>
					<div class="story-col">
						<strong>column</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-column"
						/>
					</div>
					<div class="story-col">
						<strong>bar</strong>
						<origam-chart
								type="bar"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-bar"
						/>
					</div>
					<div class="story-col">
						<strong>pie</strong>
						<origam-chart
								type="pie"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="240"
								data-cy="chart-type-pie"
						/>
					</div>
					<div class="story-col">
						<strong>donut</strong>
						<origam-chart
								type="donut"
								:series="FIXTURE_REVENUE_PIE"
								:categories="FIXTURE_COUNTRIES"
								:height="240"
								data-cy="chart-type-donut"
						/>
					</div>
					<div class="story-col">
						<strong>scatter</strong>
						<origam-chart
								type="scatter"
								:series="FIXTURE_SCATTER"
								:height="240"
								data-cy="chart-type-scatter"
						/>
					</div>
					<div class="story-col">
						<strong>radar</strong>
						<origam-chart
								type="radar"
								:series="FIXTURE_RADAR"
								:categories="FIXTURE_RADAR_AXES"
								:height="240"
								data-cy="chart-type-radar"
						/>
					</div>
					<div class="story-col">
						<strong>spline</strong>
						<origam-chart
								type="spline"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-spline"
						/>
					</div>
					<div class="story-col">
						<strong>stepped-line</strong>
						<origam-chart
								type="stepped-line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-type-stepped-line"
						/>
					</div>
					<div class="story-col">
						<strong>gauge</strong>
						<origam-chart
								type="gauge"
								:series="FIXTURE_GAUGE"
								:height="240"
								:gauge-min="0"
								:gauge-max="100"
								gauge-unit="%"
								data-cy="chart-type-gauge"
						/>
					</div>
					<div class="story-col">
						<strong>funnel</strong>
						<origam-chart
								type="funnel"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="240"
								data-cy="chart-type-funnel"
						/>
					</div>
					<div class="story-col">
						<strong>pyramid</strong>
						<origam-chart
								type="pyramid"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="240"
								data-cy="chart-type-pyramid"
						/>
					</div>
					<div class="story-col">
						<strong>honeycomb</strong>
						<origam-chart
								type="honeycomb"
								:series="FIXTURE_HONEYCOMB_3X3"
								:height="240"
								data-cy="chart-type-honeycomb"
						/>
					</div>
					<div class="story-col">
						<strong>treemap</strong>
						<origam-chart
								type="treemap"
								:series="FIXTURE_TREEMAP_TECH"
								:height="240"
								data-cy="chart-type-treemap"
						/>
					</div>
					<div class="story-col">
						<strong>sankey</strong>
						<origam-chart
								type="sankey"
								:series="FIXTURE_SANKEY_FUNNEL"
								:height="240"
								data-cy="chart-type-sankey"
						/>
					</div>
					<div class="story-col">
						<strong>word-cloud</strong>
						<origam-chart
								type="word-cloud"
								:series="FIXTURE_WORD_CLOUD_TECH"
								:height="240"
								data-cy="chart-type-word-cloud"
						/>
					</div>
					<div class="story-col">
						<strong>heatmap</strong>
						<origam-chart
								type="heatmap"
								:series="FIXTURE_HEATMAP"
								:height="240"
								data-cy="chart-type-heatmap"
						/>
					</div>
					<div class="story-col">
						<strong>sunburst</strong>
						<origam-chart
								type="sunburst"
								:series="FIXTURE_SUNBURST"
								:height="240"
								data-cy="chart-type-sunburst"
						/>
					</div>
					<div class="story-col">
						<strong>box-plot</strong>
						<origam-chart
								type="box-plot"
								:series="FIXTURE_BOXPLOT"
								:height="240"
								data-cy="chart-type-box-plot"
						/>
					</div>
					<div class="story-col">
						<strong>pictorial</strong>
						<origam-chart
								type="pictorial"
								:series="FIXTURE_PICTORIAL"
								:categories="FIXTURE_PICTORIAL_CATEGORIES"
								:height="240"
								data-cy="chart-type-pictorial"
						/>
					</div>
					<div class="story-col">
						<strong>candlestick</strong>
						<origam-chart
								type="candlestick"
								:series="FIXTURE_CANDLESTICK"
								:height="240"
								data-cy="chart-type-candlestick"
						/>
					</div>
					<div class="story-col">
						<strong>streamgraph</strong>
						<origam-chart
								type="streamgraph"
								:series="FIXTURE_STREAMGRAPH"
								:categories="FIXTURE_STREAMGRAPH_CATEGORIES"
								:height="240"
								data-cy="chart-type-streamgraph"
						/>
					</div>
					<div class="story-col">
						<strong>variwide</strong>
						<origam-chart
								type="variwide"
								:series="FIXTURE_VARIWIDE_GDP"
								:height="240"
								data-cy="chart-type-variwide"
						/>
					</div>
					<div class="story-col">
						<strong>polar-bar</strong>
						<origam-chart
								type="polar-bar"
								:series="FIXTURE_POLAR_BAR"
								:categories="FIXTURE_POLAR_BAR_CATEGORIES"
								:height="240"
								data-cy="chart-type-polar-bar"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — variwide (GDP × Population)">
			<div
					class="story-shell"
					data-cy="chart-variwide"
			>
				<origam-chart
						type="variwide"
						:series="FIXTURE_VARIWIDE_GDP"
						:height="360"
						title="GDP × Population (2023)"
						subtitle="Width = population (M) · Height = GDP (T$)"
						data-cy="chart-variwide-gdp"
				/>
			</div>
		</Variant>

		<Variant title="Prop — honeycomb tile-map">
			<div
					class="story-shell"
					data-cy="chart-honeycomb"
			>
				<origam-chart-honeycomb
						:series="FIXTURE_HONEYCOMB_3X3"
						:height="360"
						:show-label="true"
						title="Honeycomb grid"
						subtitle="9-tile categorical fixture"
						data-cy="chart-honeycomb-9tiles"
				/>
			</div>
		</Variant>

		<Variant title="Prop — pyramid / funnel (side by side)">
			<div
					class="story-shell"
					data-cy="chart-pyramid-funnel"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>funnel</strong>
						<origam-chart
								type="funnel"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="360"
								title="Conversion funnel"
								data-cy="chart-pyramid-funnel-funnel"
						/>
					</div>
					<div class="story-col">
						<strong>pyramid</strong>
						<origam-chart
								type="pyramid"
								:series="FIXTURE_FUNNEL"
								:categories="FIXTURE_FUNNEL_CATEGORIES"
								:height="360"
								title="Org pyramid"
								data-cy="chart-pyramid-funnel-pyramid"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Combination — series[i].type override (line + column / area + line)">
			<div
					class="story-shell"
					data-cy="chart-combination"
			>
				<p class="hint">
					Each series can override the chart-level <code>type</code>
					via its own <code>type</code> field, producing a
					<strong>mix chart</strong>. Common patterns:
					<code>column</code> volume with a <code>line</code>
					trend on top, or <code>area</code> baseline with a
					<code>line</code> highlight. The chart-level
					<code>type</code> drives the axes + plot geometry; each
					series-level <code>type</code> only picks its own
					rendering primitive.
				</p>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>column + line overlay</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_COMBO_COLUMN_LINE"
								:categories="FIXTURE_MONTHS"
								:height="320"
								data-cy="chart-combo-column-line"
						/>
					</div>
					<div class="story-col">
						<strong>area + line highlight</strong>
						<origam-chart
								type="area"
								:series="FIXTURE_COMBO_AREA_LINE"
								:categories="FIXTURE_MONTHS"
								:height="320"
								data-cy="chart-combo-area-line"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — pie / donut (concentric rings, multi-series)">
			<div
					class="story-shell"
					data-cy="chart-polar-rings"
			>
				<p class="hint">
					Multi-series pie / donut renders as <strong>concentric
					rings</strong> — series&nbsp;0 = inner ring,
					series&nbsp;N-1 = outer ring. Each ring is sliced by
					the same <code>categories</code>, with the SAME colour
					per category so cross-ring comparison is immediate.
					Clicking a ring's series in the legend toggles that
					whole ring.
				</p>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>donut, 2 series</strong>
						<origam-chart
								type="donut"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="320"
								data-cy="chart-rings-donut-2"
						/>
					</div>
					<div class="story-col">
						<strong>pie, 5 series</strong>
						<origam-chart
								type="pie"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="320"
								data-cy="chart-rings-pie-5"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — series (1 vs 2 vs 5 series)">
			<div
					class="story-shell"
					data-cy="chart-series-count"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>1 series</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_SALES_SERIES.slice(0, 1)"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-series-1"
						/>
					</div>
					<div class="story-col">
						<strong>2 series</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-series-2"
						/>
					</div>
					<div class="story-col">
						<strong>5 series</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-series-5"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — stacked (column)">
			<div
					class="story-shell"
					data-cy="chart-stacked"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>stacked = false</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:stacked="false"
								:height="280"
								data-cy="chart-stacked-off"
						/>
					</div>
					<div class="story-col">
						<strong>stacked = true</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:stacked="true"
								:height="280"
								data-cy="chart-stacked-on"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (palettes)">
			<div
					class="story-shell"
					data-cy="chart-palette"
			>
				<p class="hint">
					Both demos use <code>FIXTURE_FIVE_SERIES_NO_COLOR</code>
					— the per-series <code>color</code> field is intentionally
					omitted so the chart-level <code>colorScheme</code> drives
					the palette. If a series defines its own <code>color</code>,
					it always wins over <code>colorScheme</code> (the consumer's
					explicit intent overrides the fallback palette).
				</p>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default 8-intent cycle</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_FIVE_SERIES_NO_COLOR"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="chart-palette-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom CSS palette (hex)</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_FIVE_SERIES_NO_COLOR"
								:categories="FIXTURE_MONTHS"
								:color-scheme="['#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#0ea5e9']"
								:height="240"
								data-cy="chart-palette-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (custom — hsl / rgb / rgba / hex mix)">
			<div
					class="story-shell"
					data-cy="chart-palette-custom-formats"
			>
				<p class="hint">
					The <code>colorScheme</code> prop accepts ANY valid CSS
					colour string: hex, <code>rgb()</code>,
					<code>rgba()</code> for alpha,
					<code>hsl()</code> / <code>hsla()</code>,
					<code>currentColor</code>, named keywords. Use the
					alpha channel via <code>rgba()</code> / <code>hsla()</code>
					to dim a series without losing identity. Note that
					per-series <code>color</code> overrides the palette;
					these demos use fixtures WITHOUT a series-level
					colour so the <code>colorScheme</code> kicks in.
				</p>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>mixed formats (hex / rgb / hsl / rgba / hsla)</strong>
						<origam-chart
								type="line"
								:series="FIXTURE_FIVE_SERIES_NO_COLOR"
								:categories="FIXTURE_MONTHS"
								:color-scheme="[
                                    '#7c3aed',
                                    'rgb(236, 72, 153)',
                                    'hsl(199, 89%, 48%)',
                                    'rgba(34, 197, 94, 0.7)',
                                    'hsla(280, 100%, 60%, 0.55)'
                                ]"
								:height="280"
								data-cy="chart-palette-mixed"
						/>
					</div>
					<div class="story-col">
						<strong>opacity comparison (alpha)</strong>
						<origam-chart
								type="area"
								:series="FIXTURE_SALES_SERIES_NO_COLOR"
								:categories="FIXTURE_MONTHS"
								:color-scheme="[
                                    'rgba(124, 58, 237, 0.9)',
                                    'rgba(124, 58, 237, 0.35)'
                                ]"
								:height="280"
								data-cy="chart-palette-alpha"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme (all DS intents)">
			<div
					class="story-shell"
					data-cy="chart-palette-intents"
			>
				<p class="hint">
					Every DS intent name (<code>primary, secondary, ghost,
					neutral, success, warning, danger, info</code>) is a
					valid <code>colorScheme</code> entry. The chart routes
					each through <code>intentBgExpr()</code> so the proper
					token namespace is used:
					<code>action--*</code> for action intents,
					<code>feedback--*</code> for feedback intents.
				</p>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>action intents</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_THREE_NO_COLOR"
								:categories="FIXTURE_MONTHS"
								:color-scheme="['primary', 'secondary', 'ghost']"
								:height="240"
								data-cy="chart-palette-action"
						/>
					</div>
					<div class="story-col">
						<strong>feedback intents</strong>
						<origam-chart
								type="column"
								:series="FIXTURE_FOUR_NO_COLOR"
								:categories="FIXTURE_MONTHS"
								:color-scheme="['success', 'warning', 'danger', 'info']"
								:height="240"
								data-cy="chart-palette-feedback"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip (custom card)">
			<div
					class="story-shell"
					data-cy="chart-slot-tooltip"
			>
				<p class="hint">
					Hover a data point to see the custom tooltip slot. The default tooltip
					renders a single coloured row; this slot replaces it with a richer card.
				</p>
				<origam-chart
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="chart-slot-tooltip-chart"
				>
					<template #tooltip="{ point, series, category }">
						<div class="custom-tooltip">
							<strong>{{ series.name }}</strong>
							<span class="custom-tooltip__category">{{ category }}</span>
							<span class="custom-tooltip__value">${{ point.y }}k</span>
						</div>
					</template>
				</origam-chart>
			</div>
		</Variant>

		<Variant title="Slot — legend-item (custom)">
			<div
					class="story-shell"
					data-cy="chart-slot-legend"
			>
				<origam-chart
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="chart-slot-legend-chart"
				>
					<template #legend-item="{ series, visible }">
						<div class="custom-legend-item">
							<span
									class="custom-legend-item__dot"
									:style="{ backgroundColor: visible ? (series.color === 'primary' ? '#3b82f6' : '#10b981') : '#9ca3af' }"
							/>
							<span class="custom-legend-item__name">{{ series.name }}</span>
							<small class="custom-legend-item__state">{{ visible ? 'shown' : 'hidden' }}</small>
						</div>
					</template>
				</origam-chart>
			</div>
		</Variant>

		<Variant title="Slot — title (with subtitle + badge)">
			<div
					class="story-shell"
					data-cy="chart-slot-title"
			>
				<origam-chart
						type="area"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="chart-slot-title-chart"
				>
					<template #title>
						<div class="custom-title">
							<span class="custom-title__main">Sales pipeline</span>
							<span class="custom-title__badge">live</span>
						</div>
						<div class="custom-title__sub">
							Updated 2 minutes ago
						</div>
					</template>
				</origam-chart>
			</div>
		</Variant>

		<Variant title="Slot — empty (custom CTA)">
			<div
					class="story-shell"
					data-cy="chart-slot-empty"
			>
				<origam-chart
						type="line"
						:series="[]"
						:height="240"
						data-cy="chart-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							<strong>No data yet</strong>
							<small>Connect a data source to start charting.</small>
						</div>
					</template>
				</origam-chart>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle">
			<div
					class="story-shell"
					data-cy="chart-emits"
			>
				<p class="hint">
					Click a data point or a legend entry — the emit payloads land below.
				</p>
				<origam-chart
						type="column"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="chart-emits-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="chart-emits-log"
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

	import { OrigamChart, OrigamChartHoneycomb } from '@origam/components'

	import type { IChartPoint, IChartSeries } from '@origam/interfaces'

	import type { IChartVariwideDatum } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const TYPE_OPTIONS = [
		{ value: 'line', label: 'line' },
		{ value: 'spline', label: 'spline' },
		{ value: 'stepped-line', label: 'stepped-line' },
		{ value: 'area', label: 'area' },
		{ value: 'bar', label: 'bar' },
		{ value: 'column', label: 'column' },
		{ value: 'pie', label: 'pie' },
		{ value: 'donut', label: 'donut' },
		{ value: 'scatter', label: 'scatter' },
		{ value: 'radar', label: 'radar' },
		{ value: 'gauge', label: 'gauge' },
		{ value: 'funnel', label: 'funnel' },
		{ value: 'pyramid', label: 'pyramid' },
		{ value: 'honeycomb', label: 'honeycomb' },
		{ value: 'treemap', label: 'treemap' },
		{ value: 'sankey', label: 'sankey' },
		{ value: 'word-cloud', label: 'word-cloud' },
		{ value: 'heatmap', label: 'heatmap' },
		{ value: 'sunburst', label: 'sunburst' },
		{ value: 'box-plot', label: 'box-plot' },
		{ value: 'pictorial', label: 'pictorial' },
		{ value: 'candlestick', label: 'candlestick' },
		{ value: 'streamgraph', label: 'streamgraph' },
		{ value: 'variwide', label: 'variwide' },
		{ value: 'polar-bar', label: 'polar-bar' }
	]

	const LEGEND_POSITION_OPTIONS = [
		{ value: 'top', label: 'top' },
		{ value: 'bottom', label: 'bottom' },
		{ value: 'left', label: 'left' },
		{ value: 'right', label: 'right' }
	]

	const SMOOTHING_OPTIONS = [
		{ value: 'none', label: 'none' },
		{ value: 'curve', label: 'curve' }
	]

	const FIXTURE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const FIXTURE_SALES_SERIES: Array<IChartSeries> = [
		{ name: 'Sales 2025', data: [12, 18, 22, 19, 25, 32, 28, 33, 30, 36, 39, 42], color: 'primary' },
		{ name: 'Sales 2026', data: [16, 22, 25, 23, 30, 38, 35, 41, 39, 45, 48, 52], color: 'success' }
	]

	const FIXTURE_FIVE_SERIES: Array<IChartSeries> = [
		{ name: 'Product A', data: [10, 14, 18, 16, 22, 28, 25, 30, 33, 36, 38, 42], color: 'primary' },
		{ name: 'Product B', data: [6, 10, 14, 12, 18, 22, 19, 24, 28, 30, 32, 35], color: 'success' },
		{ name: 'Product C', data: [4, 6, 10, 9, 13, 16, 14, 18, 21, 23, 25, 28], color: 'warning' },
		{ name: 'Product D', data: [3, 5, 8, 7, 10, 13, 11, 15, 17, 19, 21, 23], color: 'danger' },
		{ name: 'Product E', data: [2, 3, 5, 4, 7, 9, 8, 11, 13, 15, 17, 19], color: 'info' }
	]

	const FIXTURE_COUNTRIES = ['US', 'France', 'Germany', 'Japan', 'Brazil']
	const FIXTURE_REVENUE_PIE: Array<IChartSeries> = [
		{
			name: 'Revenue',
			data: [120, 80, 60, 45, 25]
		}
	]

	const FIXTURE_GAUGE: Array<IChartSeries> = [
		{
			name: 'Completion',
			data: [62],
			color: 'primary'
		}
	]

	const FIXTURE_SALES_SERIES_NO_COLOR: Array<IChartSeries> = [
		{ name: 'Sales 2025', data: [12, 18, 22, 19, 25, 32, 28, 33, 30, 36, 39, 42] },
		{ name: 'Sales 2026', data: [16, 22, 25, 23, 30, 38, 35, 41, 39, 45, 48, 52] }
	]

	const FIXTURE_COMBO_COLUMN_LINE: Array<IChartSeries> = [
		{
			name: 'Volume',
			data: [120, 185, 210, 250, 280, 320, 290, 360, 340, 410, 440, 480],
			color: 'primary',
			type: 'column'
		},
		{
			name: 'Trend',
			data: [140, 175, 220, 240, 290, 310, 310, 350, 360, 400, 430, 470],
			color: 'danger',
			type: 'line'
		}
	]

	const FIXTURE_COMBO_AREA_LINE: Array<IChartSeries> = [
		{
			name: 'Baseline',
			data: [80, 100, 120, 110, 140, 170, 160, 190, 175, 210, 230, 250],
			color: 'success',
			type: 'area'
		},
		{
			name: 'Highlight',
			data: [85, 105, 125, 115, 145, 175, 165, 195, 180, 215, 235, 255],
			color: 'warning',
			type: 'line'
		}
	]

	const FIXTURE_FIVE_SERIES_NO_COLOR: Array<IChartSeries> = [
		{ name: 'Product A', data: [10, 14, 18, 16, 22, 28, 25, 30, 33, 36, 38, 42] },
		{ name: 'Product B', data: [6, 10, 14, 12, 18, 22, 19, 24, 28, 30, 32, 35] },
		{ name: 'Product C', data: [4, 6, 10, 9, 13, 16, 14, 18, 21, 23, 25, 28] },
		{ name: 'Product D', data: [3, 5, 8, 7, 10, 13, 11, 15, 17, 19, 21, 23] },
		{ name: 'Product E', data: [2, 3, 5, 4, 7, 9, 8, 11, 13, 15, 17, 19] }
	]

	const FIXTURE_THREE_NO_COLOR: Array<IChartSeries> = [
		{ name: 'A', data: [12, 18, 22, 19, 25, 32, 28, 33, 30, 36, 39, 42] },
		{ name: 'B', data: [8, 12, 16, 14, 20, 26, 22, 28, 25, 31, 34, 38] },
		{ name: 'C', data: [5, 8, 12, 10, 15, 20, 17, 22, 20, 26, 28, 32] }
	]

	const FIXTURE_FOUR_NO_COLOR: Array<IChartSeries> = [
		{ name: 'A', data: [12, 18, 22, 19, 25, 32, 28, 33, 30, 36, 39, 42] },
		{ name: 'B', data: [8, 12, 16, 14, 20, 26, 22, 28, 25, 31, 34, 38] },
		{ name: 'C', data: [5, 8, 12, 10, 15, 20, 17, 22, 20, 26, 28, 32] },
		{ name: 'D', data: [3, 5, 8, 7, 10, 13, 11, 15, 17, 19, 21, 23] }
	]

	const FIXTURE_SCATTER: Array<IChartSeries> = [
		{
			name: 'Cohort A',
			data: [
				{ x: 1, y: 5, z: 3 },
				{ x: 2, y: 8, z: 12 },
				{ x: 3, y: 7, z: 7 },
				{ x: 5, y: 12, z: 22 },
				{ x: 8, y: 9, z: 15 },
				{ x: 13, y: 18, z: 30 }
			],
			color: 'primary',
			type: 'scatter'
		},
		{
			name: 'Cohort B',
			data: [
				{ x: 2, y: 3, z: 5 },
				{ x: 4, y: 6, z: 18 },
				{ x: 6, y: 10, z: 9 },
				{ x: 9, y: 14, z: 25 },
				{ x: 12, y: 22, z: 35 }
			],
			color: 'success',
			type: 'scatter'
		}
	]

	const FIXTURE_RADAR_AXES = ['Speed', 'Power', 'Agility', 'Stamina', 'Skill', 'Defence']
	const FIXTURE_RADAR: Array<IChartSeries> = [
		{ name: 'Player A', data: [80, 65, 75, 90, 70, 60], color: 'primary', type: 'radar' },
		{ name: 'Player B', data: [55, 85, 60, 70, 90, 80], color: 'success', type: 'radar' }
	]

	const FIXTURE_FUNNEL_CATEGORIES = ['Visitors', 'Leads', 'Prospects', 'Demos', 'Customers']
	const FIXTURE_FUNNEL: Array<IChartSeries> = [
		{ name: 'Pipeline', data: [1000, 600, 200, 80, 50] }
	]

	const FIXTURE_HONEYCOMB_3X3: Array<IChartSeries> = [
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

	const FIXTURE_TREEMAP_TECH: Array<IChartSeries> = [
		{
			name: 'Tech Portfolio',
			data: [
				{ name: 'AAPL', value: 25 },
				{ name: 'MSFT', value: 18 },
				{ name: 'GOOG', value: 14 },
				{ name: 'AMZN', value: 11 },
				{ name: 'NVDA', value: 9 },
				{ name: 'META', value: 7 },
				{ name: 'TSLA', value: 5 },
				{ name: 'ORCL', value: 4 },
				{ name: 'IBM', value: 4 },
				{ name: 'ADBE', value: 3 }
			] as Array<any>
		}
	]

	const FIXTURE_SANKEY_FUNNEL: Array<IChartSeries> = [
		{
			name: 'Web Funnel',
			data: [
				{ from: 'Home', to: 'Catalogue', value: 100 },
				{ from: 'Catalogue', to: 'Cart', value: 40 },
				{ from: 'Catalogue', to: 'Exit', value: 60 },
				{ from: 'Cart', to: 'Checkout', value: 25 },
				{ from: 'Cart', to: 'Exit', value: 15 },
				{ from: 'Checkout', to: 'Success', value: 20 },
				{ from: 'Checkout', to: 'Failure', value: 5 }
			] as Array<any>
		}
	]

	const FIXTURE_WORD_CLOUD_TECH: Array<IChartSeries> = [
		{
			name: 'Tech Buzzwords',
			data: [
				{ text: 'AI', value: 100 },
				{ text: 'ML', value: 90 },
				{ text: 'Cloud', value: 80 },
				{ text: 'Data', value: 75 },
				{ text: 'Kubernetes', value: 70 },
				{ text: 'Vue', value: 65 },
				{ text: 'React', value: 60 },
				{ text: 'TypeScript', value: 60 },
				{ text: 'Python', value: 55 },
				{ text: 'Rust', value: 50 },
				{ text: 'Go', value: 45 },
				{ text: 'GraphQL', value: 40 },
				{ text: 'REST', value: 35 },
				{ text: 'Docker', value: 35 },
				{ text: 'Serverless', value: 30 }
			] as Array<any>
		}
	]

	const FIXTURE_HEATMAP: Array<IChartSeries> = [
		{
			name: 'Activity',
			data: Array.from({ length: 35 }, (_, i) => ({
				x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7],
				y: Math.floor(i / 7),
				value: Math.floor(Math.random() * 50)
			})) as Array<any>
		}
	]

	const FIXTURE_SUNBURST: Array<IChartSeries> = [
		{
			name: 'Budget',
			data: [
				{ name: 'Engineering', value: 50, children: [
					{ name: 'Frontend', value: 20 },
					{ name: 'Backend', value: 20 },
					{ name: 'DevOps', value: 10 }
				] },
				{ name: 'Marketing', value: 30 },
				{ name: 'Sales', value: 20 }
			] as Array<any>
		}
	]

	const FIXTURE_BOXPLOT: Array<IChartSeries> = [
		{
			name: 'Latency (ms)',
			data: [
				{ category: '/users', min: 12, q1: 18, median: 24, q3: 32, max: 58, outliers: [120] },
				{ category: '/products', min: 20, q1: 28, median: 38, q3: 52, max: 90, outliers: [] },
				{ category: '/orders', min: 45, q1: 58, median: 70, q3: 88, max: 132, outliers: [] }
			] as Array<any>
		}
	]

	const FIXTURE_PICTORIAL_CATEGORIES = ['Promoters', 'Passives', 'Detractors']
	const FIXTURE_PICTORIAL: Array<IChartSeries> = [
		{ name: 'Satisfaction', data: [65, 25, 10] }
	]

	const FIXTURE_CANDLESTICK: Array<IChartSeries> = [
		{
			name: 'AAPL',
			data: [
				{ date: 'May 1', open: 150, high: 153, low: 149, close: 152 },
				{ date: 'May 2', open: 152, high: 155, low: 151, close: 154 },
				{ date: 'May 3', open: 154, high: 156, low: 152, close: 153 },
				{ date: 'May 4', open: 153, high: 158, low: 153, close: 157 },
				{ date: 'May 5', open: 157, high: 160, low: 156, close: 159 },
				{ date: 'May 6', open: 159, high: 161, low: 156, close: 157 },
				{ date: 'May 7', open: 157, high: 162, low: 157, close: 161 }
			] as Array<any>
		}
	]

	const FIXTURE_STREAMGRAPH_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
	const FIXTURE_STREAMGRAPH: Array<IChartSeries> = [
		{ name: 'Pop', data: [420, 480, 510, 460, 440, 490] },
		{ name: 'Rock', data: [320, 360, 340, 380, 410, 390] },
		{ name: 'Jazz', data: [120, 140, 130, 150, 160, 145] },
		{ name: 'Electronic', data: [280, 310, 330, 360, 400, 420] }
	]

	const GDP_VARIWIDE_DATA: Array<IChartVariwideDatum> = [
		{ category: 'US', value: 23, width: 331 },
		{ category: 'China', value: 18, width: 1411 },
		{ category: 'Germany', value: 4.2, width: 83 },
		{ category: 'Japan', value: 4.9, width: 125 },
		{ category: 'India', value: 3.5, width: 1393 },
		{ category: 'UK', value: 3.1, width: 67 }
	]

	const FIXTURE_VARIWIDE_GDP: Array<IChartSeries> = [
		{ name: 'GDP × Population', data: GDP_VARIWIDE_DATA as unknown as Array<number> }
	]

	const FIXTURE_POLAR_BAR_CATEGORIES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const FIXTURE_POLAR_BAR: Array<IChartSeries> = [
		{ name: 'Weekly Activity', data: [8, 9, 7, 8, 10, 4, 3] }
	]

	const logLines = ref<Array<string>>([])
	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onPointClick = (point: IChartPoint) => {
		appendLog(`point-click → series="${point.seriesName}" x="${point.x}" y=${point.y}`)
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

	.custom-tooltip {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px 12px;
		background-color: #111827;
		color: #ffffff;
		border-radius: 8px;
	}

	.custom-tooltip__category {
		font-size: 0.6875rem;
		opacity: 0.7;
	}

	.custom-tooltip__value {
		font-size: 1.125rem;
		font-weight: 700;
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

	.custom-title__sub {
		font-size: 0.75rem;
		color: #6b7280;
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
