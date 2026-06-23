import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LAYER_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-layer',
    name: 'ILayer',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_layer.description',
    descriptionFallback: 'Bounding-box record used by the layout system to track occupied space on each side of the main area.',
    definition: `export interface ILayer {
    top: number
    bottom: number
    left: number
    right: number
}`,
    extends: [],
    props: [
        {
            name: 'top',
            type: 'number',
            optional: false,
            descriptionFallback: 'Space consumed at the top of the layout main area, in pixels.',
        },
        {
            name: 'bottom',
            type: 'number',
            optional: false,
            descriptionFallback: 'Space consumed at the bottom of the layout main area, in pixels.',
        },
        {
            name: 'left',
            type: 'number',
            optional: false,
            descriptionFallback: 'Space consumed on the left side of the layout main area, in pixels.',
        },
        {
            name: 'right',
            type: 'number',
            optional: false,
            descriptionFallback: 'Space consumed on the right side of the layout main area, in pixels.',
        },
    ],
    usedBy: [
        { slug: 'layout', name: 'Layout', kind: 'component' },
        { slug: 'use-layout', name: 'useLayout', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/layout.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_layer.example',
            titleFallback: 'Reading mainRect from the layout provide',
            code: `import { inject } from 'vue'
import { LAYOUT_KEY } from 'origam'

const layout = inject(LAYOUT_KEY)
// layout.mainRect.value: ILayer
console.log(layout?.mainRect.value.top) // e.g. 64 (AppBar height)`,
            lang: 'typescript',
        },
    ],
}
