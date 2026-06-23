import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOCATION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-location-props',
    name: 'ILocationProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_location_props.description',
    descriptionFallback: 'Minimal anchor contract — a single `location` prop that determines where a floating or anchored element is positioned relative to its target.',
    definition: `export interface ILocationProps {
    location?: TAnchor
}`,
    extends: [],
    props: [
        { name: 'location', type: 'TAnchor', optional: true, descriptionFallback: 'Anchor descriptor that combines a side ("top", "bottom", "left", "right", "center") with an optional alignment ("start", "end"). Controls where the floating content appears relative to its target.' },
    ],
    usedBy: [
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'menu', name: 'Menu', kind: 'component' },
        { slug: 'snackbar', name: 'Snackbar', kind: 'component' },
        { slug: 'badge', name: 'Badge', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/location.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_location_props.example',
            titleFallback: 'Extending the interface for a floating component',
            code: `import type { ILocationProps } from 'origam'

interface ITooltipProps extends ILocationProps {
    text?: string
}`,
            lang: 'typescript',
        },
    ],
}
