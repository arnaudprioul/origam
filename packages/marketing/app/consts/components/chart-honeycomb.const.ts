/**
 * /components/chart-honeycomb — full documentation data for OrigamChartHoneycomb.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-honeycomb.interface.ts  (props)
 *   - packages/ds/src/components/Chart/OrigamChartHoneycomb.vue      (template BEM, aria-*)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_HONEYCOMB_DOC: IComponentDoc = {
    slug: 'chart-honeycomb',
    name: 'ChartHoneycomb',
    tag: 'origam-chart-honeycomb',
    icon: 'mdi-hexagon-multiple-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_honeycomb.description',
    descriptionFallback: 'Hexagonal tile-map chart. Renders a grid of SVG <polygon> hexagons positioned by (x=col, y=row) indices. Supports pointy-top and flat-top orientations, categorical and heatmap colour modes.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-honeycomb--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartHoneycomb',

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
            descriptionKey: 'components.chart_honeycomb.props.series.description',
            descriptionFallback: 'Data series — only series[0] is consumed. Each datum must supply x (col), y (row) and optionally name, value, color.'
        },
        {
            name: 'orientation',
            type: { label: 'TChartHoneycombOrientation', slug: '', kind: 'primitive' },
            defaultValue: "'pointy-top'",
            descriptionKey: 'components.chart_honeycomb.props.orientation.description',
            descriptionFallback: "Hex vertex orientation. 'pointy-top' = vertex at top (default). 'flat-top' = flat edge at top."
        },
        {
            name: 'colorMode',
            type: { label: 'TChartHoneycombColorMode', slug: '', kind: 'primitive' },
            defaultValue: "'categorical'",
            descriptionKey: 'components.chart_honeycomb.props.color_mode.description',
            descriptionFallback: "Colour strategy. 'categorical' cycles the colorScheme palette; 'heatmap' interpolates value between heatmapColorRange endpoints."
        },
        {
            name: 'heatmapColorRange',
            type: { label: '[TIntent | string, TIntent | string]', slug: '', kind: 'primitive' },
            defaultValue: "['info', 'danger']",
            descriptionKey: 'components.chart_honeycomb.props.heatmap_color_range.description',
            descriptionFallback: 'Two-stop colour range for colorMode="heatmap". First = min value colour; second = max value colour.'
        },
        {
            name: 'tileSize',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '30',
            descriptionKey: 'components.chart_honeycomb.props.tile_size.description',
            descriptionFallback: 'Hex side-length in SVG user units. Controls how large each tile is.'
        },
        {
            name: 'tileGap',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '2',
            descriptionKey: 'components.chart_honeycomb.props.tile_gap.description',
            descriptionFallback: 'Gap between adjacent tiles in SVG user units.'
        },
        {
            name: 'showLabel',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_honeycomb.props.show_label.description',
            descriptionFallback: "Renders the tile's name (or value when name is absent) centred in the tile."
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_honeycomb.props.show_legend.description',
            descriptionFallback: 'Renders the ChartLegend block.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_honeycomb.props.legend_position.description',
            descriptionFallback: "Position of the legend: 'top' | 'bottom' | 'left' | 'right'."
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_honeycomb.props.show_tooltip.description',
            descriptionFallback: 'Shows a tooltip on hover/focus with the tile name and value.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_honeycomb.props.animated.description',
            descriptionFallback: 'Fades tiles in on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_honeycomb.props.animation_duration.description',
            descriptionFallback: 'Entry animation duration in ms.'
        },
        {
            name: 'colorScheme',
            type: { label: '(TIntent | string)[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_honeycomb.props.color_scheme.description',
            descriptionFallback: 'Palette cycled in categorical mode. Defaults to the 8 origam intent colours when empty.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_honeycomb.props.title.description',
            descriptionFallback: 'Optional title rendered above the plotting area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_honeycomb.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '400',
            descriptionKey: 'components.chart_honeycomb.props.height.description',
            descriptionFallback: 'Component height. Accepts a CSS length or a number (converted to px).'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_honeycomb.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut. When set, overrides height.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_honeycomb.props.bg_color.description',
            descriptionFallback: 'Background colour applied to the chart root.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: number | string) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_honeycomb.props.x_axis_format.description',
            descriptionFallback: 'Column index formatter used in tooltips.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_honeycomb.props.y_axis_format.description',
            descriptionFallback: 'Row index formatter used in labels and tooltips.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_honeycomb.emits.point_click.description',
            descriptionFallback: 'Fired when the user clicks or keyboard-activates a tile.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_honeycomb.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_honeycomb.emits.series_toggle.description',
            descriptionFallback: 'Fired after a legend click with the intended next visibility value.'
        }
    ],

    slots: [
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_honeycomb.slots.title.description',
            descriptionFallback: 'Replaces the default title/subtitle block.'
        },
        {
            slot: 'tooltip',
            slotProps: '{ point, series, category }',
            descriptionKey: 'components.chart_honeycomb.slots.tooltip.description',
            descriptionFallback: 'Replaces the default tooltip body for a hovered tile.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series, index, visible }',
            descriptionKey: 'components.chart_honeycomb.slots.legend_item.description',
            descriptionFallback: 'Replaces one legend entry with custom markup.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_honeycomb.slots.empty.description',
            descriptionFallback: 'Shown when series is empty or every tile is hidden.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_honeycomb.examples.basic.title',
            titleFallback: 'Categorical honeycomb',
            lang: 'vue',
            code: `<template>
  <origam-chart-honeycomb
    :series="[{ name: 'Tiles', data: tiles }]"
    title="Hex tile map"
    height="320"
  />
</template>

<script setup lang="ts">
const tiles = [
  { x: 0, y: 0, name: 'A' }, { x: 1, y: 0, name: 'B' }, { x: 2, y: 0, name: 'C' },
  { x: 0, y: 1, name: 'D' }, { x: 1, y: 1, name: 'E' }, { x: 2, y: 1, name: 'F' }
]
</script>`
        },
        {
            titleKey: 'components.chart_honeycomb.examples.heatmap.title',
            titleFallback: 'Heatmap colour mode',
            lang: 'vue',
            code: `<template>
  <origam-chart-honeycomb
    :series="[{ name: 'Intensity', data: tiles }]"
    color-mode="heatmap"
    :heatmap-color-range="['info', 'danger']"
    title="Activity intensity"
    height="300"
  />
</template>

<script setup lang="ts">
const tiles = Array.from({ length: 12 }, (_, i) => ({
  x: i % 4, y: Math.floor(i / 4), value: Math.round(Math.random() * 100)
}))
</script>`
        },
        {
            titleKey: 'components.chart_honeycomb.examples.flat_top.title',
            titleFallback: 'Flat-top orientation',
            lang: 'vue',
            code: `<template>
  <origam-chart-honeycomb
    :series="[{ name: 'US States', data: tiles }]"
    orientation="flat-top"
    :tile-size="28"
    height="280"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-chart-honeycomb',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamChartHoneycomb',
        svgDesc: 'Schematic of the ChartHoneycomb component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="220" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="32" y="28" width="636" height="16" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="350" y="40" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__header (title)</text>
  <polygon points="140,95 165,81 190,95 190,122 165,136 140,122" fill="var(--origam-color__action--primary---bg, rgba(124,58,237,0.8))" stroke="var(--origam-color__surface---raised,#fff)" stroke-width="2"/>
  <text x="165" y="110" font-size="9" fill="#fff" text-anchor="middle" dominant-baseline="middle" font-family="'JetBrains Mono',monospace">A</text>
  <polygon points="193,95 218,81 243,95 243,122 218,136 193,122" fill="var(--origam-color__feedback--success---bg, rgba(34,197,94,0.8))" stroke="var(--origam-color__surface---raised,#fff)" stroke-width="2"/>
  <text x="218" y="110" font-size="9" fill="#fff" text-anchor="middle" dominant-baseline="middle" font-family="'JetBrains Mono',monospace">B</text>
  <polygon points="246,95 271,81 296,95 296,122 271,136 246,122" fill="var(--origam-color__feedback--warning---bg, rgba(234,179,8,0.8))" stroke="var(--origam-color__surface---raised,#fff)" stroke-width="2"/>
  <text x="271" y="110" font-size="9" fill="#fff" text-anchor="middle" dominant-baseline="middle" font-family="'JetBrains Mono',monospace">C</text>
  <polygon points="166,136 191,122 216,136 216,163 191,177 166,163" fill="var(--origam-color__feedback--danger---bg, rgba(239,68,68,0.8))" stroke="var(--origam-color__surface---raised,#fff)" stroke-width="2"/>
  <text x="191" y="151" font-size="9" fill="#fff" text-anchor="middle" dominant-baseline="middle" font-family="'JetBrains Mono',monospace">D</text>
  <polygon points="219,136 244,122 269,136 269,163 244,177 219,163" fill="var(--origam-color__feedback--info---bg, rgba(8,145,178,0.8))" stroke="var(--origam-color__surface---raised,#fff)" stroke-width="2"/>
  <text x="244" y="151" font-size="9" fill="#fff" text-anchor="middle" dominant-baseline="middle" font-family="'JetBrains Mono',monospace">E</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="148" cy="103" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="148" y="107" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="165" cy="115" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="165" y="119" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="165" cy="132" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="165" y="136" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="36" cy="36" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="40" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <text x="350" y="245" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">② tile polygon — points computed by tileSize × orientation; ③ label centred at (cx, cy)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chart-honeycomb&gt;</code> — 5 internal parts. Hexagon points computed in JavaScript from <code>tileSize</code> and <code>orientation</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-chart-honeycomb',
                descriptionKey: 'components.chart_honeycomb.anatomy.root',
                descriptionFallback: 'Root element. CSS grid with areas: header / body / legend. role="figure" + aria-label from title.'
            },
            {
                num: 2,
                cls: '.origam-chart__honeycomb-tile',
                descriptionKey: 'components.chart_honeycomb.anatomy.tile',
                descriptionFallback: 'SVG <polygon> for each tile. Points computed from tileSize, col/row index and orientation. tabindex="0" + role="button".'
            },
            {
                num: 3,
                cls: '.origam-chart__honeycomb-label',
                descriptionKey: 'components.chart_honeycomb.anatomy.label',
                descriptionFallback: "Text centred at the tile's (cx, cy). Shows name or formatted value. Hidden when showLabel=false."
            },
            {
                num: 4,
                cls: '.origam-chart__honeycomb-tile--active',
                descriptionKey: 'components.chart_honeycomb.anatomy.tile_active',
                descriptionFallback: 'BEM modifier applied on hover/focus — adds brightness filter.'
            },
            {
                num: 5,
                cls: '.origam-chart-honeycomb__header',
                descriptionKey: 'components.chart_honeycomb.anatomy.header',
                descriptionFallback: 'Title and subtitle block. Rendered only when title or subtitle is provided.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-chart-honeycomb" role="figure" aria-label="Hex tile map">
  <header class="origam-chart-honeycomb__header">
    <div class="origam-chart-honeycomb__title">Hex tile map</div>
  </header>

  <div class="origam-chart-honeycomb__body">
    <svg class="origam-chart-honeycomb__svg origam-chart__svg" role="img">
      <title>Hex tile map</title>
      <desc>Honeycomb chart with 6 tiles.</desc>

      <g class="origam-chart__honeycomb-series">
        <!-- one group per tile -->
        <g class="origam-chart__honeycomb-tile-group">
          <!-- hex polygon (keyboard activatable) -->
          <polygon
            class="origam-chart__honeycomb-tile"
            points="…"
            tabindex="0"
            role="button"
            aria-label="A"
          />
          <!-- centred label -->
          <text class="origam-chart__honeycomb-label">A</text>
        </g>
      </g>
    </svg>

    <!-- tooltip (showTooltip=true) -->
    <origam-chart-tooltip />
  </div>

  <!-- legend (showLegend=true) -->
  <origam-chart-legend />
</div>`,
        classes: [
            { cls: 'origam-chart-honeycomb', descriptionKey: 'components.chart_honeycomb.anatomy.root', descriptionFallback: 'Root element.' },
            { cls: 'origam-chart-honeycomb__header', descriptionKey: 'components.chart_honeycomb.anatomy.header', descriptionFallback: 'Title/subtitle block.' },
            { cls: 'origam-chart-honeycomb__title', descriptionKey: 'components.chart_honeycomb.anatomy.title', descriptionFallback: 'Primary title.' },
            { cls: 'origam-chart-honeycomb__subtitle', descriptionKey: 'components.chart_honeycomb.anatomy.subtitle', descriptionFallback: 'Subtitle.' },
            { cls: 'origam-chart-honeycomb__body', descriptionKey: 'components.chart_honeycomb.anatomy.body', descriptionFallback: 'Body containing the SVG.' },
            { cls: 'origam-chart-honeycomb__svg', descriptionKey: 'components.chart_honeycomb.anatomy.svg', descriptionFallback: 'SVG canvas — viewBox auto-computed from tile positions.' },
            { cls: 'origam-chart__honeycomb-tile-group', descriptionKey: 'components.chart_honeycomb.anatomy.tile_group', descriptionFallback: '<g> grouping one tile and its label.' },
            { cls: 'origam-chart__honeycomb-tile', descriptionKey: 'components.chart_honeycomb.anatomy.tile', descriptionFallback: 'Hex polygon.' },
            { cls: 'origam-chart__honeycomb-tile--active', descriptionKey: 'components.chart_honeycomb.anatomy.tile_active', descriptionFallback: 'Active state modifier.' },
            { cls: 'origam-chart__honeycomb-label', descriptionKey: 'components.chart_honeycomb.anatomy.label', descriptionFallback: 'Centred tile label.' },
            { cls: 'origam-chart-honeycomb--pointy-top', descriptionKey: 'components.chart_honeycomb.anatomy.mod_pointy', descriptionFallback: 'Modifier for pointy-top orientation.' },
            { cls: 'origam-chart-honeycomb--flat-top', descriptionKey: 'components.chart_honeycomb.anatomy.mod_flat', descriptionFallback: 'Modifier for flat-top orientation.' },
            { cls: 'origam-chart-honeycomb--categorical', descriptionKey: 'components.chart_honeycomb.anatomy.mod_categorical', descriptionFallback: 'Modifier for categorical colour mode.' },
            { cls: 'origam-chart-honeycomb--heatmap', descriptionKey: 'components.chart_honeycomb.anatomy.mod_heatmap', descriptionFallback: 'Modifier for heatmap colour mode.' },
            { cls: 'origam-chart-honeycomb--no-animation', descriptionKey: 'components.chart_honeycomb.anatomy.mod_no_animation', descriptionFallback: 'Disables entry animation.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chart---gap',
            defaultValue: '12px',
            descriptionKey: 'components.chart_honeycomb.css_vars.gap',
            descriptionFallback: 'Gap between header, body and legend areas.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '12px',
            descriptionKey: 'components.chart_honeycomb.css_vars.padding',
            descriptionFallback: 'Internal padding of the chart root.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_honeycomb.css_vars.animation_duration',
            descriptionFallback: 'Entry animation duration. Driven by animationDuration prop.'
        },
        {
            name: '--origam-chart__honeycomb---stroke-color',
            defaultValue: 'var(--origam-color-surface-default, #ffffff)',
            descriptionKey: 'components.chart_honeycomb.css_vars.stroke_color',
            descriptionFallback: 'Stroke colour applied to each tile polygon (creates gap between tiles).'
        },
        {
            name: '--origam-chart__honeycomb---stroke-width',
            defaultValue: '2',
            descriptionKey: 'components.chart_honeycomb.css_vars.stroke_width',
            descriptionFallback: 'Stroke width of tile polygons.'
        },
        {
            name: '--origam-chart__honeycomb-label---font-size',
            defaultValue: '0.625rem',
            descriptionKey: 'components.chart_honeycomb.css_vars.label_font_size',
            descriptionFallback: 'Font size of the centred tile label.'
        },
        {
            name: '--origam-chart__honeycomb-label---font-weight',
            defaultValue: '600',
            descriptionKey: 'components.chart_honeycomb.css_vars.label_font_weight',
            descriptionFallback: 'Font weight of the centred tile label.'
        },
        {
            name: '--origam-chart__honeycomb-label---color',
            defaultValue: '#ffffff',
            descriptionKey: 'components.chart_honeycomb.css_vars.label_color',
            descriptionFallback: 'Fill colour of the centred tile label.'
        },
        {
            name: '--origam-chart__title---font-size',
            defaultValue: '1.125rem',
            descriptionKey: 'components.chart_honeycomb.css_vars.title_font_size',
            descriptionFallback: 'Font size of the chart title.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_honeycomb.a11y.key_tab',
                actionFallback: 'Moves focus through each hex tile (tabindex="0") and legend items.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_honeycomb.a11y.key_activate',
                actionFallback: 'Activates the focused tile, firing the point-click emit.'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_honeycomb.a11y.figure_role',
                noteFallback: 'Root has role="figure" with aria-label from the title prop (falls back to "honeycomb chart").'
            },
            {
                noteKey: 'components.chart_honeycomb.a11y.svg_role',
                noteFallback: 'The SVG carries role="img" with a <title> and <desc> listing the tile count.'
            },
            {
                noteKey: 'components.chart_honeycomb.a11y.tile_aria',
                noteFallback: 'Each tile has aria-label derived from its name and value (e.g. "A: 42").'
            },
            {
                noteKey: 'components.chart_honeycomb.a11y.reduced_motion',
                noteFallback: 'Entry animations are disabled via @media (prefers-reduced-motion: reduce).'
            }
        ]
    } satisfies IComponentA11y
}
