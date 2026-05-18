# OrigamMediaController

Reusable media-controls shell that paints a two-row toolbar on top of any
`HTMLMediaElement`. It is intentionally **media-agnostic**: it does not
mount or know about the underlying `<video>` or `<audio>` element. The
parent owns the element, wires it through `useMediaPlayer` (or one of its
specialisations), then passes the reactive `state` and imperative `methods`
objects down to this shell.

The same shell powers `<OrigamVideo>` and `<OrigamAudio>` — both pass their
respective composable return value. Video-specific buttons (captions, PiP,
fullscreen) are injected via the `#extraControlsRight` slot so the shell
stays lean for audio-only contexts.

## Quick start

```vue
<template>
    <audio ref="audioRef" :src="src" preload="metadata" />

    <origam-media-controller
        :state="state"
        :methods="methods"
        :downloadable="true"
        :download-url="src"
        @download="onDownload"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAudioPlayer } from '@origam/composables'

const src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
const audioRef = ref<HTMLAudioElement | null>(null)
const { state, methods } = useAudioPlayer({ audioRef })

function onDownload(): void {
    console.log('download triggered')
}
</script>
```

## When to use

- Use it when you are building a media player that needs the standard
  YouTube-style two-row controls (scrubber on top; play/mute/time/config
  buttons below).
- If you only need a slider for a single value (e.g. volume or a position
  display), reach for `<OrigamMediaScrubber>` directly.
- If you need a complete audio or video player with a sensible default skin,
  use `<OrigamAudio>` or `<OrigamVideo>` — they already compose this shell
  internally and save you the composable wiring.
- Use the `#extraControlsRight` slot to inject video-specific buttons
  (captions, PiP, fullscreen) without forking the shell.

## Anatomy

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ◀────────────────── scrubber row ──────────────────────────────────────▶ │
│   [timeline: progress / buffer / thumb / hover-tooltip]                 │
├─────────────────────────────────────────────────────────────────────────┤
│ [▶ / ⏸] [🔊▲] [volume-slider] [00:30 / 02:00] [extra-left] ... [extra-right] [⚙] │
│ ◄── left group ──────────────────────────────► ◄── right group ────────► │
│                                                                          │
│   ⚙ config menu (popover, drill-down):                                  │
│   ┌──────────────────────┐                                               │
│   │ Quality         1080p ›                                              │
│   │ Speed              1× ›                                              │
│   │ ↓ Download                                                           │
│   │ [configExtra slot rows …]                                            │
│   └──────────────────────┘                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

The volume slider pops out of the mute button as a tooltip (vertical
`<OrigamMediaScrubber>`). Dragging it from zero un-mutes automatically;
the mute button icon adapts to the volume level.

## Props

### Media state wiring

| Prop       | Type                  | Default  | Description                                                                                                                                                    |
|------------|-----------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `state`    | `IMediaPlayerState`   | required | Reactive state returned by `useMediaPlayer()` (or `useVideoPlayer()` / `useAudioPlayer()`). The controller reads `playing`, `paused`, `currentTime`, `duration`, `buffered`, `volume`, `muted`, `playbackRate`, `remoteAvailable`, `remoteState`. |
| `methods`  | `IMediaPlayerMethods` | required | Imperative methods returned by the same composable. The controller calls `play`, `pause`, `seek`, `setVolume`, `toggleMute`, `setPlaybackRate`, `requestRemotePlayback` directly from its event handlers. |

Obtain `state` and `methods` from `useMediaPlayer`, `useVideoPlayer`, or
`useAudioPlayer`:

```ts
const audioRef = ref<HTMLAudioElement | null>(null)
const { state, methods } = useAudioPlayer({ audioRef })
// then: <origam-media-controller :state="state" :methods="methods" />
```

### Layout

| Prop      | Type      | Default | Description                                                                                                                               |
|-----------|-----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `inset`   | `boolean` | `false` | When `true`, the controller renders as an absolute overlay at the bottom of the media surface with a dark gradient (`position: absolute; bottom: 0`). When `false`, it renders as a regular block in the document flow. |
| `visible` | `boolean` | `true`  | Visibility flag for the autohide cycle. When `false` and `inset=true`, the shell transitions to `opacity: 0; pointer-events: none` so the parent can implement a cursor-timeout autohide without unmounting the toolbar (preserving internal state like the open config menu or volume hover cluster). |

### Config menu

| Prop             | Type                       | Default                         | Description                                                                                                  |
|------------------|----------------------------|---------------------------------|--------------------------------------------------------------------------------------------------------------|
| `playbackRates`  | `ReadonlyArray<number>`    | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | Available playback speeds in the config menu's "Speed" drill-down. The menu is hidden when fewer than 2 entries are provided. |
| `qualityOptions` | `ReadonlyArray<TQualityOption>` | `[]`                       | Quality variants for the "Quality" drill-down. Each entry has `{ quality: string, label: string, src?: string, type?: string }`. The menu row appears when ≥ 2 options are provided. |
| `currentQuality` | `string \| null`           | `null`                          | Active quality identifier. Used to highlight the selected row in the quality submenu and show the current value beside the "Quality" row on the main menu level. |

### Download

| Prop          | Type             | Default | Description                                                                                                                                   |
|---------------|------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `downloadable`| `boolean`        | `false` | When `true`, adds a "Download" row to the config menu. The `download` event fires when clicked — the parent owns the actual fetch or anchor click. |
| `downloadUrl` | `string \| null` | `null`  | URL surfaced in the download row. When `null`, the row is hidden even if `downloadable=true`.                                                 |

### Remote Playback (Cast / AirPlay)

| Prop                 | Type      | Default | Description                                                                                                                                         |
|----------------------|-----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `allowRemotePlayback`| `boolean` | `false` | Enables the cast button. The button only renders when this flag is `true` AND `state.remoteAvailable` is `true` (device detected by the browser's Remote Playback API). |

## Events

| Event            | Payload            | Description                                                                                                                              |
|------------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `quality-change` | `quality: string`  | Fired when the user picks a quality from the config menu. The controller closes the menu and does NOT swap the source — the parent owns the `<source>` swap logic. |
| `download`       | —                  | Fired when the "Download" row is clicked (only when `downloadable=true` and `downloadUrl` is non-null).                                  |

All other user actions (toggle play, seek, change volume, set playback
rate, toggle mute, cast) call `methods.*` directly. There are no emits for
these because the parent can observe `state.*` to react to them.

## Slots

| Slot                | Bindings              | Description                                                                                                                                                         |
|---------------------|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `extraControlsLeft` | —                     | Additional buttons on the left side of the buttons row, rendered after the time display. Typically unused; reserved for context-specific actions (e.g. mark, loop). |
| `extraControlsRight`| —                     | Additional buttons on the right side of the buttons row, rendered before the config cog. `<OrigamVideo>` injects captions, PiP, and fullscreen buttons here.        |
| `configExtra`       | `{ closeMenu: () => void }` | Additional rows inside the config menu, below the built-in Speed / Quality / Download rows. The slot receives `closeMenu` so the consumer can close the popover after their custom action fires. |

## Examples

### Minimal usage with `useAudioPlayer`

```vue
<template>
    <div>
        <audio ref="audioRef" :src="src" preload="metadata" />
        <origam-media-controller :state="state" :methods="methods" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAudioPlayer } from '@origam/composables'

const src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
const audioRef = ref<HTMLAudioElement | null>(null)
const { state, methods } = useAudioPlayer({ audioRef })
</script>
```

The hidden `<audio>` element is driven by the composable. The controller
reads `state` and calls `methods.*` directly from its button handlers.

---

### With captions / PiP / fullscreen via `#extraControlsRight` (video pattern)

```vue
<template>
    <div class="player" style="position: relative;">
        <video
            ref="videoRef"
            :src="src"
            style="width: 100%;"
            preload="metadata"
            playsinline
        />
        <origam-media-controller
            :state="state"
            :methods="methods"
            :inset="true"
            :visible="controlsVisible"
        >
            <template #extraControlsRight>
                <button type="button" :aria-label="$t('origam.video.captions')" @click="toggleCaptions">
                    <origam-icon icon="mdi-closed-caption" aria-hidden="true" />
                </button>
                <button type="button" :aria-label="$t('origam.video.pip')" @click="methods.togglePip()">
                    <origam-icon icon="mdi-picture-in-picture-bottom-right" aria-hidden="true" />
                </button>
                <button type="button" :aria-label="$t('origam.video.fullscreen')" @click="methods.toggleFullscreen()">
                    <origam-icon icon="mdi-fullscreen" aria-hidden="true" />
                </button>
            </template>
        </origam-media-controller>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoPlayer } from '@origam/composables'

const src = 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
const videoRef = ref<HTMLVideoElement | null>(null)
const { state, methods } = useVideoPlayer({ videoRef })
const controlsVisible = ref(true)

function toggleCaptions(): void { /* … */ }
</script>
```

The parent owns the captions toggle and fullscreen/PiP buttons, which are
video-specific. The controller stays media-agnostic.

---

### With a custom `#configExtra` row (audio output device picker)

```vue
<template>
    <origam-media-controller
        :state="state"
        :methods="methods"
    >
        <template #configExtra="{ closeMenu }">
            <button
                type="button"
                class="origam-media-controller__config-row"
                @click="pickAudioOutput(closeMenu)"
            >
                <span class="origam-media-controller__config-row-label">Audio output</span>
                <span class="origam-media-controller__config-row-value">{{ currentOutput }}</span>
            </button>
        </template>
    </origam-media-controller>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentOutput = ref('Default')

function pickAudioOutput(closeMenu: () => void): void {
    // open native selectAudioOutput() or a custom picker
    currentOutput.value = 'AirPods Pro'
    closeMenu()
}
</script>
```

The `closeMenu` binding lets the custom row dismiss the popover after the
action fires, matching the built-in Speed / Quality rows' behaviour.

---

### `inset` mode (YouTube-style overlay inside the video surface)

```vue
<template>
    <div style="position: relative; aspect-ratio: 16 / 9; background: #000;">
        <video ref="videoRef" :src="src" style="width: 100%; height: 100%;" preload="metadata" playsinline />
        <origam-media-controller
            :state="state"
            :methods="methods"
            :inset="true"
            :visible="isHovering"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoPlayer } from '@origam/composables'

const src = 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
const videoRef = ref<HTMLVideoElement | null>(null)
const { state, methods } = useVideoPlayer({ videoRef })
const isHovering = ref(false)
</script>
```

In `inset` mode the controller is `position: absolute; bottom: 0` with a
dark gradient. The parent drives the autohide via `visible` — typically
toggled from a `mousemove` / `touchstart` timer on the wrapper element.

---

### Hidden state (`visible=false` for autohide cycle)

```vue
<template>
    <origam-media-controller
        :state="state"
        :methods="methods"
        :inset="true"
        :visible="false"
    />
</template>
```

The shell remains mounted so the config menu state and volume cluster hover
survive the autohide. Only `opacity` and `pointer-events` change — no DOM
removal, no composable teardown.

---

### Quality switcher

```vue
<template>
    <video ref="videoRef" :src="activeSrc" preload="metadata" playsinline />
    <origam-media-controller
        :state="state"
        :methods="methods"
        :quality-options="qualities"
        :current-quality="currentQuality"
        @quality-change="onQualityChange"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoPlayer } from '@origam/composables'

const qualities = [
    { quality: '1080p', label: '1080p HD', src: '/movie-1080.mp4' },
    { quality: '720p',  label: '720p',     src: '/movie-720.mp4'  },
    { quality: '480p',  label: '480p',     src: '/movie-480.mp4'  }
]

const videoRef = ref<HTMLVideoElement | null>(null)
const { state, methods } = useVideoPlayer({ videoRef })
const currentQuality = ref('1080p')

const activeSrc = ref(qualities[0].src)

function onQualityChange(quality: string): void {
    const match = qualities.find((q) => q.quality === quality)
    if (match) {
        const t = state.currentTime.value
        const wasPlaying = state.playing.value
        activeSrc.value = match.src
        currentQuality.value = quality
        // Restore position after the source swap loads metadata
        const restore = () => {
            methods.seek(t)
            if (wasPlaying) methods.play()
            videoRef.value?.removeEventListener('loadedmetadata', restore)
        }
        videoRef.value?.addEventListener('loadedmetadata', restore)
    }
}
</script>
```

## Accessibility

- Every toolbar button is a native `<button>` element with a dynamic
  `aria-label` that reflects the current state (e.g. *"Play"* / *"Pause"*,
  *"Mute"* / *"Unmute"*, *"Cast to device"* / *"Stop casting"*).
- All icon children carry `aria-hidden="true"` — the accessible name is on
  the `<button>`, not the glyph.
- The timeline scrubber is `role="slider"` with `aria-valuemin=0`,
  `aria-valuemax={duration}`, `aria-valuenow={currentTime}`, and
  `aria-valuetext` set to a formatted timestamp (e.g. `"01:23"`). See
  `<OrigamMediaScrubber>` for the full keyboard contract.
- The volume cluster opens inside an `<OrigamTooltip>` which is keyboard
  reachable: Tab reaches the mute button, triggering the tooltip reveals
  the vertical volume scrubber which is independently focusable and driven
  by keyboard arrows.
- The config menu button has `aria-label="origam.media.settings"` (via
  `useLocale`). The popover does not use `aria-expanded` today — this is a
  known gap tracked for a future iteration.
- Tab order within the toolbar (left to right): play, mute, time display
  (non-interactive), `#extraControlsLeft` slot content,
  `#extraControlsRight` slot content, cast (conditional), config cog.

## i18n keys

The controller consumes the following keys from the `origam.media` i18n
namespace via `useLocale`:

| Key                           | Usage                                              |
|-------------------------------|----------------------------------------------------|
| `origam.media.seek`           | `aria-label` on the timeline scrubber.             |
| `origam.media.volume`         | `aria-label` on the volume scrubber.               |
| `origam.media.play`           | `aria-label` on the play button (paused state).    |
| `origam.media.pause`          | `aria-label` on the play button (playing state).   |
| `origam.media.mute`           | `aria-label` on the mute button (unmuted state).   |
| `origam.media.unmute`         | `aria-label` on the mute button (muted state).     |
| `origam.media.settings`       | `aria-label` on the config cog button.             |
| `origam.media.quality`        | Config menu row label and drill-down header.       |
| `origam.media.playbackSpeed`  | Config menu row label and drill-down header.       |
| `origam.media.normalSpeed`    | Label for playback rate `1` in the speed submenu.  |
| `origam.media.download`       | Config menu download row label.                    |
| `origam.media.castToDevice`   | `aria-label` on the cast button (disconnected).    |
| `origam.media.stopCasting`    | `aria-label` on the cast button (connected).       |

## CSS variables

| Variable                                              | Default                                         | Description                                                  |
|-------------------------------------------------------|-------------------------------------------------|--------------------------------------------------------------|
| `--origam-media-controller---color`                   | `#ffffff`                                       | Text and icon colour for all toolbar elements.               |
| `--origam-media-controller__scrubber---color`         | `var(--origam-color__action--primary---bg)`     | Override accent colour of the timeline scrubber only.        |

The controller also forwards scrubber-level variables when composing
`<OrigamMediaScrubber>`. Override the scrubber's CSS custom properties on
the `.origam-media-controller__scrubber` BEM element for fine-grained
control.

## Related

- [`<OrigamMediaScrubber>`](../MediaScrubber/OrigamMediaScrubber.md) — the
  headless slider primitive composed internally for both the timeline and
  the volume cluster.
- [`<OrigamVideo>`](../Video/OrigamVideo.md) — full video player that
  composes `<OrigamMediaController>` and injects captions / PiP / fullscreen
  via `#extraControlsRight`.
- [`<OrigamAudio>`](../Audio/OrigamAudio.md) — full audio player that
  composes `<OrigamMediaController>` without the video-specific buttons.
- `useMediaPlayer` — the headless composable that produces the `state` and
  `methods` objects this component consumes.
