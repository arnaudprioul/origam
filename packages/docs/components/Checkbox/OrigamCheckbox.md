# OrigamCheckbox

`<OrigamCheckbox>` is the high-level checkbox form atom. It wraps `<OrigamInput>` +
`<OrigamCheckboxBtn>` and wires validation, hint, error messages and the full
mixin set (density, color, rounded, border, elevation).

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const accepted = ref(false)
</script>

<template>
  <OrigamCheckbox v-model="accepted" label="Accept terms" />
</template>
```

## Color

```vue
<template>
  <OrigamCheckbox color="primary"   label="Primary"   :model-value="true" />
  <OrigamCheckbox color="success"   label="Success"   :model-value="true" />
  <OrigamCheckbox color="danger"    label="Danger"    :model-value="true" />
</template>
```

## Density

```vue
<template>
  <OrigamCheckbox density="compact"     label="Compact" />
  <OrigamCheckbox density="default"     label="Default" />
  <OrigamCheckbox density="comfortable" label="Comfortable" />
</template>
```

## Border, rounded & elevation (visual surface)

`border` / `rounded` / `elevation` target the control's own box —
`.origam-selection-control__input`, the element wrapping the check glyph —
so a themed checkbox can match the same border thickness / corner radius /
shadow rung as the rest of a theme's form fields, matching a marketing
theme's `components['origam-checkbox']` block.

```vue
<template>
  <OrigamCheckbox rounded="sm" label="Small radius" />
  <OrigamCheckbox rounded="lg" label="Large radius" />
  <OrigamCheckbox border elevation="md" label="Bordered + elevated" />
</template>
```

- `border` accepts the same shapes as every other Commons `IBorderProps`
  consumer (`true` for the default thin border, a width, or a full
  `"2px dashed red"` string).
- `rounded` accepts a utility rung (`'xs'|'sm'|'md'|'lg'|'xl'|'full'|'none'`)
  or a legacy named variant — overrides the box's default circular shape.
- `elevation` accepts an origam shadow rung (`'xs'|'sm'|'md'|'lg'|'xl'`) or
  a Material-style `0..24` number, same as `OrigamBtn`/`OrigamCard`.

**Glyph caveat** — the check mark itself is rendered by an icon-font glyph
(`mdi-checkbox-marked-outline` / `mdi-checkbox-blank-outline`), not a
CSS-drawn box, and the box has no background fill by default. In practice
this means:
- `border` and `elevation` paint real, visible pixels on their own (a
  border / shadow renders even around a transparent box).
- `rounded` alone (no border, no elevation, no `backdrop-filter` theme)
  changes the box's `border-radius` but produces **no visible pixel
  difference**, because there is nothing painted on the box to round.
  It becomes visible as soon as it's combined with `border` and/or
  `elevation` (both of which follow the box's corner radius).

This is a known limitation tracked as a follow-up design decision — see
issue #241 for the full write-up and glyph-vs-box design discussion.

## States (disabled / readonly / indeterminate)

```vue
<template>
  <OrigamCheckbox label="Disabled"      disabled />
  <OrigamCheckbox label="Readonly"      readonly :model-value="true" />
  <OrigamCheckbox label="Indeterminate" indeterminate />
</template>
```

## Error & validation

```vue
<script setup lang="ts">
const rules = [(v: boolean) => v || 'You must accept']
</script>

<template>
  <OrigamCheckbox label="Accept" :rules="rules" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | `{ id, messagesId, isDisabled, isReadonly, isValid }` | Replaces the inner `<OrigamCheckboxBtn>` entirely |
| `label` | — | Custom label content |
| `input` | `{ props, icon, textColorStyles, backgroundColorStyles, model }` | Custom visual control (the box itself) |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `any` | Fired when the checkbox is toggled |
| `focus` | `FocusEvent` | Native focus on the inner input |
| `blur` | `FocusEvent` | Native blur on the inner input |
| `click:label` | `MouseEvent` | Label element was clicked |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-checkbox---density` | inherited | Vertical padding offset |
| `--origam-selection-control---icon-size` | `24px` | Size of the check icon |
