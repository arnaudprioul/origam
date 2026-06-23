import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_QR_CODE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-qr-code-props',
    name: 'IQrCodeProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_qr_code_props.description',
    descriptionFallback: 'Full props contract for <OrigamQrCode> — SSR-safe SVG QR code renderer. Extends all common DS surface contracts plus QR-specific controls for value, error correction level, quiet zone, overlays and accessibility.',
    definition: `export interface IQrCodeProps
    extends ICommonsComponentProps,
        ITagProps,
        IColorProps,
        IBgColorProps,
        IRoundedProps,
        IBorderProps,
        IElevationProps,
        ISizeProps,
        IPaddingProps,
        IMarginProps {
    value: string
    title?: string
    qrCodeProps?: IQrCodeOptions
    errorCorrectionLevel?: TQrCodeErrorCorrectionLevel
    quietZone?: number
    icon?: TIcon
    image?: string | ISrcObject
    ariaLabel?: string
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IColorProps',
        'IBgColorProps',
        'IRoundedProps',
        'IBorderProps',
        'IElevationProps',
        'ISizeProps',
        'IPaddingProps',
        'IMarginProps',
    ],
    props: [
        { name: 'value', type: 'string', optional: false, descriptionFallback: 'Text or URL encoded into the QR matrix. UTF-8 is supported via the underlying qrcode-generator Byte mode.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Optional heading rendered above the QR matrix inside the wrapper.' },
        { name: 'qrCodeProps', type: 'IQrCodeOptions', optional: true, descriptionFallback: 'Per-matrix overrides (color, bgColor, rounded) applied to the SVG internals, not the wrapper.' },
        { name: 'errorCorrectionLevel', type: 'TQrCodeErrorCorrectionLevel', optional: true, descriptionFallback: 'Reed-Solomon redundancy level (L | M | Q | H). Higher levels tolerate more damage at the cost of density. Default "M".' },
        { name: 'quietZone', type: 'number', optional: true, descriptionFallback: 'Number of modules reserved as quiet-zone padding. ISO spec mandates >=4. Default 4.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Optional centred MDI icon overlay rendered on top of the matrix via <OrigamIcon>.' },
        { name: 'image', type: 'string | ISrcObject', optional: true, descriptionFallback: 'Optional centred image overlay. Accepts a raw URL or an ISrcObject shape. Rendered as an <OrigamAvatar> overlay.' },
        { name: 'ariaLabel', type: 'string', optional: true, descriptionFallback: 'Accessible aria-label. Falls back to "QR code for {value}" when omitted.' },
    ],
    usedBy: [
        { slug: 'qr-code', name: 'QrCode', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/QrCode/qr-code.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_qr_code_props.example',
            titleFallback: 'QR code with high error correction and icon overlay',
            code: `<origam-qr-code
    value="https://origam.dev"
    title="Scan to visit"
    error-correction-level="H"
    :quiet-zone="6"
    icon="mdi-origam"
    size="200"
    rounded="md"
/>`,
            lang: 'html',
        },
    ],
}
