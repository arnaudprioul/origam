import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CIELAB_FORWARD_TRANSFORM_CONST_DOC: IConstDoc = {
    slug: 'cielab-forward-transform',
    name: 'CIELAB_FORWARD_TRANSFORM',
    category: 'Color',
    descriptionKey: 'consts.catalog.cielab_forward_transform.description',
    descriptionFallback: 'CIELAB forward transfer function f(t). Converts a linearised XYZ tristimulus value to the CIE L*a*b* cube-root compressed domain. Threshold determined by COLOR_DELTA (6÷29).',
    definition: `export const CIELAB_FORWARD_TRANSFORM = (t: number): number => (
    t > COLOR_DELTA ** 3
        ? Math.cbrt(t)
        : (t / (3 * COLOR_DELTA ** 2)) + 4 / 29
)`,
    usedBy: [
        { name: 'useColor' },
        { name: 'useColorEffect' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.cielab_forward_transform.example',
            titleFallback: 'Applying the forward transform in a color conversion',
            code: `import { CIELAB_FORWARD_TRANSFORM, COLOR_DELTA } from 'origam'

// Convert XYZ Y channel to L* lightness
const fy = CIELAB_FORWARD_TRANSFORM(Y / Yn)
const L = 116 * fy - 16`,
            lang: 'typescript',
        },
    ],
}
