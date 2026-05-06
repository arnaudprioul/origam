# OrigamSliderField

`<OrigamSliderField>` is the range slider input. It supports single value and
range (two-thumb) mode, horizontal and vertical orientation, ticks, and step
precision.

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const volume = ref(50)
</script>

<template>
  <OrigamSliderField v-model="volume" label="Volume" :min="0" :max="100" />
</template>
```

## Range (two-thumb)

```vue
<script setup lang="ts">
import { ref } from 'vue'
const range = ref([20, 80])
</script>

<template>
  <OrigamSliderField v-model="range" range label="Price range" :min="0" :max="200" />
</template>
```

## Step

```vue
<template>
  <OrigamSliderField label="Step 10" :step="10" :min="0" :max="100" />
</template>
```

## Ticks

```vue
<template>
  <OrigamSliderField label="With ticks" show-ticks :step="25" :min="0" :max="100" />
</template>
```

## Vertical orientation

```vue
<template>
  <OrigamSliderField label="Vertical" direction="vertical" :min="0" :max="100" style="height: 200px" />
</template>
```

## Reverse

```vue
<template>
  <OrigamSliderField label="Reversed" reverse :min="0" :max="100" />
</template>
```

## Color

```vue
<template>
  <OrigamSliderField color="primary" label="Primary" :min="0" :max="100" />
  <OrigamSliderField color="success" label="Success" :min="0" :max="100" />
</template>
```

## States (disabled / readonly / error)

```vue
<template>
  <OrigamSliderField label="Disabled" disabled :model-value="40" />
  <OrigamSliderField label="Readonly" readonly :model-value="60" />
  <OrigamSliderField label="Error"    :error="true" :model-value="10" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | — | Content below track |
| `label` | — | Custom label |
| `thumb` | thumb data | Custom thumb element |
| `tick-label` | tick data | Custom tick label |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number \| number[]` | Value changed (on move) |
| `focus` | `FocusEvent` | Thumb focused |
| `blur` | `FocusEvent` | Thumb blurred |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-slider-field---track-height` | `4px` | Track thickness |
| `--origam-slider-field---thumb-size` | `20px` | Thumb diameter |
| `--origam-slider-field---track-color` | surface-variant | Inactive track |
