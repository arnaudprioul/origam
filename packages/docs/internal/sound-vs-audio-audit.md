# OrigamSound vs OrigamAudio — audit + reconciliation plan

**Date:** 2026-05-18
**Branch:** `feature/sound-deprecation`

## Context

`<OrigamSound>` predates the Media stack refactor (MediaScrubber +
MediaController + Audio shipped in step 1-4 of the media-controller
refactor on develop). `<OrigamAudio>` was created later and composes
`<OrigamMediaController>` against an `<audio>` element. The two now
overlap, with two competing `useAudioPlayer` symbols and parallel
interfaces.

## Feature matrix

| Feature                                       | OrigamSound | OrigamAudio | Verdict           |
|-----------------------------------------------|-------------|-------------|-------------------|
| Single-track playback                         | yes         | yes         | both              |
| Native `<audio controls>` fallback            | yes         | yes         | both              |
| Custom controls bar (play/pause/scrubber/vol) | yes (inline)| yes (via MediaController) | audio-wins (richer)|
| Time display                                  | yes         | yes         | both              |
| Volume cluster (mute + vertical slider)       | rudimentary | yes (vertical scrubber in tooltip) | audio-wins |
| Config menu (quality / speed / download)      | no          | yes         | audio-only        |
| Remote playback / cast                        | no          | yes         | audio-only        |
| Multi-source (codec fallback)                 | yes         | yes         | both              |
| Title / artist / cover metadata strip         | yes (+ album) | yes (no album field) | port-to-audio |
| Captions / tracks (`<track>`)                 | no          | yes         | audio-only        |
| Web Audio waveform visualisation              | yes (`useWaveform`) | no  | port-to-audio     |
| Waveform colour prop                          | yes         | no          | port-to-audio     |
| Waveform peaks emit                           | yes         | no          | port-to-audio     |
| One-shot SFX                                  | no          | no          | n/a (neither)     |
| `playbackRate` v-model                        | no          | yes         | audio-only        |
| `update:playbackRate` emit                    | no          | yes         | audio-only        |
| Downloadable                                  | no          | yes         | audio-only        |
| Padding/margin/rounded/border transverse props | partial    | yes         | audio-wins        |
| ARIA `role="img"` + label on waveform canvas  | yes         | n/a yet     | port-to-audio     |

## Strategy decision : **A — Port + delete**

Justification: OrigamAudio is the strictly richer surface (MediaController,
cast, downloadable, captions, playbackRate, full DS transverse props).
OrigamSound's only unique features are the **waveform visualisation** (via
the `useWaveform` composable) and the **album** metadata field. Both
port cleanly into OrigamAudio without invasive surgery — `useWaveform` is
already a headless composable, and the album field is a trivial addition.

After the port, OrigamSound becomes redundant. We delete its namespace
(component, composables, interfaces, types, story, e2e spec, doc) and
remove all barrel cross-references. The single user-facing migration is
a story-level edit; nothing else in `src/` references OrigamSound.

## Execution plan

1. Audit doc (this file) — commit + push.
2. Move `useWaveform` composable + `IUseWaveformOptions` interface +
   spec from Sound/ to Audio/ namespace (`git mv` + path-only rename).
   Update barrel exports.
3. Extend `IAudioProps` with `waveform?: boolean | 'auto'`,
   `waveformColor?: string`, `album?: string`. Add `#waveform` slot and
   `waveform` emit. Render the `<canvas>` between metadata strip and
   controls. Wire `useWaveform(srcRef)`.
4. Update `<OrigamAudio>` story with a `Slot — #waveform` Variant and a
   `Prop — waveform / waveformColor` Variant. Update the doc with the
   waveform section + slot/emit tables.
5. Delete `<OrigamSound>` namespace entirely (component, story, doc, spec).
   Update barrel exports. Update locale if any Sound-specific keys.

Each step lands as one commit, pushed immediately so the watchdog can't
lose progress.

## Outstanding (post-merge)

- The `useWaveform` composable uses 200 bins by default and downsamples
  channel 0 only. If consumers complain about visual fidelity on stereo
  recordings, evaluate RMS-of-both-channels in a follow-up.
- The `<canvas>` rendering inside OrigamAudio uses 2D context — consider
  WebGL or `<svg path>` for extreme bin counts (>1000).
