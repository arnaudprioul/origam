import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const NORM_TXT_CONST_DOC: IConstDoc = {
    slug: 'norm-txt',
    name: 'NORM_TXT',
    category: 'Color & Contrast',
    descriptionKey: 'consts.catalog.norm_txt.description',
    descriptionFallback: 'APCA normalisation exponent for text luminance. Used in the SAPC/APCA perceptual contrast algorithm to scale the text-colour term before computing the signed contrast difference.',
    definition: `export const NORM_TXT = 0.58`,
    value: '0.58',
    usedBy: [
        { name: 'useContrast' },
        { name: 'useColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.norm_txt.example',
            titleFallback: 'APCA text normalisation alongside NORM_BG',
            code: `import { NORM_BG, NORM_TXT } from 'origam'

const scaledBg  = linearBg  ** NORM_BG   // 0.55
const scaledTxt = linearTxt ** NORM_TXT  // 0.58
const contrast  = scaledBg - scaledTxt`,
            lang: 'typescript',
        },
    ],
}
