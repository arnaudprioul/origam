import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CALCULATE_IMPULSE_VELOCITY_UTIL_DOC: IUtilDoc = {
    slug: 'calculate-impulse-velocity',
    name: 'calculateImpulseVelocity',
    category: 'Commons',
    icon: 'mdi-speedometer',
    descriptionKey: 'utils.catalog.calculate_impulse_velocity.description',
    descriptionFallback: 'Estimate the fling velocity from a reversed-time array of pointer samples using a weighted impulse algorithm. Returns 0 when fewer than 2 samples are available.',
    signature: 'function calculateImpulseVelocity(samples: Array<ISample>): number',
    params: [
        {
            name: 'samples',
            type: 'Array<ISample>',
            required: true,
            descriptionKey: 'utils.detail.calculate_impulse_velocity.param_samples',
            descriptionFallback: 'Array of { d: number, t: number } displacement/time pairs in reversed time order (most recent sample at index 0). ISample is { d: number; t: number }.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.calculate_impulse_velocity.returns',
        descriptionFallback: 'Estimated velocity in pixels per millisecond. Returns 0 when the input has fewer than 2 samples or all timestamps are identical.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/velocity.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.calculate_impulse_velocity.example_basic',
            titleFallback: 'Compute fling velocity from touch samples',
            code: `import { calculateImpulseVelocity } from 'origam'

// Samples in reversed order: newest first
const samples = [
    { d: 320, t: 100 },
    { d: 280, t: 80 },
    { d: 200, t: 60 },
    { d: 80,  t: 40 },
]
const velocity = calculateImpulseVelocity(samples)
// → estimated px/ms for the fling gesture`,
            lang: 'typescript',
        },
    ],
    related: ['calculate', 'animate'],
}
