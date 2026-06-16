/**
 * /components/chart-candlestick — full documentation data for OrigamChartCandlestick.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-candlestick.interface.ts  (IChartCandlestickProps, emits, slots)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts          (IChartBaseProps)
 *   - packages/ds/src/components/Chart/OrigamChartCandlestick.vue       (template BEM, SCSS)
 *   - packages/ds/tokens/component/chart.json                           (shared CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_CANDLESTICK_DOC: IComponentDoc = {
    slug: 'chart-candlestick',
    name: 'ChartCandlestick',
    tag: 'origam-chart-candlestick',
    icon: 'mdi-candlestick',
    category: 'Data Visualization',
    descriptionKey: 'components.catalog.chart_candlestick.description',
    descriptionFallback: 'OHLC candlestick chart engine. Renders one candle per datum — a rectangular body between open and close plus a thin wick from low to high. Bullish (close ≥ open) and bearish candles use distinct intent colours.',
    packageNote: 'origam',
    parentSlug: 'chart',
    storyUrl: 'http://localhost:6006/?story=components-chart-candlestick--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartCandlestick',

    family: [
        { slug: 'chart', name: 'Chart', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal chart component with 29 visualization primitives.' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', descriptionKey: 'components.catalog.chart_cartesian.description', descriptionFallback: 'Cartesian chart engine: line, area, bar, column, scatter, spline, stepped-line.' },
        { slug: 'chart-legend', name: 'ChartLegend', descriptionKey: 'components.catalog.chart_legend.description', descriptionFallback: 'Legend block sub-component.' },
        { slug: 'chart-pareto', name: 'ChartPareto', descriptionKey: 'components.catalog.chart_pareto.description', descriptionFallback: 'Pareto chart (bars + cumulative line) engine.' }
    ],

    related: [
        { slug: 'chart', name: 'Chart', kind: 'component', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal entry-point that routes to ChartCandlestick when type="candlestick".' }
    ],

    props: [
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            required: true,
            descriptionKey: 'components.chart_candlestick.props.series.description',
            descriptionFallback: 'Data series. series[0].data must be an array of { date, open, high, low, close } objects. Extra series are ignored.'
        },
        {
            name: 'height',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '400',
            descriptionKey: 'components.chart_candlestick.props.height.description',
            descriptionFallback: 'Chart height. Accepts a number (px) or any CSS length. Overridden by aspectRatio when set.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_candlestick.props.title.description',
            descriptionFallback: 'Optional chart title rendered above the plotting area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_candlestick.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'bullishColor',
            type: { label: 'TIntent | string', slug: 'intent', kind: 'type' },
            defaultValue: "'success'",
            descriptionKey: 'components.chart_candlestick.props.bullish_color.description',
            descriptionFallback: 'Fill colour for bullish candles (close ≥ open). Accepts a TIntent token or any CSS colour.'
        },
        {
            name: 'bearishColor',
            type: { label: 'TIntent | string', slug: 'intent', kind: 'type' },
            defaultValue: "'danger'",
            descriptionKey: 'components.chart_candlestick.props.bearish_color.description',
            descriptionFallback: 'Fill colour for bearish candles (close < open). Accepts a TIntent token or any CSS colour.'
        },
        {
            name: 'candleWidth',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.6',
            descriptionKey: 'components.chart_candlestick.props.candle_width.description',
            descriptionFallback: 'Fraction of the per-slot width occupied by the candle body. Range 0–1.'
        },
        {
            name: 'wickWidth',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.chart_candlestick.props.wick_width.description',
            descriptionFallback: 'Wick stroke width in SVG user-units.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chart_candlestick.props.show_legend.description',
            descriptionFallback: 'Toggle the legend. Defaults to false — candlestick charts rarely need a legend.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: 'chart-legend-position', kind: 'type' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_candlestick.props.legend_position.description',
            descriptionFallback: 'Anchor of the legend block: top, bottom, left, right.'
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_candlestick.props.show_tooltip.description',
            descriptionFallback: 'Toggle the hover tooltip.'
        },
        {
            name: 'showGrid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_candlestick.props.show_grid.description',
            descriptionFallback: 'Render background grid lines.'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_candlestick.props.show_axis.description',
            descriptionFallback: 'Render X and Y axes with tick labels.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_candlestick.props.animated.description',
            descriptionFallback: 'Animate candles on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_candlestick.props.animation_duration.description',
            descriptionFallback: 'Animation duration in milliseconds.'
        },
        {
            name: 'yMin',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_candlestick.props.y_min.description',
            descriptionFallback: 'Override the auto-computed Y-axis minimum. When omitted, derived from min(low) with 5% padding.'
        },
        {
            name: 'yMax',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_candlestick.props.y_max.description',
            descriptionFallback: 'Override the auto-computed Y-axis maximum. When omitted, derived from max(high) with 5% padding.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_candlestick.props.x_axis_format.description',
            descriptionFallback: 'Formatter applied to X-axis (date) tick labels.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_candlestick.props.y_axis_format.description',
            descriptionFallback: 'Formatter applied to Y-axis (price) tick labels.'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_candlestick.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut (e.g. "16/9"). When set, overrides height.'
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_candlestick.props.color_scheme.description',
            descriptionFallback: 'Palette used when a series does not pin its own color. Cycles through the 8 origam intents by default.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_candlestick.emits.point_click.description',
            descriptionFallback: 'Fired on mouse click or Enter/Space on a candle.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_candlestick.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_candlestick.emits.series_toggle.description',
            descriptionFallback: 'Resulting visibility flip after a legend click.'
        }
    ],

    slots: [
        {
            slot: 'tooltip',
            slotProps: '{ point, series, category, datum, change, changePct, isBullish }',
            descriptionKey: 'components.chart_candlestick.slots.tooltip.description',
            descriptionFallback: 'Replace the default tooltip card. Receives full OHLC datum, change and direction for custom rendering.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series, index, visible }',
            descriptionKey: 'components.chart_candlestick.slots.legend_item.description',
            descriptionFallback: 'Replace one legend entry.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_candlestick.slots.title.description',
            descriptionFallback: 'Replace the title block (title + subtitle).'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_candlestick.slots.empty.description',
            descriptionFallback: 'Rendered when series is empty or contains no valid OHLC data.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_candlestick.examples.basic.title',
            titleFallback: 'Basic candlestick chart',
            lang: 'vue',
            code: `<template>
  <origam-chart-candlestick
    :series="[{
      name: 'AAPL',
      data: [
        { date: 'Jan', open: 150, high: 162, low: 148, close: 158 },
        { date: 'Feb', open: 158, high: 165, low: 152, close: 153 },
        { date: 'Mar', open: 153, high: 170, low: 150, close: 168 }
      ]
    }]"
    title="AAPL Stock"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-chart-candlestick',
        svgViewBox: '0 0 640 260',
        svgTitle: 'Anatomy of OrigamChartCandlestick',
        svgDesc: 'Schematic of the candlestick chart component with numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="640" height="260" fill="var(--origam-color__surface---sunken,#fbf5ff)" rx="4"/>
  <rect x="16" y="12" width="608" height="40" rx="3" fill="var(--origam-color__surface---raised,#fff)" stroke="var(--origam-color__border---default,rgba(124,58,237,0.3))" stroke-width="1"/>
  <text x="32" y="36" font-size="11" fill="var(--origam-color__text---primary,#1e1b4b)" font-family="sans-serif">Chart title</text>
  <circle cx="24" cy="30" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="24" y="34" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="16" y="60" width="608" height="148" rx="3" fill="var(--origam-color__surface---raised,#fff)" stroke="var(--origam-color__border---default,rgba(124,58,237,0.2))" stroke-width="1"/>
  <circle cx="24" cy="68" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="24" y="72" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="60" y1="72" x2="60" y2="196" stroke="var(--origam-color__border---subtle,#e5e7eb)" stroke-width="1" stroke-dasharray="3 2"/>
  <line x1="60" y1="196" x2="580" y2="196" stroke="var(--origam-color__border---subtle,#e5e7eb)" stroke-width="1"/>
  <circle cx="32" cy="140" r="8" fill="var(--origam-color__action--primary---bg,#a855f7)"/>
  <text x="32" y="144" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="130" y1="82" x2="130" y2="110" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="120" y="110" width="20" height="32" fill="#22c55e"/>
  <line x1="130" y1="142" x2="130" y2="168" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="220" y1="92" x2="220" y2="118" stroke="#ef4444" stroke-width="1.5"/>
  <rect x="210" y="118" width="20" height="38" fill="#ef4444"/>
  <line x1="220" y1="156" x2="220" y2="178" stroke="#ef4444" stroke-width="1.5"/>
  <circle cx="178" cy="108" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="178" y="112" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="260" cy="80" r="8" fill="var(--origam-color__action--primary---bg,#a855f7)"/>
  <text x="260" y="84" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <rect x="16" y="216" width="608" height="28" rx="3" fill="var(--origam-color__surface---raised,#fff)" stroke="var(--origam-color__border---default,rgba(124,58,237,0.2))" stroke-width="1"/>
  <circle cx="24" cy="230" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="24" y="234" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <rect x="36" y="223" width="10" height="10" rx="2" fill="#22c55e"/>
  <text x="52" y="232" font-size="9" fill="var(--origam-color__text---primary,#1e1b4b)" font-family="sans-serif">Bullish</text>
  <rect x="100" y="223" width="10" height="10" rx="2" fill="#ef4444"/>
  <text x="116" y="232" font-size="9" fill="var(--origam-color__text---primary,#1e1b4b)" font-family="sans-serif">Bearish</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-chart-candlestick&gt;</code> — 6 internal parts.',
        legend: [
            { num: 1, cls: '.origam-chart-candlestick__header', descriptionKey: 'components.chart_candlestick.anatomy.header', descriptionFallback: 'Header block. Contains the title and subtitle divs. Hidden when both are absent.' },
            { num: 2, cls: '.origam-chart-candlestick__body', descriptionKey: 'components.chart_candlestick.anatomy.body', descriptionFallback: 'Body flex container. Wraps the SVG, tooltip and empty-state overlay.' },
            { num: 3, cls: '.origam-chart-candlestick__grid', descriptionKey: 'components.chart_candlestick.anatomy.grid', descriptionFallback: '<g> element holding horizontal Y-tick grid lines. Hidden when showGrid=false.' },
            { num: 4, cls: '.origam-chart-candlestick__candle', descriptionKey: 'components.chart_candlestick.anatomy.candle', descriptionFallback: '<g> per datum. Contains the wick <line> and body <rect>. Keyboard-focusable (tabindex=0, role=button).' },
            { num: 5, cls: '.origam-chart-candlestick__axis', descriptionKey: 'components.chart_candlestick.anatomy.axis', descriptionFallback: '<g> holding all axis tick <text> labels. Hidden when showAxis=false.' },
            { num: 6, cls: '.origam-chart__legend (via OrigamChartLegend)', descriptionKey: 'components.chart_candlestick.anatomy.legend', descriptionFallback: 'Legend list rendered by the extracted OrigamChartLegend sub-component. grid-area: legend.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-chart-candlestick">
  <div class="origam-chart-candlestick__header">
    <div class="origam-chart-candlestick__title">…</div>
    <div class="origam-chart-candlestick__subtitle">…</div>
  </div>
  <div class="origam-chart-candlestick__body">
    <svg class="origam-chart-candlestick__svg origam-chart__svg">
      <g class="origam-chart-candlestick__grid">
        <line class="origam-chart-candlestick__grid-line" />
      </g>
      <g class="origam-chart-candlestick__axis">
        <text class="origam-chart-candlestick__axis-label--y" />
        <text class="origam-chart-candlestick__axis-label--x" />
      </g>
      <g class="origam-chart__series">
        <g class="origam-chart-candlestick__candle origam-chart-candlestick__candle--bullish">
          <line class="origam-chart-candlestick__wick" />
          <rect class="origam-chart-candlestick__body-rect" />
        </g>
      </g>
    </svg>
    <origam-chart-tooltip />
    <div class="origam-chart-candlestick__empty" />
  </div>
  <origam-chart-legend />
</div>`,
        rootClass: 'origam-chart-candlestick',
        classes: [
            { cls: 'origam-chart-candlestick', descriptionKey: 'components.chart_candlestick.anatomy.root', descriptionFallback: 'Root grid container. Layout switches between legend positions.' },
            { cls: 'origam-chart-candlestick__header', descriptionKey: 'components.chart_candlestick.anatomy.header', descriptionFallback: 'Title + subtitle header block.' },
            { cls: 'origam-chart-candlestick__body', descriptionKey: 'components.chart_candlestick.anatomy.body', descriptionFallback: 'Flex container for SVG + overlay layers.' },
            { cls: 'origam-chart-candlestick__svg', descriptionKey: 'components.chart_candlestick.anatomy.svg', descriptionFallback: 'The inline SVG element. Uses a fixed viewBox scaled via CSS.' },
            { cls: 'origam-chart-candlestick__grid-line', descriptionKey: 'components.chart_candlestick.anatomy.grid_line', descriptionFallback: 'Horizontal grid line per Y-axis tick.' },
            { cls: 'origam-chart-candlestick__candle', descriptionKey: 'components.chart_candlestick.anatomy.candle', descriptionFallback: 'Per-datum group element. Modified by --bullish / --bearish / --active.' },
            { cls: 'origam-chart-candlestick__wick', descriptionKey: 'components.chart_candlestick.anatomy.wick', descriptionFallback: 'Thin SVG line from low to high price.' },
            { cls: 'origam-chart-candlestick__body-rect', descriptionKey: 'components.chart_candlestick.anatomy.body_rect', descriptionFallback: 'Filled rectangle between open and close price.' },
            { cls: 'origam-chart-candlestick__empty', descriptionKey: 'components.chart_candlestick.anatomy.empty', descriptionFallback: 'Absolute overlay shown when series has no valid data.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart_candlestick.css_vars.background_color',
            descriptionFallback: 'Chart root background colour.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_candlestick.css_vars.padding',
            descriptionFallback: 'Inner padding of the chart root.'
        },
        {
            name: '--origam-chart---gap',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_candlestick.css_vars.gap',
            descriptionFallback: 'Gap between header, body and legend areas.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_candlestick.css_vars.animation_duration',
            descriptionFallback: 'Duration of the candle fade-in animation. Set by animationDuration prop.'
        },
        {
            name: '--origam-chart__grid---stroke-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.chart_candlestick.css_vars.grid_stroke_color',
            descriptionFallback: 'Stroke colour of horizontal grid lines.'
        },
        {
            name: '--origam-chart__axis-label---font-size',
            defaultValue: '0.6875rem',
            descriptionKey: 'components.chart_candlestick.css_vars.axis_label_font_size',
            descriptionFallback: 'Font size of axis tick labels.'
        },
        {
            name: '--origam-chart__tooltip---background-color',
            defaultValue: '{color.surface.inverse}',
            descriptionKey: 'components.chart_candlestick.css_vars.tooltip_background_color',
            descriptionFallback: 'Tooltip background colour.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            { key: 'Tab', actionKey: 'components.chart_candlestick.a11y.key_tab', actionFallback: 'Moves focus between interactive candles.' },
            { key: 'Enter / Space', actionKey: 'components.chart_candlestick.a11y.key_activate', actionFallback: 'Activates the focused candle and fires point-click.' }
        ],
        notes: [
            { noteKey: 'components.chart_candlestick.a11y.root_note', noteFallback: 'Root element has role="figure" with aria-label set to the title prop or "candlestick chart".' },
            { noteKey: 'components.chart_candlestick.a11y.svg_note', noteFallback: 'SVG has role="img" with <title> and <desc> elements describing the data.' },
            { noteKey: 'components.chart_candlestick.a11y.candle_note', noteFallback: 'Each candle has role="button", tabindex=0, and aria-label describing date, direction, open, high, low, close.' },
            { noteKey: 'components.chart_candlestick.a11y.reduced_motion_note', noteFallback: 'All animations are disabled under prefers-reduced-motion: reduce.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chart.json',
        pipelineNote: 'Shares the chart.json token file. Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'chart.background-color', value: '{color.surface.default}', type: 'color', descriptionKey: 'components.chart_candlestick.tokens.background_color', descriptionFallback: 'Root chart background.' },
            { tokenPath: 'chart.padding', value: '{space.3}', type: 'dimension', descriptionKey: 'components.chart_candlestick.tokens.padding', descriptionFallback: 'Chart inner padding.' },
            { tokenPath: 'chart.grid.color', value: '{color.border.subtle}', type: 'color', descriptionKey: 'components.chart_candlestick.tokens.grid_color', descriptionFallback: 'Grid line colour.' },
            { tokenPath: 'chart.tooltip.background-color', value: '{color.surface.inverse}', type: 'color', descriptionKey: 'components.chart_candlestick.tokens.tooltip_bg', descriptionFallback: 'Tooltip background.' }
        ]
    } satisfies IComponentTokens
}
