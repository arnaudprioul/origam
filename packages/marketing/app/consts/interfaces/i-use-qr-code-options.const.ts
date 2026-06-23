import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_QR_CODE_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-qr-code-options',
    name: 'IUseQrCodeOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_qr_code_options.description',
    descriptionFallback: 'Lower-level options accepted by useQrCode. Unlike IQrCodeProps, the composable does not speak the canonical DS contracts — it only owns the raw SVG string. The wrapper component is responsible for mapping color/bgColor/rounded down to the primitive foreground/background/cornerRadius keys here.',
    definition: `export interface IUseQrCodeOptions {
    errorCorrectionLevel?: TQrCodeErrorCorrectionLevel
    foreground?: string
    background?: string
    margin?: number
    cornerRadius?: number
    logo?: {
        src: string
        size?: number
        padding?: number
        background?: string
    }
}`,
    extends: [],
    props: [
        { name: 'errorCorrectionLevel', type: 'TQrCodeErrorCorrectionLevel', optional: true, descriptionFallback: 'Reed-Solomon redundancy level — same semantics as IQrCodeProps.' },
        { name: 'foreground', type: 'string', optional: true, descriptionFallback: 'Raw CSS colour painted on dark modules.' },
        { name: 'background', type: 'string', optional: true, descriptionFallback: 'Raw CSS colour painted behind the matrix (quiet zone).' },
        { name: 'margin', type: 'number', optional: true, descriptionFallback: 'Quiet-zone padding in module units.' },
        { name: 'cornerRadius', type: 'number', optional: true, descriptionFallback: 'Per-module corner radius in module units (0 = square, 0.5 = circle). The component layer derives this from the public qrCodeProps.rounded prop.' },
        { name: 'logo', type: '{ src: string; size?: number; padding?: number; background?: string }', optional: true, descriptionFallback: 'Optional logo overlay rendered inside the SVG via <image>. Public consumers should use the image prop on OrigamQrCode.' },
    ],
    usedBy: [
        { slug: 'use-qr-code', name: 'useQrCode', kind: 'composable' },
        { slug: 'qr-code', name: 'QrCode', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/QrCode/qr-code.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_qr_code_options.example',
            titleFallback: 'Generating a QR code SVG directly with useQrCode',
            code: `const { svg } = useQrCode('https://origam.dev', {
    foreground: '#1a1a2e',
    background: '#ffffff',
    cornerRadius: 0.3,
    errorCorrectionLevel: 'M',
})`,
            lang: 'typescript',
        },
    ],
}
