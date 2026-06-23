import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HOVER_DIRECTIVE_CONFIG_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-hover-directive-config',
    name: 'IHoverDirectiveConfig',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_hover_directive_config.description',
    descriptionFallback: 'Object configuration accepted by v-hover — specifies which CSS class to toggle and optional mouseenter/mouseleave handlers.',
    definition: `export interface IHoverDirectiveConfig {
    class?: string
    mouseenter?: (el: HTMLElement, e: Event) => void
    mouseleave?: (el: HTMLElement, e: Event) => void
}`,
    extends: [],
    props: [
        { name: 'class', type: 'string', optional: true, descriptionFallback: 'CSS class toggled on the element while hovered. Defaults to `{componentName}--hover` when omitted.' },
        { name: 'mouseenter', type: '(el: HTMLElement, e: Event) => void', optional: true, descriptionFallback: 'Handler called when the pointer or touch enters the element.' },
        { name: 'mouseleave', type: '(el: HTMLElement, e: Event) => void', optional: true, descriptionFallback: 'Handler called when the pointer or touch leaves the element.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/hover.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_hover_directive_config.example',
            titleFallback: 'Passing a config object to v-hover',
            code: `<template>
    <div v-hover="{ class: 'card--highlighted', mouseenter: onEnter }">
        Hover me
    </div>
</template>`,
            lang: 'html',
        },
    ],
}
