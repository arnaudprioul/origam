/**
 * /components/chart-cartesian — full documentation data for OrigamChartCartesian.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-cartesian.interface.ts  (IChartCartesianProps, emits, slots)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts        (IChartBaseProps)
 *   - packages/ds/src/components/Chart/OrigamChartCartesian.vue       (template BEM, SCSS)
 *   - packages/ds/tokens/component/chart.json                         (shared CSS tokens)
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

export const CHART_CARTESIAN_DOC: IComponentDoc = {
    slug: 'chart-cartesian',
    name: 'ChartCartesian',
    tag: 'origam-chart-cartesian',
    icon: 'mdi-chart-line',
    category: 'Data Visualization',
    descriptionKey: 'components.catalog.chart_cartesian.description',
    descriptionFallback: 'Cartesian chart engine with X+Y plotting area. Supports line, area, bar, column, scatter, spline and stepped-line topologies. Includes stacking, drilldown, zoom/pan, secondary Y-axis, plot bands, plot lines and annotations.',
    packageNote: 'origam',
    parentSlug: 'chart',
    storyUrl: 'http://localhost:6006/?story=components-chart-cartesian--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartCartesian',

    family: [
        { slug: 'chart', name: 'Chart', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal chart component with 29 visualization primitives.' },
        { slug: 'chart-candlestick', name: 'ChartCandlestick', descriptionKey: 'components.catalog.chart_candlestick.description', descriptionFallback: 'OHLC candlestick chart engine.' },
        { slug: 'chart-pareto', name: 'ChartPareto', descriptionKey: 'components.catalog.chart_pareto.description', descriptionFallback: 'Pareto chart (bars + cumulative line) engine.' },
        { slug: 'chart-axis', name: 'ChartAxis', descriptionKey: 'components.catalog.chart_axis.description', descriptionFallback: 'Axis and tick rendering sub-component.' },
        { slug: 'chart-legend', name: 'ChartLegend', descriptionKey: 'components.catalog.chart_legend.description', descriptionFallback: 'Legend block sub-component.' }
    ],

    related: [
        { slug: 'chart', name: 'Chart', kind: 'component', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal entry-point that routes to ChartCartesian for cartesian types.' }
    ],

    props: [
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            required: true,
            descriptionKey: 'components.chart_cartesian.props.series.description',
            descriptionFallback: 'Data series. Each entry may override type (mix-chart) and yAxis (0=left, 1=right secondary axis).'
        },
        {
            name: 'categories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_cartesian.props.categories.description',
            descriptionFallback: 'X-axis labels. Length should match the longest series; missing entries fall back to the numeric index.'
        },
        {
            name: 'type',
            type: { label: 'TChartCartesianKind', slug: 'chart-cartesian-kind', kind: 'type' },
            defaultValue: "'line'",
            descriptionKey: 'components.chart_cartesian.props.type.description',
            descriptionFallback: "Cartesian visualisation primitive: 'line' | 'area' | 'bar' | 'column' | 'scatter' | 'spline' | 'stepped-line'."
        },
        {
            name: 'stacked',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chart_cartesian.props.stacked.description',
            descriptionFallback: 'Stack series on top of each other. Applies to bar, column, and area charts.'
        },
        {
            name: 'stacking',
            type: { label: 'TChartStacking', slug: 'chart-stacking', kind: 'type' },
            defaultValue: "'normal'",
            descriptionKey: 'components.chart_cartesian.props.stacking.description',
            descriptionFallback: "Stacking mode: 'normal' (absolute values) or 'percent' (normalised to 100%)."
        },
        {
            name: 'smoothing',
            type: { label: 'TChartSmoothing', slug: 'chart-smoothing', kind: 'type' },
            defaultValue: "'none'",
            descriptionKey: 'components.chart_cartesian.props.smoothing.description',
            descriptionFallback: "Smoothing strategy for line/area/spline. 'none' for line/area, 'monotone' for spline."
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_cartesian.props.title.description',
            descriptionFallback: 'Optional chart title rendered above the plotting area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_cartesian.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_cartesian.props.show_legend.description',
            descriptionFallback: 'Toggle the legend block.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: 'chart-legend-position', kind: 'type' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_cartesian.props.legend_position.description',
            descriptionFallback: 'Anchor of the legend block: top, bottom, left, right.'
        },
        {
            name: 'showGrid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_cartesian.props.show_grid.description',
            descriptionFallback: 'Render grid lines behind the plot.'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_cartesian.props.show_axis.description',
            descriptionFallback: 'Render X and Y axes with tick labels.'
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_cartesian.props.show_tooltip.description',
            descriptionFallback: 'Toggle the hover tooltip.'
        },
        {
            name: 'yMin',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_cartesian.props.y_min.description',
            descriptionFallback: 'Override the auto-computed Y-axis minimum.'
        },
        {
            name: 'yMax',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_cartesian.props.y_max.description',
            descriptionFallback: 'Override the auto-computed Y-axis maximum.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_cartesian.props.x_axis_format.description',
            descriptionFallback: 'Formatter applied to X-axis tick labels.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_cartesian.props.y_axis_format.description',
            descriptionFallback: 'Formatter applied to Y-axis tick labels.'
        },
        {
            name: 'zoomable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chart_cartesian.props.zoomable.description',
            descriptionFallback: 'Enable zoom/pan interactions. Mouse-drag zooms; shift+scroll zooms; ctrl+drag pans. A reset button appears when zoomed.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_cartesian.props.animated.description',
            descriptionFallback: 'Animate series on first paint and data changes. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_cartesian.props.animation_duration.description',
            descriptionFallback: 'Animation duration in milliseconds.'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_cartesian.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut (e.g. "16/9"). When set, overrides height.'
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_cartesian.props.color_scheme.description',
            descriptionFallback: 'Palette used when a series does not pin its own color.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_cartesian.emits.point_click.description',
            descriptionFallback: 'Fired on mouse click or keyboard activation on a data point.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_cartesian.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_cartesian.emits.series_toggle.description',
            descriptionFallback: 'Resulting visibility flip after a legend click.'
        },
        {
            event: 'drill',
            payload: { label: 'IChartDrilldownLink, IChartPoint', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_cartesian.emits.drill.description',
            descriptionFallback: 'Fired when the user drills into a sub-dataset via a drilldown-linked point.'
        },
        {
            event: 'drill-up',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_cartesian.emits.drill_up.description',
            descriptionFallback: 'Fired when the user navigates back one drilldown level.'
        },
        {
            event: 'zoom',
            payload: { label: '{ start: number, end: number }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_cartesian.emits.zoom.description',
            descriptionFallback: 'Fired on every committed zoom. start and end are category indices (inclusive).'
        },
        {
            event: 'reset-zoom',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_cartesian.emits.reset_zoom.description',
            descriptionFallback: 'Fired when the user resets the zoom to the full data range.'
        }
    ],

    slots: [
        {
            slot: 'tooltip',
            slotProps: '{ point, series, category }',
            descriptionKey: 'components.chart_cartesian.slots.tooltip.description',
            descriptionFallback: 'Replace the default tooltip body.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series, index, visible }',
            descriptionKey: 'components.chart_cartesian.slots.legend_item.description',
            descriptionFallback: 'Replace one legend entry.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_cartesian.slots.title.description',
            descriptionFallback: 'Replace the title block (title + subtitle).'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_cartesian.slots.empty.description',
            descriptionFallback: 'Rendered when series is empty or has no renderable data.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_cartesian.examples.line.title',
            titleFallback: 'Line chart',
            lang: 'vue',
            code: `<template>
  <origam-chart-cartesian
    type="line"
    :categories="['Jan', 'Feb', 'Mar', 'Apr']"
    :series="[
      { name: 'Sales', data: [120, 145, 98, 167], color: 'primary' },
      { name: 'Costs', data: [80,  90,  75, 110], color: 'danger' }
    ]"
    title="Monthly performance"
  />
</template>`
        },
        {
            titleKey: 'components.chart_cartesian.examples.stacked_column.title',
            titleFallback: 'Stacked column chart',
            lang: 'vue',
            code: `<template>
  <origam-chart-cartesian
    type="column"
    :stacked="true"
    :categories="['Q1', 'Q2', 'Q3', 'Q4']"
    :series="[
      { name: 'Product A', data: [42, 55, 61, 73] },
      { name: 'Product B', data: [28, 31, 44, 50] }
    ]"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-chart-cartesian',
        svgViewBox: '0 0 640 240',
        svgTitle: 'Anatomy of OrigamChartCartesian',
        svgDesc: 'Schematic of the cartesian chart component with numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="640" height="240" fill="var(--origam-color__surface---sunken,#fbf5ff)" rx="4"/>
  <rect x="16" y="10" width="608" height="36" rx="3" fill="var(--origam-color__surface---raised,#fff)" stroke="var(--origam-color__border---default,rgba(124,58,237,0.3))" stroke-width="1"/>
  <circle cx="24" cy="28" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="24" y="32" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <text x="40" y="32" font-size="10" fill="var(--origam-color__text---primary,#1e1b4b)" font-family="sans-serif">Chart title / subtitle</text>
  <rect x="16" y="54" width="608" height="148" rx="3" fill="var(--origam-color__surface---raised,#fff)" stroke="var(--origam-color__border---default,rgba(124,58,237,0.2))" stroke-width="1"/>
  <circle cx="24" cy="62" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="24" y="66" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="60" y1="68" x2="60" y2="186" stroke="var(--origam-color__border---subtle,#e5e7eb)" stroke-width="1"/>
  <line x1="60" y1="186" x2="580" y2="186" stroke="var(--origam-color__border---subtle,#e5e7eb)" stroke-width="1"/>
  <circle cx="32" cy="130" r="8" fill="var(--origam-color__action--primary---bg,#a855f7)"/>
  <text x="32" y="134" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <polyline points="80,160 160,110 240,140 320,85 400,120 480,75 560,95" fill="none" stroke="var(--origam-color__action--primary---bg,#7c3aed)" stroke-width="2"/>
  <circle cx="260" cy="72" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="260" y="76" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <rect x="16" y="210" width="608" height="24" rx="3" fill="var(--origam-color__surface---raised,#fff)" stroke="var(--origam-color__border---default,rgba(124,58,237,0.2))" stroke-width="1"/>
  <circle cx="24" cy="222" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="24" y="226" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <rect x="36" y="216" width="10" height="10" rx="2" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="52" y="225" font-size="8" fill="var(--origam-color__text---primary,#1e1b4b)" font-family="sans-serif">Legend</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-chart-cartesian&gt;</code> — 5 internal parts.',
        legend: [
            { num: 1, cls: '.origam-chart-cartesian__header', descriptionKey: 'components.chart_cartesian.anatomy.header', descriptionFallback: 'Header block. Contains title and subtitle divs.' },
            { num: 2, cls: '.origam-chart-cartesian__body', descriptionKey: 'components.chart_cartesian.anatomy.body', descriptionFallback: 'Body container. Wraps the SVG, drilldown breadcrumb and zoom controls.' },
            { num: 3, cls: '.origam-chart-cartesian__axis', descriptionKey: 'components.chart_cartesian.anatomy.axis', descriptionFallback: '<g> element holding all axis tick labels and grid lines.' },
            { num: 4, cls: '.origam-chart__series', descriptionKey: 'components.chart_cartesian.anatomy.series', descriptionFallback: '<g> container for series path, area fill, or bar/column rects.' },
            { num: 5, cls: '.origam-chart__legend (via OrigamChartLegend)', descriptionKey: 'components.chart_cartesian.anatomy.legend', descriptionFallback: 'Legend list rendered by OrigamChartLegend. grid-area: legend.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-chart-cartesian">
  <div class="origam-chart-cartesian__header">
    <div class="origam-chart-cartesian__title">…</div>
  </div>
  <origam-chart-range-selector v-if="hasRangeSelector" />
  <nav class="origam-chart-cartesian__breadcrumb" v-if="isDrilled" />
  <div class="origam-chart-cartesian__body">
    <svg class="origam-chart-cartesian__svg origam-chart__svg">
      <g class="origam-chart-cartesian__grid" />
      <g class="origam-chart-cartesian__axis" />
      <g class="origam-chart__series" />
      <g class="origam-chart-cartesian__zoom-rect" v-if="zoomable" />
    </svg>
    <origam-chart-tooltip />
    <div class="origam-chart-cartesian__empty" />
  </div>
  <origam-chart-legend />
</div>`,
        rootClass: 'origam-chart-cartesian',
        classes: [
            { cls: 'origam-chart-cartesian', descriptionKey: 'components.chart_cartesian.anatomy.root', descriptionFallback: 'Root grid container. Layout switches per legend position.' },
            { cls: 'origam-chart-cartesian__header', descriptionKey: 'components.chart_cartesian.anatomy.header', descriptionFallback: 'Title + subtitle header.' },
            { cls: 'origam-chart-cartesian__body', descriptionKey: 'components.chart_cartesian.anatomy.body', descriptionFallback: 'Body flex container holding the SVG and overlays.' },
            { cls: 'origam-chart-cartesian__svg', descriptionKey: 'components.chart_cartesian.anatomy.svg', descriptionFallback: 'SVG element. Fixed viewBox scaled via CSS.' },
            { cls: 'origam-chart-cartesian__empty', descriptionKey: 'components.chart_cartesian.anatomy.empty', descriptionFallback: 'Empty state overlay when series has no renderable data.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart_cartesian.css_vars.background_color',
            descriptionFallback: 'Chart root background colour.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_cartesian.css_vars.padding',
            descriptionFallback: 'Inner padding of the chart root.'
        },
        {
            name: '--origam-chart---gap',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_cartesian.css_vars.gap',
            descriptionFallback: 'Gap between header, body and legend areas.'
        },
        {
            name: '--origam-chart__grid---stroke-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.chart_cartesian.css_vars.grid_stroke_color',
            descriptionFallback: 'Grid line stroke colour.'
        },
        {
            name: '--origam-chart__tooltip---background-color',
            defaultValue: '{color.surface.inverse}',
            descriptionKey: 'components.chart_cartesian.css_vars.tooltip_bg',
            descriptionFallback: 'Tooltip background colour.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img'],
        keyboard: [
            { key: 'Tab', actionKey: 'components.chart_cartesian.a11y.key_tab', actionFallback: 'Moves focus between interactive data points and legend entries.' },
            { key: 'Enter / Space', actionKey: 'components.chart_cartesian.a11y.key_activate', actionFallback: 'Activates the focused data point and fires point-click.' }
        ],
        notes: [
            { noteKey: 'components.chart_cartesian.a11y.root_note', noteFallback: 'Root element has role="figure" with aria-label set to the title prop.' },
            { noteKey: 'components.chart_cartesian.a11y.svg_note', noteFallback: 'SVG has role="img" with <title> and <desc> elements.' },
            { noteKey: 'components.chart_cartesian.a11y.reduced_motion_note', noteFallback: 'All animations are disabled under prefers-reduced-motion: reduce.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chart.json',
        pipelineNote: 'Shares the chart.json token file. Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'chart.background-color', value: '{color.surface.default}', type: 'color', descriptionKey: 'components.chart_cartesian.tokens.background_color', descriptionFallback: 'Root chart background.' },
            { tokenPath: 'chart.padding', value: '{space.3}', type: 'dimension', descriptionKey: 'components.chart_cartesian.tokens.padding', descriptionFallback: 'Chart inner padding.' },
            { tokenPath: 'chart.grid.color', value: '{color.border.subtle}', type: 'color', descriptionKey: 'components.chart_cartesian.tokens.grid_color', descriptionFallback: 'Grid line colour.' },
            { tokenPath: 'chart.axis.label.color', value: '{color.text.secondary}', type: 'color', descriptionKey: 'components.chart_cartesian.tokens.axis_label_color', descriptionFallback: 'Axis tick label colour.' },
            { tokenPath: 'chart.tooltip.background-color', value: '{color.surface.inverse}', type: 'color', descriptionKey: 'components.chart_cartesian.tokens.tooltip_bg', descriptionFallback: 'Tooltip background.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'type',
                kind: 'select',
                labelKey: 'components.chart_cartesian.playground.type',
                labelFallback: 'Chart type',
                defaultValue: 'line',
                options: [
                    { label: 'line', value: 'line' },
                    { label: 'area', value: 'area' },
                    { label: 'bar', value: 'bar' },
                    { label: 'column', value: 'column' },
                    { label: 'scatter', value: 'scatter' },
                    { label: 'spline', value: 'spline' },
                    { label: 'stepped-line', value: 'stepped-line' }
                ]
            },
            {
                prop: 'stacked',
                kind: 'switch',
                labelKey: 'components.chart_cartesian.playground.stacked',
                labelFallback: 'Stacked',
                defaultValue: false
            },
            {
                prop: 'showGrid',
                kind: 'switch',
                labelKey: 'components.chart_cartesian.playground.show_grid',
                labelFallback: 'Show grid',
                defaultValue: true
            },
            {
                prop: 'showLegend',
                kind: 'switch',
                labelKey: 'components.chart_cartesian.playground.show_legend',
                labelFallback: 'Show legend',
                defaultValue: true
            },
            {
                prop: 'animated',
                kind: 'switch',
                labelKey: 'components.chart_cartesian.playground.animated',
                labelFallback: 'Animated',
                defaultValue: true
            },
            {
                prop: 'zoomable',
                kind: 'switch',
                labelKey: 'components.chart_cartesian.playground.zoomable',
                labelFallback: 'Zoomable',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
