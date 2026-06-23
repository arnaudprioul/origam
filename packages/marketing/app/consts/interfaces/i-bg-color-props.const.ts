import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BG_COLOR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bg-color-props',
    name: 'IBgColorProps',
    category: 'Color & Intent',
    descriptionKey: 'interfaces.catalog.i_bg_color_props.description',
    descriptionFallback: 'Background-only color contract — extended by components that own a surface (Btn, Card, Badge, Alert…). Kept orthogonal to IColorProps so a component can opt into one axis independently.',
    definition: `export interface IBgColorProps {
    bgColor?: TColor
}`,
    extends: [],
    props: [
        { name: 'bgColor', type: 'TColor', optional: true, descriptionFallback: 'Background (surface) color — an intent name, raw CSS color, gradient string or structured gradient object.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'badge', name: 'Badge', kind: 'component' },
        { slug: 'alert', name: 'Alert', kind: 'component' },
        { slug: 'use-background-color', name: 'useBackgroundColor', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/color.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bg_color_props.example',
            titleFallback: 'Extending the interface on a surface component',
            code: `import type { IColorProps, IBgColorProps } from 'origam'

interface IBtnProps extends IColorProps, IBgColorProps {
    variant?: string
}`,
            lang: 'typescript',
        },
    ],
}
