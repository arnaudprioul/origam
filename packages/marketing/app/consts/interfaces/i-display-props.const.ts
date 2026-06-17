import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DISPLAY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-display-props',
    name: 'IDisplayProps',
    category: 'Display & Responsive',
    descriptionKey: 'interfaces.catalog.i_display_props.description',
    descriptionFallback: 'Display contract — lets a component declare its own mobile breakpoint, overriding the global one injected by useDisplay().',
    definition: `export interface IDisplayProps {
    mobileBreakpoint?: number | TBreakpoint
}`,
    extends: [],
    props: [
        {
            name: 'mobileBreakpoint',
            type: 'number | TBreakpoint',
            optional: true,
            descriptionFallback: 'Breakpoint below which the component is considered "mobile". Accepts a pixel value or a named breakpoint token (xs, sm, md, lg, xl, xxl).',
        },
    ],
    usedBy: [
        { slug: 'slide-group', name: 'SlideGroup', kind: 'component' },
        { slug: 'use-display', name: 'useDisplay', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/display.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_display_props.example',
            titleFallback: 'Overriding the mobile breakpoint on a component',
            code: `import type { IDisplayProps } from 'origam'

interface IMyPanelProps extends IDisplayProps {
    title: string
}`,
            lang: 'typescript',
        },
    ],
}
