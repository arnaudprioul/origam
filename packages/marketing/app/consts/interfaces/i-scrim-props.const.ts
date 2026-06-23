import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SCRIM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-scrim-props',
    name: 'IScrimProps',
    category: 'Overlay & Feedback',
    descriptionKey: 'interfaces.catalog.i_scrim_props.description',
    descriptionFallback: 'Minimal prop mixin that adds a backdrop/scrim control to overlay components. A boolean true shows the default semi-transparent backdrop; a string value is treated as a CSS color override for the scrim surface.',
    definition: `export interface IScrimProps {
    scrim?: boolean | string
}`,
    extends: [],
    props: [
        { name: 'scrim', type: 'boolean | string', optional: true, descriptionFallback: 'Controls the backdrop behind the overlay. Pass true for the default semi-transparent scrim, false/undefined to disable, or a CSS color string to override the scrim color.' },
    ],
    usedBy: [
        { slug: 'overlay', name: 'Overlay', kind: 'component' },
        { slug: 'dialog', name: 'Dialog', kind: 'component' },
        { slug: 'drawer', name: 'Drawer', kind: 'component' },
        { slug: 'overlay-scrim', name: 'OverlayScrim', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Overlay/overlay-scrim.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_scrim_props.example',
            titleFallback: 'Extending IScrimProps on a custom overlay',
            code: `import type { IScrimProps } from 'origam'

interface IMyOverlayProps extends IScrimProps {
    open: boolean
}
// Usage: <MyOverlay :scrim="true" /> or <MyOverlay scrim="rgba(0,0,0,0.6)" />`,
            lang: 'typescript',
        },
    ],
}
