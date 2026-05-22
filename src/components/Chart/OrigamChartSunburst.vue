<template>
	<div
			class="origam-chart-sunburst"
			:class="rootClasses"
			:style="rootStyles"
			role="figure"
			:aria-label="ariaLabel"
			data-cy="origam-chart-sunburst"
	>
		<div
				v-if="hasTitleBlock"
				class="origam-chart-sunburst__header"
				data-cy="origam-chart-sunburst-header"
		>
			<slot name="title">
				<div
						v-if="title"
						class="origam-chart-sunburst__title"
				>
					{{ title }}
				</div>
				<div
						v-if="subtitle"
						class="origam-chart-sunburst__subtitle"
				>
					{{ subtitle }}
				</div>
			</slot>
		</div>

		<div
				class="origam-chart-sunburst__body"
				:class="bodyClasses"
				data-cy="origam-chart-sunburst-body"
		>
			<svg
					ref="svgRef"
					class="origam-chart-sunburst__svg origam-chart__svg"
					:class="svgClasses"
					:viewBox="`0 0 ${ SVG_SIZE } ${ SVG_SIZE }`"
					role="img"
					:aria-label="svgAriaLabel"
					preserveAspectRatio="xMidYMid meet"
					data-cy="origam-chart-sunburst-svg"
					@mousemove="onSvgMouseMove"
					@mouseleave="onSvgMouseLeave"
			>
				<title>{{ svgTitle }}</title>
				<desc>{{ svgDesc }}</desc>

				<g
						class="origam-chart__series"
						:transform="`translate(${ CENTER }, ${ CENTER })`"
						data-cy="origam-chart-sunburst-series"
				>
					<path
							v-for="node in visibleNodes"
							:key="node.id"
							class="origam-chart__sunburst-arc"
							:class="{ 'origam-chart__sunburst-arc--active': hoveredId === node.id }"
							:d="node.d"
							:style="{ fill: node.color }"
							:data-cy="`origam-chart-sunburst-arc-${ node.id }`"
							tabindex="0"
							role="button"
							:aria-label="nodeAriaLabel(node)"
							@click="onNodeActivate(node, $event)"
							@keydown.enter.prevent="onNodeActivate(node, $event)"
							@keydown.space.prevent="onNodeActivate(node, $event)"
							@mouseenter="onNodeEnter(node)"
							@mouseleave="onNodeLeave"
					/>

					<text
							v-for="node in labelNodes"
							:key="`label-${ node.id }`"
							class="origam-chart__sunburst-label"
							:text-anchor="labelAnchor(node)"
							dominant-baseline="middle"
							:transform="labelTransform(node)"
							:data-cy="`origam-chart-sunburst-label-${ node.id }`"
					>
						{{ node.name }}
					</text>
				</g>
			</svg>

			<origam-chart-tooltip
					v-if="showTooltip"
					:point="hoveredPoint"
					:series="hoveredSeries"
					:category="hoveredCategory"
					:x="mousePos.x"
					:y="mousePos.y"
					:y-axis-format="yAxisFormat"
			>
				<template
						v-if="$slots.tooltip"
						#default="bindings"
				>
					<slot
							name="tooltip"
							v-bind="bindings"
							:node="hoveredNode"
							:path="hoveredNode?.path ?? ''"
					/>
				</template>
			</origam-chart-tooltip>

			<div
					v-if="showEmpty"
					class="origam-chart-sunburst__empty origam-chart__empty"
					data-cy="origam-chart-sunburst-empty"
			>
				<slot name="empty">
					<span>No data to display</span>
				</slot>
			</div>
		</div>

		<origam-chart-legend
				v-if="showLegend"
				:items="legendItems"
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

	import OrigamChartLegend from './OrigamChartLegend.vue'
	import OrigamChartTooltip from './OrigamChartTooltip.vue'

	import type {
		IChartLegendItem,
		IChartPoint,
		IChartSeries
	} from '../../interfaces'

	import type {
		IChartSunburstDatum,
		IChartSunburstEmits,
		IChartSunburstNode,
		IChartSunburstProps
	} from '../../interfaces/Chart/chart-sunburst.interface'

	import { intentBgExpr, isIntent } from '../../utils/Commons/color.util'

	import type { TIntent } from '../../types'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Sunburst chart family. Renders a hierarchical multi-level
	 * donut where each ring represents one depth level of the tree.
	 *
	 * - Root nodes form the innermost ring, proportional to value.
	 * - Child nodes subdivide their parent's angular span.
	 * - `innerRadius` controls the centre hole size (0 = full pie).
	 * - Children inherit parent colour via `color-mix` lightening.
	 *
	 * `withDefaults` literals only, per CLAUDE.md.
	 ********************************************************/
	defineOptions({
		name: 'OrigamChartSunburst'
	})

	const props = withDefaults(defineProps<IChartSunburstProps>(), {
		height: 400,
		title: undefined,
		subtitle: undefined,
		innerRadius: 0.15,
		ringPadding: 1,
		showLabel: true,
		showLegend: true,
		legendPosition: 'bottom',
		showTooltip: true,
		animated: true,
		animationDuration: 600,
		colorScheme: () => [],
		aspectRatio: undefined,
		yAxisFormat: undefined
	})

	const emit = defineEmits<IChartSunburstEmits>()

	/*********************************************************
	 * Static SVG box — square coordinate space; CSS scales it.
	 ********************************************************/
	const SVG_SIZE = 400
	const CENTER = SVG_SIZE / 2
	const MAX_DEPTH_CAP = 4
	const MIN_LABEL_ANGLE = 0.1

	/*********************************************************
	 * Default colour palette — mirrors the DS intent cycle
	 ********************************************************/
	const DEFAULT_PALETTE: Array<TIntent> = [
		'primary',
		'success',
		'warning',
		'danger',
		'info',
		'secondary',
		'ghost',
		'neutral'
	]

	const resolveColor = (raw: TIntent | string | undefined): string => {
		if (!raw) return 'currentColor'
		if (/^(#|rgb|hsl|var|currentColor|transparent|linear-gradient|radial-gradient|conic-gradient)/i.test(raw)) {
			return raw
		}
		if (isIntent(raw)) {
			return intentBgExpr(raw as TIntent, 'default')
		}
		return 'currentColor'
	}

	const rootColorFor = (rootIndex: number): string => {
		const scheme = props.colorScheme?.length ? props.colorScheme : DEFAULT_PALETTE
		return resolveColor(scheme[rootIndex % scheme.length])
	}

	/*********************************************************
	 * Child colour — lighten toward white per depth level.
	 * Uses color-mix when CSS custom properties are involved;
	 * falls back to a simple inlined color-mix expression.
	 ********************************************************/
	const childColor = (parentColor: string, depth: number): string => {
		const cappedDepth = Math.min(depth, MAX_DEPTH_CAP)
		const pct = cappedDepth * 15
		return `color-mix(in srgb, ${ parentColor } calc(100% - ${ pct }%), white)`
	}

	/*********************************************************
	 * Tree value resolution — fill in missing internal values
	 ********************************************************/
	const resolveValue = (datum: IChartSunburstDatum): number => {
		if (!datum.children?.length) {
			return datum.value ?? 0
		}
		const childSum = datum.children.reduce((acc, c) => acc + resolveValue(c), 0)
		return datum.value ?? childSum
	}

	/*********************************************************
	 * Arc path generator (standard SVG arc notation)
	 ********************************************************/
	const arcPath = (
		innerR: number,
		outerR: number,
		startAngle: number,
		endAngle: number
	): string => {
		const sweep = endAngle - startAngle
		if (sweep <= 0) return ''

		const fullCircle = sweep >= 2 * Math.PI - 1e-6

		const cos0 = Math.cos(startAngle)
		const sin0 = Math.sin(startAngle)
		const cos1 = Math.cos(endAngle)
		const sin1 = Math.sin(endAngle)

		const largeArc = sweep > Math.PI ? 1 : 0

		if (fullCircle) {
			const midAngle = startAngle + Math.PI
			const cosM = Math.cos(midAngle)
			const sinM = Math.sin(midAngle)

			const ox0 = outerR * cosM
			const oy0 = outerR * sinM
			const ox1 = outerR * cos0
			const oy1 = outerR * sin0

			const ix0 = innerR * cosM
			const iy0 = innerR * sinM
			const ix1 = innerR * cos0
			const iy1 = innerR * sin0

			if (innerR < 1e-3) {
				return [
					`M ${ ox0 },${ oy0 }`,
					`A ${ outerR },${ outerR } 0 1,1 ${ ox1 },${ oy1 }`,
					`A ${ outerR },${ outerR } 0 1,1 ${ ox0 },${ oy0 }`,
					'Z'
				].join(' ')
			}

			return [
				`M ${ ox0 },${ oy0 }`,
				`A ${ outerR },${ outerR } 0 1,1 ${ ox1 },${ oy1 }`,
				`A ${ outerR },${ outerR } 0 1,1 ${ ox0 },${ oy0 }`,
				`L ${ ix0 },${ iy0 }`,
				`A ${ innerR },${ innerR } 0 1,0 ${ ix1 },${ iy1 }`,
				`A ${ innerR },${ innerR } 0 1,0 ${ ix0 },${ iy0 }`,
				'Z'
			].join(' ')
		}

		const ox0 = outerR * cos0
		const oy0 = outerR * sin0
		const ox1 = outerR * cos1
		const oy1 = outerR * sin1

		const ix0 = innerR * cos0
		const iy0 = innerR * sin0
		const ix1 = innerR * cos1
		const iy1 = innerR * sin1

		if (innerR < 1e-3) {
			return [
				`M 0,0`,
				`L ${ ox0 },${ oy0 }`,
				`A ${ outerR },${ outerR } 0 ${ largeArc },1 ${ ox1 },${ oy1 }`,
				'Z'
			].join(' ')
		}

		/*
		 * Donut wedge: start at outer-START, sweep clockwise to
		 * outer-END (sweep=1), radial line in to inner-END, then
		 * sweep counter-clockwise back to inner-START (sweep=0).
		 *
		 * Prior agent inverted both directions (started at inner
		 * end, swept the WRONG way around the circle) which made
		 * each wedge draw across the entire ring — visible as
		 * petals / bulges in the rendered chart.
		 */
		return [
			`M ${ ox0 },${ oy0 }`,
			`A ${ outerR },${ outerR } 0 ${ largeArc },1 ${ ox1 },${ oy1 }`,
			`L ${ ix1 },${ iy1 }`,
			`A ${ innerR },${ innerR } 0 ${ largeArc },0 ${ ix0 },${ iy0 }`,
			'Z'
		].join(' ')
	}

	/*********************************************************
	 * Max-depth calculation — must precede allNodes
	 ********************************************************/
	const computeMaxDepth = (data: Array<IChartSunburstDatum>): number => {
		const walkDepth = (nodes: Array<IChartSunburstDatum>, current: number): number => {
			let max = current
			for (const node of nodes) {
				if (node.children?.length) {
					max = Math.max(max, walkDepth(node.children, current + 1))
				}
			}
			return max
		}
		return walkDepth(data, 1)
	}

	/*********************************************************
	 * Legend — hidden-root set keyed by root node name
	 ********************************************************/
	const hiddenRoots = ref<Set<string>>(new Set())

	/*********************************************************
	 * Geometry engine — flatten tree into node descriptors
	 ********************************************************/
	const allNodes = computed<Array<IChartSunburstNode>>(() => {
		const series = props.series?.[0]
		if (!series || !series.data?.length) return []

		const rawData = series.data as Array<IChartSunburstDatum>
		if (!rawData.length) return []

		const maxDepth = Math.min(computeMaxDepth(rawData), MAX_DEPTH_CAP)
		if (maxDepth === 0) return []

		const totalR = CENTER - 4
		const holeR = totalR * props.innerRadius
		const ringWidth = (totalR - holeR) / maxDepth

		const totalValue = rawData.reduce((acc, d) => acc + resolveValue(d), 0)
		if (totalValue <= 0) return []

		const TWO_PI = 2 * Math.PI
		const result: Array<IChartSunburstNode> = []

		const walkTree = (
			datum: IChartSunburstDatum,
			depth: number,
			parentStartAngle: number,
			parentEndAngle: number,
			rootIdx: number,
			parentColor: string,
			ancestorPath: string
		) => {
			if (depth > MAX_DEPTH_CAP) return

			const val = resolveValue(datum)
			if (val <= 0) return

			const nodePath = ancestorPath ? `${ ancestorPath } > ${ datum.name }` : datum.name
			const isHidden = hiddenRoots.value.has(depth === 0 ? datum.name : nodePath.split(' > ')[0])

			const innerR = holeR + (depth) * (ringWidth + props.ringPadding)
			const outerR = innerR + ringWidth

			const nodeColor = datum.color
				? resolveColor(datum.color)
				: depth === 0
					? parentColor
					: childColor(parentColor, depth)

			const d = arcPath(innerR, outerR, parentStartAngle, parentEndAngle)

			result.push({
				id: nodePath,
				name: datum.name,
				value: val,
				depth,
				rootIndex: rootIdx,
				startAngle: parentStartAngle,
				endAngle: parentEndAngle,
				innerR,
				outerR,
				d,
				color: nodeColor,
				visible: !isHidden,
				path: nodePath
			})

			if (datum.children?.length && depth + 1 <= MAX_DEPTH_CAP) {
				const parentSpan = parentEndAngle - parentStartAngle
				let childAngle = parentStartAngle

				for (const child of datum.children) {
					const childVal = resolveValue(child)
					if (childVal <= 0) continue
					const childSpan = (childVal / val) * parentSpan
					const childEnd = childAngle + childSpan

					walkTree(child, depth + 1, childAngle, childEnd, rootIdx, nodeColor, nodePath)
					childAngle = childEnd
				}
			}
		}

		let currentAngle = 0

		rawData.forEach((datum, rootIdx) => {
			const rootVal = resolveValue(datum)
			if (rootVal <= 0) return
			const rootColor = datum.color ? resolveColor(datum.color) : rootColorFor(rootIdx)
			const span = (rootVal / totalValue) * TWO_PI
			walkTree(datum, 0, currentAngle, currentAngle + span, rootIdx, rootColor, '')
			currentAngle += span
		})

		return result
	})

	const visibleNodes = computed(() =>
		allNodes.value.filter((n) => n.visible)
	)

	const labelNodes = computed(() => {
		if (!props.showLabel) return []
		return visibleNodes.value.filter((n) => {
			const span = n.endAngle - n.startAngle
			return span >= MIN_LABEL_ANGLE
		})
	})

	/*********************************************************
	 * Label geometry — centred in the arc
	 ********************************************************/
	const labelTransform = (node: IChartSunburstNode): string => {
		const midAngle = (node.startAngle + node.endAngle) / 2
		const midR = (node.innerR + node.outerR) / 2
		const x = midR * Math.cos(midAngle)
		const y = midR * Math.sin(midAngle)
		const degrees = (midAngle * 180) / Math.PI
		const rotation = degrees > 90 && degrees < 270 ? degrees + 180 : degrees
		return `translate(${ x },${ y }) rotate(${ rotation })`
	}

	const labelAnchor = (_node: IChartSunburstNode): string => 'middle'

	/*********************************************************
	 * Legend items — root-level nodes only
	 ********************************************************/
	const legendItems = computed<Array<IChartLegendItem>>(() => {
		const series = props.series?.[0]
		if (!series) return []

		const roots = allNodes.value.filter((n) => n.depth === 0)
		return roots.map((node) => ({
			series: {
				...series,
				name: node.name,
				data: [node.value],
				visible: node.visible
			} as IChartSeries,
			index: node.rootIndex,
			color: node.color,
			visible: node.visible
		}))
	})

	/*********************************************************
	 * Hover / tooltip
	 ********************************************************/
	const svgRef = ref<SVGSVGElement | null>(null)
	const mousePos = ref<{ x: number, y: number }>({ x: 0, y: 0 })
	const hoveredId = ref<string | null>(null)

	const hoveredNode = computed<IChartSunburstNode | null>(() => {
		if (!hoveredId.value) return null
		return visibleNodes.value.find((n) => n.id === hoveredId.value) ?? null
	})

	const hoveredPoint = computed<IChartPoint | null>(() => {
		const n = hoveredNode.value
		if (!n || !props.series?.[0]) return null
		return {
			seriesIndex: 0,
			seriesName: props.series[0].name,
			dataIndex: n.rootIndex,
			x: n.name,
			y: n.value,
			color: n.color
		}
	})

	const hoveredSeries = computed<IChartSeries | null>(() => {
		if (!hoveredNode.value || !props.series?.[0]) return null
		return props.series[0]
	})

	const hoveredCategory = computed<string | number>(() =>
		hoveredNode.value?.name ?? ''
	)

	const showEmpty = computed(() => {
		if (!props.series?.length) return true
		const first = props.series[0]
		if (!first?.data?.length) return true
		return visibleNodes.value.length === 0
	})

	/*********************************************************
	 * Root classes / styles
	 ********************************************************/
	const rootClasses = computed(() => ({
		[`origam-chart-sunburst--legend-${ props.legendPosition }`]: true,
		'origam-chart-sunburst--no-animation': !props.animated
	}))

	const rootStyles = computed<StyleValue>(() => {
		const out: Record<string, string> = {}
		if (props.aspectRatio) {
			out.aspectRatio = props.aspectRatio
		} else if (typeof props.height === 'number') {
			out.height = `${ props.height }px`
		} else if (typeof props.height === 'string') {
			out.height = props.height
		}
		out['--origam-chart---animation-duration'] = `${ props.animationDuration }ms`
		return out
	})

	const bodyClasses = computed(() => ({
		'origam-chart-sunburst__body--with-side-legend': props.showLegend
			&& (props.legendPosition === 'left' || props.legendPosition === 'right')
	}))

	const svgClasses = computed(() => ({
		'origam-chart__svg--animated': props.animated
	}))

	const hasTitleBlock = computed(() => Boolean(props.title || props.subtitle))

	/*********************************************************
	 * ARIA
	 ********************************************************/
	const ariaLabel = computed(() => props.title ?? 'Sunburst chart')
	const svgAriaLabel = computed(() => props.title ?? 'Sunburst chart')
	const svgTitle = computed(() => props.title ?? 'Sunburst chart')
	const svgDesc = computed(() => {
		const n = visibleNodes.value.filter((nd) => nd.depth === 0).length
		return `Sunburst chart with ${ n } root ${ n === 1 ? 'node' : 'nodes' }.`
	})

	const nodeAriaLabel = (node: IChartSunburstNode): string => {
		const formatted = props.yAxisFormat ? props.yAxisFormat(node.value) : String(node.value)
		return `${ node.path }: ${ formatted }`
	}

	/*********************************************************
	 * Interaction
	 ********************************************************/
	const onNodeEnter = (node: IChartSunburstNode) => {
		hoveredId.value = node.id
	}

	const onNodeLeave = () => {
		hoveredId.value = null
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
		onNodeLeave()
	}

	const onNodeActivate = (node: IChartSunburstNode, event: MouseEvent | KeyboardEvent) => {
		hoveredId.value = node.id
		if (hoveredPoint.value) {
			emit('point-click', hoveredPoint.value, event)
		}
	}

	const onLegendClick = (series: IChartSeries, index: number): void => {
		emit('legend-click', series, index)
	}

	const onSeriesToggle = (series: IChartSeries, nextVisible: boolean): void => {
		if (nextVisible) hiddenRoots.value.delete(series.name)
		else hiddenRoots.value.add(series.name)
		emit('series-toggle', series, nextVisible)
	}
</script>

<style
		lang="scss"
		scoped
>
	.origam-chart-sunburst {
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

		.origam-chart__sunburst-arc {
			stroke: var(--origam-chart__sunburst---stroke-color, var(--origam-color-surface-default, #ffffff));
			stroke-width: var(--origam-chart__sunburst---stroke-width, 1.5);
			cursor: pointer;
			transition: opacity 150ms ease, filter 150ms ease;

			&:hover,
			&:focus-visible,
			&--active {
				outline: none;
				filter: brightness(1.1);
			}
		}

		.origam-chart__sunburst-label {
			pointer-events: none;
			font-size: var(--origam-chart__sunburst-label---font-size, 0.625rem);
			font-weight: var(--origam-chart__sunburst-label---font-weight, 500);
			fill: var(--origam-chart__sunburst-label---color, #ffffff);
			user-select: none;
		}

		.origam-chart__svg--animated .origam-chart__sunburst-arc {
			animation: origam-chart-sunburst-fade var(--origam-chart---animation-duration, 600ms) ease-out both;
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

		&--no-animation .origam-chart__sunburst-arc {
			animation: none;
		}
	}

	@keyframes origam-chart-sunburst-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.origam-chart-sunburst .origam-chart__svg--animated .origam-chart__sunburst-arc {
			animation: none;
		}
	}
</style>
