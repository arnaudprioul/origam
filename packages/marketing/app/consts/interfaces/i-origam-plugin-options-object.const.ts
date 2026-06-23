import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ORIGAM_PLUGIN_OPTIONS_OBJECT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-origam-plugin-options-object',
    name: 'IOrigamPluginOptionsObject',
    category: 'Plugin & Configuration',
    descriptionKey: 'interfaces.catalog.i_origam_plugin_options_object.description',
    descriptionFallback: 'Fine-grained auto-import filter — an array of component or directive keys to exclude from automatic registration, allowing tree-shaking of unused Origam exports.',
    definition: `export interface IOrigamPluginOptionsObject {
    ignore?: (keyof typeof Components | keyof typeof Directives)[]
}`,
    extends: [],
    props: [
        { name: 'ignore', type: '(keyof typeof Components | keyof typeof Directives)[]', optional: true, descriptionFallback: 'List of component names (e.g. "OrigamBtn") or directive names (e.g. "vRipple") to exclude from the auto-import resolver. Unrecognised entries are silently ignored.' },
    ],
    usedBy: [
        { slug: 'i-origam-plugin-options', name: 'IOrigamPluginOptions', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_origam_plugin_options_object.example',
            titleFallback: 'Excluding specific components from auto-import',
            code: `import type { IOrigamPluginOptions, IOrigamPluginOptionsObject } from 'origam'

const autoImport: IOrigamPluginOptionsObject = {
    ignore: ['OrigamAudio', 'OrigamVideoPlayer'],
}`,
            lang: 'typescript',
        },
    ],
}
