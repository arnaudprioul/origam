import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BORDER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-border-props',
    name: 'IBorderProps',
    category: 'Border & Shape',
    descriptionKey: 'interfaces.catalog.i_border_props.description',
    descriptionFallback: 'Full border contract — shorthand plus per-side, logical (block/inline), color and style props, consumed via useBorder().borderClasses and borderStyles.',
    definition: `export interface IBorderProps {
    border?: boolean | number | string | TDirectionBoth | Array<TDirectionBoth>
    borderTop?: boolean | number | string
    borderLeft?: boolean | number | string
    borderBottom?: boolean | number | string
    borderRight?: boolean | number | string
    borderBlock?: boolean | number | string
    borderInline?: boolean | number | string
    borderColor?: string
    borderStyle?: string
}`,
    extends: [],
    props: [
        { name: 'border', type: 'boolean | number | string | TDirectionBoth | Array<TDirectionBoth>', optional: true, descriptionFallback: 'Shorthand border — true enables all sides, a number sets width in px, a string sets the full CSS value, or a direction / array of directions.' },
        { name: 'borderTop', type: 'boolean | number | string', optional: true, descriptionFallback: 'Top border — true, a px width or a full CSS border value.' },
        { name: 'borderLeft', type: 'boolean | number | string', optional: true, descriptionFallback: 'Left border — true, a px width or a full CSS border value.' },
        { name: 'borderBottom', type: 'boolean | number | string', optional: true, descriptionFallback: 'Bottom border — true, a px width or a full CSS border value.' },
        { name: 'borderRight', type: 'boolean | number | string', optional: true, descriptionFallback: 'Right border — true, a px width or a full CSS border value.' },
        { name: 'borderBlock', type: 'boolean | number | string', optional: true, descriptionFallback: 'Logical block-axis border (top + bottom in horizontal writing modes).' },
        { name: 'borderInline', type: 'boolean | number | string', optional: true, descriptionFallback: 'Logical inline-axis border (left + right in horizontal writing modes).' },
        { name: 'borderColor', type: 'string', optional: true, descriptionFallback: 'Border color — a CSS color value or a design token name.' },
        { name: 'borderStyle', type: 'string', optional: true, descriptionFallback: 'Border style — solid, dashed, dotted, etc.' },
    ],
    usedBy: [
        { slug: 'use-border', name: 'useBorder', kind: 'composable' },
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'input', name: 'Input', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/border.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_border_props.example',
            titleFallback: 'Card with dashed primary border',
            code: `<OrigamCard border border-color="primary" border-style="dashed">
    Content
</OrigamCard>`,
            lang: 'vue',
        },
    ],
}
