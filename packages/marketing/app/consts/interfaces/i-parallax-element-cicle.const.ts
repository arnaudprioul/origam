import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_ELEMENT_CICLE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-element-cicle',
    name: 'IParallaxElementCicle',
    category: 'Parallax',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IParallaxElementCicle {
    referencePosition: TPoint;
    shape: IBox;
    event: TParallaxEvent;
    cycles: number;
    strength: number;
}`,
    extends: [],
    props: [
        { name: 'referencePosition', type: 'TPoint', optional: false, descriptionFallback: '' },
        { name: 'shape', type: 'IBox', optional: false, descriptionFallback: '' },
        { name: 'event', type: 'TParallaxEvent', optional: false, descriptionFallback: '' },
        { name: 'cycles', type: 'number', optional: false, descriptionFallback: '' },
        { name: 'strength', type: 'number', optional: false, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax-element.interface.ts',
    examples: [],
}
