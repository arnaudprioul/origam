import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_ELEMENT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-element-props',
    name: 'IParallaxElementProps',
    category: 'Parallax',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IParallaxElementProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IParallaxElementTypeProps {
    transformOrigin?: TAnchor;
    originX?: number;
    originY?: number;
    strength?: number;
    axis?: TAxis;
    maxX?: number;
    maxY?: number;
    minX?: number;
    minY?: number;
    cycle?: number;
    audioIndex?: number;
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IPaddingProps', 'IMarginProps', 'IBorderProps', 'IRoundedProps', 'IElevationProps', 'IParallaxElementTypeProps'],
    props: [
        { name: 'transformOrigin', type: 'TAnchor', optional: true, descriptionFallback: '' },
        { name: 'originX', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'originY', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'strength', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'axis', type: 'TAxis', optional: true, descriptionFallback: '' },
        { name: 'maxX', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'maxY', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'minX', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'minY', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'cycle', type: 'number', optional: true, descriptionFallback: '' },
        { name: 'audioIndex', type: 'number', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax-element.interface.ts',
    examples: [],
}
