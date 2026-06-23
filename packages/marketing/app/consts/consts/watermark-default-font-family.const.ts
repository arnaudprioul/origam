import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_FONT_FAMILY_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-font-family',
    name: 'WATERMARK_DEFAULT_FONT_FAMILY',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_font_family.description',
    descriptionFallback: "Default font-family for watermark text: 'inherit' picks up the nearest ancestor font so the watermark matches the page typography automatically.",
    definition: `export const WATERMARK_DEFAULT_FONT_FAMILY = 'inherit'`,
    value: "'inherit'",
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_font_family.example',
            titleFallback: 'Override the font to a monospace family',
            code: `<OrigamWatermark text="INTERNAL" font-family="monospace" />
<!-- Default is WATERMARK_DEFAULT_FONT_FAMILY = 'inherit' -->`,
            lang: 'html',
        },
    ],
}
