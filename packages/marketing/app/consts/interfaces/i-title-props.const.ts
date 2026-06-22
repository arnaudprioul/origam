import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TITLE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-title-props',
    name: 'ITitleProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_title_props.description',
    descriptionFallback: 'Props contract for <OrigamTitle>. Semantic heading component with configurable HTML tag, text shorthand, and the full color/bgColor/density/spacing/border surface.',
    definition: `export interface ITitleProps extends ITagProps, ICommonsComponentProps, IColorProps, IBgColorProps, IDensityProps, IPaddingProps, IMarginProps, IBorderProps {
    text?: string
}`,
    extends: ['ITagProps', 'ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'IDensityProps', 'IPaddingProps', 'IMarginProps', 'IBorderProps'],
    props: [
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Text content rendered as the heading. Equivalent to the default slot when no slot content is provided.' },
    ],
    usedBy: [
        { slug: 'title', name: 'Title', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Title/title.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_title_props.example',
            titleFallback: 'h2 heading with primary color',
            code: `<OrigamTitle tag="h2" color="primary" text="Getting started" />`,
            lang: 'vue',
        },
    ],
}
