# OrigamInput

`<OrigamInput>` is the outermost structural wrapper shared by every form atom
(Checkbox, Radio, Switch, etc.). It renders the outer prepend/append icons,
the messages / hint / error row, and the validation pipeline.

`OrigamInput` is rarely used directly — prefer the typed atoms. Use it when you
need the messages + validation chrome around a fully custom control.

## Basic usage

```vue
<template>
  <OrigamInput label="Custom" hint="Helper text" :rules="[v => !!v || 'Required']">
    <template #default="{ id, isDisabled, isDirty, isValid, isReadonly }">
      <input :id="id" :disabled="isDisabled" />
    </template>
  </OrigamInput>
</template>
```

## Color

```vue
<template>
  <OrigamInput color="primary"   label="Primary" />
  <OrigamInput color="secondary" label="Secondary" />
</template>
```

## Density

```vue
<template>
  <OrigamInput density="compact"     label="Compact" />
  <OrigamInput density="default"     label="Default" />
  <OrigamInput density="comfortable" label="Comfortable" />
</template>
```

## Prepend / append outer icons

```vue
<template>
  <OrigamInput prepend-icon="mdi-account" append-icon="mdi-chevron-down" label="With icons" />
</template>
```

## Hint & persistent hint

```vue
<template>
  <OrigamInput label="Email" hint="We never share your email" persistent-hint />
</template>
```

## Hide details

```vue
<template>
  <OrigamInput label="Compact row" hide-details />
</template>
```

## Error messages

```vue
<template>
  <OrigamInput label="Invalid" :error="true" error-messages="This field is invalid" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | `{ id, isDisabled, isDirty, isValid, isReadonly }` | The form control |
| `prepend` | — | Outer left icon/content |
| `append` | — | Outer right icon/content |
| `messages` | `{ hasMessages, messages }` | Full messages area |
| `message` | `message` | Single message row |
| `details` | any | Details row override |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `any` | Value echo |
| `click:prepend` | `MouseEvent` | Outer prepend clicked |
| `click:append` | `MouseEvent` | Outer append clicked |
| `focus` | `FocusEvent` | Focus propagated |
| `blur` | `FocusEvent` | Blur propagated |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-input---density` | `0px` | Density offset applied to children |
| `--origam-input---messages-color` | text-secondary | Hint / error text color |
