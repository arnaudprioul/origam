/**
 * /components/chart-box-plot — full documentation data for OrigamChartBoxPlot.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-box-plot.interface.ts  (IChartBoxPlotProps)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts       (IChartBaseProps)
 *   - packages/ds/src/components/Chart/OrigamChartBoxPlot.vue        (template BEM)
 *   - packages/ds/tokens/component/chart.json                        (CSS tokens)
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

export const CHART_BOX_PLOT_DOC: IComponentDoc = {
    slug: 'chart-box-plot',
    name: 'ChartBoxPlot',
    tag: 'origam-chart-box-plot',
    icon: 'mdi-chart-box-outline',
    category: 'Data Visualization',
    descriptionKey: 'components.catalog.chart_box_plot.description',
    descriptionFallback: 'Box-and-whisker plot engine. Renders one box per category showing the five-number statistical summary (min / Q1 / median / Q3 / max) plus optional outlier dots. Accepts pre-aggregated data or raw sample arrays.',
    packageNote: 'origam',
    parentSlug: 'chart',

    family: [
        { slug: 'chart', name: 'Chart', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal chart component with 29 visualization primitives.' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', descriptionKey: 'components.catalog.chart_cartesian.description', descriptionFallback: 'Cartesian chart engine: line, area, bar, column, scatter, spline, stepped-line.' },
        { slug: 'chart-candlestick', name: 'ChartCandlestick', descriptionKey: 'components.catalog.chart_candlestick.description', descriptionFallback: 'OHLC candlestick chart engine.' },
        { slug: 'chart-pareto', name: 'ChartPareto', descriptionKey: 'components.catalog.chart_pareto.description', descriptionFallback: 'Pareto chart (bars + cumulative line) engine.' }
    ],

    related: [
        { slug: 'chart', name: 'Chart', kind: 'component', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal entry-point — pass type="box-plot" to route to this family member.' }
    ],

    props: [
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            required: true,
            descriptionKey: 'components.chart_box_plot.props.series.description',
            descriptionFallback: 'Data series array. Each series data entry must be an IChartBoxPlotDatum (pre-aggregated) or IChartBoxPlotRawDatum (raw samples).'
        },
        {
            name: 'categories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_box_plot.props.categories.description',
            descriptionFallback: 'Explicit category order. When absent the order is inferred from the first occurrence of each category in series[0].data.'
        },
        {
            name: 'boxWidth',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.6',
            descriptionKey: 'components.chart_box_plot.props.box_width.description',
            descriptionFallback: 'Box width as a fraction of the per-category slot width. Range [0, 1].'
        },
        {
            name: 'whiskerCapWidth',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.4',
            descriptionKey: 'components.chart_box_plot.props.whisker_cap_width.description',
            descriptionFallback: 'Whisker cap width as a fraction of the per-category slot width. Range [0, 1].'
        },
        {
            name: 'showOutliers',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_box_plot.props.show_outliers.description',
            descriptionFallback: 'Render outlier dots beyond the whisker fences.'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_box_plot.props.show_axis.description',
            descriptionFallback: 'Render X and Y axes.'
        },
        {
            name: 'showGrid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_box_plot.props.show_grid.description',
            descriptionFallback: 'Render horizontal grid lines.'
        },
        {
            name: 'yMin',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_box_plot.props.y_min.description',
            descriptionFallback: 'Override the auto-computed Y-axis minimum. When absent the component uses min(data) − 10% padding.'
        },
        {
            name: 'yMax',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_box_plot.props.y_max.description',
            descriptionFallback: 'Override the auto-computed Y-axis maximum. When absent the component uses max(data) + 10% padding.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_box_plot.props.x_axis_format.description',
            descriptionFallback: 'Formatter applied to X-axis category labels.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_box_plot.props.y_axis_format.description',
            descriptionFallback: 'Formatter applied to Y-axis tick values.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_box_plot.props.title.description',
            descriptionFallback: 'Optional title rendered above the plotting area.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_box_plot.props.show_legend.description',
            descriptionFallback: 'Toggle the legend block.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_box_plot.props.animated.description',
            descriptionFallback: 'Animate on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '300',
            descriptionKey: 'components.chart_box_plot.props.height.description',
            descriptionFallback: 'Chart height in pixels or a CSS length.'
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_box_plot.props.color_scheme.description',
            descriptionFallback: 'Palette cycled when a series has no explicit color.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_box_plot.emits.point_click.description',
            descriptionFallback: 'Mouse or keyboard activation on a data point (box, whisker or outlier).'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_box_plot.emits.legend_click.description',
            descriptionFallback: 'Click on a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_box_plot.emits.series_toggle.description',
            descriptionFallback: 'Resulting visibility flip after a legend click.'
        }
    ],

    slots: [
        {
            slot: 'tooltip',
            slotProps: '{ point: IChartPoint, series: IChartSeries, category: string | number, box: IChartBoxPlotBox }',
            descriptionKey: 'components.chart_box_plot.slots.tooltip.description',
            descriptionFallback: 'Override the default tooltip card. Receives the full five-number summary plus IQR and outlier count.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series: IChartSeries, index: number, visible: boolean }',
            descriptionKey: 'components.chart_box_plot.slots.legend_item.description',
            descriptionFallback: 'Replace one legend entry.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_box_plot.slots.title.description',
            descriptionFallback: 'Replace the title and subtitle block.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_box_plot.slots.empty.description',
            descriptionFallback: 'Rendered when series is empty or every series is hidden.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_box_plot.examples.basic.title',
            titleFallback: 'Pre-aggregated data',
            lang: 'vue',
            code: `<template>
  <origam-chart-box-plot
    :series="[{
      name: 'Dataset A',
      data: [
        { category: 'Q1', min: 10, q1: 25, median: 40, q3: 60, max: 80 },
        { category: 'Q2', min: 20, q1: 35, median: 50, q3: 70, max: 90 },
        { category: 'Q3', min: 15, q1: 30, median: 45, q3: 65, max: 85 }
      ]
    }]"
    height="300"
  />
</template>`
        }
    ],

    // previewVariants absent — series requires complex IChartBoxPlotDatum objects.

    anatomy: {
        rootClass: 'origam-chart-box-plot',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamChartBoxPlot',
        svgDesc: 'Schematic showing a box, whiskers and outlier dot.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="160" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.2))" stroke-width="1"/>
  <line x1="200" y1="40" x2="200" y2="170" stroke="var(--origam-color__border---default, #d1c4e9)" stroke-width="1"/>
  <line x1="420" y1="40" x2="420" y2="170" stroke="var(--origam-color__border---default, #d1c4e9)" stroke-width="1"/>
  <line x1="200" y1="60" x2="200" y2="80" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <rect x="170" y="80" width="60" height="60" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.15))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <line x1="170" y1="110" x2="230" y2="110" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <line x1="200" y1="140" x2="200" y2="160" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <line x1="185" y1="60" x2="215" y2="60" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <line x1="185" y1="160" x2="215" y2="160" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <circle cx="200" cy="170" r="4" fill="var(--origam-color__feedback--danger---bg, #dc2626)"/>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="200" cy="80" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="200" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="200" cy="110" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="200" y="114" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="200" cy="60" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="200" y="64" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="200" cy="170" r="9" fill="var(--origam-color__feedback--danger---bg, #dc2626)"/>
  <text x="200" y="174" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chart-box-plot&gt;</code> — 5 visual parts per category slot: root ①, IQR box ②, median line ③, whiskers ④, outlier dots ⑤.`,
        legend: [
            { num: 1, cls: '.origam-chart-box-plot', descriptionKey: 'components.chart_box_plot.anatomy.root', descriptionFallback: 'Root SVG element containing all box plots.' },
            { num: 2, cls: '.origam-chart-box-plot__box', descriptionKey: 'components.chart_box_plot.anatomy.box', descriptionFallback: 'IQR rectangle from Q1 to Q3.' },
            { num: 3, cls: '.origam-chart-box-plot__median', descriptionKey: 'components.chart_box_plot.anatomy.median', descriptionFallback: 'Horizontal line at the median (Q2).' },
            { num: 4, cls: '.origam-chart-box-plot__whisker', descriptionKey: 'components.chart_box_plot.anatomy.whisker', descriptionFallback: 'Vertical whisker lines extending from Q1/Q3 to min/max fences, plus cap segments.' },
            { num: 5, cls: '.origam-chart-box-plot__outlier', descriptionKey: 'components.chart_box_plot.anatomy.outlier', descriptionFallback: 'Outlier dot circles rendered when showOutliers=true.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<g class="origam-chart-box-plot">
  <!-- one group per category slot -->
  <g class="origam-chart-box-plot__slot">
    <!-- upper and lower whiskers + caps -->
    <line class="origam-chart-box-plot__whisker" />
    <!-- IQR box (Q1 to Q3) -->
    <rect class="origam-chart-box-plot__box" />
    <!-- median line at Q2 -->
    <line class="origam-chart-box-plot__median" />
    <!-- outlier dots (v-if showOutliers) -->
    <circle class="origam-chart-box-plot__outlier" />
  </g>
</g>`,
        classes: [
            { cls: 'origam-chart-box-plot', descriptionKey: 'components.chart_box_plot.anatomy.root', descriptionFallback: 'Root SVG group.' },
            { cls: 'origam-chart-box-plot__slot', descriptionKey: 'components.chart_box_plot.anatomy.slot', descriptionFallback: 'Per-category slot group.' },
            { cls: 'origam-chart-box-plot__box', descriptionKey: 'components.chart_box_plot.anatomy.box', descriptionFallback: 'IQR box rectangle.' },
            { cls: 'origam-chart-box-plot__median', descriptionKey: 'components.chart_box_plot.anatomy.median', descriptionFallback: 'Median line.' },
            { cls: 'origam-chart-box-plot__whisker', descriptionKey: 'components.chart_box_plot.anatomy.whisker', descriptionFallback: 'Whisker lines and caps.' },
            { cls: 'origam-chart-box-plot__outlier', descriptionKey: 'components.chart_box_plot.anatomy.outlier', descriptionFallback: 'Outlier dot circles.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart_box_plot.css_vars.bg',
            descriptionFallback: 'Chart container background colour.'
        },
        {
            name: '--origam-chart__axis---color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.chart_box_plot.css_vars.axis_color',
            descriptionFallback: 'Axis line colour.'
        },
        {
            name: '--origam-chart__grid---color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.chart_box_plot.css_vars.grid_color',
            descriptionFallback: 'Grid line colour.'
        },
        {
            name: '--origam-chart__animation---duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_box_plot.css_vars.animation_duration',
            descriptionFallback: 'Animation duration for enter/update transitions.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['img'],
        keyboard: [
            { key: 'Tab', actionKey: 'components.chart_box_plot.a11y.key_tab', actionFallback: 'Moves focus to interactive data points.' },
            { key: 'Enter / Space', actionKey: 'components.chart_box_plot.a11y.key_activate', actionFallback: 'Fires point-click emit on the focused data point.' }
        ],
        notes: [
            { noteKey: 'components.chart_box_plot.a11y.reduced_motion', noteFallback: 'The animated prop respects prefers-reduced-motion: reduce.' },
            { noteKey: 'components.chart_box_plot.a11y.empty_slot', noteFallback: 'The #empty slot provides a meaningful message when no data is available.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chart.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. ChartBoxPlot uses shared chart.* tokens.',
        excerpt: [
            { tokenPath: 'chart.background-color', value: '{color.surface.default}', type: 'color', descriptionKey: 'components.chart_box_plot.tokens.bg', descriptionFallback: 'Chart container background.' },
            { tokenPath: 'chart.axis.color', value: '{color.border.default}', type: 'color', descriptionKey: 'components.chart_box_plot.tokens.axis_color', descriptionFallback: 'Axis line colour.' },
            { tokenPath: 'chart.grid.color', value: '{color.border.subtle}', type: 'color', descriptionKey: 'components.chart_box_plot.tokens.grid_color', descriptionFallback: 'Grid line colour.' },
            { tokenPath: 'chart.animation.duration', value: '600ms', type: 'duration', descriptionKey: 'components.chart_box_plot.tokens.animation_duration', descriptionFallback: 'Animation duration.' },
            { tokenPath: 'chart.tooltip.background-color', value: '{color.surface.inverse}', type: 'color', descriptionKey: 'components.chart_box_plot.tokens.tooltip_bg', descriptionFallback: 'Tooltip background.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'showAxis',
                kind: 'switch',
                labelKey: 'components.chart_box_plot.playground.show_axis',
                labelFallback: 'Show axis',
                defaultValue: true
            },
            {
                prop: 'showGrid',
                kind: 'switch',
                labelKey: 'components.chart_box_plot.playground.show_grid',
                labelFallback: 'Show grid',
                defaultValue: true
            },
            {
                prop: 'showOutliers',
                kind: 'switch',
                labelKey: 'components.chart_box_plot.playground.show_outliers',
                labelFallback: 'Show outliers',
                defaultValue: true
            },
            {
                prop: 'showLegend',
                kind: 'switch',
                labelKey: 'components.chart_box_plot.playground.show_legend',
                labelFallback: 'Show legend',
                defaultValue: true
            },
            {
                prop: 'animated',
                kind: 'switch',
                labelKey: 'components.chart_box_plot.playground.animated',
                labelFallback: 'Animated',
                defaultValue: true
            }
        ]
    } satisfies IComponentPlayground
}
