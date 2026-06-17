import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_COLOR_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-color',
    name: 'WATERMARK_DEFAULT_COLOR',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_color.description',
    descriptionFallback: "Default fill color for watermark text: 'currentColor' inherits the surrounding text color so the watermark blends naturally with any theme.",
    definition: `export const WATERMARK_DEFAULT_COLOR = 'currentColor'`,
    value: "'currentColor'",
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_color.example',
            titleFallback: 'Use a branded color instead of currentColor',
            code: `<OrigamWatermark text="DRAFT" color="#ff0000" />
<!-- Default is WATERMARK_DEFAULT_COLOR = 'currentColor' -->`,
            lang: 'html',
        },
    ],
}
