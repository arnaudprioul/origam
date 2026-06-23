import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GRADIENT_FROM_OBJECT_UTIL_DOC: IUtilDoc = {
    slug: 'gradient-from-object',
    name: 'gradientFromObject',
    category: 'Commons',
    icon: 'mdi-gradient-horizontal',
    descriptionKey: 'utils.catalog.gradient_from_object.description',
    descriptionFallback: 'Converts a structured IGradient descriptor into a ready-to-use CSS gradient function string (linear-gradient, radial-gradient, or conic-gradient). Intent tokens (e.g. "primary") are resolved to the matching CSS custom property. Pure — no side effects.',
    signature: `function gradientFromObject(g: IGradient): string`,
    params: [
        {
            name: 'g',
            type: 'IGradient',
            required: true,
            descriptionKey: 'utils.detail.gradient_from_object.param_g',
            descriptionFallback: 'The gradient descriptor. Supports shorthand { from, to, direction } for two-stop gradients, or { stops } for multi-stop gradients. The type field defaults to "linear".',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.gradient_from_object.returns',
        descriptionFallback: 'A CSS gradient function string ready to use as background-image or background value.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/gradient.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.gradient_from_object.example_basic',
            titleFallback: 'Intent shorthand and multi-stop',
            code: `import { gradientFromObject } from 'origam'

gradientFromObject({ from: 'primary', to: 'success' })
// → 'linear-gradient(135deg, var(--origam-color__action--primary---bg), var(--origam-color__feedback--success---bg))'

gradientFromObject({
  type: 'radial',
  stops: [
    { color: '#fff', position: 0 },
    { color: '#000', position: 100 },
  ],
})
// → 'radial-gradient(circle at center, #fff 0%, #000 100%)'`,
            lang: 'typescript',
        },
    ],
    related: ['has-alpha'],
}
