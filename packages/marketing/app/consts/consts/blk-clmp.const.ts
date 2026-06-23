import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLK_CLMP_CONST_DOC: IConstDoc = {
    slug: 'blk-clmp',
    name: 'BLK_CLMP',
    category: 'Color & Contrast',
    descriptionKey: 'consts.catalog.blk_clmp.description',
    descriptionFallback: 'Soft-clamp factor applied to near-black values in the APCA contrast algorithm. Prevents the luminance of very dark colours from reaching absolute zero, which would produce infinite contrast ratios.',
    definition: `export const BLK_CLMP = 1.45`,
    value: '1.45',
    usedBy: [
        { name: 'useColor' },
        { name: 'useContrastRatio' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.blk_clmp.example',
            titleFallback: 'Applying the black clamp in APCA luminance',
            code: `import { BLK_THRS, BLK_CLMP } from 'origam'

// APCA black-clamp: if Y < BLK_THRS → Y = Y + (BLK_THRS - Y) ** BLK_CLMP
const clamp = (Y: number) =>
  Y < BLK_THRS ? Y + (BLK_THRS - Y) ** BLK_CLMP : Y`,
            lang: 'typescript',
        },
    ],
}
