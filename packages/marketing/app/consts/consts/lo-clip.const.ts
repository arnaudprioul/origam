import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const LO_CLIP_CONST_DOC: IConstDoc = {
    slug: 'lo-clip',
    name: 'LO_CLIP',
    category: 'Internals',
    descriptionKey: 'consts.catalog.lo_clip.description',
    descriptionFallback: 'APCA minimum luminance clipping value (0.001). Values below this threshold are treated as absolute black to avoid mathematical artefacts in the contrast ratio calculation.',
    definition: `export const LO_CLIP = 0.001`,
    value: '0.001',
    usedBy: [
        { name: 'useColor' },
        { name: 'v-contrast' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.lo_clip.example',
            titleFallback: 'Applying the luminance clip in an APCA calculation',
            code: `import { LO_CLIP } from 'origam'

const clampedLuminance = (L: number) => Math.max(L, LO_CLIP)`,
            lang: 'typescript',
        },
    ],
}
