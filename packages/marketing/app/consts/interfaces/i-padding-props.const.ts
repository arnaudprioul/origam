import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PADDING_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-padding-props',
    name: 'IPaddingProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_padding_props.description',
    descriptionFallback: 'Padding spacing contract — all four sides plus logical block/inline shorthands. Values map to the DS spacing scale when a number or scale key is passed, or accept any CSS length string.',
    definition: `export interface IPaddingProps {
    padding?: boolean | number | string
    paddingTop?: boolean | number | string
    paddingLeft?: boolean | number | string
    paddingBottom?: boolean | number | string
    paddingRight?: boolean | number | string
    paddingBlock?: boolean | number | string
    paddingInline?: boolean | number | string
}`,
    extends: [],
    props: [
        { name: 'padding', type: 'boolean | number | string', optional: true, descriptionFallback: 'Shorthand padding applied to all four sides. A number maps to the DS spacing scale; a string is used verbatim; true applies the default spacing unit.' },
        { name: 'paddingTop', type: 'boolean | number | string', optional: true, descriptionFallback: 'Top padding. Accepts the same value shapes as `padding`.' },
        { name: 'paddingLeft', type: 'boolean | number | string', optional: true, descriptionFallback: 'Left padding (physical). Accepts the same value shapes as `padding`.' },
        { name: 'paddingBottom', type: 'boolean | number | string', optional: true, descriptionFallback: 'Bottom padding. Accepts the same value shapes as `padding`.' },
        { name: 'paddingRight', type: 'boolean | number | string', optional: true, descriptionFallback: 'Right padding (physical). Accepts the same value shapes as `padding`.' },
        { name: 'paddingBlock', type: 'boolean | number | string', optional: true, descriptionFallback: 'Logical block-axis shorthand (top + bottom in horizontal writing modes).' },
        { name: 'paddingInline', type: 'boolean | number | string', optional: true, descriptionFallback: 'Logical inline-axis shorthand (left + right in horizontal writing modes).' },
    ],
    usedBy: [
        { slug: 'use-padding', name: 'usePadding', kind: 'composable' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'card', name: 'Card', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/padding.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_padding_props.example',
            titleFallback: 'Consuming padding props via usePadding',
            code: `import type { IPaddingProps } from 'origam'
import { usePadding } from 'origam'

interface ICardProps extends IPaddingProps {
    title?: string
}

const { paddingClasses, paddingStyles } = usePadding(props)`,
            lang: 'typescript',
        },
    ],
}
