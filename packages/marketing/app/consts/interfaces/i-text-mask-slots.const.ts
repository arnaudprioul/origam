import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXT_MASK_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-text-mask-slots',
    name: 'ITextMaskSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_text_mask_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamTextMask> — a single default slot that accepts arbitrary markup (multiple lines, nested elements). The slot wins over the text prop when provided.',
    definition: `export interface ITextMaskSlots {
    default?: () => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '() => any', optional: true, descriptionFallback: 'Custom content to mask. Wins over the text prop. Accepts arbitrary markup: multi-line text, nested <h1>, <span>, <em>, etc.' },
    ],
    usedBy: [
        { slug: 'text-mask', name: 'TextMask', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/TextMask/text-mask.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_text_mask_slots.example',
            titleFallback: 'Multi-line slot content',
            code: `<OrigamTextMask background="gradient-sunset" :font-size="48" font-weight="800">
  <h1>Build faster.<br>Ship better.</h1>
</OrigamTextMask>`,
            lang: 'html',
        },
    ],
}
