# OrigamAlert

`<OrigamAlert>` is a contextual feedback banner. It renders as a `<div>` with
`role="alert"` and supports status icons, a title, body text, a close button,
elevation, hover effects, and all colour/density/rounded mixins.

The component is visible only when `modelValue` is `true` (default). The close
button sets it to `false` and emits `click:close`.

## Basic usage

```vue
<template>
    <OrigamAlert text="Something went wrong." />
</template>
```

## Status / intent

Use `status` for semantic colouring with a matching icon.

```vue
<template>
    <OrigamAlert status="success" title="Done!"    text="Your file was saved."       />
    <OrigamAlert status="info"    title="Heads up"  text="A new version is available." />
    <OrigamAlert status="warning" title="Warning"   text="Storage almost full."        />
    <OrigamAlert status="error"   title="Error"     text="Connection timed out."        />
</template>
```

## Closable

```vue
<template>
    <OrigamAlert v-model="visible" closable text="Dismiss me." />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
</script>
```

## Title

```vue
<template>
    <OrigamAlert title="Custom title" text="Alert body text." />
</template>
```

## Color

```vue
<template>
    <OrigamAlert color="primary" text="Primary alert" />
</template>
```

## Density

```vue
<template>
    <OrigamAlert density="compact"     text="Compact"     />
    <OrigamAlert density="default"     text="Default"     />
    <OrigamAlert density="comfortable" text="Comfortable" />
</template>
```

## Emits

| Event              | Payload      | Description                                     |
|--------------------|--------------|-------------------------------------------------|
| `click:close`      | `MouseEvent` | Close button was clicked                        |
| `update:modelValue`| `boolean`    | Alert visibility changed                        |
| `update:hover`     | `boolean`    | Hover state changed                             |

## Slots

| Slot      | Description                                                  |
|-----------|--------------------------------------------------------------|
| `default` | Additional content rendered below title + text               |
| `prepend` | Custom content in the prepend (left) column                  |
| `append`  | Custom content in the append (right) column                  |
| `title`   | Override the title span                                      |
| `text`    | Override the body text                                       |
| `close`   | Override the close button entirely                           |
| `wrapper` | Full layout override (replaces all inner structure)          |

## Tokens

| Variable                                | Default     | Used for                    |
|-----------------------------------------|-------------|-----------------------------|
| `--origam-alert---background-color`     | (unset)     | alert fill                  |
| `--origam-alert---color`                | (unset)     | alert text colour           |
| `--origam-alert---border-radius`        | (unset)     | corner rounding             |
| `--origam-alert---border-width`         | (unset)     | border thickness            |
| `--origam-alert---density`              | `0px`       | padding density delta       |
| `--origam-alert---padding-block-start`  | (unset)     | top padding                 |
| `--origam-alert---padding-block-end`    | (unset)     | bottom padding              |
| `--origam-alert---padding-inline-start` | (unset)     | left padding                |
| `--origam-alert---padding-inline-end`   | (unset)     | right padding               |
| `--origam-alert__title---font-size`     | (unset)     | title font size             |
| `--origam-alert__title---font-weight`   | (unset)     | title font weight           |
| `--origam-alert--warning---bg`          | orange      | warning background          |
| `--origam-alert--success---bg`          | green       | success background          |
| `--origam-alert--info---bg`             | blue        | info background             |
| `--origam-alert--danger---bg`           | red         | error/danger background     |
