import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const LO_CON_OFFSET_CONST_DOC: IConstDoc = {
    slug: 'lo-con-offset',
    name: 'LO_CON_OFFSET',
    category: 'Color & Contrast',
    descriptionKey: 'consts.catalog.lo_con_offset.description',
    descriptionFallback: 'Offset applied to low-contrast APCA calculations to prevent clamping near zero. Part of the SAPC/APCA perceptual contrast algorithm used by useContrast.',
    definition: `export const LO_CON_OFFSET = 0.06`,
    value: '0.06',
    usedBy: [
        { name: 'useContrast' },
        { name: 'useColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.lo_con_offset.example',
            titleFallback: 'APCA low-contrast offset in context',
            code: `import { LO_CON_THRESH, LO_CON_OFFSET } from 'origam'

// When the absolute APCA contrast is below LO_CON_THRESH,
// the result is adjusted by LO_CON_OFFSET to avoid clamping.
const adjustedContrast = Math.abs(apca) < LO_CON_THRESH
  ? 0
  : apca - Math.sign(apca) * LO_CON_OFFSET`,
            lang: 'typescript',
        },
    ],
}
