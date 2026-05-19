import type { ICommonsComponentProps } from '../../interfaces'

/**
 * Props for `<OrigamMediaCastBtn>` — the Remote Playback API
 * (Chromecast / AirPlay) toggle button. Atomic sub-component;
 * parent owns the API call (`methods.requestRemotePlayback()`)
 * and feeds availability + state in.
 *
 * The button renders nothing when `available` is `false` — keeps
 * the toolbar layout clean on browsers that don't expose Remote
 * Playback (Firefox, most desktop Safari versions).
 */
export interface IMediaCastBtnProps extends ICommonsComponentProps {
    /**
     * Whether the Remote Playback API is exposed by the browser AND
     * the consumer enabled the feature (`allowRemotePlayback` on the
     * parent Controller). Required.
     */
    available: boolean
    /**
     * Whether a remote-playback session is currently active. Drives
     * the `--active` modifier (red-dot indicator) and the
     * `aria-label` swap. Required.
     */
    casting: boolean
    /**
     * `aria-label` rendered when no remote session is active
     * (`casting === false`). Already-translated string. Required.
     */
    castLabel: string
    /**
     * `aria-label` rendered when a remote session IS active
     * (`casting === true`). Already-translated string. Required.
     */
    stopCastLabel: string
    /**
     * Optional `data-cy` selector exposed for parent-level QA scripts.
     *
     * @default 'origam-media-cast-btn'
     */
    dataCy?: string
}

/**
 * Emits surfaced by `<OrigamMediaCastBtn>`. Single `click`; the
 * parent decides whether to start or stop the remote session via
 * `methods.requestRemotePlayback()`.
 */
export interface IMediaCastBtnEmits {
    (e: 'click', event: MouseEvent): void
}
