import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const LO_CON_THRESH_CONST_DOC: IConstDoc = {
    slug: 'lo-con-thresh',
    name: 'LO_CON_THRESH',
    category: 'Color & Contrast',
    descriptionKey: 'consts.catalog.lo_con_thresh.description',
    descriptionFallback: 'Threshold below which an APCA contrast value is considered too low to be meaningful and is clamped to zero. Part of the SAPC/APCA perceptual contrast algorithm used by useContrast.',
    definition: `export const LO_CON_THRESH = 0.078`,
    value: '0.078',
    usedBy: [
        { name: 'useContrast' },
        { name: 'useColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.lo_con_thresh.example',
            titleFallback: 'APCA low-contrast threshold in context',
            code: `import { LO_CON_THRESH, LO_CON_OFFSET } from 'origam'

// Absolute APCA contrast below LO_CON_THRESH is clamped to 0.
const clamp = (apca: number) =>
  Math.abs(apca) < LO_CON_THRESH ? 0 : apca - Math.sign(apca) * LO_CON_OFFSET`,
            lang: 'typescript',
        },
    ],
}
