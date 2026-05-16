# OrigamVideo

Lightweight in-house video player. Wraps the native `<video>` element
with a custom toolbar (play/pause, scrubber, volume, captions, PIP,
fullscreen) and exposes a fully-featured headless composable
(`useVideoPlayer`) for consumers who want the state machine without
the default skin.

Zero external dependency — no `plyr`, no `video.js`, no `hls.js`. If
HLS or DASH playback is required for a specific project, plug in
`hls.js` / `dash.js` as a peer dependency from outside the
composable; the underlying `<video>` element accepts whatever the
peer extension attaches to it.

## Quick start

```vue
<template>
    <origam-video
        :src="videoUrl"
        :poster="thumbnailUrl"
        :tracks="[
            { kind: 'captions', src: '/cc-en.vtt', srclang: 'en', label: 'English', default: true },
            { kind: 'captions', src: '/cc-fr.vtt', srclang: 'fr', label: 'Français' }
        ]"
        aspect-ratio="16/9"
        @play="onPlay"
        @ended="onEnded"
    />
</template>
```

## Props

| Prop                       | Type                                          | Default      | Notes                                                                  |
|----------------------------|-----------------------------------------------|--------------|------------------------------------------------------------------------|
| `src`                      | `string \| Array<{ src, type? }>`             | —            | Single URL or multi-source list. Required.                             |
| `poster`                   | `string`                                      | —            | Image rendered before playback starts.                                 |
| `tracks`                   | `Array<IVideoTrack>`                          | `[]`         | Captions / subtitles / chapter tracks.                                 |
| `autoplay`                 | `boolean`                                     | `false`      | Suppressed when `prefers-reduced-motion: reduce`.                      |
| `muted`                    | `boolean`                                     | `false`      | Forced to `true` when `autoplay` is enabled (browser policy).          |
| `loop`                     | `boolean`                                     | `false`      | Restart at `0` on `ended`.                                             |
| `controls`                 | `'custom' \| 'native' \| 'none'`              | `'custom'`   | Toolbar rendering strategy.                                            |
| `playsInline`              | `boolean`                                     | `true`       | Required for in-page playback on iOS.                                  |
| `preload`                  | `'none' \| 'metadata' \| 'auto'`              | `'metadata'` | Buffering hint passed to the native `preload` attribute.               |
| `aspectRatio`              | `string`                                      | `'16/9'`     | CSS `aspect-ratio` value — `'16/9'`, `'4/3'`, raw `'2 / 1'`, …         |
| `crossorigin`              | `'anonymous' \| 'use-credentials'`            | —            | Mirrors the native `crossorigin` attribute.                            |
| `disablePictureInPicture`  | `boolean`                                     | `false`      | Disables the PIP button and the matching shortcut.                     |

## Emits

| Event              | Payload                  | Notes                                                |
|--------------------|--------------------------|------------------------------------------------------|
| `play`             | —                        | Fired on the native `play` event.                    |
| `pause`            | —                        | Fired on the native `pause` event.                   |
| `ended`            | —                        | Fired on the native `ended` event.                   |
| `timeupdate`       | `currentTime: number`    | Approximately every 250ms during playback.           |
| `volumechange`     | `volume: number`         | Fires for both volume slides and mute toggles.       |
| `enterfullscreen`  | —                        | Fired after the wrapper enters fullscreen.           |
| `exitfullscreen`   | —                        | Fired after the wrapper leaves fullscreen.           |
| `enterpip`         | —                        | Fired on `enterpictureinpicture`.                    |
| `exitpip`          | —                        | Fired on `leavepictureinpicture`.                    |
| `loadedmetadata`   | `{ duration: number }`   | Fired once metadata is ready.                        |
| `error`            | `MediaError \| Error`    | Surfaces the native `videoEl.error` payload.         |

## Slots

| Slot       | Bindings                                                                                                                                              | Notes                                                          |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| `controls` | `{ playing, paused, currentTime, duration, buffered, volume, muted, fullscreen, pip, loading, error, methods }`                                       | Full toolbar replacement.                                      |
| `poster`   | —                                                                                                                                                     | Custom overlay before playback starts.                         |
| `loading`  | —                                                                                                                                                     | Custom loading spinner.                                        |
| `error`    | `{ error }`                                                                                                                                           | Custom error overlay.                                          |

`methods` exposes the imperative driver:

```ts
{
    play: () => Promise<void>
    pause: () => void
    seek: (seconds: number) => void
    setVolume: (value: number) => void
    toggleMute: () => void
    toggleFullscreen: () => Promise<void>
    togglePip: () => Promise<void>
}
```

## Tracks (WebVTT)

Tracks are declared via the `tracks` prop and rendered as native
`<track>` children of the `<video>`. The WebVTT format is required:

```text
WEBVTT

00:00:00.000 --> 00:00:04.000
The big buck bunny prepares for its enemies.

00:00:04.000 --> 00:00:08.000
English caption track.
```

The toolbar exposes a captions toggle when at least one `captions` or
`subtitles` track is declared. Clicking it cycles the active track
through the list of declared kinds (`'showing'` ↔ `'disabled'`). The
first track with `default: true` is the one enabled on load.

## Fullscreen / PIP support matrix

| Browser            | Fullscreen                            | Picture-in-picture                |
|--------------------|----------------------------------------|------------------------------------|
| Chromium 120+      | `requestFullscreen()` on the wrapper. | `requestPictureInPicture()`.       |
| Firefox 121+       | `requestFullscreen()` on the wrapper. | `requestPictureInPicture()`.       |
| Safari (desktop)   | `requestFullscreen()` on the wrapper. | `requestPictureInPicture()`.       |
| Safari iOS         | `webkitEnterFullscreen()` on `<video>` (system viewer). | Not supported.            |

The PIP button is hidden when `document.pictureInPictureEnabled` is
falsy. The fullscreen button is always visible — Safari iOS falls
back to `webkitEnterFullscreen` on the element itself.

## Accessibility

- The `<video>` element carries native semantics (already
  recognised by every modern screen reader).
- Custom toolbar buttons are `<button>` elements with dynamic
  `aria-label` (e.g. *"Play"* → *"Pause"*, *"Mute"* → *"Unmute"*).
- The scrubber is exposed as `role="slider"` with `aria-valuemin`,
  `aria-valuemax`, `aria-valuenow` and a human-readable `aria-valuetext`
  (`"01:23"`).
- The loading overlay carries `role="status"` with `aria-label="Loading"`.
- The error overlay carries `role="alert"`.

### Keyboard shortcuts

The default browser shortcuts are honoured (the `<video>` element
receives them when it is focused — the toolbar buttons relay focus
back via the standard `tabindex` flow):

| Key            | Action                  |
|----------------|-------------------------|
| `Space`        | Play / pause            |
| `←` / `→`      | Seek backward / forward |
| `↑` / `↓`      | Volume up / down        |
| `m`            | Toggle mute             |
| `f`            | Toggle fullscreen       |

## `prefers-reduced-motion`

When the OS-level *reduced motion* preference is set, the component
suppresses `autoplay` and logs a one-time `console.warn`. The
playback only starts after a user gesture (click on the play button,
or `methods.play()`). This is non-negotiable: autoplay is the single
worst offender for users with vestibular sensitivity, and the policy
defaults to *off* in any modern browser anyway when the OS reports
the preference.

## Composable — `useVideoPlayer`

```ts
import { useVideoPlayer } from '@origam/composables'

const { videoRef, state, methods } = useVideoPlayer({
    autoplay: false,
    muted: false,
    preload: 'metadata'
})

// in the template:
// <video ref="videoRef" :src="videoUrl" />
```

- `videoRef: Ref<HTMLVideoElement | null>` — bind on the `<video>`
  element. Pass your own ref through `options.videoRef` if you need
  external control.
- `state` — reactive refs: `playing`, `paused`, `currentTime`,
  `duration`, `buffered`, `volume`, `muted`, `fullscreen`, `pip`,
  `ready`, `loading`, `error`.
- `methods` — imperative actions: `play`, `pause`, `seek`,
  `setVolume`, `toggleMute`, `toggleFullscreen`, `togglePip`, `load`.

Listeners are attached on `onMounted` and torn down on
`onBeforeUnmount` so the composable is safe to use inside any
`<script setup>` consumer.

## SSR

The `<video>` markup is fully SSR-friendly — the same attributes
encode on both server and client. The composable's listener
attachment lives inside `onMounted`, so no `window` / `document`
access happens during render. Posters and captions ship in the
initial HTML payload, preserving the LCP-friendly behaviour of
SSR-rendered video.

## What this player is not

- A HLS / DASH client. The `<video>` element accepts HLS on Safari
  natively; on every other browser, the consumer needs to plug in
  `hls.js` (or `dash.js`) and attach it to `videoRef.value` from
  outside. We deliberately did NOT bundle one — most projects don't
  need streaming, and the few that do have specific opinions about
  which fork / version to use.
- A DRM-capable player (no Encrypted Media Extensions glue beyond
  what the native element does on its own).
- An analytics-collecting player. Wire your own `@timeupdate` /
  `@play` handlers from the host page — keeping the player free of
  tracking is intentional.
