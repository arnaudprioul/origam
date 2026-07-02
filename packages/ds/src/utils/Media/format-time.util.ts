/**
 * Format a duration (seconds) into a media-toolbar-friendly string.
 *
 *   • short medias        → `mm:ss`     (e.g. `01:05`)
 *   • medias  ≥ 1 hour    → `h:mm:ss`   (e.g. `1:02:05`)
 *   • unknown / negative  → `--:--`     (em-dash placeholder while
 *                                       metadata is still loading,
 *                                       so the toolbar doesn't flash
 *                                       `NaN:NaN`)
 *
 * Extracted from `<OrigamMediaController>` so both the time label
 * sub-component AND the scrubber's `format-hover-tooltip` callback
 * share a single source of truth — keeping `OrigamAudio` consistent
 * with `OrigamVideo` byte-for-byte.
 */
export function formatMediaTime (seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) return '--:--'
    const total = Math.floor(seconds)
    const h = Math.floor(total / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = total % 60
    const pad = (value: number) => value.toString().padStart(2, '0')
    if (h > 0) return `${h}:${pad(m)}:${pad(s)}`
    return `${pad(m)}:${pad(s)}`
}
