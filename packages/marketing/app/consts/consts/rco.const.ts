import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const RCO_CONST_DOC: IConstDoc = {
    slug: 'rco',
    name: 'RCO',
    category: 'Color & A11y',
    descriptionKey: 'consts.catalog.rco.description',
    descriptionFallback: "Red channel luminance coefficient (0.2126729) in the sRGB-to-relative-luminance formula (WCAG 2.x). Used with GCO and BCO by color utilities to compute contrast ratios and APCA lightness.",
    definition: `export const RCO = 0.2126729`,
    value: '0.2126729',
    usedBy: [
        { name: 'color.util' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.rco.example',
            titleFallback: 'Computing relative luminance from linearised RGB',
            code: `import { RCO, GCO, BCO } from 'origam'

// WCAG relative luminance
const L = RCO * r + GCO * g + BCO * b`,
            lang: 'typescript',
        },
    ],
}
