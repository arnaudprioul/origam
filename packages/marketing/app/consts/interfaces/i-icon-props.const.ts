import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ICON_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-icon-props',
    name: 'IIconProps',
    category: 'Icons',
    descriptionKey: 'interfaces.catalog.i_icon_props.description',
    descriptionFallback: 'Minimal icon prop surface shared across all Origam components that display an icon — a single optional icon prop accepting any TIcon value.',
    definition: `export interface IIconProps {
    icon?: TIcon
}`,
    extends: [],
    props: [
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Icon to display. Accepts an MDI name string, a Vue component, or an SVG node.' },
    ],
    usedBy: [
        { slug: 'icon', name: 'Icon', kind: 'component' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Icon/icon.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_icon_props.example',
            titleFallback: 'Using IIconProps to type a wrapper component',
            code: `import type { IIconProps } from 'origam'

interface IMyButtonProps extends IIconProps {
    label: string
}`,
            lang: 'typescript',
        },
    ],
}
