# OrigamTooltip

`<OrigamTooltip>` is a **non-interactive floating label** that appears on
hover (or focus) near its activator element. It wraps `OrigamOverlay` with
`role="tooltip"`, hover-open defaults, and eager rendering.

## Basic usage

```vue
<template>
    <OrigamTooltip text="Save your work">
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a" icon="mdi-content-save" />
        </template>
    </OrigamTooltip>
</template>
```

## Location

Position relative to the activator: `top`, `bottom`, `left`, `right` (default).

```vue
<template>
    <OrigamTooltip text="Above" location="top">
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Hover</OrigamBtn>
        </template>
    </OrigamTooltip>
</template>
```

## Custom content

Use the `default` slot for rich tooltip content.

```vue
<template>
    <OrigamTooltip>
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Rich</OrigamBtn>
        </template>
        <strong>Bold</strong> tooltip with <em>markup</em>.
    </OrigamTooltip>
</template>
```

## Open on click

```vue
<template>
    <OrigamTooltip text="Click to see" open-on-click :open-on-hover="false">
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Click</OrigamBtn>
        </template>
    </OrigamTooltip>
</template>
```

## Offset

```vue
<template>
    <OrigamTooltip text="Offset tooltip" :offset="20">
        <template #activator="{ props: a }">
            <OrigamBtn v-bind="a">Offset</OrigamBtn>
        </template>
    </OrigamTooltip>
</template>
```

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `activator` | `{ props }` | Element that triggers the tooltip. Spread `props`. |
| `default` | — | Tooltip content (falls back to the `text` prop). |

## Events

| Name | Payload | When |
|---|---|---|
| `update:modelValue` | `boolean` | Tooltip opens / closes. |

## Design tokens

| CSS variable | Description |
|---|---|
| `--origam-tooltip---background-color` | Background (defaults to neutral-800). |
| `--origam-tooltip---color` | Text color (defaults to inverse text). |
| `--origam-tooltip---font-size` | Font size (0.75 rem). |
| `--origam-tooltip---font-weight` | Font weight (500). |
| `--origam-tooltip---padding-block` | Vertical padding. |
| `--origam-tooltip---padding-inline` | Horizontal padding. |
| `--origam-tooltip---border-radius` | Border radius. |
| `--origam-tooltip---max-width` | Maximum width. |
| `--origam-tooltip---z-index` | Z-index. |

## Accessibility

- `role="tooltip"` is set on the floating surface.
- The activator receives `aria-describedby` pointing to the tooltip id.
- Tooltip is shown on both mouse hover and keyboard focus.
- Does not receive focus itself; it is informational only.
