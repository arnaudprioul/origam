# OrigamSound

Lightweight in-house audio player. Wraps the native `<audio>` element
with a custom toolbar (play/pause, scrubber, volume), an optional
canvas-rendered waveform powered by the Web Audio API, and Media
Session API integration so playback can be controlled from the OS
lock screen.

Zero external dependency — no `wavesurfer.js`, no `howler`. If HLS or
DASH playback is required for a project, plug in `hls.js` / `dash.js`
as a peer dependency from outside the composable; the underlying
`<audio>` element accepts whatever the peer extension attaches to it.

## Quick start

```vue
<template>
    <origam-sound
        :src="audioUrl"
        :cover="albumCover"
        :metadata="{
            title: 'Track title',
            artist: 'Artist name',
            album: 'Album name',
            artwork: [{ src: '/cover-512.png', sizes: '512x512', type: 'image/png' }]
        }"
        :waveform="true"
        @ended="onEnded"
    />
</template>
```

## Props

| Prop             | Type                                          | Default          | Notes                                                                  |
|------------------|-----------------------------------------------|------------------|------------------------------------------------------------------------|
| `src`            | `string \| Array<{ src, type? }>`             | —                | Single URL or multi-source list. Required.                             |
| `cover`          | `string`                                      | —                | Cover image (single resolution). For OS lock-screen variants, use `metadata.artwork`. |
| `metadata`       | `ISoundMetadata`                              | `{}`             | Title / artist / album / artwork — surfaced to the Media Session API.   |
| `waveform`       | `boolean \| 'auto'`                           | `false`          | `true` always enables; `'auto'` enables only when `OfflineAudioContext` is supported. |
| `waveformColor`  | `string`                                      | `'currentColor'` | Stroke color for the played bars (the unplayed color comes from a token). |
| `autoplay`       | `boolean`                                     | `false`          | Suppressed when `prefers-reduced-motion: reduce`.                       |
| `muted`          | `boolean`                                     | `false`          | Forced to `true` when `autoplay` is enabled (browser policy).           |
| `loop`           | `boolean`                                     | `false`          | Restart at `0` on `ended`.                                              |
| `controls`       | `'custom' \| 'native' \| 'none'`              | `'custom'`       | Toolbar rendering strategy.                                             |
| `preload`        | `'none' \| 'metadata' \| 'auto'`              | `'metadata'`     | Buffering hint passed to the native `preload` attribute.                |
| `crossorigin`    | `'anonymous' \| 'use-credentials'`            | —                | Mirrors the native `crossorigin` attribute.                             |

## Emits

| Event            | Payload                  | Notes                                                |
|------------------|--------------------------|------------------------------------------------------|
| `play`           | —                        | Fired on the native `play` event.                    |
| `pause`          | —                        | Fired on the native `pause` event.                   |
| `ended`          | —                        | Fired on the native `ended` event.                   |
| `timeupdate`     | `currentTime: number`    | Approximately every 250ms during playback.           |
| `volumechange`   | `volume: number`         | Fires for both volume slides and mute toggles.       |
| `loadedmetadata` | `{ duration: number }`   | Fired once metadata is ready.                        |
| `error`          | `MediaError \| Error`    | Surfaces the native `audioEl.error` payload.         |
| `waveform`       | `peaks: Array<number>`   | Fired once the waveform peaks have been decoded.     |

## Slots

| Slot       | Bindings                                                                                            | Notes                                  |
|------------|-----------------------------------------------------------------------------------------------------|----------------------------------------|
| `controls` | `{ playing, paused, currentTime, duration, buffered, volume, muted, loading, error, methods }`     | Full toolbar replacement.              |
| `cover`    | —                                                                                                   | Replaces the default cover image.      |
| `metadata` | `{ metadata }`                                                                                      | Replaces the title/artist/album block. |
| `waveform` | `{ peaks, currentTime, duration }`                                                                  | Replaces the default canvas rendering. |
| `error`    | `{ error }`                                                                                         | Replaces the default error overlay.    |

`methods` exposes the imperative driver:

```ts
{
    play: () => Promise<void>
    pause: () => void
    seek: (seconds: number) => void
    setVolume: (value: number) => void
    toggleMute: () => void
    load: () => void
}
```

## Waveform — Web Audio API

The component activates the waveform when `waveform === true` (or
`'auto'` on capable browsers). The decoder pipeline is:

1. `fetch(src)` → `ArrayBuffer`.
2. `OfflineAudioContext.decodeAudioData(buffer)` → `AudioBuffer`.
3. Channel 0 is downsampled into 200 buckets; per bucket, the
   maximum absolute amplitude is kept and normalised to `[0, 1]`.
4. Peaks are exposed as a reactive ref + emitted via the `waveform`
   event for consumer-side reuse.

### Requirements

- The browser must implement `OfflineAudioContext` (Chrome, Firefox,
  Safari 14.1+, Edge — all the modern targets).
- The audio source must be reachable through CORS when the host page
  lives on a different origin: set `crossorigin="anonymous"` and
  make sure the response includes `Access-Control-Allow-Origin`.
- The full audio file must be downloadable up front — the decoder
  needs the bytes in memory, no streaming.

### Performance notes

- A 3-minute MP3 (~3 MB) decodes in roughly 200ms on a 2024 MacBook.
- The `fetch` uses `cache: 'force-cache'` so the bytes are read from
  the browser's media cache when the player has already streamed
  the file.
- Drawing happens on a `<canvas>` (no SVG) — 200 bars at 60 fps is
  cheap; click-to-seek is wired automatically.

### Click-to-seek

The waveform canvas is clickable: a click at `x = 50%` seeks to
`duration / 2`. The default toolbar hides the `<input type="range">`
scrubber when the waveform is enabled so the two controls don't
compete for the same gesture.

### Custom rendering

Pass a `#waveform` slot to render the peaks however you like — the
slot receives `{ peaks, currentTime, duration }` and is rebuilt on
every frame change. The story ships a DIV-bars renderer as an
example.

## Media Session API

When `metadata` includes a `title` / `artist` / `album` / `artwork`,
the component instantiates a `MediaMetadata` object and attaches it
to `navigator.mediaSession`. The OS lock screen / Touch Bar / car
infotainment then renders the track info and surfaces play / pause /
seek buttons that drive the player.

### Action handlers wired

- `play` → `methods.play()`
- `pause` → `methods.pause()`
- `seekto` → `methods.seek(event.seekTime)`

Handlers are torn down on `onBeforeUnmount` so the next mounted
player owns the lock-screen state cleanly.

## Accessibility

- The `<audio>` element carries native semantics.
- Custom toolbar buttons are `<button>` elements with dynamic
  `aria-label` (e.g. *"Play"* → *"Pause"*, *"Mute"* → *"Unmute"*).
- The scrubber is exposed as `role="slider"` with `aria-valuemin`,
  `aria-valuemax`, `aria-valuenow` and a human-readable `aria-valuetext`
  (`"01:23"`).
- The waveform canvas carries `role="img"` and an `aria-label="Audio
  waveform"` so screen readers do not silently skip it.

## `prefers-reduced-motion`

When the OS-level *reduced motion* preference is set, the component
suppresses `autoplay` and logs a one-time `console.warn`. Audio
autoplay is the auditory counterpart of unsolicited motion — many
users map the preference to "do not surprise me", and several
screen readers honour it exactly that way.

## Composable — `useAudioPlayer`

```ts
import { useAudioPlayer } from '@origam/composables'

const { audioRef, state, methods } = useAudioPlayer({
    autoplay: false,
    muted: false,
    preload: 'metadata'
})

// in the template:
// <audio ref="audioRef" :src="audioUrl" />
```

- `audioRef: Ref<HTMLAudioElement | null>` — bind on the `<audio>`
  element. Pass your own ref through `options.audioRef` if you need
  external control.
- `state` — reactive refs: `playing`, `paused`, `currentTime`,
  `duration`, `buffered`, `volume`, `muted`, `ready`, `loading`,
  `error`.
- `methods` — imperative actions: `play`, `pause`, `seek`,
  `setVolume`, `toggleMute`, `load`.

Listeners are attached on `onMounted` and torn down on
`onBeforeUnmount`, so the composable is safe inside any
`<script setup>` consumer.

## Composable — `useWaveform`

```ts
import { useWaveform } from '@origam/composables'

const src = ref('/track.mp3')
const { peaks, isComputing, error, compute } = useWaveform(src, { bins: 200 })
```

- `peaks: Ref<Array<number>>` — normalised amplitudes between 0 and 1.
- `isComputing: Ref<boolean>` — true while the decoder is running.
- `error: Ref<Error | null>` — populated when the fetch fails or the
  browser doesn't support `OfflineAudioContext`.
- `compute()` — re-runs the decode pipeline. Useful when you want to
  force a refresh after a network blip.

The composable is SSR-safe — every `window` / `AudioContext` access
is guarded.

## Browser support

| Browser            | `<audio>` | Waveform decode | Media Session |
|--------------------|-----------|------------------|----------------|
| Chromium 120+      | Yes       | Yes              | Yes            |
| Firefox 121+       | Yes       | Yes              | Yes            |
| Safari (desktop)   | Yes       | Yes (14.1+)      | Yes            |
| Safari iOS         | Yes       | Yes (15+)        | Yes (15+)      |

## What this player is not

- A HLS / DASH client. The `<audio>` element accepts HLS on Safari
  natively; on every other browser, the consumer needs to plug in
  `hls.js` (or similar) and attach it to `audioRef.value` from
  outside.
- A DRM-capable player.
- An analytics-collecting player. Wire your own `@timeupdate` /
  `@play` handlers from the host page.
