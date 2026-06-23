import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_GRADIENT_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-gradient',
    name: 'resolveGradient',
    category: 'Commons',
    icon: 'mdi-gradient-horizontal',
    descriptionKey: 'utils.catalog.resolve_gradient.description',
    descriptionFallback: 'Normalise a gradient value (preset key, CSS gradient string, or IGradient object) into a CSS gradient string for use in background-image or text-clip. Returns an empty string for non-gradient inputs.',
    signature: `function resolveGradient(value: TColor | IGradient): string`,
    params: [
        {
            name: 'value',
            type: 'TColor | IGradient',
            required: true,
            descriptionKey: 'utils.detail.resolve_gradient.param_value',
            descriptionFallback: 'The gradient input: a preset key string (e.g. "preset:aurora"), a raw CSS gradient string (linear-gradient/radial-gradient/…), an IGradient config object, or any other value (returns empty string).',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.resolve_gradient.returns',
        descriptionFallback: 'A CSS gradient string (preset token var or inline gradient expression), or an empty string when the input is not a gradient.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/gradient.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_gradient.example_basic',
            titleFallback: 'Resolve preset and raw gradient values',
            code: `import { resolveGradient } from 'origam'

resolveGradient('preset:aurora')
// → 'var(--origam-gradient---aurora)'

resolveGradient('linear-gradient(135deg, #6366f1, #8b5cf6)')
// → 'linear-gradient(135deg, #6366f1, #8b5cf6)'

resolveGradient({ from: '#6366f1', to: '#8b5cf6', angle: 135 })
// → 'linear-gradient(135deg, #6366f1, #8b5cf6)'

resolveGradient('primary')
// → '' (not a gradient)`,
            lang: 'typescript',
        },
    ],
    related: ['gradient-from-object', 'raw-bg-expr-with-state', 'resolve-mask-config'],
}
