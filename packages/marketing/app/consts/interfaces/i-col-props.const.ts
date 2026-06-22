import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-col-props',
    name: 'IColProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_col_props.description',
    descriptionFallback: 'Props for OrigamCol — a responsive grid column that accepts breakpoint spans (cols/sm/md/lg/xl/xxl), column offsets, order, color and spacing.',
    definition: `export interface IColProps extends IColorProps, IBgColorProps, ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IAlignProps {
    cols?: TCols
    sm?: TCols
    md?: TCols
    lg?: TCols
    xl?: TCols
    xxl?: TCols
    offset?: Omit<TCols, '12'>
    offsetSm?: Omit<TCols, '12'>
    offsetMd?: Omit<TCols, '12'>
    offsetLg?: Omit<TCols, '12'>
    offsetXl?: Omit<TCols, '12'>
    offsetXxl?: Omit<TCols, '12'>
    order?: number
    orderSm?: number
    orderMd?: number
    orderLg?: number
    orderXl?: number
    orderXxl?: number
}`,
    extends: [
        'IColorProps',
        'IBgColorProps',
        'ICommonsComponentProps',
        'ITagProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IAlignProps',
    ],
    props: [
        { name: 'cols', type: 'TCols', optional: true, descriptionFallback: 'Column span for all breakpoints (1–12 or "auto").' },
        { name: 'sm', type: 'TCols', optional: true, descriptionFallback: 'Column span applied at the sm breakpoint and above.' },
        { name: 'md', type: 'TCols', optional: true, descriptionFallback: 'Column span applied at the md breakpoint and above.' },
        { name: 'lg', type: 'TCols', optional: true, descriptionFallback: 'Column span applied at the lg breakpoint and above.' },
        { name: 'xl', type: 'TCols', optional: true, descriptionFallback: 'Column span applied at the xl breakpoint and above.' },
        { name: 'xxl', type: 'TCols', optional: true, descriptionFallback: 'Column span applied at the xxl breakpoint and above.' },
        { name: 'offset', type: "Omit<TCols, '12'>", optional: true, descriptionFallback: 'Column offset for all breakpoints (1–11 or "auto").' },
        { name: 'offsetSm', type: "Omit<TCols, '12'>", optional: true, descriptionFallback: 'Column offset applied at the sm breakpoint and above.' },
        { name: 'offsetMd', type: "Omit<TCols, '12'>", optional: true, descriptionFallback: 'Column offset applied at the md breakpoint and above.' },
        { name: 'offsetLg', type: "Omit<TCols, '12'>", optional: true, descriptionFallback: 'Column offset applied at the lg breakpoint and above.' },
        { name: 'offsetXl', type: "Omit<TCols, '12'>", optional: true, descriptionFallback: 'Column offset applied at the xl breakpoint and above.' },
        { name: 'offsetXxl', type: "Omit<TCols, '12'>", optional: true, descriptionFallback: 'Column offset applied at the xxl breakpoint and above.' },
        { name: 'order', type: 'number', optional: true, descriptionFallback: 'CSS order for all breakpoints.' },
        { name: 'orderSm', type: 'number', optional: true, descriptionFallback: 'CSS order applied at the sm breakpoint and above.' },
        { name: 'orderMd', type: 'number', optional: true, descriptionFallback: 'CSS order applied at the md breakpoint and above.' },
        { name: 'orderLg', type: 'number', optional: true, descriptionFallback: 'CSS order applied at the lg breakpoint and above.' },
        { name: 'orderXl', type: 'number', optional: true, descriptionFallback: 'CSS order applied at the xl breakpoint and above.' },
        { name: 'orderXxl', type: 'number', optional: true, descriptionFallback: 'CSS order applied at the xxl breakpoint and above.' },
    ],
    usedBy: [
        { slug: 'col', name: 'Col', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Grids/col.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_col_props.example_responsive',
            titleFallback: 'Responsive column with breakpoint spans',
            code: `<OrigamRow>
    <OrigamCol :cols="12" :md="6" :lg="4">
        Content
    </OrigamCol>
</OrigamRow>`,
            lang: 'vue',
        },
    ],
}
