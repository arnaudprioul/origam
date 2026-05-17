# OrigamChart

In-house chart component. Single API, eight visualisation primitives
(line, area, bar, column, pie, donut, scatter, radar), pure SVG
rendering — no canvas, no `d3`, no `chart.js`, no `echarts`.

The component is intentionally **simple**: it's designed for
dashboards, marketing pages, and admin panels where you need a
correct, accessible, theme-aware chart in 20 lines of template
code, not a 1.5MB framework.

## The eight chart types

| `type`     | Best for                                                          |
|------------|-------------------------------------------------------------------|
| `line`     | Time series, continuous trends (1 to N series).                   |
| `area`     | Same as line but filled — emphasises magnitude over comparison.   |
| `bar`      | Horizontal bars — useful when category labels are long.           |
| `column`   | Vertical bars — the canonical comparison chart.                   |
| `pie`      | Part-of-whole; up to ~7 slices before legibility drops.           |
| `donut`    | Same as pie, but with a hole — convenient for a centre label.     |
| `scatter`  | Correlation between two numeric dimensions.                       |
| `radar`    | Multi-axis profile (e.g. character stats, balanced scorecard).    |

## Quick start

```vue
<template>
    <origam-chart
        type="line"
        :series="series"
        :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May']"
        :height="400"
        title="Monthly sales"
        :animated="true"
        @point-click="onPointClick"
    />
</template>

<script setup lang="ts">
    const series = [
        { name: 'Sales 2025', data: [10, 20, 15, 25, 30], color: 'primary' },
        { name: 'Sales 2026', data: [12, 18, 22, 28, 35], color: 'success' }
    ]
</script>
```

## Props

| Prop                | Type                              | Default      | Notes                                          |
|---------------------|-----------------------------------|--------------|------------------------------------------------|
| `type`              | `TChartType`                      | `'line'`     | One of the eight primitives.                   |
| `series`            | `IChartSeries[]`                  | required     | Empty array renders the `#empty` slot.         |
| `categories`        | `string[]`                        | `[]`         | X-axis labels (line/area/bar/column/radar).    |
| `height`            | `number \| string`                | `300`        | px when number, raw CSS otherwise.             |
| `title`             | `string`                          | —            | Shown above the chart, replaceable via slot.   |
| `subtitle`          | `string`                          | —            | Below title.                                   |
| `showLegend`        | `boolean`                         | `true`       | Toggle legend block.                           |
| `legendPosition`    | `'top'\|'bottom'\|'left'\|'right'`| `'bottom'`   | Anchor.                                        |
| `showTooltip`       | `boolean`                         | `true`       | Hover tooltip on data points.                  |
| `showGrid`          | `boolean`                         | `true`       | Background gridlines.                          |
| `showAxis`          | `boolean`                         | `true`       | X/Y axis lines + labels.                       |
| `animated`          | `boolean`                         | `true`       | Entrance animation (respects reduced motion).  |
| `animationDuration` | `number` (ms)                     | `600`        | Total entrance length.                         |
| `stacked`           | `boolean`                         | `false`      | Stack bar / column series.                     |
| `donutHoleSize`     | `number` (0..1)                   | `0.6`        | Inner radius proportion for donut.             |
| `colorScheme`       | `Array<TIntent \| string>`        | 8 intents    | Cycle palette.                                 |
| `xAxisFormat`       | `(v) => string`                   | —            | Tick label formatter (X).                      |
| `yAxisFormat`       | `(v) => string`                   | —            | Tick label formatter (Y).                      |
| `aspectRatio`       | `string`                          | —            | CSS aspect-ratio (`'16/9'`…); wins over height.|
| `smoothing`         | `'none' \| 'curve'`               | `'none'`     | Catmull-Rom curve for line / area.             |
| `yMin` / `yMax`     | `number`                          | auto         | Override the computed Y range.                 |

### `IChartSeries`

```ts
interface IChartSeries {
    name: string              // legend + screen-reader
    data: number[] | Array<{ x: number | string, y: number, name?: string }>
    color?: TIntent | string  // intent or raw CSS
    visible?: boolean         // legend-driven; default true
    type?: TChartType         // mix-chart override (e.g. line over a column chart)
}
```

The two `data` shapes:

- **Number array** — values pair with `categories[i]`. Ideal for
  bucketed time series.
- **Object array** — explicit `{x, y}` pairs. Required for scatter
  (no implicit X axis); useful for sparse data.

### `IChartPoint` (emit payload)

```ts
interface IChartPoint {
    seriesIndex: number
    seriesName: string
    dataIndex: number
    x: number | string
    y: number
    color: string             // resolved CSS string
}
```

## Emits

| Event           | Payload                                              | Notes                                              |
|-----------------|------------------------------------------------------|----------------------------------------------------|
| `point-click`   | `(point: IChartPoint, originalEvent)`                | Mouse / keyboard activation on a data point.       |
| `legend-click`  | `(series: IChartSeries, index: number)`              | Click on a legend entry.                           |
| `series-toggle` | `(series: IChartSeries, visible: boolean)`           | Visibility flip resulting from the legend click.   |

## Slots

| Slot            | Bindings                                             | Notes                                              |
|-----------------|------------------------------------------------------|----------------------------------------------------|
| `title`         | —                                                    | Replace the title + subtitle block wholesale.      |
| `tooltip`       | `{ point, series, category }`                        | Replace the default tooltip card.                  |
| `legend-item`   | `{ series, index, visible }`                         | Render a single legend entry.                      |
| `empty`         | —                                                    | Shown when `series` is empty or fully hidden.      |

## Custom slots

```vue
<origam-chart type="line" :series="series" :categories="categories">
    <template #tooltip="{ point, series, category }">
        <div class="card">
            <strong>{{ series.name }}</strong>
            <small>{{ category }}</small>
            <span>${{ point.y }}k</span>
        </div>
    </template>

    <template #legend-item="{ series, visible }">
        <span :class="visible ? 'on' : 'off'">
            {{ series.name }}
        </span>
    </template>
</origam-chart>
```

## `useChart` composable

Stateless engine that produces every render-time descriptor the
component needs. Reusable on its own if you want to paint a custom
SVG tree without buying into the component template.

```ts
import { useChart } from '@origam/composables'

const { viewBox, scales, ticks, paths, legend, hover, onPointHover } = useChart({
    type: () => 'line',
    series: () => mySeries,
    categories: () => myCategories,
    stacked: () => false,
    donutHoleSize: () => 0,
    colorScheme: () => [],
    smoothing: () => 'none',
    yMin: () => undefined,
    yMax: () => undefined,
    width: () => 600,
    height: () => 360,
    padding: () => ({ top: 24, right: 24, bottom: 36, left: 48 })
})
```

Every getter is a `() => …` thunk — drive from props, a store, or
even hardcoded constants.

## Path utilities (`src/utils/Chart/path.util.ts`)

Pure SVG path-string generators. Re-usable outside the chart for
sparklines, mini charts, or custom SVG art:

- `linePath(points)` — straight polyline.
- `smoothPath(points)` — Catmull-Rom cubic Bezier.
- `areaPath(points, baseline, smooth?)` — closed area down to baseline.
- `arcPath(cx, cy, outerR, innerR, startAngle, endAngle)` — pie / donut slice.
- `polygonPath(points)` — closed polygon (radar).
- `polarToCartesian(cx, cy, r, angle)` — coordinate conversion.
- `pathLength(points)` — Cartesian polyline length (used by the
  stroke-dashoffset entrance animation).

## Performance notes

- **Up to ~1000 points per chart** is comfortable with SVG. Above
  that, the DOM node count starts to hurt — consider rendering a
  canvas/wasm chart instead.
- **No `ResizeObserver`** — the SVG uses `viewBox` + CSS, so it
  scales for free with the container.
- **No DOM measurement during render** — every coordinate comes
  from `useChart`, which is pure (`width`, `height`, `padding` are
  thunks). The chart is SSR-safe.

## Accessibility

- The container carries `role="figure"` + an `aria-label` derived
  from the title.
- The `<svg>` carries `role="img"` plus a `<title>` and a `<desc>`
  child — screen readers read the chart type, the number of series,
  and the value range without diving into individual nodes.
- Each data point (`<circle>` / `<rect>` / pie slice) is
  `tabindex="0"` + `role="button"` with a descriptive
  `aria-label`. `Enter` / `Space` fire `point-click`.
- The legend is a `<ul role="list">` with `<li role="listitem">`
  entries. Click / `Enter` / `Space` toggle series visibility.
- The entrance animation honours `prefers-reduced-motion: reduce`.

## Limitations

- **No multi-axis** (one Y scale). Mix charts (column + line) share
  the global Y range.
- **No 3D / pyramid / funnel** — out of scope. Use a dedicated lib
  if you need them.
- **`smoothing="curve"`** may overshoot at sharp peaks (classic
  Catmull-Rom artefact). Switch back to `'none'` for hard data.
- **Stacked bar / column only** — line stacks are not supported
  in this first cut.

## Browser support

Chrome 96+, Firefox 95+, Safari 15+. SSR-safe (Nuxt, VitePress).
