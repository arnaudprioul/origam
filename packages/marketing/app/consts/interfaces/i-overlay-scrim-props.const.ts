import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_OVERLAY_SCRIM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-overlay-scrim-props',
    name: 'IOverlayScrimProps',
    category: 'Overlay',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IOverlayScrimProps extends ICommonsComponentProps, ITagProps, ITransitionComponentProps, IScrimProps {
    active?: boolean;
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'ITransitionComponentProps', 'IScrimProps'],
    props: [
        { name: 'active', type: 'boolean', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Overlay/overlay-scrim.interface.ts',
    examples: [],
}
