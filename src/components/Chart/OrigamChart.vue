<template>
	<div
			class="origam-chart"
			:class="rootClasses"
			:style="rootStyles"
			role="figure"
			:aria-label="ariaLabel"
			data-cy="origam-chart"
	>
		<div
				v-if="hasTitleBlock"
				class="origam-chart__header"
				data-cy="origam-chart-header"
		>
			<slot name="title">
				<div
						v-if="title"
						class="origam-chart__title"
				>
					{{ title }}
				</div>
				<div
						v-if="subtitle"
						class="origam-chart__subtitle"
				>
					{{ subtitle }}
				</div>
			</slot>
		</div>

		<div
				class="origam-chart__body"
				:class="bodyClasses"
				data-cy="origam-chart-body"
		>
			<svg
					ref="svgRef"
					class="origam-chart__svg"
					:class="svgClasses"
					:viewBox="viewBox"
					role="img"
					:aria-label="svgAriaLabel"
					preserveAspectRatio="xMidYMid meet"
					data-cy="origam-chart-svg"
					@mousemove="onSvgMouseMove"
					@mouseleave="onSvgMouseLeave"
			>
				<title>{{ svgTitle }}</title>
				<desc>{{ svgDesc }}</desc>

				<g
						v-if="showGrid && !isAngular"
						class="origam-chart__grid"
						data-cy="origam-chart-grid"
				>
					<line
							v-for="(tick, i) in ticks.y"
							:key="`yg-${i}`"
							class="origam-chart__grid-line"
							:x1="plot.x0"
							:y1="tick.position"
							:x2="plot.x1"
							:y2="tick.position"
					/>
				</g>

				<g
						v-if="showAxis && !isAngular"
						class="origam-chart__axis"
						data-cy="origam-chart-axis"
				>
					<line
							class="origam-chart__axis-line"
							:x1="plot.x0"
							:y1="plot.y0"
							:x2="plot.x0"
							:y2="plot.y1"
					/>
					<line
							class="origam-chart__axis-line"
							:x1="plot.x0"
							:y1="plot.y1"
							:x2="plot.x1"
							:y2="plot.y1"
					/>
					<text
							v-for="(tick, i) in ticks.y"
							:key="`yl-${i}`"
							class="origam-chart__axis-label origam-chart__axis-label--y"
							:x="plot.x0 - 8"
							:y="tick.position"
							text-anchor="end"
							dominant-baseline="middle"
					>
						{{ formatY(tick.value as number) }}
					</text>
					<text
							v-for="(tick, i) in ticks.x"
							:key="`xl-${i}`"
							class="origam-chart__axis-label origam-chart__axis-label--x"
							:x="tick.position"
							:y="plot.y1 + 16"
							text-anchor="middle"
					>
						{{ formatX(tick.value) }}
					</text>
				</g>

				<g
						v-if="isAngular && type === 'radar'"
						class="origam-chart__radar-axes"
				>
					<polygon
							v-for="ring in radarRings"
							:key="`r-${ring}`"
							class="origam-chart__radar-ring"
							:points="ringPointsFor(ring)"
					/>
					<line
							v-for="(_, i) in radarSpokes"
							:key="`s-${i}`"
							class="origam-chart__radar-spoke"
							:x1="plot.cx"
							:y1="plot.cy"
							:x2="radarSpokeEnd(i).x"
							:y2="radarSpokeEnd(i).y"
					/>
					<text
							v-for="(label, i) in radarSpokes"
							:key="`sl-${i}`"
							class="origam-chart__radar-label"
							:x="radarLabelPos(i).x"
							:y="radarLabelPos(i).y"
							text-anchor="middle"
							dominant-baseline="middle"
					>
						{{ label }}
					</text>
				</g>

				<g
						class="origam-chart__series"
						data-cy="origam-chart-series"
				>
					<template
							v-for="(path, i) in paths"
							:key="`p-${i}`"
					>
						<path
								v-if="path.kind === 'path' && !isPie(path)"
								:class="['origam-chart__path', `origam-chart__path--${effectiveTypeOf(path)}`]"
								:d="path.d"
								:stroke="path.variant === 'fill' ? 'none' : path.color"
								:fill="path.variant !== 'stroke' && effectiveTypeOf(path) === 'area' ? path.color : 'none'"
								:fill-opacity="path.variant !== 'stroke' && effectiveTypeOf(path) === 'area' ? 0.25 : 0"
								:style="strokeStyleFor(path)"
								data-cy="origam-chart-path"
						/>
						<path
								v-else-if="path.kind === 'path' && isPie(path)"
								class="origam-chart__slice"
								:d="path.d"
								:fill="path.color"
								:data-cy="`origam-chart-slice-${path.dataIndex}`"
								tabindex="0"
								role="button"
								:aria-label="sliceAriaLabel(path)"
								@click="onPointActivate(path, $event)"
								@keydown.enter.prevent="onPointActivate(path, $event)"
								@keydown.space.prevent="onPointActivate(path, $event)"
								@mouseenter="onPointEnter(path)"
								@mouseleave="onPointLeaveEvent"
						/>
						<polygon
								v-else-if="path.kind === 'polygon'"
								class="origam-chart__polygon"
								:points="polygonPoints(path.d!)"
								:stroke="path.color"
								:fill="path.color"
								fill-opacity="0.18"
						/>
						<rect
								v-else-if="path.kind === 'rect'"
								class="origam-chart__bar"
								:x="path.rect!.x"
								:y="path.rect!.y"
								:width="path.rect!.width"
								:height="path.rect!.height"
								:fill="path.color"
								tabindex="0"
								role="button"
								:aria-label="barAriaLabel(path)"
								:data-cy="`origam-chart-bar-${path.seriesIndex}-${path.dataIndex}`"
								@click="onPointActivate(path, $event)"
								@keydown.enter.prevent="onPointActivate(path, $event)"
								@keydown.space.prevent="onPointActivate(path, $event)"
								@mouseenter="onPointEnter(path)"
								@mouseleave="onPointLeaveEvent"
						/>
						<circle
								v-else-if="path.kind === 'circle'"
								class="origam-chart__point"
								:cx="path.circle!.cx"
								:cy="path.circle!.cy"
								:r="hoverMatches(path) ? path.circle!.r + 2 : path.circle!.r"
								:fill="path.color"
								tabindex="0"
								role="button"
								:aria-label="pointAriaLabel(path)"
								:data-cy="`origam-chart-point-${path.seriesIndex}-${path.dataIndex}`"
								@click="onPointActivate(path, $event)"
								@keydown.enter.prevent="onPointActivate(path, $event)"
								@keydown.space.prevent="onPointActivate(path, $event)"
								@mouseenter="onPointEnter(path)"
								@mouseleave="onPointLeaveEvent"
						/>
					</template>
				</g>
			</svg>

			<div
					v-if="showTooltip && hoveredPoint && hoveredSeries"
					ref="tooltipRef"
					class="origam-chart__tooltip"
					role="tooltip"
					:style="tooltipStyle"
					data-cy="origam-chart-tooltip"
			>
				<slot
						name="tooltip"
						v-bind="{ point: hoveredPoint, series: hoveredSeries, category: hoveredCategory }"
				>
					<div class="origam-chart__tooltip-title">
						{{ hoveredSeries.name }}
					</div>
					<div class="origam-chart__tooltip-row">
						<span
								class="origam-chart__tooltip-swatch"
								:style="{ backgroundColor: hoveredPoint.color }"
						/>
						<span class="origam-chart__tooltip-label">{{ formatX(hoveredCategory) }}</span>
						<span class="origam-chart__tooltip-value">{{ formatY(hoveredPoint.y) }}</span>
					</div>
				</slot>
			</div>

			<div
					v-if="showEmpty"
					class="origam-chart__empty"
					data-cy="origam-chart-empty"
			>
				<slot name="empty">
					<span>{{ emptyLabel }}</span>
				</slot>
			</div>
		</div>

		<ul
				v-if="showLegend"
				class="origam-chart__legend"
				:class="legendClasses"
				role="list"
				data-cy="origam-chart-legend"
		>
			<li
					v-for="entry in legend"
					:key="entry.series.name"
					role="listitem"
					class="origam-chart__legend-item"
					:class="{ 'origam-chart__legend-item--hidden': !entry.visible }"
					:data-cy="`origam-chart-legend-${entry.index}`"
					tabindex="0"
					@click="onLegendClick(entry)"
					@keydown.enter.prevent="onLegendClick(entry)"
					@keydown.space.prevent="onLegendClick(entry)"
			>
				<slot
						name="legend-item"
						v-bind="{ series: entry.series, index: entry.index, visible: entry.visible }"
				>
					<span
							class="origam-chart__legend-swatch"
							:style="{ backgroundColor: entry.color }"
					/>
					<span class="origam-chart__legend-label">{{ entry.series.name }}</span>
				</slot>
			</li>
		</ul>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		ref,
		type StyleValue,
		watch
	} from 'vue'

	import { useChart } from '../../composables/Chart/chart.composable'

	import type {
		IChartEmits,
		IChartLegendItem,
		IChartPath,
		IChartPoint,
		IChartProps,
		IChartSeries
	} from '../../interfaces'

	/*********************************************************
	 * Global — `<OrigamChart>` props + defaults.
	 *
	 * Defaults inlined as required by CLAUDE.md "withDefaults —
	 * inline literals only" rule. The Vue SFC compiler runs a static
	 * analysis on the second argument and rejects anything more
	 * complex than a literal / arrow returning a literal.
	 ********************************************************/
	const props = withDefaults(defineProps<IChartProps>(), {
		type: 'line',
		categories: () => [],
		height: 300,
		title: undefined,
		subtitle: undefined,
		showLegend: true,
		legendPosition: 'bottom',
		showTooltip: true,
		showGrid: true,
		showAxis: true,
		animated: true,
		animationDuration: 600,
		stacked: false,
		donutHoleSize: 0.6,
		colorScheme: () => [],
		xAxisFormat: undefined,
		yAxisFormat: undefined,
		aspectRatio: undefined,
		smoothing: 'none',
		yMin: undefined,
		yMax: undefined
	})

	const emit = defineEmits<IChartEmits>()

	/*********************************************************
	 * Static — viewBox geometry. SVG renders into a fixed coordinate
	 * space; CSS scales the resulting box. We pick a 4:3 default so
	 * column / scatter charts breathe without being squished.
	 ********************************************************/
	const SVG_WIDTH = 600
	const SVG_HEIGHT = 360
	const PADDING = { top: 24, right: 24, bottom: 36, left: 48 }
	const PADDING_PIE = { top: 12, right: 12, bottom: 12, left: 12 }

	const svgRef = ref<SVGSVGElement | null>(null)
	const tooltipRef = ref<HTMLElement | null>(null)
	const mousePos = ref<{ x: number, y: number }>({ x: 0, y: 0 })

	const isAngular = computed(() => props.type === 'radar')
	const isPieKind = (t: string) => t === 'pie' || t === 'donut'

	const chartPadding = computed(() => {
		// Pie / donut / radar don't need axis labels, so the
		// surrounding padding can be smaller.
		return isPieKind(props.type) || props.type === 'radar' ? PADDING_PIE : PADDING
	})

	/*********************************************************
	 * Engine — every render-time descriptor we paint flows through
	 * `useChart`. The composable is reactive over the props via the
	 * thunk wrappers below, so swapping series / categories
	 * recomputes everything without us having to teach the SFC.
	 ********************************************************/
	const chart = useChart({
		type: () => props.type,
		series: () => props.series,
		categories: () => props.categories,
		stacked: () => props.stacked,
		donutHoleSize: () => props.donutHoleSize,
		colorScheme: () => props.colorScheme,
		smoothing: () => props.smoothing,
		yMin: () => props.yMin,
		yMax: () => props.yMax,
		width: () => SVG_WIDTH,
		height: () => SVG_HEIGHT,
		padding: () => chartPadding.value
	})

	const { viewBox, ticks, paths, legend, plot, yRange, slotCount } = chart

	/*********************************************************
	 * Hover / tooltip — driven by individual data points. The SVG
	 * `mousemove` is only used to position the tooltip — the
	 * "current point" comes from `@mouseenter` on circles / rects /
	 * paths, which is far more reliable than nearest-neighbour
	 * hit-testing inside `mousemove`.
	 ********************************************************/
	const hoveredPath = ref<IChartPath | null>(null)
	const hoveredPoint = computed<IChartPoint | null>(() => {
		const p = hoveredPath.value
		if (!p) return null
		const series = p.series
		const dataIdx = p.dataIndex ?? 0
		const entry = series.data[dataIdx]
		const x = typeof entry === 'number' ? (props.categories[dataIdx] ?? dataIdx) : entry.x
		const y = typeof entry === 'number' ? entry : entry.y
		return {
			seriesIndex: p.seriesIndex,
			seriesName: series.name,
			dataIndex: dataIdx,
			x,
			y,
			color: p.color
		}
	})
	const hoveredSeries = computed<IChartSeries | null>(() =>
		hoveredPath.value?.series ?? null
	)
	const hoveredCategory = computed(() => {
		if (!hoveredPoint.value) return ''
		return props.categories[hoveredPoint.value.dataIndex] ?? hoveredPoint.value.x
	})

	const tooltipStyle = computed<StyleValue>(() => ({
		left: `${mousePos.value.x + 12}px`,
		top: `${mousePos.value.y + 12}px`
	}))

	/*********************************************************
	 * Empty state — fired when no series carries usable data.
	 ********************************************************/
	const showEmpty = computed(() => {
		if (!props.series?.length) return true
		return props.series.every((s) => !s.data?.length || s.visible === false)
	})

	/*********************************************************
	 * Computed root classes / styles. `aspectRatio` wins over
	 * `height` so containers can grow with the viewport.
	 ********************************************************/
	const rootClasses = computed(() => ({
		[`origam-chart--${props.type}`]: true,
		[`origam-chart--legend-${props.legendPosition}`]: true,
		'origam-chart--no-animation': !props.animated
	}))

	const rootStyles = computed<StyleValue>(() => {
		const out: Record<string, string> = {}
		if (props.aspectRatio) {
			out.aspectRatio = props.aspectRatio
		} else if (typeof props.height === 'number') {
			out.height = `${props.height}px`
		} else if (typeof props.height === 'string') {
			out.height = props.height
		}
		out['--origam-chart---animation-duration'] = `${props.animationDuration}ms`
		return out
	})

	const bodyClasses = computed(() => ({
		'origam-chart__body--with-side-legend': props.showLegend
			&& (props.legendPosition === 'left' || props.legendPosition === 'right')
	}))

	const legendClasses = computed(() => ({
		[`origam-chart__legend--${props.legendPosition}`]: true
	}))

	const svgClasses = computed(() => ({
		'origam-chart__svg--animated': props.animated
	}))

	const hasTitleBlock = computed(() => Boolean(props.title || props.subtitle))

	/*********************************************************
	 * Labels — format helpers default to identity when the consumer
	 * doesn't provide a formatter.
	 ********************************************************/
	const formatX = (value: number | string): string => {
		if (props.xAxisFormat) return props.xAxisFormat(value)
		return String(value)
	}

	const formatY = (value: number): string => {
		if (props.yAxisFormat) return props.yAxisFormat(value)
		return String(value)
	}

	/*********************************************************
	 * Path classification helpers — we need to know whether a path
	 * descriptor represents a pie slice (rendered with `fill`) vs a
	 * line / area (rendered with `stroke`), because the same `kind`
	 * is reused for both.
	 ********************************************************/
	const effectiveTypeOf = (path: IChartPath) =>
		path.series.type ?? props.type

	const isPie = (path: IChartPath) =>
		isPieKind(effectiveTypeOf(path))

	const strokeStyleFor = (path: IChartPath): StyleValue => {
		if (!props.animated) return {}
		// Use stroke-dasharray to "draw" the line on entrance. We
		// can't put this in the SCSS because the dash length is
		// data-driven (length of the path) — and `attr()` in CSS
		// for SVG isn't widely supported yet.
		const length = path.pathLength ?? 0
		if (!length) return {}
		return {
			'--origam-chart-path---length': String(length)
		}
	}

	/*********************************************************
	 * Radar — auxiliary geometry. The chart frame draws four
	 * concentric rings + spokes, then `<useChart>` overlays the
	 * data polygons.
	 ********************************************************/
	const RADAR_RINGS = [0.25, 0.5, 0.75, 1]
	const radarRings = computed(() => (isAngular.value ? RADAR_RINGS : []))
	const radarSpokes = computed(() =>
		isAngular.value
			? (props.categories.length ? props.categories : props.series[0]?.data.map((_, i) => String(i)) ?? [])
			: []
	)
	const radarOuterRadius = computed(() =>
		Math.max(
			10,
			Math.min(plot.value.x1 - plot.value.x0, plot.value.y1 - plot.value.y0) / 2 - 8
		)
	)
	const radarSpokeEnd = (i: number) => {
		const r = radarOuterRadius.value
		const angle = (i / Math.max(1, radarSpokes.value.length)) * Math.PI * 2 - Math.PI / 2
		return {
			x: plot.value.cx + r * Math.cos(angle),
			y: plot.value.cy + r * Math.sin(angle)
		}
	}
	const radarLabelPos = (i: number) => {
		const r = radarOuterRadius.value + 14
		const angle = (i / Math.max(1, radarSpokes.value.length)) * Math.PI * 2 - Math.PI / 2
		return {
			x: plot.value.cx + r * Math.cos(angle),
			y: plot.value.cy + r * Math.sin(angle)
		}
	}
	const ringPointsFor = (ratio: number): string => {
		const r = radarOuterRadius.value * ratio
		const slots = Math.max(1, radarSpokes.value.length)
		const pts: Array<string> = []
		for (let i = 0; i < slots; i++) {
			const angle = (i / slots) * Math.PI * 2 - Math.PI / 2
			const x = plot.value.cx + r * Math.cos(angle)
			const y = plot.value.cy + r * Math.sin(angle)
			pts.push(`${x},${y}`)
		}
		return pts.join(' ')
	}

	const polygonPoints = (d: string): string => {
		// Convert our internal `M x,y L x,y …` polygon path back into
		// the SVG `<polygon points="…">` shorthand for crisp filling.
		return d
			.replace(/[MLZ]/g, ' ')
			.split(/\s+/)
			.filter(Boolean)
			.join(' ')
	}

	/*********************************************************
	 * Interaction — hover + click + legend toggle. Both the data
	 * shape (`<circle>` / `<rect>` / `<path>`) and the SVG root
	 * report mouse positions; we keep them synced so the tooltip
	 * follows the cursor instead of snapping.
	 ********************************************************/
	const hoverMatches = (path: IChartPath) =>
		hoveredPath.value === path

	const onPointEnter = (path: IChartPath) => {
		hoveredPath.value = path
		if (hoveredPoint.value) chart.onPointHover(hoveredPoint.value)
	}

	const onPointLeaveEvent = () => {
		hoveredPath.value = null
		chart.onPointHover(null)
	}

	const onSvgMouseMove = (event: MouseEvent) => {
		const target = svgRef.value
		if (!target) return
		const rect = target.getBoundingClientRect()
		mousePos.value = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		}
	}

	const onSvgMouseLeave = () => {
		onPointLeaveEvent()
	}

	const onPointActivate = (path: IChartPath, event: MouseEvent | KeyboardEvent) => {
		if (!hoveredPoint.value || hoveredPath.value !== path) {
			hoveredPath.value = path
		}
		if (hoveredPoint.value) {
			emit('point-click', hoveredPoint.value, event)
		}
	}

	const onLegendClick = (entry: IChartLegendItem) => {
		emit('legend-click', entry.series, entry.index)
		const nextVisible = !(entry.series.visible !== false)
		entry.series.visible = nextVisible
		emit('series-toggle', entry.series, nextVisible)
	}

	/*********************************************************
	 * ARIA — the SVG embeds `<title>` + `<desc>` for screen
	 * readers. The desc summarises the chart shape + value range
	 * so a SR user gets the gist without exploring every node.
	 ********************************************************/
	const ariaLabel = computed(() => props.title ?? 'Chart')
	const svgAriaLabel = computed(() => props.title ?? `${props.type} chart`)
	const svgTitle = computed(() => props.title ?? `${props.type} chart`)
	const svgDesc = computed(() => {
		const seriesCount = props.series.length
		if (!seriesCount) return 'No data'
		const range = yRange.value
		const points = slotCount.value
		return `${props.type} chart with ${seriesCount} ${seriesCount === 1 ? 'series' : 'series'} and ${points} ${points === 1 ? 'point' : 'points'}, values ranging from ${range.min} to ${range.max}.`
	})

	const pointAriaLabel = (path: IChartPath) => {
		const entry = path.series.data[path.dataIndex ?? 0]
		const y = typeof entry === 'number' ? entry : entry.y
		const cat = props.categories[path.dataIndex ?? 0] ?? path.dataIndex
		return `${path.series.name}, ${cat}: ${formatY(y)}`
	}
	const barAriaLabel = pointAriaLabel
	const sliceAriaLabel = (path: IChartPath) => {
		const entry = path.series.data[path.dataIndex ?? 0]
		const y = typeof entry === 'number' ? entry : entry.y
		const cat = props.categories[path.dataIndex ?? 0] ?? path.dataIndex
		return `${cat}: ${formatY(y)}`
	}

	const emptyLabel = computed(() => 'No data to display')

	/*********************************************************
	 * Re-fire entrance animation on data change. Toggling the class
	 * via `key` would force a full DOM swap; instead we just bump a
	 * counter that re-triggers the keyframe.
	 ********************************************************/
	const animationKey = ref(0)
	watch(
		() => [props.series, props.type, props.stacked],
		() => {
			animationKey.value++
		},
		{ deep: false }
	)
</script>

<style scoped>
	.origam-chart {
		display: grid;
		gap: var(--origam-chart---gap, 12px);
		padding: var(--origam-chart---padding, 12px);
		background-color: var(--origam-chart---background-color, transparent);
		color: var(--origam-chart---color, inherit);
		width: 100%;
		box-sizing: border-box;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 1fr;
		grid-template-areas:
			"header"
			"body"
			"legend";
	}

	.origam-chart--legend-top {
		grid-template-areas:
			"header"
			"legend"
			"body";
		grid-template-rows: auto auto 1fr;
	}

	.origam-chart--legend-bottom {
		grid-template-areas:
			"header"
			"body"
			"legend";
		grid-template-rows: auto 1fr auto;
	}

	.origam-chart--legend-left {
		grid-template-columns: auto minmax(0, 1fr);
		grid-template-rows: auto minmax(0, 1fr);
		grid-template-areas:
			"header header"
			"legend body";
	}

	.origam-chart--legend-right {
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-rows: auto minmax(0, 1fr);
		grid-template-areas:
			"header header"
			"body legend";
	}

	.origam-chart__header {
		grid-area: header;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.origam-chart__title {
		font-size: var(--origam-chart__title---font-size, 1.125rem);
		font-weight: var(--origam-chart__title---font-weight, 600);
		color: var(--origam-chart__title---color, inherit);
	}

	.origam-chart__subtitle {
		font-size: var(--origam-chart__subtitle---font-size, 0.875rem);
		color: var(--origam-chart__subtitle---color, var(--origam-color-text-secondary, #6b7280));
	}

	.origam-chart__body {
		grid-area: body;
		position: relative;
		display: flex;
		min-height: 0;
		min-width: 0;
	}

	.origam-chart__body--with-side-legend {
		min-width: var(--origam-chart__body---min-width, 200px);
	}

	.origam-chart__svg {
		flex: 1 1 auto;
		width: 100%;
		height: 100%;
		min-width: 0;
		min-height: 0;
		overflow: visible;
		display: block;
	}

	.origam-chart__grid-line {
		stroke: var(--origam-chart__grid---color, var(--origam-color-border-subtle, #e5e7eb));
		stroke-width: var(--origam-chart__grid---stroke-width, 1);
	}

	.origam-chart__axis-line {
		stroke: var(--origam-chart__axis---color, var(--origam-color-border-default, #d1d5db));
		stroke-width: 1;
	}

	.origam-chart__axis-label {
		fill: var(--origam-chart__axis-label---color, var(--origam-color-text-secondary, #6b7280));
		font-size: var(--origam-chart__axis-label---font-size, 0.75rem);
	}

	.origam-chart__path {
		fill: none;
		stroke-width: var(--origam-chart__path---stroke-width, 2);
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.origam-chart__svg--animated .origam-chart__path--line,
	.origam-chart__svg--animated .origam-chart__path--area {
		stroke-dasharray: var(--origam-chart-path---length, 1000);
		stroke-dashoffset: var(--origam-chart-path---length, 1000);
		animation: origam-chart-draw var(--origam-chart---animation-duration, 600ms) ease-out forwards;
	}

	.origam-chart__svg--animated .origam-chart__bar,
	.origam-chart__svg--animated .origam-chart__slice {
		transform-origin: center bottom;
		animation: origam-chart-grow var(--origam-chart---animation-duration, 600ms) ease-out both;
	}

	.origam-chart__svg--animated .origam-chart__point,
	.origam-chart__svg--animated .origam-chart__polygon {
		animation: origam-chart-fade var(--origam-chart---animation-duration, 600ms) ease-out both;
	}

	.origam-chart__bar {
		rx: var(--origam-chart__bar---border-radius, 2);
		cursor: pointer;
		transition: opacity 150ms ease;
	}

	.origam-chart__bar:hover,
	.origam-chart__bar:focus-visible {
		opacity: 0.85;
		outline: none;
	}

	.origam-chart__slice {
		stroke: var(--origam-chart__pie---stroke-color, var(--origam-color-surface-default, #ffffff));
		stroke-width: var(--origam-chart__pie---stroke-width, 2);
		cursor: pointer;
		transition: transform 150ms ease;
	}

	.origam-chart__slice:hover,
	.origam-chart__slice:focus-visible {
		outline: none;
		transform: scale(1.03);
		transform-origin: center;
	}

	.origam-chart__point {
		cursor: pointer;
		transition: r 120ms ease;
	}

	.origam-chart__polygon {
		stroke-width: var(--origam-chart__polygon---stroke-width, 1.5);
	}

	.origam-chart__radar-ring {
		fill: none;
		stroke: var(--origam-chart__grid---color, var(--origam-color-border-subtle, #e5e7eb));
		stroke-width: 1;
	}

	.origam-chart__radar-spoke {
		stroke: var(--origam-chart__grid---color, var(--origam-color-border-subtle, #e5e7eb));
		stroke-width: 1;
	}

	.origam-chart__radar-label {
		fill: var(--origam-chart__axis-label---color, var(--origam-color-text-secondary, #6b7280));
		font-size: var(--origam-chart__axis-label---font-size, 0.75rem);
	}

	.origam-chart__tooltip {
		position: absolute;
		pointer-events: none;
		background-color: var(--origam-chart__tooltip---background-color, var(--origam-color-surface-overlay, #1f2937));
		color: var(--origam-chart__tooltip---color, #ffffff);
		padding: var(--origam-chart__tooltip---padding, 8px 12px);
		border-radius: var(--origam-chart__tooltip---border-radius, 6px);
		font-size: 0.8125rem;
		box-shadow: var(--origam-chart__tooltip---shadow, 0 4px 16px rgba(0, 0, 0, 0.15));
		z-index: 10;
	}

	.origam-chart__tooltip-title {
		font-weight: 600;
		margin-bottom: 4px;
	}

	.origam-chart__tooltip-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.origam-chart__tooltip-swatch {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 2px;
	}

	.origam-chart__tooltip-value {
		font-weight: 600;
		margin-left: auto;
	}

	.origam-chart__empty {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--origam-chart__empty---color, var(--origam-color-text-secondary, #6b7280));
	}

	.origam-chart__legend {
		grid-area: legend;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--origam-chart__legend---gap, 12px);
		align-content: center;
	}

	.origam-chart__legend--top,
	.origam-chart__legend--bottom {
		flex-direction: row;
		justify-content: center;
	}

	.origam-chart__legend--left,
	.origam-chart__legend--right {
		flex-direction: column;
		justify-content: center;
		flex-wrap: nowrap;
		align-self: stretch;
	}

	.origam-chart__legend--left {
		padding-right: var(--origam-chart__legend---side-gap, 8px);
	}

	.origam-chart__legend--right {
		padding-left: var(--origam-chart__legend---side-gap, 8px);
	}

	.origam-chart__legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
		cursor: pointer;
		font-size: 0.8125rem;
		user-select: none;
	}

	.origam-chart__legend-item--hidden {
		opacity: 0.4;
		text-decoration: line-through;
	}

	.origam-chart__legend-swatch {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: var(--origam-chart__legend-swatch---border-radius, 3px);
	}

	@keyframes origam-chart-draw {
		to { stroke-dashoffset: 0; }
	}

	@keyframes origam-chart-grow {
		from { transform: scaleY(0.01); opacity: 0; }
		to { transform: scaleY(1); opacity: 1; }
	}

	@keyframes origam-chart-fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@media (prefers-reduced-motion: reduce) {
		.origam-chart__svg--animated .origam-chart__path--line,
		.origam-chart__svg--animated .origam-chart__path--area,
		.origam-chart__svg--animated .origam-chart__bar,
		.origam-chart__svg--animated .origam-chart__slice,
		.origam-chart__svg--animated .origam-chart__point,
		.origam-chart__svg--animated .origam-chart__polygon {
			animation: none;
			stroke-dashoffset: 0;
		}
	}

	.origam-chart--no-animation .origam-chart__path,
	.origam-chart--no-animation .origam-chart__bar,
	.origam-chart--no-animation .origam-chart__slice,
	.origam-chart--no-animation .origam-chart__point,
	.origam-chart--no-animation .origam-chart__polygon {
		animation: none;
		stroke-dashoffset: 0;
	}
</style>
