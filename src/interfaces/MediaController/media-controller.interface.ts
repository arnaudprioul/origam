import type {
    ICommonsComponentProps,
    IMediaPlayerMethods,
    IMediaPlayerState
} from '../../interfaces'

import type { TQualityOption } from '../../types'

/**
 * Props for `<OrigamMediaController>` — the reusable shell that paints
 * the toolbar (scrubber row + buttons row + config menu) on top of a
 * headless media-player composable. Media-agnostic: the same shell
 * works for `<OrigamVideo>` and `<OrigamAudio>` (step 4).
 *
 * The Controller is a presentational shell — it does NOT mount the
 * underlying media element. The parent owns the `<video>` /
 * `<audio>` tag and feeds the Controller with the reactive
 * `state` / `methods` returned by `useVideoPlayer()` (and tomorrow
 * `useAudioPlayer()` / `useMediaPlayer()`).
 *
 * Defaults are inlined inside `withDefaults` (cf. CLAUDE.md
 * `withDefaults` rule) — this interface only types the public API.
 */
export interface IMediaControllerProps extends ICommonsComponentProps {
    /**
     * Reactive media state, exactly as returned by
     * `useMediaPlayer().state` (or any of its specialisations:
     * `useVideoPlayer`, `useAudioPlayer`). The Controller binds the
     * toolbar to every field via plain `state.X.value` accesses
     * inside the `<script setup>`. Required.
     *
     * Typed against the media-agnostic baseline so video and audio
     * consumers feed the same shell — `IVideoPlayerState` is a
     * structural superset (`fullscreen`, `pip` are read by the
     * parent, never by the Controller).
     */
    state: IMediaPlayerState
    /**
     * Imperative methods, exactly as returned by
     * `useMediaPlayer().methods` (or any specialisation). The
     * Controller calls `methods.toggle*` / `methods.set*` /
     * `methods.seek` directly from its event handlers — there are
     * no emits for these (the consumer doesn't need to know about
     * them). Required.
     */
    methods: IMediaPlayerMethods
    /**
     * YouTube-style overlay mode: when `true`, the shell sits on top
     * of the media surface with a dark gradient and auto-hides when
     * `visible` is `false`. When `false`, the shell renders as a
     * regular always-on toolbar.
     *
     * @default false
     */
    inset?: boolean
    /**
     * Visibility flag driven by the parent's autohide logic. When
     * `false`, the shell becomes `opacity: 0` + `pointer-events:
     * none`. The toolbar still mounts so internal state (config menu,
     * volume cluster) survives the autohide cycle.
     *
     * @default true
     */
    visible?: boolean
    /**
     * Available playback rates exposed via the config menu.
     *
     * @default [0.5, 0.75, 1, 1.25, 1.5, 2]
     */
    playbackRates?: ReadonlyArray<number>
    /**
     * Enable the cast / AirPlay button (Remote Playback API). The
     * button only renders when this flag is true AND
     * `state.remoteAvailable` is true AND the underlying browser
     * exposes the API.
     *
     * @default false
     */
    allowRemotePlayback?: boolean
    /**
     * Adds a "Download" row to the config menu. The Controller emits
     * `download` when clicked — the parent owns the actual file
     * fetch (typically a hidden `<a download>`).
     *
     * @default false
     */
    downloadable?: boolean
    /**
     * URL surfaced in the download row's `:download` attribute or
     * relied on by the parent when handling the `download` emit.
     * When `null`, the download row is hidden even if `downloadable`
     * is `true`.
     *
     * @default null
     */
    downloadUrl?: string | null
    /**
     * Suggested filename written to the `<a download="…">` attribute
     * of the download row. Browsers honour this attribute on
     * same-origin links; for cross-origin URLs the server's
     * `Content-Disposition` header wins. Falls back to the URL's
     * path basename when omitted.
     *
     * @default undefined
     */
    downloadFilename?: string
    /**
     * Optional list of quality variants. When the array exposes ≥ 2
     * entries, a "Quality" drill-down appears in the config menu.
     * The Controller emits `quality-change` with the picked
     * `quality` value; the parent owns the actual `<source>` swap.
     *
     * @default []
     */
    qualityOptions?: ReadonlyArray<TQualityOption>
    /**
     * Currently-active quality identifier. Used to paint the active
     * row in the quality submenu and to show the current value next
     * to the "Quality" row on the main level.
     *
     * @default null
     */
    currentQuality?: string | null
}

/**
 * Emits surfaced by `<OrigamMediaController>`. The shell calls
 * `methods.*` directly for the basic ops (toggle play, seek, set
 * volume, set rate, toggle mute, request cast) — those don't need
 * to bubble up. The emits below are the ones the PARENT must
 * handle because the Controller doesn't own enough context:
 *   - `quality-change` — parent owns the `<source>` swap logic.
 *   - `download`       — parent owns the URL fetch / anchor click.
 */
export interface IMediaControllerEmits {
    /** A different quality has been picked from the config menu.
     *  Payload is the new `quality` identifier (e.g. `"1080p"`). */
    (e: 'quality-change', quality: string): void
    /** The "Download" row has been clicked. Fires only when both
     *  `downloadable` is true AND `downloadUrl` is non-null. */
    (e: 'download'): void
}

/**
 * Scoped slots exposed by `<OrigamMediaController>` so consumers can
 * inject media-specific buttons (video → captions / PiP / fullscreen
 * via `extraControlsRight`) or additional rows in the config menu
 * (e.g. audio output device, subtitle track selector).
 */
export interface IMediaControllerSlots {
    /**
     * Additional buttons rendered on the left side of the toolbar,
     * AFTER the time display. Empty by default.
     */
    extraControlsLeft?: () => any
    /**
     * Additional buttons rendered on the right side of the toolbar,
     * BEFORE the config menu (cog). `<OrigamVideo>` injects its
     * captions / PiP / fullscreen buttons here.
     */
    extraControlsRight?: () => any
    /**
     * Extra rows in the config menu (e.g. audio output device,
     * subtitle track selector). Receives `{ closeMenu }` so the
     * consumer can close the menu after their custom action fires.
     */
    configExtra?: (bindings: { closeMenu: () => void }) => any
}
