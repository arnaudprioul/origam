import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PARALLAX_LAYER_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-parallax-layer-provide',
    name: 'IParallaxLayerProvide',
    category: 'Parallax',
    descriptionKey: '',
    descriptionFallback: `Provide context exposed by the enriched OrigamParallax to its
\`<OrigamParallaxLayer>\` children. Distinct from the legacy
\`IParallaxProvide\` consumed by \`<OrigamParallaxElement>\` (kept
separate to avoid coupling the two APIs).`,
    definition: `export interface IParallaxLayerProvide {
    direction: Ref<TParallaxDirection>;
    easing: Ref<TParallaxEasing | string>;
    disabled: Ref<boolean>;
    progress: Ref<number>;
    mouseRatio: Ref<{
        x: number;
        y: number;
    }>;
    cssScrollDriven: Ref<boolean>;
    reducedMotion: Ref<boolean>;
    register: (layer: IParallaxLayerRegistry) => void;
    unregister: (id: symbol) => void;
}`,
    extends: [],
    props: [
        { name: 'direction', type: 'Ref<TParallaxDirection>', optional: false, descriptionFallback: '' },
        { name: 'easing', type: 'Ref<TParallaxEasing | string>', optional: false, descriptionFallback: '' },
        { name: 'disabled', type: 'Ref<boolean>', optional: false, descriptionFallback: '' },
        { name: 'progress', type: 'Ref<number>', optional: false, descriptionFallback: `Live scroll progress, normalised to \`[0, 1]\`. \`0\` = host just entered
the viewport, \`1\` = host just left.` },
        { name: 'mouseRatio', type: 'Ref<{ x: number, y: number }>', optional: false, descriptionFallback: `Live mouse-ratio for \`direction="both"\` on \`event="move"\` —
\`{ x: 0..1, y: 0..1 }\`. Falls back to \`{ x: 0.5, y: 0.5 }\` when no
mouse data is available.` },
        { name: 'cssScrollDriven', type: 'Ref<boolean>', optional: false, descriptionFallback: `Whether the runtime is using the CSS scroll-driven path (true) or the
JS rAF fallback (false). Layers may opt out of the JS work when the
CSS path is active.` },
        { name: 'reducedMotion', type: 'Ref<boolean>', optional: false, descriptionFallback: `Whether \`prefers-reduced-motion: reduce\` is honoured — layers MUST
stay at offset 0 when this is true.` },
        { name: 'register', type: '(layer: IParallaxLayerRegistry) => void', optional: false, descriptionFallback: `Register / unregister a layer with the parent. The parent reads the
registry to compute and apply per-layer transforms each frame.` },
        { name: 'unregister', type: '(id: symbol) => void', optional: false, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Parallax/parallax.interface.ts',
    examples: [],
}
