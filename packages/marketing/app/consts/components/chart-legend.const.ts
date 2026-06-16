/**
 * /components/chart-legend — full documentation data for OrigamChartLegend.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chart/chart-legend.interface.ts  (props)
 *   - packages/ds/src/components/Chart/OrigamChartLegend.vue      (template BEM, aria-*)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CHART_LEGEND_DOC: IComponentDoc = {
    slug: 'chart-legend',
    name: 'ChartLegend',
    tag: 'origam-chart-legend',
    icon: 'mdi-format-list-bulleted-square',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chart_legend.description',
    descriptionFallback: 'Standalone series-legend list shared by all chart families. Renders a colour swatch + series name per entry and handles click-to-toggle visibility.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chart-legend--design',
    docUrl: 'http://localhost:4000/components/Chart/OrigamChartLegend',

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
            slug: 'chart-map',
            name: 'ChartMap',
            descriptionKey: 'components.catalog.chart_map.description',
            descriptionFallback: 'Choropleth and flight-route world map chart.'
        }
    ],

    props: [
        {
            name: 'items',
            type: { label: 'IChartLegendItem[]', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.chart_legend.props.items.description',
            descriptionFallback: 'Pre-resolved legend entries (series + index + colour + visibility). Comes from useChart().legend.value in the parent chart.'
        },
        {
            name: 'position',
            type: { label: 'TChartLegendPosition', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.chart_legend.props.position.description',
            descriptionFallback: "Anchor of the legend block. Drives flex-direction: 'top' | 'bottom' = row; 'left' | 'right' = column."
        }
    ],

    emits: [
        {
            event: 'legend-click',
            payload: { label: 'IChartSeries, number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_legend.emits.legend_click.description',
            descriptionFallback: 'Raw click on a legend entry. Pair with series-toggle to mutate state.'
        },
        {
            event: 'series-toggle',
            payload: { label: 'IChartSeries, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chart_legend.emits.series_toggle.description',
            descriptionFallback: 'Fires after a click with the intended next visibility value (inverted from current). The parent is responsible for actually mutating series.visible.'
        }
    ],

    slots: [
        {
            slot: 'legend-item',
            slotProps: '{ series, index, visible }',
            descriptionKey: 'components.chart_legend.slots.legend_item.description',
            descriptionFallback: 'Replaces one legend entry entirely. Receives the series, its index and its current visibility.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chart_legend.examples.basic.title',
            titleFallback: 'Standalone legend',
            lang: 'vue',
            code: `<template>
  <origam-chart-legend
    :items="items"
    position="bottom"
    @series-toggle="onToggle"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { series: { name: 'Revenue', data: [], visible: true }, index: 0, color: '#7c3aed', visible: true },
  { series: { name: 'Costs',   data: [], visible: true }, index: 1, color: '#ef4444', visible: true }
])

const onToggle = (series, nextVisible) => {
  const entry = items.value.find((e) => e.series.name === series.name)
  if (entry) {
    entry.visible = nextVisible
    entry.series.visible = nextVisible
  }
}
</script>`
        },
        {
            titleKey: 'components.chart_legend.examples.custom_item.title',
            titleFallback: 'Custom legend entry',
            lang: 'vue',
            code: `<template>
  <origam-chart-legend :items="items">
    <template #legend-item="{ series, index, visible }">
      <span
        :style="{ opacity: visible ? 1 : 0.4, display: 'flex', alignItems: 'center', gap: '6px' }"
      >
        <span
          style="display:inline-block;width:16px;height:4px;border-radius:2px"
          :style="{ backgroundColor: items[index]?.color }"
        />
        {{ series.name }}
        <em v-if="!visible">(hidden)</em>
      </span>
    </template>
  </origam-chart-legend>
</template>`
        },
        {
            titleKey: 'components.chart_legend.examples.vertical.title',
            titleFallback: 'Vertical legend (right)',
            lang: 'vue',
            code: `<template>
  <origam-chart-legend :items="items" position="right" />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-chart__legend',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamChartLegend',
        svgDesc: 'Schematic of the ChartLegend component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="60" width="660" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="40" y="80" width="12" height="12" rx="3" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="58" y="90" font-size="10" fill="var(--origam-color__text---primary, #1f2937)" font-family="sans-serif">Revenue</text>
  <rect x="140" y="80" width="12" height="12" rx="3" fill="var(--origam-color__feedback--danger---bg, #ef4444)"/>
  <text x="158" y="90" font-size="10" fill="var(--origam-color__text---primary, #1f2937)" font-family="sans-serif">Costs</text>
  <rect x="230" y="80" width="12" height="12" rx="3" fill="var(--origam-color__feedback--success---bg, rgba(34,197,94,0.8))"/>
  <text x="248" y="90" font-size="10" fill="var(--origam-color__text---primary, #1f2937)" font-family="sans-serif">Profit</text>
  <rect x="320" y="80" width="12" height="12" rx="3" fill="var(--origam-color__feedback--info---bg, rgba(8,145,178,0.8))" opacity="0.4"/>
  <text x="338" y="90" font-size="10" fill="var(--origam-color__text---primary, #1f2937)" font-family="sans-serif" text-decoration="line-through" opacity="0.4">Margin</text>
  <circle cx="28" cy="68" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="47" cy="86" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="47" y="90" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="66" cy="86" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="66" y="90" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="330" cy="80" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="330" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="350" y="155" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">④ --hidden modifier: opacity 0.4 + text-decoration: line-through</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chart-legend&gt;</code> — 4 internal parts. A pure renderer: receives pre-resolved items and emits toggle events.`,
        legend: [
            {
                num: 1,
                cls: '.origam-chart__legend',
                descriptionKey: 'components.chart_legend.anatomy.root',
                descriptionFallback: 'Root <ul> element. role="list". Flex layout: row when position=top|bottom, column when left|right.'
            },
            {
                num: 2,
                cls: '.origam-chart__legend-swatch',
                descriptionKey: 'components.chart_legend.anatomy.swatch',
                descriptionFallback: '<span> with background-color from the resolved series colour. aria-hidden="true".'
            },
            {
                num: 3,
                cls: '.origam-chart__legend-label',
                descriptionKey: 'components.chart_legend.anatomy.label',
                descriptionFallback: '<span> with the series name text.'
            },
            {
                num: 4,
                cls: '.origam-chart__legend-item--hidden',
                descriptionKey: 'components.chart_legend.anatomy.item_hidden',
                descriptionFallback: 'BEM modifier when the series is hidden. opacity: 0.4 + text-decoration: line-through.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root <ul>, role="list" -->
<ul class="origam-chart__legend origam-chart__legend--bottom" role="list">
  <!-- one <li> per series entry -->
  <li
    class="origam-chart__legend-item"
    role="button"
    tabindex="0"
    aria-label="Revenue: visible, click to hide"
    aria-pressed="true"
  >
    <!-- default slot content (replaceable via #legend-item) -->
    <span class="origam-chart__legend-swatch" aria-hidden="true" />
    <span class="origam-chart__legend-label">Revenue</span>
  </li>

  <!-- hidden entry -->
  <li
    class="origam-chart__legend-item origam-chart__legend-item--hidden"
    role="button"
    tabindex="0"
    aria-label="Margin: hidden, click to show"
    aria-pressed="false"
  >
    <span class="origam-chart__legend-swatch" aria-hidden="true" />
    <span class="origam-chart__legend-label">Margin</span>
  </li>
</ul>`,
        classes: [
            { cls: 'origam-chart__legend', descriptionKey: 'components.chart_legend.anatomy.root', descriptionFallback: 'Root <ul> list.' },
            { cls: 'origam-chart__legend--top', descriptionKey: 'components.chart_legend.anatomy.mod_top', descriptionFallback: 'Row flex-direction, justify-content: center.' },
            { cls: 'origam-chart__legend--bottom', descriptionKey: 'components.chart_legend.anatomy.mod_bottom', descriptionFallback: 'Row flex-direction, justify-content: center.' },
            { cls: 'origam-chart__legend--left', descriptionKey: 'components.chart_legend.anatomy.mod_left', descriptionFallback: 'Column flex-direction, with padding-right gap.' },
            { cls: 'origam-chart__legend--right', descriptionKey: 'components.chart_legend.anatomy.mod_right', descriptionFallback: 'Column flex-direction, with padding-left gap.' },
            { cls: 'origam-chart__legend-item', descriptionKey: 'components.chart_legend.anatomy.item', descriptionFallback: '<li> entry — role="button", tabindex="0", aria-pressed.' },
            { cls: 'origam-chart__legend-item--hidden', descriptionKey: 'components.chart_legend.anatomy.item_hidden', descriptionFallback: 'Hidden state modifier.' },
            { cls: 'origam-chart__legend-swatch', descriptionKey: 'components.chart_legend.anatomy.swatch', descriptionFallback: 'Colour swatch square.' },
            { cls: 'origam-chart__legend-label', descriptionKey: 'components.chart_legend.anatomy.label', descriptionFallback: 'Series name label.' }
        ]
    } satisfies IComponentAnatomy,

    a11y: {
        roles: ['list', 'button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chart_legend.a11y.key_tab',
                actionFallback: 'Moves focus through each legend entry (tabindex="0").'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chart_legend.a11y.key_activate',
                actionFallback: 'Toggles the visibility of the focused series entry.'
            }
        ],
        notes: [
            {
                noteKey: 'components.chart_legend.a11y.list_role',
                noteFallback: 'The root <ul> carries role="list" to preserve list semantics even when CSS resets remove list markers.'
            },
            {
                noteKey: 'components.chart_legend.a11y.aria_pressed',
                noteFallback: 'Each item has aria-pressed="true|false" reflecting the current visibility state, and aria-label describing the action ("visible, click to hide" / "hidden, click to show").'
            },
            {
                noteKey: 'components.chart_legend.a11y.swatch_hidden',
                noteFallback: 'The colour swatch <span> carries aria-hidden="true" — it is purely decorative.'
            },
            {
                noteKey: 'components.chart_legend.a11y.ssr_guard',
                noteFallback: 'A defensive filter removes entries missing the series ref before rendering — prevents SSR crashes when items arrive undefined.'
            }
        ]
    } satisfies IComponentA11y
}
