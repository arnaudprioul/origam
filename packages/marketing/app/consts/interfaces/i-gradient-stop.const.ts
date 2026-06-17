import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GRADIENT_STOP_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-gradient-stop',
    name: 'IGradientStop',
    category: 'Color & Intent',
    descriptionKey: 'interfaces.catalog.i_gradient_stop.description',
    descriptionFallback: 'Single stop in a multi-stop gradient — pairs a color (TIntent alias or raw CSS color) with a percentage position in the [0..100] range.',
    definition: `export interface IGradientStop {
    color: TIntent | string
    position: number
}`,
    extends: [],
    props: [
        {
            name: 'color',
            type: 'TIntent | string',
            optional: false,
            descriptionFallback: 'Stop color — a TIntent name (resolved to its --origam-color__action--{intent}---bg token) or a raw CSS color string (hex, rgb, hsl, named).',
        },
        {
            name: 'position',
            type: 'number',
            optional: false,
            descriptionFallback: 'Position of the stop as a percentage in the [0..100] range.',
        },
    ],
    usedBy: [
        { slug: 'i-gradient', name: 'IGradient', kind: 'composable' },
        { slug: 'use-color', name: 'useColor', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/gradient.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_gradient_stop.example',
            titleFallback: 'Building a 3-stop gradient with IGradientStop',
            code: `import type { IGradient, IGradientStop } from 'origam'

const stops: IGradientStop[] = [
    { color: 'primary', position: 0 },
    { color: '#ff6b6b', position: 50 },
    { color: 'success', position: 100 },
]

const gradient: IGradient = { type: 'linear', direction: 90, stops }`,
            lang: 'typescript',
        },
    ],
}
