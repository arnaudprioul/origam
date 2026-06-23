import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_ANGLE_DEG_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-angle-deg',
    name: 'WATERMARK_DEFAULT_ANGLE_DEG',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_angle_deg.description',
    descriptionFallback: 'Default rotation angle in degrees for watermark tiles: -30° gives the classic diagonal look matching confidential-document watermarks.',
    definition: `export const WATERMARK_DEFAULT_ANGLE_DEG = -30`,
    value: '-30',
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_angle_deg.example',
            titleFallback: 'Apply a horizontal watermark (0°)',
            code: `<OrigamWatermark text="CONFIDENTIAL" :angle="0" />
<!-- Default is WATERMARK_DEFAULT_ANGLE_DEG = -30 -->`,
            lang: 'html',
        },
    ],
}
