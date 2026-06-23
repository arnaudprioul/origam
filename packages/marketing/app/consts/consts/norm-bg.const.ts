import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const NORM_BG_CONST_DOC: IConstDoc = {
    slug: 'norm-bg',
    name: 'NORM_BG',
    category: 'Color & Contrast',
    descriptionKey: 'consts.catalog.norm_bg.description',
    descriptionFallback: 'APCA normalisation exponent for background luminance. Used in the SAPC/APCA perceptual contrast algorithm to scale the background term before computing the signed contrast difference.',
    definition: `export const NORM_BG = 0.55`,
    value: '0.55',
    usedBy: [
        { name: 'useContrast' },
        { name: 'useColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.norm_bg.example',
            titleFallback: 'APCA background normalisation',
            code: `import { NORM_BG, NORM_TXT } from 'origam'

// Sapc/Apca signed contrast (simplified)
const scaledBg  = linearBg  ** NORM_BG
const scaledTxt = linearTxt ** NORM_TXT
const contrast  = scaledBg - scaledTxt`,
            lang: 'typescript',
        },
    ],
}
