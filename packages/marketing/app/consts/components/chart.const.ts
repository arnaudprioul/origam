/**
 * /components/chart — full documentation data for OrigamChart.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart.interface.ts       (IChartProps)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts  (IChartBaseProps)
 *   - packages/ds/src/components/Chart/OrigamChart.vue          (template, defineEmits, withDefaults)
 *   - packages/ds/tokens/component/chart.json                   (CSS tokens)
 *
 * OrigamChart is the universal entry-point. It routes to type-specific family
 * members (OrigamChartCartesian, OrigamChartPolar, OrigamChartRadar, etc.) via
 * the `type` prop. All 26 .vue files in the Chart folder are listed in `family`.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_DOC: IComponentDoc = {
    slug: 'chart',
    name: 'Chart',
    tag: 'origam-chart',
    icon: 'mdi-chart-line',
    category: 'Data Visualization',
    descriptionKey: 'components.catalog.chart.description',
    descriptionFallback: 'Universal chart component with 29 visualization primitives (line, area, bar, column, pie, donut, scatter, radar, gauge, pyramid, funnel, honeycomb, treemap, sankey, word-cloud, heatmap, sunburst, box-plot, pictorial, candlestick, streamgraph, variwide, polar-bar, bullet, pareto, map, sparkline, spline, stepped-line). The type prop routes to the appropriate family member.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChart',

    family: [
        { slug: 'chart-cartesian', name: 'ChartCartesian', descriptionKey: 'components.catalog.chart_cartesian.description', descriptionFallback: 'Cartesian chart engine: line, area, bar, column, scatter, spline, stepped-line.' },
        { slug: 'chart-polar', name: 'ChartPolar', descriptionKey: 'components.catalog.chart_polar.description', descriptionFallback: 'Polar chart engine: pie, donut.' },
        { slug: 'chart-radar', name: 'ChartRadar', descriptionKey: 'components.catalog.chart_radar.description', descriptionFallback: 'Radar (spider) chart engine.' },
        { slug: 'chart-gauge', name: 'ChartGauge', descriptionKey: 'components.catalog.chart_gauge.description', descriptionFallback: 'Gauge / speedometer chart engine.' },
        { slug: 'chart-pyramid', name: 'ChartPyramid', descriptionKey: 'components.catalog.chart_pyramid.description', descriptionFallback: 'Pyramid and funnel chart engine.' },
        { slug: 'chart-honeycomb', name: 'ChartHoneycomb', descriptionKey: 'components.catalog.chart_honeycomb.description', descriptionFallback: 'Hexagonal honeycomb chart engine.' },
        { slug: 'chart-treemap', name: 'ChartTreemap', descriptionKey: 'components.catalog.chart_treemap.description', descriptionFallback: 'Treemap chart engine.' },
        { slug: 'chart-sankey', name: 'ChartSankey', descriptionKey: 'components.catalog.chart_sankey.description', descriptionFallback: 'Sankey flow diagram engine.' },
        { slug: 'chart-word-cloud', name: 'ChartWordCloud', descriptionKey: 'components.catalog.chart_word_cloud.description', descriptionFallback: 'Word cloud engine.' },
        { slug: 'chart-heatmap', name: 'ChartHeatmap', descriptionKey: 'components.catalog.chart_heatmap.description', descriptionFallback: 'Heatmap matrix engine.' },
        { slug: 'chart-sunburst', name: 'ChartSunburst', descriptionKey: 'components.catalog.chart_sunburst.description', descriptionFallback: 'Sunburst radial tree engine.' },
        { slug: 'chart-box-plot', name: 'ChartBoxPlot', descriptionKey: 'components.catalog.chart_box_plot.description', descriptionFallback: 'Box-and-whisker plot engine.' },
        { slug: 'chart-pictorial', name: 'ChartPictorial', descriptionKey: 'components.catalog.chart_pictorial.description', descriptionFallback: 'Pictorial bar chart (icon-filled bars) engine.' },
        { slug: 'chart-candlestick', name: 'ChartCandlestick', descriptionKey: 'components.catalog.chart_candlestick.description', descriptionFallback: 'OHLC candlestick chart engine.' },
        { slug: 'chart-streamgraph', name: 'ChartStreamgraph', descriptionKey: 'components.catalog.chart_streamgraph.description', descriptionFallback: 'Streamgraph stacked area engine.' },
        { slug: 'chart-variwide', name: 'ChartVariwide', descriptionKey: 'components.catalog.chart_variwide.description', descriptionFallback: 'Variable-width column (Marimekko) engine.' },
        { slug: 'chart-polar-bar', name: 'ChartPolarBar', descriptionKey: 'components.catalog.chart_polar_bar.description', descriptionFallback: 'Polar bar / rose chart engine.' },
        { slug: 'chart-bullet', name: 'ChartBullet', descriptionKey: 'components.catalog.chart_bullet.description', descriptionFallback: 'Bullet chart (target vs. actual) engine.' },
        { slug: 'chart-pareto', name: 'ChartPareto', descriptionKey: 'components.catalog.chart_pareto.description', descriptionFallback: 'Pareto chart (bars + cumulative line) engine.' },
        { slug: 'chart-map', name: 'ChartMap', descriptionKey: 'components.catalog.chart_map.description', descriptionFallback: 'Choropleth / geo map engine.' },
        { slug: 'chart-sparkline', name: 'ChartSparkline', descriptionKey: 'components.catalog.chart_sparkline.description', descriptionFallback: 'Inline mini sparkline engine.' },
        { slug: 'chart-axis', name: 'ChartAxis', descriptionKey: 'components.catalog.chart_axis.description', descriptionFallback: 'Axis and tick rendering sub-component.' },
        { slug: 'chart-legend', name: 'ChartLegend', descriptionKey: 'components.catalog.chart_legend.description', descriptionFallback: 'Legend block sub-component.' },
        { slug: 'chart-tooltip', name: 'ChartTooltip', descriptionKey: 'components.catalog.chart_tooltip.description', descriptionFallback: 'Tooltip overlay sub-component.' },
        { slug: 'chart-range-selector', name: 'ChartRangeSelector', descriptionKey: 'components.catalog.chart_range_selector.description', descriptionFallback: 'Interactive range selector sub-component.' }
    ],

    props: [
        // ── Core ──────────────────────────────────────────────────────
        {
            name: 'type',
            type: { label: 'TChartType', slug: 'chart-type', kind: 'type' },
            defaultValue: "'line'",
            descriptionKey: 'components.chart.props.type.description',
            descriptionFallback: "Visualization primitive. Accepted values: 'line' | 'area' | 'bar' | 'column' | 'pie' | 'donut' | 'scatter' | 'radar' | 'spline' | 'stepped-line' | 'gauge' | 'pyramid' | 'funnel' | 'honeycomb' | 'treemap' | 'sankey' | 'word-cloud' | 'heatmap' | 'sunburst' | 'box-plot' | 'pictorial' | 'candlestick' | 'streamgraph' | 'variwide' | 'polar-bar' | 'bullet' | 'pareto' | 'map' | 'sparkline'."
        },
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            required: true,
            descriptionKey: 'components.chart.props.series.description',
            descriptionFallback: 'Data series array. An empty array renders the #empty slot. Each series contains name, data, color and visible.'
        },
        {
            name: 'categories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart.props.categories.description',
            descriptionFallback: 'X-axis category labels. Length should match the longest series; missing entries fall back to the numeric index.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.title.description',
            descriptionFallback: 'Optional title rendered above the plotting area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        // ── Legend & Tooltip ──────────────────────────────────────────
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart.props.show_legend.description',
            descriptionFallback: 'Toggle the legend block.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: 'chart-legend-position', kind: 'type' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart.props.legend_position.description',
            descriptionFallback: "Anchor of the legend block. Accepted: 'top' | 'bottom' | 'left' | 'right'."
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart.props.show_tooltip.description',
            descriptionFallback: 'Toggle the hover tooltip.'
        },
        // ── Grid & Axes ───────────────────────────────────────────────
        {
            name: 'showGrid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart.props.show_grid.description',
            descriptionFallback: 'Render grid lines behind the plot. Ignored for pie/donut/radar.'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart.props.show_axis.description',
            descriptionFallback: 'Render X/Y axes and tick labels. Ignored for pie/donut.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.x_axis_format.description',
            descriptionFallback: 'Formatter function applied to X-axis tick labels.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.y_axis_format.description',
            descriptionFallback: 'Formatter function applied to Y-axis tick labels.'
        },
        {
            name: 'yMin',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.y_min.description',
            descriptionFallback: 'Override the auto-computed Y minimum.'
        },
        {
            name: 'yMax',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.y_max.description',
            descriptionFallback: 'Override the auto-computed Y maximum.'
        },
        // ── Animation ─────────────────────────────────────────────────
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart.props.animated.description',
            descriptionFallback: 'Animate paths/bars/slices on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart.props.animation_duration.description',
            descriptionFallback: 'Animation duration in ms.'
        },
        // ── Stacking ──────────────────────────────────────────────────
        {
            name: 'stacked',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chart.props.stacked.description',
            descriptionFallback: 'Stack series on bar/column charts.'
        },
        {
            name: 'stacking',
            type: { label: 'TChartStacking', slug: 'chart-stacking', kind: 'type' },
            defaultValue: "'normal'",
            descriptionKey: 'components.chart.props.stacking.description',
            descriptionFallback: "Stacking mode when stacked=true. 'normal' = absolute values, 'percent' = 0-100% normalised."
        },
        // ── Type-specific ─────────────────────────────────────────────
        {
            name: 'donutHoleSize',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.6',
            descriptionKey: 'components.chart.props.donut_hole_size.description',
            descriptionFallback: 'Inner-radius proportion for donut type. 0 = pie, 1 = ring of zero thickness. Default 0.6 when type=donut.'
        },
        {
            name: 'smoothing',
            type: { label: 'TChartSmoothing', slug: 'chart-smoothing', kind: 'type' },
            defaultValue: "'none'",
            descriptionKey: 'components.chart.props.smoothing.description',
            descriptionFallback: "Smoothing strategy for line/area. 'none' = Cartesian segments, 'curve' = cubic Bezier (Catmull-Rom)."
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.aspect_ratio.description',
            descriptionFallback: "CSS aspect-ratio shortcut ('16/9', '4/3', '1/1'…). When set, overrides height."
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart.props.color_scheme.description',
            descriptionFallback: 'Palette cycled when a series has no explicit color. Accepts intent names or raw CSS colours.'
        },
        {
            name: 'gaugeMin',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.chart.props.gauge_min.description',
            descriptionFallback: 'Lower bound of the gauge range. Ignored unless type=gauge.'
        },
        {
            name: 'gaugeMax',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.chart.props.gauge_max.description',
            descriptionFallback: 'Upper bound of the gauge range. Ignored unless type=gauge.'
        },
        {
            name: 'gaugeUnit',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "''",
            descriptionKey: 'components.chart.props.gauge_unit.description',
            descriptionFallback: 'Unit suffix appended to the gauge centre label (e.g. "%").'
        },
        // ── Dimension ─────────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '300',
            descriptionKey: 'components.chart.props.height.description',
            descriptionFallback: 'Chart height in pixels or a CSS length.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.width.description',
            descriptionFallback: 'Explicit width override. Defaults to 100% of the container.'
        },
        // ── Background ────────────────────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart.props.bg_color.description',
            descriptionFallback: 'Background color of the chart container.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart.emits.point_click.description',
            descriptionFallback: 'Mouse or keyboard activation on a data point.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart.emits.legend_click.description',
            descriptionFallback: 'Click on a legend entry. Pair with series-toggle to manage visibility state.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart.emits.series_toggle.description',
            descriptionFallback: 'Resulting visibility flip after a legend click.'
        }
    ],

    slots: [
        {
            slot: 'tooltip',
            slotProps: '{ point: IChartPoint, series: IChartSeries, category: string | number }',
            descriptionKey: 'components.chart.slots.tooltip.description',
            descriptionFallback: 'Replace the default tooltip body with a custom component.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series: IChartSeries, index: number, visible: boolean }',
            descriptionKey: 'components.chart.slots.legend_item.description',
            descriptionFallback: 'Replace one legend entry. Receives series data, its index and current visibility.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart.slots.title.description',
            descriptionFallback: 'Replace the title and subtitle block entirely.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart.slots.empty.description',
            descriptionFallback: 'Rendered when series is empty or every series is hidden.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart.examples.line.title',
            titleFallback: 'Line chart',
            lang: 'vue',
            code: `<template>
  <origam-chart
    type="line"
    :series="[
      { name: 'Sales', data: [120, 230, 180, 300, 250, 400] },
      { name: 'Returns', data: [20, 40, 35, 60, 45, 80] }
    ]"
    :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
    height="300"
  />
</template>`
        },
        {
            titleKey: 'components.chart.examples.donut.title',
            titleFallback: 'Donut chart',
            lang: 'vue',
            code: `<template>
  <origam-chart
    type="donut"
    :series="[
      { name: 'Vue', data: [44] },
      { name: 'React', data: [35] },
      { name: 'Angular', data: [21] }
    ]"
    height="280"
    :donut-hole-size="0.65"
  />
</template>`
        },
        {
            titleKey: 'components.chart.examples.gauge.title',
            titleFallback: 'Gauge chart',
            lang: 'vue',
            code: `<template>
  <origam-chart
    type="gauge"
    :series="[{ name: 'Score', data: [73] }]"
    :gauge-min="0"
    :gauge-max="100"
    gauge-unit="%"
    height="240"
  />
</template>`
        }
    ],

    // previewVariants intentionally absent: OrigamChart requires a `series` array
    // prop (a complex object array) which cannot be expressed in the preview-band's
    // IComponentPreviewVariant.props (Record<string, string|number|boolean>).
    // The playground section below provides an equivalent interactive demo.

    anatomy: {
        rootClass: 'origam-chart',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamChart',
        svgDesc: 'Schematic of the Chart component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="160" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="36" font-size="13" fill="var(--origam-color__text---primary, #1a0f3c)" text-anchor="middle" font-family="sans-serif" font-weight="600">Chart Title</text>
  <line x1="60" y1="40" x2="60" y2="155" stroke="var(--origam-color__border---default, #e5e1f5)" stroke-width="1"/>
  <line x1="60" y1="155" x2="660" y2="155" stroke="var(--origam-color__border---default, #e5e1f5)" stroke-width="1"/>
  <polyline points="100,130 220,90 340,110 460,60 580,80 640,50" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2" fill="none"/>
  <rect x="220" y="170" width="260" height="8" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.08))"/>
  <text x="350" y="178" font-size="8" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Legend</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="40" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="56" y="44" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="60" cy="150" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="60" y="154" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="350" cy="173" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="350" y="177" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="400" cy="80" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="400" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <text x="350" y="210" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Routes to type-specific family member at runtime (cartesian / polar / radar / gauge / …)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chart&gt;</code> — 5 visible regions; the component delegates rendering to the appropriate family member based on the <code>type</code> prop.`,
        legend: [
            { num: 1, cls: '.origam-chart', descriptionKey: 'components.chart.anatomy.root', descriptionFallback: 'Root element. Delegates to the correct family component (cartesian/polar/radar/gauge/pyramid…).' },
            { num: 2, cls: '.origam-chart__title', descriptionKey: 'components.chart.anatomy.title', descriptionFallback: 'Title and subtitle block rendered above the plotting area.' },
            { num: 3, cls: '.origam-chart__axis', descriptionKey: 'components.chart.anatomy.axis', descriptionFallback: 'X and Y axes with tick labels. Rendered by OrigamChartAxis. Hidden when showAxis=false.' },
            { num: 4, cls: '.origam-chart__legend', descriptionKey: 'components.chart.anatomy.legend', descriptionFallback: 'Legend block. Rendered by OrigamChartLegend. Position controlled by legendPosition prop.' },
            { num: 5, cls: '.origam-chart__plot', descriptionKey: 'components.chart.anatomy.plot', descriptionFallback: 'SVG plotting area where series paths, bars or slices are drawn.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamChart routes to a family member per type -->
<origam-chart type="line" :series="series" :categories="categories">
  <!-- optional slot overrides -->
  <template #tooltip="{ point, series, category }">
    <custom-tooltip :point="point" :series="series" />
  </template>
  <template #legend-item="{ series, visible }">
    <custom-legend-entry :series="series" :visible="visible" />
  </template>
  <template #empty>
    <p>No data available.</p>
  </template>
</origam-chart>`,
        classes: [
            { cls: 'origam-chart', descriptionKey: 'components.chart.anatomy.root', descriptionFallback: 'Root element wrapping the SVG plotting area.' },
            { cls: 'origam-chart__title', descriptionKey: 'components.chart.anatomy.title', descriptionFallback: 'Title / subtitle region.' },
            { cls: 'origam-chart__axis', descriptionKey: 'components.chart.anatomy.axis', descriptionFallback: 'Axis tick labels and grid lines.' },
            { cls: 'origam-chart__legend', descriptionKey: 'components.chart.anatomy.legend', descriptionFallback: 'Legend swatch entries.' },
            { cls: 'origam-chart__plot', descriptionKey: 'components.chart.anatomy.plot', descriptionFallback: 'SVG series paths, bars and point markers.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart.css_vars.bg',
            descriptionFallback: 'Chart container background colour.'
        },
        {
            name: '--origam-chart---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.chart.css_vars.color',
            descriptionFallback: 'Default text colour for title, labels and legend.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart.css_vars.padding',
            descriptionFallback: 'Inner padding of the chart container.'
        },
        {
            name: '--origam-chart__title---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.chart.css_vars.title_color',
            descriptionFallback: 'Title text colour.'
        },
        {
            name: '--origam-chart__title---font-size',
            defaultValue: '{font.size.lg}',
            descriptionKey: 'components.chart.css_vars.title_font_size',
            descriptionFallback: 'Title font size.'
        },
        {
            name: '--origam-chart__axis---color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.chart.css_vars.axis_color',
            descriptionFallback: 'Axis line colour.'
        },
        {
            name: '--origam-chart__grid---color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.chart.css_vars.grid_color',
            descriptionFallback: 'Grid line colour.'
        },
        {
            name: '--origam-chart__tooltip---background-color',
            defaultValue: '{color.surface.inverse}',
            descriptionKey: 'components.chart.css_vars.tooltip_bg',
            descriptionFallback: 'Tooltip background colour.'
        },
        {
            name: '--origam-chart__path---stroke-width',
            defaultValue: '2px',
            descriptionKey: 'components.chart.css_vars.path_stroke_width',
            descriptionFallback: 'Stroke width of line/area series paths.'
        },
        {
            name: '--origam-chart__animation---duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart.css_vars.animation_duration',
            descriptionFallback: 'Animation duration for enter/update transitions.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['img', 'figure'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart.a11y.key_tab',
                actionFallback: 'Moves focus to interactive data points (when keyboard navigation is enabled).'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart.a11y.key_activate',
                actionFallback: 'Fires point-click emit on a focused data point.'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart.a11y.reduced_motion',
                noteFallback: 'The animated prop respects prefers-reduced-motion: reduce — set animated=false or let the component detect the system preference.'
            },
            {
                noteKey: 'components.chart.a11y.color_blind',
                noteFallback: 'Use colorScheme to provide intent-based colours with sufficient contrast for all colour-vision deficiency profiles. Avoid relying solely on hue to distinguish series — use dashed/solid patterns or labels when possible.'
            },
            {
                noteKey: 'components.chart.a11y.empty_slot',
                noteFallback: 'The #empty slot provides a meaningful message when no data is available, ensuring screen reader users are not left with a silent chart container.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chart.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'chart.background-color', value: '{color.surface.default}', type: 'color', descriptionKey: 'components.chart.tokens.bg', descriptionFallback: 'Chart container background.' },
            { tokenPath: 'chart.title.font-size', value: '{font.size.lg}', type: 'dimension', descriptionKey: 'components.chart.tokens.title_font_size', descriptionFallback: 'Title font size.' },
            { tokenPath: 'chart.grid.color', value: '{color.border.subtle}', type: 'color', descriptionKey: 'components.chart.tokens.grid_color', descriptionFallback: 'Grid line colour.' },
            { tokenPath: 'chart.tooltip.background-color', value: '{color.surface.inverse}', type: 'color', descriptionKey: 'components.chart.tokens.tooltip_bg', descriptionFallback: 'Tooltip background.' },
            { tokenPath: 'chart.path.stroke-width', value: '2px', type: 'dimension', descriptionKey: 'components.chart.tokens.path_stroke_width', descriptionFallback: 'Line/area stroke width.' },
            { tokenPath: 'chart.animation.duration', value: '600ms', type: 'duration', descriptionKey: 'components.chart.tokens.animation_duration', descriptionFallback: 'Enter/update animation duration.' },
            { tokenPath: 'chart.bar.border-radius', value: '{radius.xs}', type: 'dimension', descriptionKey: 'components.chart.tokens.bar_border_radius', descriptionFallback: 'Bar/column corner radius.' },
            { tokenPath: 'chart.radar.fill-opacity', value: '0.18', type: 'number', descriptionKey: 'components.chart.tokens.radar_fill_opacity', descriptionFallback: 'Radar polygon fill opacity.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'type',
                kind: 'select',
                labelKey: 'components.chart.playground.type',
                labelFallback: 'Chart type',
                defaultValue: 'line',
                options: [
                    { label: 'line', value: 'line' },
                    { label: 'area', value: 'area' },
                    { label: 'bar', value: 'bar' },
                    { label: 'column', value: 'column' },
                    { label: 'pie', value: 'pie' },
                    { label: 'donut', value: 'donut' },
                    { label: 'scatter', value: 'scatter' },
                    { label: 'radar', value: 'radar' },
                    { label: 'gauge', value: 'gauge' }
                ]
            },
            {
                prop: 'showLegend',
                kind: 'switch',
                labelKey: 'components.chart.playground.show_legend',
                labelFallback: 'Show legend',
                defaultValue: true
            },
            {
                prop: 'showGrid',
                kind: 'switch',
                labelKey: 'components.chart.playground.show_grid',
                labelFallback: 'Show grid',
                defaultValue: true
            },
            {
                prop: 'animated',
                kind: 'switch',
                labelKey: 'components.chart.playground.animated',
                labelFallback: 'Animated',
                defaultValue: true
            },
            {
                prop: 'stacked',
                kind: 'switch',
                labelKey: 'components.chart.playground.stacked',
                labelFallback: 'Stacked',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
