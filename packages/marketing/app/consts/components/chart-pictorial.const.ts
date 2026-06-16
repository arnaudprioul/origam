/**
 * /components/chart-pictorial — full documentation data for OrigamChartPictorial.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-pictorial.interface.ts  (props / emits / slots)
 *   - packages/ds/src/interfaces/Chart/chart-base.interface.ts       (base props / emits / slots)
 *   - packages/ds/src/components/Chart/OrigamChartPictorial.vue      (template BEM, aria-*)
 *   - packages/ds/tokens/component/chart.json                        (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentA11y,
    IComponentCssVar,
    IComponentTokens
} from '~/interfaces/components-catalog.interface'

export const CHART_PICTORIAL_DOC: IComponentDoc = {
    slug: 'chart-pictorial',
    name: 'ChartPictorial',
    tag: 'origam-chart-pictorial',
    icon: 'mdi-chart-bubble',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_pictorial.description',
    descriptionFallback: 'Pictorial / isotype chart where each data value is represented as a column of repeated SVG icons. Supports stack mode (rows of small icons) and fill mode (single large icon clip-masked to the fill ratio).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-pictorial--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartPictorial',

    parentSlug: 'chart',

    family: [],

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
            descriptionKey: 'components.chart_pictorial.props.series.description',
            descriptionFallback: 'Data series. Each series contains a name and an array of numeric values. Multiple series render side-by-side columns.'
        },
        {
            name: 'categories',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_pictorial.props.categories.description',
            descriptionFallback: 'X-axis category labels, one per data point.'
        },
        {
            name: 'icon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'person silhouette path',
            descriptionKey: 'components.chart_pictorial.props.icon.description',
            descriptionFallback: 'SVG <path d="…"> string for the icon drawn per slot. Must fit a viewBox="0 0 24 24" coordinate system.'
        },
        {
            name: 'iconColor',
            type: { label: 'TIntent | string', slug: 'intent', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pictorial.props.icon_color.description',
            descriptionFallback: 'Colour applied to all filled icons. When omitted, cycles through colorScheme by series index.'
        },
        {
            name: 'emptyIconColor',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'rgba(0,0,0,0.1)'",
            descriptionKey: 'components.chart_pictorial.props.empty_icon_color.description',
            descriptionFallback: 'Colour of background (unfilled) icon slots.'
        },
        {
            name: 'iconsPerUnit',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.chart_pictorial.props.icons_per_unit.description',
            descriptionFallback: 'How many data units one icon represents. E.g. iconsPerUnit=10 → value 65 renders 7 filled icons (rounded).'
        },
        {
            name: 'direction',
            type: { label: 'TChartPictorialDirection', slug: '', kind: 'primitive' },
            defaultValue: "'vertical'",
            descriptionKey: 'components.chart_pictorial.props.direction.description',
            descriptionFallback: 'Icon stacking direction: vertical (bottom-to-top) or horizontal (left-to-right).'
        },
        {
            name: 'mode',
            type: { label: 'TChartPictorialMode', slug: '', kind: 'primitive' },
            defaultValue: "'stack'",
            descriptionKey: 'components.chart_pictorial.props.mode.description',
            descriptionFallback: 'Rendering mode. stack = classic isotype (rows of repeated icons). fill = one large icon clip-masked to the fill ratio (thermometer effect).'
        },
        {
            name: 'showLabel',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pictorial.props.show_label.description',
            descriptionFallback: 'Display the raw value label above (vertical) or to the right (horizontal) of each column.'
        },
        {
            name: 'showAxis',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pictorial.props.show_axis.description',
            descriptionFallback: 'Display the X-axis category labels below each column.'
        },
        {
            name: 'xAxisFormat',
            type: { label: '(value: string | number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pictorial.props.x_axis_format.description',
            descriptionFallback: 'Formatter applied to X-axis category labels. Identity by default.'
        },
        {
            name: 'yAxisFormat',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pictorial.props.y_axis_format.description',
            descriptionFallback: 'Formatter applied to value labels. String(value) by default.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pictorial.props.title.description',
            descriptionFallback: 'Optional title rendered above the chart area.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pictorial.props.subtitle.description',
            descriptionFallback: 'Optional subtitle rendered below the title.'
        },
        {
            name: 'showLegend',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pictorial.props.show_legend.description',
            descriptionFallback: 'Toggle the legend block.'
        },
        {
            name: 'legendPosition',
            type: { label: 'TChartLegendPosition', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_pictorial.props.legend_position.description',
            descriptionFallback: 'Anchor of the legend block: top, bottom, left or right.'
        },
        {
            name: 'showTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pictorial.props.show_tooltip.description',
            descriptionFallback: 'Toggle the hover tooltip.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chart_pictorial.props.animated.description',
            descriptionFallback: 'Animate icons on first paint. Respects prefers-reduced-motion.'
        },
        {
            name: 'animationDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '600',
            descriptionKey: 'components.chart_pictorial.props.animation_duration.description',
            descriptionFallback: 'Animation duration in milliseconds.'
        },
        {
            name: 'colorScheme',
            type: { label: 'Array<TIntent | string>', slug: 'intent', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.chart_pictorial.props.color_scheme.description',
            descriptionFallback: 'Palette cycled by series index when iconColor is not set.'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pictorial.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio shortcut (e.g. "1/1"). Overrides height when set.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pictorial.props.height.description',
            descriptionFallback: 'Chart wrapper height. Accepts CSS length or number (→ px).'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chart_pictorial.props.bg_color.description',
            descriptionFallback: 'Background colour of the chart wrapper.'
        }
    ],

    emits: [
        {
            event: 'point-click',
            payload: { label: 'IChartPoint, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_pictorial.emits.point_click.description',
            descriptionFallback: 'Fired on click or keyboard activation (Enter/Space) on a column.'
        },
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_pictorial.emits.legend_click.description',
            descriptionFallback: 'Fired when the user clicks a legend entry.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_pictorial.emits.series_toggle.description',
            descriptionFallback: 'Resulting visibility flip after a legend click.'
        }
    ],

    slots: [
        {
            slot: 'tooltip',
            slotProps: '{ point, series, category }',
            descriptionKey: 'components.chart_pictorial.slots.tooltip.description',
            descriptionFallback: 'Replace the default tooltip card. Receives the hovered point, its series and the category label.'
        },
        {
            slot: 'legend-item',
            slotProps: '{ series, index, visible }',
            descriptionKey: 'components.chart_pictorial.slots.legend_item.description',
            descriptionFallback: 'Replace one legend entry with custom content.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.chart_pictorial.slots.title.description',
            descriptionFallback: 'Replace the default title + subtitle block.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.chart_pictorial.slots.empty.description',
            descriptionFallback: 'Rendered when series is empty or all series have no data.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_pictorial.examples.basic.title',
            titleFallback: 'Stack mode — person icons',
            lang: 'vue',
            code: `<template>
  <origam-chart-pictorial
    :series="[
      { name: 'Team A', data: [3, 6, 4] },
      { name: 'Team B', data: [5, 2, 7] }
    ]"
    :categories="['Q1', 'Q2', 'Q3']"
    :icons-per-unit="1"
    title="Headcount per quarter"
  />
</template>`
        },
        {
            titleKey: 'components.chart_pictorial.examples.fill.title',
            titleFallback: 'Fill mode — thermometer effect',
            lang: 'vue',
            code: `<template>
  <origam-chart-pictorial
    :series="[{ name: 'Progress', data: [0.65, 0.82, 0.40] }]"
    :categories="['Jan', 'Feb', 'Mar']"
    mode="fill"
    icon-color="success"
    :show-label="true"
    title="Monthly target completion"
  />
</template>`
        }
    ],

    anatomy: {
        rootClass: 'origam-chart-pictorial',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamChartPictorial',
        svgDesc: 'Schematic of the ChartPictorial component with 7 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="16" y="16" width="668" height="200" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="32" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">origam-chart-pictorial ①</text>
  <rect x="24" y="40" width="660" height="18" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="354" y="52" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__header ②</text>
  <rect x="24" y="64" width="660" height="140" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="40" y="78" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" font-family="'JetBrains Mono',monospace">__body ③</text>
  <g transform="translate(80, 80)">
    <text x="20" y="0" font-size="7" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__column ④</text>
    <rect x="8" y="6" width="24" height="24" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))"/>
    <rect x="8" y="34" width="24" height="24" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))"/>
    <rect x="8" y="62" width="24" height="24" rx="2" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
    <rect x="8" y="90" width="24" height="24" rx="2" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
    <rect x="8" y="118" width="24" height="24" rx="2" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
    <text x="20" y="154" font-size="7" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__axis-label</text>
  </g>
  <text x="160" y="95" font-size="7.5" fill="var(--origam-color__action--primary---bgHover, #a855f7)" font-family="'JetBrains Mono',monospace">__icon--empty ⑤</text>
  <text x="160" y="110" font-size="7.5" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="'JetBrains Mono',monospace">__icon--filled ⑥</text>
  <text x="160" y="125" font-size="7.5" fill="var(--origam-color__text---secondary, #6b7280)" font-family="'JetBrains Mono',monospace">__value-label ⑦</text>
  <rect x="200" y="228" width="300" height="16" rx="2" fill="var(--origam-color__surface---sunken, #f3f4f6)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="350" y="239" font-size="8" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-chart-legend</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-chart-pictorial&gt;</code> — 7 internal parts. The SVG hosts columns ④ containing empty ⑤ and filled ⑥ icon <code>&lt;use&gt;</code> elements plus optional value labels ⑦.',
        legend: [
            { num: 1, cls: '.origam-chart-pictorial', descriptionKey: 'components.chart_pictorial.anatomy.root', descriptionFallback: 'Root wrapper. CSS grid: header / body / legend rows.' },
            { num: 2, cls: '.origam-chart-pictorial__header', descriptionKey: 'components.chart_pictorial.anatomy.header', descriptionFallback: 'Optional title + subtitle block.' },
            { num: 3, cls: '.origam-chart-pictorial__body', descriptionKey: 'components.chart_pictorial.anatomy.body', descriptionFallback: 'Plot area hosting the SVG and the empty slot.' },
            { num: 4, cls: '.origam-chart-pictorial__column', descriptionKey: 'components.chart_pictorial.anatomy.column', descriptionFallback: 'One column per data point. Keyboard-focusable (role="button", tabindex="0").' },
            { num: 5, cls: '.origam-chart-pictorial__icon--empty', descriptionKey: 'components.chart_pictorial.anatomy.icon_empty', descriptionFallback: 'Background (unfilled) icon slots filled with emptyIconColor.' },
            { num: 6, cls: '.origam-chart-pictorial__icon--filled', descriptionKey: 'components.chart_pictorial.anatomy.icon_filled', descriptionFallback: 'Filled icon slots. In fill mode these use a <clipPath> for the thermometer effect.' },
            { num: 7, cls: '.origam-chart-pictorial__value-label', descriptionKey: 'components.chart_pictorial.anatomy.value_label', descriptionFallback: 'Formatted value text rendered adjacent to the column when showLabel=true.' }
        ],
        code: `<div class="origam-chart-pictorial">
  <div class="origam-chart-pictorial__header">
    <slot name="title" />
  </div>
  <div class="origam-chart-pictorial__body">
    <svg class="origam-chart-pictorial__svg origam-chart__svg" role="img">
      <title /><desc />
      <defs>
        <symbol id="origam-chart-pictorial-icon" viewBox="0 0 24 24">
          <path :d="icon" />
        </symbol>
        <clipPath id="origam-chart-pictorial-clip-…" />
      </defs>
      <g class="origam-chart__series">
        <g class="origam-chart-pictorial__column" role="button" tabindex="0">
          <use class="origam-chart-pictorial__icon origam-chart-pictorial__icon--empty" />
          <use class="origam-chart-pictorial__icon origam-chart-pictorial__icon--filled" />
          <text class="origam-chart-pictorial__value-label" />
        </g>
      </g>
      <g class="origam-chart-pictorial__axis">
        <text class="origam-chart-pictorial__axis-label" />
      </g>
    </svg>
    <origam-chart-tooltip />
    <div class="origam-chart-pictorial__empty origam-chart__empty">
      <slot name="empty" />
    </div>
  </div>
  <origam-chart-legend />
</div>`,
        classes: [
            { cls: 'origam-chart-pictorial', descriptionKey: 'components.chart_pictorial.anatomy.root', descriptionFallback: 'Root grid wrapper.' },
            { cls: 'origam-chart-pictorial__header', descriptionKey: 'components.chart_pictorial.anatomy.header', descriptionFallback: 'Title/subtitle block.' },
            { cls: 'origam-chart-pictorial__body', descriptionKey: 'components.chart_pictorial.anatomy.body', descriptionFallback: 'Plot area.' },
            { cls: 'origam-chart-pictorial__svg', descriptionKey: 'components.chart_pictorial.anatomy.svg', descriptionFallback: 'Responsive SVG.' },
            { cls: 'origam-chart-pictorial__column', descriptionKey: 'components.chart_pictorial.anatomy.column', descriptionFallback: 'One column group per data point.' },
            { cls: 'origam-chart-pictorial__icon', descriptionKey: 'components.chart_pictorial.anatomy.icon', descriptionFallback: 'Icon <use> element (base class).' },
            { cls: 'origam-chart-pictorial__icon--empty', descriptionKey: 'components.chart_pictorial.anatomy.icon_empty', descriptionFallback: 'Unfilled icon slot.' },
            { cls: 'origam-chart-pictorial__icon--filled', descriptionKey: 'components.chart_pictorial.anatomy.icon_filled', descriptionFallback: 'Filled icon slot.' },
            { cls: 'origam-chart-pictorial__value-label', descriptionKey: 'components.chart_pictorial.anatomy.value_label', descriptionFallback: 'Formatted value label.' },
            { cls: 'origam-chart-pictorial__axis', descriptionKey: 'components.chart_pictorial.anatomy.axis', descriptionFallback: 'Axis label group.' },
            { cls: 'origam-chart-pictorial__axis-label', descriptionKey: 'components.chart_pictorial.anatomy.axis_label', descriptionFallback: 'Category text below a column.' },
            { cls: 'origam-chart-pictorial__empty', descriptionKey: 'components.chart_pictorial.anatomy.empty', descriptionFallback: 'Empty-state overlay.' }
        ]
    },

    cssVars: [
        {
            name: '--origam-chart---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.chart_pictorial.css_vars.background_color',
            descriptionFallback: 'Background colour of the chart wrapper.'
        },
        {
            name: '--origam-chart---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.chart_pictorial.css_vars.color',
            descriptionFallback: 'Default text colour (inherited by axis labels).'
        },
        {
            name: '--origam-chart---padding',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_pictorial.css_vars.padding',
            descriptionFallback: 'Inner padding of the root wrapper.'
        },
        {
            name: '--origam-chart---gap',
            defaultValue: '{space.3}',
            descriptionKey: 'components.chart_pictorial.css_vars.gap',
            descriptionFallback: 'Grid gap between header / body / legend rows.'
        },
        {
            name: '--origam-chart---animation-duration',
            defaultValue: '600ms',
            descriptionKey: 'components.chart_pictorial.css_vars.animation_duration',
            descriptionFallback: 'Icon animation duration. Set via animationDuration prop.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['figure', 'img', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_pictorial.a11y.key_tab',
                actionFallback: 'Moves focus between focusable columns (tabindex="0" on each column group).'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_pictorial.a11y.key_activate',
                actionFallback: 'Activates the focused column (fires point-click).'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_pictorial.a11y.root_figure',
                noteFallback: 'Root div carries role="figure" and aria-label from the title prop (or "Pictorial chart").'
            },
            {
                noteKey: 'components.chart_pictorial.a11y.svg_img',
                noteFallback: 'Inner SVG has role="img" with <title> and <desc> elements summarising series count.'
            },
            {
                noteKey: 'components.chart_pictorial.a11y.column_label',
                noteFallback: 'Each column group has aria-label with category, value and series name.'
            },
            {
                noteKey: 'components.chart_pictorial.a11y.reduced_motion',
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
                descriptionKey: 'components.chart_pictorial.tokens.background_color',
                descriptionFallback: 'Chart wrapper background.'
            },
            {
                tokenPath: 'chart.tooltip.background-color',
                value: '{color.surface.inverse}',
                type: 'color',
                descriptionKey: 'components.chart_pictorial.tokens.tooltip_bg',
                descriptionFallback: 'Tooltip background colour.'
            },
            {
                tokenPath: 'chart.legend.gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.chart_pictorial.tokens.legend_gap',
                descriptionFallback: 'Gap between legend items.'
            }
        ]
    } satisfies IComponentTokens
}
