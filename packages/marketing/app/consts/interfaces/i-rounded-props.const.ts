import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ROUNDED_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rounded-props',
    name: 'IRoundedProps',
    category: 'Shape',
    descriptionKey: 'interfaces.catalog.i_rounded_props.description',
    descriptionFallback: 'Corner-radius contract for every component whose surface can be rounded. Supports named token rungs (small/default/large/…), a boolean shorthand for the default token, or raw CSS border-radius values.',
    definition: `export interface IRoundedProps {
    rounded?: boolean | number | string | TRounded | null | undefined
    roundedTopRight?: boolean | number | string
    roundedTopLeft?: boolean | number | string
    roundedBottomLeft?: boolean | number | string
    roundedBottomRight?: boolean | number | string
}`,
    extends: [],
    props: [
        { name: 'rounded', type: 'boolean | number | string | TRounded | null | undefined', optional: true, descriptionFallback: 'Corner-radius selector: a TRounded named rung emits --rounded-{name} class; boolean true (or empty string) emits --rounded; a number or CSS string is applied as a raw border-radius via inline style.' },
        { name: 'roundedTopRight', type: 'boolean | number | string', optional: true, descriptionFallback: 'Applies rounding only to the top-right corner. Accepts the same shapes as rounded.' },
        { name: 'roundedTopLeft', type: 'boolean | number | string', optional: true, descriptionFallback: 'Applies rounding only to the top-left corner. Accepts the same shapes as rounded.' },
        { name: 'roundedBottomLeft', type: 'boolean | number | string', optional: true, descriptionFallback: 'Applies rounding only to the bottom-left corner. Accepts the same shapes as rounded.' },
        { name: 'roundedBottomRight', type: 'boolean | number | string', optional: true, descriptionFallback: 'Applies rounding only to the bottom-right corner. Accepts the same shapes as rounded.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'chip', name: 'Chip', kind: 'component' },
        { slug: 'use-rounded', name: 'useRounded', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/rounded.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rounded_props.example',
            titleFallback: 'Extending IRoundedProps and consuming rounded styles',
            code: `import type { IRoundedProps } from 'origam'
import { useRounded } from 'origam'

interface ICardProps extends IRoundedProps {
    title?: string
}

const { roundedClasses, roundedStyles } = useRounded(props)`,
            lang: 'typescript',
        },
    ],
}
