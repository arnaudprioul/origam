import type {
    IBgColorProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IMarginProps,
    IPaddingProps,
    IQrCodeLogo,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type {
    TQrCodeErrorCorrectionLevel
} from '../../types'

/**
 * Props for `<OrigamQrCode>` — SVG QR code renderer.
 *
 * The component owns no state: every prop change rebuilds the
 * underlying matrix through `qrcode-generator` and re-emits the SVG.
 * The renderer is SSR-safe — no `window` / `document` / `canvas` API
 * is touched.
 *
 * DS transverse props:
 * - `color` (from `IColorProps`) — dark module fill; maps to the
 *   composable `foreground` channel. Defaults to `'currentColor'`.
 * - `bgColor` (from `IBgColorProps`) — quiet-zone background; maps to
 *   the composable `background` channel. Defaults to `'transparent'`.
 * - `rounded` (from `IRoundedProps`) — CSS border-radius on the
 *   component wrapper (distinct from the per-module `cornerRadius`).
 * - `border` / `margin` / `padding` (from `IBorderProps` /
 *   `IMarginProps` / `IPaddingProps`) — standard spacing tokens on
 *   the wrapper element.
 */
export interface IQrCodeProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IRoundedProps, IBorderProps, IMarginProps, IPaddingProps {
    /**
     * Text or URL encoded into the QR matrix. UTF-8 is supported via
     * the underlying `qrcode-generator` Byte mode.
     */
    value: string
    /**
     * Rendered size — number (pixels) or any CSS dimension string
     * (`'240px'`, `'14rem'`, `'min(80vw, 320px)'`, …). The wrapper
     * applies `width: <size>; height: <size>` so the SVG scales via
     * `preserveAspectRatio="xMidYMid meet"`.
     *
     * @default 240
     */
    size?: number | string
    /**
     * Reed-Solomon redundancy level. Higher levels reserve more matrix
     * cells for correction codewords (and therefore tolerate more
     * damage / overlay). See `TQrCodeErrorCorrectionLevel` for the
     * tradeoff matrix.
     *
     * @default 'M'
     */
    errorCorrectionLevel?: TQrCodeErrorCorrectionLevel
    /**
     * Number of modules reserved as quiet-zone padding around the
     * matrix. The ISO spec mandates ≥4 — anything smaller risks
     * scanner failures, anything larger is purely aesthetic.
     *
     * Renamed from `margin` (which is now the DS `IMarginProps.margin`
     * wrapper-spacing prop) to avoid naming collision.
     *
     * @default 4
     */
    quietZone?: number
    /**
     * Optional centred logo overlay. The logo paints **on top** of the
     * matrix, so picking a high error-correction level (`Q` or `H`) is
     * mandatory if the overlay obscures more than ~10% of the surface.
     *
     * When the `#center` slot is provided, `logo` is ignored — the
     * slot takes precedence.
     */
    logo?: IQrCodeLogo
    /**
     * Per-module corner radius (in module units — `0` keeps strict
     * squares, `0.5` paints circles). Useful for soft / branded
     * variants; some scanners are less tolerant of rounded finder
     * patterns, so test before shipping.
     *
     * Distinct from the wrapper `rounded` prop (which applies
     * `border-radius` to the host element via `IRoundedProps`).
     *
     * @default 0
     */
    cornerRadius?: number
    /**
     * Accessible label used as `aria-label`. When omitted, the
     * component falls back to `"QR code for {value}"`.
     */
    ariaLabel?: string
}

/**
 * Options accepted by `useQrCode`. Mirrors the public props of
 * `<OrigamQrCode>` minus the wiring concerns (`tag`, `class`, `style`,
 * `ariaLabel`) and the DS transverse spacing/color interfaces.
 *
 * The composable still speaks `foreground` / `background` / `margin`
 * internally — `<OrigamQrCode>` is responsible for mapping the public
 * `color` / `bgColor` / `quietZone` props down to these keys.
 */
export interface IUseQrCodeOptions {
    /** Same semantics as the internal SVG foreground fill. */
    foreground?: string
    /** Same semantics as the internal SVG background fill. */
    background?: string
    /** Same semantics as `IQrCodeProps.quietZone`. */
    margin?: number
    /** Same semantics as `IQrCodeProps.errorCorrectionLevel`. */
    errorCorrectionLevel?: TQrCodeErrorCorrectionLevel
    /** Same semantics as `IQrCodeProps.cornerRadius`. */
    cornerRadius?: number
    /** Same semantics as `IQrCodeProps.logo`. */
    logo?: IQrCodeLogo
}

/**
 * Slot signatures for `<OrigamQrCode>`.
 *
 * - `center` — replaces the default logo overlay. Receives the
 *   resolved size of the central reserved square (in matrix module
 *   units) so the consumer can paint a custom SVG / icon without
 *   re-deriving the geometry. When this slot is provided the `logo`
 *   prop is ignored.
 */
export interface IQrCodeSlots {
    center?: (bindings: { size: number }) => any
}
