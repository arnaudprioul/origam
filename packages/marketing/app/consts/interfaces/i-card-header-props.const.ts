import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CARD_HEADER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-card-header-props',
    name: 'ICardHeaderProps',
    category: 'Card',
    descriptionKey: 'interfaces.catalog.i_card_header_props.description',
    descriptionFallback: 'Props for OrigamCardHeader — combines tag, commons, border, rounded, padding, margin, density and adjacent-slot surfaces, plus convenience title and subtitle text props.',
    definition: `export interface ICardHeaderProps extends ITagProps, ICommonsComponentProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IDensityProps, IAdjacentProps {
    subtitle?: string | number
    title?: string | number
}`,
    extends: ['ITagProps', 'ICommonsComponentProps', 'IBorderProps', 'IRoundedProps', 'IPaddingProps', 'IMarginProps', 'IDensityProps', 'IAdjacentProps'],
    props: [
        { name: 'subtitle', type: 'string | number', optional: true, descriptionFallback: 'Secondary text line rendered below the title inside the header.' },
        { name: 'title', type: 'string | number', optional: true, descriptionFallback: 'Primary headline text of the card header.' },
    ],
    usedBy: [
        { slug: 'card-header', name: 'OrigamCardHeader', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Card/card-header.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_card_header_props.example',
            titleFallback: 'Basic OrigamCardHeader usage',
            code: `<OrigamCardHeader
    title="Invoice #1042"
    subtitle="Due Jun 30, 2026"
    density="compact"
/>`,
            lang: 'vue',
        },
    ],
}
