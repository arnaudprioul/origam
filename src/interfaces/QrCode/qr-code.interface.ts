import type {
    ICommonsComponentProps,
    IQrCodeLogo,
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
 */
export interface IQrCodeProps extends ICommonsComponentProps, ITagProps {
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
     * Colour painted on dark modules. Any CSS colour value — including
     * `'currentColor'` to inherit from the parent text colour, which
     * is the default and the most theme-friendly choice.
     *
     * @default 'currentColor'
     */
    foreground?: string
    /**
     * Background colour of the QR (modules + quiet zone). `'transparent'`
     * keeps the parent surface visible.
     *
     * @default 'transparent'
     */
    background?: string
    /**
     * Number of modules reserved as quiet-zone padding around the
     * matrix. The ISO spec mandates ≥4 — anything smaller risks
     * scanner failures, anything larger is purely aesthetic.
     *
     * @default 4
     */
    margin?: number
    /**
     * Optional centred logo overlay. The logo paints **on top** of the
     * matrix, so picking a high error-correction level (`Q` or `H`) is
     * mandatory if the overlay obscures more than ~10% of the surface.
     */
    logo?: IQrCodeLogo
    /**
     * Per-module corner radius (in module units — `0` keeps strict
     * squares, `0.5` paints circles). Useful for soft / branded
     * variants; some scanners are less tolerant of rounded finder
     * patterns, so test before shipping.
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
 * `ariaLabel`).
 */
export interface IUseQrCodeOptions {
    /** Same semantics as `IQrCodeProps.errorCorrectionLevel`. */
    errorCorrectionLevel?: TQrCodeErrorCorrectionLevel
    /** Same semantics as `IQrCodeProps.foreground`. */
    foreground?: string
    /** Same semantics as `IQrCodeProps.background`. */
    background?: string
    /** Same semantics as `IQrCodeProps.margin`. */
    margin?: number
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
 *   re-deriving the geometry.
 */
export interface IQrCodeSlots {
    center?: (bindings: { size: number }) => any
}
