/**
 * /components/chart-heatmap — full documentation data for OrigamChartHeatmap.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-heatmap.interface.ts  (props)
 *   - packages/ds/src/components/Chart/OrigamChartHeatmap.vue      (template BEM, aria-*)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_HEATMAP_DOC: IComponentDoc = {
    slug: 'chart-heatmap',
    name: 'ChartHeatmap',
    tag: 'origam-chart-heatmap',
    icon: 'mdi-grid',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_heatmap.description',
    descriptionFallback: 'Rectangular heatmap chart. Renders a grid of SVG <rect> cells coloured by value via CSS color-mix interpolation. Common uses: GitHub activity grids, correlation matrices, weekday × hour patterns.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-heatmap--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartHeatmap',

    parentSlug: 'chart',

    family: [
        {
            slug: 'chart',
            name: 'Chart',
            descriptionKey: 'components.catalog.chart.description',
            descriptionFallback: 'Universal chart component supporting bar, line, area, pie, donut, scatter and more.'
        },
        {
            slug: 'chart-bullet',
            name: 'ChartBullet',
            descriptionKey: 'components.catalog.chart_bullet.description',
            descriptionFallback: 'Bullet chart — compact KPI display with range bands, actual-value bar and target tick.'
        },
        {
            slug: 'chart-honeycomb',
            name: 'ChartHoneycomb',
            descriptionKey: 'components.catalog.chart_honeycomb.description',
            descriptionFallback: 'Hexagonal tile-map chart for categorical or heatmap data.'
        },
        {
            slug: 'chart-legend',
            name: 'ChartLegend',
            descriptionKey: 'components.catalog.chart_legend.description',
            descriptionFallback: 'Standalone series-legend component shared by all chart families.'
        },
        {
            slug: 'chart-map',
            name: 'ChartMap',
            descriptionKey: 'components.catalog.chart_map.description',
            descriptionFallback: 'Choropleth and flight-route world map chart.'
        }
    ],

    props: [
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.chart_heatmap.props.series.description',
            descriptionFallback: 'Data series — only series[0] is consumed. Each datum must supply x, y and value.'
        },
        {
            name: 'xCategories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_heatmap.props.x_categories.description',
            descriptionFallback: 'Explicit X-axis category ordering. When omitted, unique x values are sorted alphabetically/numerically.'
        },
        {
            name: 'yCategories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_heatmap.props.y_categories.description',
            descriptionFallback: 'Explicit Y-axis category ordering. When omitted, unique y values are sorted alphabetically/numerically.'
        },
        {
            name: 'colorRange',
            type: { label: '[TIntent | string, TIntent | string]', slug: '', kind: 'primitive' },
            defaultValue: "['info', 'danger']",
            descriptionKey: 'components.chart_heatmap.props.color_range.description',
            descriptionFallback: 'Two-stop colour range. First entry = min value colour; second = max value colour. Accepts intent tokens or raw CSS strings.'
        },
        {
            name: 'cellGap',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '2',
            descriptionKey: 'components.chart_heatmap.props.cell_gap.description',
            descriptionFallback: 'Gap between cells in SVG user units.'
        },
        {
            name: 'showLabel',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_heatmap.props.show_label.description',
            descriptionFallback: 'Renders the numeric value centred inside each cell when the cell is large enough.'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_heatmap.props.show_axis.description',
            descriptionFallback: 'Renders X and Y axis category labels along the grid edges.'
        },
        {
            name: 'showGradientLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_heatmap.props.show_gradient_legend.description',
            descriptionFallback: 'Renders a gradient colour bar with min/max labels inline in the SVG.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_heatmap.props.show_legend.description',
            descriptionFallback: 'Controls the ChartLegend visibility.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_heatmap.props.legend_position.description',
            descriptionFallback: "Anchor of the gradient legend: 'top' | 'bottom' | 'left' | 'right'."
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_heatmap.props.show_tooltip.description',
            descriptionFallback: 'Shows a tooltip on hover/focus with x, y and formatted value.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_heatmap.props.animated.description',
            descriptionFallback: 'Fades cells in on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_heatmap.props.animation_duration.description',
            descriptionFallback: 'Entry animation duration in ms.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_heatmap.props.title.description',
            descriptionFallback: 'Optional title rendered above the plotting area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_heatmap.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '400',
            descriptionKey: 'components.chart_heatmap.props.height.description',
            descriptionFallback: 'Component height. Accepts a CSS length or a number (converted to px).'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_heatmap.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut. When set, overrides height.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_heatmap.props.bg_color.description',
            descriptionFallback: 'Background colour applied to the chart root.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_heatmap.props.x_axis_format.description',
            descriptionFallback: 'X-axis column label formatter.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_heatmap.props.y_axis_format.description',
            descriptionFallback: 'Row label and gradient legend min/max formatter.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_heatmap.emits.point_click.description',
            descriptionFallback: 'Fired when the user clicks or keyboard-activates a cell.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_heatmap.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_heatmap.emits.series_toggle.description',
            descriptionFallback: 'Fired after a legend click with the intended next visibility value.'
        }
    ],

    slots: [
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_heatmap.slots.title.description',
            descriptionFallback: 'Replaces the default title/subtitle block.'
        },
        {
            slot: 'tooltip',
            slotProps: '{ point, color, xLabel, yLabel, value }',
            descriptionKey: 'components.chart_heatmap.slots.tooltip.description',
            descriptionFallback: 'Replaces the default tooltip body for a hovered cell.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_heatmap.slots.empty.description',
            descriptionFallback: 'Shown when series is empty or has no renderable data.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_heatmap.examples.basic.title',
            titleFallback: 'Basic heatmap',
            lang: 'vue',
            code: `<template>
  <origam-chart-heatmap
    :series="[{ name: 'Commits', data: cells }]"
    title="Weekly activity"
    height="280"
  />
</template>

<script setup lang="ts">
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const hours = ['9h', '12h', '15h', '18h']

const cells = days.flatMap((x) =>
  hours.map((y) => ({ x, y, value: Math.round(Math.random() * 50) }))
)
</script>`
        },
        {
            titleKey: 'components.chart_heatmap.examples.color_range.title',
            titleFallback: 'Custom colour range',
            lang: 'vue',
            code: `<template>
  <origam-chart-heatmap
    :series="[{ name: 'Temp (°C)', data: data }]"
    :color-range="['info', 'danger']"
    title="Temperature map"
    height="300"
  />
</template>`
        },
        {
            titleKey: 'components.chart_heatmap.examples.no_label.title',
            titleFallback: 'No cell labels',
            lang: 'vue',
            code: `<template>
  <origam-chart-heatmap
    :series="[{ name: 'Values', data: data }]"
    :show-label="false"
    :cell-gap="3"
    height="320"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-chart-heatmap',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamChartHeatmap',
        svgDesc: 'Schematic of the ChartHeatmap component with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="200" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="32" y="28" width="636" height="16" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="350" y="40" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__header (title + subtitle)</text>
  <rect x="70" y="52" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 10%, rgba(8,145,178,0.8))"/>
  <rect x="156" y="52" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 35%, rgba(8,145,178,0.8))"/>
  <rect x="242" y="52" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 60%, rgba(8,145,178,0.8))"/>
  <rect x="328" y="52" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 80%, rgba(8,145,178,0.8))"/>
  <rect x="414" y="52" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 95%, rgba(8,145,178,0.8))"/>
  <rect x="70" y="92" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 20%, rgba(8,145,178,0.8))"/>
  <rect x="156" y="92" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 55%, rgba(8,145,178,0.8))"/>
  <rect x="242" y="92" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 40%, rgba(8,145,178,0.8))"/>
  <rect x="328" y="92" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 75%, rgba(8,145,178,0.8))"/>
  <rect x="414" y="92" width="82" height="36" rx="2" fill="color-mix(in srgb, rgba(239,68,68,0.8) 30%, rgba(8,145,178,0.8))"/>
  <text x="50" y="74" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="end">Mon</text>
  <text x="50" y="114" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="end">Tue</text>
  <text x="111" y="142" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">9h</text>
  <text x="197" y="142" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">12h</text>
  <rect x="70" y="150" width="426" height="10" rx="2" fill="url(#origam-hm-grad)"/>
  <defs><linearGradient id="origam-hm-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="rgba(8,145,178,0.8)"/><stop offset="100%" stop-color="rgba(239,68,68,0.8)"/></linearGradient></defs>
  <text x="70" y="173" font-size="7" fill="var(--origam-color__text---tertiary, #7e5fb0)">0</text>
  <text x="496" y="173" font-size="7" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="end">50</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="78" cy="60" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="78" y="64" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="50" cy="74" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="50" y="78" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="111" cy="142" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="111" y="146" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="78" cy="155" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="78" y="159" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="36" cy="36" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="40" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <text x="350" y="225" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">② cell fill = CSS color-mix(in srgb, colorRange[1] N%, colorRange[0]) — ⑤ gradient legend</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chart-heatmap&gt;</code> — 6 internal parts. Cell colour interpolated via CSS <code>color-mix(in srgb, …)</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-chart-heatmap',
                descriptionKey: 'components.chart_heatmap.anatomy.root',
                descriptionFallback: 'Root element. CSS grid with areas: header / body. role="figure" + aria-label from title.'
            },
            {
                num: 2,
                cls: '.origam-chart__heatmap-cell',
                descriptionKey: 'components.chart_heatmap.anatomy.cell',
                descriptionFallback: 'SVG <rect> for each data cell. Fill is CSS color-mix interpolated between colorRange endpoints. tabindex="0" + role="button".'
            },
            {
                num: 3,
                cls: '.origam-chart__heatmap-axis-label--y',
                descriptionKey: 'components.chart_heatmap.anatomy.y_label',
                descriptionFallback: 'Y-axis row labels (left side). Hidden when showAxis=false.'
            },
            {
                num: 4,
                cls: '.origam-chart__heatmap-axis-label--x',
                descriptionKey: 'components.chart_heatmap.anatomy.x_label',
                descriptionFallback: 'X-axis column labels (bottom). Hidden when showAxis=false.'
            },
            {
                num: 5,
                cls: '.origam-chart__heatmap-gradient-legend',
                descriptionKey: 'components.chart_heatmap.anatomy.gradient_legend',
                descriptionFallback: 'Inline SVG gradient bar with min/max value labels. Visible when showGradientLegend=true and legendPosition is top or bottom.'
            },
            {
                num: 6,
                cls: '.origam-chart-heatmap__header',
                descriptionKey: 'components.chart_heatmap.anatomy.header',
                descriptionFallback: 'Title and subtitle block. Rendered only when title or subtitle is provided.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-chart-heatmap" role="figure" aria-label="Weekly activity">
  <header class="origam-chart-heatmap__header">
    <div class="origam-chart-heatmap__title">Weekly activity</div>
  </header>

  <div class="origam-chart-heatmap__body">
    <svg class="origam-chart-heatmap__svg origam-chart__svg" role="img">
      <title>Weekly activity</title>
      <desc>Heatmap chart with 5 columns and 4 rows.</desc>

      <defs>
        <linearGradient id="origam-heatmap-legend-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" />
          <stop offset="100%" />
        </linearGradient>
      </defs>

      <!-- cell grid -->
      <g class="origam-chart__heatmap-series">
        <g class="origam-chart__heatmap-cell-group">
          <rect class="origam-chart__heatmap-cell" tabindex="0" role="button" />
          <text class="origam-chart__heatmap-label">42</text>
        </g>
      </g>

      <!-- axis labels -->
      <g class="origam-chart__heatmap-x-axis">
        <text class="origam-chart__heatmap-axis-label origam-chart__heatmap-axis-label--x">Mon</text>
      </g>
      <g class="origam-chart__heatmap-y-axis">
        <text class="origam-chart__heatmap-axis-label origam-chart__heatmap-axis-label--y">9h</text>
      </g>

      <!-- gradient legend (showGradientLegend=true) -->
      <g class="origam-chart__heatmap-gradient-legend">
        <rect fill="url(#origam-heatmap-legend-gradient)" />
        <text class="origam-chart__heatmap-legend-label">0</text>
        <text class="origam-chart__heatmap-legend-label">50</text>
      </g>
    </svg>

    <!-- tooltip -->
    <origam-chart-tooltip />
  </div>
</div>`,
        classes: [
            { cls: 'origam-chart-heatmap', descriptionKey: 'components.chart_heatmap.anatomy.root', descriptionFallback: 'Root element.' },
            { cls: 'origam-chart-heatmap__header', descriptionKey: 'components.chart_heatmap.anatomy.header', descriptionFallback: 'Title/subtitle block.' },
            { cls: 'origam-chart-heatmap__title', descriptionKey: 'components.chart_heatmap.anatomy.title', descriptionFallback: 'Primary title.' },
            { cls: 'origam-chart-heatmap__subtitle', descriptionKey: 'components.chart_heatmap.anatomy.subtitle', descriptionFallback: 'Subtitle.' },
            { cls: 'origam-chart-heatmap__body', descriptionKey: 'components.chart_heatmap.anatomy.body', descriptionFallback: 'Body containing the SVG.' },
            { cls: 'origam-chart-heatmap__svg', descriptionKey: 'components.chart_heatmap.anatomy.svg', descriptionFallback: 'SVG canvas.' },
            { cls: 'origam-chart__heatmap-cell-group', descriptionKey: 'components.chart_heatmap.anatomy.cell_group', descriptionFallback: '<g> grouping one cell and its label.' },
            { cls: 'origam-chart__heatmap-cell', descriptionKey: 'components.chart_heatmap.anatomy.cell', descriptionFallback: 'Cell <rect>. Fill = color-mix interpolation.' },
            { cls: 'origam-chart__heatmap-cell--active', descriptionKey: 'components.chart_heatmap.anatomy.cell_active', descriptionFallback: 'Active modifier on hover/focus.' },
            { cls: 'origam-chart__heatmap-label', descriptionKey: 'components.chart_heatmap.anatomy.cell_label', descriptionFallback: 'Numeric value label centred in the cell.' },
            { cls: 'origam-chart__heatmap-axis-label', descriptionKey: 'components.chart_heatmap.anatomy.axis_label', descriptionFallback: 'Axis label (shared base class).' },
            { cls: 'origam-chart__heatmap-axis-label--x', descriptionKey: 'components.chart_heatmap.anatomy.x_label', descriptionFallback: 'X-axis column label.' },
            { cls: 'origam-chart__heatmap-axis-label--y', descriptionKey: 'components.chart_heatmap.anatomy.y_label', descriptionFallback: 'Y-axis row label.' },
            { cls: 'origam-chart__heatmap-gradient-legend', descriptionKey: 'components.chart_heatmap.anatomy.gradient_legend', descriptionFallback: 'Inline gradient legend group.' },
            { cls: 'origam-chart__heatmap-legend-label', descriptionKey: 'components.chart_heatmap.anatomy.legend_label', descriptionFallback: 'Min/max value label beside the gradient bar.' },
            { cls: 'origam-chart-heatmap--no-animation', descriptionKey: 'components.chart_heatmap.anatomy.mod_no_animation', descriptionFallback: 'Disables entry animation.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---gap',
            defaultValue: '12px',
            descriptionKey: 'components.chart_heatmap.css_vars.gap',
            descriptionFallback: 'Gap between header and body areas.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '12px',
            descriptionKey: 'components.chart_heatmap.css_vars.padding',
            descriptionFallback: 'Internal padding of the chart root.'
        },
        {
            name: '--origam-chart---background-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.chart_heatmap.css_vars.background_color',
            descriptionFallback: 'Background colour of the chart root.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_heatmap.css_vars.animation_duration',
            descriptionFallback: 'Entry animation duration. Driven by animationDuration prop.'
        },
        {
            name: '--origam-chart__heatmap---stroke-color',
            defaultValue: 'var(--origam-color-surface-default, #ffffff)',
            descriptionKey: 'components.chart_heatmap.css_vars.stroke_color',
            descriptionFallback: 'Stroke colour of cell rects (creates visible gap between cells).'
        },
        {
            name: '--origam-chart__heatmap---stroke-width',
            defaultValue: '0.5',
            descriptionKey: 'components.chart_heatmap.css_vars.stroke_width',
            descriptionFallback: 'Stroke width of cell rects.'
        },
        {
            name: '--origam-chart__heatmap-label---font-size',
            defaultValue: '0.5625rem',
            descriptionKey: 'components.chart_heatmap.css_vars.label_font_size',
            descriptionFallback: 'Font size of cell value labels.'
        },
        {
            name: '--origam-chart__heatmap-label---color',
            defaultValue: '#ffffff',
            descriptionKey: 'components.chart_heatmap.css_vars.label_color',
            descriptionFallback: 'Fill colour of cell value labels.'
        },
        {
            name: '--origam-chart__heatmap-axis-label---font-size',
            defaultValue: '0.625rem',
            descriptionKey: 'components.chart_heatmap.css_vars.axis_label_font_size',
            descriptionFallback: 'Font size of axis labels.'
        },
        {
            name: '--origam-chart__title---font-size',
            defaultValue: '1.125rem',
            descriptionKey: 'components.chart_heatmap.css_vars.title_font_size',
            descriptionFallback: 'Font size of the chart title.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_heatmap.a11y.key_tab',
                actionFallback: 'Moves focus through each cell (tabindex="0").'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_heatmap.a11y.key_activate',
                actionFallback: 'Activates the focused cell, firing the point-click emit.'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_heatmap.a11y.figure_role',
                noteFallback: 'Root has role="figure" with aria-label from the title prop (falls back to "heatmap chart").'
            },
            {
                noteKey: 'components.chart_heatmap.a11y.svg_role',
                noteFallback: 'The SVG carries role="img" with a <title> and <desc> listing column and row counts.'
            },
            {
                noteKey: 'components.chart_heatmap.a11y.cell_aria',
                noteFallback: 'Each cell has aria-label in the format "xCat × yCat: value" for screen reader announcement.'
            },
            {
                noteKey: 'components.chart_heatmap.a11y.reduced_motion',
                noteFallback: 'Entry animations are disabled via @media (prefers-reduced-motion: reduce).'
            }
        ]
    } satisfies IComponentA11y
}
