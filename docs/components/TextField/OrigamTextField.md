# OrigamTextField

`<OrigamTextField>` is the standard single-line text input. It wraps
`<OrigamField>` + `<OrigamInput>` and exposes type, counter, placeholder,
prefix/suffix, inner prepend/append icons, and the full validation pipeline.

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
</script>

<template>
  <OrigamTextField v-model="name" label="Full name" />
</template>
```

## Variants

```vue
<template>
  <OrigamTextField variant="outlined" label="Outlined" />
  <OrigamTextField variant="filled"   label="Filled" />
  <OrigamTextField variant="plain"    label="Plain" />
</template>
```

## Color

```vue
<template>
  <OrigamTextField color="primary"   label="Primary" />
  <OrigamTextField color="secondary" label="Secondary" />
</template>
```

## Density

```vue
<template>
  <OrigamTextField density="compact"     label="Compact" />
  <OrigamTextField density="default"     label="Default" />
  <OrigamTextField density="comfortable" label="Comfortable" />
</template>
```

## Type

```vue
<template>
  <OrigamTextField type="text"   label="Text" />
  <OrigamTextField type="email"  label="Email" />
  <OrigamTextField type="search" label="Search" />
  <OrigamTextField type="tel"    label="Tel" />
  <OrigamTextField type="url"    label="URL" />
</template>
```

## Counter

```vue
<template>
  <OrigamTextField label="Bio" :counter="150" />
</template>
```

## Prefix & suffix

```vue
<template>
  <OrigamTextField label="Price" prefix="$" suffix=".00" />
</template>
```

## Prepend / append inner icons

```vue
<template>
  <OrigamTextField label="Search" prepend-inner-icon="mdi-magnify" clearable />
</template>
```

## States (disabled / readonly / error)

```vue
<template>
  <OrigamTextField label="Disabled" disabled model-value="locked" />
  <OrigamTextField label="Readonly" readonly model-value="read-only" />
  <OrigamTextField label="Error"    error error-messages="Required" />
</template>
```

## Validation

```vue
<script setup lang="ts">
const rules = [(v: string) => !!v || 'Field is required']
</script>

<template>
  <OrigamTextField label="Required" :rules="rules" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | `{ class }` + field props | Full field-body override |
| `label` | `ILabelProps` | Custom label |
| `floatingLabel` | `ILabelProps` | Custom floating label |
| `prefix` | — | Content before the input |
| `suffix` | — | Content after the input |
| `prependInner` | — | Content inside field, before input |
| `appendInner` | — | Content inside field, after input |
| `prepend` | — | Content outside field, before |
| `append` | — | Content outside field, after |
| `loader` | — | Custom loading indicator |
| `counter` | `{ counter, max, value }` | Custom counter display |
| `field` | `{ id, isDisabled, isDirty, isValid, isReadonly }` | Replace the `<input>` element |
| `messages` | `{ hasMessages, messages }` | Custom messages area |
| `details` | any | Custom details row |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Value changed |
| `focus` | `FocusEvent` | Input focused |
| `blur` | `FocusEvent` | Input blurred |
| `click:clear` | `MouseEvent` | Clear button clicked |
| `click:control` | `MouseEvent` | Field control area clicked |
| `mousedown:control` | `MouseEvent` | Mousedown on field control |
| `click:prepend` | `MouseEvent` | Outer prepend clicked |
| `click:append` | `MouseEvent` | Outer append clicked |
| `click:prependInner` | `MouseEvent` | Inner prepend clicked |
| `click:appendInner` | `MouseEvent` | Inner append clicked |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-field---border-color` | semantic border | Field outline color |
| `--origam-field---label-color` | semantic text | Floating label color |
| `--origam-field---bg-color` | surface | Field background |
