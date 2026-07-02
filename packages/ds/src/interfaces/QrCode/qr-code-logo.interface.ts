/**
 * Optional logo overlay rendered at the centre of an OrigamQrCode.
 *
 * The overlay is painted **on top** of the QR matrix — any module
 * underneath becomes unreadable. Error-correction takes care of the
 * loss as long as the overlay stays small enough:
 *
 *   - L  →  do not use a logo (≤7% redundancy budget).
 *   - M  →  ≤10% of QR width.
 *   - Q  →  ≤20% of QR width.
 *   - H  →  ≤25–30% of QR width.
 *
 * `<OrigamQrCode>` does **not** enforce these caps — the consumer
 * decides what's acceptable. We warn (`console.warn`) when `size` is
 * configured above 0.3 because no error-correction level survives that.
 */
export interface IQrCodeLogo {
    /**
     * Logo source. Any URL accepted by `<image href>` works — SVG, PNG,
     * data-URI, …. The SVG fragment loads the asset asynchronously; if
     * it fails the QR remains valid (only the overlay disappears).
     */
    src: string
    /**
     * Logo width as a proportion of the QR width (0..1).
     *
     * @default 0.2
     */
    size?: number
    /**
     * Pixel padding of the (opaque) backdrop drawn around the logo.
     * Keeps the modules immediately adjacent to the logo readable —
     * without padding, the scanner sees a soft-edged blob and fails.
     *
     * @default 6
     */
    padding?: number
    /**
     * Backdrop colour painted under the logo (and within the padding
     * box). Defaults to the QR background; pass a different value to
     * paint a coloured halo (e.g. brand colour for a logotype that
     * already includes its own white box).
     *
     * @default — falls back to the QR `background` prop.
     */
    background?: string
}
