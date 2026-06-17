import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const QR_CODE_DEFAULT_LOGO_SIZE_CONST_DOC: IConstDoc = {
    slug: 'qr-code-default-logo-size',
    name: 'QR_CODE_DEFAULT_LOGO_SIZE',
    category: 'QR Code',
    descriptionKey: 'consts.catalog.qr_code_default_logo_size.description',
    descriptionFallback: 'Default logo overlay size as a ratio of the QR code width — 0.2 (20%) is the recommended ceiling before error correction starts failing.',
    definition: `export const QR_CODE_DEFAULT_LOGO_SIZE = 0.2`,
    value: '0.2',
    usedBy: [
        { name: 'useQrCode' },
        { name: 'OrigamQrCode', slug: 'qr-code' },
    ],
    sourceFile: 'packages/ds/src/consts/QrCode/qr-code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.qr_code_default_logo_size.example',
            titleFallback: 'Sizing a logo overlay relative to the QR width',
            code: `import { QR_CODE_DEFAULT_LOGO_SIZE } from 'origam'

// 20 % of the QR code width
const logoWidth = qrWidth * QR_CODE_DEFAULT_LOGO_SIZE`,
            lang: 'typescript',
        },
    ],
}
