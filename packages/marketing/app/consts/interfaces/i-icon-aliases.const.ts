import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ICON_ALIASES_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-icon-aliases',
    name: 'IIconAliases',
    category: 'Icons',
    descriptionKey: 'interfaces.catalog.i_icon_aliases.description',
    descriptionFallback: 'Index-signature map from alias name to icon value, used to register custom icon aliases in the Origam icon configuration.',
    definition: `export interface IIconAliases {
    [name: string]: TIcon
}`,
    extends: [],
    props: [
        { name: '[name: string]', type: 'TIcon', optional: false, descriptionFallback: 'Maps any string alias key to a TIcon value (string, component, or SVG node).' },
    ],
    usedBy: [
        { slug: 'icon', name: 'Icon', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Icon/icon.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_icon_aliases.example',
            titleFallback: 'Registering custom icon aliases in the plugin config',
            code: `import type { IIconAliases } from 'origam'

const aliases: IIconAliases = {
    close: 'mdi-close',
    success: 'mdi-check-circle',
}

app.use(origam, { icons: { aliases } })`,
            lang: 'typescript',
        },
    ],
}
