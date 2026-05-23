<template>
	<div
			class="origam-chart-polar"
			:class="rootClasses"
			:style="[rootStyles, dimensionStyles]"
			role="figure"
			:aria-label="ariaLabel"
			data-cy="origam-chart-polar"
	>
		<div
				v-if="hasTitleBlock"
				class="origam-chart-polar__header"
				data-cy="origam-chart-polar-header"
		>
			<slot name="title">
				<div
						v-if="title"
						class="origam-chart-polar__title"
				>
					{{ title }}
				</div>
				<div
						v-if="subtitle"
						class="origam-chart-polar__subtitle"
				>
					{{ subtitle }}
				</div>
			</slot>
		</div>

		<div
				class="origam-chart-polar__body"
				:class="bodyClasses"
				data-cy="origam-chart-polar-body"
		>
			<svg
					ref="svgRef"
					class="origam-chart-polar__svg origam-chart__svg"
					:class="svgClasses"
					:viewBox="viewBox"
					role="img"
					:aria-label="svgAriaLabel"
					preserveAspectRatio="xMidYMid meet"
					data-cy="origam-chart-polar-svg"
					@mousemove="onSvgMouseMove"
					@mouseleave="onSvgMouseLeave"
			>
				<title>{{ svgTitle }}</title>
				<desc>{{ svgDesc }}</desc>

				<g
						class="origam-chart__series"
						data-cy="origam-chart-polar-series"
				>
					<path
							v-for="(path, i) in paths"
							:key="`slice-${ i }`"
							class="origam-chart__slice"
							:d="path.d"
							:fill="path.color"
							:data-cy="`origam-chart-slice-${ path.dataIndex }`"
							tabindex="0"
							role="button"
							:aria-label="sliceAriaLabel(path)"
							@click="onPointActivate(path, $event)"
							@keydown.enter.prevent="onPointActivate(path, $event)"
							@keydown.space.prevent="onPointActivate(path, $event)"
							@mouseenter="onPointEnter(path)"
							@mouseleave="onPointLeaveEvent"
					/>
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
					class="origam-chart-polar__empty origam-chart__empty"
					data-cy="origam-chart-polar-empty"
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

	import { useChart, useDimension } from '../../composables'

	import OrigamChartLegend from './OrigamChartLegend.vue'
	import OrigamChartTooltip from './OrigamChartTooltip.vue'

	import type {
		IChartPath,
		IChartPoint,
		IChartPolarEmits,
		IChartPolarProps,
		IChartSeries
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Polar chart family — renders `pie` and `donut`. Deliberately
	 * has NO axes, NO grid, NO tick labels: the cartesian chrome
	 * doesn't apply to angular geometry, and painting it behind a
	 * pie chart was the user's primary complaint about the
	 * legacy `<OrigamChart>` shell.
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartPolar'
	})

	/*********************************************************
	 * Props / Emits
	 ********************************************************/
	const props = withDefaults(defineProps<IChartPolarProps>(), {
		type: 'pie',
		categories: () => [],
		height: 300,
		title: undefined,
		subtitle: undefined,
		showLegend: true,
		legendPosition: 'bottom',
		showTooltip: true,
		animated: true,
		animationDuration: 600,
		donutHoleSize: 0.6,
		colorScheme: () => [],
		xAxisFormat: undefined,
		yAxisFormat: undefined,
		aspectRatio: undefined
	})

	const emit = defineEmits<IChartPolarEmits>()

	const { dimensionStyles } = useDimension(props)

	/*********************************************************
	 * Static — polar charts need less padding than cartesian
	 * because there are no axis labels to host outside the plot.
	 ********************************************************/
	const SVG_WIDTH = 600
	const SVG_HEIGHT = 360
	const PADDING_POLAR = { top: 12, right: 12, bottom: 12, left: 12 }

	const svgRef = ref<SVGSVGElement | null>(null)
	const mousePos = ref<{ x: number, y: number }>({ x: 0, y: 0 })

	/*********************************************************
	 * Engine
	 ********************************************************/
	/*
	 * Local hidden-labels set drives the per-slice (single ring) /
	 * per-ring (multi-ring) visibility toggle. Keyed by display name
	 * (category for single-ring, series name for multi-ring). The
	 * shell uses the same pattern but with its own ref — this family
	 * stays usable standalone.
	 */
	const hiddenLabels = ref<Set<string>>(new Set())

	const seriesWithVisibility = computed<Array<IChartSeries>>(() =>
		props.series.map((s) => ({
			...s,
			visible: !hiddenLabels.value.has(s.name)
		}))
	)

	const chart = useChart({
		type: () => props.type,
		series: () => seriesWithVisibility.value,
		categories: () => props.categories,
		stacked: () => false,
		donutHoleSize: () => props.donutHoleSize,
		colorScheme: () => props.colorScheme,
		smoothing: () => 'none',
		yMin: () => undefined,
		yMax: () => undefined,
		width: () => SVG_WIDTH,
		height: () => SVG_HEIGHT,
		padding: () => PADDING_POLAR,
		hiddenLabels: () => hiddenLabels.value
	})

	const { viewBox, paths, legend, slotCount } = chart

	/*********************************************************
	 * Hover / tooltip
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

	const showEmpty = computed(() => {
		if (!props.series?.length) return true
		return props.series.every((s) => !s.data?.length || s.visible === false)
	})

	/*********************************************************
	 * Root classes / styles
	 ********************************************************/
	const rootClasses = computed(() => ({
		[`origam-chart-polar--${ props.type }`]: true,
		[`origam-chart-polar--legend-${ props.legendPosition }`]: true,
		'origam-chart-polar--no-animation': !props.animated
	}))

	const rootStyles = computed<StyleValue>(() => {
		const out: Record<string, string> = {}
		if (props.aspectRatio) {
			out.aspectRatio = props.aspectRatio
		}
		out['--origam-chart---animation-duration'] = `${ props.animationDuration }ms`
		return out
	})

	const bodyClasses = computed(() => ({
		'origam-chart-polar__body--with-side-legend': props.showLegend
			&& (props.legendPosition === 'left' || props.legendPosition === 'right')
	}))

	const svgClasses = computed(() => ({
		'origam-chart__svg--animated': props.animated
	}))

	const hasTitleBlock = computed(() => Boolean(props.title || props.subtitle))

	const formatY = (value: number): string => {
		if (props.yAxisFormat) return props.yAxisFormat(value)
		return String(value)
	}

	/*********************************************************
	 * Interaction
	 ********************************************************/
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
		if (nextVisible) hiddenLabels.value.delete(series.name)
		else hiddenLabels.value.add(series.name)
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
		const points = slotCount.value
		return `${ props.type } chart with ${ seriesCount } series and ${ points } ${ points === 1 ? 'point' : 'points' }.`
	})

	const sliceAriaLabel = (path: IChartPath) => {
		// Defensive: `path.dataIndex` may exceed `series.data.length`
		// in series-as-slice mode (each synthetic series has
		// `data: [value]` so the only valid index is 0). Fall back
		// to `data[0]` then to NaN if the data array is empty.
		const idx = path.dataIndex ?? 0
		const entry = path.series.data[idx] ?? path.series.data[0]
		const y = entry == null
			? NaN
			: typeof entry === 'number'
				? entry
				: entry.y
		const cat = props.categories[idx] ?? path.series.name ?? idx
		return `${ cat }: ${ formatY(y) }`
	}
</script>

<style
		lang="scss"
		scoped
>
	.origam-chart-polar {
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

		.origam-chart__slice {
			stroke: var(--origam-chart__pie---stroke-color, var(--origam-color-surface-default, #ffffff));
			stroke-width: var(--origam-chart__pie---stroke-width, 2);
			cursor: pointer;
			transition: transform 150ms ease;

			&:hover,
			&:focus-visible {
				outline: none;
				transform: scale(1.03);
				transform-origin: center;
			}
		}

		.origam-chart__svg--animated .origam-chart__slice {
			transform-origin: center;
			animation: origam-chart-polar-fade var(--origam-chart---animation-duration, 600ms) ease-out both;
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

		&--no-animation .origam-chart__slice {
			animation: none;
		}
	}

	@keyframes origam-chart-polar-fade {
		from { opacity: 0; transform: scale(0.8); }
		to { opacity: 1; transform: scale(1); }
	}

	@media (prefers-reduced-motion: reduce) {
		.origam-chart-polar .origam-chart__svg--animated .origam-chart__slice {
			animation: none;
		}
	}
</style>
