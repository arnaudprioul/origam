# OrigamOtpInputField

`<OrigamOtpInputField>` renders a row of `N` single-character inputs (default 6)
for one-time password / verification code entry. It emits `finish` when every
slot is filled, and handles auto-advance, backspace, and paste natively.

## Basic usage with v-model

```vue
<script setup lang="ts">
import { ref } from 'vue'
const code = ref('')
</script>

<template>
  <OrigamOtpInputField v-model="code" label="OTP code" />
</template>
```

## Length

```vue
<template>
  <OrigamOtpInputField :length="4" label="4-digit PIN" />
  <OrigamOtpInputField :length="8" label="8-char token" />
</template>
```

## Type (text / password / number)

```vue
<template>
  <OrigamOtpInputField type="password" :length="6" label="Hidden OTP" />
  <OrigamOtpInputField type="number"   :length="6" label="Numeric OTP" />
</template>
```

## Divider

```vue
<template>
  <OrigamOtpInputField :length="6" divider="-" label="With divider" />
</template>
```

## Focus all on mount

```vue
<template>
  <OrigamOtpInputField :length="4" focus-all autofocus label="Focus all" />
</template>
```

## States (disabled / readonly / error)

```vue
<template>
  <OrigamOtpInputField :length="4" disabled label="Disabled" />
  <OrigamOtpInputField :length="4" :error="true" error-messages="Invalid code" label="Error" />
</template>
```

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | field props | Override field body |
| `label` | `ILabelProps` | Custom label |
| `field` | `{ id, isDisabled, isDirty, isValid, isReadonly }` | Replace individual `<input>` cells |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number \| null` | Partial / full value |
| `finish` | `string` | All cells filled |
| `focus` | `FocusEvent` | Any cell focused |
| `blur` | `FocusEvent` | All cells blurred |
| `click:clear` | `MouseEvent` | Clear button clicked |
| `click:control` | `MouseEvent` | Control area clicked |

## Design tokens

| CSS variable | Default | Description |
|---|---|---|
| `--origam-otp-input---cell-width` | `48px` | Width per cell |
| `--origam-otp-input---cell-gap` | `8px` | Gap between cells |
| `--origam-field---border-color` | semantic border | Cell outline |
