import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TEXT_MASK_ANIMATION_TYPE_DOC: ITypeDoc = {
    slug: 'text-mask-animation',
    name: 'TTextMaskAnimation',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.text_mask_animation.description',
    descriptionFallback: 'Animation strategy applied to the background painted under the background-clip: text mask in OrigamTextMask. Every strategy respects prefers-reduced-motion.',
    definition: `export type TTextMaskAnimation =
    | 'pan'
    | 'rotate'
    | 'pulse'
    | 'zoom'`,
    values: [
        {
            value: 'pan',
            descriptionKey: 'types.detail.text_mask_animation.pan',
            descriptionFallback: 'Translates the gradient horizontally in a continuous loop. Default. Best fit for long horizontal linear-gradient ramps.',
        },
        {
            value: 'rotate',
            descriptionKey: 'types.detail.text_mask_animation.rotate',
            descriptionFallback: 'Rotates the background-image continuously. Best fit for conic gradients where every angle is meaningful.',
        },
        {
            value: 'pulse',
            descriptionKey: 'types.detail.text_mask_animation.pulse',
            descriptionFallback: 'Scales 1 to 1.2 and back to 1 — a subtle breathing effect that keeps the gradient visible throughout.',
        },
        {
            value: 'zoom',
            descriptionKey: 'types.detail.text_mask_animation.zoom',
            descriptionFallback: 'Continuous scale from 1 to 2 — a cinematic moving-forward feel that progressively reveals finer gradient detail.',
        },
    ],
    usedBy: [
        { slug: 'text-mask', name: 'TextMask', propName: 'animationType' },
    ],
    sourceFile: 'packages/ds/src/types/TextMask/text-mask-animation.type.ts',
    examples: [
        {
            titleKey: 'types.detail.text_mask_animation.example',
            titleFallback: 'TextMask with rotating conic gradient',
            code: `<origam-text-mask
  text="Origam"
  background="conic-gradient(from 0deg, #7c3aed, #2563eb, #7c3aed)"
  animation
  animation-type="rotate"
/>`,
            lang: 'html',
        },
    ],
}
