import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_PARALLAX_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-parallax-key',
    name: 'ORIGAM_PARALLAX_KEY',
    category: 'Provide / Inject',
    descriptionKey: 'consts.catalog.origam_parallax_key.description',
    descriptionFallback: 'Vue injection key (InjectionKey<IParallaxProvide>) used by OrigamParallax to broadcast scroll-position context to child OrigamParallaxLayer and OrigamParallaxElement components.',
    definition: `export const ORIGAM_PARALLAX_KEY: InjectionKey<IParallaxProvide> = Symbol.for('origam:parallax')`,
    value: `Symbol.for('origam:parallax')`,
    usedBy: [
        { name: 'OrigamParallax', slug: 'parallax' },
        { name: 'OrigamParallaxElement', slug: 'parallax' },
    ],
    sourceFile: 'packages/ds/src/consts/Parallax/parallax-container.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_parallax_key.example',
            titleFallback: 'Injecting the parallax context in a custom layer',
            code: `import { inject } from 'vue'
import { ORIGAM_PARALLAX_KEY } from 'origam'

const parallax = inject(ORIGAM_PARALLAX_KEY)
console.log(parallax?.scrollY.value) // current scroll offset`,
            lang: 'typescript',
        },
    ],
}
