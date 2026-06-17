import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HOVER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-hover-props',
    name: 'IHoverProps',
    category: 'Interaction & State',
    descriptionKey: 'interfaces.catalog.i_hover_props.description',
    descriptionFallback: 'Prop contract for components that expose a controllable hover state — accepts a boolean to force-enable hover or an IHoverState object for per-property overrides while hovered.',
    definition: `export interface IHoverProps {
    hover?: boolean | IHoverState
}`,
    extends: [],
    props: [
        { name: 'hover', type: 'boolean | IHoverState', optional: true, descriptionFallback: 'Controls the hover state: undefined/false = natural mouseenter/leave; true = forced on; IHoverState object = natural tracking with per-property visual overrides (color, bgColor, border, rounded, elevation, padding, margin, gap) while hovered.' },
    ],
    usedBy: [
        { slug: 'use-hover', name: 'useHover', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/hover.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_hover_props.example',
            titleFallback: 'Using IHoverProps with an object state override',
            code: `<template>
    <origam-card :hover="{ bgColor: 'surface-raised', elevation: 'md' }">
        Hover to elevate
    </origam-card>
</template>`,
            lang: 'html',
        },
    ],
}
