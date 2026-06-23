import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ALIGN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-align-props',
    name: 'IAlignProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_align_props.description',
    descriptionFallback: 'Responsive alignment contract — sets the cross-axis alignment (align-items / justify-content) at each breakpoint independently.',
    definition: `export interface IAlignProps {
    align?: TAlign,
    alignSm?: TAlign,
    alignMd?: TAlign,
    alignLg?: TAlign,
    alignXl?: TAlign,
    alignXxl?: TAlign
}`,
    extends: [],
    props: [
        { name: 'align', type: 'TAlign', optional: true, descriptionFallback: 'Default alignment applied at all breakpoints unless overridden.' },
        { name: 'alignSm', type: 'TAlign', optional: true, descriptionFallback: 'Alignment override for the sm breakpoint and above.' },
        { name: 'alignMd', type: 'TAlign', optional: true, descriptionFallback: 'Alignment override for the md breakpoint and above.' },
        { name: 'alignLg', type: 'TAlign', optional: true, descriptionFallback: 'Alignment override for the lg breakpoint and above.' },
        { name: 'alignXl', type: 'TAlign', optional: true, descriptionFallback: 'Alignment override for the xl breakpoint and above.' },
        { name: 'alignXxl', type: 'TAlign', optional: true, descriptionFallback: 'Alignment override for the xxl breakpoint.' },
    ],
    usedBy: [
        { slug: 'row', name: 'Row', kind: 'component' },
        { slug: 'grid', name: 'Grid', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/align.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_align_props.example',
            titleFallback: 'Responsive alignment on a Row',
            code: `<OrigamRow align="start" align-md="center" align-lg="end">
    <OrigamCol>Col 1</OrigamCol>
    <OrigamCol>Col 2</OrigamCol>
</OrigamRow>`,
            lang: 'vue',
        },
    ],
}
