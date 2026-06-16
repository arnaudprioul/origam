/**
 * /components/chart-gauge — full documentation data for OrigamChartGauge.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-gauge.interface.ts  (IChartGaugeProps, emits, slots)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts    (IChartBaseProps)
 *   - packages/ds/src/components/Chart/OrigamChartGauge.vue       (template BEM, SCSS)
 *   - packages/ds/tokens/component/chart.json                     (shared CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_GAUGE_DOC: IComponentDoc = {
    slug: 'chart-gauge',
    name: 'ChartGauge',
    tag: 'origam-chart-gauge',
    icon: 'mdi-gauge',
    category: 'Data Visualization',
    descriptionKey: 'components.catalog.chart_gauge.description',
    descriptionFallback: 'Solid gauge (radial progress indicator). A 270-degree track with a filled arc indicating the current value, an optional centre label, and optional min/max endpoint labels. Reads the first datum of the first series.',
    packageNote: 'origam',
    parentSlug: 'chart',
    storyUrl: 'http://localhost:6006/?story=components-chart-gauge--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartGauge',

    family: [
        { slug: 'chart', name: 'Chart', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal chart component with 29 visualization primitives.' },
        { slug: 'chart-polar', name: 'ChartPolar', descriptionKey: 'components.catalog.chart_polar.description', descriptionFallback: 'Polar chart engine: pie, donut.' },
        { slug: 'chart-polar-bar', name: 'ChartPolarBar', descriptionKey: 'components.catalog.chart_polar_bar.description', descriptionFallback: 'Polar bar / rose chart engine.' }
    ],

    related: [
        { slug: 'chart', name: 'Chart', kind: 'component', descriptionKey: 'components.catalog.chart.description', descriptionFallback: 'Universal entry-point that routes to ChartGauge when type="gauge".' },
        { slug: 'progress', name: 'Progress', kind: 'component', descriptionKey: 'components.catalog.progress.description', descriptionFallback: 'Linear and circular progress indicator — alternative for simpler use-cases.' }
    ],

    props: [
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            required: true,
            descriptionKey: 'components.chart_gauge.props.series.description',
            descriptionFallback: 'Data series. Only series[0].data[0] is consumed as the gauge value. Extra series are ignored.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_gauge.props.title.description',
            descriptionFallback: 'Optional chart title rendered above the gauge SVG.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_gauge.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'gaugeMin',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.chart_gauge.props.gauge_min.description',
            descriptionFallback: 'Lower bound of the gauge range.'
        },
        {
            name: 'gaugeMax',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.chart_gauge.props.gauge_max.description',
            descriptionFallback: 'Upper bound of the gauge range.'
        },
        {
            name: 'gaugeUnit',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "''",
            descriptionKey: 'components.chart_gauge.props.gauge_unit.description',
            descriptionFallback: 'Unit appended to the centre label (e.g. "%", " km/h").'
        },
        {
            name: 'gaugeThickness',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '18',
            descriptionKey: 'components.chart_gauge.props.gauge_thickness.description',
            descriptionFallback: 'Arc thickness in SVG pixels.'
        },
        {
            name: 'gaugeStartAngle',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '-3π/4 (≈ -2.356)',
            descriptionKey: 'components.chart_gauge.props.gauge_start_angle.description',
            descriptionFallback: 'Arc start angle in radians. Default = bottom-left of a 270-degree arc.'
        },
        {
            name: 'gaugeEndAngle',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '3π/4 (≈ 2.356)',
            descriptionKey: 'components.chart_gauge.props.gauge_end_angle.description',
            descriptionFallback: 'Arc end angle in radians. Default = bottom-right of a 270-degree arc.'
        },
        {
            name: 'gaugeShowEndpoints',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_gauge.props.gauge_show_endpoints.description',
            descriptionFallback: 'Render gaugeMin and gaugeMax labels at the arc endpoints.'
        },
        {
            name: 'gaugeShowValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_gauge.props.gauge_show_value.description',
            descriptionFallback: 'Render the centre value label.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_gauge.props.animated.description',
            descriptionFallback: 'Animate the fill arc on first paint and data changes.'
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_gauge.props.color_scheme.description',
            descriptionFallback: 'Palette used when a series does not pin its own color.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_gauge.emits.point_click.description',
            descriptionFallback: 'Fired on click on the gauge arc.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_gauge.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_gauge.emits.series_toggle.description',
            descriptionFallback: 'Resulting visibility flip after a legend click.'
        }
    ],

    slots: [
        {
            slot: 'gauge-value',
            slotProps: '{ value, ratio, formatted, unit }',
            descriptionKey: 'components.chart_gauge.slots.gauge_value.description',
            descriptionFallback: 'Replace the centre value label. Receives raw value, normalised ratio (0..1), formatted string and unit.'
        },
        {
            slot: 'gauge-min',
            slotProps: '{ value }',
            descriptionKey: 'components.chart_gauge.slots.gauge_min.description',
            descriptionFallback: 'Replace the min label at the start of the arc.'
        },
        {
            slot: 'gauge-max',
            slotProps: '{ value }',
            descriptionKey: 'components.chart_gauge.slots.gauge_max.description',
            descriptionFallback: 'Replace the max label at the end of the arc.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_gauge.slots.title.description',
            descriptionFallback: 'Replace the title block.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_gauge.slots.empty.description',
            descriptionFallback: 'Rendered when series is empty or has no data.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_gauge.examples.basic.title',
            titleFallback: 'Basic gauge',
            lang: 'vue',
            code: `<template>
  <origam-chart-gauge
    :series="[{ name: 'CPU', data: [72] }]"
    gauge-unit="%"
    title="CPU Usage"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-chart-gauge',
        svgViewBox: '0 0 480 260',
        svgTitle: 'Anatomy of OrigamChartGauge',
        svgDesc: 'Schematic of the gauge chart component with numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="480" height="260" fill="var(--origam-color__surface---sunken,#fbf5ff)" rx="4"/>
  <rect x="16" y="10" width="448" height="32" rx="3" fill="var(--origam-color__surface---raised,#fff)" stroke="var(--origam-color__border---default,rgba(124,58,237,0.3))" stroke-width="1"/>
  <circle cx="24" cy="26" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="24" y="30" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <text x="38" y="30" font-size="9" fill="var(--origam-color__text---primary,#1e1b4b)" font-family="sans-serif">Chart title</text>
  <rect x="16" y="50" width="448" height="180" rx="3" fill="var(--origam-color__surface---raised,#fff)" stroke="var(--origam-color__border---default,rgba(124,58,237,0.2))" stroke-width="1"/>
  <circle cx="24" cy="58" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="24" y="62" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <path d="M 100,190 A 90,90 0 1,1 380,190" fill="none" stroke="var(--origam-color__border---subtle,#e5e7eb)" stroke-width="16"/>
  <circle cx="32" cy="130" r="8" fill="var(--origam-color__action--primary---bg,#a855f7)"/>
  <text x="32" y="134" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <path d="M 100,190 A 90,90 0 0,1 310,100" fill="none" stroke="var(--origam-color__action--primary---bg,#7c3aed)" stroke-width="16"/>
  <circle cx="250" cy="68" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="250" y="72" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="240" y="175" font-size="18" fill="var(--origam-color__text---primary,#1e1b4b)" text-anchor="middle" font-weight="700" font-family="sans-serif">72%</text>
  <circle cx="200" cy="165" r="8" fill="var(--origam-color__action--primary---bg,#7c3aed)"/>
  <text x="200" y="169" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <text x="108" y="200" font-size="9" fill="var(--origam-color__text---secondary,#6b7280)" text-anchor="middle" font-family="sans-serif">0</text>
  <text x="372" y="200" font-size="9" fill="var(--origam-color__text---secondary,#6b7280)" text-anchor="middle" font-family="sans-serif">100</text>
  <circle cx="108" cy="188" r="7" fill="var(--origam-color__action--primary---bg,#a855f7)"/>
  <text x="108" y="192" font-size="7" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-chart-gauge&gt;</code> — 6 internal parts.',
        legend: [
            { num: 1, cls: '.origam-chart-gauge__header', descriptionKey: 'components.chart_gauge.anatomy.header', descriptionFallback: 'Header block. Contains title and subtitle divs.' },
            { num: 2, cls: '.origam-chart-gauge__body', descriptionKey: 'components.chart_gauge.anatomy.body', descriptionFallback: 'Body container. Wraps the SVG and empty-state overlay.' },
            { num: 3, cls: '.origam-chart__gauge-track', descriptionKey: 'components.chart_gauge.anatomy.track', descriptionFallback: 'Background arc path — always full 270 degrees.' },
            { num: 4, cls: '.origam-chart__gauge-fill', descriptionKey: 'components.chart_gauge.anatomy.fill', descriptionFallback: 'Foreground arc path — length proportional to value ratio.' },
            { num: 5, cls: '.origam-chart__gauge-value', descriptionKey: 'components.chart_gauge.anatomy.value', descriptionFallback: 'Centre value label. Hidden when gaugeShowValue=false.' },
            { num: 6, cls: '.origam-chart__gauge-endpoint (min/max)', descriptionKey: 'components.chart_gauge.anatomy.endpoints', descriptionFallback: 'Min and max labels at arc endpoints. Hidden when gaugeShowEndpoints=false.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-chart-gauge">
  <div class="origam-chart-gauge__header">
    <div class="origam-chart-gauge__title">…</div>
  </div>
  <div class="origam-chart-gauge__body">
    <svg class="origam-chart-gauge__svg origam-chart__svg"
         role="img"
         aria-valuemin="0" aria-valuemax="100" aria-valuenow="72">
      <title>…</title>
      <desc>…</desc>
      <g class="origam-chart__gauge">
        <path class="origam-chart__gauge-track" d="…" />
        <path class="origam-chart__gauge-fill" d="…" />
        <text class="origam-chart__gauge-value">72%</text>
        <text class="origam-chart__gauge-endpoint--min">0</text>
        <text class="origam-chart__gauge-endpoint--max">100</text>
      </g>
    </svg>
    <div class="origam-chart-gauge__empty" />
  </div>
</div>`,
        rootClass: 'origam-chart-gauge',
        classes: [
            { cls: 'origam-chart-gauge', descriptionKey: 'components.chart_gauge.anatomy.root', descriptionFallback: 'Root grid container.' },
            { cls: 'origam-chart-gauge__header', descriptionKey: 'components.chart_gauge.anatomy.header', descriptionFallback: 'Title + subtitle header.' },
            { cls: 'origam-chart-gauge__body', descriptionKey: 'components.chart_gauge.anatomy.body', descriptionFallback: 'Body container holding the SVG.' },
            { cls: 'origam-chart__gauge-track', descriptionKey: 'components.chart_gauge.anatomy.track', descriptionFallback: 'Background full arc path.' },
            { cls: 'origam-chart__gauge-fill', descriptionKey: 'components.chart_gauge.anatomy.fill', descriptionFallback: 'Foreground value arc path.' },
            { cls: 'origam-chart__gauge-value', descriptionKey: 'components.chart_gauge.anatomy.value', descriptionFallback: 'Centre value text element.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart_gauge.css_vars.background_color',
            descriptionFallback: 'Chart root background colour.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_gauge.css_vars.padding',
            descriptionFallback: 'Inner padding of the chart root.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_gauge.css_vars.animation_duration',
            descriptionFallback: 'Duration of the fill arc animation.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img'],
        keyboard: [],
        notes: [
            { noteKey: 'components.chart_gauge.a11y.root_note', noteFallback: 'Root element has role="figure" with aria-label set to the title prop or "gauge chart".' },
            { noteKey: 'components.chart_gauge.a11y.svg_note', noteFallback: 'SVG has role="img" with aria-valuemin, aria-valuemax, aria-valuenow attributes for screen readers.' },
            { noteKey: 'components.chart_gauge.a11y.reduced_motion_note', noteFallback: 'All animations are disabled under prefers-reduced-motion: reduce.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chart.json',
        pipelineNote: 'Shares the chart.json token file. Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'chart.background-color', value: '{color.surface.default}', type: 'color', descriptionKey: 'components.chart_gauge.tokens.background_color', descriptionFallback: 'Root chart background.' },
            { tokenPath: 'chart.title.color', value: '{color.text.primary}', type: 'color', descriptionKey: 'components.chart_gauge.tokens.title_color', descriptionFallback: 'Title text colour.' }
        ]
    } satisfies IComponentTokens
}
