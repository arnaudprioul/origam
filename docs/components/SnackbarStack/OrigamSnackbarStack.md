# OrigamSnackbarStack

`<OrigamSnackbarStack>` is a **multi-toast notification system** built on
top of the same intent / token vocabulary as `<OrigamSnackbar>`. Unlike
the single-shot snackbar, the stack is driven by a composable —
`useSnackbarStack({ id })` — and renders any number of concurrent
notifications in a chosen anchor location of the viewport.

The component itself owns no template-level state: callers programmatically
push items via `notify()` and the stack handles ordering, FIFO eviction
past `max`, per-item auto-dismiss timers, intent-driven ARIA `role` /
`aria-live`, action buttons, and slide-in / slide-out transitions
(automatically degraded under `prefers-reduced-motion`).

## Basic usage

```vue
<template>
    <OrigamBtn @click="ping">Notify</OrigamBtn>
    <OrigamSnackbarStack location="bottom-right" />
</template>

<script setup lang="ts">
    import { useSnackbarStack } from '@origam/composables'

    const { notify } = useSnackbarStack()

    function ping() {
        notify({
            title: 'Saved',
            message: 'Your profile was updated.',
            intent: 'success',
            duration: 3000
        })
    }
</script>
```

## Multiple independent stacks

Each `useSnackbarStack({ id })` call keys into its own bucket. Render as
many `<OrigamSnackbarStack :id="…">` as you need — global, per-region,
per-feature — and address them independently.

```vue
<template>
    <OrigamSnackbarStack id="global" location="top-right" />
    <OrigamSnackbarStack id="builder" location="bottom-left" />
</template>

<script setup lang="ts">
    import { useSnackbarStack } from '@origam/composables'

    const builder = useSnackbarStack({ id: 'builder' })

    function onSaveDraft() {
        builder.notify({
            title: 'Draft saved',
            intent: 'info'
        })
    }
</script>
```

## Action buttons

Each item can carry one or more action buttons. By default, clicking an
action runs the handler **and** dismisses the item (set `keepOpen: true`
to keep it visible).

```vue
<script setup lang="ts">
    import { useSnackbarStack } from '@origam/composables'

    const { notify } = useSnackbarStack()

    function onDelete(row) {
        notify({
            title: 'Item deleted',
            intent: 'warning',
            duration: 8000,
            actions: [
                {
                    label: 'Undo',
                    intent: 'primary',
                    handler: () => restore(row)
                }
            ]
        })
    }
</script>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | `'default'` | Identifier of the stack — pair with `useSnackbarStack({ id })`. |
| `location` | `TSnackbarStackLocation` | `'bottom-right'` | Anchor location (`top-left`, `top-right`, `top-center`, `bottom-left`, `bottom-right`, `bottom-center`, `top`, `bottom`). |
| `max` | `number` | `5` | Maximum number of items rendered concurrently. Excess items are evicted FIFO. |
| `defaultDuration` | `number` | `5000` | Default auto-dismiss timeout (ms). `0` makes new items sticky. |
| `spacing` | `string \| number` | `'12px'` | Gap between stacked items. |
| `direction` | `TSnackbarStackDirection` | auto | `'top-down'` for `top-*` locations, `'bottom-up'` for `bottom-*` locations. Override explicitly when needed. |
| `tag` | `string` | `'div'` | Root tag for the region. |

The component teleports to `document.body` so its position is independent
of any parent overflow / transform context.

## Composable API — `useSnackbarStack`

```ts
import { useSnackbarStack } from '@origam/composables'

const { notify, dismiss, dismissAll, items } = useSnackbarStack({
    id: 'global',           // optional, default 'default'
    max: 20,                // optional global cap on the store
    defaultDuration: 5000   // optional, applied when item omits duration
})
```

| Method | Signature | Description |
|---|---|---|
| `notify` | `(opts: ISnackbarStackItemOptions) => string` | Pushes an item, returns its generated id. |
| `dismiss` | `(id: string) => void` | Removes a specific item and fires its `onDismiss`. |
| `dismissAll` | `() => void` | Clears the stack — each item's `onDismiss` fires. |
| `items` | `Readonly<Ref<…>>` | Reactive read-only list. Use for debugging or custom rendering. |

Calling `useSnackbarStack({ id })` multiple times with the same `id`
returns handles backed by the same underlying store — `notify` here,
`dismiss` there.

## `ISnackbarStackItemOptions`

| Field | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Bold first line. |
| `message` | `string` | — | Body text under the title (or sole line if no title). |
| `intent` | `TIntent` | `'info'` | Semantic intent — drives icon defaults, `role=status/alert`, surface coloring. |
| `duration` | `number` | stack default | Auto-dismiss timeout (ms). `0` = sticky. |
| `icon` | `TIcon` | per-intent | Prepend icon override. |
| `actions` | `Array<ISnackbarStackItemAction>` | — | Action buttons rendered in the footer. |
| `dismissible` | `boolean` | `true` | Whether to show the close (X) button. |
| `onDismiss` | `() => void` | — | Callback fired once the item leaves the stack (any cause). |

### `ISnackbarStackItemAction`

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | yes | Button label. |
| `handler` | `() => void` | yes | Invoked on click. |
| `intent` | `TIntent` | no | Optional intent override for the action button color. |
| `keepOpen` | `boolean` | no | When `true`, the item stays visible after the click. |

## Accessibility

- The stack root carries `role="region"` + `aria-label="Notifications"`
  so assistive technology can navigate to it directly.
- Each item carries either `role="status"` + `aria-live="polite"` for
  `info` / `success` / neutral intents, or `role="alert"` +
  `aria-live="assertive"` for `warning` / `danger` intents. Screen
  readers therefore announce critical errors immediately while
  informational toasts wait for a free moment.
- `aria-atomic="true"` is set so updates to the item announce as a unit.
- The dismiss button is a real `<button type="button">` with a descriptive
  `aria-label`, focusable through the regular Tab order.
- The slide-in / slide-out transition collapses to a quick fade under
  `prefers-reduced-motion: reduce`.

## Slots

`<OrigamSnackbarStack>` is **composable-driven** and does not expose a
default slot. Item content is configured per-`notify()` call (title,
message, intent, icon, actions). This is intentional — it keeps the
declarative template free of imperative spawn logic and lets background
services (auth, sync, validation) push notifications from anywhere
without holding a component ref.

## Design tokens

| CSS variable | Description |
|---|---|
| `--origam-snackbar-stack---z-index` | Stack z-index (default `toast`). |
| `--origam-snackbar-stack---gap` | Gap between stacked items. |
| `--origam-snackbar-stack---max-width` | Max width of the stack container. |
| `--origam-snackbar-stack---transition-duration` | Slide-in / slide-out duration. |
| `--origam-snackbar-stack---position-top` | Top offset for top-anchored stacks. |
| `--origam-snackbar-stack---position-bottom` | Bottom offset for bottom-anchored stacks. |
| `--origam-snackbar-stack---position-left` | Left offset for left-anchored stacks. |
| `--origam-snackbar-stack---position-right` | Right offset for right-anchored stacks. |
| `--origam-snackbar-stack__item---background-color` | Item surface background. |
| `--origam-snackbar-stack__item---border-color` | Item surface border. |
| `--origam-snackbar-stack__item---color` | Item text color. |
| `--origam-snackbar-stack__item---box-shadow` | Item elevation. |
| `--origam-snackbar-stack__item---border-radius` | Item corner radius. |
| `--origam-snackbar-stack__item---padding` | Item inner padding. |
| `--origam-snackbar-stack__item---min-width` / `max-width` | Item width clamp. |
| `--origam-snackbar-stack__item---action-color` | Action button color. |

Intent-based surface colors fall through to the shared semantic
`--origam-color__feedback--{intent}---*` tokens, so a single design-token
brand swap re-skins both `OrigamSnackbar` and `OrigamSnackbarStack`
together.
