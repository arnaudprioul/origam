/**
 * /components/chart-pareto — full documentation data for OrigamChartPareto.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-pareto.interface.ts  (props / emits / slots)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts    (base props / emits / slots)
 *   - packages/ds/src/components/Chart/OrigamChartPareto.vue      (template BEM, aria-*)
 *   - packages/ds/tokens/component/chart.json                     (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentA11y,
    IComponentCssVar,
    IComponentTokens
} from '~/interfaces/components-catalog.interface'

export const CHART_PARETO_DOC: IComponentDoc = {
    slug: 'chart-pareto',
    name: 'ChartPareto',
    tag: 'origam-chart-pareto',
    icon: 'mdi-chart-bar',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_pareto.description',
    descriptionFallback: 'Pareto chart combining vertical bars sorted descending by value with a cumulative percentage line on a secondary right Y-axis. Ideal for 80/20 rule and root-cause analysis.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-pareto--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartPareto',

    parentSlug: 'chart',

    family: [],

    related: [
        {
            slug: 'chart',
            name: 'Chart',
            kind: 'component',
            descriptionKey: 'components.catalog.chart.description',
            descriptionFallback: 'Universal chart shell — delegates to per-type chart components.'
        },
        {
            slug: 'chart-cartesian',
            name: 'ChartCartesian',
            kind: 'component',
            descriptionKey: 'components.catalog.chart_cartesian.description',
            descriptionFallback: 'Cartesian chart family (bar, column, line, area) sharing axes logic.'
        }
    ],

    props: [
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.chart_pareto.props.series.description',
            descriptionFallback: 'Data series. series[0].data must be an array of IChartParetoDatum ({ category, value }). Auto-sorted descending before rendering.'
        },
        {
            name: 'categories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_pareto.props.categories.description',
            descriptionFallback: 'Optional category labels (fallback when data items lack a category field).'
        },
        {
            name: 'barColor',
            type: { label: 'TIntent | string', slug: 'intent', kind: 'type' },
            defaultValue: "'primary'",
            descriptionKey: 'components.chart_pareto.props.bar_color.description',
            descriptionFallback: 'Colour of all bars. Accepts a TIntent token or a raw CSS colour.'
        },
        {
            name: 'lineColor',
            type: { label: 'TIntent | string', slug: 'intent', kind: 'type' },
            defaultValue: "'danger'",
            descriptionKey: 'components.chart_pareto.props.line_color.description',
            descriptionFallback: 'Colour of the cumulative percentage line.'
        },
        {
            name: 'barGap',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '4',
            descriptionKey: 'components.chart_pareto.props.bar_gap.description',
            descriptionFallback: 'Gap in SVG pixels between adjacent bars.'
        },
        {
            name: 'showLine',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pareto.props.show_line.description',
            descriptionFallback: 'Toggle the cumulative percentage line overlay.'
        },
        {
            name: 'showLabel',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chart_pareto.props.show_label.description',
            descriptionFallback: 'Show a value label above each bar.'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pareto.props.show_axis.description',
            descriptionFallback: 'Render the X (category) and Y (value + %) axes.'
        },
        {
            name: 'showGrid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pareto.props.show_grid.description',
            descriptionFallback: 'Render horizontal grid lines aligned with Y-axis ticks.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pareto.props.x_axis_format.description',
            descriptionFallback: 'Formatter applied to X-axis category tick labels.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pareto.props.y_axis_format.description',
            descriptionFallback: 'Formatter applied to the left Y-axis value tick labels.'
        },
        {
            name: 'cumulativeFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pareto.props.cumulative_format.description',
            descriptionFallback: 'Formatter for the right Y-axis cumulative % ticks. Defaults to rounded integer, e.g. "80%".'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pareto.props.title.description',
            descriptionFallback: 'Optional title rendered above the chart area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pareto.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pareto.props.show_legend.description',
            descriptionFallback: 'Toggle the legend block showing bars and cumulative line entries.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_pareto.props.legend_position.description',
            descriptionFallback: 'Anchor of the legend block: top, bottom, left or right.'
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pareto.props.show_tooltip.description',
            descriptionFallback: 'Toggle the hover tooltip.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pareto.props.animated.description',
            descriptionFallback: 'Animate bars and line on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_pareto.props.animation_duration.description',
            descriptionFallback: 'Animation duration in milliseconds.'
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_pareto.props.color_scheme.description',
            descriptionFallback: 'Palette used when a series does not pin its own colour.'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pareto.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut (e.g. "16/9"). Overrides height when set.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '360',
            descriptionKey: 'components.chart_pareto.props.height.description',
            descriptionFallback: 'Chart wrapper height. Accepts CSS length or number (→ px).'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pareto.props.width.description',
            descriptionFallback: 'Chart wrapper width. Defaults to 100% of its container.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pareto.props.bg_color.description',
            descriptionFallback: 'Background colour of the chart wrapper.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_pareto.emits.point_click.description',
            descriptionFallback: 'Fired on mouse click or keyboard activation (Enter/Space) on a bar.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_pareto.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_pareto.emits.series_toggle.description',
            descriptionFallback: 'Resulting visibility flip after a legend click.'
        }
    ],

    slots: [
        {
            slot: 'tooltip',
            slotProps: '{ point, category, value, formattedValue, share, cumulative, color }',
            descriptionKey: 'components.chart_pareto.slots.tooltip.description',
            descriptionFallback: 'Replace the default tooltip. Receives the full bar descriptor including share and cumulative percentage.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series, index, visible }',
            descriptionKey: 'components.chart_pareto.slots.legend_item.description',
            descriptionFallback: 'Replace one legend entry with custom content.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_pareto.slots.title.description',
            descriptionFallback: 'Replace the default title + subtitle block.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_pareto.slots.empty.description',
            descriptionFallback: 'Rendered when series is empty or all series have no data.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_pareto.examples.basic.title',
            titleFallback: 'Basic Pareto',
            lang: 'vue',
            code: `<template>
  <origam-chart-pareto
    :series="[{
      name: 'Defects',
      data: [
        { category: 'Missing part', value: 120 },
        { category: 'Scratch',      value: 85  },
        { category: 'Wrong color',  value: 60  },
        { category: 'Dent',         value: 40  },
        { category: 'Other',        value: 15  }
      ]
    }]"
    title="Quality — Pareto Analysis"
    bar-color="primary"
    line-color="danger"
  />
</template>`
        },
        {
            titleKey: 'components.chart_pareto.examples.no_line.title',
            titleFallback: 'Bars only (no cumulative line)',
            lang: 'vue',
            code: `<template>
  <origam-chart-pareto
    :series="[{
      name: 'Costs',
      data: [
        { category: 'Labor',    value: 320 },
        { category: 'Material', value: 215 },
        { category: 'Overhead', value: 95  },
        { category: 'Rework',   value: 55  }
      ]
    }]"
    :show-line="false"
    :show-label="true"
    bar-color="success"
  />
</template>`
        }
    ],

    anatomy: {
        rootClass: 'origam-chart-pareto',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamChartPareto',
        svgDesc: 'Schematic of the ChartPareto component with 8 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="16" y="16" width="668" height="224" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="32" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">origam-chart-pareto ①</text>
  <text x="350" y="46" font-size="8.5" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="sans-serif">__header ②</text>
  <rect x="24" y="50" width="660" height="20" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="24" y="76" width="660" height="152" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="40" y="94" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" font-family="'JetBrains Mono',monospace">__body ③</text>
  <rect x="64" y="84" width="8" height="128" fill="var(--origam-color__action--primary---bg, #7c3aed)" rx="1"/>
  <rect x="92" y="104" width="8" height="108" fill="var(--origam-color__action--primary---bg, #7c3aed)" rx="1"/>
  <rect x="120" y="124" width="8" height="88" fill="var(--origam-color__action--primary---bg, #7c3aed)" rx="1"/>
  <rect x="148" y="144" width="8" height="68" fill="var(--origam-color__action--primary---bg, #7c3aed)" rx="1"/>
  <rect x="176" y="172" width="8" height="40" fill="var(--origam-color__action--primary---bg, #7c3aed)" rx="1"/>
  <text x="130" y="96" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__bar ④</text>
  <polyline points="68,84 96,104 124,124 152,144 180,172" stroke="var(--origam-color__feedback--danger---bg, #ef4444)" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="68" cy="84" r="3" fill="var(--origam-color__feedback--danger---bg, #ef4444)"/>
  <circle cx="96" cy="104" r="3" fill="var(--origam-color__feedback--danger---bg, #ef4444)"/>
  <circle cx="124" cy="124" r="3" fill="var(--origam-color__feedback--danger---bg, #ef4444)"/>
  <circle cx="152" cy="144" r="3" fill="var(--origam-color__feedback--danger---bg, #ef4444)"/>
  <circle cx="180" cy="172" r="3" fill="var(--origam-color__feedback--danger---bg, #ef4444)"/>
  <text x="250" y="128" font-size="8" fill="var(--origam-color__feedback--danger---bg, #ef4444)" font-family="'JetBrains Mono',monospace">__line ⑤  __line-dot ⑥</text>
  <line x1="24" y1="228" x2="684" y2="228" stroke="var(--origam-color__border---default, #d1d5db)" stroke-width="1"/>
  <text x="350" y="248" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__axis--x ⑦  |  __axis--y-left  __axis--y-right ⑧</text>
  <rect x="200" y="252" width="300" height="18" rx="2" fill="var(--origam-color__surface---sunken, #f3f4f6)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="350" y="264" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-chart-legend (grid-area: legend)</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-chart-pareto&gt;</code> — 8 internal parts. The SVG occupies <code>__body</code>; bars ④, line ⑤ and dots ⑥ are SVG children. Axes ⑦⑧ flank the plot area.',
        legend: [
            { num: 1, cls: '.origam-chart-pareto', descriptionKey: 'components.chart_pareto.anatomy.root', descriptionFallback: 'Root wrapper. CSS grid: header / body / legend rows.' },
            { num: 2, cls: '.origam-chart-pareto__header', descriptionKey: 'components.chart_pareto.anatomy.header', descriptionFallback: 'Optional title + subtitle block (grid-area: header). Hidden when neither title nor subtitle is set.' },
            { num: 3, cls: '.origam-chart-pareto__body', descriptionKey: 'components.chart_pareto.anatomy.body', descriptionFallback: 'Plot area (grid-area: body). Contains the SVG and the empty-state slot.' },
            { num: 4, cls: '.origam-chart-pareto__bar', descriptionKey: 'components.chart_pareto.anatomy.bar', descriptionFallback: 'One <rect> per datum, sorted descending. Keyboard-focusable (role="button", tabindex="0").' },
            { num: 5, cls: '.origam-chart-pareto__line', descriptionKey: 'components.chart_pareto.anatomy.line', descriptionFallback: 'SVG <path> tracing the cumulative percentage. Conditionally rendered when showLine=true.' },
            { num: 6, cls: '.origam-chart-pareto__line-dot', descriptionKey: 'components.chart_pareto.anatomy.line_dot', descriptionFallback: 'Circle markers on the cumulative line, one per bar centre.' },
            { num: 7, cls: '.origam-chart-pareto__axis--x', descriptionKey: 'components.chart_pareto.anatomy.axis_x', descriptionFallback: 'X-axis line + category tick marks and labels.' },
            { num: 8, cls: '.origam-chart-pareto__axis--y-left / --y-right', descriptionKey: 'components.chart_pareto.anatomy.axis_y', descriptionFallback: 'Left Y-axis (values) and right Y-axis (cumulative %). Conditionally rendered when showLine=true.' }
        ],
        code: `<div class="origam-chart-pareto">
  <div class="origam-chart-pareto__header">
    <slot name="title" />
  </div>
  <div class="origam-chart-pareto__body">
    <svg class="origam-chart-pareto__svg origam-chart__svg" role="img">
      <title />
      <desc />
      <g class="origam-chart-pareto__grid">
        <line class="origam-chart-pareto__grid-line" />
      </g>
      <g class="origam-chart-pareto__axis origam-chart-pareto__axis--y-left" />
      <g class="origam-chart-pareto__axis origam-chart-pareto__axis--y-right" />
      <g class="origam-chart-pareto__axis origam-chart-pareto__axis--x" />
      <g class="origam-chart__series">
        <rect class="origam-chart-pareto__bar" role="button" tabindex="0" />
        <text class="origam-chart-pareto__bar-label" />
      </g>
      <g class="origam-chart-pareto__line-group">
        <path class="origam-chart-pareto__line" />
        <circle class="origam-chart-pareto__line-dot" />
      </g>
    </svg>
    <origam-chart-tooltip />
    <div class="origam-chart-pareto__empty origam-chart__empty">
      <slot name="empty" />
    </div>
  </div>
  <origam-chart-legend />
</div>`,
        classes: [
            { cls: 'origam-chart-pareto', descriptionKey: 'components.chart_pareto.anatomy.root', descriptionFallback: 'Root grid wrapper.' },
            { cls: 'origam-chart-pareto__header', descriptionKey: 'components.chart_pareto.anatomy.header', descriptionFallback: 'Title / subtitle block.' },
            { cls: 'origam-chart-pareto__body', descriptionKey: 'components.chart_pareto.anatomy.body', descriptionFallback: 'Plot area hosting the SVG.' },
            { cls: 'origam-chart-pareto__svg', descriptionKey: 'components.chart_pareto.anatomy.svg', descriptionFallback: 'Responsive SVG — viewBox 640×400, scales via CSS.' },
            { cls: 'origam-chart-pareto__grid-line', descriptionKey: 'components.chart_pareto.anatomy.grid_line', descriptionFallback: 'Horizontal dashed grid line per Y tick.' },
            { cls: 'origam-chart-pareto__axis--y-left', descriptionKey: 'components.chart_pareto.anatomy.axis_y_left', descriptionFallback: 'Left Y-axis (raw values).' },
            { cls: 'origam-chart-pareto__axis--y-right', descriptionKey: 'components.chart_pareto.anatomy.axis_y_right', descriptionFallback: 'Right Y-axis (cumulative %).' },
            { cls: 'origam-chart-pareto__axis--x', descriptionKey: 'components.chart_pareto.anatomy.axis_x_cls', descriptionFallback: 'X-axis (categories).' },
            { cls: 'origam-chart-pareto__bar', descriptionKey: 'components.chart_pareto.anatomy.bar', descriptionFallback: 'One SVG <rect> per sorted datum.' },
            { cls: 'origam-chart-pareto__bar--active', descriptionKey: 'components.chart_pareto.anatomy.bar_active', descriptionFallback: 'Added on hover / keyboard focus.' },
            { cls: 'origam-chart-pareto__bar-label', descriptionKey: 'components.chart_pareto.anatomy.bar_label', descriptionFallback: 'Value label above the bar (showLabel=true).' },
            { cls: 'origam-chart-pareto__line', descriptionKey: 'components.chart_pareto.anatomy.line', descriptionFallback: 'Cumulative percentage path.' },
            { cls: 'origam-chart-pareto__line-dot', descriptionKey: 'components.chart_pareto.anatomy.line_dot', descriptionFallback: 'Circle per bar on the cumulative line.' },
            { cls: 'origam-chart-pareto__empty', descriptionKey: 'components.chart_pareto.anatomy.empty', descriptionFallback: 'Empty-state overlay (no data).' }
        ]
    },

    cssVars: [
        {
            name: '--origam-chart---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart_pareto.css_vars.background_color',
            descriptionFallback: 'Background colour of the chart wrapper.'
        },
        {
            name: '--origam-chart---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.chart_pareto.css_vars.color',
            descriptionFallback: 'Default text colour (inherited by axis labels).'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_pareto.css_vars.padding',
            descriptionFallback: 'Inner padding of the root wrapper.'
        },
        {
            name: '--origam-chart---gap',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_pareto.css_vars.gap',
            descriptionFallback: 'Grid gap between header / body / legend rows.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_pareto.css_vars.animation_duration',
            descriptionFallback: 'Duration of bar grow and line-draw animations. Set via animationDuration prop.'
        },
        {
            name: '--origam-chart-pareto__grid---stroke',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.chart_pareto.css_vars.grid_stroke',
            descriptionFallback: 'Stroke colour of horizontal grid lines.'
        },
        {
            name: '--origam-chart-pareto__axis---stroke',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.chart_pareto.css_vars.axis_stroke',
            descriptionFallback: 'Stroke colour of axis lines and tick marks.'
        },
        {
            name: '--origam-chart-pareto__tick-label---font-size',
            defaultValue: '0.6875rem',
            descriptionKey: 'components.chart_pareto.css_vars.tick_label_font_size',
            descriptionFallback: 'Font size of X/Y axis tick labels.'
        },
        {
            name: '--origam-chart-pareto__bar---stroke-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart_pareto.css_vars.bar_stroke_color',
            descriptionFallback: 'Stroke colour drawn between adjacent bars (typically the background).'
        },
        {
            name: '--origam-chart-pareto__line---stroke-width',
            defaultValue: '2',
            descriptionKey: 'components.chart_pareto.css_vars.line_stroke_width',
            descriptionFallback: 'Stroke width of the cumulative percentage line.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_pareto.a11y.key_tab',
                actionFallback: 'Moves focus between focusable bars (tabindex="0" on each <rect>).'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_pareto.a11y.key_activate',
                actionFallback: 'Activates the focused bar (fires point-click).'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_pareto.a11y.root_figure',
                noteFallback: 'Root div carries role="figure" and aria-label from the title prop (or "Pareto chart" as fallback).'
            },
            {
                noteKey: 'components.chart_pareto.a11y.svg_img',
                noteFallback: 'Inner SVG has role="img" with a <title> and <desc> element summarising the data count.'
            },
            {
                noteKey: 'components.chart_pareto.a11y.bar_label',
                noteFallback: 'Each bar <rect> has aria-label describing its category, value, share (%) and cumulative (%).'
            },
            {
                noteKey: 'components.chart_pareto.a11y.reduced_motion',
                noteFallback: 'All CSS animations are disabled under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chart.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'chart.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.chart_pareto.tokens.background_color',
                descriptionFallback: 'Chart wrapper background.'
            },
            {
                tokenPath: 'chart.tooltip.background-color',
                value: '{color.surface.inverse}',
                type: 'color',
                descriptionKey: 'components.chart_pareto.tokens.tooltip_bg',
                descriptionFallback: 'Tooltip background colour.'
            },
            {
                tokenPath: 'chart.axis.color',
                value: '{color.border.default}',
                type: 'color',
                descriptionKey: 'components.chart_pareto.tokens.axis_color',
                descriptionFallback: 'Axis line and tick mark colour.'
            },
            {
                tokenPath: 'chart.grid.color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.chart_pareto.tokens.grid_color',
                descriptionFallback: 'Grid line stroke colour.'
            },
            {
                tokenPath: 'chart.legend.gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.chart_pareto.tokens.legend_gap',
                descriptionFallback: 'Gap between legend items.'
            }
        ]
    } satisfies IComponentTokens
}
