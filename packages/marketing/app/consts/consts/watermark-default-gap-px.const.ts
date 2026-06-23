import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_GAP_PX_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-gap-px',
    name: 'WATERMARK_DEFAULT_GAP_PX',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_gap_px.description',
    descriptionFallback: 'Default gap in pixels between watermark tiles: 120 px matches the spacing of confidential-document watermarks at standard zoom (~one glyph every ~12 cm at 96 dpi).',
    definition: `export const WATERMARK_DEFAULT_GAP_PX = 120`,
    value: '120',
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_gap_px.example',
            titleFallback: 'Reduce gap for denser tiling',
            code: `<OrigamWatermark text="CONFIDENTIAL" :gap-px="60" />
<!-- Default is WATERMARK_DEFAULT_GAP_PX = 120 -->`,
            lang: 'html',
        },
    ],
}
