# OrigamThemeProvider

`<OrigamThemeProvider>` applies a specific theme to a sub-tree by setting the `data-theme` attribute on a wrapper element. CSS variables resolve against the nearest `data-theme` ancestor, so child components see the overridden token set.

## Basic usage

```vue
<template>
    <!-- Force dark theme for this card only -->
    <OrigamThemeProvider theme="dark">
        <OrigamCard title="Dark card" />
    </OrigamThemeProvider>
</template>
```

## Available themes

| Value | Effect |
|---|---|
| `'light'` | Forces light token set |
| `'dark'` | Forces dark token set |
| `'auto'` | No `data-theme` attribute rendered — inherits from closest ancestor |
| any string | Custom brand theme (must have a matching `tokens/semantic/{name}.json`) |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `TTheme` | `'auto'` | Theme to apply to this sub-tree |
| `tag` | `string` | `'div'` | HTML element for the wrapper |

## Slot

| Slot | Description |
|---|---|
| `default` | Content rendered inside the themed wrapper |

## Emits

`OrigamThemeProvider` emits no events.

## CSS behaviour

The component sets `display: contents` by default, so it is visually transparent — it does not introduce an extra layout box. Style the wrapper via `class` or `style` props when layout is needed.

## Multi-theme patterns

```vue
<template>
    <!-- Page is light; marketing banner is dark -->
    <OrigamThemeProvider theme="dark">
        <MarketingBanner />
    </OrigamThemeProvider>

    <!-- Brand sub-section -->
    <OrigamThemeProvider theme="brand-acme">
        <HeroSection />
    </OrigamThemeProvider>
</template>
```
