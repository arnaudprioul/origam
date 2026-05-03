# OrigamApp

`<OrigamApp>` is the **root layout shell** of an origam application. It wraps
`OrigamLayout` and provides the full-height coordinate space that `OrigamDrawer`,
`OrigamToolbar`, `OrigamMain`, and other layout components register themselves into.

## Basic usage

```vue
<template>
    <OrigamApp>
        <OrigamToolbar title="My App" />
        <OrigamDrawer v-model="drawerOpen">
            <OrigamList>
                <OrigamListItem title="Home" />
            </OrigamList>
        </OrigamDrawer>
        <OrigamMain>
            <router-view />
        </OrigamMain>
    </OrigamApp>
</template>
```

## Full height

`fullHeight` defaults to `true`. The root element fills the viewport vertically.

## RTL support

The component reads the RTL context from `useRtl()` and applies the
`origam-app--rtl` class automatically.

## Slots

| Slot | Description |
|---|---|
| `default` | Application content — place layout children here. |

## Design tokens

`OrigamApp` inherits all tokens from `OrigamLayout`.

| CSS variable | Description |
|---|---|
| `--origam-layout---display` | Layout display mode. |
| `--origam-layout---position` | Layout positioning. |

## Accessibility

- Acts as the page root; authors should set a `lang` attribute on the document `<html>` element.
- RTL text direction is applied automatically when the locale is right-to-left.
- All landmark regions (`<header>`, `<nav>`, `<main>`) must be direct children.

## Related

- `OrigamToolbar` — top app bar.
- `OrigamDrawer` — navigation drawer.
- `OrigamMain` — main content area.
- `OrigamLayout` — the underlying layout engine.
