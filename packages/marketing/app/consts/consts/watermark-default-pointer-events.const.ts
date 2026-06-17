import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_POINTER_EVENTS_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-pointer-events',
    name: 'WATERMARK_DEFAULT_POINTER_EVENTS',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_pointer_events.description',
    descriptionFallback: "Default CSS pointer-events value for watermark layers: 'none' makes the overlay fully click-through so it never interferes with the interactive content beneath.",
    definition: `export const WATERMARK_DEFAULT_POINTER_EVENTS: 'none' | 'auto' = 'none'`,
    value: "'none'",
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_pointer_events.example',
            titleFallback: 'Allow interactions on the watermark layer',
            code: `<OrigamWatermark text="PREVIEW" pointer-events="auto" />
<!-- Default is WATERMARK_DEFAULT_POINTER_EVENTS = 'none' -->`,
            lang: 'html',
        },
    ],
}
