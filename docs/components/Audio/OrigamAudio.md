# OrigamAudio

Full-featured audio player that wraps a native `<audio>` element with
`<OrigamMediaController>` and an optional metadata strip (cover, title,
artist). Drops into a page without surrounding chrome and respects the DS
spacing / radius / border / margin / padding contract.

It is SSR-safe — no `window` / `document` / `canvas` API is touched outside
`onMounted`.

## Quick start

```vue
<template>
    <origam-audio
        :src="src"
        title="Episode 42 — How Vue 3 SFC compiler resolves withDefaults"
        artist="origam podcast"
        cover="https://picsum.photos/seed/audio/120"
        :downloadable="true"
    />
</template>

<script setup lang="ts">
import { OrigamAudio } from '@origam/components'

const src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
</script>
```

## When to use

- Podcasts, music players, single audio tracks with controls.
- Anywhere you'd otherwise mount a `<audio controls>` and want the DS look
  + custom config menu + cast + downloadable + remote playback.
- When you need to swap the metadata strip out for a custom block (album
  art, ratings, chapter markers) via the `#metadata` slot.

When NOT to use:

- One-shot SFX (button clicks, notification chimes, game effects) — reach
  for `<OrigamSound>` (or its successor) which has no controls and a
  fire-and-forget API.
- A bare `<audio>` is enough when you want the platform's accessibility
  shortcuts and no custom skin — pass `controls="native"` instead.

## Anatomy

```
┌────────────────────────────────────────────────────────────┐
│ [cover]  Title text                       ← metadata strip │
│          Artist name                                       │
├────────────────────────────────────────────────────────────┤
│ <OrigamMediaController>                   ← controls shell │
│   ◀──────── scrubber row ─────────────────────────────────▶│
│   [▶] [🔊] [vol] [00:30 / 02:00] … [⚙ config / ↑ cast]    │
└────────────────────────────────────────────────────────────┘
```

The metadata strip is optional — when `title`, `artist`, and `cover` are
all unset (and no `#metadata` slot is provided), only the controls shell
renders. The strip is a `flex-row` of the cover image + a `flex-column` of
title / artist text; the controls shell sits below at the wrapper's gap.

## Props

| Prop                  | Type                                                                  | Default        | Description                                                                                                                              |
|-----------------------|-----------------------------------------------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `src`                 | `string \| IAudioSource \| Array<IAudioSource>`                       | required       | Media URL, single source object `{ src, type }`, or array of sources for codec fallback. The browser walks the array top-down.            |
| `tracks`              | `Array<IVideoTrack>`                                                  | `[]`           | Optional captions / chapters tracks attached to the `<audio>`. Reuses the video track shape (`kind / src / srclang / label / default`).  |
| `title`               | `string`                                                              | `undefined`    | Optional title rendered above the controls (e.g. *"Podcast Episode 42"*).                                                                |
| `artist`              | `string`                                                              | `undefined`    | Optional artist / author rendered next to the title.                                                                                     |
| `cover`               | `string \| ISrcObject`                                                | `undefined`    | Optional cover image. Accepts a URL string or an `ISrcObject` for srcset / lazy-src support. Rendered via `<OrigamImg>`.                  |
| `autoplay`            | `boolean`                                                             | `false`        | Starts playback on `loadedmetadata`. The component force-enables `muted` if the consumer asks for `autoplay` without an explicit `muted`. Suppressed when the user prefers reduced motion. |
| `muted`               | `boolean`                                                             | `false`        | Starts muted.                                                                                                                            |
| `loop`                | `boolean`                                                             | `false`        | Restarts at `0` when `ended` fires.                                                                                                      |
| `preload`             | `'none' \| 'metadata' \| 'auto'`                                       | `'metadata'`   | Buffering hint. `'metadata'` loads just enough to compute duration; `'none'` defers everything; `'auto'` pre-buffers.                    |
| `crossorigin`         | `string`                                                              | `undefined`    | Mirrors the native `crossorigin` attribute. Required when the media is served from a CORS-enabled origin and you need WebAudio access.   |
| `controls`            | `'custom' \| 'native'`                                                 | `'custom'`     | `'custom'` paints `<OrigamMediaController>`. `'native'` exposes the browser's built-in `controls` attribute on the `<audio>`.            |
| `playbackRates`       | `ReadonlyArray<number>`                                               | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | Available speeds exposed via the config menu.                                                                                |
| `playbackRate`        | `number`                                                              | `1`            | Initial playback rate. Two-way bound through `update:playbackRate`.                                                                      |
| `allowRemotePlayback` | `boolean`                                                             | `false`        | Enable the cast / AirPlay button (Remote Playback API). The button only renders when a compatible device is detected.                    |
| `downloadable`        | `boolean`                                                             | `false`        | Adds a *"Download"* row to the cog menu.                                                                                                  |
| `downloadFilename`    | `string`                                                              | trailing URL segment | Override the downloaded file name.                                                                                                  |

Plus the inherited DS contracts (no specific defaults — applied verbatim if
provided): `class`, `style` (from `ICommonsComponentProps`), `tag` (default
`'div'`, from `ITagProps`), `rounded`, `border`, `margin`, `padding` (from
the matching DS transverse interfaces).

## Events

| Event                  | Payload                          | Fires when                                                                                                  |
|------------------------|----------------------------------|-------------------------------------------------------------------------------------------------------------|
| `play`                 | —                                | The underlying `<audio>` starts playback.                                                                   |
| `pause`                | —                                | Playback pauses (user, programmatic, or browser-driven).                                                    |
| `ended`                | —                                | Playback reaches the end (or wraps when `loop=true`).                                                       |
| `timeupdate`           | `Event`                          | The native `timeupdate` event fires (throttled by the browser, typically 4×/s).                             |
| `volumechange`         | `Event`                          | Volume or muted state changes.                                                                              |
| `loadedmetadata`       | `Event`                          | Duration becomes available.                                                                                 |
| `error`                | `Event \| MediaError \| Error`   | The element or the source fails to load / decode. The composable normalises the payload to a `MediaError` when possible. |
| `update:playbackRate`  | `number`                         | The listener picks a new rate from the config menu. The component does NOT echo the consumer's prop changes — only user actions. |
| `download`             | `string`                         | The listener clicks the *"Download"* row. Payload is the resolved file URL.                                 |

## Slots

| Slot         | Bindings                              | Description                                                                                                  |
|--------------|---------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `#metadata`  | —                                     | Replace the entire title/artist/cover strip with arbitrary HTML.                                             |
| `#cover`     | —                                     | Replace just the cover image / placeholder slot.                                                             |
| `#title`     | —                                     | Replace just the title element (keeps the artist line if `artist` is set).                                   |
| `#controls`  | `IAudioScopedSlotBindings` (state + methods + flags) | Replace the entire controls shell. Receives the same `state` / `methods` you'd get from `useAudioPlayer`, plus toggles for download, cast, etc. |
| `#loading`   | —                                     | Overlay rendered while the media is loading.                                                                 |
| `#error`     | `{ error: MediaError \| Error }`      | Overlay rendered when an error occurred. Default renders an inline message + alert icon.                     |

## Examples

### Minimal single-track

```vue
<origam-audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
```

The controls shell paints by itself; no metadata strip is rendered.

### Podcast — with title, artist, cover

```vue
<origam-audio
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    title="Episode 42 — How Vue 3 SFC compiler resolves withDefaults"
    artist="origam podcast"
    cover="https://picsum.photos/seed/audio-cover/120"
    :downloadable="true"
/>
```

Cover lives left of the title block; downloads land in the cog menu.

### Multiple sources (codec fallback)

```vue
<origam-audio
    :src="[
        { src: '/audio/track.mp3', type: 'audio/mpeg' },
        { src: '/audio/track.ogg', type: 'audio/ogg' }
    ]"
/>
```

The browser walks the array top-down and picks the first source whose
`type` it can decode without a network round-trip.

### `controls="native"` — browser fallback

```vue
<origam-audio
    src="/audio/announcement.mp3"
    controls="native"
/>
```

Useful when the platform's accessibility shortcuts matter more than a
unified visual identity. The custom shell is not mounted.

### Downloadable + Remote Playback (Cast / AirPlay)

```vue
<origam-audio
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    :downloadable="true"
    :allow-remote-playback="true"
    download-filename="origam-podcast-ep-42.mp3"
/>
```

The cast button only renders when the Remote Playback API reports an
available device on the local network.

### Custom `#metadata` slot

```vue
<origam-audio :src="src">
    <template #metadata>
        <div class="hero">
            <origam-img :src="albumArt" class="hero__art" />
            <div class="hero__text">
                <strong>{{ track.title }}</strong>
                <span>{{ track.album }} · {{ track.year }}</span>
                <origam-rating-field :model-value="track.rating" readonly />
            </div>
        </div>
    </template>
</origam-audio>
```

### Custom `#controls` slot — full override

```vue
<origam-audio :src="src">
    <template #controls="{ state, methods }">
        <button @click="methods.toggle()">
            {{ state.playing.value ? 'Pause' : 'Play' }}
        </button>
        <input
            type="range"
            min="0"
            :max="state.duration.value"
            :value="state.currentTime.value"
            @input="methods.seek(Number($event.target.value))"
        >
    </template>
</origam-audio>
```

The slot bindings expose the same `state` / `methods` as `useAudioPlayer`,
so any control surface can replace the default `<OrigamMediaController>`.

## Accessibility

- The underlying `<audio>` element is keyboard-accessible by default
  (play/pause via the platform shortcuts).
- The controls shell labels every button through `origam.media.*` i18n
  keys (`play`, `pause`, `mute`, `unmute`, `volume`, `seek`, `settings`,
  `back`, `playbackSpeed`, …) so localisation Just Works.
- The metadata strip uses semantic HTML (`<strong>` for the title,
  ordinary text for the artist) so screen readers announce the track
  before the controls.
- The `<OrigamMediaScrubber>` inside the shell exposes
  `role="slider"`, `aria-orientation`, `aria-valuemin / max / now /
  text` plus the full keyboard contract (Arrow keys, Home, End, PageUp,
  PageDown).
- When `autoplay` is requested AND the user has
  `prefers-reduced-motion: reduce`, autoplay is suppressed — the user
  presses play to start.

## i18n keys

The component consumes the shared media namespace via
`<OrigamMediaController>`:

- `origam.media.play`, `origam.media.pause`
- `origam.media.mute`, `origam.media.unmute`, `origam.media.volume`
- `origam.media.seek`, `origam.media.rewind`, `origam.media.forward`,
  `origam.media.seconds`
- `origam.media.settings`, `origam.media.back`,
  `origam.media.playbackSpeed`, `origam.media.normalSpeed`
- `origam.media.quality`, `origam.media.download`
- `origam.media.castToDevice`, `origam.media.stopCasting`

No `origam.audio.*` keys are consumed directly; everything goes through
`origam.media.*` so audio and video share the same translation contracts.

## CSS variables

| Variable                                       | Default                                                          | Notes                                             |
|------------------------------------------------|------------------------------------------------------------------|---------------------------------------------------|
| `--origam-audio---background-color`            | `var(--origam-color__surface---raised, transparent)`             | Wrapper background.                               |
| `--origam-audio---color`                       | `inherit`                                                        | Default text colour for the wrapper.              |
| `--origam-audio---border-radius`               | `var(--origam-radius---md, 8px)`                                 | Outer corner radius.                              |
| `--origam-audio---gap`                         | `12px`                                                           | Gap between the metadata strip and the controls.  |
| `--origam-audio---padding`                     | `12px`                                                           | Wrapper inner padding.                            |
| `--origam-audio__metadata---gap`               | `12px`                                                           | Gap between cover and text block in the strip.    |
| `--origam-audio__cover---size`                 | `64px`                                                           | Cover image square size.                          |
| `--origam-audio__cover---border-radius`        | `var(--origam-radius---md, 8px)`                                 | Cover image corner radius.                        |
| `--origam-audio__text---gap`                   | `2px`                                                            | Gap between title and artist lines.               |
| `--origam-audio__title---font`                 | `600 0.95rem/1.3 inherit`                                        | Title typography.                                 |
| `--origam-audio__title---color`                | `inherit`                                                        | Title colour.                                     |
| `--origam-audio__artist---font`                | `0.85rem/1.3 inherit`                                            | Artist typography.                                |
| `--origam-audio__artist---color`               | `var(--origam-color__text---secondary, inherit)`                 | Artist colour.                                    |
| `--origam-audio__loading---font-size`          | `0.875rem`                                                       | Loading overlay text size.                        |
| `--origam-audio__loading---color`              | `inherit`                                                        | Loading overlay colour.                           |
| `--origam-audio--error---*`                    | (see component source)                                           | Error overlay tokens — background, colour, font, radius, padding, gap, icon size. |

Override any of them at the wrapper level (`<origam-audio style="--origam-audio---padding: 16px;" />`) or in a parent stylesheet.

## Related

- [`<OrigamMediaController>`](../MediaController/OrigamMediaController.md) — the controls shell composed by this component.
- [`<OrigamMediaScrubber>`](../MediaScrubber/OrigamMediaScrubber.md) — the slider used inside the shell for the scrubber and the volume.
- [`<OrigamVideo>`](../Video/OrigamVideo.md) — the video equivalent, same shell + video-specific extras.
- `useAudioPlayer()` — composable returning `{ state, methods }` for an `<audio>` ref. Located at `src/composables/Audio/use-audio-player.composable.ts`.
- `useMediaPlayer()` — the shared base composable. Located at `src/composables/Media/use-media-player.composable.ts`. `useAudioPlayer` is a thin wrapper.
