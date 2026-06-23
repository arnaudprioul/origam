import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DIVIDER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-divider-props',
    name: 'IDividerProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_divider_props.description',
    descriptionFallback: 'Props for OrigamDivider — a thin horizontal or vertical separator. Supports inset, custom length and thickness on top of color, background-color, margin and direction.',
    definition: `export interface IDividerProps extends ICommonsComponentProps, IColorProps, IBgColorProps, IMarginProps, IDirectionProps {
    inset?: boolean
    length?: number | string
    thickness?: number | string
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'IMarginProps', 'IDirectionProps'],
    props: [
        { name: 'inset', type: 'boolean', optional: true, descriptionFallback: 'Add left/right padding so the divider does not span the full container width (horizontal) or top/bottom padding (vertical).' },
        { name: 'length', type: 'number | string', optional: true, descriptionFallback: 'Override the divider length. Accepts a pixel number or any valid CSS length string (e.g. "80%", "4rem").' },
        { name: 'thickness', type: 'number | string', optional: true, descriptionFallback: 'Override the divider thickness. Accepts a pixel number or any valid CSS length string (e.g. "2px").' },
    ],
    usedBy: [
        { slug: 'divider', name: 'OrigamDivider', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Divider/divider.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_divider_props.example',
            titleFallback: 'Inset colored divider',
            code: `<OrigamDivider color="primary" :inset="true" thickness="2" />`,
            lang: 'html',
        },
    ],
}
