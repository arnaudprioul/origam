/**
 * /components/chart-map — full documentation data for OrigamChartMap.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-map.interface.ts  (props)
 *   - packages/ds/src/components/Chart/OrigamChartMap.vue      (template BEM, aria-*)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_MAP_DOC: IComponentDoc = {
    slug: 'chart-map',
    name: 'ChartMap',
    tag: 'origam-chart-map',
    icon: 'mdi-map-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_map.description',
    descriptionFallback: 'World map chart with two rendering modes: choropleth (country shapes coloured by value gradient) and flight-routes (curved Bezier arcs between country centroid pairs). Built on a 1000 × 500 SVG Mercator projection.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-map--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartMap',

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
        }
    ],

    props: [
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.chart_map.props.series.description',
            descriptionFallback: 'Data series — only series[0] is consumed. Choropleth: data items are IChartMapChoroplethDatum ({code, value, name?}). Flight-routes: items are IChartMapRouteDatum ({from, to, value?, color?}).'
        },
        {
            name: 'mode',
            type: { label: 'TChartMapMode', slug: '', kind: 'primitive' },
            defaultValue: "'choropleth'",
            descriptionKey: 'components.chart_map.props.mode.description',
            descriptionFallback: "Rendering mode. 'choropleth' = country shapes filled by value gradient. 'flight-routes' = curved arcs between country centroid pairs."
        },
        {
            name: 'colorRange',
            type: { label: '[TIntent | string, TIntent | string]', slug: '', kind: 'primitive' },
            defaultValue: "['info', 'danger']",
            descriptionKey: 'components.chart_map.props.color_range.description',
            descriptionFallback: 'Gradient endpoints for choropleth mode. First = min value colour; second = max value colour.'
        },
        {
            name: 'defaultCountryFill',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'rgba(0,0,0,0.08)'",
            descriptionKey: 'components.chart_map.props.default_country_fill.description',
            descriptionFallback: 'Fill colour for countries absent from the dataset.'
        },
        {
            name: 'borderColor',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'rgba(0,0,0,0.2)'",
            descriptionKey: 'components.chart_map.props.border_color.description',
            descriptionFallback: 'Stroke colour applied to all country path outlines.'
        },
        {
            name: 'lineColor',
            type: { label: 'TIntent | string', slug: 'intent', kind: 'type' },
            defaultValue: "'primary'",
            descriptionKey: 'components.chart_map.props.line_color.description',
            descriptionFallback: 'Default stroke colour for flight-route arcs. Overridden per route via datum.color.'
        },
        {
            name: 'nodeRadius',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '4',
            descriptionKey: 'components.chart_map.props.node_radius.description',
            descriptionFallback: 'Radius in SVG pixels of the endpoint circles on each flight route.'
        },
        {
            name: 'routeCurvature',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.3',
            descriptionKey: 'components.chart_map.props.route_curvature.description',
            descriptionFallback: 'Bezier control-point offset as a fraction of the chord length [0..1]. 0 = straight line; 0.3 = gentle arc (default).'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_map.props.show_legend.description',
            descriptionFallback: 'Renders the inline choropleth gradient legend in the SVG.'
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_map.props.show_tooltip.description',
            descriptionFallback: 'Shows a tooltip on hover/focus of a country or route.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_map.props.animated.description',
            descriptionFallback: 'Fades data countries/routes in on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_map.props.animation_duration.description',
            descriptionFallback: 'Entry animation duration in ms.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_map.props.title.description',
            descriptionFallback: 'Optional title rendered above the map.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_map.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_map.props.height.description',
            descriptionFallback: 'Component height. Accepts a CSS length or a number (converted to px). Inherits from IDimensionProps.'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_map.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut. When set, overrides height.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_map.props.bg_color.description',
            descriptionFallback: 'Background colour applied to the chart root.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_map.props.y_axis_format.description',
            descriptionFallback: 'Value formatter used in tooltips and the choropleth gradient legend min/max labels.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_map.emits.point_click.description',
            descriptionFallback: 'Fired when the user clicks or keyboard-activates a country (choropleth) or a route (flight-routes).'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_map.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_map.emits.series_toggle.description',
            descriptionFallback: 'Fired after a legend click with the intended next visibility value.'
        }
    ],

    slots: [
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_map.slots.title.description',
            descriptionFallback: 'Replaces the default title/subtitle block.'
        },
        {
            slot: 'tooltip',
            slotProps: '{ point, series, category }',
            descriptionKey: 'components.chart_map.slots.tooltip.description',
            descriptionFallback: 'Replaces the default tooltip body for a hovered country or route.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_map.slots.empty.description',
            descriptionFallback: 'Shown when series is empty or has no renderable data.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_map.examples.choropleth.title',
            titleFallback: 'Choropleth map',
            lang: 'vue',
            code: `<template>
  <origam-chart-map
    :series="[{ name: 'Population density', data: countries }]"
    mode="choropleth"
    :color-range="['info', 'danger']"
    title="Population density"
    :aspect-ratio="'2/1'"
  />
</template>

<script setup lang="ts">
const countries = [
  { code: 'FR', value: 119, name: 'France' },
  { code: 'DE', value: 240, name: 'Germany' },
  { code: 'ES', value: 94, name: 'Spain' },
  { code: 'IT', value: 201, name: 'Italy' },
  { code: 'GB', value: 281, name: 'United Kingdom' }
]
</script>`
        },
        {
            titleKey: 'components.chart_map.examples.routes.title',
            titleFallback: 'Flight routes',
            lang: 'vue',
            code: `<template>
  <origam-chart-map
    :series="[{ name: 'Routes', data: routes }]"
    mode="flight-routes"
    line-color="primary"
    title="Flight connections"
    :aspect-ratio="'2/1'"
  />
</template>

<script setup lang="ts">
const routes = [
  { from: 'FR', to: 'US', value: 120 },
  { from: 'FR', to: 'JP', value: 45 },
  { from: 'DE', to: 'CN', value: 88 }
]
</script>`
        },
        {
            titleKey: 'components.chart_map.examples.custom_colors.title',
            titleFallback: 'Custom fills',
            lang: 'vue',
            code: `<template>
  <origam-chart-map
    :series="[{ name: 'Score', data: scores }]"
    mode="choropleth"
    :color-range="['success', 'danger']"
    default-country-fill="rgba(0,0,0,0.05)"
    border-color="rgba(255,255,255,0.3)"
    :aspect-ratio="'2/1'"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-chart-map',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamChartMap',
        svgDesc: 'Schematic of the ChartMap component with 7 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="200" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="32" y="28" width="636" height="16" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="350" y="40" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__header (title + subtitle)</text>
  <rect x="32" y="50" width="636" height="120" rx="3" fill="rgba(8,145,178,0.05)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <ellipse cx="200" cy="100" rx="50" ry="30" fill="color-mix(in srgb,rgba(239,68,68,0.7) 80%,rgba(8,145,178,0.7))" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>
  <ellipse cx="310" cy="90" rx="60" ry="35" fill="color-mix(in srgb,rgba(239,68,68,0.7) 40%,rgba(8,145,178,0.7))" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>
  <ellipse cx="430" cy="110" rx="40" ry="28" fill="color-mix(in srgb,rgba(239,68,68,0.7) 65%,rgba(8,145,178,0.7))" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>
  <ellipse cx="540" cy="95" rx="45" ry="30" fill="rgba(0,0,0,0.08)" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>
  <path d="M 200,100 Q 255,60 310,90" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2" fill="none" opacity="0.7" stroke-linecap="round"/>
  <circle cx="200" cy="100" r="4" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="310" cy="90" r="4" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <rect x="32" y="178" width="200" height="10" rx="2" fill="url(#origam-map-grad-anatomy)"/>
  <defs><linearGradient id="origam-map-grad-anatomy" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="rgba(8,145,178,0.8)"/><stop offset="100%" stop-color="rgba(239,68,68,0.8)"/></linearGradient></defs>
  <text x="32" y="200" font-size="7" fill="var(--origam-color__text---tertiary, #7e5fb0)">0</text>
  <text x="232" y="200" font-size="7" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="end">500</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="40" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="40" y="62" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="200" cy="110" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="200" y="114" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="540" cy="105" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="540" y="109" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="257" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="257" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="200" cy="100" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)" opacity="0.8"/>
  <text x="200" y="104" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <circle cx="40" cy="183" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="40" y="187" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">7</text>
  <text x="350" y="225" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">③ choropleth fill = color-mix; ⑤ Bezier arc (flight-routes); ④ no-data fill = defaultCountryFill</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chart-map&gt;</code> — 7 internal parts. SVG canvas: 1000 × 500 Mercator projection. Two modes: choropleth gradient or flight-route Bezier arcs.`,
        legend: [
            {
                num: 1,
                cls: '.origam-chart-map',
                descriptionKey: 'components.chart_map.anatomy.root',
                descriptionFallback: 'Root element. CSS grid: header / body areas. role="figure" + aria-label from title.'
            },
            {
                num: 2,
                cls: '.origam-chart__map-backdrop',
                descriptionKey: 'components.chart_map.anatomy.backdrop',
                descriptionFallback: '<g> rendering all country <path> elements. Built from WORLD_GEOGRAPHIC_DATA projected to 1000 × 500 via Mercator.'
            },
            {
                num: 3,
                cls: '.origam-chart__map-country--has-data',
                descriptionKey: 'components.chart_map.anatomy.country_has_data',
                descriptionFallback: 'BEM modifier for countries with data. cursor: pointer + brightness filter on hover. tabindex="0" + role="button".'
            },
            {
                num: 4,
                cls: '.origam-chart__map-country (no data)',
                descriptionKey: 'components.chart_map.anatomy.country_no_data',
                descriptionFallback: 'Countries absent from the dataset. Fill = defaultCountryFill. cursor: default, not focusable.'
            },
            {
                num: 5,
                cls: '.origam-chart__map-route',
                descriptionKey: 'components.chart_map.anatomy.route',
                descriptionFallback: 'Quadratic Bezier arc in flight-routes mode (M x1,y1 Q cx,cy x2,y2). Stroke width driven by log(value + 1) × 1.5.'
            },
            {
                num: 6,
                cls: '.origam-chart__map-node',
                descriptionKey: 'components.chart_map.anatomy.node',
                descriptionFallback: 'Endpoint circles on each route, deduplicated. pointer-events: none.'
            },
            {
                num: 7,
                cls: '.origam-chart__map-gradient-legend',
                descriptionKey: 'components.chart_map.anatomy.gradient_legend',
                descriptionFallback: 'Inline SVG gradient bar with min/max labels. Bottom-left corner of the SVG. Visible when showLegend=true and mode=choropleth.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-chart-map" role="figure" aria-label="Population density">
  <header class="origam-chart-map__header">
    <div class="origam-chart-map__title">Population density</div>
  </header>

  <div class="origam-chart-map__body">
    <svg class="origam-chart-map__svg origam-chart__svg" role="img" viewBox="0 0 1000 500">
      <title>Population density</title>
      <desc>Choropleth map with 5 countries in the dataset.</desc>

      <defs>
        <linearGradient id="origam-map-legend-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" />
          <stop offset="100%" />
        </linearGradient>
      </defs>

      <!-- country shapes (mode=choropleth) -->
      <g class="origam-chart__map-backdrop">
        <!-- countries with data (choropleth fill + interactive) -->
        <path
          class="origam-chart__map-country origam-chart__map-country--has-data"
          tabindex="0"
          role="button"
          aria-label="France: 119"
        />
        <!-- countries without data (defaultCountryFill) -->
        <path class="origam-chart__map-country" tabindex="-1" />
      </g>

      <!-- routes (mode=flight-routes) -->
      <g class="origam-chart__map-routes">
        <path
          class="origam-chart__map-route"
          tabindex="0"
          role="button"
          aria-label="FR to US: 120"
        />
        <circle class="origam-chart__map-node" />
      </g>

      <!-- choropleth gradient legend (showLegend=true) -->
      <g class="origam-chart__map-gradient-legend">
        <rect fill="url(#origam-map-legend-gradient)" />
        <text class="origam-chart__map-legend-label">0</text>
        <text class="origam-chart__map-legend-label">500</text>
      </g>
    </svg>

    <!-- tooltip -->
    <origam-chart-tooltip />
  </div>
</div>`,
        classes: [
            { cls: 'origam-chart-map', descriptionKey: 'components.chart_map.anatomy.root', descriptionFallback: 'Root element.' },
            { cls: 'origam-chart-map__header', descriptionKey: 'components.chart_map.anatomy.header', descriptionFallback: 'Title/subtitle block.' },
            { cls: 'origam-chart-map__title', descriptionKey: 'components.chart_map.anatomy.title', descriptionFallback: 'Primary title.' },
            { cls: 'origam-chart-map__subtitle', descriptionKey: 'components.chart_map.anatomy.subtitle', descriptionFallback: 'Subtitle.' },
            { cls: 'origam-chart-map__body', descriptionKey: 'components.chart_map.anatomy.body', descriptionFallback: 'Body containing the SVG.' },
            { cls: 'origam-chart-map__svg', descriptionKey: 'components.chart_map.anatomy.svg', descriptionFallback: 'SVG canvas — 1000 × 500 Mercator viewBox.' },
            { cls: 'origam-chart__map-backdrop', descriptionKey: 'components.chart_map.anatomy.backdrop', descriptionFallback: '<g> holding all country <path> elements.' },
            { cls: 'origam-chart__map-country', descriptionKey: 'components.chart_map.anatomy.country', descriptionFallback: 'Country <path>.' },
            { cls: 'origam-chart__map-country--has-data', descriptionKey: 'components.chart_map.anatomy.country_has_data', descriptionFallback: 'Interactive country (has a value in the dataset).' },
            { cls: 'origam-chart__map-country--active', descriptionKey: 'components.chart_map.anatomy.country_active', descriptionFallback: 'Hovered/active country.' },
            { cls: 'origam-chart__map-routes', descriptionKey: 'components.chart_map.anatomy.routes', descriptionFallback: '<g> holding route arcs (flight-routes mode).' },
            { cls: 'origam-chart__map-route', descriptionKey: 'components.chart_map.anatomy.route', descriptionFallback: 'Route Bezier arc.' },
            { cls: 'origam-chart__map-route--active', descriptionKey: 'components.chart_map.anatomy.route_active', descriptionFallback: 'Hovered/active route.' },
            { cls: 'origam-chart__map-node', descriptionKey: 'components.chart_map.anatomy.node', descriptionFallback: 'Route endpoint circle.' },
            { cls: 'origam-chart__map-gradient-legend', descriptionKey: 'components.chart_map.anatomy.gradient_legend', descriptionFallback: 'Inline gradient legend group.' },
            { cls: 'origam-chart__map-legend-label', descriptionKey: 'components.chart_map.anatomy.legend_label', descriptionFallback: 'Min/max label beside the gradient bar.' },
            { cls: 'origam-chart-map--choropleth', descriptionKey: 'components.chart_map.anatomy.mod_choropleth', descriptionFallback: 'Modifier for choropleth mode.' },
            { cls: 'origam-chart-map--flight-routes', descriptionKey: 'components.chart_map.anatomy.mod_routes', descriptionFallback: 'Modifier for flight-routes mode.' },
            { cls: 'origam-chart-map--no-animation', descriptionKey: 'components.chart_map.anatomy.mod_no_animation', descriptionFallback: 'Disables entry animation.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---gap',
            defaultValue: '12px',
            descriptionKey: 'components.chart_map.css_vars.gap',
            descriptionFallback: 'Gap between header and body areas.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '12px',
            descriptionKey: 'components.chart_map.css_vars.padding',
            descriptionFallback: 'Internal padding of the chart root.'
        },
        {
            name: '--origam-chart---background-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.chart_map.css_vars.background_color',
            descriptionFallback: 'Background colour of the chart root.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_map.css_vars.animation_duration',
            descriptionFallback: 'Entry animation duration. Driven by animationDuration prop.'
        },
        {
            name: '--origam-chart__map---stroke-width',
            defaultValue: '1',
            descriptionKey: 'components.chart_map.css_vars.stroke_width',
            descriptionFallback: 'Stroke width of all country path outlines.'
        },
        {
            name: '--origam-chart__map-legend-label---font-size',
            defaultValue: '0.625rem',
            descriptionKey: 'components.chart_map.css_vars.legend_label_font_size',
            descriptionFallback: 'Font size of min/max labels on the gradient legend.'
        },
        {
            name: '--origam-chart__map-legend-label---color',
            defaultValue: 'var(--origam-color-text-secondary, #6b7280)',
            descriptionKey: 'components.chart_map.css_vars.legend_label_color',
            descriptionFallback: 'Fill colour of gradient legend labels.'
        },
        {
            name: '--origam-chart__title---font-size',
            defaultValue: '1.125rem',
            descriptionKey: 'components.chart_map.css_vars.title_font_size',
            descriptionFallback: 'Font size of the chart title.'
        },
        {
            name: '--origam-chart__title---font-weight',
            defaultValue: '600',
            descriptionKey: 'components.chart_map.css_vars.title_font_weight',
            descriptionFallback: 'Font weight of the chart title.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_map.a11y.key_tab',
                actionFallback: 'Moves focus through interactive countries (choropleth) or routes (flight-routes). Non-data countries have tabindex="-1" and are skipped.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_map.a11y.key_activate',
                actionFallback: 'Activates the focused country or route, firing the point-click emit.'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_map.a11y.figure_role',
                noteFallback: 'Root has role="figure" with aria-label from the title prop (falls back to "map chart").'
            },
            {
                noteKey: 'components.chart_map.a11y.svg_role',
                noteFallback: 'The SVG carries role="img" with a <title> and <desc> listing mode-specific counts (N countries or N routes).'
            },
            {
                noteKey: 'components.chart_map.a11y.country_aria',
                noteFallback: 'Choropleth: each data country has aria-label "name: value". Non-data countries carry just the code as label.'
            },
            {
                noteKey: 'components.chart_map.a11y.route_aria',
                noteFallback: 'Flight-routes: each arc has aria-label "FROM to TO: value".'
            },
            {
                noteKey: 'components.chart_map.a11y.reduced_motion',
                noteFallback: 'Entry animations are disabled via @media (prefers-reduced-motion: reduce).'
            }
        ]
    } satisfies IComponentA11y
}
