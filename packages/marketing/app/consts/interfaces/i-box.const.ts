import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BOX_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-box',
    name: 'IBox',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_box.description',
    descriptionFallback: 'Bounding-box snapshot — the shape returned by useResizeObserver and intersection utilities, describing an element\'s position and dimensions in the viewport.',
    definition: `export interface IBox {
    x: number
    y: number
    width: number
    height: number
    top: number
    bottom: number
    left: number
    right: number
}`,
    extends: [],
    props: [
        { name: 'x', type: 'number', optional: false, descriptionFallback: 'Horizontal distance from the left of the viewport.' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'Vertical distance from the top of the viewport.' },
        { name: 'width', type: 'number', optional: false, descriptionFallback: 'Width of the element in pixels.' },
        { name: 'height', type: 'number', optional: false, descriptionFallback: 'Height of the element in pixels.' },
        { name: 'top', type: 'number', optional: false, descriptionFallback: 'Distance from the top of the viewport (same as y).' },
        { name: 'bottom', type: 'number', optional: false, descriptionFallback: 'Distance from the top of the viewport to the bottom edge (top + height).' },
        { name: 'left', type: 'number', optional: false, descriptionFallback: 'Distance from the left of the viewport (same as x).' },
        { name: 'right', type: 'number', optional: false, descriptionFallback: 'Distance from the left of the viewport to the right edge (left + width).' },
    ],
    usedBy: [
        { slug: 'use-resize-observer', name: 'useResizeObserver', kind: 'composable' },
        { slug: 'use-intersect', name: 'useIntersect', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/box.interface.ts',
}
