import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DEFAULT_Z_INDEX_CONST_DOC: IConstDoc = {
    slug: 'watermark-default-z-index',
    name: 'WATERMARK_DEFAULT_Z_INDEX',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_default_z_index.description',
    descriptionFallback: 'Default z-index for the watermark overlay: 1 places it just above the normal document flow without competing with modals or tooltips.',
    definition: `export const WATERMARK_DEFAULT_Z_INDEX = 1`,
    value: '1',
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_default_z_index.example',
            titleFallback: 'Raise the z-index to cover sticky elements',
            code: `<OrigamWatermark text="CONFIDENTIAL" :z-index="100" />
<!-- Default is WATERMARK_DEFAULT_Z_INDEX = 1 -->`,
            lang: 'html',
        },
    ],
}
