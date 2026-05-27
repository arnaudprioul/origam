# OrigamSwitch

`<OrigamSwitch>` is a toggle switch built on `<OrigamInput>` +
`<OrigamSelectionControl type="checkbox">`. It adds an inset track, a thumb,
and optional `flat` / `indeterminate` modes on top of the standard mixin set.

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const enabled = ref(false)
</script>

<template>
  <OrigamSwitch v-model="enabled" label="Enable notifications" />
</template>
```

## Color

```vue
<template>
  <OrigamSwitch color="primary" label="Primary" :model-value="true" />
  <OrigamSwitch color="success" label="Success" :model-value="true" />
</template>
```

## Density

```vue
<template>
  <OrigamSwitch density="compact"     label="Compact" />
  <OrigamSwitch density="default"     label="Default" />
  <OrigamSwitch density="comfortable" label="Comfortable" />
</template>
```

## Inset & flat

```vue
<template>
  <OrigamSwitch inset label="Inset track" />
  <OrigamSwitch flat  label="No elevation on thumb" />
</template>
```

## Indeterminate

```vue
<template>
  <OrigamSwitch indeterminate label="Indeterminate" />
</template>
```

## States (disabled / readonly)

```vue
<template>
  <OrigamSwitch label="Disabled" disabled />
  <OrigamSwitch label="Readonly" readonly :model-value="true" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | `{ id, messagesId, isDisabled, isReadonly, isValid }` | Full override of the inner control |
| `label` | — | Custom label content |
| `thumb` | `{ icon }` | Custom thumb element |
| `track.true` | `{ model, isValid }` | Content inside track when ON |
| `track.false` | `{ model, isValid }` | Content inside track when OFF |
| `loader` | — | Custom loading indicator |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `any` | Fired on toggle |
| `focus` | `FocusEvent` | Native focus |
| `blur` | `FocusEvent` | Native blur |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-switch---track-width` | `51px` | Track width |
| `--origam-switch---track-height` | `24px` | Track height |
| `--origam-switch---thumb-size` | `20px` | Thumb diameter |
