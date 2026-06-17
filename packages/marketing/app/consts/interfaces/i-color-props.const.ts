import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COLOR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-color-props',
    name: 'IColorProps',
    category: 'Color & Intent',
    descriptionKey: 'interfaces.catalog.i_color_props.description',
    descriptionFallback: 'Foreground-only color contract — extended by components whose only colour concern is the text/icon (color).',
    definition: `export interface IColorProps {
    color?: TColor
}`,
    extends: [],
    props: [
        { name: 'color', type: 'TColor', optional: true, descriptionFallback: 'Foreground (text / icon) color — an intent name, raw CSS color, gradient string or structured gradient object.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'title', name: 'Title', kind: 'component' },
        { slug: 'icon', name: 'Icon', kind: 'component' },
        { slug: 'use-color', name: 'useColor', kind: 'composable' },
        { slug: 'use-text-color', name: 'useTextColor', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/color.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_color_props.example',
            titleFallback: 'Extending the interface on a component',
            code: `import type { IColorProps } from 'origam'

interface ITitleProps extends IColorProps {
    tag?: string
}`,
            lang: 'typescript',
        },
    ],
}
