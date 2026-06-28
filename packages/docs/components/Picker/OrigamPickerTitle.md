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

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | `undefined` | Text rendered inside the title. Override via the `default` slot for rich content. |
| `color` | `TColor` | `undefined` | Text colour. Intent value or custom CSS colour. |
| `bgColor` | `TColor` | `undefined` | Background colour of the title bar. |
| `tag` | `string` | `'div'` | Polymorphic tag. Use `'h2'`/`'h3'` for semantic heading structure. |
| `fontSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl'` | `undefined` | Overrides `--origam-picker-title---font-size` with the matching primitive token. Default is `0.75rem`. |
| `fontWeight` | `'regular' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'` | `undefined` | Overrides `--origam-picker-title---font-weight` with the matching primitive token. Default is `400`. |
| `letterSpacing` | `'tight' \| 'normal' \| 'wide' \| 'wider' \| 'widest'` | `undefined` | Overrides `--origam-picker-title---letter-spacing` with the matching primitive token. Default is `0.1666666667em`. |

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
