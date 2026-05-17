import type {
    IBgColorProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISizeProps,
    ISrcObject,
    ITagProps
} from '../../interfaces'

import type {
    TIcon,
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
 * - `color` (`IColorProps`) — dark module fill. Maps to the
 *   composable `foreground` channel. Defaults to `'currentColor'`.
 * - `bgColor` (`IBgColorProps`) — quiet-zone background. Maps to
 *   the composable `background` channel. Defaults to `'transparent'`.
 * - `size` (`ISizeProps`) — wrapper sizing. Accepts the canonical
 *   `TSize` rungs (`'x-small'` … `'x-large'`) or a raw number /
 *   pixel value. Drives both the CSS dimensions and the SVG
 *   `viewBox`-relative scaling.
 * - `rounded` (`IRoundedProps`) — per-module corner radius. Mapped
 *   internally to the SVG `rx` / `ry` attributes on each module
 *   rect. Accepts a named rung (default, small, large, …) or a raw
 *   number in module units (0 → square, 0.5 → circle).
 * - `border` / `margin` / `padding` (`IBorderProps` / `IMarginProps`
 *   / `IPaddingProps`) — standard spacing tokens on the wrapper.
 */
export interface IQrCodeProps
    extends ICommonsComponentProps,
        ITagProps,
        IColorProps,
        IBgColorProps,
        IRoundedProps,
        ISizeProps,
        IBorderProps,
        IMarginProps,
        IPaddingProps {
    /**
     * Text or URL encoded into the QR matrix. UTF-8 is supported via
     * the underlying `qrcode-generator` Byte mode.
     */
    value: string
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
     * @default 4
     */
    quietZone?: number
    /**
     * Optional centred icon overlay — rendered via `<OrigamIcon>` on
     * top of the matrix. Mutually exclusive with `image`; when both
     * are set, `image` wins (raster / vector asset is more specific).
     *
     * The overlay paints on top of the QR — pick a high
     * `errorCorrectionLevel` (`Q` or `H`) when the icon covers more
     * than ~10 % of the surface.
     */
    icon?: TIcon
    /**
     * Optional centred image overlay. Accepts a raw URL (string) or
     * the standard `ISrcObject` shape (src / srcset / lazySrc /
     * aspectRatio / alt).
     *
     * Rendered as an inline SVG `<image>` element so the asset stays
     * vector-friendly and SSR-safe. Same caveat as `icon` — high ECC
     * recommended when the overlay is large.
     */
    image?: string | ISrcObject
    /**
     * Accessible label used as `aria-label`. When omitted, the
     * component falls back to `"QR code for {value}"`.
     */
    ariaLabel?: string
}

/**
 * Options accepted by `useQrCode`. Lower-level than `IQrCodeProps`:
 * the composable does not speak the canonical DS contracts. It only
 * owns the raw SVG string — the wrapper component is responsible for
 * mapping `color` / `bgColor` / `size` / `rounded` down to the
 * primitive `foreground` / `background` / `cornerRadius` keys here.
 */
export interface IUseQrCodeOptions {
    /** Reed-Solomon level — same semantics as `IQrCodeProps`. */
    errorCorrectionLevel?: TQrCodeErrorCorrectionLevel
    /** Raw CSS colour painted on dark modules. */
    foreground?: string
    /** Raw CSS colour painted behind the matrix (quiet zone). */
    background?: string
    /** Quiet-zone padding in module units. */
    margin?: number
    /**
     * Per-module corner radius in module units (0 → square,
     * 0.5 → circle). The component layer derives this from the
     * public `rounded` prop.
     */
    cornerRadius?: number
    /**
     * Optional logo overlay rendered inside the SVG via `<image>`.
     * Public consumers should use the `image` prop on
     * `<OrigamQrCode>`; this lower-level shape stays here for direct
     * `useQrCode` consumers.
     */
    logo?: {
        src: string
        size?: number
        padding?: number
        background?: string
    }
}

/**
 * Slot signatures for `<OrigamQrCode>`.
 *
 * - `center` — replaces the default `icon` / `image` overlay.
 *   Receives the resolved size of the central reserved square (in
 *   matrix module units) so the consumer can paint a custom SVG /
 *   icon without re-deriving the geometry. When this slot is
 *   provided, both `icon` and `image` props are ignored.
 */
export interface IQrCodeSlots {
    center?: (bindings: { size: number }) => any
}
