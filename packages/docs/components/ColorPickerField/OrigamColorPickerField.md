# OrigamColorPickerField

`<OrigamColorPickerField>` is a text-field that opens an `<OrigamColorPicker>` in a dropdown menu. The selected colour is displayed as a swatch inside the field prefix.

## Basic usage

```vue
<template>
    <OrigamColorPickerField v-model="color" label="Brand colour" />
</template>

<script setup>
import { ref } from 'vue'
const color = ref(null)
</script>
```

## Menu behaviour

The picker opens when the user clicks the field. Use `close-on-select` to close it automatically once a colour is chosen.

```vue
<template>
    <OrigamColorPickerField v-model="color" close-on-select />
</template>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `menu` | `boolean` | `false` | Controls picker visibility (v-model:menu) |
| `menuProps` | `IMenuProps` | `undefined` | Props forwarded to the underlying `OrigamMenu` |
| `closeOnSelect` | `boolean` | `false` | Closes the picker immediately after colour selection |
| `openOnClear` | `boolean` | `false` | Re-opens the picker when the field is cleared |

## Labels and text

```vue
<template>
    <OrigamColorPickerField
        v-model="color"
        open-text="origam.open"
        close-text="origam.close"
    />
</template>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `openText` | `string` | `'origam.open'` | ARIA label when picker is closed |
| `closeText` | `string` | `'origam.close'` | ARIA label when picker is open |

## States

```vue
<template>
    <OrigamColorPickerField v-model="color" disabled />
    <OrigamColorPickerField v-model="color" readonly />
</template>
```

## Slots

| Slot | Description |
|---|---|
| `prepend` | Content prepended outside the field |
| `append` | Content appended outside the field |
| `prependInner` | Additional content before the colour swatch |
| `appendInner` | Additional content after the text |
| `floatingLabel` | Custom floating label |
| `label` | Custom label |
| `prefix` | Text prefix inside the field |
| `suffix` | Text suffix inside the field |
| `clear` | Custom clear icon |
| `loader` | Custom loader |
| `colorSelection` | Custom rendering of the selected colour value text |

## Emits

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `string \| null` | Fires when the colour changes |
| `update:menu` | `boolean` | Fires when the picker opens or closes |

## Design tokens

| Token | Description |
|---|---|
| `--origam-field---padding-start` | Overridden to `0` so the swatch bleeds to the edge |
