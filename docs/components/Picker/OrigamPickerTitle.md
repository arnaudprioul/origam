# OrigamPickerTitle

`<OrigamPickerTitle>` is the small uppercase header rendered at the top
of every `<OrigamPicker>`. It accepts a `title` prop or arbitrary
content via the default slot.

The component is intentionally minimal — its job is consistent
typographic styling (size, weight, tracking, padding) shared by every
picker variant.

## Basic usage

```vue
<template>
    <OrigamPickerTitle title="Select date"/>
</template>
```

## Default slot override

```vue
<template>
    <OrigamPickerTitle>
        Custom <em>rich</em> content
    </OrigamPickerTitle>
</template>
```

## Polymorphic tag

The default tag is a `<div>`. Promote it to a heading when the picker
sits in a region that would benefit from semantic structure.

```vue
<template>
    <OrigamPickerTitle tag="h2" title="Pick a colour"/>
</template>
```

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `default` | — | Replaces the rendered `title` prop. |

## Props (interface)

```ts
interface IPickerTitleProps extends ICommonsComponentProps, ITagProps {
    title?: string
}
```

## Anatomy

```html
<div class="origam-picker-title">
    <!-- title prop or default slot -->
</div>
```

## Design tokens consumed

The picker title reuses tokens declared on the picker family. All values
fall back to sensible defaults so the component renders even before the
project ships custom tokens.

| CSS variable | Default | Notes |
|---|---|---|
| `--origam-picker-title---text-transform` | `uppercase` | |
| `--origam-picker-title---font-size` | `0.75rem` | |
| `--origam-picker-title---font-weight` | `400` | |
| `--origam-picker-title---letter-spacing` | `0.1666666667em` | |
| `--origam-picker-title---padding-inline` | `24px 12px` | |
| `--origam-picker-title---padding-block` | `16px` | |
| `--origam-picker-title---color` | `inherit` | Falls back to the parent picker `--origam-picker--title---color`. |

## Accessibility

- Choose a meaningful `tag` (`h2`, `h3`, …) when the picker sits in a
  context that benefits from heading structure (e.g. inside a dialog
  with multiple sections).
- The default `<div>` is fine for most popovers where the picker is
  the only content.

## Related

- `OrigamPicker` — the picker shell that hosts the title.
