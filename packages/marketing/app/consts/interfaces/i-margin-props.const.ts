import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MARGIN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-margin-props',
    name: 'IMarginProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_margin_props.description',
    descriptionFallback: 'Margin spacing contract — all four sides plus logical block/inline shorthands. Values map to the DS spacing scale when a number or scale key is passed, or accept any CSS length string.',
    definition: `export interface IMarginProps {
    margin?: boolean | number | string
    marginTop?: boolean | number | string
    marginLeft?: boolean | number | string
    marginBottom?: boolean | number | string
    marginRight?: boolean | number | string
    marginBlock?: boolean | number | string
    marginInline?: boolean | number | string
}`,
    extends: [],
    props: [
        { name: 'margin', type: 'boolean | number | string', optional: true, descriptionFallback: 'Shorthand margin applied to all four sides. A number maps to the DS spacing scale; a string is used verbatim; true applies the default spacing unit.' },
        { name: 'marginTop', type: 'boolean | number | string', optional: true, descriptionFallback: 'Top margin. Accepts the same value shapes as `margin`.' },
        { name: 'marginLeft', type: 'boolean | number | string', optional: true, descriptionFallback: 'Left margin (physical). Accepts the same value shapes as `margin`.' },
        { name: 'marginBottom', type: 'boolean | number | string', optional: true, descriptionFallback: 'Bottom margin. Accepts the same value shapes as `margin`.' },
        { name: 'marginRight', type: 'boolean | number | string', optional: true, descriptionFallback: 'Right margin (physical). Accepts the same value shapes as `margin`.' },
        { name: 'marginBlock', type: 'boolean | number | string', optional: true, descriptionFallback: 'Logical block-axis shorthand (top + bottom in horizontal writing modes).' },
        { name: 'marginInline', type: 'boolean | number | string', optional: true, descriptionFallback: 'Logical inline-axis shorthand (left + right in horizontal writing modes).' },
    ],
    usedBy: [
        { slug: 'use-margin', name: 'useMargin', kind: 'composable' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'card', name: 'Card', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/margin.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_margin_props.example',
            titleFallback: 'Consuming margin props via useMargin',
            code: `import type { IMarginProps } from 'origam'
import { useMargin } from 'origam'

interface ICardProps extends IMarginProps {
    title?: string
}

const { marginClasses, marginStyles } = useMargin(props)`,
            lang: 'typescript',
        },
    ],
}
