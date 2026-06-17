import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_JUSTIFY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-justify-props',
    name: 'IJustifyProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_justify_props.description',
    descriptionFallback: 'Responsive justify-content contract — one breakpoint-aware prop per viewport tier, consumed by grid/row components.',
    definition: `export interface IJustifyProps {
    justify?: TJustify
    justifySm?: TJustify
    justifyMd?: TJustify
    justifyLg?: TJustify
    justifyXl?: TJustify
    justifyXxl?: TJustify
}`,
    extends: [],
    props: [
        {
            name: 'justify',
            type: 'TJustify',
            optional: true,
            descriptionFallback: 'Default justify-content value applied to all breakpoints unless overridden.',
        },
        {
            name: 'justifySm',
            type: 'TJustify',
            optional: true,
            descriptionFallback: 'Justify-content override at the sm breakpoint (≥ 600 px).',
        },
        {
            name: 'justifyMd',
            type: 'TJustify',
            optional: true,
            descriptionFallback: 'Justify-content override at the md breakpoint (≥ 960 px).',
        },
        {
            name: 'justifyLg',
            type: 'TJustify',
            optional: true,
            descriptionFallback: 'Justify-content override at the lg breakpoint (≥ 1280 px).',
        },
        {
            name: 'justifyXl',
            type: 'TJustify',
            optional: true,
            descriptionFallback: 'Justify-content override at the xl breakpoint (≥ 1920 px).',
        },
        {
            name: 'justifyXxl',
            type: 'TJustify',
            optional: true,
            descriptionFallback: 'Justify-content override at the xxl breakpoint (≥ 2560 px).',
        },
    ],
    usedBy: [
        { slug: 'row', name: 'Row', kind: 'component' },
        { slug: 'grid', name: 'Grid', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/justify.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_justify_props.example',
            titleFallback: 'Responsive justify in a Row',
            code: `<OrigamRow justify="start" justify-md="center" justify-lg="end">
    <OrigamCol>...</OrigamCol>
</OrigamRow>`,
            lang: 'html',
        },
    ],
}
