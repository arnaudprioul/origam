import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_QR_CODE_LOGO_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-qr-code-logo',
    name: 'IQrCodeLogo',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_qr_code_logo.description',
    descriptionFallback: 'Optional logo overlay rendered at the centre of an OrigamQrCode. The overlay is painted on top of the matrix — error-correction compensates for covered modules up to the configured level.',
    definition: `export interface IQrCodeLogo {
    src: string
    size?: number
    padding?: number
    background?: string
}`,
    extends: [],
    props: [
        { name: 'src', type: 'string', optional: false, descriptionFallback: 'Logo source URL. Any URL accepted by <image href> — SVG, PNG, data-URI. If the asset fails to load the QR matrix remains valid.' },
        { name: 'size', type: 'number', optional: true, descriptionFallback: 'Logo width as a proportion of the QR width (0..1). Default 0.2. Values above 0.3 trigger a console.warn as no error-correction level survives that.' },
        { name: 'padding', type: 'number', optional: true, descriptionFallback: 'Pixel padding of the opaque backdrop drawn around the logo. Default 6. Keeps adjacent modules readable.' },
        { name: 'background', type: 'string', optional: true, descriptionFallback: 'Backdrop colour under the logo and within the padding box. Defaults to the QR background. Pass a brand colour to create a coloured halo.' },
    ],
    usedBy: [
        { slug: 'qr-code', name: 'QrCode', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/QrCode/qr-code-logo.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_qr_code_logo.example',
            titleFallback: 'QR code with a centred logo overlay',
            code: `import type { IQrCodeLogo } from 'origam'

const logo: IQrCodeLogo = {
    src: '/logo.svg',
    size: 0.2,
    padding: 8,
    background: '#ffffff',
}`,
            lang: 'typescript',
        },
    ],
}
