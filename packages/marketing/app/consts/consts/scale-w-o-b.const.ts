import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SCALE_W_O_B_CONST_DOC: IConstDoc = {
    slug: 'scale-w-o-b',
    name: 'SCALE_W_O_B',
    category: 'Color & Theming',
    descriptionKey: 'consts.catalog.scale_w_o_b.description',
    descriptionFallback: 'APCA contrast scaling factor applied when the text is light on a dark background (White On Black). Used by the APCA-based contrast utility in `color.util.ts`.',
    definition: `export const SCALE_W_O_B = 1.25`,
    value: '1.25',
    usedBy: [
        { name: 'color.util.ts' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.scale_w_o_b.example',
            titleFallback: 'APCA contrast calculation (internal)',
            code: `import { SCALE_W_O_B } from 'origam'

// Sapc (APCA) contrast value scaled for light-on-dark
const contrast = Math.abs(sapc) * SCALE_W_O_B`,
            lang: 'typescript',
        },
    ],
}
