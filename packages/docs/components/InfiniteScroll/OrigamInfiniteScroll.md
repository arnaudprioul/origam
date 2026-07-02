# OrigamInfiniteScroll

`<OrigamInfiniteScroll>` fires a load event when the user scrolls near the start or end of the container. It supports both automatic (intersection-observer) and manual (button) modes.

## Basic usage

```vue
<template>
    <OrigamInfiniteScroll @load="loadMore" style="max-height: 400px; overflow-y: auto;">
        <div v-for="item in items" :key="item.id">{{ item.name }}</div>
    </OrigamInfiniteScroll>
</template>

<script setup>
const items = ref([...])
const loadMore = ({ side, done }) => {
    // fetch more items, then call done('ok' | 'empty' | 'error')
    done('ok')
}
</script>
```

## Modes

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `TInfiniteScrollMode` | `'intersect'` | `'intersect'` uses IntersectionObserver; `'manual'` shows a button |
| `side` | `TInfiniteScrollSide` | `'end'` | Which side triggers: `'start'`, `'end'`, or `'both'` |

## Dimension and margin

| Prop | Type | Description |
|---|---|---|
| `height` | `string \| number` | Height of the scroll container |
| `width` | `string \| number` | Width of the scroll container |
| `margin` | `string` | `rootMargin` for the IntersectionObserver |

## Slots

| Slot | Bindings | Description |
|---|---|---|
| `default` | — | Scrollable content |
| `loading` | `{ side, props }` | Custom loading indicator |
| `empty` | `{ side, props }` | Shown when no more items (`status='empty'`) |
| `error` | `{ side, props }` | Shown on load error (`status='error'`) |
| `loadMore` | `{ side, props }` | Custom "load more" button (manual mode) |

## Emits

| Event | Payload | Description |
|---|---|---|
| `load` | `{ side: TInfiniteScrollSide, done: (status: TInfiniteScrollStatus) => void }` | Fires when more data should be loaded |

## Typography

Controls the font size of the loading / empty / error text inside the side panels.
Only `fontSize` has a real visual effect; the SCSS reads
`--origam-infinite-scroll__loader---font-size` on `.origam-infinite-scroll__side`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `fontSize` | `TFontSize` | — | Font-size token (`xs` · `sm` · `md` · `lg` · `xl` · `2xl` · `3xl` · `4xl` · `5xl`). Overrides the loader text size without touching other text in the scroll area. |

## Design tokens

| Token | Description |
|---|---|
| `--origam-infinite-scroll---*` | Component-level token namespace |
| `--origam-infinite-scroll__loader---font-size` | Font size of the side-panel loader text (default `0.875rem`) |
