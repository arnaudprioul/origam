import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DIRECTION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-direction-props',
    name: 'IDirectionProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_direction_props.description',
    descriptionFallback: 'Direction contract — exposes a single `direction` prop (horizontal / vertical) consumed by layout-aware components such as Tabs, Divider, InfiniteScroll and SlideGroup.',
    definition: `export interface IDirectionProps {
    direction?: TDirection
}`,
    extends: [],
    props: [
        {
            name: 'direction',
            type: 'TDirection',
            optional: true,
            descriptionFallback: 'Layout axis — typically "horizontal" or "vertical". Defaults to the component\'s natural axis when omitted.',
        },
    ],
    usedBy: [
        { slug: 'tabs', name: 'Tabs', kind: 'component' },
        { slug: 'tab-panels', name: 'TabPanels', kind: 'component' },
        { slug: 'divider', name: 'Divider', kind: 'component' },
        { slug: 'slide-group', name: 'SlideGroup', kind: 'component' },
        { slug: 'infinite-scroll', name: 'InfiniteScroll', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/direction.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_direction_props.example',
            titleFallback: 'Extending the interface on a layout component',
            code: `import type { IDirectionProps } from 'origam'

interface IMyListProps extends IDirectionProps {
    items: string[]
}`,
            lang: 'typescript',
        },
    ],
}
