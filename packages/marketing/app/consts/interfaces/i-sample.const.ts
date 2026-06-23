import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SAMPLE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-sample',
    name: 'ISample',
    category: 'Internal',
    descriptionKey: 'interfaces.catalog.i_sample.description',
    descriptionFallback: 'Internal data-point shape used by the velocity composable. A sample records a timestamp (t) and a distance (d) to compute pointer velocity for inertia-scroll calculations.',
    definition: `export interface ISample {
    t: number
    d: number
}`,
    extends: [],
    props: [
        { name: 't', type: 'number', optional: false, descriptionFallback: 'Timestamp of the sample in milliseconds (typically performance.now()).' },
        { name: 'd', type: 'number', optional: false, descriptionFallback: 'Distance covered (in pixels) since the previous sample — used to derive instantaneous velocity.' },
    ],
    usedBy: [
        { slug: 'use-velocity', name: 'useVelocity', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_sample.example',
            titleFallback: 'ISample in the velocity composable context',
            code: `// Internal usage inside useVelocity
const samples: ISample[] = []
samples.push({ t: performance.now(), d: deltaY })`,
            lang: 'typescript',
        },
    ],
}
