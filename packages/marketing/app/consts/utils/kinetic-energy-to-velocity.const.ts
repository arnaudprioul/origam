import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const KINETIC_ENERGY_TO_VELOCITY_UTIL_DOC: IUtilDoc = {
    slug: 'kinetic-energy-to-velocity',
    name: 'kineticEnergyToVelocity',
    category: 'Commons',
    icon: 'mdi-speedometer',
    descriptionKey: 'utils.catalog.kinetic_energy_to_velocity.description',
    descriptionFallback: 'Converts a kinetic-energy scalar (work) into a signed velocity using sqrt(2) scaling. Negative work produces negative velocity. Used internally by inertia-scroll and drag composables.',
    signature: `function kineticEnergyToVelocity(work: number): number`,
    params: [
        {
            name: 'work',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.kinetic_energy_to_velocity.param_work',
            descriptionFallback: 'The kinetic energy scalar. Negative values yield negative (reversed) velocity.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.kinetic_energy_to_velocity.returns',
        descriptionFallback: 'The signed velocity: sign(work) × sqrt(|work|) × sqrt(2).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/velocity.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.kinetic_energy_to_velocity.example_basic',
            titleFallback: 'Energy-to-velocity conversion',
            code: `import { kineticEnergyToVelocity } from 'origam'

kineticEnergyToVelocity(2)   // → ~2
kineticEnergyToVelocity(-2)  // → ~-2
kineticEnergyToVelocity(0)   // → 0`,
            lang: 'typescript',
        },
    ],
    related: ['noop'],
}
