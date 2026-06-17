import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const QR_CODE_OVERLAY_MAX_RATIO_CONST_DOC: IConstDoc = {
    slug: 'qr-code-overlay-max-ratio',
    name: 'QR_CODE_OVERLAY_MAX_RATIO',
    category: 'QR Code',
    descriptionKey: 'consts.catalog.qr_code_overlay_max_ratio.description',
    descriptionFallback: "Maximum safe overlay size as a ratio of the QR width — above 0.3 (30%) even error-correction level 'H' cannot reconstruct the obscured codewords and scans start to fail. The composable warns instead of clamping so the consumer keeps artistic control.",
    definition: `export const QR_CODE_OVERLAY_MAX_RATIO = 0.3`,
    value: '0.3',
    usedBy: [
        { name: 'useQrCode' },
        { name: 'OrigamQrCode', slug: 'qr-code' },
    ],
    sourceFile: 'packages/ds/src/consts/QrCode/qr-code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.qr_code_overlay_max_ratio.example',
            titleFallback: 'Validating overlay ratio before rendering',
            code: `import { QR_CODE_OVERLAY_MAX_RATIO } from 'origam'

if (logoRatio > QR_CODE_OVERLAY_MAX_RATIO) {
  console.warn('Logo may obscure too many codewords — scan reliability is at risk.')
}`,
            lang: 'typescript',
        },
    ],
}
