import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_PARALLAX_LAYER_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-parallax-layer-key',
    name: 'ORIGAM_PARALLAX_LAYER_KEY',
    category: 'Provide / Inject',
    descriptionKey: 'consts.catalog.origam_parallax_layer_key.description',
    descriptionFallback: 'Vue injection key (InjectionKey<IParallaxLayerProvide>) used by OrigamParallaxLayer to expose layer-specific context (depth, bounds) to nested elements.',
    definition: `export const ORIGAM_PARALLAX_LAYER_KEY: InjectionKey<IParallaxLayerProvide> = Symbol.for('origam:parallax-layer')`,
    value: `Symbol.for('origam:parallax-layer')`,
    usedBy: [
        { name: 'OrigamParallaxLayer', slug: 'parallax' },
        { name: 'OrigamParallax', slug: 'parallax' },
    ],
    sourceFile: 'packages/ds/src/consts/Parallax/parallax-layer.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_parallax_layer_key.example',
            titleFallback: 'Injecting the parallax-layer context in a custom child',
            code: `import { inject } from 'vue'
import { ORIGAM_PARALLAX_LAYER_KEY } from 'origam'

const layer = inject(ORIGAM_PARALLAX_LAYER_KEY)
console.log(layer?.depth.value) // e.g. 0.5`,
            lang: 'typescript',
        },
    ],
}
