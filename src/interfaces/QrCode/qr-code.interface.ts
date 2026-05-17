import type {
    ICommonsComponentProps,
    IQRCodeLogo,
    ITagProps
} from '../../interfaces'

import type {
    TQRCodeErrorCorrectionLevel
} from '../../types'

/**
 * Props for `<OrigamQRCode>` — SVG QR code renderer.
 *
 * The component owns no state: every prop change rebuilds the
 * underlying matrix through `qrcode-generator` and re-emits the SVG.
 * The renderer is SSR-safe — no `window` / `document` / `canvas` API
 * is touched.
 */
export interface IQRCodeProps extends ICommonsComponentProps, ITagProps {
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
     * damage / overlay). See `TQRCodeErrorCorrectionLevel` for the
     * tradeoff matrix.
     *
     * @default 'M'
     */
    errorCorrectionLevel?: TQRCodeErrorCorrectionLevel
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
    logo?: IQRCodeLogo
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
 * Options accepted by `useQRCode`. Mirrors the public props of
 * `<OrigamQRCode>` minus the wiring concerns (`tag`, `class`, `style`,
 * `ariaLabel`).
 */
export interface IUseQRCodeOptions {
    /** Same semantics as `IQRCodeProps.errorCorrectionLevel`. */
    errorCorrectionLevel?: TQRCodeErrorCorrectionLevel
    /** Same semantics as `IQRCodeProps.foreground`. */
    foreground?: string
    /** Same semantics as `IQRCodeProps.background`. */
    background?: string
    /** Same semantics as `IQRCodeProps.margin`. */
    margin?: number
    /** Same semantics as `IQRCodeProps.cornerRadius`. */
    cornerRadius?: number
    /** Same semantics as `IQRCodeProps.logo`. */
    logo?: IQRCodeLogo
}

/**
 * Slot signatures for `<OrigamQRCode>`.
 *
 * - `center` — replaces the default logo overlay. Receives the
 *   resolved size of the central reserved square (in matrix module
 *   units) so the consumer can paint a custom SVG / icon without
 *   re-deriving the geometry.
 */
export interface IQRCodeSlots {
    center?: (bindings: { size: number }) => any
}
