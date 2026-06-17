import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SIZE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-size-props',
    name: 'ISizeProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_size_props.description',
    descriptionFallback: 'Named-size contract for icon-sized and token-driven components. Accepts a TSize variant name (x-small, small, default, large, x-large) or a raw number resolved to pixels.',
    definition: `export interface ISizeProps {
    size?: TSize | number
}`,
    extends: [],
    props: [
        { name: 'size', type: 'TSize | number', optional: true, descriptionFallback: 'Component size — a TSize token name maps to a predefined token rung; a plain number is converted to px. Both paths are consumed via useSize().sizeStyles.' },
    ],
    usedBy: [
        { slug: 'icon', name: 'Icon', kind: 'component' },
        { slug: 'kbd', name: 'Kbd', kind: 'component' },
        { slug: 'chip', name: 'Chip', kind: 'component' },
        { slug: 'pagination', name: 'Pagination', kind: 'component' },
        { slug: 'progress-circular', name: 'ProgressCircular', kind: 'component' },
        { slug: 'use-size', name: 'useSize', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/size.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_size_props.example',
            titleFallback: 'Extending ISizeProps and consuming size styles',
            code: `import type { ISizeProps } from 'origam'
import { useSize } from 'origam'

interface IIconProps extends ISizeProps {
    name: string
}

const { sizeStyles } = useSize(props)`,
            lang: 'typescript',
        },
    ],
}
