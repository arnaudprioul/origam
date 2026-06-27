# OrigamTitle

`<OrigamTitle>` is the semantic heading element for origam. It renders any
HTML tag (`<h1>` by default) and wires the origam color / density / spacing
mixins so headings stay theme-aware out of the box.

It is intentionally **structural**: there is no chrome, no surface, no
elevation. Use a `<OrigamSheet>` or `<OrigamCard>` when you need a
background + radius around the title.

## Basic usage

```vue
<template>
    <OrigamTitle text="Page heading" />
</template>
```

## Tag (heading level)

The `tag` prop drives the rendered element. Pick a heading level that
matches the document outline — visual sizing comes from CSS, not from the
tag.

```vue
<template>
    <OrigamTitle tag="h1" text="H1" />
    <OrigamTitle tag="h2" text="H2" />
    <OrigamTitle tag="h3" text="H3" />
    <OrigamTitle tag="h4" text="H4" />
    <OrigamTitle tag="h5" text="H5" />
    <OrigamTitle tag="h6" text="H6" />
</template>
```

## Color

`color` and `bgColor` accept any CSS-color value (named, hex, hsl, rgb).
Intent values (`primary`, `success`, …) are typed but resolved as raw CSS
values by `useColor` — they do **not** map to semantic tokens here (no
intent → SCSS class is wired). For semantic tinting, set the relevant
component CSS variable on a `:style` binding instead:

```vue
<template>
    <OrigamTitle text="Heading" :style="{
        '--origam-title---color': 'var(--origam-color__text---primary)'
    }" />
</template>
```

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `default` | — | Replaces the inner text. Falls back to the `text` prop. |

```vue
<template>
    <OrigamTitle tag="h2">
        Welcome <em>back</em>
    </OrigamTitle>
</template>
```

## Props (interface)

```ts
interface ITitleProps extends ITagProps, ICommonsComponentProps,
    IColorProps, IDensityProps, IPaddingProps, IMarginProps,
    IBorderProps {
    text?: string
    weight?: TFontWeight // 'regular'|'medium'|'semibold'|'bold'|'extrabold'|'black'
}
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `weight` | `TFontWeight` | — | Font weight token. Sets `--origam-title---font-weight` to `var(--origam-font__weight---{weight})` (regular 400 · medium 500 · semibold 600 · bold 700 · extrabold 800 · black 900). When unset, the title keeps its theme weight. |

## Anatomy

```html
<h1 class="origam-title">
    <!-- default slot or `text` -->
</h1>
```

## Design tokens consumed

`<OrigamTitle>` reads from `tokens/component/title.json`. Override at the
document root or via a `:style` binding to re-skin a single instance.

| CSS variable | Token reference |
|---|---|
| `--origam-title---color` | `{color.text.primary}` |
| `--origam-title---font-family` | `{font.family.sans}` |
| `--origam-title---font-weight` | `{font.weight.semibold}` |
| `--origam-title---letter-spacing` | `{font.letterSpacing.tight}` |
| `--origam-title---line-height` | `{font.lineHeight.tight}` |
| `--origam-title---margin-block-start` | `{space.0}` |
| `--origam-title---margin-block-end` | `{space.0}` |
| `--origam-title---font-size-xs` | `{font.size.md}` |
| `--origam-title---font-size-sm` | `{font.size.lg}` |
| `--origam-title---font-size-md` | `{font.size.xl}` |
| `--origam-title---font-size-lg` | `{font.size.2xl}` |
| `--origam-title---font-size-xl` | `{font.size.3xl}` |
| `--origam-title---font-size-2xl` | `{font.size.4xl}` |
| `--origam-title---font-size-3xl` | `{font.size.5xl}` |

The full list lives in
`tokens/component/title.json`.

## Accessibility

- Always pick a `tag` (`h1`–`h6`) that matches the document outline. The
  default `h1` is correct for a page title; nested sections should use
  `h2`+.
- Visual size is decoupled from semantic level — never demote the tag to
  shrink a heading; restyle via the `font-size-*` variables.
- The element ships no implicit `role` override; assistive tech reads the
  rendered tag directly.

## Theming notes

- The component is theme-aware out of the box. Switching
  `<html data-theme="…">` re-resolves every variable instantly — no Vue
  re-render required.
- A sub-tree can opt into a different theme via `<OrigamThemeProvider>`.

## Related

- `OrigamLabel` — inline label element.
- `OrigamSheet` — chrome surface to wrap a title.
