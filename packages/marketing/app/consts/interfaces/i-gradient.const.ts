import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GRADIENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-gradient',
    name: 'IGradient',
    category: 'Color & Intent',
    descriptionKey: 'interfaces.catalog.i_gradient.description',
    descriptionFallback: 'Structured gradient descriptor — one of the three accepted formats for color/bgColor/textColor props. Supports linear, radial and conic types; short form (from/to/via) or full form (stops array).',
    definition: `export interface IGradient {
    type?: 'linear' | 'radial' | 'conic'
    from?: TIntent | string
    to?: TIntent | string
    via?: TIntent | string
    direction?: number | string
    stops?: IGradientStop[]
}`,
    extends: [],
    props: [
        {
            name: 'type',
            type: "'linear' | 'radial' | 'conic'",
            optional: true,
            descriptionFallback: 'Gradient type. Defaults to "linear".',
        },
        {
            name: 'from',
            type: 'TIntent | string',
            optional: true,
            descriptionFallback: 'Start color of the short-form 2–3 stop gradient. A TIntent alias or raw CSS color.',
        },
        {
            name: 'to',
            type: 'TIntent | string',
            optional: true,
            descriptionFallback: 'End color of the short-form gradient.',
        },
        {
            name: 'via',
            type: 'TIntent | string',
            optional: true,
            descriptionFallback: 'Optional middle color of the short-form gradient, auto-positioned at 50%.',
        },
        {
            name: 'direction',
            type: 'number | string',
            optional: true,
            descriptionFallback: 'Angle in degrees (default 135) or a CSS keyword such as "to right" / "to bottom left". For radial/conic, used as the shape/position prefix (e.g. "circle at center").',
        },
        {
            name: 'stops',
            type: 'IGradientStop[]',
            optional: true,
            descriptionFallback: 'Full-form stop list — overrides from/to/via entirely when provided. Each entry is an IGradientStop with a color and a percentage position.',
        },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'title', name: 'Title', kind: 'component' },
        { slug: 'use-color', name: 'useColor', kind: 'composable' },
        { slug: 'use-background-color', name: 'useBackgroundColor', kind: 'composable' },
        { slug: 'use-text-color', name: 'useTextColor', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/gradient.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_gradient.example_short',
            titleFallback: 'Short form — from / to',
            code: `<OrigamBtn :bgColor="{ from: 'primary', to: 'success', direction: 'to right' }">
    Gradient button
</OrigamBtn>`,
            lang: 'html',
        },
        {
            titleKey: 'interfaces.detail.i_gradient.example_full',
            titleFallback: 'Full form — explicit stops',
            code: `import type { IGradient } from 'origam'

const gradient: IGradient = {
    type: 'linear',
    direction: 135,
    stops: [
        { color: 'primary', position: 0 },
        { color: 'success', position: 100 },
    ],
}`,
            lang: 'typescript',
        },
    ],
}
