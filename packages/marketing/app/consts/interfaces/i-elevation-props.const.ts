import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ELEVATION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-elevation-props',
    name: 'IElevationProps',
    category: 'Visual Style',
    descriptionKey: 'interfaces.catalog.i_elevation_props.description',
    descriptionFallback: 'Elevation contract — adds a shadow rung to a component via the design-token-mapped `elevation` prop, consumed by useElevation() which emits a `box-shadow: var(--origam-shadow-…)` utility class or inline style.',
    definition: `export interface IElevationProps {
    elevation?: number | string
}`,
    extends: [],
    props: [
        {
            name: 'elevation',
            type: 'number | string',
            optional: true,
            descriptionFallback: 'Shadow level — a numeric rung (0–24) mapped to the --origam-shadow-{n} token, or a named alias such as "sm" / "md" / "lg". Omitting it leaves no shadow.',
        },
    ],
    usedBy: [
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'menu', name: 'Menu', kind: 'component' },
        { slug: 'use-elevation', name: 'useElevation', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/elevation.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_elevation_props.example',
            titleFallback: 'Extending IElevationProps and consuming it',
            code: `import type { IElevationProps } from 'origam'
import { useElevation } from 'origam'

interface ICardProps extends IElevationProps {
    title: string
}

const { elevationClasses, elevationStyles } = useElevation(props)`,
            lang: 'typescript',
        },
    ],
}
