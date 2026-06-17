import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const QR_CODE_DEFAULT_MARGIN_CONST_DOC: IConstDoc = {
    slug: 'qr-code-default-margin',
    name: 'QR_CODE_DEFAULT_MARGIN',
    category: 'QR Code',
    descriptionKey: 'consts.catalog.qr_code_default_margin.description',
    descriptionFallback: 'Default quiet-zone width in modules surrounding the QR matrix — ISO/IEC 18004 recommends 4 modules; smaller values significantly hurt scanner reliability.',
    definition: `export const QR_CODE_DEFAULT_MARGIN = 4`,
    value: '4',
    usedBy: [
        { name: 'useQrCode' },
        { name: 'OrigamQrCode', slug: 'qr-code' },
    ],
    sourceFile: 'packages/ds/src/consts/QrCode/qr-code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.qr_code_default_margin.example',
            titleFallback: 'Referencing the default quiet-zone width',
            code: `import { QR_CODE_DEFAULT_MARGIN } from 'origam'

// 4 modules of quiet zone (ISO/IEC 18004)
console.log(QR_CODE_DEFAULT_MARGIN) // 4`,
            lang: 'typescript',
        },
    ],
}
