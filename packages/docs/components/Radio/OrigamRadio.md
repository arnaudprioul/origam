# OrigamRadio

`<OrigamRadio>` is the high-level radio-button atom. It wraps `<OrigamInput>` +
`<OrigamRadioBtn>` and inherits the full mixin set (density, color, rounded,
border, elevation). Radio buttons should be grouped with `<OrigamRadioGroup>`.

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const selected = ref<string>('a')
</script>

<template>
  <OrigamRadio v-model="selected" value="a" label="Option A" />
  <OrigamRadio v-model="selected" value="b" label="Option B" />
</template>
```

## Color

```vue
<template>
  <OrigamRadio color="primary"   label="Primary"   value="p" :model-value="'p'" />
  <OrigamRadio color="secondary" label="Secondary" value="s" :model-value="'s'" />
</template>
```

## Density

```vue
<template>
  <OrigamRadio density="compact"     value="c" label="Compact" />
  <OrigamRadio density="default"     value="d" label="Default" />
  <OrigamRadio density="comfortable" value="e" label="Comfortable" />
</template>
```

## Border, rounded & elevation (visual surface)

`border` / `rounded` / `elevation` target the control's own box —
`.origam-selection-control__input`, the element wrapping the radio glyph —
so a themed radio can match the same border thickness / corner radius /
shadow rung as the rest of a theme's form fields, matching a marketing
theme's `components['origam-radio']` block.

```vue
<template>
  <OrigamRadio rounded="sm" value="a" label="Small radius" />
  <OrigamRadio border elevation="md" value="b" label="Bordered + elevated" />
</template>
```

- `border` accepts the same shapes as every other Commons `IBorderProps`
  consumer (`true` for the default thin border, a width, or a full
  `"2px dashed red"` string).
- `rounded` accepts a utility rung (`'xs'|'sm'|'md'|'lg'|'xl'|'full'|'none'`)
  or a legacy named variant — overrides the box's default circular shape.
- `elevation` accepts an origam shadow rung (`'xs'|'sm'|'md'|'lg'|'xl'`) or
  a Material-style `0..24` number, same as `OrigamBtn`/`OrigamCard`.

**Glyph caveat** — the dot itself is rendered by an icon-font glyph
(`mdi-radiobox-marked` / `mdi-radiobox-blank`), not a CSS-drawn box, and
the box has no background fill by default. `border` and `elevation` paint
real, visible pixels on their own; `rounded` alone (no border, no
elevation, no `backdrop-filter` theme) changes the box's `border-radius`
but produces no visible pixel difference on its own — see issue #241 for
the full write-up.

## States (disabled / readonly)

```vue
<template>
  <OrigamRadio label="Disabled" value="x" disabled />
  <OrigamRadio label="Readonly" value="x" readonly :model-value="'x'" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | `{ id, messagesId, isDisabled, isReadonly, isValid }` | Replaces inner `<OrigamRadioBtn>` |
| `label` | — | Custom label content |
| `input` | `{ props, icon, textColorStyles, backgroundColorStyles, model }` | Custom visual control |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `any` | Fired on selection change |
| `focus` | `FocusEvent` | Native focus |
| `blur` | `FocusEvent` | Native blur |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-radio---density` | inherited | Vertical padding offset |
| `--origam-selection-control---icon-size` | `24px` | Size of the radio dot icon |
