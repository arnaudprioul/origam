import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const QR_CODE_DEFAULT_LOGO_PADDING_CONST_DOC: IConstDoc = {
    slug: 'qr-code-default-logo-padding',
    name: 'QR_CODE_DEFAULT_LOGO_PADDING',
    category: 'QR Code',
    descriptionKey: 'consts.catalog.qr_code_default_logo_padding.description',
    descriptionFallback: 'Default padding (in pixels) applied around the logo overlay inside a QR code — 6 px provides visual breathing room without obscuring too many codewords.',
    definition: `export const QR_CODE_DEFAULT_LOGO_PADDING = 6`,
    value: '6',
    usedBy: [
        { name: 'useQrCode' },
        { name: 'OrigamQrCode', slug: 'qr-code' },
    ],
    sourceFile: 'packages/ds/src/consts/QrCode/qr-code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.qr_code_default_logo_padding.example',
            titleFallback: 'Applying the default logo padding',
            code: `import { QR_CODE_DEFAULT_LOGO_PADDING } from 'origam'

// 6 px around the logo overlay
console.log(QR_CODE_DEFAULT_LOGO_PADDING) // 6`,
            lang: 'typescript',
        },
    ],
}
