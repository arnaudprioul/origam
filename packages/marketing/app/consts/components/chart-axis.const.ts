/**
 * /components/chart-axis — full documentation data for OrigamChartAxis.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-axis.interface.ts  (IChartAxisProps)
 *   - packages/ds/src/components/Chart/OrigamChartAxis.vue      (template BEM)
 *   - packages/ds/tokens/component/chart.json                   (CSS tokens shared)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_AXIS_DOC: IComponentDoc = {
    slug: 'chart-axis',
    name: 'ChartAxis',
    tag: 'origam-chart-axis',
    icon: 'mdi-axis',
    category: 'Data Visualization',
    descriptionKey: 'components.catalog.chart_axis.description',
    descriptionFallback: 'Axis and tick rendering sub-component. Extracts cartesian axis chrome (X+Y axes, grid lines, tick labels) from the chart family so polar/radar/gauge families do not inherit cartesian elements.',
    packageNote: 'origam',
    parentSlug: 'chart',

    family: [
        { slug: 'chart', name: 'Chart', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal chart component with 29 visualization primitives.' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', descriptionKey: 'components.catalog.chart_cartesian.description', descriptionFallback: 'Cartesian chart engine: line, area, bar, column, scatter, spline, stepped-line.' },
        { slug: 'chart-legend', name: 'ChartLegend', descriptionKey: 'components.catalog.chart_legend.description', descriptionFallback: 'Legend block sub-component.' },
        { slug: 'chart-tooltip', name: 'ChartTooltip', descriptionKey: 'components.catalog.chart_tooltip.description', descriptionFallback: 'Tooltip overlay sub-component.' }
    ],

    related: [
        { slug: 'chart', name: 'Chart', kind: 'component', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal entry-point that composes ChartAxis internally.' }
    ],

    props: [
        {
            name: 'plot',
            type: { label: '{ x0, y0, x1, y1, cx, cy: number }', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.chart_axis.props.plot.description',
            descriptionFallback: 'Pixel coordinates of the plotting area\'s four corners plus centre. Comes verbatim from useChart().plot.value.'
        },
        {
            name: 'ticks',
            type: { label: '{ x: IChartTick[], y: IChartTick[] }', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.chart_axis.props.ticks.description',
            descriptionFallback: 'Tick descriptors for X and Y (primary left axis). Comes from useChart().ticks.value.'
        },
        {
            name: 'secondaryYTicks',
            type: { label: 'IChartTick[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_axis.props.secondary_y_ticks.description',
            descriptionFallback: 'Tick descriptors for the secondary right Y axis. When provided, a second vertical axis is rendered on the right edge of the plot area.'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_axis.props.show_axis.description',
            descriptionFallback: 'Render the four-corner axis frame and tick labels. When false, the component renders nothing.'
        },
        {
            name: 'showGrid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_axis.props.show_grid.description',
            descriptionFallback: 'Render horizontal grid lines under the plot area.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_axis.props.x_axis_format.description',
            descriptionFallback: 'Formatter applied to X-axis tick labels. Defaults to String(value).'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_axis.props.y_axis_format.description',
            descriptionFallback: 'Formatter applied to Y-axis tick labels. Defaults to String(value).'
        },
        {
            name: 'secondaryYAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_axis.props.secondary_y_axis_format.description',
            descriptionFallback: 'Formatter applied to the secondary (right) Y-axis tick labels. Falls back to yAxisFormat, then String(value).'
        }
    ],

    emits: [],

    slots: [],

    examples: [
        {
            titleKey: 'components.chart_axis.examples.usage.title',
            titleFallback: 'Usage inside OrigamChartCartesian',
            lang: 'vue',
            code: `<!-- OrigamChartAxis is an internal sub-component.
 It is composed automatically by OrigamChartCartesian. -->
<origam-chart-cartesian
  type="line"
  :series="[{ name: 'Sales', data: [120, 230, 180, 300] }]"
  :categories="['Jan', 'Feb', 'Mar', 'Apr']"
  :show-axis="true"
  :show-grid="true"
  height="300"
/>`
        }
    ],

    // previewVariants absent — sub-component requires pre-computed plot/ticks from useChart.

    anatomy: {
        rootClass: 'origam-chart-axis',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamChartAxis',
        svgDesc: 'Schematic showing X axis, Y axis, grid lines and tick labels.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="60" y="20" width="620" height="160" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <line x1="60" y1="20" x2="60" y2="180" stroke="var(--origam-color__border---default, #a855f7)" stroke-width="1.5"/>
  <line x1="60" y1="180" x2="680" y2="180" stroke="var(--origam-color__border---default, #a855f7)" stroke-width="1.5"/>
  <line x1="60" y1="60" x2="680" y2="60" stroke="var(--origam-color__border---subtle, rgba(124,58,237,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <line x1="60" y1="100" x2="680" y2="100" stroke="var(--origam-color__border---subtle, rgba(124,58,237,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <line x1="60" y1="140" x2="680" y2="140" stroke="var(--origam-color__border---subtle, rgba(124,58,237,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="40" y="64" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="end" font-family="'JetBrains Mono',monospace">300</text>
  <text x="40" y="104" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="end" font-family="'JetBrains Mono',monospace">200</text>
  <text x="40" y="144" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="end" font-family="'JetBrains Mono',monospace">100</text>
  <text x="200" y="196" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Jan</text>
  <text x="370" y="196" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Feb</text>
  <text x="540" y="196" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Mar</text>
  <circle cx="68" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="68" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="68" cy="180" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="68" y="184" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="370" cy="100" r="10" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="370" y="104" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="200" cy="196" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="200" y="200" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chart-axis&gt;</code> — 4 visible regions: Y axis line ①, X axis line ②, horizontal grid lines ③, and tick labels ④.`,
        legend: [
            { num: 1, cls: '.origam-chart-axis__y-axis', descriptionKey: 'components.chart_axis.anatomy.y_axis', descriptionFallback: 'Left vertical axis line. Hidden when showAxis=false.' },
            { num: 2, cls: '.origam-chart-axis__x-axis', descriptionKey: 'components.chart_axis.anatomy.x_axis', descriptionFallback: 'Bottom horizontal axis line. Hidden when showAxis=false.' },
            { num: 3, cls: '.origam-chart-axis__grid', descriptionKey: 'components.chart_axis.anatomy.grid', descriptionFallback: 'Horizontal grid lines aligned with Y-axis ticks. Hidden when showGrid=false.' },
            { num: 4, cls: '.origam-chart-axis__tick-label', descriptionKey: 'components.chart_axis.anatomy.tick_label', descriptionFallback: 'X and Y axis tick labels formatted by xAxisFormat / yAxisFormat.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamChartAxis renders inside the parent chart SVG -->
<g class="origam-chart-axis">
  <!-- horizontal grid lines (one per Y tick) -->
  <line class="origam-chart-axis__grid" />
  <!-- Y axis vertical line -->
  <line class="origam-chart-axis__y-axis" />
  <!-- X axis horizontal line -->
  <line class="origam-chart-axis__x-axis" />
  <!-- tick labels for X and Y -->
  <text class="origam-chart-axis__tick-label" />
</g>`,
        classes: [
            { cls: 'origam-chart-axis', descriptionKey: 'components.chart_axis.anatomy.root', descriptionFallback: 'Root SVG group element wrapping all axis chrome.' },
            { cls: 'origam-chart-axis__y-axis', descriptionKey: 'components.chart_axis.anatomy.y_axis', descriptionFallback: 'Left Y-axis line.' },
            { cls: 'origam-chart-axis__x-axis', descriptionKey: 'components.chart_axis.anatomy.x_axis', descriptionFallback: 'Bottom X-axis line.' },
            { cls: 'origam-chart-axis__grid', descriptionKey: 'components.chart_axis.anatomy.grid', descriptionFallback: 'Horizontal grid lines.' },
            { cls: 'origam-chart-axis__tick-label', descriptionKey: 'components.chart_axis.anatomy.tick_label', descriptionFallback: 'Axis tick label text elements.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart__axis---color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.chart_axis.css_vars.axis_color',
            descriptionFallback: 'Axis line colour.'
        },
        {
            name: '--origam-chart__axis__label---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.chart_axis.css_vars.label_color',
            descriptionFallback: 'Tick label text colour.'
        },
        {
            name: '--origam-chart__axis__label---font-size',
            defaultValue: '{font.size.xs}',
            descriptionKey: 'components.chart_axis.css_vars.label_font_size',
            descriptionFallback: 'Tick label font size.'
        },
        {
            name: '--origam-chart__grid---color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.chart_axis.css_vars.grid_color',
            descriptionFallback: 'Grid line colour.'
        },
        {
            name: '--origam-chart__grid---stroke-width',
            defaultValue: '1px',
            descriptionKey: 'components.chart_axis.css_vars.grid_stroke_width',
            descriptionFallback: 'Grid line stroke width.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['group'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.chart_axis.a11y.decorative',
                noteFallback: 'ChartAxis is a purely decorative SVG sub-component with no interactive elements. Accessibility is handled by the parent chart container (role="img" with aria-label describing the data).'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chart.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. ChartAxis uses shared chart.* tokens.',
        excerpt: [
            { tokenPath: 'chart.axis.color', value: '{color.border.default}', type: 'color', descriptionKey: 'components.chart_axis.tokens.axis_color', descriptionFallback: 'Axis line colour.' },
            { tokenPath: 'chart.axis.label.color', value: '{color.text.secondary}', type: 'color', descriptionKey: 'components.chart_axis.tokens.label_color', descriptionFallback: 'Tick label text colour.' },
            { tokenPath: 'chart.axis.label.font-size', value: '{font.size.xs}', type: 'dimension', descriptionKey: 'components.chart_axis.tokens.label_font_size', descriptionFallback: 'Tick label font size.' },
            { tokenPath: 'chart.grid.color', value: '{color.border.subtle}', type: 'color', descriptionKey: 'components.chart_axis.tokens.grid_color', descriptionFallback: 'Grid line colour.' },
            { tokenPath: 'chart.grid.stroke-width', value: '1px', type: 'dimension', descriptionKey: 'components.chart_axis.tokens.grid_stroke_width', descriptionFallback: 'Grid line stroke width.' }
        ]
    } satisfies IComponentTokens
}
