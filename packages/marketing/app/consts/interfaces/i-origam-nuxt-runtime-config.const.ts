import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ORIGAM_NUXT_RUNTIME_CONFIG_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-origam-nuxt-runtime-config',
    name: 'IOrigamNuxtRuntimeConfig',
    category: 'Nuxt',
    descriptionKey: '',
    descriptionFallback: `Shape of the public runtime config exposed by the module on
\`useRuntimeConfig().public.origam\`. The plugins read this at boot to install
the theme objects, resolve the active theme/mode, and configure the cookies.`,
    definition: `export interface IOrigamNuxtRuntimeConfig {
    themes: IOrigamTheme[];
    defaultTheme: string;
    modes: string[];
    defaultMode: string;
    cookieName: string;
    modeCookieName: string;
    cookieMaxAge: number;
}`,
    extends: [],
    props: [
        { name: 'themes', type: 'IOrigamTheme[]', optional: false, descriptionFallback: `Installed \`IOrigamTheme\` objects, in install order. The plugins pass
these straight to \`createOrigam\` (no preset-name resolution — ADR-004).
A switcher derives its brand list from \`useInstalledThemes()\` rather than
from this payload.` },
        { name: 'defaultTheme', type: 'string', optional: false, descriptionFallback: '' },
        { name: 'modes', type: 'string[]', optional: false, descriptionFallback: '' },
        { name: 'defaultMode', type: 'string', optional: false, descriptionFallback: '' },
        { name: 'cookieName', type: 'string', optional: false, descriptionFallback: '' },
        { name: 'modeCookieName', type: 'string', optional: false, descriptionFallback: '' },
        { name: 'cookieMaxAge', type: 'number', optional: false, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Nuxt/nuxt-module.interface.ts',
    examples: [],
}
