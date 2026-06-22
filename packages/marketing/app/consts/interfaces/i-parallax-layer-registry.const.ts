import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_LAYER_REGISTRY_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-layer-registry',
    name: 'IParallaxLayerRegistry',
    category: 'Motion & Parallax',
    descriptionKey: 'interfaces.catalog.i_parallax_layer_registry.description',
    descriptionFallback: 'Internal layer descriptor registered into the parent OrigamParallax via provide/inject. The parent reads speed, offsetX and offsetY to compute the per-frame transform, then applies it to the shared target HTMLElement.',
    definition: `export interface IParallaxLayerRegistry {
    id: symbol
    speed: number
    offsetX: number
    offsetY: number
    target: HTMLElement
}`,
    extends: [],
    props: [
        { name: 'id', type: 'symbol', optional: false, descriptionFallback: 'Unique symbol identifier for the layer. Used to register and unregister the layer in the parent context.' },
        { name: 'speed', type: 'number', optional: false, descriptionFallback: 'Parallax speed multiplier. 0 = fixed, 0.5 = half scroll speed, 1 = neutral, >1 = faster than scroll. Negative values reverse direction.' },
        { name: 'offsetX', type: 'number', optional: false, descriptionFallback: 'Static X-axis offset (px) applied on top of the parallax translation.' },
        { name: 'offsetY', type: 'number', optional: false, descriptionFallback: 'Static Y-axis offset (px) applied on top of the parallax translation.' },
        { name: 'target', type: 'HTMLElement', optional: false, descriptionFallback: 'Reference to the DOM element that receives the per-frame CSS transform.' },
    ],
    usedBy: [
        { slug: 'parallax', name: 'Parallax', kind: 'component' },
        { slug: 'parallax-layer', name: 'ParallaxLayer', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax-layer.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_parallax_layer_registry.example',
            titleFallback: 'Using IParallaxLayerRegistry in a custom layer',
            code: `import type { IParallaxLayerRegistry } from 'origam'

const layer: IParallaxLayerRegistry = {
    id: Symbol('my-layer'),
    speed: 0.5,
    offsetX: 0,
    offsetY: 0,
    target: document.querySelector('.layer-el') as HTMLElement,
}`,
            lang: 'typescript',
        },
    ],
}
