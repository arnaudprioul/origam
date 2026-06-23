import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RESPONSIVE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-responsive-props',
    name: 'IResponsiveProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_responsive_props.description',
    descriptionFallback: 'Props for <OrigamResponsive>. Merges dimension, commons, padding, margin, border, and rounded surfaces with three responsive-specific props: aspectRatio (locks the intrinsic ratio), contentClass (targets the inner wrapper), and inline (switches the outer element between block and inline-block).',
    definition: `export interface IResponsiveProps extends IDimensionProps, ICommonsComponentProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps {
    aspectRatio?: string | number
    contentClass?: string
    inline?: boolean
}`,
    extends: [
        'IDimensionProps',
        'ICommonsComponentProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IRoundedProps',
    ],
    props: [
        { name: 'aspectRatio', type: 'string | number', optional: true, descriptionFallback: 'Intrinsic aspect-ratio expressed as a number (16/9 = 1.777) or a CSS fraction string ("16/9"). Applied via the CSS aspect-ratio property on the wrapper.' },
        { name: 'contentClass', type: 'string', optional: true, descriptionFallback: 'Additional CSS class applied to the inner content wrapper, not the outer root element. Useful to style the content independently from the outer responsive shell.' },
        { name: 'inline', type: 'boolean', optional: true, descriptionFallback: 'Renders the outer element as inline-block instead of block, allowing the component to flow alongside inline content.' },
    ],
    usedBy: [
        { slug: 'responsive', name: 'Responsive', kind: 'component' },
        { slug: 'img', name: 'Img', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Responsive/responsive.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_responsive_props.example',
            titleFallback: 'Locking a video embed to 16:9 with IResponsiveProps',
            code: `<OrigamResponsive aspect-ratio="16/9" width="100%">
    <iframe src="https://youtube.com/embed/xxx" />
</OrigamResponsive>`,
            lang: 'html',
        },
    ],
}
