# OrigamParallax

`<OrigamParallax>` is the host that drives a parallax effect across one
or more `<OrigamParallaxElement>` children. It listens to mouse / scroll
/ device-orientation events on its bounding box, computes a normalised
movement vector, and broadcasts it (via `provide`) to every nested
`<OrigamParallaxElement>`.

CSS-first principle: the host applies `perspective` directly via inline
style; the nested elements use CSS transforms — no per-frame Vue
re-render is needed for the animation, only when the cursor / scroll /
orientation event mutates the shared movement value.

## Basic usage

```vue
<template>
    <OrigamParallax style="height: 320px; width: 100%;">
        <OrigamParallaxElement :strength="20">
            <img src="/img/cover.jpg" alt="" />
        </OrigamParallaxElement>
    </OrigamParallax>
</template>
```

> `<OrigamParallaxElement>` **must** be nested inside an
> `<OrigamParallax>` — it injects the movement context. The component
> throws on mount otherwise.

## Event source

`event` selects which input drives the movement.

| Value | Activates on |
|---|---|
| `move` (default) | `mousemove` on desktop. Falls back to `deviceorientation` on touch devices (when `useDisplay().platform.touch` is true). |
| `scroll` | window `scroll` — useful for hero sections that respond to page scroll. |
| `orientation` | `deviceorientation` only — beta / gamma angles on tablets / phones. |

```vue
<template>
    <OrigamParallax event="move">…</OrigamParallax>
    <OrigamParallax event="scroll">…</OrigamParallax>
    <OrigamParallax event="orientation">…</OrigamParallax>
</template>
```

## Active toggle

`active` is the kill-switch. While `false`, mouse / scroll listeners
short-circuit and the children stay still — useful for
`prefers-reduced-motion` integrations.

```vue
<template>
    <OrigamParallax :active="prefersMotion">…</OrigamParallax>
</template>
```

## Timing

`duration` (ms) and `easing` (any CSS timing function) flow to nested
elements through the provide context, so every child shares the same
transition curve.

```vue
<template>
    <OrigamParallax :duration="800" easing="cubic-bezier(0.16, 1, 0.3, 1)">…</OrigamParallax>
</template>
```

## Perspective

Sets the `perspective` of the parallax host (in `px`). Larger values
flatten the depth; smaller values exaggerate it.

```vue
<template>
    <OrigamParallax :perspective="600">…</OrigamParallax>
    <OrigamParallax :perspective="1500">…</OrigamParallax>
</template>
```

## Audio reactivity

Pass an audio source URL via the `audio` prop and the host streams its
amplitude data into the children (consumed by
`<OrigamParallaxElement audioIndex>`). Audio playback is owned by the
component via `useAudio`.

```vue
<template>
    <OrigamParallax audio="/sound/loop.mp3">
        <OrigamParallaxElement :audio-index="20">
            <img src="/img/cover.jpg" alt="" />
        </OrigamParallaxElement>
    </OrigamParallax>
</template>
```

## Polymorphic tag

```vue
<template>
    <OrigamParallax tag="section">…</OrigamParallax>
</template>
```

## Slots

| Slot | Slot props | Description |
|---|---|---|
| `default` | — | Parallax content. Wrap each layer in `<OrigamParallaxElement>` to make it react to the movement vector. |

## Props (interface)

```ts
interface IParallaxProps extends ICommonsComponentProps, ITagProps,
    IPaddingProps, IMarginProps, IBorderProps, IRoundedProps,
    IElevationProps, IDimensionProps, IAudioProps {
    duration?: number          // transition duration (ms), default 1000
    easing?: string            // any CSS timing-function, default cubic-bezier(0.23, 1, 0.32, 1)
    perspective?: number       // host perspective (px), default 1000
    event?: TParallaxEvent     // 'move' | 'scroll' | 'orientation', default 'move'
    active?: boolean           // master kill-switch, default true
    animationDuration?: number // reserved — see remediation notes
}
```

## Anatomy

```html
<div class="origam-parallax" style="perspective: 1000px;">
    <!-- default slot: <OrigamParallaxElement> children -->
    <audio v-if="audio" />     <!-- mounted only when audio is set -->
</div>
```

## Design tokens consumed

`<OrigamParallax>` reads from `tokens/component/parallax.json`. Override
at the document root or via a `:style` binding to re-skin a single
instance.

| CSS variable | Token reference |
|---|---|
| `--origam-parallax---aspect-ratio` | `16 / 9` |
| `--origam-parallax---transition-duration` | `{motion.duration.slow}` |
| `--origam-parallax---transition-timing-function` | `{motion.easing.standard}` |
| `--origam-parallax---perspective` | `1000px` |
| `--origam-parallax---transform-origin` | `center center` |
| `--origam-parallax---translate-multiplier` | `0.5` |
| `--origam-parallax__element---transition-duration` | `{motion.duration.medium}` |

The full list lives in
`tokens/component/parallax.json`.

## Accessibility

- Always pair with a `prefers-reduced-motion` query — bind the result
  to the `active` prop so users who opted out of motion get a static
  composition.
- The `event="orientation"` mode requires explicit user permission on
  iOS (`DeviceOrientationEvent.requestPermission()`) — gate it behind
  a user gesture.
- Audio reactivity (`audio` prop) starts only after a user gesture in
  most browsers (autoplay policy).

## Theming notes

- Transform / perspective values are theme-agnostic — the component
  ships no color tokens. Mix it with `<OrigamSheet>` if you need a
  theme-aware backdrop.

## Related

- `OrigamParallaxElement` — the layer
  primitive that consumes the movement context.
