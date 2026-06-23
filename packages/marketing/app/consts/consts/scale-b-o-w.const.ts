import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SCALE_B_O_W_CONST_DOC: IConstDoc = {
    slug: 'scale-b-o-w',
    name: 'SCALE_B_O_W',
    category: 'Color & Theming',
    descriptionKey: 'consts.catalog.scale_b_o_w.description',
    descriptionFallback: 'APCA contrast scaling factor applied when the text is dark on a white background (Black On White). Used by the APCA-based contrast utility in `color.util.ts`.',
    definition: `export const SCALE_B_O_W = 1.25`,
    value: '1.25',
    usedBy: [
        { name: 'color.util.ts' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.scale_b_o_w.example',
            titleFallback: 'APCA contrast calculation (internal)',
            code: `import { SCALE_B_O_W } from 'origam'

// Sapc (APCA) contrast value scaled for dark-on-light
const contrast = Math.abs(sapc) * SCALE_B_O_W`,
            lang: 'typescript',
        },
    ],
}
