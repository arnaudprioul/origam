import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    ITagProps
} from "../../interfaces"

import type { TIcon } from "../../types"

export interface IPaginationProps extends ICommonsComponentProps, ITagProps, IColorProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps {
    start?: number
    modelValue?: number
    disabled?: boolean
    length?: number | string
    totalVisible?: number | string
    firstIcon?: TIcon
    prevIcon?: TIcon
    nextIcon?: TIcon
    lastIcon?: TIcon
    ariaLabel?: string
    pageAriaLabel?: string
    currentPageAriaLabel?: string
    firstAriaLabel?: string
    previousAriaLabel?: string
    nextAriaLabel?: string
    lastAriaLabel?: string
    ellipsis?: string
    showFirstLastPage?: boolean
    compact?: boolean
    pageText?: string
    ofText?: string
    /**
     * Toggle the "with info" mode — pagination then renders a left-side
     * range label `Showing {start}-{end} of {total}` next to the standard
     * list of page buttons. Requires `total` (and optionally `perPage`)
     * to compute meaningful start/end indices.
     */
    withInfo?: boolean
    /**
     * Total number of *items* (NOT pages). Drives the `withInfo` label —
     * "Showing 21-40 of {total}". When omitted while `withInfo` is true,
     * falls back to `length * perPage`.
     */
    total?: number | string
    /**
     * Number of items rendered on a single page. Used together with
     * `total` to compute the Showing N-M range. Defaults to 10 when
     * `withInfo` is enabled.
     */
    perPage?: number | string
    /** i18n key for the `withInfo` label. Receives `{0}=start`, `{1}=end`, `{2}=total`. */
    infoText?: string
}
