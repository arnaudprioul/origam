import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const QR_CODE_DEFAULT_ECC_CONST_DOC: IConstDoc = {
    slug: 'qr-code-default-ecc',
    name: 'QR_CODE_DEFAULT_ECC',
    category: 'QR Code',
    descriptionKey: 'consts.catalog.qr_code_default_ecc.description',
    descriptionFallback: "Default error-correction level ('M') for QR codes — ~15% redundancy, balancing matrix density and damage tolerance for clean digital and print mediums without a logo overlay.",
    definition: `export const QR_CODE_DEFAULT_ECC: TQrCodeErrorCorrectionLevel = 'M'`,
    value: "'M'",
    usedBy: [
        { name: 'useQrCode' },
        { name: 'OrigamQrCode', slug: 'qr-code' },
    ],
    sourceFile: 'packages/ds/src/consts/QrCode/qr-code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.qr_code_default_ecc.example',
            titleFallback: 'Using the default ECC level',
            code: `import { QR_CODE_DEFAULT_ECC } from 'origam'

// 'M' — medium error correction (~15% redundancy)
console.log(QR_CODE_DEFAULT_ECC) // 'M'`,
            lang: 'typescript',
        },
    ],
}
