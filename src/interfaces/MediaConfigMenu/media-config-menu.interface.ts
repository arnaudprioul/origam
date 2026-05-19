import type { ICommonsComponentProps } from '../../interfaces'

import type { TMediaConfigSection, TQualityOption } from '../../types'

/**
 * Props for `<OrigamMediaConfigMenu>` — the cog button + tooltip with
 * drill-down to playback-speed / quality, plus the download row.
 *
 * Owns the drill-down state (`main` / `speed` / `quality`) AND the
 * tooltip open/close state internally. Calls to `methods.*` are
 * replaced by emits (`update:playbackRate`, `quality-change`,
 * `download`) so the parent stays the source of truth for media
 * mutations.
 *
 * The menu only renders if at least one of these is true:
 *   - `playbackRates.length > 1`
 *   - `qualityOptions.length >= 2`
 *   - `downloadable && downloadUrl`
 *   - the `configExtra` slot has content
 */
export interface IMediaConfigMenuProps extends ICommonsComponentProps {
    /**
     * Optional controlled "open" state. When omitted, the menu manages
     * its own open / close state internally. When supplied, the parent
     * is the source of truth (v-model on `open`) — useful for tests
     * and for surfaces that need to drive the drill-down from outside.
     *
     * @default undefined
     */
    open?: boolean
    /**
     * Optional controlled drill-down section. When omitted, the menu
     * resets to `'main'` on every close cycle internally. When
     * supplied, the parent owns the section (v-model on `section`).
     *
     * @default undefined
     */
    section?: TMediaConfigSection
    /**
     * Available playback rates exposed in the Speed drill-down.
     * When the array has ≤ 1 entry, the Speed row is hidden.
     * Required.
     */
    playbackRates: ReadonlyArray<number>
    /**
     * Currently-active playback rate. Drives the "Normal" / `1.5×`
     * label on the main row AND the active-state highlight in the
     * Speed drill-down. Required.
     */
    playbackRate: number
    /**
     * Optional quality variants. When the array has ≥ 2 entries, a
     * Quality drill-down appears in the menu.
     *
     * @default []
     */
    qualityOptions?: ReadonlyArray<TQualityOption>
    /**
     * Currently-active quality identifier (matches a
     * `qualityOptions[].quality`). Used to paint the active row and
     * surface the current label on the main row.
     *
     * @default null
     */
    currentQuality?: string | null
    /**
     * Whether the Download row should be rendered (still requires
     * `downloadUrl` to be non-null).
     *
     * @default false
     */
    downloadable?: boolean
    /**
     * URL written to the Download row's `:href` and `:download`
     * attributes. When `null`, the Download row is hidden even if
     * `downloadable` is `true`.
     *
     * @default null
     */
    downloadUrl?: string | null
    /**
     * Suggested filename written to the Download row's
     * `<a download="…">` attribute. Falls back to the URL basename.
     *
     * @default undefined
     */
    downloadFilename?: string
    /**
     * `aria-label` rendered on the cog button. Already-translated.
     * Required.
     */
    settingsLabel: string
    /**
     * Already-translated label for the Quality row + drill-down.
     * Required.
     */
    qualityLabel: string
    /**
     * Already-translated label for the Speed row + drill-down.
     * Required.
     */
    speedLabel: string
    /**
     * Already-translated label for the Download row.
     * Required.
     */
    downloadLabel: string
    /**
     * Already-translated label for the "Normal" playback speed
     * (rate ≈ 1.0). Required.
     */
    normalSpeedLabel: string
    /**
     * Optional `data-cy` prefix used on the cog button + tooltip
     * surface + drill-down rows. Children get
     * `${dataCy}-open-speed`, `${dataCy}-open-quality`,
     * `${dataCy}-download`, `${dataCy}-rate-{rate}`,
     * `${dataCy}-quality-{id}` so the existing E2E selectors keep
     * working when the parent feeds the legacy prefix.
     *
     * @default 'origam-media-config-menu'
     */
    dataCy?: string
}

/**
 * Emits surfaced by `<OrigamMediaConfigMenu>`. The atom does NOT
 * call `methods.*` directly — the parent owns the media-side
 * mutations.
 */
export interface IMediaConfigMenuEmits {
    /** Picked from the Speed drill-down. */
    (e: 'update:playbackRate', rate: number): void
    /** Picked from the Quality drill-down. */
    (e: 'quality-change', quality: string): void
    /** Download row was clicked. */
    (e: 'download', event: MouseEvent): void
    /** Open / close cycle — emitted alongside the internal state
     *  change so a parent can `v-model:open` the menu. */
    (e: 'update:open', open: boolean): void
    /** Drill-down section change — emitted alongside the internal
     *  state change so a parent can `v-model:section` the menu. */
    (e: 'update:section', section: TMediaConfigSection): void
}

/**
 * Scoped slots exposed by `<OrigamMediaConfigMenu>`. Mirrors the
 * `configExtra` contract of `<OrigamMediaController>` so the
 * forwarding wrapper can pass it through verbatim.
 */
export interface IMediaConfigMenuSlots {
    /**
     * Extra rows on the main drill-down level (e.g. audio output
     * device, subtitle track selector). Receives `{ closeMenu }`
     * so the consumer can dismiss the popover after their action.
     */
    configExtra?: (bindings: { closeMenu: () => void }) => any
}
