# OrigamNumberField

`<OrigamNumberField>` is the numeric input with increment/decrement controls.
It extends the field mixin set with `min`, `max`, `step`, `precision`,
`holdDelay`, `holdRepeat`, split-button mode, and hide-controls mode.

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const qty = ref<number | null>(1)
</script>

<template>
  <OrigamNumberField v-model="qty" label="Quantity" :min="0" :max="100" />
</template>
```

## Min / max / step / precision

```vue
<template>
  <OrigamNumberField label="Price" :min="0" :max="9999" :step="0.01" :precision="2" />
</template>
```

## Split mode

```vue
<template>
  <OrigamNumberField label="Counter" split />
</template>
```

## Hide controls

```vue
<template>
  <OrigamNumberField label="No buttons" hide-controls />
</template>
```

## Custom icons

```vue
<template>
  <OrigamNumberField
    label="Volume"
    increment-icon="mdi-volume-plus"
    decrement-icon="mdi-volume-minus"
  />
</template>
```

## States (disabled / readonly / error)

```vue
<template>
  <OrigamNumberField label="Disabled" disabled :model-value="5" />
  <OrigamNumberField label="Error"    :error="true" error-messages="Out of range" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `increment` | `{ canIncrease, onControlClick, onUpControlMousedown, onControlMouseup }` | Custom increment button |
| `decrement` | `{ canDecrease, onControlClick, onDownControlMousedown, onControlMouseup }` | Custom decrement button |
| `label` | `ILabelProps` | Custom label |
| `prepend` | — | Outside field before |
| `append` | — | Outside field after |
| `prependInner` | — | Inside field before |
| `appendInner` | — | Inside field after |
| `field` | `{ id, isDisabled, isDirty, isValid, isReadonly }` | Replace `<input>` |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number \| null` | Value changed |
| `increment` | `number \| null` | Increment button pressed |
| `decrement` | `number \| null` | Decrement button pressed |
| `focus` | `FocusEvent` | Input focused |
| `blur` | `FocusEvent` | Input blurred |
| `click:clear` | `MouseEvent` | Clear button clicked |
| `click:control` | `MouseEvent` | Control area clicked |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-number-field---control-width` | `36px` | Inc/dec button width |
| `--origam-field---border-color` | semantic border | Outline color |
