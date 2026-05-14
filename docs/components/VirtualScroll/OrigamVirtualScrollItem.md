# OrigamVirtualScrollItem

`<OrigamVirtualScrollItem>` is the per-row primitive used by
`<OrigamVirtualScroll>`. It wraps the slot content in a `ResizeObserver`
so the parent virtual engine can refine its size cache through the
emitted `update:height` event.

In day-to-day usage the parent component renders these items
automatically. You only instantiate it directly when building a
specialised list that needs its own data flow but still wants to plug
into the origam virtualisation engine.

## Basic usage

```vue
<template>
    <OrigamVirtualScrollItem @update:height="cacheHeight(index, $event)">
        <div class="row">{{ row.label }}</div>
    </OrigamVirtualScrollItem>
</template>
```

## Renderless mode

When `renderless` is `true`, the component renders no wrapper. Instead
it exposes an `itemRef` slot prop that you bind on your own root
element — the engine still observes that element's size.

```vue
<template>
    <OrigamVirtualScrollItem renderless @update:height="cacheHeight(index, $event)">
        <template #renderless="{ itemRef }">
            <article :ref="itemRef" class="card">…</article>
        </template>
    </OrigamVirtualScrollItem>
</template>
```

## Events

| Event | Payload | Description |
|---|---|---|
| `update:height` | `number` | Emitted whenever the observed element's content-box height changes. |

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `default` | — | Default content (non-renderless mode). |
| `renderless` | `itemRef` | Renderless variant — bind `itemRef` on your own element. |

## Props (interface)

```ts
interface IVirtualScrollItemProps extends ICommonsComponentProps {
    renderless?: boolean
}
```

## Anatomy

```html
<!-- non-renderless -->
<div class="origam-virtual-scroll-item">
    <slot/>
</div>

<!-- renderless -->
<slot name="renderless" :item-ref="resizeRef"/>
```

## Design tokens consumed

Item-level styling defers to the consumer; only the parent
`<OrigamVirtualScroll>` defines tokens. The single token consumed at
this level is the engine's initial estimate
(`--origam-virtual-scroll---item-height`).

## Accessibility

- Bind `aria-rowindex` on the slot root if the parent declares
  `aria-rowcount` so virtualisation does not break row addressing.

## Related

- `OrigamVirtualScroll` — the host engine that consumes
  `update:height` to refine its layout offsets.
