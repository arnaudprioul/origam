import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CARD_TEXT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-card-text-props',
    name: 'ICardTextProps',
    category: 'Card',
    descriptionKey: 'interfaces.catalog.i_card_text_props.description',
    descriptionFallback: 'Props for OrigamCardText — extends commons, tag, border, rounded, padding, margin and density, with an optional text convenience prop for slotless usage.',
    definition: `export interface ICardTextProps extends ICommonsComponentProps, ITagProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IDensityProps {
    text?: string | number
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IBorderProps', 'IRoundedProps', 'IPaddingProps', 'IMarginProps', 'IDensityProps'],
    props: [
        { name: 'text', type: 'string | number', optional: true, descriptionFallback: 'Body text rendered inside the card text area when no default slot content is provided.' },
    ],
    usedBy: [
        { slug: 'card-text', name: 'OrigamCardText', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Card/card-text.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_card_text_props.example',
            titleFallback: 'OrigamCardText with padding override',
            code: `<OrigamCard>
    <OrigamCardHeader title="Release Notes" />
    <OrigamCardText padding="6" text="Version 3.0 ships today." />
</OrigamCard>`,
            lang: 'vue',
        },
    ],
}
