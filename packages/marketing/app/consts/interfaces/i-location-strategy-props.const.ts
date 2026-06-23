import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOCATION_STRATEGY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-location-strategy-props',
    name: 'ILocationStrategyProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_location_strategy_props.description',
    descriptionFallback: 'Full positioning contract for floating elements — extends IDimensionProps with strategy selection, anchor/origin pair, pixel offset and viewport margin. Consumed by Menu, Select, Tooltip and any component using the connected or static location strategies.',
    definition: `export interface ILocationStrategyProps extends IDimensionProps {
    locationStrategy?: TLocationStrategy | TLocationStrategyFn
    location?: TAnchor
    origin?: TAnchor | 'auto' | 'overlap'
    offset?: number | string | Array<number>
    viewportMargin?: number
}`,
    extends: ['IDimensionProps'],
    props: [
        { name: 'locationStrategy', type: 'TLocationStrategy | TLocationStrategyFn', optional: true, descriptionFallback: 'Named strategy ("connected" | "static") or a custom strategy function. The connected strategy aligns the floating panel to the activator; static keeps it in place.' },
        { name: 'location', type: 'TAnchor', optional: true, descriptionFallback: 'Side and alignment where the floating content appears relative to the activator (e.g. "bottom start", "top end").' },
        { name: 'origin', type: 'TAnchor | \'auto\' | \'overlap\'', optional: true, descriptionFallback: 'The anchor point on the floating content itself. "auto" mirrors the location; "overlap" places the panel over the activator.' },
        { name: 'offset', type: 'number | string | Array<number>', optional: true, descriptionFallback: 'Gap in pixels between the activator and the floating content. An array of two values sets [main-axis, cross-axis] offsets independently.' },
        { name: 'viewportMargin', type: 'number', optional: true, default: '12', descriptionFallback: 'Minimum breathing room in pixels between the floating content and each viewport edge. Defaults to 12 so panels never overlap browser chrome.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'autocomplete', name: 'Autocomplete', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/location.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_location_strategy_props.example',
            titleFallback: 'Extending the interface for a dropdown component',
            code: `import type { ILocationStrategyProps } from 'origam'

interface IDropdownProps extends ILocationStrategyProps {
    items?: string[]
}`,
            lang: 'typescript',
        },
    ],
}
