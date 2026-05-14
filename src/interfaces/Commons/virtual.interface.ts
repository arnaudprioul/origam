export interface IVirtualProps {
    itemHeight?: number | string
    height?: number | string
    /**
     * Animation duration (ms) applied to imperative scroll calls
     * (e.g. `scrollToIndex`). Set to `0` to jump instantly.
     * Default: 300.
     */
    scrollDuration?: number
    /**
     * Easing function name forwarded to `useGoTo` (`easeInOutCubic`,
     * `easeOutQuart`, …). Default: 'easeInOutCubic'.
     */
    scrollEasing?: string
}
