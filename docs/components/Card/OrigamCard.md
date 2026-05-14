# OrigamCard

`<OrigamCard>` is a **flagship surface component** that composes a clickable or static content
container with optional header, asset image, text body, and footer. It supports the full
gamut of layout, styling, and accessibility features via composable prop mixins.

## Basic usage

```vue
<template>
    <OrigamCard title="Card title" text="Supporting text." />
</template>
```

## Header

Pass `title`, `subtitle`, `prependIcon`, `appendIcon`, `prependAvatar`, or `appendAvatar`
to populate the header automatically. Use the named header slots for full control.

```vue
<template>
    <OrigamCard
        title="Profile"
        subtitle="Active account"
        prepend-icon="mdi-account"
    />
</template>
```

## Asset / image

```vue
<template>
    <OrigamCard
        image="https://picsum.photos/600/300"
        title="Image card"
    />
</template>
```

## Clickable (link)

```vue
<template>
    <OrigamCard
        link
        href="https://origam.dev"
        title="Click me"
    />
</template>
```

## Loading state

Accepts a boolean or a number (progress percentage) for `loading`.

```vue
<template>
    <OrigamCard loading title="Fetching data…" />
    <OrigamCard :loading="75" title="75 % loaded" />
</template>
```

## Disabled

```vue
<template>
    <OrigamCard disabled title="Cannot interact" />
</template>
```

## Hover elevation

Add the `hover` boolean to lift the card on pointer-over.

```vue
<template>
    <OrigamCard hover title="Hover me" />
</template>
```

## Flat

Remove shadow with `flat`.

```vue
<template>
    <OrigamCard flat title="No shadow" />
</template>
```

## Elevation

```vue
<template>
    <OrigamCard :elevation="8" title="Elevated card" />
</template>
```

## Rounded

```vue
<template>
    <OrigamCard rounded="large" title="Rounded card" />
</template>
```

## Border

```vue
<template>
    <OrigamCard border title="Bordered card" />
</template>
```

## Density

```vue
<template>
    <OrigamCard density="compact" title="Compact card" />
</template>
```

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `wrapper` | — | Full override of all internal content. |
| `loader` | — | Custom loader element (replaces the progress bar). |
| `header` | — | Replaces the entire auto-generated header. |
| `header.prepend` | — | Prepend content inside the header. |
| `header.append` | — | Append content inside the header. |
| `header.title` | — | Title content inside the header. |
| `header.subtitle` | — | Subtitle content inside the header. |
| `header.content` | — | Body of the header. |
| `asset` | — | Replaces the image container. |
| `text` | — | Replaces the `OrigamCardText` text region. |
| `default` | — | Main body content. |
| `footer` | — | Footer area below the body. |

## Events

| Name | Payload | When |
|---|---|---|
| `click:prepend` | `MouseEvent` | Click on the prepend icon/avatar in the header. |
| `click:append` | `MouseEvent` | Click on the append icon/avatar in the header. |

## Design tokens

| CSS variable | Description |
|---|---|
| `--origam-card---background` | Card background color. |
| `--origam-card---color` | Card text color. |
| `--origam-card---box-shadow` | Shadow layer. |
| `--origam-card---border-radius` | Border radius (composed from four corner tokens). |
| `--origam-card---border-color` | Border color. |
| `--origam-card---border-width` | Border width. |
| `--origam-card---padding-block-start` | Block-start padding. |
| `--origam-card---padding-block-end` | Block-end padding. |
| `--origam-card---density` | Density modifier (added to each padding axis). |
| `--origam-card---transition-duration` | Hover / focus transition timing. |
| `--origam-card__overlay---opacity` | Overlay scrim opacity on hover / focus. |

## Accessibility

- When `link` is true the card is rendered as an anchor element and is keyboard-reachable.
- `disabled` sets `tabindex="-1"` and `pointer-events: none`.
- The card never assumes an implicit ARIA role; authors must add `role="article"` or similar
  when the content requires it.
