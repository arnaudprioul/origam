import type { ICommonsComponentProps } from '../../interfaces'

/**
 * Props for `<OrigamMediaTimeLabel>` — the `currentTime / duration`
 * monospace display rendered between the volume cluster and the
 * `extraControlsLeft` slot in the controller toolbar.
 *
 * Pure presentation: no emits, no internal state. Accepts seconds
 * as plain numbers and runs them through `formatMediaTime()` (or the
 * caller-supplied formatter) — keeping the atom decoupled from the
 * media composable.
 */
export interface IMediaTimeLabelProps extends ICommonsComponentProps {
    /**
     * Current playback position, in seconds. Typically
     * `state.currentTime.value`. Required.
     */
    currentTime: number
    /**
     * Total media duration, in seconds. May be `NaN` while metadata
     * is still loading — the formatter falls back to the `--:--`
     * em-dash placeholder in that case. Required.
     */
    duration: number
    /**
     * Optional custom formatter. Defaults to `formatMediaTime()`:
     * `mm:ss` for short medias, `h:mm:ss` past an hour, `--:--`
     * for unknown values.
     *
     * @default formatMediaTime
     */
    format?: (seconds: number) => string
    /**
     * Optional `data-cy` selector exposed for parent-level QA scripts.
     *
     * @default 'origam-media-time-label'
     */
    dataCy?: string
}
