import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_FONT_WEIGHT_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-font-weight',
    name: 'WATERMARK_DEFAULT_FONT_WEIGHT',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_font_weight.description',
    descriptionFallback: 'Default font weight for watermark text: 400 (normal). Accepts numeric CSS weight values or string keywords.',
    definition: `export const WATERMARK_DEFAULT_FONT_WEIGHT: number | string = 400`,
    value: '400',
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_font_weight.example',
            titleFallback: 'Use bold weight for higher visibility',
            code: `<OrigamWatermark text="DRAFT" :font-weight="700" />
<!-- Default is WATERMARK_DEFAULT_FONT_WEIGHT = 400 -->`,
            lang: 'html',
        },
    ],
}
