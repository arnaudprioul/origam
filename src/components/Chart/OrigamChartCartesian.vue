<template>
	<div
			class="origam-chart-cartesian"
			:class="rootClasses"
			:style="[rootStyles, dimensionStyles, marginStyles, paddingStyles, backgroundColorStyles, elevationStyles, roundedStyles]"
			role="figure"
			:aria-label="ariaLabel"
			data-cy="origam-chart-cartesian"
	>
		<div
				v-if="hasTitleBlock"
				class="origam-chart-cartesian__header"
				data-cy="origam-chart-cartesian-header"
		>
			<slot name="title">
				<div
						v-if="title"
						class="origam-chart-cartesian__title"
				>
					{{ title }}
				</div>
				<div
						v-if="subtitle"
						class="origam-chart-cartesian__subtitle"
				>
					{{ subtitle }}
				</div>
			</slot>
		</div>

		<div
				class="origam-chart-cartesian__body"
				:class="bodyClasses"
				data-cy="origam-chart-cartesian-body"
		>
			<svg
					ref="svgRef"
					class="origam-chart-cartesian__svg origam-chart__svg"
					:class="svgClasses"
					:viewBox="viewBox"
					role="img"
					:aria-label="svgAriaLabel"
					preserveAspectRatio="xMidYMid meet"
					data-cy="origam-chart-cartesian-svg"
					@mousemove="onSvgMouseMove"
					@mouseleave="onSvgMouseLeave"
			>
				<title>{{ svgTitle }}</title>
				<desc>{{ svgDesc }}</desc>

				<origam-chart-axis
						:plot="plot"
						:ticks="ticks"
						:show-axis="showAxis"
						:show-grid="showGrid"
						:x-axis-format="xAxisFormat"
						:y-axis-format="yAxisFormat"
				/>

				<g
						class="origam-chart__series"
						data-cy="origam-chart-cartesian-series"
				>
					<template
							v-for="(path, i) in paths"
							:key="`p-${ i }`"
					>
						<path
								v-if="path.kind === 'path'"
								:class="['origam-chart__path', `origam-chart__path--${ effectiveTypeOf(path) }`, { 'origam-chart__path--area-fill': path.variant === 'fill' && effectiveTypeOf(path) === 'area' }]"
								:d="path.d"
								:style="pathStyleFor(path)"
								data-cy="origam-chart-path"
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
								:aria-label="pointAriaLabel(path)"
								:data-cy="`origam-chart-bar-${ path.seriesIndex }-${ path.dataIndex }`"
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
								:data-cy="`origam-chart-point-${ path.seriesIndex }-${ path.dataIndex }`"
								@click="onPointActivate(path, $event)"
								@keydown.enter.prevent="onPointActivate(path, $event)"
								@keydown.space.prevent="onPointActivate(path, $event)"
								@mouseenter="onPointEnter(path)"
								@mouseleave="onPointLeaveEvent"
						/>
					</template>
				</g>
			</svg>

			<origam-chart-tooltip
					v-if="showTooltip"
					:point="hoveredPoint"
					:series="hoveredSeries"
					:category="hoveredCategory"
					:x="mousePos.x"
					:y="mousePos.y"
					:x-axis-format="xAxisFormat"
					:y-axis-format="yAxisFormat"
			>
				<template
						v-if="$slots.tooltip"
						#default="bindings"
				>
					<slot
							name="tooltip"
							v-bind="bindings"
					/>
				</template>
			</origam-chart-tooltip>

			<div
					v-if="showEmpty"
					class="origam-chart-cartesian__empty origam-chart__empty"
					data-cy="origam-chart-cartesian-empty"
			>
				<slot name="empty">
					<span>No data to display</span>
				</slot>
			</div>
		</div>

		<origam-chart-legend
				v-if="showLegend"
				:items="legend"
				:position="legendPosition"
				@legend-click="onLegendClick"
				@series-toggle="onSeriesToggle"
		>
			<template
					v-if="$slots['legend-item']"
					#legend-item="bindings"
			>
				<slot
						name="legend-item"
						v-bind="bindings"
				/>
			</template>
		</origam-chart-legend>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		ref,
		type StyleValue
	} from 'vue'

	import {
		useBackgroundColor,
		useChart,
		useDimension,
		useElevation,
		useMargin,
		usePadding,
		useRounded
	} from '../../composables'

	import OrigamChartAxis from './OrigamChartAxis.vue'
	import OrigamChartLegend from './OrigamChartLegend.vue'
	import OrigamChartTooltip from './OrigamChartTooltip.vue'

	import type {
		IChartCartesianEmits,
		IChartCartesianProps,
		IChartPath,
		IChartPoint,
		IChartSeries
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Cartesian chart family — renders `line`, `area`, `bar`,
	 * `column`, `scatter`, `spline`, `stepped-line`. Owns
	 * the X+Y axes + grid + tick labels via `<OrigamChartAxis>`.
	 *
	 * Polar / radar / gauge live in their own family components so
	 * pie / donut don't inherit the cartesian chrome. The shell
	 * `<OrigamChart>` dispatches between families based on the
	 * `type` prop.
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartCartesian'
	})

	/*********************************************************
	 * Props / Emits — defaults inlined per CLAUDE.md.
	 ********************************************************/
	const props = withDefaults(defineProps<IChartCartesianProps>(), {
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
		colorScheme: () => [],
		xAxisFormat: undefined,
		yAxisFormat: undefined,
		aspectRatio: undefined,
		smoothing: 'none',
		yMin: undefined,
		yMax: undefined
	})

	const emit = defineEmits<IChartCartesianEmits>()

	const { dimensionStyles } = useDimension(props)
	const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'bgColor')
	const { elevationClasses, elevationStyles } = useElevation(props)
	const { marginClasses, marginStyles } = useMargin(props)
	const { paddingClasses, paddingStyles } = usePadding(props)
	const { roundedClasses, roundedStyles } = useRounded(props)

	/*********************************************************
	 * Static — viewBox geometry. SVG renders into a fixed coordinate
	 * space; CSS scales the resulting box. Trend sparklines use a
	 * shorter viewBox so they don't grow taller than their host
	 * row when wrapped into a table cell.
	 ********************************************************/
	const SVG_WIDTH = 600
	const SVG_HEIGHT = 360
	const PADDING_DEFAULT = { top: 24, right: 24, bottom: 36, left: 48 }

	const svgRef = ref<SVGSVGElement | null>(null)
	const mousePos = ref<{ x: number, y: number }>({ x: 0, y: 0 })

	const chartPadding = computed(() => PADDING_DEFAULT)

	/*********************************************************
	 * Engine — `useChart` produces every descriptor needed to
	 * paint. The thunks make the composable reactive against
	 * `props` without owning the prop reference itself.
	 ********************************************************/
	const chart = useChart({
		type: () => props.type,
		series: () => props.series,
		categories: () => props.categories,
		stacked: () => props.stacked,
		// donutHoleSize is a no-op for cartesian; fixed to 0.
		donutHoleSize: () => 0,
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
	 * Hover / tooltip — pure data flow, no DOM measurements
	 * beyond positioning the floating tooltip. Identical to the
	 * shell pattern.
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
	const hoveredCategory = computed<string | number>(() => {
		if (!hoveredPoint.value) return ''
		return props.categories[hoveredPoint.value.dataIndex] ?? hoveredPoint.value.x
	})

	/*********************************************************
	 * Empty state — fired when no series carries usable data.
	 ********************************************************/
	const showEmpty = computed(() => {
		if (!props.series?.length) return true
		return props.series.every((s) => !s.data?.length || s.visible === false)
	})

	/*********************************************************
	 * Root classes / styles — `aspectRatio` wins over `height`.
	 ********************************************************/
	const rootClasses = computed(() => [
		{
			[`origam-chart-cartesian--${ props.type }`]: true,
			[`origam-chart-cartesian--legend-${ props.legendPosition }`]: true,
			'origam-chart-cartesian--no-animation': !props.animated
		},
		backgroundColorClasses.value,
		elevationClasses.value,
		marginClasses.value,
		paddingClasses.value,
		roundedClasses.value
	])

	const rootStyles = computed<StyleValue>(() => {
		const out: Record<string, string> = {}
		if (props.aspectRatio) {
			out.aspectRatio = props.aspectRatio
		}
		out['--origam-chart---animation-duration'] = `${ props.animationDuration }ms`
		return out
	})

	const bodyClasses = computed(() => ({
		'origam-chart-cartesian__body--with-side-legend': props.showLegend
			&& (props.legendPosition === 'left' || props.legendPosition === 'right')
	}))

	const svgClasses = computed(() => ({
		'origam-chart__svg--animated': props.animated
	}))

	const hasTitleBlock = computed(() => Boolean(props.title || props.subtitle))

	/*********************************************************
	 * Format helpers — fall back to identity.
	 ********************************************************/
	const formatY = (value: number): string => {
		if (props.yAxisFormat) return props.yAxisFormat(value)
		return String(value)
	}

	/*********************************************************
	 * Path classification — pie / donut helpers don't apply
	 * here (the engine never emits a slice descriptor when
	 * `type` is cartesian). We keep `effectiveTypeOf` for
	 * mixed-type series (e.g. a `<column>` chart with a `line`
	 * overlay series).
	 ********************************************************/
	const effectiveTypeOf = (path: IChartPath) =>
		path.series.type ?? props.type

	const strokeStyleFor = (path: IChartPath): StyleValue => {
		if (!props.animated) return {}
		const length = path.pathLength ?? 0
		if (!length) return {}
		return { '--origam-chart-path---length': String(length) }
	}

	/*
	 * Combined inline style for SVG `<path>` — pre-fix the fill /
	 * stroke were emitted as SVG presentation attributes
	 * (`fill="..."`, `stroke="..."`), which are treated as INITIAL
	 * CSS values and lose against the scoped `.origam-chart__path
	 * { fill: none; }` rule below. The area's translucent fill
	 * therefore never rendered — the user-reported "area looks
	 * identical to line" symptom. Inline styles have higher
	 * precedence than CSS rules, so emitting them here makes the
	 * fill / stroke survive the cascade.
	 */
	const pathStyleFor = (path: IChartPath): StyleValue => {
		const base = strokeStyleFor(path) as Record<string, string>
		const isAreaFill = path.variant === 'fill' && effectiveTypeOf(path) === 'area'
		const isStroke = path.variant !== 'fill'
		return {
			...base,
			fill: isAreaFill ? path.color : 'none',
			fillOpacity: isAreaFill ? '0.25' : '0',
			stroke: isStroke ? path.color : 'none'
		}
	}

	/*********************************************************
	 * Interaction
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

	const onLegendClick = (series: IChartSeries, index: number): void => {
		emit('legend-click', series, index)
	}

	const onSeriesToggle = (series: IChartSeries, nextVisible: boolean): void => {
		series.visible = nextVisible
		emit('series-toggle', series, nextVisible)
	}

	/*********************************************************
	 * ARIA
	 ********************************************************/
	const ariaLabel = computed(() => props.title ?? 'Chart')
	const svgAriaLabel = computed(() => props.title ?? `${ props.type } chart`)
	const svgTitle = computed(() => props.title ?? `${ props.type } chart`)
	const svgDesc = computed(() => {
		const seriesCount = props.series.length
		if (!seriesCount) return 'No data'
		const range = yRange.value
		const points = slotCount.value
		return `${ props.type } chart with ${ seriesCount } ${ seriesCount === 1 ? 'series' : 'series' } and ${ points } ${ points === 1 ? 'point' : 'points' }, values ranging from ${ range.min } to ${ range.max }.`
	})

	const pointAriaLabel = (path: IChartPath) => {
		const entry = path.series.data[path.dataIndex ?? 0]
		const y = typeof entry === 'number' ? entry : entry.y
		const cat = props.categories[path.dataIndex ?? 0] ?? path.dataIndex
		return `${ path.series.name }, ${ cat }: ${ formatY(y) }`
	}
</script>

<style
		lang="scss"
		scoped
>
	.origam-chart-cartesian {
		$this: &;

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

		&--legend-top {
			grid-template-areas:
				"header"
				"legend"
				"body";
			grid-template-rows: auto auto 1fr;
		}

		&--legend-bottom {
			grid-template-areas:
				"header"
				"body"
				"legend";
			grid-template-rows: auto 1fr auto;
		}

		&--legend-left {
			grid-template-columns: auto minmax(0, 1fr);
			grid-template-rows: auto minmax(0, 1fr);
			grid-template-areas:
				"header header"
				"legend body";
		}

		&--legend-right {
			grid-template-columns: minmax(0, 1fr) auto;
			grid-template-rows: auto minmax(0, 1fr);
			grid-template-areas:
				"header header"
				"body legend";
		}

		&__header {
			grid-area: header;
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		&__title {
			font-size: var(--origam-chart__title---font-size, 1.125rem);
			font-weight: var(--origam-chart__title---font-weight, 600);
			color: var(--origam-chart__title---color, inherit);
		}

		&__subtitle {
			font-size: var(--origam-chart__subtitle---font-size, 0.875rem);
			color: var(--origam-chart__subtitle---color, var(--origam-color-text-secondary, #6b7280));
		}

		&__body {
			grid-area: body;
			position: relative;
			display: flex;
			min-height: 0;
			min-width: 0;

			&--with-side-legend {
				min-width: var(--origam-chart__body---min-width, 200px);
			}
		}

		&__svg {
			flex: 1 1 auto;
			width: 100%;
			height: 100%;
			min-width: 0;
			min-height: 0;
			overflow: visible;
			display: block;
		}

		:deep(.origam-chart__grid-line) {
			stroke: var(--origam-chart__grid---color, var(--origam-color-border-subtle, #e5e7eb));
			stroke-width: var(--origam-chart__grid---stroke-width, 1);
		}

		:deep(.origam-chart__axis-line) {
			stroke: var(--origam-chart__axis---color, var(--origam-color-border-default, #d1d5db));
			stroke-width: 1;
		}

		:deep(.origam-chart__axis-label) {
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
		.origam-chart__svg--animated .origam-chart__path--area,
		.origam-chart__svg--animated .origam-chart__path--spline,
		.origam-chart__svg--animated .origam-chart__path--stepped-line {
			stroke-dasharray: var(--origam-chart-path---length, 1000);
			stroke-dashoffset: var(--origam-chart-path---length, 1000);
			animation: origam-chart-cartesian-draw var(--origam-chart---animation-duration, 600ms) ease-out forwards;
		}

		.origam-chart__svg--animated .origam-chart__bar {
			transform-origin: center bottom;
			animation: origam-chart-cartesian-grow var(--origam-chart---animation-duration, 600ms) ease-out both;
		}

		.origam-chart__svg--animated .origam-chart__point {
			animation: origam-chart-cartesian-fade var(--origam-chart---animation-duration, 600ms) ease-out both;
		}

		.origam-chart__bar {
			rx: var(--origam-chart__bar---border-radius, 2);
			cursor: pointer;
			transition: opacity 150ms ease;

			&:hover,
			&:focus-visible {
				opacity: 0.85;
				outline: none;
			}
		}

		.origam-chart__point {
			cursor: pointer;
			transition: r 120ms ease;
		}

		:deep(.origam-chart__tooltip) {
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

		:deep(.origam-chart__tooltip-title) {
			font-weight: 600;
			margin-bottom: 4px;
		}

		:deep(.origam-chart__tooltip-row) {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		:deep(.origam-chart__tooltip-swatch) {
			display: inline-block;
			width: 10px;
			height: 10px;
			border-radius: 2px;
		}

		:deep(.origam-chart__tooltip-value) {
			font-weight: 600;
			margin-left: auto;
		}

		&__empty {
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--origam-chart__empty---color, var(--origam-color-text-secondary, #6b7280));
		}

		:deep(.origam-chart__legend) {
			grid-area: legend;
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			flex-wrap: wrap;
			gap: var(--origam-chart__legend---gap, 12px);
			align-content: center;
		}

		:deep(.origam-chart__legend--top),
		:deep(.origam-chart__legend--bottom) {
			flex-direction: row;
			justify-content: center;
		}

		:deep(.origam-chart__legend--left),
		:deep(.origam-chart__legend--right) {
			flex-direction: column;
			justify-content: center;
			flex-wrap: nowrap;
			align-self: stretch;
		}

		:deep(.origam-chart__legend--left) {
			padding-right: var(--origam-chart__legend---side-gap, 8px);
		}

		:deep(.origam-chart__legend--right) {
			padding-left: var(--origam-chart__legend---side-gap, 8px);
		}

		:deep(.origam-chart__legend-item) {
			display: flex;
			align-items: center;
			gap: 6px;
			cursor: pointer;
			font-size: 0.8125rem;
			user-select: none;
		}

		:deep(.origam-chart__legend-item--hidden) {
			opacity: 0.4;
			text-decoration: line-through;
		}

		:deep(.origam-chart__legend-swatch) {
			display: inline-block;
			width: 12px;
			height: 12px;
			border-radius: var(--origam-chart__legend-swatch---border-radius, 3px);
		}

		&--no-animation .origam-chart__path,
		&--no-animation .origam-chart__bar,
		&--no-animation .origam-chart__point {
			animation: none;
			stroke-dashoffset: 0;
		}

	}

	@keyframes origam-chart-cartesian-draw {
		to { stroke-dashoffset: 0; }
	}

	@keyframes origam-chart-cartesian-grow {
		from { transform: scaleY(0.01); opacity: 0; }
		to { transform: scaleY(1); opacity: 1; }
	}

	@keyframes origam-chart-cartesian-fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@media (prefers-reduced-motion: reduce) {
		.origam-chart-cartesian .origam-chart__svg--animated .origam-chart__path,
		.origam-chart-cartesian .origam-chart__svg--animated .origam-chart__bar,
		.origam-chart-cartesian .origam-chart__svg--animated .origam-chart__point {
			animation: none;
			stroke-dashoffset: 0;
		}
	}
</style>
