/**
 * /components/chart-bullet — full documentation data for OrigamChartBullet.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-bullet.interface.ts  (props)
 *   - packages/ds/src/components/Chart/OrigamChartBullet.vue      (template BEM, aria-*)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_BULLET_DOC: IComponentDoc = {
    slug: 'chart-bullet',
    name: 'ChartBullet',
    tag: 'origam-chart-bullet',
    icon: 'mdi-speedometer',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_bullet.description',
    descriptionFallback: 'Bullet chart (Stephen Few design) — compact KPI display combining qualitative range bands, an actual-value bar, and a target marker tick. Supports horizontal and vertical orientations.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-bullet--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartBullet',

    parentSlug: 'chart',

    family: [
        {
            slug: 'chart',
            name: 'Chart',
            descriptionKey: 'components.catalog.chart.description',
            descriptionFallback: 'Universal chart component supporting bar, line, area, pie, donut, scatter and more via a single type prop.'
        },
        {
            slug: 'chart-cartesian',
            name: 'ChartCartesian',
            descriptionKey: 'components.catalog.chart_cartesian.description',
            descriptionFallback: 'Base cartesian chart (bar, column, line, area) with axis, grid lines and zoom.'
        },
        {
            slug: 'chart-heatmap',
            name: 'ChartHeatmap',
            descriptionKey: 'components.catalog.chart_heatmap.description',
            descriptionFallback: 'Rectangular heatmap chart with colour-mix gradient cells.'
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
            descriptionKey: 'components.chart_bullet.props.series.description',
            descriptionFallback: 'Data series — one entry per bullet row. Each series.data[0] must be an IChartBulletDatum with value, target and ranges.'
        },
        {
            name: 'categories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_bullet.props.categories.description',
            descriptionFallback: 'Category labels, one per series entry. Falls back to series[i].name when omitted.'
        },
        {
            name: 'barColor',
            type: { label: 'TIntent | string', slug: 'intent', kind: 'type' },
            defaultValue: "'primary'",
            descriptionKey: 'components.chart_bullet.props.bar_color.description',
            descriptionFallback: 'Fill colour for the actual-value bar. Accepts a TIntent token or a raw CSS colour.'
        },
        {
            name: 'targetColor',
            type: { label: 'TIntent | string', slug: 'intent', kind: 'type' },
            defaultValue: "'danger'",
            descriptionKey: 'components.chart_bullet.props.target_color.description',
            descriptionFallback: 'Stroke colour for the target marker tick.'
        },
        {
            name: 'rangeColors',
            type: { label: '(TIntent | string)[]', slug: '', kind: 'primitive' },
            defaultValue: "['danger','warning','success']",
            descriptionKey: 'components.chart_bullet.props.range_colors.description',
            descriptionFallback: 'Fallback palette cycled across range bands when range.color is omitted.'
        },
        {
            name: 'orientation',
            type: { label: 'TChartBulletOrientation', slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.chart_bullet.props.orientation.description',
            descriptionFallback: "Layout direction. 'horizontal' renders bullets as rows; 'vertical' renders them as columns."
        },
        {
            name: 'barThickness',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.45',
            descriptionKey: 'components.chart_bullet.props.bar_thickness.description',
            descriptionFallback: 'Thickness of the actual-value bar as a fraction of the slot height [0, 1].'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_bullet.props.show_axis.description',
            descriptionFallback: 'Renders the quantitative axis ticks and baseline.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chart_bullet.props.show_legend.description',
            descriptionFallback: 'Renders a ChartLegend listing each bullet entry.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_bullet.props.legend_position.description',
            descriptionFallback: "Position of the legend block: 'top' | 'bottom' | 'left' | 'right'."
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_bullet.props.show_tooltip.description',
            descriptionFallback: 'Shows a tooltip on hover/focus with value, target and achievement percentage.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_bullet.props.animated.description',
            descriptionFallback: 'Fades bars in on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_bullet.props.animation_duration.description',
            descriptionFallback: 'Animation duration in ms.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_bullet.props.title.description',
            descriptionFallback: 'Optional chart title rendered above the plotting area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_bullet.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '280',
            descriptionKey: 'components.chart_bullet.props.height.description',
            descriptionFallback: 'Component height. Accepts a CSS length or a number (converted to px).'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_bullet.props.aspect_ratio.description',
            descriptionFallback: "CSS aspect-ratio shortcut. When set, overrides height and lets the chart breathe with the container width."
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_bullet.props.bg_color.description',
            descriptionFallback: 'Background colour applied to the chart root.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_bullet.props.x_axis_format.description',
            descriptionFallback: 'X-axis tick label formatter.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_bullet.props.y_axis_format.description',
            descriptionFallback: 'Y-axis tick label formatter (vertical orientation).'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_bullet.emits.point_click.description',
            descriptionFallback: 'Fired when the user clicks or keyboard-activates a bullet bar.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_bullet.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_bullet.emits.series_toggle.description',
            descriptionFallback: 'Fired after a legend click with the intended next visibility value.'
        }
    ],

    slots: [
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_bullet.slots.title.description',
            descriptionFallback: 'Replaces the default title/subtitle block.'
        },
        {
            slot: 'tooltip',
            slotProps: '{ point, series, category, bullet, delta }',
            descriptionKey: 'components.chart_bullet.slots.tooltip.description',
            descriptionFallback: 'Replaces the default tooltip body. Receives the hovered bullet descriptor plus delta % (value / target × 100).'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series, index, visible }',
            descriptionKey: 'components.chart_bullet.slots.legend_item.description',
            descriptionFallback: 'Replaces one legend entry with custom markup.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_bullet.slots.empty.description',
            descriptionFallback: 'Shown when series is empty or every bullet is hidden.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_bullet.examples.basic.title',
            titleFallback: 'Basic bullet chart',
            lang: 'vue',
            code: `<template>
  <origam-chart-bullet
    :series="series"
    :categories="['Revenue', 'Profit', 'Satisfaction']"
    title="KPI Overview"
    height="220"
  />
</template>

<script setup lang="ts">
const series = [
  { name: 'Revenue', data: [{ value: 270, target: 300, ranges: [{ to: 150 }, { to: 225 }, { to: 300 }] }] },
  { name: 'Profit', data: [{ value: 23, target: 25, ranges: [{ to: 10 }, { to: 20 }, { to: 25 }] }] },
  { name: 'Satisfaction', data: [{ value: 8.1, target: 9, ranges: [{ to: 4 }, { to: 7 }, { to: 9 }] }] }
]
</script>`
        },
        {
            titleKey: 'components.chart_bullet.examples.vertical.title',
            titleFallback: 'Vertical orientation',
            lang: 'vue',
            code: `<template>
  <origam-chart-bullet
    :series="series"
    :categories="['Q1', 'Q2', 'Q3']"
    orientation="vertical"
    height="300"
  />
</template>

<script setup lang="ts">
const series = [
  { name: 'Q1', data: [{ value: 85, target: 100, ranges: [{ to: 50 }, { to: 75 }, { to: 100 }] }] },
  { name: 'Q2', data: [{ value: 92, target: 100, ranges: [{ to: 50 }, { to: 75 }, { to: 100 }] }] },
  { name: 'Q3', data: [{ value: 68, target: 100, ranges: [{ to: 50 }, { to: 75 }, { to: 100 }] }] }
]
</script>`
        },
        {
            titleKey: 'components.chart_bullet.examples.custom_colors.title',
            titleFallback: 'Custom colours',
            lang: 'vue',
            code: `<template>
  <origam-chart-bullet
    :series="series"
    :categories="['Sales']"
    bar-color="success"
    target-color="info"
    height="140"
  />
</template>

<script setup lang="ts">
const series = [
  { name: 'Sales', data: [{ value: 320, target: 350, ranges: [{ to: 200 }, { to: 300 }, { to: 350 }] }] }
]
</script>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-chart-bullet',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamChartBullet',
        svgDesc: 'Schematic of the ChartBullet component with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="220" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="32" y="30" width="636" height="20" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="350" y="44" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__header (title + subtitle)</text>
  <rect x="140" y="62" width="480" height="22" rx="2" fill="rgba(239,68,68,0.25)"/>
  <rect x="140" y="62" width="200" height="22" rx="2" fill="rgba(234,179,8,0.35)"/>
  <rect x="140" y="62" width="340" height="22" rx="2" fill="rgba(34,197,94,0.30)"/>
  <rect x="140" y="67" width="260" height="12" rx="1" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.85"/>
  <line x1="400" y1="56" x2="400" y2="88" stroke="var(--origam-color__feedback--danger---bg, #ef4444)" stroke-width="3" stroke-linecap="round"/>
  <text x="32" y="77" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace" text-anchor="end">Revenue</text>
  <rect x="140" y="100" width="480" height="22" rx="2" fill="rgba(239,68,68,0.25)"/>
  <rect x="140" y="100" width="200" height="22" rx="2" fill="rgba(234,179,8,0.35)"/>
  <rect x="140" y="100" width="340" height="22" rx="2" fill="rgba(34,197,94,0.30)"/>
  <rect x="140" y="105" width="290" height="12" rx="1" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.85"/>
  <line x1="440" y1="94" x2="440" y2="126" stroke="var(--origam-color__feedback--danger---bg, #ef4444)" stroke-width="3" stroke-linecap="round"/>
  <text x="32" y="115" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace" text-anchor="end">Profit</text>
  <line x1="140" y1="148" x2="620" y2="148" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="140" y="160" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">0</text>
  <text x="260" y="160" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">100</text>
  <text x="380" y="160" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">200</text>
  <text x="500" y="160" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">300</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="148" cy="70" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="148" y="74" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="260" cy="70" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="260" y="74" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="400" cy="62" r="9" fill="var(--origam-color__feedback--danger---bg, rgba(239,68,68,0.85))"/>
  <text x="400" y="66" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="140" cy="148" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="140" y="152" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="36" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <text x="350" y="245" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">② range bands stack left→right; ③ bar overlaid; ④ target tick; ⑤ axis</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chart-bullet&gt;</code> — 6 internal parts. Each bullet row contains stacked qualitative range bands, an actual-value bar, and a target tick.`,
        legend: [
            {
                num: 1,
                cls: '.origam-chart-bullet',
                descriptionKey: 'components.chart_bullet.anatomy.root',
                descriptionFallback: 'Root element. CSS grid with areas: header / body / legend. role="figure" + aria-label from title.'
            },
            {
                num: 2,
                cls: '.origam-chart__bullet-range',
                descriptionKey: 'components.chart_bullet.anatomy.range',
                descriptionFallback: 'SVG <rect> for each qualitative range band. Fill driven by rangeColors palette or per-range color.'
            },
            {
                num: 3,
                cls: '.origam-chart__bullet-bar',
                descriptionKey: 'components.chart_bullet.anatomy.bar',
                descriptionFallback: 'SVG <rect> for the actual-value bar. tabindex="0" and role="button" — keyboard activatable.'
            },
            {
                num: 4,
                cls: '.origam-chart__bullet-target',
                descriptionKey: 'components.chart_bullet.anatomy.target',
                descriptionFallback: 'SVG <line> representing the target/goal tick. stroke-linecap: round.'
            },
            {
                num: 5,
                cls: '.origam-chart__bullet-axis-line',
                descriptionKey: 'components.chart_bullet.anatomy.axis',
                descriptionFallback: 'SVG axis baseline and tick labels. Visible when showAxis=true.'
            },
            {
                num: 6,
                cls: '.origam-chart-bullet__header',
                descriptionKey: 'components.chart_bullet.anatomy.header',
                descriptionFallback: 'Title + subtitle block. Grid area: header. Rendered only when title or subtitle is provided.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-chart-bullet" role="figure" aria-label="KPI Overview">
  <div class="origam-chart-bullet__header">
    <div class="origam-chart-bullet__title">KPI Overview</div>
  </div>

  <div class="origam-chart-bullet__body">
    <svg class="origam-chart-bullet__svg origam-chart__svg" role="img">
      <title>KPI Overview</title>
      <desc>Bullet chart with 3 indicators.</desc>

      <!-- one <g> per bullet row -->
      <g class="origam-chart__bullet-row">
        <!-- qualitative bands -->
        <rect class="origam-chart__bullet-range" />
        <!-- actual-value bar (keyboard activatable) -->
        <rect class="origam-chart__bullet-bar" tabindex="0" role="button" />
        <!-- target tick -->
        <line class="origam-chart__bullet-target" />
        <!-- category label -->
        <text class="origam-chart__bullet-label">Revenue</text>
      </g>

      <!-- axis (showAxis=true) -->
      <g class="origam-chart__bullet-axis">
        <line class="origam-chart__bullet-axis-line" />
        <text class="origam-chart__bullet-axis-tick" />
      </g>
    </svg>

    <!-- tooltip (showTooltip=true) -->
    <origam-chart-tooltip />
  </div>

  <!-- legend (showLegend=true) -->
  <origam-chart-legend />
</div>`,
        classes: [
            { cls: 'origam-chart-bullet', descriptionKey: 'components.chart_bullet.anatomy.root', descriptionFallback: 'Root element — CSS grid layout.' },
            { cls: 'origam-chart-bullet__header', descriptionKey: 'components.chart_bullet.anatomy.header', descriptionFallback: 'Title and subtitle block.' },
            { cls: 'origam-chart-bullet__title', descriptionKey: 'components.chart_bullet.anatomy.title', descriptionFallback: 'Primary chart title.' },
            { cls: 'origam-chart-bullet__subtitle', descriptionKey: 'components.chart_bullet.anatomy.subtitle', descriptionFallback: 'Secondary chart subtitle.' },
            { cls: 'origam-chart-bullet__body', descriptionKey: 'components.chart_bullet.anatomy.body', descriptionFallback: 'Body area containing the SVG.' },
            { cls: 'origam-chart-bullet__svg', descriptionKey: 'components.chart_bullet.anatomy.svg', descriptionFallback: 'SVG canvas.' },
            { cls: 'origam-chart__bullet-row', descriptionKey: 'components.chart_bullet.anatomy.row', descriptionFallback: '<g> grouping one bullet row.' },
            { cls: 'origam-chart__bullet-range', descriptionKey: 'components.chart_bullet.anatomy.range', descriptionFallback: 'Qualitative range band rect.' },
            { cls: 'origam-chart__bullet-bar', descriptionKey: 'components.chart_bullet.anatomy.bar', descriptionFallback: 'Actual-value bar rect.' },
            { cls: 'origam-chart__bullet-bar--active', descriptionKey: 'components.chart_bullet.anatomy.bar_active', descriptionFallback: 'Active modifier applied on hover/focus.' },
            { cls: 'origam-chart__bullet-target', descriptionKey: 'components.chart_bullet.anatomy.target', descriptionFallback: 'Target marker tick line.' },
            { cls: 'origam-chart__bullet-label', descriptionKey: 'components.chart_bullet.anatomy.label', descriptionFallback: 'Category label text.' },
            { cls: 'origam-chart__bullet-axis', descriptionKey: 'components.chart_bullet.anatomy.axis_group', descriptionFallback: 'Axis group (baseline + ticks).' },
            { cls: 'origam-chart__bullet-axis-line', descriptionKey: 'components.chart_bullet.anatomy.axis_line', descriptionFallback: 'Axis baseline line.' },
            { cls: 'origam-chart__bullet-axis-tick', descriptionKey: 'components.chart_bullet.anatomy.axis_tick', descriptionFallback: 'Axis tick label.' },
            { cls: 'origam-chart-bullet--horizontal', descriptionKey: 'components.chart_bullet.anatomy.mod_horizontal', descriptionFallback: 'Modifier for horizontal orientation (default).' },
            { cls: 'origam-chart-bullet--vertical', descriptionKey: 'components.chart_bullet.anatomy.mod_vertical', descriptionFallback: 'Modifier for vertical orientation.' },
            { cls: 'origam-chart-bullet--no-animation', descriptionKey: 'components.chart_bullet.anatomy.mod_no_animation', descriptionFallback: 'Disables entry animation.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---gap',
            defaultValue: '12px',
            descriptionKey: 'components.chart_bullet.css_vars.gap',
            descriptionFallback: 'Gap between header, body and legend areas.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '12px',
            descriptionKey: 'components.chart_bullet.css_vars.padding',
            descriptionFallback: 'Internal padding of the chart root.'
        },
        {
            name: '--origam-chart---background-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.chart_bullet.css_vars.background_color',
            descriptionFallback: 'Background colour of the chart root.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_bullet.css_vars.animation_duration',
            descriptionFallback: 'Entry animation duration. Driven by the animationDuration prop.'
        },
        {
            name: '--origam-chart__bullet-range---opacity',
            defaultValue: '0.55',
            descriptionKey: 'components.chart_bullet.css_vars.range_opacity',
            descriptionFallback: 'Opacity of range band rects.'
        },
        {
            name: '--origam-chart__bullet-target---stroke-width',
            defaultValue: '3',
            descriptionKey: 'components.chart_bullet.css_vars.target_stroke_width',
            descriptionFallback: 'Stroke width of the target marker tick.'
        },
        {
            name: '--origam-chart__axis-label---color',
            defaultValue: 'var(--origam-color-text-secondary, #6b7280)',
            descriptionKey: 'components.chart_bullet.css_vars.axis_label_color',
            descriptionFallback: 'Fill colour of axis labels and category labels.'
        },
        {
            name: '--origam-chart__axis-label---font-size',
            defaultValue: '0.75rem',
            descriptionKey: 'components.chart_bullet.css_vars.axis_label_font_size',
            descriptionFallback: 'Font size of axis labels.'
        },
        {
            name: '--origam-chart__title---font-size',
            defaultValue: '1.125rem',
            descriptionKey: 'components.chart_bullet.css_vars.title_font_size',
            descriptionFallback: 'Font size of the chart title.'
        },
        {
            name: '--origam-chart__title---font-weight',
            defaultValue: '600',
            descriptionKey: 'components.chart_bullet.css_vars.title_font_weight',
            descriptionFallback: 'Font weight of the chart title.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_bullet.a11y.key_tab',
                actionFallback: 'Moves focus through each bullet bar (tabindex="0") and legend items.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_bullet.a11y.key_activate',
                actionFallback: 'Activates the focused bullet bar, firing the point-click emit.'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_bullet.a11y.figure_role',
                noteFallback: 'Root has role="figure" with aria-label from the title prop (falls back to "bullet chart").'
            },
            {
                noteKey: 'components.chart_bullet.a11y.svg_role',
                noteFallback: 'The SVG carries role="img" with a <title> and <desc> for screen readers.'
            },
            {
                noteKey: 'components.chart_bullet.a11y.bar_aria',
                noteFallback: 'Each bullet bar has aria-label describing category, value, target and achievement percentage.'
            },
            {
                noteKey: 'components.chart_bullet.a11y.reduced_motion',
                noteFallback: 'Entry animations are disabled via @media (prefers-reduced-motion: reduce).'
            }
        ]
    } satisfies IComponentA11y
}
