/**
 * Human-readable byte formatter — used by the FileField "showSize" mode and
 * any consumer that needs to display a file size next to a file name.
 *
 * Pure function, no side-effects, no locale-aware formatting (the consumer
 * is expected to wrap the output in `t(...)` if a translation is needed).
 *
 * Convention:
 *   - Base 1024 (binary), but we still emit the SI suffixes (KB / MB / GB)
 *     for legibility — this matches the design system's reference deck and
 *     the existing `humanReadableFileSize(_, 1000 | 1024)` helper.
 *   - Negative values are clamped to 0 and the sign is dropped (file sizes
 *     are non-negative by definition).
 *   - 0 returns the literal `"0 B"` (not `"0 KB"`).
 *   - Anything below 1024 returns the raw byte count with the `B` unit and
 *     no decimals (e.g. `1023` → `"1023 B"`).
 */
export function formatBytes (bytes: number, decimals = 1): string {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'

    const base = 1024
    if (bytes < base) return `${Math.round(bytes)} B`

    const units = ['KB', 'MB', 'GB', 'TB', 'PB']
    let unit = -1
    let value = bytes

    while (value >= base && unit < units.length - 1) {
        value /= base
        unit++
    }

    const safeDecimals = Math.max(0, Math.floor(decimals))
    return `${value.toFixed(safeDecimals)} ${units[unit]}`
}
