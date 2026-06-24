import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_ELEMENT_TYPE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-element-type-props',
    name: 'IParallaxElementTypeProps',
    category: 'Parallax',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IParallaxElementTypeProps {
    type?: TParallaxElementType;
}`,
    extends: [],
    props: [
        { name: 'type', type: 'TParallaxElementType', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax-element.interface.ts',
    examples: [],
}
