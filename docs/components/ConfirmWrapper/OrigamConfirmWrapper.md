# OrigamConfirmWrapper

`<OrigamConfirmWrapper>` is a **"type-it-twice" form helper** that pairs a primary
input with an identical confirmation input and validates that both values match.
Use it for password creation, email changes, and destructive operation confirmations.

## Basic usage with field

```vue
<template>
    <OrigamConfirmWrapper
        v-model="password"
        v-model:confirm="confirmPassword"
        field="password-field"
        :defaults="{ label: 'Password', type: 'password' }"
    />
</template>
```

## Horizontal layout

```vue
<template>
    <OrigamConfirmWrapper
        v-model="value"
        v-model:confirm="confirmValue"
        direction="horizontal"
        field="text-field"
        :defaults="{ label: 'Email' }"
    />
</template>
```

## With label and icon

```vue
<template>
    <OrigamConfirmWrapper
        v-model="value"
        v-model:confirm="confirmValue"
        label="New password"
        prepend-icon="mdi-lock"
        field="password-field"
        :defaults="{ label: 'Password' }"
    />
</template>
```

## Disabled

```vue
<template>
    <OrigamConfirmWrapper v-model="value" v-model:confirm="confirm" disabled field="text-field" />
</template>
```

## Error state

```vue
<template>
    <OrigamConfirmWrapper v-model="value" v-model:confirm="confirm" error error-messages="Values do not match." field="text-field" />
</template>
```

## Custom field slot

```vue
<template>
    <OrigamConfirmWrapper v-model="value" v-model:confirm="confirm">
        <OrigamTextField v-model="value" label="Custom input" />
        <template #confirm>
            <OrigamTextField v-model="confirm" label="Confirm custom input" />
        </template>
    </OrigamConfirmWrapper>
</template>
```

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `header` | — | Full header override. |
| `prepend` | — | Prepend icon / avatar. |
| `title` | `{ props }` | Label override. |
| `append` | — | Append icon / avatar. |
| `default` | — | Primary input override. |
| `confirm` | — | Confirmation input override. |
| `messages` | `{ hasMessages, messages, messagesId }` | Message area override. |
| `message` | `{ message }` | Single message item override. |
| `details` | `{ id, messagesId, isDirty, isDisabled, isReadonly }` | Details area override. |

## Events

| Name | Payload | When |
|---|---|---|
| `update:modelValue` | `any` | Primary input changes. |
| `update:confirm` | `any` | Confirmation input changes. |
| `click:prepend` | `MouseEvent` | Prepend icon clicked. |
| `click:append` | `MouseEvent` | Append icon clicked. |

## Public API

| Method | Description |
|---|---|
| `validate()` | Marks the wrapper dirty and returns any error messages. |
| `reset()` | Clears both inputs and resets dirty state. |
| `resetValidation()` | Resets dirty state without clearing values. |

## Design tokens

| CSS variable | Description |
|---|---|
| `--origam-confirm-wrapper---padding-top` | Header block-start padding. |
| `--origam-confirm-wrapper---padding-bottom` | Header block-end padding. |
| `--origam-confirm-wrapper---padding-end` | Prepend inline-end padding. |
| `--origam-confirm-wrapper---padding-start` | Append inline-start padding. |
| `--origam-confirm-wrapper---details-font-size` | Details area font size. |
| `--origam-confirm-wrapper---horizontal-gap` | Gap in horizontal layout. |
| `--origam-confirm-wrapper--error---color` | Error text / icon color. |
| `--origam-confirm-wrapper---disabled-opacity` | Disabled opacity. |

## Accessibility

- Error messages are announced to screen readers via `OrigamMessages`.
- `disabled` disables all pointer events.
- The label is associated with the primary input via `OrigamLabel`.
