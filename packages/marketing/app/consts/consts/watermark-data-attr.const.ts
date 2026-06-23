import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WATERMARK_DATA_ATTR_CONST_DOC: IConstDoc = {
    slug: 'watermark-data-attr',
    name: 'WATERMARK_DATA_ATTR',
    category: 'Watermark',
    descriptionKey: 'consts.catalog.watermark_data_attr.description',
    descriptionFallback: "HTML data attribute applied to every watermark layer created by OrigamWatermark. The anti-tamper MutationObserver uses it to detect and re-inject removed layers.",
    definition: `export const WATERMARK_DATA_ATTR = 'data-origam-watermark'`,
    value: "'data-origam-watermark'",
    usedBy: [
        { name: 'OrigamWatermark', slug: 'watermark' },
        { name: 'useWatermark' },
    ],
    sourceFile: 'packages/ds/src/consts/Watermark/watermark.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.watermark_data_attr.example',
            titleFallback: 'Query watermark layers in the DOM',
            code: `import { WATERMARK_DATA_ATTR } from 'origam'

const layers = document.querySelectorAll(\`[\${WATERMARK_DATA_ATTR}]\`)`,
            lang: 'typescript',
        },
    ],
}
