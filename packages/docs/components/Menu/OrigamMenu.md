# OrigamMenu

`<OrigamMenu>` is a **floating dropdown** built on `OrigamOverlay`. It opens
on click by default (or on hover / right-click) and positions itself connected
to its activator element. Nested menus are supported natively.

## Basic usage

```vue
<template>
    <OrigamMenu :items="[{ title: 'Edit' }, { title: 'Delete' }]">
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Actions</OrigamBtn>
        </template>
    </OrigamMenu>
</template>
```

## With title

```vue
<template>
    <OrigamMenu title="Options" :items="items">
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Options</OrigamBtn>
        </template>
    </OrigamMenu>
</template>
```

## Custom content

Use the `default` slot when `items` is insufficient.

```vue
<template>
    <OrigamMenu>
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Custom</OrigamBtn>
        </template>
        <OrigamList>
            <OrigamListItem title="Custom item" />
        </OrigamList>
    </OrigamMenu>
</template>
```

## Open on hover

```vue
<template>
    <OrigamMenu open-on-hover :open-on-click="false">
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Hover me</OrigamBtn>
        </template>
    </OrigamMenu>
</template>
```

## Offset

```vue
<template>
    <OrigamMenu :offset="[8, 8]">
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Offset</OrigamBtn>
        </template>
    </OrigamMenu>
</template>
```

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `activator` | `{ props }` | Element that toggles the menu. Spread `props`. |
| `default` | — | Full content override (replaces the auto-generated list). |

## Events

| Name | Payload | When |
|---|---|---|
| `update:modelValue` | `boolean` | Menu open / close. |
| `contextmenu` | `MouseEvent` | Right-click when `openOnContextMenu`. |

## Design tokens

| CSS variable | Description |
|---|---|
| `--origam-menu---background` | Menu surface background. |
| `--origam-menu---color` | Menu text color. |
| `--origam-menu---border-radius` | Menu border radius. |
| `--origam-menu---box-shadow` | Menu shadow. |
| `--origam-menu---max-height` | Maximum height before scrolling. |
| `--origam-menu---z-index` | Z-index stacking. |
| `--origam-menu__content---max-width` | List container max-width. |
| `--origam-menu__content---padding` | List container padding. |

## Accessibility

- `role="menu"` is set on the overlay.
- The activator gets `aria-haspopup="menu"`, `aria-expanded`, and `aria-owns`.
- Arrow keys navigate between focusable list items.
- `ESC` and `Tab` close the menu and return focus to the activator.
