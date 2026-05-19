import type { ICommonsComponentProps } from '../../interfaces'

/**
 * Props for `<OrigamMediaPlayBtn>` — the 36px circular play / pause
 * button atomic sub-component. Owns no media state; the parent passes
 * the boolean `playing` flag (typically `state.playing.value` from
 * `useMediaPlayer()`) and listens to the single `click` emit to call
 * `methods.play()` / `methods.pause()`.
 *
 * i18n labels are passed in by the consumer so the atom stays decoupled
 * from `useLocale()` — the parent owns the translation context, the
 * atom owns the markup.
 */
export interface IMediaPlayBtnProps extends ICommonsComponentProps {
    /**
     * Whether the underlying media is currently playing. Drives the
     * `aria-label` and the rendered icon (PLAY when paused, PAUSE
     * when playing). Required.
     */
    playing: boolean
    /**
     * `aria-label` rendered when the button currently shows the
     * PLAY icon (i.e. media is paused). Already-translated string.
     * Required.
     */
    playLabel: string
    /**
     * `aria-label` rendered when the button currently shows the
     * PAUSE icon (i.e. media is playing). Already-translated string.
     * Required.
     */
    pauseLabel: string
    /**
     * Optional `data-cy` selector exposed for parent-level QA scripts.
     *
     * @default 'origam-media-play-btn'
     */
    dataCy?: string
}

/**
 * Emits surfaced by `<OrigamMediaPlayBtn>`. A single `click` so the
 * parent decides whether to call `play()` or `pause()` — the atom
 * doesn't own the methods bag.
 */
export interface IMediaPlayBtnEmits {
    (e: 'click', event: MouseEvent): void
}
