# OrigamClipboard

A headless-ish wrapper that adds the "copy to clipboard" behaviour
around any trigger — a button, an icon, a span — and exposes an
auto-resetting `copied` flag so consumers don't have to wire the
timeout. The copy pipeline uses `navigator.clipboard.writeText` and
falls back to a hidden-textarea + `document.execCommand('copy')` for
non-HTTPS contexts and pre-permissions Safari / WebView builds.

```vue
<template>
    <origam-clipboard :value="userEmail" :feedback-duration="2000">
        <origam-btn icon="mdi:mdi-content-copy" aria-label="Copy email" />
    </origam-clipboard>

    <origam-clipboard :value="apiKey">
        <template #default="{ copy, copied }">
            <origam-btn @click="copy">
                {{ copied ? 'Copied!' : 'Copy API key' }}
            </origam-btn>
        </template>
    </origam-clipboard>
</template>
```

When no slot is provided, the component renders a default icon button
(`mdi:mdi-content-copy`). The `feedbackMode` prop controls how
copy-success feedback is rendered **when the default trigger is in
use**. With a custom slot you receive `{ copy, copied }` and render
the feedback yourself — see [the slot scoped API](#slot-scoped-api).

## How `feedbackMode` works (read me first)

Quick rule: **the prop only changes what the COMPONENT renders. It
does NOT alter anything inside your slot.** If you pass a custom
slot, only `feedbackMode="pill"` and `'both'` add visible chrome
(the pill sits next to your trigger). `feedbackMode="button"` is a
no-op with a custom slot — you control the in-slot feedback via
`copied`.

### When to pick which mode

| Mode       | Pick when…                                                                                        |
|------------|---------------------------------------------------------------------------------------------------|
| `'button'` (default) | You use the **default trigger** (no slot). The icon label flips to "Copied!" inline.    |
| `'pill'`   | Your trigger is **icon-only** (or a tiny chip) and needs a more visible cue. A floating pill appears next to it. Also useful for ARIA-live announcements without changing the trigger. |
| `'both'`   | You want belt-and-braces: in-button flip AND a floating pill. Rare; useful for very long copy actions (large JSON, multi-paragraph blocks) so the user has multiple confirmation cues. |
| `'none'`   | You handle the feedback yourself in a custom slot. Pairs with `<template #default="{ copied }">…</template>`. The `@copy` event still fires for parent reactions (toast, analytics). |

### Decision tree

1. Are you using a custom `#default` slot?
   - **Yes** → set `feedbackMode="none"` and read `copied` inside the slot. (Or `'pill'` if you also want a separate floating cue.)
   - **No** → keep the default `'button'` mode. You'll see the icon + label swap on copy.
2. Is your trigger icon-only or very small?
   - **Yes** → consider `feedbackMode="pill"`. The pill is more visible than a single-icon flip.
   - **No** → `'button'` is enough.

### Examples per mode

```vue
<!-- 1) Default trigger + 'button' (default) -->
<origam-clipboard :value="email" />
<!-- icon → flips to "Copied!" → returns to icon after 2s -->

<!-- 2) Icon-only custom trigger + 'pill' -->
<origam-clipboard :value="token" feedback-mode="pill">
    <origam-btn icon="mdi:mdi-content-copy" aria-label="Copy token" />
</origam-clipboard>
<!-- icon stays as-is; a 'Copied!' pill appears next to it -->

<!-- 3) Custom slot + 'none' (you handle feedback yourself) -->
<origam-clipboard :value="link" feedback-mode="none">
    <template #default="{ copy, copied }">
        <origam-btn @click="copy">
            {{ copied ? 'Link copied' : 'Share' }}
        </origam-btn>
    </template>
</origam-clipboard>
<!-- no built-in chrome — your slot owns the feedback -->

<!-- 4) Custom slot + 'pill' (your trigger + the built-in pill) -->
<origam-clipboard :value="apiKey" feedback-mode="pill">
    <template #default="{ copy }">
        <origam-btn @click="copy" icon="mdi:mdi-key-variant" />
    </template>
</origam-clipboard>
<!-- pill appears beside your icon button when copied -->
```

## Props

| Prop               | Type                                   | Default      | Notes                                                                                          |
|--------------------|----------------------------------------|--------------|------------------------------------------------------------------------------------------------|
| `value`            | `string`                               | required     | Text written to the clipboard on `copy()`.                                                     |
| `feedbackDuration` | `number`                               | `2000`       | Duration (ms) the `copied` flag stays true after a successful write.                           |
| `feedbackText`     | `string`                               | `'Copied!'`  | Label rendered in the default trigger label and feedback pill. Wrap with `t()` for full i18n.  |
| `successText`      | `string`                               | `undefined`  | Alias for `feedbackText`. Takes precedence when both are passed.                               |
| `feedbackMode`     | `'button' \| 'pill' \| 'both' \| 'none'` | `'button'` | Controls how copy-success feedback is displayed. See table below.                              |
| `disabled`         | `boolean`                              | `false`      | Disables the trigger; `copy()` short-circuits.                                                 |
| `tag`              | `string`                               | `'span'`     | Root element tag.                                                                              |

### `feedbackMode` values

| Value      | Behaviour                                                                                   |
|------------|---------------------------------------------------------------------------------------------|
| `'button'` | The built-in trigger flips its label to `feedbackText` while `copied` is true. No pill.     |
| `'pill'`   | An ARIA-live `role="status"` pill appears next to the trigger. Trigger label does NOT flip. |
| `'both'`   | Both the label-flip and the ARIA-live pill are active simultaneously.                        |
| `'none'`   | No visual feedback. The `@copy` emit still fires; the parent manages the indicator.          |

### Migration from `showFeedback`

The `showFeedback` boolean prop is **deprecated since v2.2** and will be removed in v3.0.

| Before (deprecated)         | After (v2.2+)                  |
|-----------------------------|--------------------------------|
| `:show-feedback="true"`     | `feedback-mode="pill"`         |
| `:show-feedback="false"`    | `feedback-mode="none"`         |
| _(omitted)_                 | `feedback-mode="button"` (default) |

A `console.warn` is emitted once per component instance when `showFeedback`
is detected at runtime, to assist with the migration.

## Emits

| Emit             | Payload          | When                                                                       |
|------------------|------------------|----------------------------------------------------------------------------|
| `copy`           | `(value: string)`| After a successful write (modern API or execCommand fallback).             |
| `error`          | `(err: Error)`   | After both paths failed (permissions denied, blocked context, …).          |

## Slot scoped API

The default slot exposes the following bindings:

| Binding  | Type                            | Notes                                                            |
|----------|---------------------------------|------------------------------------------------------------------|
| `copy`   | `() => Promise<boolean>`        | Triggers the pipeline. Resolves `true` on success.               |
| `copied` | `boolean`                       | True for `feedbackDuration` ms after a successful copy.          |
| `error`  | `Error \| null`                 | Set when the last attempt failed; null after a fresh successful attempt. |

The `#feedback` slot receives `{ copied: boolean }` and is rendered
inside the ARIA-live pill when `feedbackMode` is `'pill'` or `'both'`.

## `useClipboard` composable

When you don't need any chrome, use the composable directly:

```ts
import { useClipboard } from '@origam/composables'

const { copy, copied, error, isSupported } = useClipboard({ feedbackDuration: 2000 })

async function onCopy () {
    await copy('text to copy')
    // copied.value === true for 2000 ms, then auto-resets to false
}
```

| Return       | Type                              | Notes                                                                                |
|--------------|-----------------------------------|--------------------------------------------------------------------------------------|
| `copy`       | `(text: string) => Promise<boolean>` | True on success, false on failure. Never throws.                                |
| `copied`     | `Ref<boolean>`                    | Self-resetting after `feedbackDuration` ms.                                          |
| `error`      | `Ref<Error \| null>`              | Cleared at the start of each new copy attempt.                                       |
| `isSupported`| `Ref<boolean>`                    | True when `navigator.clipboard.writeText` is available. False in SSR / blocked contexts. |

The composable auto-clears its pending timer on scope dispose
(`onScopeDispose`) — no manual cleanup needed when used inside a
`setup()` or an `effectScope()`.

## Fallback (`execCommand`)

The legacy `document.execCommand('copy')` path is used only when the
modern API is missing or rejects. It works in non-HTTPS contexts
(localhost included) and pre-permissions Safari. It will not work in:

- Sandboxed iframes without the `allow-same-origin` token.
- Background scripts / extension service workers (no `document`).
- Server-side rendering — the composable short-circuits via a `typeof
  document === 'undefined'` guard and returns false.

For production deployments on HTTPS with a modern browser, the modern
API is always preferred; the fallback exists for development /
embedded scenarios.

## Accessibility

- The default trigger is a native `<button>` — keyboard / focus /
  disabled semantics come for free.
- When `feedbackMode` is `'pill'` or `'both'`, the overlay carries
  `role="status"` and `aria-live="polite"` so screen readers announce
  the copy after the fact without interrupting the user.
- The default trigger's `aria-label` flips between
  `"Copy to clipboard"` and `"Value copied to clipboard"` to surface
  the state transition to assistive tech that does not pick up the
  visual label.
- Custom triggers passed through `#default` keep their own ARIA
  contract — make sure to add a label (`aria-label` or visible text)
  when the trigger is icon-only.

## Related

- `OrigamCode` — has its own internal copy
  button. Use `OrigamClipboard` instead when you need to copy a
  non-code payload (URL, API key, email, …).
