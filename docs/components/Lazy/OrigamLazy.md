# OrigamLazy

`<OrigamLazy>` defers rendering its default slot until the wrapper element enters the viewport. Once rendered, it stays rendered. A configurable transition wraps the appearing content.

## Basic usage

```vue
<template>
    <OrigamLazy>
        <HeavyComponent />
    </OrigamLazy>
</template>
```

## Controlled visibility

Use `v-model` to read or override whether the content has been revealed.

```vue
<template>
    <OrigamLazy v-model="isVisible">
        <MyCard />
    </OrigamLazy>
</template>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `false` | Whether the slot content is rendered |

## Intersection options

```vue
<template>
    <OrigamLazy :options="{ rootMargin: '200px', threshold: 0.1 }">
        <MyComponent />
    </OrigamLazy>
</template>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `IntersectionObserverInit` | `{}` | IntersectionObserver configuration |

## Dimension

| Prop | Type | Description |
|---|---|---|
| `height` | `string \| number` | Reserve height before content loads (prevents layout shift) |
| `width` | `string \| number` | Reserve width |

## Transition

| Prop | Type | Default | Description |
|---|---|---|---|
| `transition` | `TTransitionProps` | `OrigamFade` | Transition used when content appears |

## Tag

| Prop | Type | Default | Description |
|---|---|---|---|
| `tag` | `string` | `'div'` | Wrapper HTML element |

## Slots

| Slot | Description |
|---|---|
| `default` | Content that is lazily rendered |

## Emits

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `boolean` | Fires when the content becomes visible |

## Design tokens

`OrigamLazy` does not define component-level tokens. Style the wrapper via class or style props.
