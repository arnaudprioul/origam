import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_OVERLAY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-overlay-props',
    name: 'IOverlayProps',
    category: 'Overlay',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IOverlayProps extends ICommonsComponentProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps {
    absolute?: boolean;
    attach?: boolean | string | Element;
    closeOnBack?: boolean;
    contentClass?: string | Array<string>;
    contentProps?: any;
    disabled?: boolean;
    noClickAnimation?: boolean;
    modelValue?: boolean;
    zIndex?: number | string;
    disableGlobalStack?: boolean;
    persistent?: boolean;
}`,
    extends: ['ICommonsComponentProps', 'IDimensionProps', 'IActivatorProps', 'ILocationStrategyProps', 'IScrollStrategyProps', 'ILazyProps', 'ITransitionComponentProps', 'IScrimProps'],
    props: [
        { name: 'absolute', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'attach', type: 'boolean | string | Element', optional: true, descriptionFallback: '' },
        { name: 'closeOnBack', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'contentClass', type: 'string | Array<string>', optional: true, descriptionFallback: '' },
        { name: 'contentProps', type: 'any', optional: true, descriptionFallback: '' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'noClickAnimation', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'modelValue', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'zIndex', type: 'number | string', optional: true, descriptionFallback: '' },
        { name: 'disableGlobalStack', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'persistent', type: 'boolean', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Overlay/overlay.interface.ts',
    examples: [],
}
