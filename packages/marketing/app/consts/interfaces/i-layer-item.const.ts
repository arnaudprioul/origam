import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LAYER_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-layer-item',
    name: 'ILayerItem',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_layer_item.description',
    descriptionFallback: 'Extends ILayer with identity, size and position metadata — represents a single registered layout item (AppBar, Drawer, BottomNav …) inside ILayoutProvide.',
    definition: `export interface ILayerItem extends ILayer {
    id: string
    size: number
    position: TDirectionBoth
}`,
    extends: ['ILayer'],
    props: [
        {
            name: 'top',
            type: 'number',
            optional: false,
            descriptionFallback: 'Inherited from ILayer — space consumed at the top of the layout main area.',
        },
        {
            name: 'bottom',
            type: 'number',
            optional: false,
            descriptionFallback: 'Inherited from ILayer — space consumed at the bottom.',
        },
        {
            name: 'left',
            type: 'number',
            optional: false,
            descriptionFallback: 'Inherited from ILayer — space consumed on the left.',
        },
        {
            name: 'right',
            type: 'number',
            optional: false,
            descriptionFallback: 'Inherited from ILayer — space consumed on the right.',
        },
        {
            name: 'id',
            type: 'string',
            optional: false,
            descriptionFallback: 'Unique identifier assigned to the layout item on registration.',
        },
        {
            name: 'size',
            type: 'number',
            optional: false,
            descriptionFallback: 'Current rendered size of the item (height or width depending on position).',
        },
        {
            name: 'position',
            type: 'TDirectionBoth',
            optional: false,
            descriptionFallback: 'Docking edge: "top" | "bottom" | "left" | "right".',
        },
    ],
    usedBy: [
        { slug: 'layout', name: 'Layout', kind: 'component' },
        { slug: 'use-layout', name: 'useLayout', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/layout.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_layer_item.example',
            titleFallback: 'Iterating registered layout items',
            code: `import { inject } from 'vue'
import { LAYOUT_KEY } from 'origam'
import type { ILayerItem } from 'origam'

const layout = inject(LAYOUT_KEY)
const items: ILayerItem[] = layout?.items.value ?? []`,
            lang: 'typescript',
        },
    ],
}
