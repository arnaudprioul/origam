# OrigamSelect

`<OrigamSelect>` is the dropdown select built on `<OrigamTextField>` +
`<OrigamMenu>` + `<OrigamList>`. It supports single and multiple selection,
chips display, autocomplete / filter mode, and the full field mixin set.

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const country = ref<string | null>(null)
const items = ['France', 'Germany', 'Spain', 'Italy']
</script>

<template>
  <OrigamSelect v-model="country" :items="items" label="Country" />
</template>
```

## Items with value / label

```vue
<script setup lang="ts">
const items = [
  { title: 'France', value: 'fr' },
  { title: 'Germany', value: 'de' },
]
</script>

<template>
  <OrigamSelect :items="items" item-title="title" item-value="value" label="Country" />
</template>
```

## Multiple selection

```vue
<script setup lang="ts">
const selected = ref<string[]>([])
</script>

<template>
  <OrigamSelect v-model="selected" :items="['A','B','C']" multiple label="Multi" />
</template>
```

## Chips

```vue
<template>
  <OrigamSelect :items="['A','B','C']" multiple chips label="With chips" />
</template>
```

## Closable chips

```vue
<template>
  <OrigamSelect :items="['A','B','C']" multiple chips closable-chips label="Removable chips" />
</template>
```

## Autocomplete / filter

```vue
<template>
  <OrigamSelect :items="['Apple','Banana','Cherry']" autocomplete label="Search" />
</template>
```

## No-data text

```vue
<template>
  <OrigamSelect :items="[]" no-data-text="Nothing found" label="Empty" />
</template>
```

## States (disabled / readonly / error)

```vue
<template>
  <OrigamSelect label="Disabled" disabled :items="['A']" />
  <OrigamSelect label="Readonly" readonly :items="['A']" model-value="A" />
  <OrigamSelect label="Error" :error="true" error-messages="Select an option" :items="['A']" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | — | Replace dropdown list |
| `item` | `{ item, props }` | Custom list item |
| `chip` | `{ item, props }` | Custom chip |
| `selection` | `{ item, index }` | Custom selection display |
| `no-data` | — | Empty state |
| `label` | `ILabelProps` | Custom label |
| `prepend` | — | Outer left |
| `append` | — | Outer right |
| `prependInner` | — | Inside field left |
| `appendInner` | — | Inside field right |
| `loader` | — | Loading indicator |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `any` | Selection changed |
| `update:menu` | `boolean` | Menu open/close |
| `update:search` | `string` | Search text changed |
| `focus` | `FocusEvent` | Field focused |
| `blur` | `FocusEvent` | Field blurred |
| `click:clear` | `MouseEvent` | Clear clicked |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-field---border-color` | semantic border | Outline |
| `--origam-field---bg-color` | surface | Background |
| `--origam-select---menu-max-height` | `300px` | Dropdown max height |
