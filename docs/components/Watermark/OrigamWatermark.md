# OrigamWatermark

Repeating diagonal overlay used to mark a sub-tree as
`CONFIDENTIAL` / `DRAFT` / personalised by recipient. Renders a
`data:image/svg+xml` pattern via CSS `background-image: repeat` —
no canvas, no third-party dependency, ~0.5 kB of SVG per tile. The
wrapped content stays interactive (`pointer-events: none` by
default), the overlay is invisible to assistive technology
(`aria-hidden="true"`), and an optional anti-tamper
`MutationObserver` re-injects the layer if it is removed from the
DOM.

## Quick start

```vue
<template>
    <origam-watermark
        text="CONFIDENTIAL"
        :opacity="0.1"
    >
        <your-sensitive-content/>
    </origam-watermark>

    <origam-watermark
        text="DRAFT — John Doe — 2026-05-15"
        :angle="-30"
        :gap="120"
        :font-size="16"
        color="#dc2626"
        :anti-tamper="true"
    >
        <your-preview/>
    </origam-watermark>

    <origam-watermark
        image="/logo.svg"
        :opacity="0.05"
        :gap="200"
    >
        <your-pdf-preview/>
    </origam-watermark>
</template>
```

## Props

| Prop            | Type                          | Default          | Notes                                                                              |
|-----------------|-------------------------------|------------------|------------------------------------------------------------------------------------|
| `text`          | `string`                      | —                | Glyph text. Mutually exclusive with `image` — `image` wins when both are set.      |
| `image`         | `string`                      | —                | URL or data-URL of the repeated image glyph.                                       |
| `opacity`       | `number`                      | `0.1`            | Glyph opacity (0..1). Applied at the SVG level, content stays at full opacity.     |
| `angle`         | `number`                      | `-30`            | Rotation in degrees. Negative = counter-clockwise.                                 |
| `gap`           | `number`                      | `120`            | Distance between two tiles in CSS pixels.                                          |
| `fontSize`      | `number`                      | `16`             | Text glyph font size in CSS pixels.                                                |
| `fontFamily`    | `string`                      | `'inherit'`      | SVG `font-family`. The SVG is a data-URL — pass an explicit family for fine control. |
| `color`         | `string`                      | `'currentColor'` | Text glyph fill.                                                                   |
| `fontWeight`    | `number \| string`            | `400`            | SVG `font-weight`.                                                                 |
| `zIndex`        | `number`                      | `1`              | `z-index` of the overlay layer.                                                    |
| `antiTamper`    | `boolean`                     | `false`          | Installs a MutationObserver that re-injects the layer when it is removed.          |
| `pointerEvents` | `'none' \| 'auto'`            | `'none'`         | Whether the overlay intercepts pointer events. Default lets clicks pass through.   |
| `tag`           | `string`                      | `'div'`          | Wrapper element.                                                                   |
| `class`         | `string \| array \| object`   | —                |                                                                                    |
| `style`         | `string \| array \| object`   | —                |                                                                                    |

## Anti-tamper — what it does, what it does NOT

When `antiTamper` is `true`, the component installs a
`MutationObserver` scoped to its own DOM subtree. The observer
listens for:

- `childList` mutations — the layer being removed from the DOM, by
  any code (DevTools, a sibling script, …).
- `attributes` mutations on the layer — `style="display: none"`,
  `class` swap, removal of the `data-origam-watermark` marker.

Either case schedules a microtask that re-injects a fresh layer
with the canonical inline styles.

**This is dissuasion, not security.** A determined user with
DevTools can:

- Disable JavaScript on the page (the observer never runs).
- Pause the script via the debugger and delete the layer.
- Use a content-blocker rule to strip the watermark before the
  observer is wired up.

Use the watermark to discourage casual screenshot sharing or to
add a per-recipient signature on a preview surface; do **not**
treat it as a DRM mechanism.

## Patterns

### Confidential preview

```vue
<origam-watermark
    :text="`CONFIDENTIAL — ${user.email}`"
    :opacity="0.08"
    color="#dc2626"
>
    <pdf-preview :file="report"/>
</origam-watermark>
```

### Draft marker

```vue
<origam-watermark
    text="DRAFT"
    :opacity="0.15"
    :angle="-30"
    :gap="100"
>
    <article-editor v-model="article"/>
</origam-watermark>
```

### Sensitive screenshot (programmatic)

```ts
import { useWatermark } from '@origam/composables'

const { install, uninstall } = useWatermark({
    text: `INTERNAL — ${session.userId} — ${session.startedAt}`,
    opacity: 0.06,
    antiTamper: true
})

onMounted(() => install(document.body))
onBeforeUnmount(() => uninstall())
```

## Accessibility

The overlay layer carries `aria-hidden="true"` and `user-select: none`.
Screen readers ignore the watermark entirely; the wrapped content
behaves as if the overlay was not present.

The watermark is purely visual and redundant when the same
information is exposed elsewhere (document metadata, recipient
field, …). When the watermark is the **only** carrier of a piece
of information (e.g. recipient identity), surface the same string
in the surrounding markup so non-sighted users have access to it.

## Composable — `useWatermark`

```ts
import { useWatermark } from '@origam/composables'

const { patternUrl, install, uninstall } = useWatermark({
    text: 'CONFIDENTIAL',
    opacity: 0.1,
    angle: -30
})
```

- `patternUrl: ComputedRef<string>` — the data-URL pattern string
  (`url("data:image/svg+xml,…")`). Bind it directly via
  `:style="{ backgroundImage: patternUrl }"` for custom integrations.
- `install(target?: HTMLElement): HTMLElement | null` — mounts a
  watermark layer on `target` (defaults to `document.body`). The
  host is promoted to `position: relative` if its computed position
  is `static`.
- `uninstall(): void` — removes the layer and disconnects the
  observer. Automatically called on scope dispose when used inside
  a component / `setup()`.

## SSR

The composable's data-URL generation is pure JavaScript with no
DOM access. The component reads `patternUrl.value` during render —
the markup encodes identically on server and client, so no
hydration mismatch. The MutationObserver is wired up in `onMounted`
so SSR-rendered HTML never references the observer.
