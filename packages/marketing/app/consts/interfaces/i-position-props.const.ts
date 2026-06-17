import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_POSITION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-position-props',
    name: 'IPositionProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_position_props.description',
    descriptionFallback: 'CSS position contract — the positioning scheme plus numeric/string inset values for each side. Consumed by fixed or sticky surfaces such as app bars, FABs and snackbars.',
    definition: `export interface IPositionProps {
    position?: TPosition
    top?: number | string
    bottom?: number | string
    left?: number | string
    right?: number | string
}`,
    extends: [],
    props: [
        { name: 'position', type: 'TPosition', optional: true, descriptionFallback: 'CSS position scheme — "static" | "relative" | "absolute" | "fixed" | "sticky". Maps directly to the position CSS property.' },
        { name: 'top', type: 'number | string', optional: true, descriptionFallback: 'Top inset. A number is resolved to "Npx"; a string is used verbatim (any CSS length).' },
        { name: 'bottom', type: 'number | string', optional: true, descriptionFallback: 'Bottom inset. Same value shapes as `top`.' },
        { name: 'left', type: 'number | string', optional: true, descriptionFallback: 'Left inset. Same value shapes as `top`.' },
        { name: 'right', type: 'number | string', optional: true, descriptionFallback: 'Right inset. Same value shapes as `top`.' },
    ],
    usedBy: [
        { slug: 'app-bar', name: 'AppBar', kind: 'component' },
        { slug: 'fab', name: 'Fab', kind: 'component' },
        { slug: 'snackbar', name: 'Snackbar', kind: 'component' },
        { slug: 'use-position', name: 'usePosition', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/position.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_position_props.example',
            titleFallback: 'Extending the interface for a sticky component',
            code: `import type { IPositionProps } from 'origam'

interface IAppBarProps extends IPositionProps {
    elevation?: number
}`,
            lang: 'typescript',
        },
    ],
}
