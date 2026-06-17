import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_FONT_SIZE_PX_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-font-size-px',
    name: 'WATERMARK_DEFAULT_FONT_SIZE_PX',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_font_size_px.description',
    descriptionFallback: 'Default font size in pixels for watermark text: 16 px is readable at standard zoom without overwhelming the content beneath.',
    definition: `export const WATERMARK_DEFAULT_FONT_SIZE_PX = 16`,
    value: '16',
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_font_size_px.example',
            titleFallback: 'Increase font size for large-format prints',
            code: `<OrigamWatermark text="CONFIDENTIAL" :font-size-px="24" />
<!-- Default is WATERMARK_DEFAULT_FONT_SIZE_PX = 16 -->`,
            lang: 'html',
        },
    ],
}
