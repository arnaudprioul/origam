# OrigamMediaScrubber

Headless, presentation-only track slider used by `<OrigamVideo>` for the
timeline and `<OrigamAudio>` / `<OrigamMediaController>` for the volume
knob. A single pointer-events + keyboard pipeline handles both horizontal
(timeline) and vertical (volume) orientations instead of the browser's
`<input type="range">` with a `rotate(-90deg)` workaround.

The component owns **no internal state**. The parent is always the single
source of truth for the current value: it passes `modelValue` (or `v-model`)
and reacts to `update:modelValue` / `change` / `dragstart` / `dragend` /
`hover` emits.

## Quick start

```vue
<template>
    <origam-media-scrubber
        v-model="currentTime"
        :max="duration"
        :buffered="buffered"
        show-thumb-on-hover-only
        show-hover-tooltip
        :format-hover-tooltip="formatTime"
        aria-label="Seek"
        :aria-value-text="formattedTime"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTime = ref(0)
const duration = ref(120)
const buffered = ref(80)

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}

const formattedTime = formatTime(currentTime.value)
</script>
```

## When to use

- You need a scrubber for **media playback positions** (timeline) or
  **media volume** (level slider) — not a generic form input.
- You want the YouTube thumb-reveal UX (`showThumbOnHoverOnly`) and a
  hovering position tooltip (`showHoverTooltip`) with a custom formatter.
- You need an **orientation-independent** drag pipeline (horizontal for
  timelines, vertical for volume columns) wired to a single parent value.
- You are composing a custom media player and do not want the full
  `<OrigamMediaController>` shell.

Use `<OrigamSliderField>` instead when:

- The slider is a **labelled form field** inside a form (it renders a
  visible label, helper text, and a numeric value display).
- The value has a unit visible to the user at rest (e.g. *"Speed: 1.5×"*).
- You need validation, error state, or `v-model` wired to a form store.

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│  [hover tooltip]  ← position follows cursor                  │
│  ──────────────────────────────────────────────────────      │
│  ▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      │
│  ◄ progress ►◄── buffer ──►◄────── track (bg) ─────────►     │
│                   ●  ← thumb                                 │
└──────────────────────────────────────────────────────────────┘

Horizontal layout (default)

Parts:
  track          — full-width background bar
  buffer bar     — lighter fill from min to buffered position
  progress bar   — accent fill from min to current value
  thumb          — circular handle at the current value position
  hover tooltip  — floating label above cursor (horizontal only)
```

For vertical orientation the axis flips: the track fills vertically, the
thumb rides the bottom-to-top axis (bottom = min, top = max), and no
hover tooltip is shown (the element is too narrow to anchor one cleanly).

## Props

| Prop                  | Type                               | Default                   | Description                                                                                                                                       |
|-----------------------|------------------------------------|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `modelValue`          | `number`                           | required                  | Current value, clamped to `[min, max]`. Bind with `v-model`.                                                                                      |
| `max`                 | `number`                           | required                  | Upper bound of the range. Values `<= min` freeze the thumb at start.                                                                              |
| `min`                 | `number`                           | `0`                       | Lower bound of the range.                                                                                                                          |
| `step`                | `number`                           | `0`                       | Discrete increment. `0` means continuous (raw float). Positive values snap each emission to the nearest multiple.                                 |
| `buffered`            | `number`                           | `undefined`               | Buffered end position in the same range as `max`. Renders the lighter buffer bar; `undefined` hides it.                                           |
| `orientation`         | `'horizontal' \| 'vertical'`       | `'horizontal'`            | Layout axis. Horizontal = timeline shape; vertical = volume column (top = max, bottom = min).                                                     |
| `disabled`            | `boolean`                          | `false`                   | Disables pointer and keyboard interaction. Drops the element from the tab order and applies a 50 % opacity.                                       |
| `showThumbOnHoverOnly`| `boolean`                          | `false`                   | Hides the thumb at rest; reveals it on hover, focus, or active drag. The YouTube pattern.                                                         |
| `showHoverTooltip`    | `boolean`                          | `false`                   | Shows a floating tooltip above the cursor (horizontal orientation only) displaying the hovered value.                                             |
| `formatHoverTooltip`  | `(value: number) => string`        | `value => String(value)`  | Formatter for the default tooltip label. Receives the hovered value; returns the string to render.                                               |
| `ariaLabel`           | `string`                           | required                  | Accessible label read by screen readers when the scrubber is focused. Always pass a translated string.                                            |
| `ariaValueText`       | `string`                           | `undefined`               | Human-readable representation of the current value (e.g. `"1:23"` for a timestamp, `"45 %"` for volume). Maps to `aria-valuetext`.               |
| `color`               | `TIntent \| string`                | `undefined`               | Accent colour for the progress bar and thumb. Accepts a DS intent token (`'primary'`, `'success'`, …) or any CSS colour value.                   |
| `rounded`             | `TRounded`                         | `undefined`               | Border-radius applied to the track. Accepts DS rounding tokens.                                                                                   |
| `class`               | `any`                              | `undefined`               | Additional classes forwarded to the root element.                                                                                                 |
| `style`               | `StyleValue`                       | `undefined`               | Inline styles forwarded to the root element.                                                                                                      |

## Events

| Event               | Payload              | Description                                                                                        |
|---------------------|----------------------|----------------------------------------------------------------------------------------------------|
| `update:modelValue` | `value: number`      | Fires during drag, keyboard interaction, and click. Wire to `v-model` or handle manually.         |
| `change`            | `value: number`      | Fires once on pointerup / pointercancel after a drag — the committed value.                        |
| `dragstart`         | —                    | Fires on pointerdown when a drag begins (after pointer capture is acquired).                       |
| `dragend`           | —                    | Fires when the drag ends (pointerup or pointercancel).                                             |
| `hover`             | `value: number \| null` | Fires with the hovered value on pointermove; fires with `null` on pointerleave.                 |

## Slots

| Slot      | Bindings           | Description                                                                                                                                    |
|-----------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `tooltip` | `{ value: number }` | Overrides the default hover-tooltip body. Only rendered when `showHoverTooltip=true` and the cursor is over the track (horizontal only).       |

## Examples

### Basic horizontal scrubber

```vue
<template>
    <origam-media-scrubber
        v-model="value"
        :max="100"
        aria-label="Volume"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(40)
</script>
```

A minimal scrubber with no tooltip, always-visible thumb, and a continuous
(non-stepped) range from 0 to 100.

---

### Vertical orientation with `formatHoverTooltip`

```vue
<template>
    <div style="height: 120px; width: 24px; display: flex; align-items: stretch;">
        <origam-media-scrubber
            v-model="volume"
            orientation="vertical"
            :max="1"
            :step="0.05"
            show-hover-tooltip
            :format-hover-tooltip="(v) => Math.round(v * 100) + ' %'"
            aria-label="Volume"
            :aria-value-text="Math.round(volume * 100) + ' %'"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const volume = ref(0.7)
</script>
```

The host element must constrain the height. The thumb rides from bottom
(min) to top (max); `ArrowUp` increments, `ArrowDown` decrements.

---

### With `buffered` for media playback

```vue
<template>
    <origam-media-scrubber
        v-model="currentTime"
        :max="duration"
        :buffered="buffered"
        :aria-label="$t('origam.media.seek')"
        :aria-value-text="formatTime(currentTime)"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentTime = ref(30)
const duration = ref(200)
const buffered = ref(90)

function formatTime(s: number): string {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
}
</script>
```

The lighter buffer bar fills from `min` to `buffered`, showing how much of
the media the browser has downloaded ahead of the playhead.

---

### With `showThumbOnHoverOnly`

```vue
<template>
    <origam-media-scrubber
        v-model="value"
        :max="100"
        show-thumb-on-hover-only
        show-hover-tooltip
        :format-hover-tooltip="(v) => v.toFixed(0)"
        aria-label="Timeline"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(55)
</script>
```

The thumb scales to zero at rest (CSS `transform: scale(0)`) and springs
back to full size on hover, focus-visible, or active drag. This is the
YouTube timeline pattern.

---

### With color intent and rounded track

```vue
<template>
    <origam-media-scrubber
        v-model="value"
        :max="100"
        color="primary"
        rounded="full"
        aria-label="Progress"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(70)
</script>
```

`color="primary"` maps to the `--origam-color__action--primary---bg` token
via `useBackgroundColor`. `rounded="full"` applies a pill border-radius to
the track via `useRounded`.

---

### Disabled state

```vue
<template>
    <origam-media-scrubber
        v-model="value"
        :max="100"
        :disabled="true"
        aria-label="Disabled timeline"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(40)
</script>
```

The disabled scrubber drops out of the tab order (`tabindex="-1"`), ignores
pointer events, and renders at 50 % opacity. The `role="slider"` attribute
is removed so screen readers do not announce it as interactive.

---

### Custom tooltip slot

```vue
<template>
    <origam-media-scrubber
        v-model="currentTime"
        :max="duration"
        show-hover-tooltip
        aria-label="Timeline"
    >
        <template #tooltip="{ value }">
            <span style="font-weight: 700;">{{ formatTime(value) }}</span>
            <span style="opacity: 0.6; font-size: 10px;"> / {{ formatTime(duration) }}</span>
        </template>
    </origam-media-scrubber>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentTime = ref(30)
const duration = ref(200)

function formatTime(s: number): string {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
}
</script>
```

The `#tooltip` slot receives `{ value }` — the hovered position. The slot
is the recommended way to build rich previews (thumbnail + timestamp) above
the track.

## Accessibility

- The root element carries `role="slider"` when the scrubber is enabled.
  When `disabled=true`, the role is omitted so assistive technology does
  not expose a non-interactive widget as interactive.
- `aria-orientation` is set to the current orientation (`'horizontal'` or
  `'vertical'`). Screen readers use this to map the correct arrow keys to
  increment/decrement.
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` are always set from
  `min`, `max`, and the clamped `modelValue`. If `modelValue` is out of
  `[min, max]`, the component clamps it silently so the ARIA attributes
  never carry invalid values.
- Pass `ariaValueText` with a human-readable form of the current value
  (e.g. `"1:23"` for a timestamp, `"45 %"` for volume). Without it, screen
  readers announce the raw float, which is not meaningful for a position.
- `aria-label` is required. Never leave it empty — screen readers use it
  as the widget's accessible name.
- All track children (`__buffer`, `__progress`, `__thumb`,
  `__hover-tooltip`) carry `aria-hidden="true"` so the presentation layer
  does not pollute the accessibility tree.

### Keyboard interaction (WCAG 2.1 SC 2.1.1, SC 4.1.2)

| Key               | Action                                                                                            |
|-------------------|---------------------------------------------------------------------------------------------------|
| `ArrowRight`      | Horizontal: increment by `step` (or 5 % of range if `step=0`).                                   |
| `ArrowLeft`       | Horizontal: decrement by the same amount.                                                         |
| `ArrowUp`         | Vertical: increment by `step` (or 5 % of range if `step=0`).                                     |
| `ArrowDown`       | Vertical: decrement by the same amount.                                                           |
| `PageUp`          | Increment by 10 % of `(max − min)`.                                                               |
| `PageDown`        | Decrement by 10 % of `(max − min)`.                                                               |
| `Home`            | Jump to `min`.                                                                                    |
| `End`             | Jump to `max`.                                                                                    |

Each key action calls `commit(value, true)` so both `update:modelValue` and
`change` fire, matching the pointer-based commit contract.

The focus ring is provided by the browser's `:focus-visible` stylesheet —
the component does not suppress the outline. On hover or focus, the track
expands from `--origam-media-scrubber---track-thickness` to
`--origam-media-scrubber---track-thickness-active` via a CSS transition.

## CSS variables

These variables can be overridden on the component root or any ancestor
element to retheme the scrubber without forking the component.

| Variable                                             | Default                                         | Description                                              |
|------------------------------------------------------|-------------------------------------------------|----------------------------------------------------------|
| `--origam-media-scrubber---color`                    | `var(--origam-color__action--primary---bg)`     | Accent colour for progress bar and thumb.                |
| `--origam-media-scrubber---track-background-color`   | `rgba(255, 255, 255, 0.3)`                      | Track background (inactive portion).                     |
| `--origam-media-scrubber---buffer-background-color`  | `rgba(255, 255, 255, 0.4)`                      | Buffer bar background.                                   |
| `--origam-media-scrubber---thumb-diameter`           | `13px`                                          | Thumb circle diameter.                                   |
| `--origam-media-scrubber---track-size`               | `3px`                                           | Track thickness at rest.                                 |
| `--origam-media-scrubber---track-size-active`        | `5px`                                           | Track thickness on hover / focus / scrubbing.            |
| `--origam-media-scrubber__tooltip---background-color`| `rgba(0, 0, 0, 0.85)`                           | Hover-tooltip background.                                |
| `--origam-media-scrubber__tooltip---color`           | `#ffffff`                                       | Hover-tooltip text colour.                               |

## Related

- `<OrigamMediaController>` — the full
  controls shell that composes two `<OrigamMediaScrubber>` instances
  (timeline + volume) with the play/mute/config buttons.
- `<OrigamVideo>` — full video player that uses
  `<OrigamMediaController>` (and therefore `<OrigamMediaScrubber>`) internally.
- `<OrigamAudio>` — full audio player with the
  same controller wiring as the video player.
- `<OrigamSliderField>` — use this
  instead of `<OrigamMediaScrubber>` when you need a labelled form input
  with validation, helper text, and a numeric value display.
