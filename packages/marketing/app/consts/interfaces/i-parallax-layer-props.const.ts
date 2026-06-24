import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_LAYER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-layer-props',
    name: 'IParallaxLayerProps',
    category: 'Parallax',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IParallaxLayerProps extends ICommonsComponentProps, ITagProps {
    speed?: number;
    offsetX?: number;
    offsetY?: number;
    zIndex?: number;
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [
        { name: 'speed', type: 'number', optional: true, descriptionFallback: `Parallax speed multiplier for this layer.
 - \`0\`   → fixed (no movement, sticks to host)
 - \`0.5\` → half the scroll speed (background — far)
 - \`1\`   → moves with the scroll (neutral)
 - \`>1\`  → faster than the scroll (foreground — near)

Negative values reverse the direction.` },
        { name: 'offsetX', type: 'number', optional: true, descriptionFallback: `Static X-axis offset (px) applied on top of the parallax translation.
Useful to nudge a layer without changing its speed.` },
        { name: 'offsetY', type: 'number', optional: true, descriptionFallback: 'Static Y-axis offset (px) applied on top of the parallax translation.' },
        { name: 'zIndex', type: 'number', optional: true, descriptionFallback: 'Optional `z-index` override. By default layers stack in document order.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax-layer.interface.ts',
    examples: [],
}
