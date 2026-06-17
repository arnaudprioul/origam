import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RIPPLE_ELEMENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-ripple-element',
    name: 'IRippleElement',
    category: 'Directives',
    descriptionKey: 'interfaces.catalog.i_ripple_element.description',
    descriptionFallback: 'Individual ripple DOM element — extends Element with an optional `dataset` typed as `IRippleElementDataset`, giving typed access to the `isHiding` and `activated` data attributes written by the ripple animation engine.',
    definition: `export interface IRippleElement extends Element {
    dataset?: IRippleElementDataset
}`,
    extends: [],
    props: [
        { name: 'dataset', type: 'IRippleElementDataset', optional: true, descriptionFallback: 'Typed dataset providing access to `isHiding` and `activated` flags written by the ripple animation lifecycle.' },
    ],
    usedBy: [
        { slug: 'v-ripple', name: 'vRipple', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/ripple.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_ripple_element.example',
            titleFallback: 'Checking ripple animation state',
            code: `import type { IRippleElement } from 'origam'

function isRippleHiding(el: IRippleElement): boolean {
    return el.dataset?.isHiding === 'true'
}`,
            lang: 'typescript',
        },
    ],
}
