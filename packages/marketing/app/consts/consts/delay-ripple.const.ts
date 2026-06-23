import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DELAY_RIPPLE_CONST_DOC: IConstDoc = {
    slug: 'delay-ripple',
    name: 'DELAY_RIPPLE',
    category: 'Animation',
    descriptionKey: 'consts.catalog.delay_ripple.description',
    descriptionFallback: 'Number of milliseconds the ripple directive waits before starting the ink animation on pointer-down. Gives fast taps a chance to complete without triggering the effect.',
    definition: `export const DELAY_RIPPLE = 80`,
    value: '80',
    usedBy: [
        { name: 'v-ripple' },
        { name: 'OrigamBtn', slug: 'btn' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/ripple.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.delay_ripple.example',
            titleFallback: 'Reading the delay value',
            code: `import { DELAY_RIPPLE } from 'origam'

// DELAY_RIPPLE === 80 (ms)
setTimeout(startAnimation, DELAY_RIPPLE)`,
            lang: 'typescript',
        },
    ],
}
