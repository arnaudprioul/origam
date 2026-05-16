# OrigamInlineEdit

Edit-in-place pattern. The user clicks a label / title / cell, an
input appears prefilled with the current value, and `Enter` confirms
while `Escape` cancels. Common use cases: renaming a section header,
editing a card title, tweaking a label in a list — anywhere a full
modal form would feel heavy.

```vue
<template>
    <origam-inline-edit
            v-model="title"
            placeholder="Untitled"
            :validate="(v) => v.length >= 3 || 'Min 3 chars'"
    />
</template>
```

When no `#display` slot is provided, the component renders a
button-styled span carrying the current value (or the placeholder
when the value is empty). When no `#edit` slot is provided, it
renders a native `<input>` (or `<textarea>` when `multiline` is
true).

## Quick start

```vue
<origam-inline-edit v-model="userName" placeholder="Full name" />

<origam-inline-edit
        v-model="description"
        :multiline="true"
        :confirm-on-enter="false"
        placeholder="Add a description"
/>

<origam-inline-edit
        v-model="email"
        input-type="email"
        :validate="(v) => /^.+@.+\..+$/.test(v) || 'Invalid email'"
/>
```

## Props

| Prop               | Type                                        | Default           | Notes                                                          |
|--------------------|---------------------------------------------|-------------------|----------------------------------------------------------------|
| `modelValue`       | `string \| number`                          | required          | v-model target. Numbers round-trip as numbers.                 |
| `placeholder`      | `string`                                    | `'Click to edit'` | Shown on the input and on the empty display.                   |
| `validate`         | `(v: string) => true \| string \| Promise<…>` | `undefined`     | Sync or async validator. Returning a string surfaces it as an error and keeps the editor open. |
| `autoFocus`        | `boolean`                                   | `true`            | Auto-focus the input on edit entry.                            |
| `selectOnFocus`    | `boolean`                                   | `true`            | Select all text after auto-focus.                              |
| `confirmOnBlur`    | `boolean`                                   | `true`            | Commit on blur. Disable to require an explicit Enter / button. |
| `confirmOnEnter`   | `boolean`                                   | `true`            | Confirm on `Enter`. In multiline mode, this becomes Cmd/Ctrl+Enter. |
| `cancelOnEscape`   | `boolean`                                   | `true`            | Revert on `Escape`.                                            |
| `disabled`         | `boolean`                                   | `false`           | Display becomes non-interactive; `edit()` short-circuits.      |
| `multiline`        | `boolean`                                   | `false`           | Render a `<textarea>` instead of `<input>`.                    |
| `trim`             | `boolean`                                   | `true`            | Strip surrounding whitespace before validate + emit.           |
| `inputType`        | `'text' \| 'number' \| 'email' \| 'tel'`    | `'text'`          | Native HTML input type in single-line mode.                    |
| `loadingOnConfirm` | `boolean`                                   | `false`           | Adds a CSS hook (`.origam-inline-edit--loading-on-confirm`) while a Promise validator is in flight. `aria-busy` is set regardless. |
| `tag`              | `string`                                    | `'span'`          | Root element tag.                                              |

## Emits

| Emit              | Payload                | When                                                                  |
|-------------------|------------------------|-----------------------------------------------------------------------|
| `update:modelValue` | `(value)`            | After successful validation. Preserves the v-model shape (string vs number). |
| `edit`            | —                      | Editor entered edit mode (display → input transition).                |
| `cancel`          | —                      | Editor exited via Esc / cancel — the draft was discarded.             |
| `confirm`         | `(value)`              | Fires AFTER validation passes, BEFORE `update:modelValue`. Useful for server-side persistence. |
| `validate-error`  | `(message: string)`    | Validator returned an error message (sync or async).                  |

## Slots scoped

### `#display` — `{ value, edit, isEmpty, placeholder, disabled }`

Render any affordance you like (heading, badge, list-item cell, …).
Call `edit()` to enter edit mode.

```vue
<origam-inline-edit v-model="title">
    <template #display="{ value, edit, isEmpty, placeholder }">
        <h2 :class="{ 'is-empty': isEmpty }" @click="edit">
            {{ isEmpty ? placeholder : value }}
        </h2>
    </template>
</origam-inline-edit>
```

### `#edit` — `{ value, setValue, confirm, cancel, error, isPending }`

Render any custom input layout. Wire keyboard handlers yourself —
the slot is a complete take-over.

```vue
<template #edit="{ value, setValue, confirm, cancel, error }">
    <input
        :value="value"
        @input="setValue(($event.target as HTMLInputElement).value)"
        @keydown.enter.prevent="confirm()"
        @keydown.esc.prevent="cancel()"
    >
    <span v-if="error" role="alert">{{ error }}</span>
</template>
```

### `#actions` — `{ confirm, cancel, isPending }`

Render visible confirm / cancel buttons next to the input. The slot
is rendered AFTER the editor — it does not replace the input. Use
`@mousedown.prevent` on the buttons if `confirmOnBlur` is true and
you want the buttons to swallow the blur.

## Validation patterns

### Sync — instantaneous verdict

```ts
const validate = (v: string): true | string =>
    v.length >= 3 || 'Min 3 chars'
```

### Async — server-side uniqueness check

```ts
const validate = async (v: string): Promise<true | string> => {
    const taken = await api.checkAvailability(v)
    return taken ? `"${v}" is already taken` : true
}
```

While the Promise is in flight, the component sets `aria-busy="true"`
on the root and `aria-disabled` on the input. With
`loadingOnConfirm=true`, an additional CSS hook is exposed so you
can render a spinner overlay if needed.

### Error UX

When the validator returns a string, the component:
- Keeps the editor open so the user can correct without re-clicking.
- Renders the message inside a `<span role="alert">` so screen
  readers announce it immediately.
- Sets `aria-invalid="true"` on the input.
- Clears the error as soon as the user types again (the next
  validation cycle starts fresh).

## Accessibility

- **Display affordance** — the default render is a native `<button>`
  with an `aria-label` of `"Edit {value or placeholder}"`. Keyboard
  users get focus / Enter / Space semantics for free.
- **Edit affordance** — the native `<input>` / `<textarea>` is
  decorated with `aria-invalid` and `aria-describedby` (pointing to
  the inline error) when a validator fails.
- **Live region** — the error message is wrapped in a `role="alert"`
  element, which screen readers announce immediately without
  interrupting the current speech.
- **`aria-busy`** — the root sets `aria-busy="true"` while an async
  validator is pending. This pauses incremental announcements on
  some readers.
- **Focus management** — on edit entry, the input is focused
  automatically (`autoFocus=true`) and its content is selected
  (`selectOnFocus=true`). On confirm / cancel the focus naturally
  flows back to the display button.
- **Custom slots** — when you supply `#display` or `#edit`, you take
  ownership of the ARIA contract. Pass an `aria-label` on the
  trigger and forward `aria-invalid` / `aria-describedby` to the
  input.

## `useInlineEdit` composable

For headless consumers (custom widgets, data-grid cells, …) use the
composable directly:

```ts
import { ref } from 'vue'
import { useInlineEdit } from '@origam/composables'

const model = ref('hello')
const {
    isEditing, draft, error, isPending,
    edit, confirm, cancel, setValue
} = useInlineEdit(model, {
    validate: (v) => v.length >= 3 || 'Min 3 chars',
    trim: true,
    onConfirm: (v) => (model.value = v),
})
```

| Return       | Type                            | Notes                                                            |
|--------------|---------------------------------|------------------------------------------------------------------|
| `isEditing`  | `Ref<boolean>`                  | True while in edit mode.                                         |
| `draft`      | `Ref<string>`                   | Live draft value. Mutate via `setValue`.                         |
| `error`      | `Ref<string \| null>`           | Last validation error message.                                   |
| `isPending`  | `Ref<boolean>`                  | True while an async validator is in flight.                      |
| `edit`       | `() => void`                    | Snapshot the model into the draft and switch to edit mode.       |
| `confirm`    | `() => Promise<boolean>`        | Run the validator and (if it passes) commit. Resolves true on success. |
| `cancel`     | `() => void`                    | Discard the draft and revert.                                    |
| `setValue`   | `(next: string) => void`        | Programmatic draft update — also clears any stale error.         |

Stale Promise verdicts are automatically discarded: if the user
cancels (or fires another confirm) while a validator is still in
flight, the late resolution is ignored — no double-commit, no race.

## Related

- [`OrigamTextField`](../TextField/OrigamTextField.md) — the
  full-fledged form field. Use it when you need labels, prepend /
  append slots, prefixes, validation rules from a Form, …
- [`OrigamClipboard`](../Clipboard/OrigamClipboard.md) — same
  "lightweight affordance" philosophy applied to copy-to-clipboard.
