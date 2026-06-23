import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_OPACITY_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-opacity',
    name: 'WATERMARK_DEFAULT_OPACITY',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_opacity.description',
    descriptionFallback: 'Default opacity for watermark tiles: 0.1 (10%) keeps the watermark visible without obscuring the underlying content.',
    definition: `export const WATERMARK_DEFAULT_OPACITY = 0.1`,
    value: '0.1',
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_opacity.example',
            titleFallback: 'Increase opacity for stronger visibility',
            code: `<OrigamWatermark text="INTERNAL" :opacity="0.2" />
<!-- Default is WATERMARK_DEFAULT_OPACITY = 0.1 -->`,
            lang: 'html',
        },
    ],
}
