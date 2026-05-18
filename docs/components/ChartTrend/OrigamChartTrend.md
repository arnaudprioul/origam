# OrigamChartTrend

Compact trend sparkline — no axes, no legend by default. Ideal for KPI cards.

Type-specific wrapper around `<OrigamChart type="trend">` with a
tightly-typed prop surface. Behaviour, styling, accessibility, and
i18n are inherited verbatim from `<OrigamChart>` — use this component
when you want compile-time type safety on the prop list; reach for
`<OrigamChart>` directly when you need to switch types at runtime.

## Quick start

```vue
<template>
    <origam-chart-trend
        :series="series"
        :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
        :height="320"
        title="Trend demo"
    />
</template>

<script setup lang="ts">
import { OrigamChartTrend } from '@origam/components'
import type { IChartSeries } from '@origam/interfaces'

const series: Array<IChartSeries> = [
    { name: 'Revenue', data: [120, 145, 132, 168, 195, 210], color: 'primary' },
    { name: 'Expenses', data: [80, 92, 88, 105, 118, 124], color: 'warning' }
]
</script>
```

## Props

Inherited from `IChartBaseProps`:

| Prop                 | Type                                              | Default       | Description                                                                                  |
|----------------------|---------------------------------------------------|---------------|----------------------------------------------------------------------------------------------|
| `series`             | `Array<IChartSeries>`                             | required      | One or more data series. Empty array renders the `#empty` slot.                              |
| `categories`         | `Array<string>`                                   | `[]`          | X-axis category labels. Length should match the longest series.                              |
| `height`             | `number \| string`                                | `280`         | Plotting area height. Ignored when `aspectRatio` is set.                                     |
| `title`              | `string`                                          | `undefined`   | Optional title rendered above the plot.                                                       |
| `subtitle`           | `string`                                          | `undefined`   | Optional subtitle below the title.                                                            |
| `showLegend`         | `boolean`                                         | `true`        | Toggle the legend block.                                                                      |
| `legendPosition`     | `'top' \| 'right' \| 'bottom' \| 'left'`           | `'bottom'`    | Anchor of the legend block.                                                                   |
| `showTooltip`        | `boolean`                                         | `true`        | Toggle the hover tooltip.                                                                     |
| `animated`           | `boolean`                                         | `true`        | Animate paths / bars / slices on first paint and data changes. Respects `prefers-reduced-motion`. |
| `animationDuration`  | `number`                                          | `600`         | Animation duration in milliseconds.                                                           |
| `colorScheme`        | `Array<TIntent \| string>`                        | DS palette    | Palette used when a series does not pin its own `color`.                                     |
| `aspectRatio`        | `string`                                          | `undefined`   | CSS `aspect-ratio` shortcut (`'16/9'`, `'4/3'`, …). Overrides `height` when set.            |
| `smoothing`          | `'none' \| 'curve'`                                | `'curve'`     | Sparkline smoothing. Defaults to `'curve'` for visual softness at small sizes.                |

Plus the inherited DS contracts (`class`, `style`) from `ICommonsComponentProps`.

## Events

| Event           | Payload                                                       | Fires when                                                       |
|-----------------|---------------------------------------------------------------|------------------------------------------------------------------|
| `point-click`   | `(point, originalEvent)`                                      | Mouse / keyboard activation on a data point.                     |
| `legend-click`  | `(series, index)`                                             | Click on a legend entry.                                         |
| `series-toggle` | `(series, visible)`                                           | Resulting visibility flip after a legend click.                  |

## Slots

| Slot          | Bindings                                                    | Description                                  |
|---------------|-------------------------------------------------------------|----------------------------------------------|
| `tooltip`     | `{ point, series, category }`                                | Replace the default tooltip body.            |
| `legend-item` | `{ series, index, visible }`                                 | Replace one legend entry.                    |
| `title`       | —                                                           | Replace the title block (title + subtitle).  |
| `empty`       | —                                                           | Render when `series` is empty.               |

## Related

- `<OrigamChart>` — the universal variant-based component. Use it when you need to switch chart type at runtime.
- `IChartBaseProps` — base interface extended by every per-type chart component.
- `useChart` — the headless composable that produces path / rect / circle descriptors. Consumed by `<OrigamChart>`; not used directly by the per-type wrappers.
