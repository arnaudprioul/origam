/**
 * /components/chart-polar — documentation data for OrigamChartPolar.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-polar.interface.ts       (props)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts        (base props)
 *   - packages/ds/src/components/Chart/OrigamChartPolar.vue           (template BEM, aria-*)
 */
import type {
    IComponentDoc,
    IComponentA11y,
    IComponentPreviewVariant
} from '~/interfaces/components-catalog.interface'

export const CHART_POLAR_DOC: IComponentDoc = {
    slug: 'chart-polar',
    name: 'ChartPolar',
    tag: 'origam-chart-polar',
    icon: 'mdi-chart-pie',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_polar.description',
    descriptionFallback: 'Polar chart (pie / donut) with animated slices, interactive legend, tooltip, and optional drilldown navigation.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-polar--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartPolar',

    parentSlug: 'chart',

    family: [
        {
            slug: 'chart-polar-bar',
            name: 'ChartPolarBar',
            descriptionKey: 'components.catalog.chart_polar_bar.description',
            descriptionFallback: 'Nightingale-rose (polar bar) chart with variable-radius wedges.'
        }
    ],

    related: [
        {
            slug: 'chart',
            name: 'Chart',
            kind: 'component',
            descriptionKey: 'components.catalog.chart.description',
            descriptionFallback: 'Universal chart shell — delegates to per-type chart components.'
        }
    ],

    props: [
        {
            name: 'series',
            type: { label: 'IChartSeries[]', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.chart_polar.props.series.description',
            descriptionFallback: 'Data series. Each series contains a name, optional color and a data array. Empty array renders the #empty slot.'
        },
        {
            name: 'type',
            type: { label: "'pie' | 'donut'", slug: '', kind: 'primitive' },
            defaultValue: "'pie'",
            descriptionKey: 'components.chart_polar.props.type.description',
            descriptionFallback: 'Polar visualisation primitive. pie = filled slices; donut = ring with a centre hole.'
        },
        {
            name: 'categories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_polar.props.categories.description',
            descriptionFallback: 'Labels for each data point. Used in the legend and tooltip.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar.props.title.description',
            descriptionFallback: 'Optional chart title rendered above the plotting area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'donutHoleSize',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.6',
            descriptionKey: 'components.chart_polar.props.donut_hole_size.description',
            descriptionFallback: 'Inner-radius fraction for type=donut. 0 = no hole, 1 = zero-thickness ring. Ignored for type=pie.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_polar.props.show_legend.description',
            descriptionFallback: 'Toggle the legend block.'
        },
        {
            name: 'legendPosition',
            type: { label: "'top' | 'bottom' | 'left' | 'right'", slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_polar.props.legend_position.description',
            descriptionFallback: 'Anchor position of the legend relative to the chart body.'
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_polar.props.show_tooltip.description',
            descriptionFallback: 'Toggle the hover tooltip.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_polar.props.animated.description',
            descriptionFallback: 'Animate slices on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_polar.props.animation_duration.description',
            descriptionFallback: 'Animation duration in milliseconds.'
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_polar.props.color_scheme.description',
            descriptionFallback: 'Custom colour palette cycled across slices when a series has no pinned color.'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut (e.g. "1/1"). When set, overrides the height prop.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar.props.x_axis_format.description',
            descriptionFallback: 'Formatter applied to the tooltip X label (category name or index).'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar.props.y_axis_format.description',
            descriptionFallback: 'Formatter applied to the tooltip Y value.'
        },
        {
            name: 'drilldown',
            type: { label: 'IChartDrilldownProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar.props.drilldown.description',
            descriptionFallback: 'Drilldown configuration. When provided, slices with a drilldown link trigger chart-level navigation with a breadcrumb nav.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '300',
            descriptionKey: 'components.chart_polar.props.height.description',
            descriptionFallback: 'Chart container height. Accepts a CSS length or a number (px).'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar.props.bg_color.description',
            descriptionFallback: 'Background color of the chart container.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_polar.emits.point_click.description',
            descriptionFallback: 'Fired when a slice is clicked or activated via keyboard. Carries the point data and the triggering event.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_polar.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend item.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_polar.emits.series_toggle.description',
            descriptionFallback: 'Fired when a series visibility is toggled via the legend. Second arg is the next visible state.'
        },
        {
            event: 'drill',
            payload: { label: 'IChartDrilldownLink, IChartPoint', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_polar.emits.drill.description',
            descriptionFallback: 'Fired when the user drills into a sub-dataset via a drilldown link.'
        },
        {
            event: 'drill-up',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_polar.emits.drill_up.description',
            descriptionFallback: 'Fired when the user navigates back one drilldown level.'
        }
    ],

    slots: [
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_polar.slots.title.description',
            descriptionFallback: 'Replaces the default title/subtitle header block.'
        },
        {
            slot: 'tooltip',
            slotProps: '{ point, series, category }',
            descriptionKey: 'components.chart_polar.slots.tooltip.description',
            descriptionFallback: 'Custom tooltip content. Receives the hovered point, series and category.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ item, index }',
            descriptionKey: 'components.chart_polar.slots.legend_item.description',
            descriptionFallback: 'Custom legend item renderer.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_polar.slots.empty.description',
            descriptionFallback: 'Shown when series is empty or all data is hidden. Defaults to "No data to display".'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_polar.examples.pie.title',
            titleFallback: 'Pie chart',
            lang: 'vue',
            code: `<template>
  <origam-chart-polar
    :series="[{ name: 'Sales', data: [30, 50, 20] }]"
    :categories="['Product A', 'Product B', 'Product C']"
    title="Sales breakdown"
    type="pie"
  />
</template>`
        },
        {
            titleKey: 'components.chart_polar.examples.donut.title',
            titleFallback: 'Donut chart',
            lang: 'vue',
            code: `<template>
  <origam-chart-polar
    :series="[{ name: 'Budget', data: [45, 25, 30] }]"
    :categories="['Marketing', 'Engineering', 'Operations']"
    type="donut"
    :donut-hole-size="0.5"
    legend-position="right"
  />
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'pie',
            props: { type: 'pie', height: 280 },
            slotContent: ''
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-chart-polar',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamChartPolar',
        svgDesc: 'Schematic of the ChartPolar component with 6 internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="10" width="660" height="200" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="32" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__header (title / subtitle)</text>
  <circle cx="350" cy="120" r="70" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <path d="M350,120 L350,50 A70,70 0 0,1 411,155 Z" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.7"/>
  <path d="M350,120 L411,155 A70,70 0 0,1 289,155 Z" fill="var(--origam-color__feedback--success---bg, #16a34a)" opacity="0.7"/>
  <path d="M350,120 L289,155 A70,70 0 0,1 350,50 Z" fill="var(--origam-color__feedback--warning---bg, #d97706)" opacity="0.7"/>
  <text x="350" y="205" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__legend (bottom by default)</text>
  <circle cx="28" cy="18" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="22" font-size="7" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="350" cy="52" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="56" font-size="7" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="350" cy="120" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="124" font-size="7" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="590" cy="120" r="8" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="590" y="124" font-size="7" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="350" cy="196" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="200" font-size="7" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-chart-polar&gt;</code> — 5 internal parts. The SVG body hosts the pie/donut slices; the legend and tooltip sit outside the SVG.',
        legend: [
            {
                num: 1,
                cls: '.origam-chart-polar',
                descriptionKey: 'components.chart_polar.anatomy.root',
                descriptionFallback: 'Root element. CSS Grid with named areas: header / breadcrumb / body / legend.'
            },
            {
                num: 2,
                cls: '.origam-chart-polar__header',
                descriptionKey: 'components.chart_polar.anatomy.header',
                descriptionFallback: 'Title + subtitle block. Rendered only when title or subtitle is set. Houses the #title slot.'
            },
            {
                num: 3,
                cls: '.origam-chart-polar__svg',
                descriptionKey: 'components.chart_polar.anatomy.svg',
                descriptionFallback: 'SVG canvas. role="img" with <title> and <desc> for screen reader accessibility. Slices are keyboard-focusable <path> elements with role="button".'
            },
            {
                num: 4,
                cls: '.origam-chart-polar__empty',
                descriptionKey: 'components.chart_polar.anatomy.empty',
                descriptionFallback: 'Absolutely positioned empty state overlay. Shown when series is empty or all series are hidden.'
            },
            {
                num: 5,
                cls: '.origam-chart-polar__breadcrumb',
                descriptionKey: 'components.chart_polar.anatomy.breadcrumb',
                descriptionFallback: '<nav> rendered between the header and body when drilldown is active and depth > 0. Contains a back button and an <ol> breadcrumb trail.'
            }
        ],
        code: `<div class="origam-chart-polar" role="figure">
  <div class="origam-chart-polar__header">
    <div class="origam-chart-polar__title">Title</div>
  </div>
  <nav class="origam-chart-polar__breadcrumb"><!-- drilldown only --></nav>
  <div class="origam-chart-polar__body">
    <svg class="origam-chart-polar__svg" role="img">
      <title>…</title>
      <g class="origam-chart__series">
        <path class="origam-chart__slice" role="button" tabindex="0" />
      </g>
    </svg>
    <origam-chart-tooltip />
    <div class="origam-chart-polar__empty"><!-- empty state --></div>
  </div>
  <origam-chart-legend />
</div>`,
        classes: [
            { cls: 'origam-chart-polar', descriptionKey: 'components.chart_polar.anatomy.root', descriptionFallback: 'Root CSS Grid container.' },
            { cls: 'origam-chart-polar__header', descriptionKey: 'components.chart_polar.anatomy.header', descriptionFallback: 'Header area (title + subtitle).' },
            { cls: 'origam-chart-polar__body', descriptionKey: 'components.chart_polar.anatomy.body', descriptionFallback: 'Chart body area hosting the SVG and overlay elements.' },
            { cls: 'origam-chart-polar__svg', descriptionKey: 'components.chart_polar.anatomy.svg', descriptionFallback: 'SVG canvas.' },
            { cls: 'origam-chart-polar__breadcrumb', descriptionKey: 'components.chart_polar.anatomy.breadcrumb', descriptionFallback: 'Drilldown breadcrumb nav.' },
            { cls: 'origam-chart-polar__empty', descriptionKey: 'components.chart_polar.anatomy.empty', descriptionFallback: 'Empty state overlay.' },
            { cls: 'origam-chart__slice', descriptionKey: 'components.chart_polar.anatomy.slice', descriptionFallback: 'Individual pie/donut slice. Keyboard focusable with role=button.' }
        ]
    },

    cssVars: [
        {
            name: '--origam-chart---gap',
            defaultValue: '12px',
            descriptionKey: 'components.chart_polar.css_vars.gap',
            descriptionFallback: 'Gap between the header, body, and legend grid areas.'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '12px',
            descriptionKey: 'components.chart_polar.css_vars.padding',
            descriptionFallback: 'Padding of the root container.'
        },
        {
            name: '--origam-chart---background-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.chart_polar.css_vars.background_color',
            descriptionFallback: 'Background color of the chart container.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_polar.css_vars.animation_duration',
            descriptionFallback: 'Controls the slice fade-in animation duration. Set by the animationDuration prop.'
        },
        {
            name: '--origam-chart__pie---stroke-color',
            defaultValue: 'var(--origam-color-surface-default, #fff)',
            descriptionKey: 'components.chart_polar.css_vars.pie_stroke_color',
            descriptionFallback: 'Stroke color between pie/donut slices (gap line).'
        },
        {
            name: '--origam-chart__pie---stroke-width',
            defaultValue: '2',
            descriptionKey: 'components.chart_polar.css_vars.pie_stroke_width',
            descriptionFallback: 'Stroke width between slices in SVG units.'
        }
    ],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_polar.a11y.key_tab',
                actionFallback: 'Moves focus across the interactive slices (each <path> has tabindex="0").'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_polar.a11y.key_activate',
                actionFallback: 'Activates the focused slice (fires point-click or triggers drilldown).'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_polar.a11y.svg_note',
                noteFallback: 'The SVG carries role="img" with a <title> and <desc> generated from the series data. Screen readers announce the chart as a single image with a summary.'
            },
            {
                noteKey: 'components.chart_polar.a11y.slice_note',
                noteFallback: 'Each slice has tabindex="0" and role="button" with an aria-label formatted as "{category}: {value}".'
            },
            {
                noteKey: 'components.chart_polar.a11y.reduced_motion_note',
                noteFallback: 'Slice animations are disabled under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chart.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'chart.gap',
                value: '12px',
                type: 'dimension',
                descriptionKey: 'components.chart_polar.tokens.gap',
                descriptionFallback: 'Gap between grid areas (header / body / legend).'
            },
            {
                tokenPath: 'chart.padding',
                value: '12px',
                type: 'dimension',
                descriptionKey: 'components.chart_polar.tokens.padding',
                descriptionFallback: 'Padding of the chart container.'
            }
        ]
    }
}
