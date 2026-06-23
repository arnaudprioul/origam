import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RIPPLE_ELEMENT_DATASET_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-ripple-element-dataset',
    name: 'IRippleElementDataset',
    category: 'Directives',
    descriptionKey: 'interfaces.catalog.i_ripple_element_dataset.description',
    descriptionFallback: 'Typed `dataset` shape on a ripple wave element — two string flags written by the animation engine to track whether the wave is currently fading out and whether it has been activated.',
    definition: `export interface IRippleElementDataset {
    isHiding?: string
    activated?: string
}`,
    extends: [],
    props: [
        { name: 'isHiding', type: 'string', optional: true, descriptionFallback: 'Set to "true" when the ripple wave is in its fade-out phase. Used to coordinate removal from the DOM after the animation completes.' },
        { name: 'activated', type: 'string', optional: true, descriptionFallback: 'ISO timestamp string written when the wave is first activated. Used to compute animation timing relative to the pointer event.' },
    ],
    usedBy: [
        { slug: 'i-ripple-element', name: 'IRippleElement', kind: 'composable' },
        { slug: 'v-ripple', name: 'vRipple', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/ripple.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_ripple_element_dataset.example',
            titleFallback: 'Reading dataset flags from a ripple wave element',
            code: `import type { IRippleElement, IRippleElementDataset } from 'origam'

function getRippleAge(el: IRippleElement): number {
    const dataset: IRippleElementDataset | undefined = el.dataset
    const activated = dataset?.activated
    return activated ? Date.now() - new Date(activated).getTime() : 0
}`,
            lang: 'typescript',
        },
    ],
}
