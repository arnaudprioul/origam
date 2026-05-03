# OrigamTextareaField

`<OrigamTextareaField>` is the multiline text input. It extends `<OrigamTextField>`
with auto-grow, manual row control, resize suppression, and a persistent-clear
button on top of the standard field mixin set.

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const bio = ref('')
</script>

<template>
  <OrigamTextareaField v-model="bio" label="Bio" />
</template>
```

## Rows & max rows

```vue
<template>
  <OrigamTextareaField label="Short"     :rows="3" />
  <OrigamTextareaField label="Auto-grow" auto-grow :max-rows="8" />
</template>
```

## No resize

```vue
<template>
  <OrigamTextareaField label="Fixed"  no-resize />
</template>
```

## Counter

```vue
<template>
  <OrigamTextareaField label="Message" :counter="500" />
</template>
```

## Prefix & suffix

```vue
<template>
  <OrigamTextareaField label="Note" prefix=">" suffix="..." />
</template>
```

## States (disabled / readonly / error)

```vue
<template>
  <OrigamTextareaField label="Disabled" disabled />
  <OrigamTextareaField label="Readonly" readonly model-value="Cannot edit" />
  <OrigamTextareaField label="Error"    :error="true" error-messages="Too long" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | field props | Full body override |
| `label` | `ILabelProps` | Custom label |
| `floatingLabel` | `ILabelProps` | Custom floating label |
| `prefix` | — | Before textarea |
| `suffix` | — | After textarea |
| `prependInner` | — | Inside field before |
| `appendInner` | — | Inside field after |
| `prepend` | — | Outside field before |
| `append` | — | Outside field after |
| `loader` | — | Loading indicator |
| `counter` | `{ counter, max, value }` | Custom counter |
| `field` | `{ id, isDisabled, isDirty, isValid, isReadonly }` | Replace `<textarea>` |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Value changed |
| `update:height` | `number` | Auto-grow height updated |
| `focus` | `FocusEvent` | Input focused |
| `blur` | `FocusEvent` | Input blurred |
| `click:clear` | `MouseEvent` | Clear button clicked |
| `click:control` | `MouseEvent` | Control area clicked |
| `mousedown:control` | `MouseEvent` | Mousedown on control |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-field---border-color` | semantic border | Outline color |
| `--origam-field---bg-color` | surface | Background |
| `--origam-textarea---min-height` | `56px` | Minimum textarea height |
