# OrigamSpacer

`<OrigamSpacer>` is a tiny flex utility that grows to fill the remaining
space along its parent's main axis. Use it to push siblings apart in
toolbars, navigation bars, or row layouts.

## Basic usage

```vue
<template>
    <OrigamRow>
        <OrigamCol cols="auto">left</OrigamCol>
        <OrigamSpacer />
        <OrigamCol cols="auto">right</OrigamCol>
    </OrigamRow>
</template>
```

The element only sets `flex-grow: var(--origam-spacer---flex-grow)` (1
by default) — no padding, no background, nothing else.

## Polymorphic tag

```vue
<template>
    <OrigamSpacer tag="span" />
</template>
```

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `default` | — | Optional — usually empty. |

## Props (interface)

```ts
interface ISpacerProps extends ICommonsComponentProps, ITagProps {
    // No own props beyond commons + tag.
}
```

## Anatomy

```html
<div class="origam-spacer">
    <!-- default slot (rare) -->
</div>
```

## Design tokens consumed

| CSS variable | Default |
|---|---|
| `--origam-spacer---flex-grow` | `1` |

Override the variable via a `:style` binding to make a spacer grow more
or less aggressively when several are in the same flex parent:

```vue
<template>
    <OrigamRow>
        <OrigamCol cols="auto">a</OrigamCol>
        <OrigamSpacer :style="{ '--origam-spacer---flex-grow': 2 }" />
        <OrigamCol cols="auto">b</OrigamCol>
        <OrigamSpacer />
        <OrigamCol cols="auto">c</OrigamCol>
    </OrigamRow>
</template>
```

## Accessibility

- The component renders a presentational `<div>` (or whichever `tag`
  you pick). It adds no role and is invisible to assistive tech, which
  is the intended behaviour.

## Theming notes

- No theme-aware tokens — the spacer is purely structural. Theme
  changes have no visual impact on it.

## Related

- `OrigamRow` — the most common host.
- `OrigamCol` — flex grid item.
