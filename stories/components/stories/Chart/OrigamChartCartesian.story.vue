<template>
	<Story
			group="components"
			title="Chart/OrigamChartCartesian"
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
						data-cy="cartesian-playground"
				>
					<origam-chart-cartesian
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
							data-cy="cartesian-playground-chart"
							@point-click="onPointClick"
							@legend-click="onLegendClick"
							@series-toggle="onSeriesToggle"
					/>
					<pre
							class="story-log"
							data-cy="cartesian-playground-log"
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

		<Variant title="Prop — type (line)">
			<div
					class="story-shell"
					data-cy="cartesian-type-line"
			>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Line chart"
						data-cy="cartesian-chart-line"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (spline)">
			<div
					class="story-shell"
					data-cy="cartesian-type-spline"
			>
				<origam-chart-cartesian
						type="spline"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Spline chart"
						data-cy="cartesian-chart-spline"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (stepped-line)">
			<div
					class="story-shell"
					data-cy="cartesian-type-stepped-line"
			>
				<origam-chart-cartesian
						type="stepped-line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Stepped-line chart"
						data-cy="cartesian-chart-stepped-line"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (area)">
			<div
					class="story-shell"
					data-cy="cartesian-type-area"
			>
				<origam-chart-cartesian
						type="area"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Area chart"
						data-cy="cartesian-chart-area"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (bar)">
			<div
					class="story-shell"
					data-cy="cartesian-type-bar"
			>
				<origam-chart-cartesian
						type="bar"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Bar chart"
						data-cy="cartesian-chart-bar"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (column)">
			<div
					class="story-shell"
					data-cy="cartesian-type-column"
			>
				<origam-chart-cartesian
						type="column"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="300"
						title="Column chart"
						data-cy="cartesian-chart-column"
				/>
			</div>
		</Variant>

		<Variant title="Prop — type (scatter)">
			<div
					class="story-shell"
					data-cy="cartesian-type-scatter"
			>
				<origam-chart-cartesian
						type="scatter"
						:series="FIXTURE_SCATTER"
						:height="300"
						title="Scatter chart"
						data-cy="cartesian-chart-scatter"
				/>
			</div>
		</Variant>

		<Variant title="Prop — stacked">
			<div
					class="story-shell"
					data-cy="cartesian-stacked"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>stacked = false</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:stacked="false"
								:height="280"
								data-cy="cartesian-stacked-off"
						/>
					</div>
					<div class="story-col">
						<strong>stacked = true</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:stacked="true"
								:height="280"
								data-cy="cartesian-stacked-on"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — smoothing">
			<div
					class="story-shell"
					data-cy="cartesian-smoothing"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>smoothing = none</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								smoothing="none"
								:height="260"
								data-cy="cartesian-smoothing-none"
						/>
					</div>
					<div class="story-col">
						<strong>smoothing = curve</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								smoothing="curve"
								:height="260"
								data-cy="cartesian-smoothing-curve"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — yMin / yMax">
			<div
					class="story-shell"
					data-cy="cartesian-yrange"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>auto range</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="260"
								data-cy="cartesian-yrange-auto"
						/>
					</div>
					<div class="story-col">
						<strong>yMin=0 yMax=60</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:y-min="0"
								:y-max="60"
								:height="260"
								data-cy="cartesian-yrange-fixed"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — animated">
			<div
					class="story-shell"
					data-cy="cartesian-animated"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>animated = true</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:animated="true"
								:height="260"
								data-cy="cartesian-animated-on"
						/>
					</div>
					<div class="story-col">
						<strong>animated = false</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:animated="false"
								:height="260"
								data-cy="cartesian-animated-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — series (1 / 2 / 5)">
			<div
					class="story-shell"
					data-cy="cartesian-series-count"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>1 series</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES.slice(0, 1)"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="cartesian-series-1"
						/>
					</div>
					<div class="story-col">
						<strong>2 series</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="cartesian-series-2"
						/>
					</div>
					<div class="story-col">
						<strong>5 series</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_FIVE_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="240"
								data-cy="cartesian-series-5"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — colorScheme">
			<div
					class="story-shell"
					data-cy="cartesian-color-scheme"
			>
				<p class="hint">
					Both demos use <code>FIXTURE_FIVE_SERIES_NO_COLOR</code>
					— the per-series <code>color</code> field is intentionally
					omitted so the chart-level <code>colorScheme</code>
					actually drives the palette. If a series defines its own
					<code>color</code> it ALWAYS wins (explicit consumer
					intent overrides the fallback palette).
				</p>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>default palette (DS 8-intent cycle)</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_FIVE_SERIES_NO_COLOR"
								:categories="FIXTURE_MONTHS"
								:height="260"
								data-cy="cartesian-palette-default"
						/>
					</div>
					<div class="story-col">
						<strong>custom hex palette</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_FIVE_SERIES_NO_COLOR"
								:categories="FIXTURE_MONTHS"
								:color-scheme="['#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#0ea5e9']"
								:height="260"
								data-cy="cartesian-palette-custom"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — categories">
			<div
					class="story-shell"
					data-cy="cartesian-categories"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>month labels</strong>
						<origam-chart-cartesian
								type="bar"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="260"
								data-cy="cartesian-categories-months"
						/>
					</div>
					<div class="story-col">
						<strong>quarter labels</strong>
						<origam-chart-cartesian
								type="bar"
								:series="FIXTURE_QUARTER_SERIES"
								:categories="FIXTURE_QUARTERS"
								:height="260"
								data-cy="cartesian-categories-quarters"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — legendPosition (top / bottom / left / right)">
			<div
					class="story-shell"
					data-cy="cartesian-legend-position"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>top</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								legend-position="top"
								:height="260"
								data-cy="cartesian-legend-top"
						/>
					</div>
					<div class="story-col">
						<strong>bottom</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								legend-position="bottom"
								:height="260"
								data-cy="cartesian-legend-bottom"
						/>
					</div>
					<div class="story-col">
						<strong>left</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								legend-position="left"
								:height="260"
								data-cy="cartesian-legend-left"
						/>
					</div>
					<div class="story-col">
						<strong>right</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								legend-position="right"
								:height="260"
								data-cy="cartesian-legend-right"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — height">
			<div
					class="story-shell"
					data-cy="cartesian-height"
			>
				<div class="story-grid story-grid--3">
					<div class="story-col">
						<strong>height = 160</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="160"
								data-cy="cartesian-height-160"
						/>
					</div>
					<div class="story-col">
						<strong>height = 300</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="300"
								data-cy="cartesian-height-300"
						/>
					</div>
					<div class="story-col">
						<strong>height = 480</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:height="480"
								data-cy="cartesian-height-480"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — showAxis / showGrid / showLegend / showTooltip">
			<div
					class="story-shell"
					data-cy="cartesian-chrome"
			>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>all chrome on</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:show-axis="true"
								:show-grid="true"
								:show-legend="true"
								:show-tooltip="true"
								:height="260"
								data-cy="cartesian-chrome-on"
						/>
					</div>
					<div class="story-col">
						<strong>all chrome off</strong>
						<origam-chart-cartesian
								type="line"
								:series="FIXTURE_SALES_SERIES"
								:categories="FIXTURE_MONTHS"
								:show-axis="false"
								:show-grid="false"
								:show-legend="false"
								:show-tooltip="false"
								:height="260"
								data-cy="cartesian-chrome-off"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — tooltip">
			<div
					class="story-shell"
					data-cy="cartesian-slot-tooltip"
			>
				<p class="hint">Hover a data point to see the custom tooltip slot.</p>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="cartesian-slot-tooltip-chart"
				>
					<template #tooltip="{ point, series, category }">
						<div class="custom-tooltip">
							<strong>{{ series.name }}</strong>
							<span class="custom-tooltip__category">{{ category }}</span>
							<span class="custom-tooltip__value">${{ point.y }}k</span>
						</div>
					</template>
				</origam-chart-cartesian>
			</div>
		</Variant>

		<Variant title="Slot — legend-item">
			<div
					class="story-shell"
					data-cy="cartesian-slot-legend"
			>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="cartesian-slot-legend-chart"
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
				</origam-chart-cartesian>
			</div>
		</Variant>

		<Variant title="Slot — title">
			<div
					class="story-shell"
					data-cy="cartesian-slot-title"
			>
				<origam-chart-cartesian
						type="area"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="cartesian-slot-title-chart"
				>
					<template #title>
						<div class="custom-title">
							<span class="custom-title__main">Sales pipeline</span>
							<span class="custom-title__badge">live</span>
						</div>
						<div class="custom-title__sub">Updated 2 minutes ago</div>
					</template>
				</origam-chart-cartesian>
			</div>
		</Variant>

		<Variant title="Slot — empty">
			<div
					class="story-shell"
					data-cy="cartesian-slot-empty"
			>
				<origam-chart-cartesian
						type="line"
						:series="[]"
						:height="240"
						data-cy="cartesian-slot-empty-chart"
				>
					<template #empty>
						<div class="custom-empty">
							<strong>No data yet</strong>
							<small>Connect a data source to start charting.</small>
						</div>
					</template>
				</origam-chart-cartesian>
			</div>
		</Variant>

		<Variant title="Emit — point-click / legend-click / series-toggle">
			<div
					class="story-shell"
					data-cy="cartesian-emits"
			>
				<p class="hint">Click a data point or a legend entry — the emit payloads land below.</p>
				<origam-chart-cartesian
						type="column"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="320"
						data-cy="cartesian-emits-chart"
						@point-click="onPointClick"
						@legend-click="onLegendClick"
						@series-toggle="onSeriesToggle"
				/>
				<pre
						class="story-log"
						data-cy="cartesian-emits-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Prop — secondaryYAxis (dual scale: temperature + rainfall)">
			<div
					class="story-shell"
					data-cy="cartesian-dual-axis"
			>
				<p class="hint">
					Temperature (line, left axis, °C) and Rainfall (column, right axis, mm) share
					the same X axis but project against independent Y scales. The temperature line
					should peak around 60-70% of the plot height (23°C / ~25°C max). Rainfall bars
					should peak near 85% of the plot height (130mm / ~150mm max).
				</p>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_DUAL_AXIS_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="360"
						:secondary-y-axis="FIXTURE_DUAL_AXIS_SECONDARY"
						:y-axis-format="(v) => v + ' °C'"
						title="Temperature &amp; Rainfall"
						subtitle="Monthly averages — dual Y axes"
						data-cy="cartesian-dual-axis-chart"
				/>
			</div>
		</Variant>

		<Variant title="Prop — stacking (normal vs percent side by side)">
			<div
					class="story-shell"
					data-cy="cartesian-stacking"
			>
				<p class="hint">
					App-store reviews per month per rating (5★ to 1★) over 12 months.
					Total monthly volume varies — the normal stack shows raw counts; the
					percent stack reveals which rating dominates over time, independently of
					review volume.
				</p>
				<div class="story-grid story-grid--2">
					<div class="story-col">
						<strong>stacking = normal</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_APP_REVIEWS"
								:categories="FIXTURE_MONTHS"
								:stacked="true"
								stacking="normal"
								:height="300"
								title="Review volume"
								subtitle="Raw count per rating"
								data-cy="cartesian-stacking-normal"
						/>
					</div>
					<div class="story-col">
						<strong>stacking = percent</strong>
						<origam-chart-cartesian
								type="column"
								:series="FIXTURE_APP_REVIEWS"
								:categories="FIXTURE_MONTHS"
								:stacked="true"
								stacking="percent"
								:height="300"
								title="Rating distribution"
								subtitle="% share per month"
								data-cy="cartesian-stacking-percent"
						/>
					</div>
				</div>
			</div>
		</Variant>
	
		<Variant title="Prop — plotBands + plotLines (target range + danger zone + average)">
			<div
					class="story-shell"
					data-cy="cartesian-plot-bands"
			>
				<p class="hint">
					Green band: target Y range 20–40. Red band: danger Y range 45–60.
					Blue dashed line: average at Y=30. Orange dotted vertical line at Jun (above data).
				</p>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="360"
						:plot-bands="FIXTURE_PLOT_BANDS"
						:plot-lines="FIXTURE_PLOT_LINES"
						title="Sales targets & thresholds"
						subtitle="Plot bands + lines demo"
						data-cy="cartesian-plot-bands-chart"
				/>
			</div>
		</Variant>

		<Variant title="Prop — drilldown (browser market share)">
			<div
					class="story-shell"
					data-cy="cartesian-drilldown"
			>
				<p class="hint">
					Click a browser bar to drill into its version breakdown. Use the Back button or breadcrumb to return.
					Each data point carries a drilldown link; the chart swaps series on click and shows a breadcrumb.
				</p>
				<origam-chart-cartesian
						type="column"
						:series="FIXTURE_BROWSER_SERIES"
						:categories="FIXTURE_BROWSER_CATEGORIES"
						:height="360"
						:drilldown="FIXTURE_BROWSER_DRILLDOWN"
						title="Browser market share"
						subtitle="Click a browser to see version breakdown"
						data-cy="cartesian-drilldown-chart"
						@drill="onDrill"
						@drill-up="onDrillUp"
						@point-click="onPointClick"
				/>
				<pre
						class="story-log"
						data-cy="cartesian-drilldown-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Prop — zoomable + rangeSelector (5-year daily prices)">
			<div
					class="story-shell"
					data-cy="cartesian-zoom"
			>
				<p class="hint">
					Drag inside the plot to zoom into a sub-range. Scroll-wheel
					zooms around the cursor. Ctrl-drag pans. Click a range button
					to jump to a preset window. Click "Reset zoom" to restore the
					full range.
				</p>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_DAILY_PRICES"
						:categories="FIXTURE_DAILY_DATES"
						:height="380"
						:zoomable="true"
						:range-selector="{
							enabled: true,
							buttons: [
								{ label: '1m', count: 30 },
								{ label: '3m', count: 90 },
								{ label: '6m', count: 180 },
								{ label: '1y', count: 365 },
								{ label: 'all' }
							],
							selected: 3
						}"
						title="Daily prices (5 years)"
						subtitle="Drag to zoom, scroll to pinch, ctrl+drag to pan"
						data-cy="cartesian-zoom-chart"
						@zoom="onZoom"
						@reset-zoom="onResetZoom"
				/>
				<pre
						class="story-log"
						data-cy="cartesian-zoom-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Prop — annotations (arrow / label / circle / bracket)">
			<div
					class="story-shell"
					data-cy="cartesian-annotations"
			>
				<origam-chart-cartesian
						type="line"
						:series="FIXTURE_SALES_SERIES"
						:categories="FIXTURE_MONTHS"
						:height="360"
						:annotations="FIXTURE_ANNOTATIONS"
						title="Monthly sales with annotations"
						subtitle="Arrow · Label · Circle · Bracket"
						data-cy="cartesian-annotations-chart"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamChartCartesian } from '@origam/components'

	import type {
		IChartAnnotation,
		IChartDrilldownLink,
		IChartDrilldownProps,
		IChartPlotBand,
		IChartPlotLine,
		IChartPoint,
		IChartSecondaryYAxis,
		IChartSeries,
		IChartSeriesPoint
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const TYPE_OPTIONS = [
		{ value: 'line', label: 'line' },
		{ value: 'spline', label: 'spline' },
		{ value: 'stepped-line', label: 'stepped-line' },
		{ value: 'area', label: 'area' },
		{ value: 'bar', label: 'bar' },
		{ value: 'column', label: 'column' },
		{ value: 'scatter', label: 'scatter' }
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
	const FIXTURE_QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4']

	const FIXTURE_SALES_SERIES: Array<IChartSeries> = [
		{ name: 'Sales 2025', data: [12, 18, 22, 19, 25, 32, 28, 33, 30, 36, 39, 42], color: 'primary' },
		{ name: 'Sales 2026', data: [16, 22, 25, 23, 30, 38, 35, 41, 39, 45, 48, 52], color: 'success' }
	]

	const FIXTURE_ANNOTATIONS: Array<IChartAnnotation> = [
		{
			kind: 'arrow',
			x: 'May',
			y: 25,
			x2: 'Sep',
			y2: 30,
			text: 'Q3 surge',
			color: 'danger',
			width: 2,
			dx: 0,
			dy: -16
		},
		{
			kind: 'label',
			x: 'Mar',
			y: 22,
			text: 'Launch',
			color: 'primary',
			dx: 0,
			dy: -10
		},
		{
			kind: 'circle',
			x: 'Jul',
			y: 28,
			text: 'Outlier',
			color: 'warning',
			radius: 14,
			dx: 2,
			dy: 0
		},
		{
			kind: 'bracket',
			x: 'Oct',
			y: 36,
			x2: 'Dec',
			y2: 42,
			text: 'Q4 ramp',
			color: 'success',
			width: 2,
			dx: 0,
			dy: -18
		}
	]

	const FIXTURE_FIVE_SERIES: Array<IChartSeries> = [
		{ name: 'Product A', data: [10, 14, 18, 16, 22, 28, 25, 30, 33, 36, 38, 42], color: 'primary' },
		{ name: 'Product B', data: [6, 10, 14, 12, 18, 22, 19, 24, 28, 30, 32, 35], color: 'success' },
		{ name: 'Product C', data: [4, 6, 10, 9, 13, 16, 14, 18, 21, 23, 25, 28], color: 'warning' },
		{ name: 'Product D', data: [3, 5, 8, 7, 10, 13, 11, 15, 17, 19, 21, 23], color: 'danger' },
		{ name: 'Product E', data: [2, 3, 5, 4, 7, 9, 8, 11, 13, 15, 17, 19], color: 'info' }
	]

	const FIXTURE_FIVE_SERIES_NO_COLOR: Array<IChartSeries> = [
		{ name: 'Product A', data: [10, 14, 18, 16, 22, 28, 25, 30, 33, 36, 38, 42] },
		{ name: 'Product B', data: [6, 10, 14, 12, 18, 22, 19, 24, 28, 30, 32, 35] },
		{ name: 'Product C', data: [4, 6, 10, 9, 13, 16, 14, 18, 21, 23, 25, 28] },
		{ name: 'Product D', data: [3, 5, 8, 7, 10, 13, 11, 15, 17, 19, 21, 23] },
		{ name: 'Product E', data: [2, 3, 5, 4, 7, 9, 8, 11, 13, 15, 17, 19] }
	]

	const FIXTURE_QUARTER_SERIES: Array<IChartSeries> = [
		{ name: 'Revenue', data: [120, 185, 210, 250], color: 'primary' },
		{ name: 'Costs', data: [90, 130, 155, 175], color: 'danger' }
	]

	const FIXTURE_SCATTER: Array<IChartSeries> = [
		{
			name: 'Cohort A',
			data: [
				{ x: 1, y: 5, z: 3 }, { x: 2, y: 8, z: 12 }, { x: 3, y: 7, z: 7 },
				{ x: 5, y: 12, z: 22 }, { x: 8, y: 9, z: 15 }, { x: 13, y: 18, z: 30 }
			],
			color: 'primary',
			type: 'scatter'
		},
		{
			name: 'Cohort B',
			data: [
				{ x: 2, y: 3, z: 5 }, { x: 4, y: 6, z: 18 }, { x: 6, y: 10, z: 9 },
				{ x: 9, y: 14, z: 25 }, { x: 12, y: 22, z: 35 }
			],
			color: 'success',
			type: 'scatter'
		}
	]

	const FIXTURE_DUAL_AXIS_SERIES: Array<IChartSeries> = [
		{
			name: 'Temperature',
			data: [5, 6, 8, 12, 16, 20, 23, 22, 18, 13, 9, 6],
			color: 'danger',
			yAxis: 0
		},
		{
			name: 'Rainfall',
			data: [110, 80, 65, 50, 45, 40, 30, 35, 60, 90, 110, 130],
			color: 'info',
			type: 'column',
			yAxis: 1
		}
	]

	const FIXTURE_APP_REVIEWS: Array<IChartSeries> = [
		{ name: '5 stars', color: 'success', data: [320, 290, 350, 410, 390, 460, 520, 500, 480, 440, 510, 560] },
		{ name: '4 stars', color: 'primary', data: [180, 200, 210, 230, 220, 260, 290, 270, 250, 240, 280, 300] },
		{ name: '3 stars', color: 'warning', data: [90, 80, 100, 110, 95, 120, 130, 125, 115, 105, 120, 130] },
		{ name: '2 stars', color: 'danger', data: [50, 60, 45, 70, 55, 65, 80, 75, 60, 55, 70, 80] },
		{ name: '1 star', color: 'neutral', data: [30, 40, 25, 50, 35, 45, 60, 55, 40, 35, 50, 55] }
	]

	const FIXTURE_DUAL_AXIS_SECONDARY: IChartSecondaryYAxis = {
		min: 0,
		max: 150,
		format: (v: number) => v + ' mm',
		title: 'Rainfall (mm)'
	}

	const FIXTURE_BROWSER_CATEGORIES = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other']

	const FIXTURE_BROWSER_SERIES: Array<IChartSeries> = [
		{
			name: 'Market share',
			color: 'primary',
			data: [
				{ x: 'Chrome', y: 61, drilldown: { id: 'chrome', name: 'Chrome' } } as IChartSeriesPoint,
				{ x: 'Safari', y: 19, drilldown: { id: 'safari', name: 'Safari' } } as IChartSeriesPoint,
				{ x: 'Firefox', y: 9, drilldown: { id: 'firefox', name: 'Firefox' } } as IChartSeriesPoint,
				{ x: 'Edge', y: 5, drilldown: { id: 'edge', name: 'Edge' } } as IChartSeriesPoint,
				{ x: 'Other', y: 6, drilldown: { id: 'other', name: 'Other' } } as IChartSeriesPoint
			] as Array<IChartSeriesPoint>
		}
	]

	const FIXTURE_BROWSER_DRILLDOWN: IChartDrilldownProps = {
		backLabel: '← Back',
		datasets: [
			{
				id: 'chrome',
				name: 'Chrome versions',
				categories: ['v124', 'v123', 'v122', 'v121', 'Older'],
				series: [
					{
						name: 'Chrome',
						color: 'primary',
						data: [32, 26, 15, 11, 16] as Array<number>
					}
				]
			},
			{
				id: 'safari',
				name: 'Safari versions',
				categories: ['v17', 'v16', 'v15', 'Older'],
				series: [
					{
						name: 'Safari',
						color: 'success',
						data: [55, 28, 12, 5] as Array<number>
					}
				]
			},
			{
				id: 'firefox',
				name: 'Firefox versions',
				categories: ['v125', 'v124', 'v123', 'Older'],
				series: [
					{
						name: 'Firefox',
						color: 'warning',
						data: [48, 32, 14, 6] as Array<number>
					}
				]
			},
			{
				id: 'edge',
				name: 'Edge versions',
				categories: ['v124', 'v123', 'v122', 'Older'],
				series: [
					{
						name: 'Edge',
						color: 'info',
						data: [60, 25, 10, 5] as Array<number>
					}
				]
			},
			{
				id: 'other',
				name: 'Other browsers',
				categories: ['Opera', 'Samsung', 'UC Browser', 'Misc'],
				series: [
					{
						name: 'Other',
						color: 'neutral',
						data: [30, 35, 20, 15] as Array<number>
					}
				]
			}
		]
	}

	const FIXTURE_PLOT_BANDS: Array<IChartPlotBand> = [
		{
			axis: 'y',
			from: 20,
			to: 40,
			color: 'success',
			opacity: 0.15,
			label: 'Target range',
			layer: 'below'
		},
		{
			axis: 'y',
			from: 45,
			to: 60,
			color: 'danger',
			opacity: 0.2,
			label: 'Danger zone',
			layer: 'below'
		}
	]

	const FIXTURE_PLOT_LINES: Array<IChartPlotLine> = [
		{
			axis: 'y',
			value: 30,
			color: 'primary',
			dash: 'dashed',
			label: 'Average',
			layer: 'above'
		},
		{
			axis: 'x',
			value: 'Jun',
			color: 'warning',
			dash: 'dotted',
			label: 'Launch',
			layer: 'above'
		}
	]

	/*
	 * 5 years of daily mock prices ≈ 1825 categories.
	 * Random walk seeded so the chart is stable across re-renders.
	 */
	const FIXTURE_DAILY_LENGTH = 1825
	const buildDailyPrices = (): Array<number> => {
		let v = 100
		const seed = 1234
		let s = seed
		return Array.from({ length: FIXTURE_DAILY_LENGTH }, () => {
			s = (s * 9301 + 49297) % 233280
			const r = s / 233280
			v += (r - 0.5) * 2.5
			return Math.max(20, Math.round(v * 10) / 10)
		})
	}
	const buildDailyDates = (): Array<string> => {
		const start = new Date('2021-01-01').getTime()
		return Array.from({ length: FIXTURE_DAILY_LENGTH }, (_, i) => {
			const d = new Date(start + i * 86400000)
			return d.toISOString().slice(0, 10)
		})
	}
	const FIXTURE_DAILY_PRICES: Array<IChartSeries> = [
		{ name: 'Stock A', data: buildDailyPrices(), color: 'primary' }
	]
	const FIXTURE_DAILY_DATES = buildDailyDates()

	const logLines = ref<Array<string>>([])
	const appendLog = (line: string) => {
		logLines.value = [line, ...logLines.value].slice(0, 8)
	}

	const onZoom = (range: { start: number, end: number }) => {
		appendLog(`zoom → [${range.start} .. ${range.end}]`)
	}
	const onResetZoom = () => {
		appendLog('reset-zoom')
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
	const onDrill = (link: IChartDrilldownLink) => {
		appendLog(`drill → id="${link.id}" name="${link.name ?? ''}"`)
	}
	const onDrillUp = () => {
		appendLog('drill-up')
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
