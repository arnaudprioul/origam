import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ORIGAM_PLUGIN_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-origam-plugin-options',
    name: 'IOrigamPluginOptions',
    category: 'Plugin & Configuration',
    descriptionKey: 'interfaces.catalog.i_origam_plugin_options.description',
    descriptionFallback: 'Options bag for the Origam Nuxt / Vite plugin — controls how components and directives are auto-imported into the consuming application.',
    definition: `export interface IOrigamPluginOptions {
    autoImport?: TOrigamPluginOptionsImport
}`,
    extends: [],
    props: [
        { name: 'autoImport', type: 'TOrigamPluginOptionsImport', optional: true, descriptionFallback: 'Controls the auto-import behaviour. Accepts a named strategy or an object specifying which components and directives to include or exclude from automatic registration.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_origam_plugin_options.example',
            titleFallback: 'Configuring auto-import in nuxt.config.ts',
            code: `import type { IOrigamPluginOptions } from 'origam'

// nuxt.config.ts
export default defineNuxtConfig({
    modules: ['origam/nuxt'],
    origam: {
        autoImport: 'all',
    } satisfies IOrigamPluginOptions,
})`,
            lang: 'typescript',
        },
    ],
}
