import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CIELAB_REVERSE_TRANSFORM_CONST_DOC: IConstDoc = {
    slug: 'cielab-reverse-transform',
    name: 'CIELAB_REVERSE_TRANSFORM',
    category: 'Color',
    descriptionKey: 'consts.catalog.cielab_reverse_transform.description',
    descriptionFallback: 'CIELAB reverse transfer function f⁻¹(t). Converts a CIE L*a*b* cube-root-compressed value back to a linearised XYZ tristimulus. Threshold determined by COLOR_DELTA (6÷29).',
    definition: `export const CIELAB_REVERSE_TRANSFORM = (t: number): number => (
    t > COLOR_DELTA
        ? t ** 3
        : (3 * COLOR_DELTA ** 2) * (t - 4 / 29)
)`,
    usedBy: [
        { name: 'useColor' },
        { name: 'useColorEffect' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.cielab_reverse_transform.example',
            titleFallback: 'Applying the reverse transform in Lab→XYZ conversion',
            code: `import { CIELAB_REVERSE_TRANSFORM } from 'origam'

// Reconstruct XYZ Y channel from L*a*b* L value
const fy = (L + 16) / 116
const Y = Yn * CIELAB_REVERSE_TRANSFORM(fy)`,
            lang: 'typescript',
        },
    ],
}
