/**
 * /components/chart-polar-bar — full documentation data for OrigamChartPolarBar.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-polar-bar.interface.ts  (props / emits / slots)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts       (base props / emits / slots)
 *   - packages/ds/src/components/Chart/OrigamChartPolarBar.vue       (template BEM, aria-*)
 *   - packages/ds/tokens/component/chart.json                        (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentA11y,
    IComponentCssVar,
    IComponentTokens
} from '~/interfaces/components-catalog.interface'

export const CHART_POLAR_BAR_DOC: IComponentDoc = {
    slug: 'chart-polar-bar',
    name: 'ChartPolarBar',
    tag: 'origam-chart-polar-bar',
    icon: 'mdi-chart-donut-variant',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_polar_bar.description',
    descriptionFallback: 'Nightingale-rose (polar bar) chart. N data points are rendered as radial wedges each occupying an equal angular slice; outer radius is proportional to value. Ideal for cyclical data such as hours per day or monthly activity.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-polar-bar--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartPolarBar',

    parentSlug: 'chart-polar',

    family: [],

    related: [
        {
            slug: 'chart-polar',
            name: 'ChartPolar',
            kind: 'component',
            descriptionKey: 'components.catalog.chart_polar.description',
            descriptionFallback: 'Polar chart (pie / donut) — same radial family, variable-angle encoding instead.'
        },
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
            descriptionKey: 'components.chart_polar_bar.props.series.description',
            descriptionFallback: 'Data series. series[0].data is an array of N numeric values, one per radial wedge.'
        },
        {
            name: 'categories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_polar_bar.props.categories.description',
            descriptionFallback: 'Category labels for each wedge. Falls back to numeric index.'
        },
        {
            name: 'innerRadius',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.1',
            descriptionKey: 'components.chart_polar_bar.props.inner_radius.description',
            descriptionFallback: 'Fraction of the total radius reserved as a centre hole. 0 = no hole, 1 = zero-thickness ring.'
        },
        {
            name: 'startAngle',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.chart_polar_bar.props.start_angle.description',
            descriptionFallback: 'Start angle in radians for the first wedge. 0 = 3 o\'clock; -Math.PI/2 = 12 o\'clock.'
        },
        {
            name: 'gap',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.02',
            descriptionKey: 'components.chart_polar_bar.props.gap.description',
            descriptionFallback: 'Angular gap between consecutive wedges in radians. 0 = flush wedges.'
        },
        {
            name: 'maxValue',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar_bar.props.max_value.description',
            descriptionFallback: 'Override the auto-computed maximum used to scale wedge outer radii. When omitted, max(series[0].data) is used.'
        },
        {
            name: 'showLabel',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_polar_bar.props.show_label.description',
            descriptionFallback: 'Render category labels outside the outer radius of each wedge.'
        },
        {
            name: 'showValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chart_polar_bar.props.show_value.description',
            descriptionFallback: 'Render the numeric value label inside the wedge when there is sufficient angular room.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar_bar.props.x_axis_format.description',
            descriptionFallback: 'Formatter applied to tooltip X label (category name or index).'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar_bar.props.y_axis_format.description',
            descriptionFallback: 'Formatter applied to tooltip Y value and the in-wedge value label.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar_bar.props.title.description',
            descriptionFallback: 'Optional title rendered above the chart area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar_bar.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_polar_bar.props.show_legend.description',
            descriptionFallback: 'Toggle the legend block.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_polar_bar.props.legend_position.description',
            descriptionFallback: 'Anchor of the legend block: top, bottom, left or right.'
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_polar_bar.props.show_tooltip.description',
            descriptionFallback: 'Toggle the hover tooltip.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_polar_bar.props.animated.description',
            descriptionFallback: 'Animate wedges on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_polar_bar.props.animation_duration.description',
            descriptionFallback: 'Animation duration in milliseconds.'
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_polar_bar.props.color_scheme.description',
            descriptionFallback: 'Palette cycled by wedge index when no per-series colour is set.'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar_bar.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut. Overrides height when set.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar_bar.props.height.description',
            descriptionFallback: 'Chart wrapper height. Accepts CSS length or number (→ px).'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_polar_bar.props.bg_color.description',
            descriptionFallback: 'Background colour of the chart wrapper.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_polar_bar.emits.point_click.description',
            descriptionFallback: 'Fired on mouse click or keyboard activation (Enter/Space) on a wedge.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_polar_bar.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_polar_bar.emits.series_toggle.description',
            descriptionFallback: 'Resulting visibility flip after a legend click.'
        }
    ],

    slots: [
        {
            slot: 'tooltip',
            slotProps: '{ point, category, percentage }',
            descriptionKey: 'components.chart_polar_bar.slots.tooltip.description',
            descriptionFallback: 'Replace the default tooltip body. Receives the hovered point, the category label, and the pre-computed percentage string.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series, index, visible }',
            descriptionKey: 'components.chart_polar_bar.slots.legend_item.description',
            descriptionFallback: 'Replace one legend entry with custom content.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_polar_bar.slots.title.description',
            descriptionFallback: 'Replace the default title + subtitle block.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_polar_bar.slots.empty.description',
            descriptionFallback: 'Rendered when series is empty or all series have no data.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_polar_bar.examples.basic.title',
            titleFallback: 'Weekly activity — nightingale rose',
            lang: 'vue',
            code: `<template>
  <origam-chart-polar-bar
    :series="[{
      name: 'Commits',
      data: [12, 8, 15, 22, 18, 5, 3]
    }]"
    :categories="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
    :start-angle="-1.5707963"
    title="Commits per day of week"
    :show-value="true"
  />
</template>`
        },
        {
            titleKey: 'components.chart_polar_bar.examples.ring.title',
            titleFallback: 'With centre hole',
            lang: 'vue',
            code: `<template>
  <origam-chart-polar-bar
    :series="[{
      name: 'Sales',
      data: [45, 32, 67, 55, 80, 40, 28, 60]
    }]"
    :inner-radius="0.3"
    :show-label="true"
    title="Monthly sales distribution"
  />
</template>`
        }
    ],

    anatomy: {
        rootClass: 'origam-chart-polar-bar',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamChartPolarBar',
        svgDesc: 'Schematic of the ChartPolarBar component with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="16" y="16" width="668" height="228" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="32" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">origam-chart-polar-bar ①</text>
  <rect x="24" y="40" width="660" height="18" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="354" y="52" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__header ②</text>
  <rect x="24" y="64" width="660" height="168" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="40" y="78" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" font-family="'JetBrains Mono',monospace">__body ③</text>
  <g transform="translate(350,148)">
    <path d="M0,-60 A60,60 0 0,1 58,-17 L29,-8 A30,30 0 0,0 0,-30 Z" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.9"/>
    <path d="M58,-17 A60,60 0 0,1 36,50 L18,25 A30,30 0 0,0 29,-8 Z" fill="var(--origam-color__action--info---bg, #0ea5e9)" opacity="0.9"/>
    <path d="M36,50 A60,60 0 0,1 -36,50 L-18,25 A30,30 0 0,0 18,25 Z" fill="var(--origam-color__action--success---bg, #22c55e)" opacity="0.9"/>
    <path d="M-36,50 A60,60 0 0,1 -58,-17 L-29,-8 A30,30 0 0,0 -18,25 Z" fill="var(--origam-color__action--warning---bg, #f59e0b)" opacity="0.9"/>
    <path d="M-58,-17 A60,60 0 0,1 0,-60 L0,-30 A30,30 0 0,0 -29,-8 Z" fill="var(--origam-color__action--danger---bg, #ef4444)" opacity="0.9"/>
    <circle cx="0" cy="0" r="5" fill="var(--origam-color__surface---raised, #fff)"/>
  </g>
  <text x="465" y="100" font-size="8" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="'JetBrains Mono',monospace">origam-chart__polar-bar-wedge ④</text>
  <text x="465" y="114" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" font-family="'JetBrains Mono',monospace">--active modifier on hover</text>
  <text x="465" y="132" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" font-family="'JetBrains Mono',monospace">__polar-bar-category-label ⑤</text>
  <text x="465" y="146" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" font-family="'JetBrains Mono',monospace">__polar-bar-value-label ⑥</text>
  <rect x="200" y="248" width="300" height="16" rx="2" fill="var(--origam-color__surface---sunken, #f3f4f6)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="350" y="259" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-chart-legend</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-chart-polar-bar&gt;</code> — 6 internal parts. Wedges ④ are SVG <code>&lt;path&gt;</code> elements inside a centred <code>&lt;g&gt;</code>. Category labels ⑤ and optional value labels ⑥ float outside / inside the outer radius.',
        legend: [
            { num: 1, cls: '.origam-chart-polar-bar', descriptionKey: 'components.chart_polar_bar.anatomy.root', descriptionFallback: 'Root wrapper. CSS grid: header / body / legend rows.' },
            { num: 2, cls: '.origam-chart-polar-bar__header', descriptionKey: 'components.chart_polar_bar.anatomy.header', descriptionFallback: 'Optional title + subtitle block.' },
            { num: 3, cls: '.origam-chart-polar-bar__body', descriptionKey: 'components.chart_polar_bar.anatomy.body', descriptionFallback: 'Plot area containing the SVG and empty-state slot.' },
            { num: 4, cls: '.origam-chart__polar-bar-wedge', descriptionKey: 'components.chart_polar_bar.anatomy.wedge', descriptionFallback: 'SVG <path> arc for one data point. Keyboard-focusable (role="button", tabindex="0"). Gets --active modifier on hover.' },
            { num: 5, cls: '.origam-chart__polar-bar-category-label', descriptionKey: 'components.chart_polar_bar.anatomy.category_label', descriptionFallback: 'Category text anchored outside the outer radius. text-anchor driven by wedge midpoint quadrant.' },
            { num: 6, cls: '.origam-chart__polar-bar-value-label', descriptionKey: 'components.chart_polar_bar.anatomy.value_label', descriptionFallback: 'Optional numeric value label inside the wedge. Hidden when angular space is insufficient (showValueLabel flag).' }
        ],
        code: `<div class="origam-chart-polar-bar">
  <div class="origam-chart-polar-bar__header">
    <slot name="title" />
  </div>
  <div class="origam-chart-polar-bar__body">
    <svg class="origam-chart-polar-bar__svg origam-chart__svg" role="img">
      <title /><desc />
      <g class="origam-chart__series" :transform="translateCenter">
        <path class="origam-chart__polar-bar-wedge" role="button" tabindex="0" />
        <text class="origam-chart__polar-bar-category-label" />
        <text class="origam-chart__polar-bar-value-label" />
      </g>
    </svg>
    <origam-chart-tooltip />
    <div class="origam-chart-polar-bar__empty origam-chart__empty">
      <slot name="empty" />
    </div>
  </div>
  <origam-chart-legend />
</div>`,
        classes: [
            { cls: 'origam-chart-polar-bar', descriptionKey: 'components.chart_polar_bar.anatomy.root', descriptionFallback: 'Root grid wrapper.' },
            { cls: 'origam-chart-polar-bar__header', descriptionKey: 'components.chart_polar_bar.anatomy.header', descriptionFallback: 'Title/subtitle block.' },
            { cls: 'origam-chart-polar-bar__body', descriptionKey: 'components.chart_polar_bar.anatomy.body', descriptionFallback: 'Plot area.' },
            { cls: 'origam-chart-polar-bar__svg', descriptionKey: 'components.chart_polar_bar.anatomy.svg', descriptionFallback: 'Square SVG (viewBox NxN).' },
            { cls: 'origam-chart__polar-bar-wedge', descriptionKey: 'components.chart_polar_bar.anatomy.wedge', descriptionFallback: 'Arc wedge <path>.' },
            { cls: 'origam-chart__polar-bar-wedge--active', descriptionKey: 'components.chart_polar_bar.anatomy.wedge_active', descriptionFallback: 'Added on hover / keyboard focus.' },
            { cls: 'origam-chart__polar-bar-category-label', descriptionKey: 'components.chart_polar_bar.anatomy.category_label', descriptionFallback: 'Outer category text.' },
            { cls: 'origam-chart__polar-bar-value-label', descriptionKey: 'components.chart_polar_bar.anatomy.value_label', descriptionFallback: 'Inner value text.' },
            { cls: 'origam-chart-polar-bar__empty', descriptionKey: 'components.chart_polar_bar.anatomy.empty', descriptionFallback: 'Empty-state overlay.' }
        ]
    },

    cssVars: [
        {
            name: '--origam-chart---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart_polar_bar.css_vars.background_color',
            descriptionFallback: 'Background colour of the chart wrapper.'
        },
        {
            name: '--origam-chart---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.chart_polar_bar.css_vars.color',
            descriptionFallback: 'Default text colour (inherited by category labels).'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_polar_bar.css_vars.padding',
            descriptionFallback: 'Inner padding of the root wrapper.'
        },
        {
            name: '--origam-chart---gap',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_polar_bar.css_vars.gap',
            descriptionFallback: 'Grid gap between header / body / legend rows.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_polar_bar.css_vars.animation_duration',
            descriptionFallback: 'Wedge animation duration. Set via animationDuration prop.'
        },
        {
            name: '--origam-chart__tooltip---background-color',
            defaultValue: '{color.surface.inverse}',
            descriptionKey: 'components.chart_polar_bar.css_vars.tooltip_bg',
            descriptionFallback: 'Tooltip background colour.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_polar_bar.a11y.key_tab',
                actionFallback: 'Moves focus between focusable wedges (tabindex="0" on each <path>).'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_polar_bar.a11y.key_activate',
                actionFallback: 'Activates the focused wedge (fires point-click).'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_polar_bar.a11y.root_figure',
                noteFallback: 'Root div carries role="figure" and aria-label from the title prop (or "Polar bar chart").'
            },
            {
                noteKey: 'components.chart_polar_bar.a11y.svg_img',
                noteFallback: 'Inner SVG has role="img" with <title> and <desc> elements summarising the data.'
            },
            {
                noteKey: 'components.chart_polar_bar.a11y.wedge_label',
                noteFallback: 'Each wedge <path> has aria-label with category, value, percentage and series name.'
            },
            {
                noteKey: 'components.chart_polar_bar.a11y.reduced_motion',
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
                descriptionKey: 'components.chart_polar_bar.tokens.background_color',
                descriptionFallback: 'Chart wrapper background.'
            },
            {
                tokenPath: 'chart.tooltip.background-color',
                value: '{color.surface.inverse}',
                type: 'color',
                descriptionKey: 'components.chart_polar_bar.tokens.tooltip_bg',
                descriptionFallback: 'Tooltip background colour.'
            },
            {
                tokenPath: 'chart.legend.gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.chart_polar_bar.tokens.legend_gap',
                descriptionFallback: 'Gap between legend items.'
            }
        ]
    } satisfies IComponentTokens
}
