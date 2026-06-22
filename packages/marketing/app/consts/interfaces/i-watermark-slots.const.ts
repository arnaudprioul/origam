import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_WATERMARK_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-watermark-slots',
    name: 'IWatermarkSlots',
    category: 'Layout & Structure',
    descriptionKey: 'interfaces.catalog.i_watermark_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamWatermark> — defines the default slot that wraps the content rendered beneath the diagonal overlay.',
    definition: `export interface IWatermarkSlots {
    default?: () => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '() => any', optional: true, descriptionFallback: 'Wrapped content rendered beneath the diagonal overlay. The overlay is purely visual and passes pointer events through by default.' },
    ],
    usedBy: [
        { slug: 'watermark', name: 'Watermark', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Watermark/watermark.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_watermark_slots.example',
            titleFallback: 'Wrapping protected content',
            code: `<OrigamWatermark text="CONFIDENTIAL" :opacity="0.12">
  <article>
    <h2>Top secret report</h2>
    <p>This content is protected by a visual watermark.</p>
  </article>
</OrigamWatermark>`,
            lang: 'html',
        },
    ],
}
