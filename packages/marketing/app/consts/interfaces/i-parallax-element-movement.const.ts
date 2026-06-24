import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_ELEMENT_MOVEMENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-element-movement',
    name: 'IParallaxElementMovement',
    category: 'Parallax',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IParallaxElementMovement {
    x: number;
    y: number;
    target?: DOMRect | IBox;
    originX?: number;
    originY?: number;
    strength: number;
    event: TParallaxEvent;
    minX?: number;
    minY?: number;
    maxX?: number;
    maxY?: number;
}`,
    extends: [],
    props: [
        { name: 'x', type: 'number', optional: false, descriptionFallback: '' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: '' },
        { name: 'target', type: 'DOMRect | IBox', optional: true, descriptionFallback: '' },
        { name: 'originX', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'originY', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'strength', type: 'number', optional: false, descriptionFallback: '' },
        { name: 'event', type: 'TParallaxEvent', optional: false, descriptionFallback: '' },
        { name: 'minX', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'minY', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'maxX', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'maxY', type: 'number', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax-element.interface.ts',
    examples: [],
}
