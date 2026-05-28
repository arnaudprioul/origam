# OrigamBtnToggle

`<OrigamBtnToggle>` is the stateful sibling of
`<OrigamBtnGroup>` (separate doc): same visual segmented control,
plus single- or multi-selection wired through `useGroup`. Children
register themselves automatically and the active button receives the
`origam-btn-group-item--active` class (`selectedClass` prop to override).

Use it for tabs-as-buttons, view switchers, alignment selectors,
on/off filter clusters — anywhere the user needs to pick one (or many)
of a fixed set.

## Single selection (default)

Bind `v-model` to a single value. Each child `<OrigamBtn>` declares its
own `value` prop; clicking selects.

```vue
<template>
    <OrigamBtnToggle v-model="alignment">
        <OrigamBtn value="left"   text="Left"   />
        <OrigamBtn value="center" text="Center" />
        <OrigamBtn value="right"  text="Right"  />
    </OrigamBtnToggle>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const alignment = ref<'left' | 'center' | 'right'>('center')
</script>
```

## Multiple selection

Set `multiple` and bind to an array. The selection becomes union-style.

```vue
<template>
    <OrigamBtnToggle v-model="formats" multiple>
        <OrigamBtn value="bold"      text="B" />
        <OrigamBtn value="italic"    text="I" />
        <OrigamBtn value="underline" text="U" />
    </OrigamBtnToggle>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const formats = ref<Array<string>>(['bold'])
</script>
```

## Mandatory

`mandatory` forbids the empty selection — clicking the currently
selected item won't deselect it. Useful for "exactly one" pickers.

```vue
<template>
    <OrigamBtnToggle v-model="density" mandatory>
        <OrigamBtn value="compact"     text="Compact"  />
        <OrigamBtn value="default"     text="Default"  />
        <OrigamBtn value="comfortable" text="Comfortable" />
    </OrigamBtnToggle>
</template>
```

## Disabled

Set `disabled` on the parent to lock the entire group, or per-child
to disable individual buttons.

```vue
<template>
    <OrigamBtnToggle v-model="value" disabled>
        <OrigamBtn value="a" text="A" />
        <OrigamBtn value="b" text="B" />
    </OrigamBtnToggle>
</template>
```

## Forwarded mixins

`OrigamBtnToggle` extends `OrigamBtnGroup`, so every prop documented
on the group works here too: `density`, `divided`, `rounded`, `border`,
`color`, `bgColor`, `tag`, …

```vue
<template>
    <OrigamBtnToggle v-model="value" density="compact" rounded color="primary">
        <OrigamBtn value="grid" text="Grid" />
        <OrigamBtn value="list" text="List" />
    </OrigamBtnToggle>
</template>
```

## Slot scope

The default slot is the canonical child layer. The component also
exposes the underlying group helpers through scoped slots for
advanced use cases (e.g. building a custom header with prev/next):

```vue
<template>
    <OrigamBtnToggle v-model="step">
        <template #default="{ next, prev, isSelected, selected }">
            <OrigamBtn :value="0" text="Step 1" />
            <OrigamBtn :value="1" text="Step 2" />
            <OrigamBtn :value="2" text="Step 3" />
            <span class="hint">selected = {{ selected }}</span>
        </template>
    </OrigamBtnToggle>
</template>
```

## Imperative API

`defineExpose` surfaces three navigation helpers and the prop filter:

| Method        | Effect                                       |
|---------------|----------------------------------------------|
| `next()`      | Select the item after the current selection. |
| `prev()`      | Select the item before the current selection.|
| `select(id, value)` | Toggle a specific item by its internal id. |
| `filterProps()`     | Mixin pass-through (forwarded from BtnGroup).|

```vue
<template>
    <OrigamBtnToggle ref="toggleRef" v-model="step">…</OrigamBtnToggle>
    <OrigamBtn text="Next" @click="toggleRef?.next()" />
</template>
```
