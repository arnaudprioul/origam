import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_H_T_M_L_EXPAND_ELEMENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-h-t-m-l-expand-element',
    name: 'IHTMLExpandElement',
    category: 'Utilities',
    descriptionKey: 'interfaces.catalog.i_h_t_m_l_expand_element.description',
    descriptionFallback: 'Extended HTMLElement interface used internally by the expand transition utilities — stores the initial style snapshot and the parent reference so the transition can be cleanly reversed.',
    definition: `export interface IHTMLExpandElement extends HTMLElement {
    _parent?: (Node & ParentNode & HTMLElement) | null
    _initialStyle?: {
        transition: string
        overflow: string
        height?: string | null
        width?: string | null
    }
}`,
    extends: ['HTMLElement'],
    props: [
        { name: '_parent', type: '(Node & ParentNode & HTMLElement) | null', optional: true, descriptionFallback: 'Reference to the parent element captured at transition start.' },
        { name: '_initialStyle', type: '{ transition: string; overflow: string; height?: string | null; width?: string | null }', optional: true, descriptionFallback: 'Snapshot of the element initial transition, overflow, height, and width CSS values, restored on leave.' },
    ],
    usedBy: [
        { slug: 'use-expand-transition', name: 'useExpandTransition', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Transition/expand.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_h_t_m_l_expand_element.example',
            titleFallback: 'Internal usage in the expand transition enter hook',
            code: `import type { IHTMLExpandElement } from 'origam'

function onEnter(el: Element) {
    const elem = el as IHTMLExpandElement
    elem._initialStyle = {
        transition: elem.style.transition,
        overflow: elem.style.overflow,
        height: elem.style.height,
    }
}`,
            lang: 'typescript',
        },
    ],
}
