import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DIMENSION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-dimension-props',
    name: 'IDimensionProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_dimension_props.description',
    descriptionFallback: 'Sizing contract — height/width plus their min/max bounds, consumed via useDimension().dimensionStyles.',
    definition: `export interface IDimensionProps {
    height?: number | string
    maxHeight?: number | string
    maxWidth?: number | string
    minHeight?: number | string
    minWidth?: number | string
    width?: number | string
}`,
    extends: [],
    props: [
        { name: 'height', type: 'number | string', optional: true, descriptionFallback: 'Block size — a number (resolved to "Npx"), a CSS length, a custom-property ref or an aspect-ratio shortcut.' },
        { name: 'maxHeight', type: 'number | string', optional: true, descriptionFallback: 'Maximum block size, same accepted shapes as height.' },
        { name: 'maxWidth', type: 'number | string', optional: true, descriptionFallback: 'Maximum inline size, same accepted shapes as width.' },
        { name: 'minHeight', type: 'number | string', optional: true, descriptionFallback: 'Minimum block size, same accepted shapes as height.' },
        { name: 'minWidth', type: 'number | string', optional: true, descriptionFallback: 'Minimum inline size, same accepted shapes as width.' },
        { name: 'width', type: 'number | string', optional: true, descriptionFallback: 'Inline size — a number (resolved to "Npx"), a CSS length, a custom-property ref or an aspect-ratio shortcut.' },
    ],
    usedBy: [
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'img', name: 'Img', kind: 'component' },
        { slug: 'avatar', name: 'Avatar', kind: 'component' },
        { slug: 'use-dimension', name: 'useDimension', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/dimension.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_dimension_props.example',
            titleFallback: 'Extending the interface and consuming the styles',
            code: `import type { IDimensionProps } from 'origam'
import { useDimension } from 'origam'

interface ICardProps extends IDimensionProps {
    rounded?: TRounded
}

const { dimensionStyles } = useDimension(props)`,
            lang: 'typescript',
        },
    ],
}
