import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLK_THRS_CONST_DOC: IConstDoc = {
    slug: 'blk-thrs',
    name: 'BLK_THRS',
    category: 'Color & Contrast',
    descriptionKey: 'consts.catalog.blk_thrs.description',
    descriptionFallback: 'Black-clamp threshold used in the APCA contrast algorithm. Luminance values below this threshold are soft-clamped with BLK_CLMP to avoid division-by-zero and infinite-contrast artefacts.',
    definition: `export const BLK_THRS = 0.03`,
    value: '0.03',
    usedBy: [
        { name: 'useColor' },
        { name: 'useContrastRatio' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.blk_thrs.example',
            titleFallback: 'Applying the black clamp in APCA luminance',
            code: `import { BLK_THRS, BLK_CLMP } from 'origam'

const clamp = (Y: number) =>
  Y < BLK_THRS ? Y + (BLK_THRS - Y) ** BLK_CLMP : Y`,
            lang: 'typescript',
        },
    ],
}
